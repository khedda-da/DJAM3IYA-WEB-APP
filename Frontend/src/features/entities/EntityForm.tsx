import { useState } from "react"
import { Icon } from "@/components/ui/Icon"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { ConfirmDialog } from "./ConfirmDialog"
import type { FormKind } from "@/types/navigation"

// ── EntitySpecificFields ─────────────────────────────────────────────────────

interface SpecificFieldsProps {
  kind: FormKind
  name: string
  setName: (value: string) => void
  error: boolean
  admins: string[]
  setAdmins: (value: string[]) => void
}

const ADMIN_POOL = ["نبيل بوعلام", "أحمد بن يوسف"]

function PermissionMatrix() {
  const permissions = [
    "عرض السجلات",
    "إنشاء وتعديل السجلات",
    "التصدير ضمن النطاق",
    "إدارة التعيينات",
    "عرض سجل النشاط",
  ]
  return (
    <div className="permission-matrix">
      {permissions.map((permission, index) => (
        <label key={permission}>
          <span>
            <strong>{permission}</strong>
            <small>
              {index === 2 ? "مقيد بنطاق المستخدم" : "صلاحية تشغيلية"}
            </small>
          </span>
          <input type="checkbox" defaultChecked={index !== 3} />
        </label>
      ))}
    </div>
  )
}

