export interface Role {
  id: string
  name: string
  scope: "مركزي" | "خاص بالمقر" | "مركزي وفروع"
  userCount: number
  accessLevel: "كامل" | "مخصص" | "مقيد"
  status: "نشط" | "غير نشط"
}
