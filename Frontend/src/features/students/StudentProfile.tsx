import { Icon, IconButton, Button, Badge } from "@/components/ui"
import type { Student, Screen } from "@/types"

export interface StudentProfileProps {
  student?: Student
  goBack: () => void
  navigate: (s: Screen) => void
  onEdit: () => void
  onExport: () => void
  onAssign: () => void
  onDelete: () => void
}

export function StudentProfile({
  student,
  goBack,
  navigate,
  onEdit,
  onExport,
  onAssign,
  onDelete,
}: StudentProfileProps) {
  if (!student) {
    return (
      <div className="page profile-page">
        <button className="back-link" onClick={goBack}>
          <Icon name="arrow" /> العودة إلى الطلاب
        </button>
        <div className="empty-state">
          <strong>لم يتم العثور على الطالب</strong>
          <p>قد يكون الطالب قد تم حذفه أو أن المعرّف غير صحيح.</p>
          <Button variant="secondary" onClick={goBack}>
            العودة للقائمة
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page profile-page">
      <button className="back-link" onClick={goBack}>
        <Icon name="arrow" /> العودة إلى الطلاب
      </button>
      <section className="profile-header">
        <div className="profile-identity">
          <span className="avatar profile-avatar">{student.initials}</span>
          <div>
            <div className="title-with-badge">
              <div className="page-title">{student.name}</div>
              <Badge tone="info">طالب</Badge>
            </div>
            <p>
              <span dir="ltr">{student.id}</span> · {student.age} سنة · مسجل منذ {student.date}
            </p>
            <div className="scope-line">
              <Icon name="branch" size={16} /> {student.branch}
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <Button variant="secondary" icon="download" onClick={onExport}>
            تصدير
          </Button>
          <Button icon="edit" onClick={onEdit}>
            تعديل
          </Button>
          <IconButton icon="more" label="حذف الطالب" onClick={onDelete} />
        </div>
      </section>
      <div className="profile-layout">
        <main>
          <section className="detail-section">
            <div className="section-title">
              <strong>المعلومات الشخصية</strong>
              <button onClick={onEdit}>تعديل</button>
            </div>
            <div className="details-grid">
              <div>
                <small>تاريخ الميلاد</small>
                <strong>{student.birthDate || "14 مارس 2009"}</strong>
              </div>
              <div>
                <small>الجنس</small>
                <strong>{student.gender || "ذكر"}</strong>
              </div>
              <div>
                <small>الهاتف</small>
                <strong dir="ltr">{student.phone || "0556 43 28 19"}</strong>
              </div>
              <div>
                <small>البريد الإلكتروني</small>
                <strong dir="ltr">{student.email || "mohamed.amine@email.dz"}</strong>
              </div>
            </div>
          </section>
          <section className="detail-section">
            <div className="section-title">
              <strong>المعلومات الدراسية</strong>
              <button onClick={onEdit}>تعديل</button>
            </div>
            <div className="details-grid">
              <div>
                <small>المؤسسة التعليمية</small>
                <strong>{student.school}</strong>
              </div>
              <div>
                <small>المستوى الدراسي</small>
                <strong>{student.level}</strong>
              </div>
            </div>
          </section>
          <section className="detail-section">
            <div className="section-title">
              <strong>الارتباطات القرآنية</strong>
              <Button variant="secondary" icon="plus" onClick={onAssign}>
                إضافة إلى حلقة
              </Button>
            </div>
            <div className="relationship-flow">
              <button onClick={() => navigate("student")}>
                <span className="relation-icon">
                  <Icon name="school" />
                </span>
                <small>الطالب</small>
                <strong>{student.name.split(" ")[0]}</strong>
              </button>
              <Icon name="chevron" />
              <button onClick={() => navigate("halaqat")}>
                <span className="relation-icon">
                  <Icon name="book" />
                </span>
                <small>الحلقة</small>
                <strong>{student.halaqa}</strong>
              </button>
              <Icon name="chevron" />
              <button onClick={() => navigate("sheikhs")}>
                <span className="relation-icon">
                  <Icon name="user" />
                </span>
                <small>الشيخ</small>
                <strong>{student.sheikh}</strong>
              </button>
              <Icon name="chevron" />
              <button onClick={() => navigate("branches")}>
                <span className="relation-icon">
                  <Icon name="branch" />
                </span>
                <small>المقر</small>
                <strong>{student.branch}</strong>
              </button>
            </div>
            <div className="relationship-note">
              <Icon name="check" />
              <span>
                <strong>عضوية إضافية</strong>
                <small>حلقة ابن الجزري · المقر الثالث · كل يوم جمعة</small>
              </span>
              <button onClick={() => navigate("halaqat")}>عرض الحلقة</button>
            </div>
          </section>
        </main>
        <aside className="profile-aside">
          <div className="aside-block">
            <strong>معلومات سريعة</strong>
            <div>
              <span>الحالة</span>
              <Badge tone={student.status === "نشط" ? "success" : "warning"}>
                {student.status}
              </Badge>
            </div>
            <div>
              <span>تاريخ التسجيل</span>
              <b>{student.date}</b>
            </div>
            <div>
              <span>عدد الحلقات</span>
              <b>2</b>
            </div>
          </div>
          <div className="aside-block">
            <strong>آخر نشاط</strong>
            <div className="mini-activity">
              <i />
              <span>
                <b>تم تحديث المستوى الدراسي</b>
                <small>منذ يومين · بواسطة نبيل</small>
              </span>
            </div>
            <div className="mini-activity">
              <i />
              <span>
                <b>أضيف إلى {student.halaqa}</b>
                <small>منذ 12 يوما</small>
              </span>
            </div>
            <button
              className="text-action"
              onClick={() => navigate("activity")}
            >
              عرض السجل الكامل
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
