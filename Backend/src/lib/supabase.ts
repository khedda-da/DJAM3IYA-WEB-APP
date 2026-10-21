import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { config } from "../config/env.js"
import { AppError } from "../middleware/error.middleware.js"

const baseOptions = { auth: { autoRefreshToken: false, persistSession: false } }

function assertConfigured(): void {
  if (!config.supabaseUrl || !config.supabaseAnonKey || !config.supabaseServiceRoleKey) {
    throw new AppError(
      "إعدادات Supabase غير مكتملة (SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY).",
      500,
    )
  }
}

let adminClient: SupabaseClient | null = null

/** Service-role client: creates/updates/deletes auth users and verifies access tokens. */
export function supabaseAdmin(): SupabaseClient {
  assertConfigured()
  if (!adminClient) {
    adminClient = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, baseOptions)
  }
  return adminClient
}

/**
 * Anon client for password sign-in. A fresh instance per call so one user's session
 * can never leak into another request.
 */
export function supabaseAnon(): SupabaseClient {
  assertConfigured()
  return createClient(config.supabaseUrl, config.supabaseAnonKey, baseOptions)
}

/** The e-mail Supabase Auth knows the account by. */
export function authEmailFor(username: string, realEmail?: string | null): string {
  const email = (realEmail ?? "").trim().toLowerCase()
  return email || `${username.trim().toLowerCase()}@${config.authEmailDomain}`
}
