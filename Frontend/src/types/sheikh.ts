export interface Sheikh {
  id: string
  name: string
  phone: string
  email: string
  halaqat: string[]
  branches: string[]
  studentCount: number
  status: "نشط" | "غير نشط"
}
