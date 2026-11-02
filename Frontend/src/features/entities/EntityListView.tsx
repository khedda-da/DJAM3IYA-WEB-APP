import { useState } from "react"
import { Icon } from "@/components/ui/Icon"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { EmptyState } from "@/components/ui/EmptyState"
import { EntityFilterDrawer } from "./EntityFilterDrawer"
import {
  entityContent,
  entityAttributes,
  emptyEntityFilters,
} from "@/services/mockData"
import type { EntityType } from "@/types/navigation"
import type { EntityFilters } from "@/types/filters"

interface EntityListViewProps {
  type: EntityType
  onAdd: () => void
  onExport: () => void
  onOpen: (type: EntityType, name: string) => void
  onEdit: () => void
}

export function EntityListView({
  type,
  onAdd,
  onExport,
  onOpen,
  onEdit,
}: EntityListViewProps) {
  const content = entityContent[type]
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<EntityFilters>(emptyEntityFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeFilters = Object.entries(filters).filter(([, value]) => value)
  const rows = content.rows.filter((row) => {
    if (!row.join(" ").includes(query)) return false
    const attributes = entityAttributes[row[0]] || { status: "نشط" }
    return activeFilters.every(([key, value]) => {
      const attribute =
        attributes[key as keyof typeof attributes]
      return Array.isArray(attribute)
        ? attribute.includes(value)
        : attribute === value
    })
  })

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">{content.title}</div>
          <p>{content.subtitle}</p>
        </div>
        <Button icon="plus" onClick={onAdd}>
          {content.action}
        </Button>
      </section>

      <div className="toolbar">
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label={`بحث في ${content.title}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`ابحث في ${content.title}...`}
          />
        </label>
        <Button
          variant="secondary"
          icon="filter"
          onClick={() => setFiltersOpen(true)}
        >
          تصفية{" "}
          {activeFilters.length > 0 && (
            <span className="filter-count">{activeFilters.length}</span>
          )}
        </Button>
        <Button variant="secondary" icon="download" onClick={onExport}>
          تصدير
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="filter-chips">
          {activeFilters.map(([key, value]) => (
            <span key={key}>
              {value}
              <button
                aria-label={`إزالة ${value}`}
                onClick={() => setFilters({ ...filters, [key]: "" })}
              >
                <Icon name="close" size={13} />
              </button>
            </span>
          ))}
          <button
            className="clear-filters"
            onClick={() => setFilters(emptyEntityFilters)}
          >
            مسح الكل
          </button>
        </div>
      )}

      <section className="entity-panel">
        <div className="entity-head">
          <span>الاسم</span>
          <span>النطاق / العلاقة</span>
          <span>التفاصيل</span>
          <span>الحالة</span>
          <span />
        </div>
        {rows.length === 0 ? (
          <EmptyState
            icon={content.icon}
            title={`لا توجد نتائج في ${content.title}.`}
            detail="لا توجد سجلات تطابق البحث والفلاتر الحالية."
            action="مسح الفلاتر"
            onAction={() => {
              setQuery("")
              setFilters(emptyEntityFilters)
            }}
          />
        ) : (
          rows.map((row) => (
            <button
              className="entity-row"
              key={row[0]}
              onClick={() => onOpen(type, row[0])}
            >
              <span className="person-cell">
                <span className="avatar">
                  <Icon name={content.icon} size={18} />
                </span>
                <strong>{row[0]}</strong>
              </span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
              <span>
                <Badge
                  tone={
                    ["sheikhs", "halaqat", "branches"].includes(type) &&
                    (entityAttributes[row[0]]?.status === "غير نشط" ||
                      entityAttributes[row[0]]?.status === "متوقف")
                      ? "warning"
                      : "success"
                  }
                >
                  {["sheikhs", "halaqat", "branches"].includes(type)
                    ? entityAttributes[row[0]]?.status || row[3]
                    : row[3]}
                </Badge>
              </span>
              <Icon name="arrow" />
            </button>
          ))
        )}
      </section>

      {/* hidden edit trigger – kept for keyboard/programmatic access */}
      <button className="sr-only" onClick={onEdit}>
        تعديل
      </button>

      {filtersOpen && (
        <EntityFilterDrawer
          type={type}
          value={filters}
          onClose={() => setFiltersOpen(false)}
          onApply={(next) => {
            setFilters(next)
            setFiltersOpen(false)
          }}
        />
      )}
    </div>
  )
}
