import { useState } from "react"
import { Icon, Button, Badge, EmptyState } from "@/components/ui"
import { activityRows } from "@/services/mockData"

export interface ActivityListProps {
  compact?: boolean
  rows?: string[][]
}

export function ActivityList({
  compact = false,
  rows = activityRows,
}: ActivityListProps) {
  return (
    <section className={`activity-feed ${compact ? "compact" : ""}`}>
      {rows.map((item) => (
        <div key={`${item[0]}-${item[4]}`}>
          <span className="avatar">{item[0].slice(0, 2)}</span>
          <p>
            <strong>{item[0]}</strong> {item[1]} <b>{item[2]}</b>
            <small>
              <Icon name="branch" size={14} /> {item[3]} · {item[4]}
            </small>
          </p>
          <Badge tone="info">تحديث</Badge>
        </div>
      ))}
    </section>
  )
}

export function ActivityView() {
  const [query, setQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<string>("")

  const rows = activityRows
    .filter((row) => row.join(" ").includes(query))
    .filter((row) => !selectedBranch || row[3] === selectedBranch)

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">سجل النشاط</div>
          <p>سجل واضح للمساءلة: من قام بماذا، ومتى وأين.</p>
        </div>
      </section>

      <div className="toolbar">
        <label className="search-field">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="بحث النشاط"
            placeholder="ابحث عن مستخدم أو إجراء..."
          />
        </label>
        <Button
          variant="secondary"
          icon="filter"
          onClick={() =>
            setSelectedBranch(selectedBranch ? "" : "المقر الثاني")
          }
        >
          الفلاتر {selectedBranch && <span className="filter-count">1</span>}
        </Button>
      </div>

      {selectedBranch && (
        <div className="filter-chips">
          <span>
            {selectedBranch}{" "}
            <button onClick={() => setSelectedBranch("")}>
              <Icon name="close" size={13} />
            </button>
          </span>
        </div>
      )}

      {rows.length ? (
        <ActivityList rows={rows} />
      ) : (
        <EmptyState
          icon="activity"
          title="لا يوجد نشاط يطابق فلاترك."
          detail="جرّب تغيير البحث أو مسح الفلاتر."
          action="مسح الفلاتر"
          onAction={() => {
            setQuery("")
            setSelectedBranch("")
          }}
        />
      )}
    </div>
  )
}
