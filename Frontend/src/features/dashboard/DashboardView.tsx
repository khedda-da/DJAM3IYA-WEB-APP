import { Icon, Button } from "@/components/ui"
import type { Screen, FormKind, IconName } from "@/types"

export interface DashboardViewProps {
  navigate: (s: Screen) => void
  onAdd: (kind: FormKind) => void
  onExport: () => void
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string
  value: string
  detail: string
  icon: IconName
}) {
  return (
    <div className="metric">
      <div className="metric-icon">
        <Icon name={icon} />
      </div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </div>
  )
}

export function DashboardView({
  navigate,
  onAdd,
  onExport,
}: DashboardViewProps) {
  // Format current Arabic date cleanly
  const todayFormatted = new Intl.DateTimeFormat("ar-DZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date())

  return (
    <div className="page">
      <section className="welcome-row">
        <div>
          <div className="eyebrow">{todayFormatted}</div>
          <div className="page-title">صباح الخير، نبيل</div>
          <p>إليك ملخص واضح لما يحدث في الجمعية اليوم.</p>
        </div>
        <div className="quick-actions">
          <Button variant="secondary" icon="download" onClick={onExport}>
            تصدير
          </Button>
          <Button icon="plus" onClick={() => onAdd("student")}>
            إضافة طالب
          </Button>
        </div>
      </section>

      <div className="metrics-grid">
        <MetricCard
          label="إجمالي الطلاب"
          value="1,248"
          detail="+32 هذا الشهر"
          icon="school"
        />
        <MetricCard label="الشيوخ" value="46" detail="42 نشطون حاليا" icon="user" />
        <MetricCard label="الحلقات" value="38" detail="35 حلقة نشطة" icon="book" />
        <MetricCard label="المقرات" value="4" detail="جميعها نشطة" icon="branch" />
      </div>

      <div className="dashboard-grid">
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <strong>الطلاب حسب المقر</strong>
              <small>توزيع الطلاب النشطين</small>
            </div>
            <button
              className="text-action"
              onClick={() => navigate("branches")}
            >
              عرض المقرات <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="bar-chart">
            {[
              { name: "المقر الأول", val: "412", width: 92 },
              { name: "المقر الثاني", val: "368", width: 82 },
              { name: "المقر الثالث", val: "276", width: 62 },
              { name: "المقر الرابع", val: "192", width: 43 },
            ].map(({ name, val, width }) => (
              <div className="bar-row" key={name}>
                <span>{name}</span>
                <div>
                  <i style={{ width: `${width}%` }} />
                </div>
                <strong>{val}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <strong>إجراءات سريعة</strong>
              <small>المهام الأكثر استخداما</small>
            </div>
          </div>
          <div className="action-list">
            {[
              { label: "إضافة طالب جديد", icon: "school" as IconName, id: "student" as FormKind },
              { label: "إنشاء حلقة", icon: "book" as IconName, id: "halaqa" as FormKind },
              { label: "إضافة شيخ", icon: "user" as IconName, id: "sheikh" as FormKind },
              { label: "إضافة مقر", icon: "branch" as IconName, id: "branch" as FormKind },
            ].map(({ label, icon, id }) => (
              <button key={label} onClick={() => onAdd(id)}>
                <span>
                  <Icon name={icon} />
                </span>
                {label}
                <Icon name="arrow" size={17} />
              </button>
            ))}
          </div>
        </section>

        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <strong>الحلقات الأكثر نشاطا</strong>
              <small>خلال آخر 30 يوما</small>
            </div>
            <button className="text-action" onClick={() => navigate("halaqat")}>
              عرض الكل
            </button>
          </div>
          <div className="halaqa-list">
            {[
              { name: "حلقة الإمام مالك", branch: "المقر الثاني", sheikh: "الشيخ أحمد", count: "32" },
              { name: "حلقة البخاري", branch: "المقر الأول", sheikh: "الشيخ ياسين", count: "28" },
              { name: "حلقة النووي", branch: "المقر الثاني", sheikh: "الشيخ محمد", count: "24" },
            ].map((h, i) => (
              <button key={h.name} onClick={() => navigate("halaqat")}>
                <span className="rank">{i + 1}</span>
                <span>
                  <strong>{h.name}</strong>
                  <small>
                    {h.branch} · {h.sheikh}
                  </small>
                </span>
                <span className="student-count">
                  <strong>{h.count}</strong>
                  <small>طالبا</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <strong>آخر النشاطات</strong>
              <small>على مستوى الجمعية</small>
            </div>
            <button
              className="text-action"
              onClick={() => navigate("activity")}
            >
              السجل
            </button>
          </div>
          <div className="timeline">
            {[
              { title: "أضاف أحمد طالبا جديدا", desc: "محمد أمين بن علي", time: "منذ 10 دقائق" },
              { title: "تم تحديث حلقة الإمام مالك", desc: "المقر الثاني", time: "منذ 45 دقيقة" },
              { title: "تم تعيين الشيخ ياسين", desc: "حلقة البخاري", time: "منذ ساعتين" },
            ].map((a) => (
              <div className="timeline-item" key={a.title}>
                <span className="timeline-dot" />
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.desc}</span>
                  <small>{a.time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
