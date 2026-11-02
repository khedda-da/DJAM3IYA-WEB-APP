import { useState } from "react"
import { IconButton } from "@/components/ui"
import { entityContent } from "@/services/mockData"
import type { EntityType, EntityFilters } from "@/types"

export interface EntityFilterDrawerProps {
  type: EntityType
  value: EntityFilters
  onClose: () => void
  onApply: (filters: EntityFilters) => void
}

export function EntityFilterDrawer({
  type,
  value,
  onClose,
  onApply,
}: EntityFilterDrawerProps) {
  const [draft, setDraft] = useState(value)
  const update = (key: keyof EntityFilters, val: string) =>
    setDraft({ ...draft, [key]: val })
  const isSheikh = type === "sheikhs",
    isHalaqa = type === "halaqat",
    isBranch = type === "branches"

  return (
    <div className="drawer-layer">
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="filter-drawer">
        <div className="drawer-head">
          <div>
            <strong>تصفية {entityContent[type].title}</strong>
            <small>اجمع بين عدة فلاتر لدقة أكبر</small>
          </div>
          <IconButton icon="close" label="إغلاق" onClick={onClose} />
        </div>
        <div className="drawer-content">
          {(isSheikh || isHalaqa) && (
            <label>
              المقر
              <select
                value={draft.branch}
                onChange={(event) => update("branch", event.target.value)}
              >
                <option value="">كل المقرات</option>
                <option>المقر الأول</option>
                <option>المقر الثاني</option>
                <option>المقر الثالث</option>
              </select>
            </label>
          )}
          {isSheikh && (
            <label>
              الحلقة
              <select
                value={draft.halaqa}
                onChange={(event) => update("halaqa", event.target.value)}
              >
                <option value="">كل الحلقات</option>
                <option>حلقة الإمام مالك</option>
                <option>حلقة البخاري</option>
                <option>حلقة النووي</option>
              </select>
            </label>
          )}
          {isHalaqa && (
            <>
              <label>
                الشيخ
                <select
                  value={draft.sheikh}
                  onChange={(event) => update("sheikh", event.target.value)}
                >
                  <option value="">كل الشيوخ</option>
                  <option>الشيخ أحمد</option>
                  <option>الشيخ ياسين</option>
                  <option>الشيخ محمد</option>
                </select>
              </label>
              <label>
                المستوى
                <select
                  value={draft.level || ""}
                  onChange={(event) => update("level", event.target.value)}
                >
                  <option value="">كل المستويات</option>
                  <option>ابتدائي</option>
                  <option>متوسط</option>
                  <option>ثانوي</option>
                  <option>جامعي</option>
                </select>
              </label>
            </>
          )}
          {isBranch && (
            <label>
              الحالة
              <select
                value={draft.status}
                onChange={(event) => update("status", event.target.value)}
              >
                <option value="">كل الحالات</option>
                <option>نشط</option>
                <option>غير نشط</option>
              </select>
            </label>
          )}
        </div>
        <div className="drawer-footer">
          <button
            className="clear-filters"
            onClick={() => {
              const empty: EntityFilters = {
                branch: "",
                halaqa: "",
                sheikh: "",
                status: "",
              }
              setDraft(empty)
              onApply(empty)
            }}
          >
            إعادة الضبط
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onApply(draft)}
          >
            تطبيق الفلاتر
          </button>
        </div>
      </aside>
    </div>
  )
}
