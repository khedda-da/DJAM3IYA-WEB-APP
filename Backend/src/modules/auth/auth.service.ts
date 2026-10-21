import bcrypt from "bcryptjs"
import { db } from "../../db/database.js"
import { config } from "../../config/env.js"
import { AppError } from "../../middleware/error.middleware.js"
import { loadUserById } from "../../middleware/auth.middleware.js"
import { supabaseAdmin, supabaseAnon, authEmailFor } from "../../lib/supabase.js"
import type { AuthUser } from "../../types/express.js"

export interface Session {
  token: string
  refreshToken: string
  expiresAt: number | null
  user: AuthUser
}

const BAD_CREDENTIALS = "اسم المستخدم أو كلمة المرور غير صحيحة"

export class AuthService {
  /**
   * Sign in with username OR e-mail + password. Supabase Auth verifies the password
   * and issues the session; the local `users` row supplies roles and scope.
   */
  async login(identifier: string, password: string): Promise<Session> {
    if (!identifier || !password) {
      throw new AppError("يرجى إدخال اسم المستخدم وكلمة المرور", 400)
    }
    const id = identifier.trim()

    const row = await db.get(
      `SELECT u.id, u.username, u.password_hash, u.is_active, u.auth_user_id, u.auth_email, p.email
       FROM users u JOIN persons p ON p.id = u.person_id
       WHERE LOWER(u.username) = LOWER(?) OR LOWER(p.email) = LOWER(?) OR LOWER(u.auth_email) = LOWER(?)`,
      [id, id, id],
    )
    if (!row) throw new AppError(BAD_CREDENTIALS, 401)
    if (!db.truthy(row.is_active)) {
      throw new AppError("هذا الحساب معطّل. يرجى مراجعة إدارة الجمعية.", 403)
    }

    let authEmail: string = row.auth_email || authEmailFor(row.username, row.email)

    // Legacy account (created before Supabase Auth): verify the old bcrypt hash once,
    // then move the account into Supabase so it works like every other account.
    if (!row.auth_user_id) {
      const ok = row.password_hash ? await bcrypt.compare(password, row.password_hash) : false
      if (!ok) throw new AppError(BAD_CREDENTIALS, 401)
      authEmail = await this.linkToSupabase(row.id, row.username, row.email, password)
    }

    const { data, error } = await supabaseAnon().auth.signInWithPassword({
      email: authEmail,
      password,
    })
    if (error || !data.session) {
      if (error && /invalid login credentials/i.test(error.message)) {
        throw new AppError(BAD_CREDENTIALS, 401)
      }
      throw new AppError(error?.message || "فشل تسجيل الدخول", error?.status === 400 ? 401 : 502)
    }

    await db.run(
      `UPDATE users SET last_login = ${db.isPostgres() ? "NOW()" : "datetime('now')"} WHERE id = ?`,
      [row.id],
    )

    const user = await loadUserById(row.id)
    if (!user) throw new AppError("فشل تحميل بيانات المستخدم", 500)

    return {
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at ?? null,
      user,
    }
  }

  async refresh(refreshToken: string): Promise<Session> {
    if (!refreshToken) throw new AppError("رمز التحديث مطلوب", 400)
    const { data, error } = await supabaseAnon().auth.refreshSession({ refresh_token: refreshToken })
    if (error || !data.session || !data.user) {
      throw new AppError("جلسة العمل منتهية. يرجى تسجيل الدخول مجددًا.", 401)
    }
    const row = await db.get(`SELECT id FROM users WHERE auth_user_id = ?`, [data.user.id])
    const user = row ? await loadUserById(row.id) : null
    if (!user) throw new AppError("حساب المستخدم غير صالح أو تم تعطيله.", 401)
    return {
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at ?? null,
      user,
    }
  }

  async logout(accessToken?: string): Promise<void> {
    if (!accessToken) return
    try {
      await supabaseAdmin().auth.admin.signOut(accessToken)
    } catch {
      /* the client drops its tokens either way */
    }
  }

