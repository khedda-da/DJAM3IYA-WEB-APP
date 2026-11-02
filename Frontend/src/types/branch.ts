export interface Branch {
  id: string
  name: string
  location: string
  phone?: string
  studentCount: number
  adminCount: number
  admins: string[]
  status: "نشط" | "غير نشط"
}
