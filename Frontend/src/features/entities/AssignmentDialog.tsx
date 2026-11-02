import { Icon } from "@/components/ui/Icon"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import type { FormKind } from "@/types/navigation"

interface AssignmentDialogProps {
  kind: FormKind
  onClose: () => void
  onDone: (message: string) => void
}

const HALAQA_OPTIONS = [
  "حلقة الإمام مالك — المقر الثاني",
  "حلقة البخاري — المقر الأول",
  "حلقة النووي — المقر الثاني",
]

export function AssignmentDialog({
  kind,
  onClose,
  onDone,
}: AssignmentDialogProps) {
  const title =
    kind === "sheikh"
      ? "تعيين الشيخ في حلقات"
      : kind === "student"
        ? "تعيين الطالب إلى حلقة"
        : "إدارة التعيينات"

  return (
    <div className="modal-layer">
      <div className="dialog assignment-dialog">
        <div className="form-modal-head">
          <div>
            <strong>{title}</strong>
            <small>ابحث وحدد عنصرا أو أكثر ضمن نطاقك.</small>
          </div>
          <IconButton icon="close" label="إغلاق" onClick={onClose} />
        </div>
        <div className="dialog-content">
          <label className="search-field">
            <Icon name="search" />
            <input autoFocus placeholder="ابحث بالاسم..." />
          </label>
          <div className="multi-select">
            {HALAQA_OPTIONS.map((item, index) => (
              <label key={item}>
                <input type="checkbox" defaultChecked={index === 0} />
                <span>
                  <strong>{item}</strong>
                  <small>{18 + index * 6} طالبا</small>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="dialog-footer">
          <Button variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
          <Button
            onClick={() => {
              onDone("تم تحديث التعيينات بنجاح.")
              onClose()
            }}
          >
            حفظ التعيينات
          </Button>
        </div>
      </div>
    </div>
  )
}