  /** Creates the Supabase auth user for an existing local row and stores the link. */
  async linkToSupabase(
    userId: number,
    username: string,
    realEmail: string | null | undefined,
    password: string,
  ): Promise<string> {
    const email = authEmailFor(username, realEmail)
    const { data, error } = await supabaseAdmin().auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username },
    })
    if (error || !data.user) {
      throw new AppError(error?.message || "تعذر إنشاء حساب المصادقة", 502)
    }
    await db.run(`UPDATE users SET auth_user_id = ?, auth_email = ?, password_hash = '' WHERE id = ?`, [
      data.user.id,
      email,
      userId,
    ])
    return email
  }

  async needsSetup(): Promise<boolean> {
    const row = await db.get(`SELECT COUNT(*) AS count FROM users`)
    return Number((row as any)?.count ?? 0) === 0
  }

  /** Creates the very first administrator. Only allowed while the users table is empty. */
  async setupFirstUser(input: {
    fullName?: string
    username?: string
    password?: string
    email?: string
    phone?: string
    setupKey?: string
  }): Promise<Session> {
    if (!config.setupKey) {
      if (config.isProduction) {
        throw new AppError("SETUP_KEY غير مضبوط على الخادم. لا يمكن إنشاء المدير الأول.", 503)
      }
    } else if (input.setupKey !== config.setupKey) {
      throw new AppError("مفتاح الإعداد غير صحيح", 403)
    }

    if (!(await this.needsSetup())) {
      throw new AppError("تم إعداد النظام مسبقًا.", 403)
    }

    const fullName = (input.fullName ?? "").trim()
    const username = (input.username ?? "").trim()
    const password = input.password ?? ""
    const email = (input.email ?? "").trim() || null
    const phone = (input.phone ?? "").trim() || null

    if (!fullName) throw new AppError("يرجى إدخال الاسم الكامل", 400)
    if (!/^[A-Za-z0-9._-]{3,50}$/.test(username)) {
      throw new AppError(
        "اسم المستخدم يجب أن يتكون من 3 إلى 50 حرفًا (أحرف لاتينية وأرقام و . _ - فقط)",
        400,
      )
    }
    if (password.length < 8) throw new AppError("كلمة المرور يجب أن لا تقل عن 8 أحرف", 400)
    if (!email && !phone) throw new AppError("يرجى إدخال البريد الإلكتروني أو رقم الهاتف", 400)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new AppError("البريد الإلكتروني غير صالح", 400)
    }

    const adminRoleName = "مسؤول الإدارة"
    let role = await db.get(`SELECT id FROM roles WHERE name = ?`, [adminRoleName])
    if (!role) {
      await db.run(`INSERT INTO roles (name, scope) VALUES (?, 'central')`, [adminRoleName])
      role = await db.get(`SELECT id FROM roles WHERE name = ?`, [adminRoleName])
    }

    // 1) Supabase auth user first (like LMCS /api/setup/create-admin) ...
    const authEmail = authEmailFor(username, email)
    const { data, error } = await supabaseAdmin().auth.admin.createUser({
      email: authEmail,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, username, role: "admin" },
    })
    if (error || !data.user) {
      throw new AppError(error?.message || "تعذر إنشاء حساب المصادقة", 400)
    }

    // 2) ... then the local profile; roll the auth user back if anything fails.
    let personId: number | null = null
    try {
      const person = await db.run(
        `INSERT INTO persons (full_name, phone, email, person_type) VALUES (?, ?, ?, 'both')`,
        [fullName, phone, email],
      )
      personId = person.lastInsertRowid

      // Atomic guard: only inserted while no user exists (two simultaneous setups can't both win).
      const inserted = await db.run(
        `INSERT INTO users (person_id, username, password_hash, auth_user_id, auth_email)
         SELECT CAST(? AS BIGINT), CAST(? AS VARCHAR(100)), '', CAST(? AS VARCHAR(64)), CAST(? AS VARCHAR(255))
         WHERE NOT EXISTS (SELECT 1 FROM users)`,
        [personId, username, data.user.id, authEmail],
      )
      if (inserted.changes === 0) throw new AppError("تم إعداد النظام مسبقًا.", 403)

      await db.run(`INSERT INTO person_roles (person_id, role_id, branch_id) VALUES (?, ?, NULL)`, [
        personId,
        (role as any).id,
      ])
    } catch (err) {
      if (personId) await db.run(`DELETE FROM persons WHERE id = ?`, [personId]).catch(() => {})
      await supabaseAdmin().auth.admin.deleteUser(data.user.id).catch(() => {})
      throw err
    }

    return this.login(username, password)
  }

  async getCurrentUser(userId: number): Promise<AuthUser> {
    const user = await loadUserById(userId)
    if (!user) throw new AppError("المستخدم غير موجود", 404)
    return user
  }
}

export const authService = new AuthService()
