export type StudentLevel = "ابتدائي" | "متوسط" | "ثانوي" | "جامعي"
export type StudentStatus = "نشط" | "متوقف"

export interface Student {
  id: string
  name: string
  initials: string
  age: number
  school: string
  level: StudentLevel
  branch: string
  halaqa: string
  sheikh: string
  date: string
  status: StudentStatus
  phone?: string
  email?: string
  birthDate?: string
  gender?: "ذكر" | "أنثى"
}
