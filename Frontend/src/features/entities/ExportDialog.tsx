import { useState } from "react"
import { Icon } from "@/components/ui/Icon"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"

interface ExportDialogProps {
  title: string
  count: number
  onClose: () => void
  onReady: (message: string) => void
}

type ExportStatus = "idle" | "preparing" | "ready"
const FORMAT_OPTIONS = ["Excel", "CSV", "PDF"] as const

export function ExportDialog({
  title,
  count,
  onClose,
  onReady,
}: ExportDialogProps) {
  const [format, setFormat] = useState("Excel")
  const [scope, setScope] = useState<"current" | "all">("current")
  const [status, setStatus] = useState<ExportStatus>("idle")

  const prepare = () => {
    setStatus("preparing")
    window.setTimeout(() => setStatus("ready"), 700)
  }

  return (
    <div className="modal-layer">
      <div className="dialog export-dialog" role="dialog" aria-modal="true">
        <div className="form-modal-head">
          <div>
            <strong>تصدير {title}</strong>
            <small>سيحترم الملف نطاق صلاحياتك الحالي.</small>
          </div>
          <IconButton icon="close" label="إغلاق" onClick={onClose} />
        </div>

        {status === "ready" ? (
          <div className="dialog-state">
            <span className="success-mark">
              <Icon name="check" />
            </span>
            <strong>ملف التصدير جاهز.</strong>
            <p>
              {format} ·{" "}
              {scope === "current"
                ? `${count} سجلات مطابقة`
                : "كل السجلات المسموح بها"}
            </p>
            <Button
              icon="download"
              onClick={() => {
                onReady("بدأ تنزيل الملف.")
                onClose()
              }}
            >
              تنزيل الملف
            </Button>
            <Button variant="ghost" onClick={onClose}>
              إغلاق
            </Button>
          </div>
        ) : (
          <>
            <div className="dialog-content">
              <fieldset>
                <legend>اختر التنسيق</legend>
                <div className="option-grid">
                  {FORMAT_OPTIONS.map((item) => (
                    <label
                      className={format === item ? "selected" : ""}
                      key={item}
                    >
                      <input
                        type="radio"
                        name="format"
                        checked={format === item}
                        onChange={() => setFormat(item)}
                      />
                      <strong>{item}</strong>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>نطاق البيانات</legend>
                <label className="radio-row">
                  <input
                    type="radio"
                    name="scope"
                    checked={scope === "current"}
                    onChange={() => setScope("current")}
                  />
                  <span>
                    <strong>النتائج الحالية</strong>
                    <small>{count} سجلات تطابق البحث والفلاتر الحالية.</small>
                  </span>
                </label>
                <label className="radio-row">
                  <input
                    type="radio"
                    name="scope"
                    checked={scope === "all"}
                    onChange={() => setScope("all")}
                  />
                  <span>
                    <strong>كل السجلات المسموح بها</strong>
                    <small>
                      بصفتك مديرا مركزيا، يمكنك التصدير من كل المقرات.
                    </small>
                  </span>
                </label>
              </fieldset>
            </div>
            <div className="dialog-footer">
              <Button variant="ghost" onClick={onClose}>
                إلغاء
              </Button>
              <Button icon="download" onClick={prepare}>
                {status === "preparing" ? "جارٍ تحضير التصدير..." : "تصدير"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
