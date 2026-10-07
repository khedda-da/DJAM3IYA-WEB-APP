export interface User {
  id: string
  name: string
  email: string
  role: string
  branch: string
  lastActive: string
  status: "نشط" | "غير نشط"
}
