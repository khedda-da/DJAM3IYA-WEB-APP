import type { Student, StudentFilters, Sheikh, Halaqa, Branch, Role, User, NotificationItem } from "@/types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

class ApiClient {
  private token: string | null = null

  constructor() {
    this.token = typeof window !== "undefined" ? localStorage.getItem("djam3ya_token") : null
  }

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem("djam3ya_token", token)
    } else {
      localStorage.removeItem("djam3ya_token")
    }
  }

  getToken(): string | null {
    return this.token
  }

  private async request<T = any>(
    path: string,
    options: RequestInit = {},
  ): Promise<{ success: boolean; data: T; message?: string }> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: "حدث خطأ في الاتصال بالخادم" }))
      throw new Error(err.message || "حدث خطأ في الاتصال بالخادم")
    }

    return response.json()
  }

  // ── Auth ──
  async login(username: string, password: string) {
    const res = await this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
    if (res.data?.token) {
      this.setToken(res.data.token)
    }
    return res.data
  }

  async getMe() {
    const res = await this.request<any>("/auth/me")
    return res.data
  }

  logout() {
    this.setToken(null)
  }

  // ── Students (F9, F10, F11) ──
  async searchStudents(filters: Partial<StudentFilters> = {}): Promise<Student[]> {
    const params = new URLSearchParams()
    if (filters.school) params.set("school", filters.school)
    if (filters.level) params.set("level", filters.level)
    if (filters.branch) params.set("branch", filters.branch)
    if (filters.halaqa) params.set("halaqa", filters.halaqa)
    if (filters.sheikh) params.set("sheikh", filters.sheikh)
    if (filters.minAge) params.set("min_age", filters.minAge)
    if (filters.maxAge) params.set("max_age", filters.maxAge)

    const query = params.toString() ? `?${params.toString()}` : ""
    const res = await this.request<Student[]>(`/students${query}`)
    return res.data
  }

  async getStudentById(id: string): Promise<Student> {
    const res = await this.request<Student>(`/students/${id}`)
    return res.data
  }

  async addStudent(data: Partial<Student> & { name: string }): Promise<Student> {
    const res = await this.request<Student>("/students", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        birth_date: data.birthDate,
        gender: data.gender,
        school_name: data.school,
        academic_level: data.level,
        branch_name: data.branch,
        halaqa_name: data.halaqa,
      }),
    })
    return res.data
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    const res = await this.request<Student>(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
    return res.data
  }

  async deleteStudent(id: string): Promise<boolean> {
    const res = await this.request(`/students/${id}`, { method: "DELETE" })
    return res.success
  }

  getStudentExportUrl(format: "xlsx" | "csv" | "pdf", filters: Partial<StudentFilters> = {}) {
    const params = new URLSearchParams()
    params.set("format", format)
    if (filters.branch) params.set("branch", filters.branch)
    if (filters.level) params.set("level", filters.level)
    return `${API_BASE}/students/export?${params.toString()}`
  }

  // ── Branches (F2, F8) ──
  async getBranches(): Promise<Branch[]> {
    const res = await this.request<Branch[]>("/branches")
    return res.data
  }

  // ── Halaqat (F3, F4, F5) ──
  async getHalaqat(): Promise<Halaqa[]> {
    const res = await this.request<Halaqa[]>("/halaqat")
    return res.data
  }

  // ── Sheikhs (F4) ──
  async getSheikhs(): Promise<Sheikh[]> {
    const res = await this.request<Sheikh[]>("/sheikhs")
    return res.data
  }

  // ── Roles (F6, F7) ──
  async getRoles(): Promise<Role[]> {
    const res = await this.request<Role[]>("/roles")
    return res.data
  }

  // ── Users ──
  async getUsers(): Promise<User[]> {
    const res = await this.request<User[]>("/users")
    return res.data
  }

  // ── Notifications (F12, N1) ──
  async getNotifications(): Promise<NotificationItem[]> {
    const res = await this.request<NotificationItem[]>("/notifications")
    return res.data
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: "PUT" })
  }

  async markAllNotificationsAsRead() {
    return this.request("/notifications/read-all", { method: "PUT" })
  }

  // ── Dashboard (S1) ──
  async getDashboardStats() {
    const res = await this.request("/dashboard/stats")
    return res.data
  }

  // ── Reports (S2) ──
  getReportExportUrl(type: string, format: "xlsx" | "csv" | "pdf") {
    return `${API_BASE}/reports/export?type=${type}&format=${format}`
  }
}

export const api = new ApiClient()
