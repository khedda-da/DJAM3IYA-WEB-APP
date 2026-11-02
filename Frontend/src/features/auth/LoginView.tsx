import { useState } from "react"
import { Icon, Button } from "@/components/ui"

export interface LoginViewProps {
  onLogin: () => void
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [recovery, setRecovery] = useState(false)
  const [username, setUsername] = useState("n.boualam")
  const [password, setPassword] = useState("password")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login-page">
      <section className="login-brand">
        <img
          className="brand-logo large"
          src="/logo.svg"
          alt="جمعية العلماء المسلمين"
        />
        <strong>الادارة</strong>
        <p>إدارة الجمعية، الأشخاص والحلقات في مكان واحد واضح وآمن.</p>
        <div className="login-quote">
          “بيانات معقدة، أصبحت إنسانية وسهلة الفهم.”
        </div>
      </section>
      <main className="login-form">
        <div className="language-switch">العربية · Français · English</div>
        <div>
          <div className="page-title">مرحبا بعودتك</div>
          <p>سجّل الدخول للوصول إلى نطاق عملك.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            البريد الإلكتروني أو اسم المستخدم
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="name@djam3ya.dz"
              required
            />
          </label>
          <label>
            كلمة المرور
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" defaultChecked /> تذكرني
            </label>
            <button type="button" onClick={() => setRecovery(!recovery)}>
              نسيت كلمة المرور؟
            </button>
          </div>
          {recovery && (
            <div className="info-alert">
              <Icon name="mail" />
              <span>
                <strong>استعادة الوصول</strong>
                <small>
                  أدخل اسم المستخدم ثم تواصل مع مدير النطاق لإرسال رابط آمن.
                </small>
              </span>
            </div>
          )}
          <Button type="submit">تسجيل الدخول</Button>
        </form>
        <small className="secure-note">
          <Icon name="shield" size={16} /> دخول محمي. لا تشارك بيانات حسابك مع
          أي شخص.
        </small>
      </main>
    </div>
  )
}
