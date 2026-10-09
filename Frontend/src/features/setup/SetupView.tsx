import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icon"

type SetupViewProps = {
  onComplete: () => void
}

export function SetupView({ onComplete }: SetupViewProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("مدير الجمعية")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    window.setTimeout(onComplete, 900)
  }

  return (
    <main className="setup-page" dir="rtl">
      <div className="setup-shell">
        <div className="setup-brand" aria-label="جمعيتي">
          <span className="brand-mark">ج</span>
          <div>
            <strong>جمعيتي</strong>
            <small>إدارة الجمعيات القرآنية</small>
          </div>
        </div>

        <div className="setup-progress" aria-label="خطوة واحدة من خطوة واحدة">
          <span className="setup-progress-active" />
        </div>

        <section className="setup-card" aria-labelledby="setup-title">
          <div className="setup-icon" aria-hidden="true">
            <Icon name="user" size={22} />
          </div>
          <p className="eyebrow">إعداد الحساب الأول</p>
          <h1 id="setup-title">مرحباً بك في جمعيتي</h1>
          <p className="setup-intro">
            أنشئ ملفك الإداري الأول لنبدأ بتجهيز مساحة الجمعية الخاصة بك.
          </p>

          <form onSubmit={handleSubmit} className="setup-form">
            <label htmlFor="setup-name">الاسم الكامل</label>
            <input
              id="setup-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="مثال: محمد العلوي"
              required
              autoComplete="name"
            />

            <label htmlFor="setup-email">البريد الإلكتروني</label>
            <input
              id="setup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
              autoComplete="email"
              dir="ltr"
            />

            <label htmlFor="setup-role">الدور داخل الجمعية</label>
            <select id="setup-role" value={role} onChange={(event) => setRole(event.target.value)}>
              <option>مدير الجمعية</option>
              <option>مشرف</option>
              <option>إداري</option>
            </select>

            <Button type="submit" icon="arrow-left" disabled={submitted}>
              {submitted ? "جارٍ تجهيز حسابك..." : "البدء باستخدام المنصة"}
            </Button>
          </form>

          <p className="setup-note">
            <Icon name="shield" size={14} /> بياناتك محفوظة بأمان ويمكن تعديلها لاحقاً من الإعدادات.
          </p>
        </section>
      </div>
    </main>
  )
}

export default SetupView