function EntitySpecificFields({
  kind,
  name,
  setName,
  error,
  admins,
  setAdmins,
}: SpecificFieldsProps) {
  if (kind === "halaqa")
    return (
      <>
        <div className="form-intro">
          <strong>معلومات الحلقة</strong>
          <small>اربط الحلقة بمقر ومستوى وشيوخ.</small>
        </div>
        <div className="form-grid">
          <label className="full">
            اسم الحلقة <em>*</em>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={error ? "invalid" : ""}
              placeholder="مثال: حلقة الإمام مالك"
            />
            {error && <span className="field-error">اسم الحلقة مطلوب.</span>}
          </label>
          <label>
            المستوى <em>*</em>
            <select>
              <option>ثانوي</option>
              <option>متوسط</option>
            </select>
          </label>
          <label>
            المقر <em>*</em>
            <select>
              <option>المقر الثاني</option>
              <option>المقر الأول</option>
            </select>
          </label>
        </div>
        <div className="multi-select">
          <strong>الشيوخ</strong>
          {["الشيخ أحمد", "الشيخ ياسين", "الشيخ محمد"].map((item, index) => (
            <label key={item}>
              <input type="checkbox" defaultChecked={index === 0} />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <label className="standalone-label">
          الوصف
          <textarea placeholder="وصف اختياري للحلقة" />
        </label>
      </>
    )

  if (kind === "branch")
    return (
      <>
        <div className="form-intro">
          <strong>معلومات المقر</strong>
          <small>يمكن تعيين ثلاثة مسؤولين كحد أقصى.</small>
        </div>
        <div className="form-grid">
          <label className="full">
            اسم المقر <em>*</em>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={error ? "invalid" : ""}
              placeholder="اسم المقر"
            />
          </label>
          <label>
            الموقع <em>*</em>
            <input placeholder="المدينة أو العنوان" />
          </label>
          <label>
            الهاتف
            <input dir="ltr" placeholder="041 00 00 00" />
          </label>
          <label>
            الحالة
            <select>
              <option>نشط</option>
              <option>غير نشط</option>
            </select>
          </label>
        </div>
        <div className="admin-picker">
          <div className="section-title">
            <strong>مسؤولو المقر ({admins.length}/3)</strong>
            <Button
              variant="secondary"
              icon="plus"
              onClick={() => {
                if (admins.length < 3) {
                  const next = ADMIN_POOL[admins.length - 1]
                  if (next) setAdmins([...admins, next])
                }
              }}
            >
              إضافة مسؤول
            </Button>
          </div>
          {admins.map((admin) => (
            <div key={admin}>
              <span className="avatar">{admin.slice(0, 2)}</span>
              <strong>{admin}</strong>
              <button
                onClick={() => setAdmins(admins.filter((a) => a !== admin))}
              >
                <Icon name="close" size={16} />
              </button>
            </div>
          ))}
          {admins.length >= 3 && (
            <span className="limit-note">
              <Icon name="info" size={16} /> تم بلوغ الحد الأقصى وهو 3 مسؤولي
              مقر.
            </span>
          )}
        </div>
      </>
    )

  if (kind === "role")
    return (
      <>
        <div className="form-grid">
          <label className="full">
            اسم الدور <em>*</em>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={error ? "invalid" : ""}
            />
          </label>
          <label>
            النطاق
            <select>
              <option>مركزي</option>
              <option>خاص بالمقر</option>
            </select>
          </label>
        </div>
        <PermissionMatrix />
      </>
    )

  if (kind === "user")
    return (
      <>
        <div className="form-intro">
          <strong>بيانات الوصول</strong>
          <small>اختر شخصا موجودا لتجنب تكرار معلوماته.</small>
        </div>
        <div className="form-grid">
          <label className="full">
            الشخص الموجود <em>*</em>
            <select value={name} onChange={(e) => setName(e.target.value)}>
              <option value="">اختر شخصا</option>
              <option>نبيل بوعلام</option>
              <option>سميرة قادري</option>
            </select>
          </label>
          <label>
            اسم المستخدم
            <input dir="ltr" placeholder="n.boualam" />
          </label>
          <label>
            إعداد الوصول
            <select>
              <option>إرسال رابط إنشاء كلمة المرور</option>
              <option>كلمة مرور مؤقتة</option>
            </select>
          </label>
          <label>
            الدور
            <select>
              <option>مدير مركزي</option>
              <option>رئيس مقر</option>
              <option>شيخ</option>
            </select>
          </label>
          <label>
            النطاق
            <select>
              <option>كل المقرات</option>
              <option>المقر الثاني</option>
            </select>
          </label>
        </div>
      </>
    )

  // Fallback (shouldn't be reached for student/sheikh — handled by stepper)
  return (
    <div className="form-grid">
      <label className="full">
        الاسم الكامل <em>*</em>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={error ? "invalid" : ""}
        />
      </label>
      <label>
        الهاتف
        <input dir="ltr" />
      </label>
      <label>
        البريد الإلكتروني
        <input type="email" dir="ltr" />
      </label>
    </div>
  )
}

// ── Constants & helpers ──────────────────────────────────────────────────────

const FORM_LABELS: Record<FormKind, string> = {
  student: "طالب",
  sheikh: "شيخ",
  halaqa: "حلقة",
  branch: "مقر",
  role: "دور",
  user: "حساب مستخدم",
}

const SAMPLE_NAMES: Record<FormKind, string> = {
  student: "محمد أمين بن علي",
  sheikh: "الشيخ أحمد",
  halaqa: "حلقة الإمام مالك",
  branch: "المقر الثاني",
  role: "إدارة التنظيم",
  user: "نبيل بوعلام",
}

const HALAQAT_OPTIONS = [
  "حلقة الإمام مالك — المقر الثاني",
  "حلقة البخاري — المقر الأول",
  "حلقة النووي — المقر الثاني",
]

// ── EntityForm ───────────────────────────────────────────────────────────────

interface EntityFormProps {
  kind: FormKind
  mode?: "add" | "edit"
  onClose: () => void
  onSuccess: (message: string) => void
}

export function EntityForm({
  kind,
  mode = "add",
  onClose,
  onSuccess,
}: EntityFormProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState(mode === "edit" ? SAMPLE_NAMES[kind] : "")
  const [error, setError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [confirmClose, setConfirmClose] = useState(false)
  const [admins, setAdmins] = useState(["سميرة قادري"])

  const personal = kind === "student" || kind === "sheikh"
  const title = `${mode === "edit" ? "تعديل" : kind === "halaqa" ? "إنشاء" : "إضافة"} ${FORM_LABELS[kind]}`

  const finish = () => {
    if (!name.trim()) {
      setError(true)
      return
    }
    setSaving(true)
    window.setTimeout(() => {
      setSaving(false)
      onSuccess(
        mode === "edit"
          ? "تم حفظ التغييرات بنجاح."
          : `تمت إضافة ${FORM_LABELS[kind]} بنجاح.`,
      )
    }, 650)
  }

  const close = () => (dirty ? setConfirmClose(true) : onClose())

  return (
    <div className="modal-layer">
      <div
        className="form-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="form-modal-head">
          <div>
            <strong>{title}</strong>
            <small>
              {mode === "edit"
                ? "عدّل البيانات ثم احفظ التغييرات"
                : personal
                  ? `الخطوة ${step} من 3`
                  : "أكمل المعلومات المطلوبة"}
            </small>
          </div>
          <IconButton icon="close" label="إغلاق" onClick={close} />
        </div>

        {personal && (
          <div className="stepper">
            {[
              ["1", "المعلومات الشخصية"],
              ["2", kind === "student" ? "الدراسة" : "المعلومات المهنية"],
              ["3", "الجمعية"],
            ].map((item, index) => (
              <div className={step >= index + 1 ? "active" : ""} key={item[0]}>
                <span>
                  {step > index + 1 ? (
                    <Icon name="check" size={16} />
                  ) : (
                    item[0]
                  )}
                </span>
                <small>{item[1]}</small>
              </div>
            ))}
          </div>
        )}

        <div className="form-content" onChange={() => setDirty(true)}>
          {personal ? (
            <>
              {step === 1 && (
                <>
                  <div className="form-intro">
                    <strong>المعلومات الشخصية</strong>
                    <small>البيانات الأساسية ويمكن تعديلها لاحقا.</small>
                  </div>
                  <div className="form-grid">
                    <label className="full">
                      الاسم الكامل <em>*</em>
                      <input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          setError(false)
                        }}
                        className={error ? "invalid" : ""}
                        placeholder="أدخل الاسم الكامل"
                      />
                      {error && (
                        <span className="field-error">
                          الاسم الكامل مطلوب.
                        </span>
                      )}
                    </label>
                    <label>
                      تاريخ الميلاد <em>*</em>
                      <input
                        type="date"
                        defaultValue={mode === "edit" ? "1985-03-14" : ""}
                      />
                    </label>
                    <label>
                      الجنس <em>*</em>
                      <select defaultValue="ذكر">
                        <option>ذكر</option>
                        <option>أنثى</option>
                      </select>
                    </label>
                    <label>
                      رقم الهاتف
                      <input
                        dir="ltr"
                        pattern="[0-9 ]+"
                        placeholder="05 00 00 00 00"
                      />
                    </label>
                    <label>
                      البريد الإلكتروني
                      <input
                        dir="ltr"
                        type="email"
                        placeholder="name@email.dz"
                      />
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="form-intro">
                    <strong>
                      {kind === "student"
                        ? "المعلومات الدراسية"
                        : "المعلومات المهنية"}
                    </strong>
                    <small>
                      {kind === "student"
                        ? "بيانات المدرسة والمستوى الدراسي."
                        : "الأدوار والخبرة داخل الجمعية."}
                    </small>
                  </div>
                  <div className="form-grid">
                    <label className="full">
                      {kind === "student" ? "المؤسسة التعليمية" : "الصفة المهنية"}
                      <input
                        defaultValue={
                          mode === "edit"
                            ? kind === "student"
                              ? "ثانوية ابن خلدون"
                              : "معلّم قرآن"
                            : ""
                        }
                        placeholder="أدخل القيمة"
                      />
                    </label>
                    <label>
                      {kind === "student" ? "المستوى الدراسي" : "الدور الإداري"}
                      <select>
                        <option>{kind === "student" ? "ثانوي" : "لا يوجد"}</option>
                        <option>
                          {kind === "student" ? "متوسط" : "إدارة التنظيم"}
                        </option>
                      </select>
                    </label>
                    <label>
                      {kind === "student" ? "السنة الدراسية" : "نطاق الدور"}
                      <select>
                        <option>
                          {kind === "student" ? "الثانية" : "مركزي"}
                        </option>
                        <option>
                          {kind === "student" ? "الثالثة" : "خاص بالمقر"}
                        </option>
                      </select>
                    </label>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="form-intro">
                    <strong>الارتباط بالجمعية</strong>
                    <small>
                      {kind === "sheikh"
                        ? "يمكن تعيين الشيخ إلى عدة حلقات دفعة واحدة."
                        : "حدّد المقر والحلقات المرتبطة."}
                    </small>
                  </div>
                  <div className="form-grid">
                    <label>
                      تاريخ التسجيل
                      <input type="date" defaultValue="2025-09-24" />
                    </label>
                    <label>
                      المقر <em>*</em>
                      <select>
                        <option>المقر الثاني / وهران</option>
                        <option>المقر الأول / الجزائر</option>
                      </select>
                    </label>
                  </div>
                  <div className="multi-select">
                    <strong>
                      {kind === "sheikh" ? "الحلقات التي يدرّسها" : "الحلقات"}{" "}
                      <em>*</em>
                    </strong>
                    {HALAQAT_OPTIONS.map((item, index) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          defaultChecked={
                            index === 0 || (kind === "sheikh" && index === 1)
                          }
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                  <div className="info-alert">
                    <Icon name="shield" />
                    <span>
                      <strong>النطاق الحالي: كل المقرات</strong>
                      <small>
                        ستُطبّق صلاحيات العرض بحسب المقر والحلقة المختارين.
                      </small>
                    </span>
                  </div>
                </>
              )}
            </>
          ) : (
            <EntitySpecificFields
              kind={kind}
              name={name}
              setName={(value) => {
                setName(value)
                setDirty(true)
              }}
              error={error}
              admins={admins}
              setAdmins={setAdmins}
            />
          )}
        </div>

        <div className="form-footer">
          <Button variant="ghost" onClick={close}>
            إلغاء
          </Button>
          <div>
            {personal && step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                السابق
              </Button>
            )}
            {personal && step < 3 ? (
              <Button
                onClick={() => {
                  if (step === 1 && !name.trim()) setError(true)
                  else setStep(step + 1)
                }}
              >
                التالي <Icon name="arrow" size={17} />
              </Button>
            ) : (
              <Button onClick={finish}>
                {saving
                  ? "جارٍ الحفظ..."
                  : mode === "edit"
                    ? "حفظ التغييرات"
                    : `حفظ ${FORM_LABELS[kind]}`}
              </Button>
            )}
          </div>
        </div>
      </div>

      {confirmClose && (
        <ConfirmDialog
          title="تغييرات غير محفوظة"
          detail="لديك تغييرات لم تُحفظ. هل تريد تجاهلها؟"
          confirmLabel="تجاهل التغييرات"
          onCancel={() => setConfirmClose(false)}
          onConfirm={onClose}
        />
      )}
    </div>
  )
}
