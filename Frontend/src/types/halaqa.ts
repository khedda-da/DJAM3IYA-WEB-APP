export interface Halaqa {
  id: string
  name: string
  branch: string
  sheikh: string
  level: "ابتدائي" | "متوسط" | "ثانوي" | "جامعي"
  studentCount: number
  status: "نشط" | "متوقف"
  description?: string
}

export interface HalaqaRecord {
  name: string
  branch: string
  sheikh: string
  level: string
  students: number
}
