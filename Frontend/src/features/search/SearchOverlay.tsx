import { useState } from "react"
import { Icon, EmptyState } from "@/components/ui"
import type { Screen, IconName } from "@/types"

export interface SearchOverlayProps {
  onClose: () => void
  navigate: (s: Screen) => void
}

interface SearchResult {
  title: string
  subtitle: string
  icon: IconName
  screen: Screen
  category: string
}

const searchDataset: SearchResult[] = [
  {
    title: "محمد أمين بن علي",
    subtitle: "المقر الثاني · حلقة الإمام مالك",
    icon: "school",
    screen: "student",
    category: "الطلاب",
  },
  {
    title: "الشيخ محمد",
    subtitle: "شيخ · حلقة النووي",
    icon: "user",
    screen: "sheikhs",
    category: "الشيوخ",
  },
  {
    title: "حلقة الإمام مالك",
    subtitle: "32 طالبا · المقر الثاني",
    icon: "book",
    screen: "halaqat",
    category: "الحلقات",
  },
  {
    title: "المقر الثاني",
    subtitle: "وهران · 368 طالبا",
    icon: "branch",
    screen: "branches",
    category: "المقرات",
  },
  {
    title: "نبيل بوعلام",
    subtitle: "مدير مركزي",
    icon: "userCog",
    screen: "users",
    category: "المستخدمون",
  },
]

export function SearchOverlay({ onClose, navigate }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = searchDataset.filter((item) =>
    `${item.title} ${item.subtitle} ${item.category}`.includes(query),
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault()
      navigate(filtered[selectedIndex].screen)
      onClose()
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="command-palette"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="البحث الشامل"
      >
        <div className="command-input">
          <Icon name="search" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="ابحث عن طالب، شيخ، حلقة، مقر أو مستخدم..."
          />
          <kbd>Esc</kbd>
        </div>
        <div className="command-results">
          {filtered.length ? (
            filtered.map((item, index) => (
              <div className="result-group" key={item.title}>
                {(index === 0 || filtered[index - 1].category !== item.category) && (
                  <small className="result-label">{item.category}</small>
                )}
                <button
                  className={selectedIndex === index ? "selected-command" : ""}
                  style={
                    selectedIndex === index
                      ? { background: "var(--primary-soft)" }
                      : undefined
                  }
                  onClick={() => {
                    navigate(item.screen)
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="result-icon">
                    <Icon name={item.icon} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <kbd>↵</kbd>
                </button>
              </div>
            ))
          ) : (
            <EmptyState
              icon="search"
              title="لا توجد نتائج."
              detail="جرّب الاسم أو المعرّف أو اسم المقر."
            />
          )}
        </div>
        <div className="command-help">
          <span>↑↓ للتنقل</span>
          <span>↵ للفتح</span>
          <span>Esc للإغلاق</span>
        </div>
      </div>
    </div>
  )
}
