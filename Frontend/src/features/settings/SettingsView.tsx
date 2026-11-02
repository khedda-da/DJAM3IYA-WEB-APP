import { useState } from "react"
import { Button } from "@/components/ui"

export interface SettingsViewProps {
  onSave: (message: string) => void
}

export function SettingsView({ onSave }: SettingsViewProps) {
  const [section, setSection] = useState("الملف الشخصي")
  const [name, setName] = useState("نبيل بوعلام")
  const [email, setEmail] = useState("n.boualam@djam3ya.dz")
  const [lang, setLang] = useState("ar")
  const [notificationsEmail, setNotificationsEmail] = useState(true)
  const [notificationsSMS, setNotificationsSMS] = useState(false)

  const handleSave = () => {
    onSave("تم حفظ الإعدادات بنجاح.")
  }

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">الإعدادات</div>
          <p>إعدادات الحساب، اللغة وتجربة الاستخدام.</p>
        </div>
        <Button onClick={handleSave}>حفظ التغييرات</Button>
      </section>

      <div className="settings-layout">
        <aside>
          {["الملف الشخصي", "الإشعارات", "اللغة والعرض", "الأمان"].map(
            (item) => (
              <button
                key={item}
                className={section === item ? "active" : ""}
                onClick={() => setSection(item)}
              >
                {item}
              </button>
            ),
          )}
        </aside>

        <section className="settings-form">
          <div className="section-title">
            <strong>{section}</strong>
          </div>

          {section === "الملف الشخصي" && (
            <>
              <div className="profile-edit">
                <span className="avatar profile-avatar">نب</span>
                <div>
                  <strong>{name}</strong>
                  <small>مدير مركزي · كل المقرات</small>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      onSave("يمكنك الآن اختيار صورة جديدة من جهازك.")
                    }
                  >
                    تغيير الصورة
                  </Button>
                </div>
              </div>
              <div className="form-grid">
                <label>
                  الاسم الكامل
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  البريد الإلكتروني
                  <input
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}

          {section === "الإشعارات" && (
            <div className="permission-matrix">
              <label>
                <div>
                  <strong>إشعارات البريد الإلكتروني</strong>
                  <small>تلقي تقارير شهرية وتنبيهات الحلقات</small>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEmail}
                  onChange={(e) => setNotificationsEmail(e.target.checked)}
                />
              </label>
              <label>
                <div>
                  <strong>رسائل SMS</strong>
                  <small>إشعارات عاجلة وتحديثات الحساب</small>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsSMS}
                  onChange={(e) => setNotificationsSMS(e.target.checked)}
                />
              </label>
            </div>
          )}

          {section === "اللغة والعرض" && (
            <div className="form-grid">
              <label>
                اللغة
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="ar">العربية</option>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label>
                المنطقة الزمنية
                <select defaultValue="algiers">
                  <option value="algiers">الجزائر (GMT+1)</option>
                </select>
              </label>
            </div>
          )}

          {section === "الأمان" && (
            <div className="form-grid">
              <label>
                كلمة المرور الحالية
                <input type="password" placeholder="••••••••" />
              </label>
              <label>
                كلمة المرور الجديدة
                <input type="password" placeholder="••••••••" />
              </label>
              <label className="full">
                تأكيد كلمة المرور الجديدة
                <input type="password" placeholder="••••••••" />
              </label>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
