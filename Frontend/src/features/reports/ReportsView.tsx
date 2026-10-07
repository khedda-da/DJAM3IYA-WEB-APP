import { useState } from "react"
import { Icon, Button, EmptyState } from "@/components/ui"
import type { IconName } from "@/types"

export interface ReportsViewProps {
  onExport: () => void
}

function SkeletonRows() {
  return (
    <div className="skeleton-list" aria-label="جارٍ التحميل">
      {[1, 2, 3].map((item) => (
        <div key={item}>
          <i />
          <span>
            <b />
            <small />
          </span>
        </div>
      ))}
    </div>
  )
}

const availableReports = [
  {
    title: "الطلاب حسب المقر",
    desc: "توزيع وأعداد الطلاب النشطين",
    icon: "branch" as IconName,
  },
  {
    title: "الطلاب حسب المستوى الدراسي",
    desc: "ابتدائي، متوسط، ثانوي وجامعي",
    icon: "school" as IconName,
  },
  {
    title: "الطلاب حسب الحلقة",
    desc: "الحلقات والشيوخ المرتبطون",
    icon: "book" as IconName,
  },
  {
    title: "الطلاب حسب الشيخ",
    desc: "أعداد الطلاب حسب الشيخ والحلقة",
    icon: "user" as IconName,
  },
  {
    title: "إحصائيات التسجيل",
    desc: "التسجيلات حسب الفترة الزمنية",
    icon: "calendar" as IconName,
  },
]

export function ReportsView({ onExport }: ReportsViewProps) {
  const [report, setReport] = useState("")
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 700)
  }

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">التقارير</div>
          <p>أنشئ تقارير دقيقة ضمن نطاق صلاحياتك.</p>
        </div>
        <Button icon="download" onClick={() => setReport(availableReports[0].title)}>
          تقرير جديد
        </Button>
      </section>

      <div className="report-banner">
        <div>
          <Icon name="shield" />
          <span>
            <strong>نطاق التصدير: كل المقرات</strong>
            <small>لديك صلاحية التصدير المركزي.</small>
          </span>
        </div>
        <button onClick={() => setReport("الصلاحيات")}>مراجعة الصلاحيات</button>
      </div>

      {!report ? (
        <>
          <div className="report-grid">
            {availableReports.map((item) => (
              <button
                className="report-card"
                key={item.title}
                onClick={() => {
                  setReport(item.title)
                  setGenerated(false)
                }}
              >
                <span>
                  <Icon name={item.icon} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
                <b>
                  إنشاء التقرير <Icon name="arrow" size={16} />
                </b>
              </button>
            ))}
          </div>
          <EmptyState
            icon="chart"
            title="لم يتم إنشاء تقرير بعد."
            detail="اختر أحد التقارير أعلاه وحدد نطاق البيانات المطلوب."
          />
        </>
      ) : (
        <section className="report-builder">
          <div className="section-title">
            <div>
              <strong>{report}</strong>
              <small>حدّد الفلاتر ثم أنشئ التقرير.</small>
            </div>
            <button
              onClick={() => {
                setReport("")
                setGenerated(false)
              }}
            >
              اختيار تقرير آخر
            </button>
          </div>
          <div className="form-grid">
            <label>
              المقر
              <select>
                <option>كل المقرات</option>
                <option>المقر الثاني</option>
              </select>
            </label>
            <label>
              المستوى الدراسي
              <select>
                <option>كل المستويات</option>
                <option>ثانوي</option>
              </select>
            </label>
            <label>
              من
              <input type="date" />
            </label>
            <label>
              إلى
              <input type="date" />
            </label>
          </div>
          <Button icon="chart" onClick={generate}>
            {generating ? "جارٍ إنشاء التقرير..." : "إنشاء التقرير"}
          </Button>
          {generating && <SkeletonRows />}
          {generated && (
            <div className="report-result">
              <div className="success-mark">
                <Icon name="check" />
              </div>
              <div>
                <strong>تم إنشاء التقرير.</strong>
                <small>يعرض 1,248 طالبا ضمن النطاق والفترة المحددين.</small>
              </div>
              <div className="mini-chart">
                {[82, 61, 46, 34].map((height, index) => (
                  <i key={height} style={{ height: `${height}%` }}>
                    <span>{["412", "368", "276", "192"][index]}</span>
                  </i>
                ))}
              </div>
              <div className="export-actions">
                <Button variant="secondary" onClick={onExport}>
                  PDF
                </Button>
                <Button variant="secondary" onClick={onExport}>
                  Excel
                </Button>
                <Button variant="secondary" onClick={onExport}>
                  CSV
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
