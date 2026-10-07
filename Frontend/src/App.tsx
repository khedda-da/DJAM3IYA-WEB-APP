import { useEffect, useMemo, useState } from "react"
import {
  Activity as ActivityIcon,
  ArrowLeft,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleX,
  Clock3,
  Command,
  FileDown,
  Filter,
  GraduationCap,
  Home,
  Info,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  Moon,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings as SettingsIcon,
  ShieldCheck,
  Sun,
  TriangleAlert,
  Upload,
  UserCog,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react"

type Screen = "dashboard" | "students" | "sheikhs" | "halaqat" | "branches" | "roles" | "users" | "reports" | "activity" | "notifications" | "settings" | "student" | "entity" | "login"

type IconName = "home" | "people" | "book" | "branch" | "shield" | "chart" | "clock" | "bell" | "settings" | "search" | "plus" | "filter" | "download" | "more" | "chevron" | "menu" | "close" | "check" | "user" | "logout" | "calendar" | "school" | "phone" | "mail" | "arrow" | "edit" | "command" | "error" | "warning" | "info" | "upload" | "activity" | "userCog" | "moon" | "sun"

const icons: Record<IconName, LucideIcon> = {
  home: Home,
  people: UsersRound,
  book: BookOpen,
  branch: Building2,
  shield: ShieldCheck,
  chart: ChartNoAxesCombined,
  clock: Clock3,
  bell: Bell,
  settings: SettingsIcon,
  search: Search,
  plus: Plus,
  filter: Filter,
  download: FileDown,
  more: MoreHorizontal,
  chevron: ChevronDown,
  menu: Menu,
  close: X,
  check: Check,
  user: UserRound,
  logout: LogOut,
  calendar: CalendarDays,
  school: GraduationCap,
  phone: Phone,
  mail: Mail,
  arrow: ArrowLeft,
  edit: Pencil,
  command: Command,
  error: CircleX,
  warning: TriangleAlert,
  info: Info,
  upload: Upload,
  activity: ActivityIcon,
  userCog: UserCog,
  moon: Moon,
  sun: Sun,
}

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const Lucide = icons[name]
  return (
    <Lucide aria-hidden="true" className="icon" size={size} strokeWidth={1.8} />
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  icon?: IconName
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}

function IconButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: IconName
  label: string
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`icon-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "neutral" | "success" | "info" | "warning"
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

const students = [
  {
    id: "DJ-1042",
    name: "محمد أمين بن علي",
    initials: "م أ",
    age: 16,
    school: "ثانوية ابن خلدون",
    level: "ثانوي",
    branch: "المقر الثاني",
    halaqa: "حلقة الإمام مالك",
    sheikh: "الشيخ أحمد",
    date: "12 سبتمبر 2025",
    status: "نشط",
  },
  {
    id: "DJ-1038",
    name: "ياسين بن صالح",
    initials: "ي ب",
    age: 13,
    school: "متوسطة الأمير عبد القادر",
    level: "متوسط",
    branch: "المقر الأول",
    halaqa: "حلقة البخاري",
    sheikh: "الشيخ ياسين",
    date: "08 سبتمبر 2025",
    status: "نشط",
  },
  {
    id: "DJ-1029",
    name: "أحمد عبد القادر",
    initials: "أ ع",
    age: 10,
    school: "ابتدائية النور",
    level: "ابتدائي",
    branch: "المقر الثاني",
    halaqa: "حلقة النووي",
    sheikh: "الشيخ محمد",
    date: "02 سبتمبر 2025",
    status: "نشط",
  },
  {
    id: "DJ-1017",
    name: "عبد الرحمن قادري",
    initials: "ع ق",
    age: 19,
    school: "جامعة وهران 1",
    level: "جامعي",
    branch: "المقر الثالث",
    halaqa: "حلقة ابن الجزري",
    sheikh: "الشيخ عبد الرحمن",
    date: "28 أغسطس 2025",
    status: "متوقف",
  },
  {
    id: "DJ-1008",
    name: "أنس بوشارب",
    initials: "أ ب",
    age: 15,
    school: "ثانوية العقيد لطفي",
    level: "ثانوي",
    branch: "المقر الثاني",
    halaqa: "حلقة الإمام مالك",
    sheikh: "الشيخ أحمد",
    date: "21 أغسطس 2025",
    status: "نشط",
  },
]

const navGroups = [
  {
    label: "",
    items: [
      {
        id: "dashboard" as Screen,
        label: "نظرة عامة",
        icon: "home" as IconName,
      },
    ],
  },
  {
    label: "إدارة الجمعية",
    items: [
      { id: "students" as Screen, label: "الطلاب", icon: "school" as IconName },
      { id: "sheikhs" as Screen, label: "الشيوخ", icon: "user" as IconName },
      { id: "halaqat" as Screen, label: "الحلقات", icon: "book" as IconName },
      {
        id: "branches" as Screen,
        label: "المقرات",
        icon: "branch" as IconName,
      },
    ],
  },
  {
    label: "الإدارة",
    items: [
      {
        id: "roles" as Screen,
        label: "الأدوار والصلاحيات",
        icon: "shield" as IconName,
      },
      {
        id: "users" as Screen,
        label: "حسابات المستخدمين",
        icon: "people" as IconName,
      },
      { id: "reports" as Screen, label: "التقارير", icon: "chart" as IconName },
      {
        id: "activity" as Screen,
        label: "سجل النشاط",
        icon: "clock" as IconName,
      },
    ],
  },
]

function Sidebar({
  screen,
  setScreen,
  open,
  onClose,
}: {
  screen: Screen
  setScreen: (s: Screen) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <img className="brand-logo" src="/assets/4a23e.svg" alt="Djam3ya" />
          <div>
            <strong>Djam3ya</strong>
            <small>إدارة جمعية القرآن</small>
          </div>
          <IconButton icon="close" label="إغلاق القائمة" onClick={onClose} />
        </div>
        <div className="scope">
          <span className="scope-dot" />
          <div>
            <small>نطاق العرض الحالي</small>
            <strong>كل المقرات</strong>
          </div>
          <Icon name="chevron" size={16} />
        </div>
        <nav aria-label="التنقل الرئيسي">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              {group.label && <div className="nav-label">{group.label}</div>}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${screen === item.id ? "selected" : ""}`}
                  onClick={() => {
                    setScreen(item.id)
                    onClose()
                  }}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                  {item.id === "students" && <em>1,248</em>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            className="user-compact"
            onClick={() => setScreen("settings")}
          >
            <span className="avatar">نب</span>
            <span>
              <strong>نبيل بوعلام</strong>
              <small>مدير مركزي</small>
            </span>
            <Icon name="more" />
          </button>
          <button className="nav-item" onClick={() => setScreen("login")}>
            <Icon name="logout" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  )
}

function Header({
  title,
  onMenu,
  onSearch,
  onNotifications,
  onLanguage,
  darkMode,
  onThemeToggle,
}: {
  title: string
  onMenu: () => void
  onSearch: () => void
  onNotifications: () => void
  onLanguage: () => void
  darkMode: boolean
  onThemeToggle: () => void
}) {
  return (
    <header className="topbar">
      <div className="mobile-title">
        <IconButton icon="menu" label="فتح القائمة" onClick={onMenu} />
        <strong>{title}</strong>
      </div>
      <div className="breadcrumbs">
        <span>الجمعية</span>
        <Icon name="chevron" size={15} />
        <strong>{title}</strong>
      </div>
      <button className="global-search" onClick={onSearch}>
        <Icon name="search" />
        <span>ابحث عن طالب، شيخ، حلقة...</span>
        <kbd>
          <Icon name="command" size={14} /> K
        </kbd>
      </button>
      <div className="top-actions">
        <button className="language" onClick={onLanguage}>
          العربية <Icon name="chevron" size={14} />
        </button>
        <IconButton
          icon={darkMode ? "sun" : "moon"}
          label={darkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
          onClick={onThemeToggle}
        />
        <IconButton
          icon="bell"
          label="الإشعارات، 3 غير مقروءة"
          onClick={onNotifications}
          active
        />
      </div>
    </header>
  )
}

function Metric({
  label,
  value,
  detail,
  icon,
}: {
  label: string
  value: string
  detail: string
  icon: IconName
}) {
  return (
    <div className="metric">
      <div className="metric-icon">
        <Icon name={icon} />
      </div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </div>
  )
}

function Dashboard({
  navigate,
  onAdd,
  onExport,
}: {
  navigate: (s: Screen) => void
  onAdd: (kind: FormKind) => void
  onExport: () => void
}) {
  return (
    <div className="page">
      <section className="welcome-row">
        <div>
          <div className="eyebrow">الأربعاء، 24 سبتمبر 2025</div>
          <div className="page-title">صباح الخير، نبيل</div>
          <p>إليك ملخص واضح لما يحدث في الجمعية اليوم.</p>
        </div>
        <div className="quick-actions">
          <Button variant="secondary" icon="download" onClick={onExport}>
            تصدير
          </Button>
          <Button icon="plus" onClick={() => onAdd("student")}>
            إضافة طالب
          </Button>
        </div>
      </section>
      <div className="metrics-grid">
        <Metric
          label="إجمالي الطلاب"
          value="1,248"
          detail="+32 هذا الشهر"
          icon="school"
        />
        <Metric label="الشيوخ" value="46" detail="42 نشطون حاليا" icon="user" />
        <Metric label="الحلقات" value="38" detail="35 حلقة نشطة" icon="book" />
        <Metric label="المقرات" value="4" detail="جميعها نشطة" icon="branch" />
      </div>
      <div className="dashboard-grid">
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <strong>الطلاب حسب المقر</strong>
              <small>توزيع الطلاب النشطين</small>
            </div>
            <button
              className="text-action"
              onClick={() => navigate("branches")}
            >
              عرض المقرات <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="bar-chart">
            {[
              ["المقر الأول", "412", 92],
              ["المقر الثاني", "368", 82],
              ["المقر الثالث", "276", 62],
              ["المقر الرابع", "192", 43],
            ].map(([name, val, width]) => (
              <div className="bar-row" key={name as string}>
                <span>{name}</span>
                <div>
                  <i style={{ width: `${width}%` }} />
                </div>
                <strong>{val}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <strong>إجراءات سريعة</strong>
              <small>المهام الأكثر استخداما</small>
            </div>
          </div>
          <div className="action-list">
            {[
              ["إضافة طالب جديد", "school", "student"],
              ["إنشاء حلقة", "book", "halaqa"],
              ["إضافة شيخ", "user", "sheikh"],
              ["إضافة مقر", "branch", "branch"],
            ].map(([label, icon, id]) => (
              <button key={label} onClick={() => onAdd(id as FormKind)}>
                <span>
                  <Icon name={icon as IconName} />
                </span>
                {label}
                <Icon name="arrow" size={17} />
              </button>
            ))}
          </div>
        </section>
        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <strong>الحلقات الأكثر نشاطا</strong>
              <small>خلال آخر 30 يوما</small>
            </div>
            <button className="text-action" onClick={() => navigate("halaqat")}>
              عرض الكل
            </button>
          </div>
          <div className="halaqa-list">
            {[
              ["حلقة الإمام مالك", "المقر الثاني", "الشيخ أحمد", "32"],
              ["حلقة البخاري", "المقر الأول", "الشيخ ياسين", "28"],
              ["حلقة النووي", "المقر الثاني", "الشيخ محمد", "24"],
            ].map((h, i) => (
              <button key={h[0]} onClick={() => navigate("halaqat")}>
                <span className="rank">{i + 1}</span>
                <span>
                  <strong>{h[0]}</strong>
                  <small>
                    {h[1]} · {h[2]}
                  </small>
                </span>
                <span className="student-count">
                  <strong>{h[3]}</strong>
                  <small>طالبا</small>
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <strong>آخر النشاطات</strong>
              <small>على مستوى الجمعية</small>
            </div>
            <button
              className="text-action"
              onClick={() => navigate("activity")}
            >
              السجل
            </button>
          </div>
          <div className="timeline">
            {[
              ["أضاف أحمد طالبا جديدا", "محمد أمين بن علي", "منذ 10 دقائق"],
              ["تم تحديث حلقة الإمام مالك", "المقر الثاني", "منذ 45 دقيقة"],
              ["تم تعيين الشيخ ياسين", "حلقة البخاري", "منذ ساعتين"],
            ].map((a) => (
              <div className="timeline-item" key={a[0]}>
                <span className="timeline-dot" />
                <div>
                  <strong>{a[0]}</strong>
                  <span>{a[1]}</span>
                  <small>{a[2]}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

type StudentFilters = {
  branch: string
  halaqa: string
  sheikh: string
  level: string
  school: string
  gender: string
  minAge: string
  maxAge: string
  from: string
  to: string
}

const emptyStudentFilters: StudentFilters = {
  branch: "",
  halaqa: "",
  sheikh: "",
  level: "",
  school: "",
  gender: "",
  minAge: "",
  maxAge: "",
  from: "",
  to: "",
}

function Students({
  onProfile,
  onAdd,
  onFilters,
  onExport,
  filters,
  setFilters,
  onEdit,
  onDelete,
}: {
  onProfile: () => void
  onAdd: () => void
  onFilters: () => void
  onExport: () => void
  filters: StudentFilters
  setFilters: (filters: StudentFilters) => void
  onEdit: () => void
  onDelete: () => void
}) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const filtered = useMemo(
    () =>
      students.filter((student) => {
        const matchesQuery =
          `${student.name} ${student.school} ${student.id}`.includes(query)
        const matchesBranch =
          !filters.branch || student.branch === filters.branch
        const matchesHalaqa =
          !filters.halaqa || student.halaqa === filters.halaqa
        const matchesSheikh =
          !filters.sheikh || student.sheikh === filters.sheikh
        const matchesLevel = !filters.level || student.level === filters.level
        const matchesSchool =
          !filters.school || student.school.includes(filters.school)
        const matchesAge =
          (!filters.minAge || student.age >= Number(filters.minAge)) &&
          (!filters.maxAge || student.age <= Number(filters.maxAge))
        return (
          matchesQuery &&
          matchesBranch &&
          matchesHalaqa &&
          matchesSheikh &&
          matchesLevel &&
          matchesSchool &&
          matchesAge
        )
      }),
    [query, filters],
  )
  const active = Object.entries(filters).filter(([, value]) => value)
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  const allSelected =
    filtered.length > 0 &&
    filtered.every((student) => selected.includes(student.id))
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">الطلاب</div>
          <p>إدارة الطلاب والبحث في بياناتهم على مستوى الجمعية.</p>
        </div>
        <Button icon="plus" onClick={onAdd}>
          إضافة طالب
        </Button>
      </section>
      <div className="toolbar">
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label="بحث الطلاب"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالاسم، المعرّف أو المدرسة..."
          />
        </label>
        <Button variant="secondary" icon="filter" onClick={onFilters}>
          تصفية{" "}
          {active.length > 0 && (
            <span className="filter-count">{active.length}</span>
          )}
        </Button>
        <Button variant="secondary" icon="download" onClick={onExport}>
          تصدير
        </Button>
        <IconButton icon="more" label="خيارات إضافية" onClick={onEdit} />
      </div>
      {active.length > 0 && (
        <div className="filter-chips">
          {active.map(([key, value]) => (
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
            onClick={() => setFilters(emptyStudentFilters)}
          >
            مسح الكل
          </button>
        </div>
      )}
      {selected.length > 0 && (
        <div className="bulk-bar">
          <strong>{selected.length} طلاب محددون</strong>
          <span>
            <Button variant="secondary" icon="download" onClick={onExport}>
              تصدير
            </Button>
            <Button variant="secondary" onClick={onEdit}>
              نقل
            </Button>
            <Button variant="secondary" icon="book" onClick={onEdit}>
              تعيين حلقة
            </Button>
            <Button variant="ghost" onClick={() => setSelected([])}>
              إلغاء التحديد
            </Button>
          </span>
        </div>
      )}
      <div className="table-shell">
        <div className="table-meta">
          <span>
            <strong>{filtered.length}</strong> طلاب وُجدوا
          </span>
          <button onClick={onFilters}>
            الأعمدة <Icon name="chevron" size={15} />
          </button>
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            icon="school"
            title="لا يوجد طلاب مطابقون."
            detail="جرّب تعديل البحث أو مسح الفلاتر الحالية."
            action="مسح الفلاتر"
            onAction={() => {
              setQuery("")
              setFilters(emptyStudentFilters)
            }}
          />
        ) : (
          <>
            <div className="desktop-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        aria-label="تحديد الكل"
                        type="checkbox"
                        checked={allSelected}
                        onChange={() =>
                          setSelected(
                            allSelected
                              ? []
                              : filtered.map((student) => student.id),
                          )
                        }
                      />
                    </th>
                    <th>الطالب</th>
                    <th>العمر</th>
                    <th>المستوى الدراسي</th>
                    <th>المقر والحلقة</th>
                    <th>الشيخ</th>
                    <th>تاريخ التسجيل</th>
                    <th>الحالة</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => (
                    <tr key={student.id} onClick={onProfile}>
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          aria-label={`تحديد ${student.name}`}
                          type="checkbox"
                          checked={selected.includes(student.id)}
                          onChange={() => toggle(student.id)}
                        />
                      </td>
                      <td>
                        <div className="person-cell">
                          <span className="avatar">{student.initials}</span>
                          <span>
                            <strong>{student.name}</strong>
                            <small>{student.id}</small>
                          </span>
                        </div>
                      </td>
                      <td>{student.age} سنة</td>
                      <td>
                        <strong>{student.level}</strong>
                        <small className="subline">{student.school}</small>
                      </td>
                      <td>
                        <strong>{student.branch}</strong>
                        <small className="subline">{student.halaqa}</small>
                      </td>
                      <td>{student.sheikh}</td>
                      <td>{student.date}</td>
                      <td>
                        <Badge
                          tone={
                            student.status === "نشط" ? "success" : "warning"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          icon="more"
                          label={`خيارات ${student.name}`}
                          onClick={onEdit}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-cards">
              {filtered.map((student) => (
                <button
                  className="student-card"
                  key={student.id}
                  onClick={onProfile}
                >
                  <span className="avatar">{student.initials}</span>
                  <span className="student-main">
                    <strong>{student.name}</strong>
                    <small>
                      {student.level} · {student.branch}
                    </small>
                    <span>
                      <Icon name="book" size={15} /> {student.halaqa}
                    </span>
                    <span>
                      <Icon name="user" size={15} /> {student.sheikh}
                    </span>
                  </span>
                  <Badge
                    tone={student.status === "نشط" ? "success" : "warning"}
                  >
                    {student.status}
                  </Badge>
                </button>
              ))}
            </div>
            <div className="pagination">
              <span>
                عرض 1–{filtered.length} من {filtered.length}
              </span>
              <div>
                <Button
                  variant="secondary"
                  onClick={() => setPage(Math.max(1, page - 1))}
                >
                  السابق
                </Button>
                <span className="page-number current">{page}</span>
                <Button variant="secondary" onClick={() => setPage(page + 1)}>
                  التالي
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <button className="sr-only" onClick={onDelete}>
        حذف
      </button>
    </div>
  )
}

function EmptyState({
  icon,
  title,
  detail,
  action,
  onAction,
}: {
  icon: IconName
  title: string
  detail: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="empty-state">
      <span>
        <Icon name={icon} />
      </span>
      <strong>{title}</strong>
      <p>{detail}</p>
      {action && (
        <Button variant="secondary" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  )
}

function StudentProfile({
  goBack,
  navigate,
  onEdit,
  onExport,
  onAssign,
  onDelete,
}: {
  goBack: () => void
  navigate: (s: Screen) => void
  onEdit: () => void
  onExport: () => void
  onAssign: () => void
  onDelete: () => void
}) {
  return (
    <div className="page profile-page">
      <button className="back-link" onClick={goBack}>
        <Icon name="arrow" /> العودة إلى الطلاب
      </button>
      <section className="profile-header">
        <div className="profile-identity">
          <span className="avatar profile-avatar">م أ</span>
          <div>
            <div className="title-with-badge">
              <div className="page-title">محمد أمين بن علي</div>
              <Badge tone="info">طالب</Badge>
            </div>
            <p>
              <span dir="ltr">DJ-1042</span> · 16 سنة · مسجل منذ سبتمبر 2025
            </p>
            <div className="scope-line">
              <Icon name="branch" size={16} /> المقر الثاني / وهران
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <Button variant="secondary" icon="download" onClick={onExport}>
            تصدير
          </Button>
          <Button icon="edit" onClick={onEdit}>
            تعديل
          </Button>
          <IconButton icon="more" label="حذف الطالب" onClick={onDelete} />
        </div>
      </section>
      <div className="profile-layout">
        <main>
          <section className="detail-section">
            <div className="section-title">
              <strong>المعلومات الشخصية</strong>
              <button onClick={onEdit}>تعديل</button>
            </div>
            <div className="details-grid">
              {[
                ["تاريخ الميلاد", "14 مارس 2009"],
                ["الجنس", "ذكر"],
                ["الهاتف", "0556 43 28 19"],
                ["البريد الإلكتروني", "mohamed.amine@email.dz"],
              ].map((d) => (
                <div key={d[0]}>
                  <small>{d[0]}</small>
                  <strong dir={d[0].includes("البريد") ? "ltr" : undefined}>
                    {d[1]}
                  </strong>
                </div>
              ))}
            </div>
          </section>
          <section className="detail-section">
            <div className="section-title">
              <strong>المعلومات الدراسية</strong>
              <button onClick={onEdit}>تعديل</button>
            </div>
            <div className="details-grid">
              <div>
                <small>المؤسسة التعليمية</small>
                <strong>ثانوية ابن خلدون</strong>
              </div>
              <div>
                <small>المستوى الدراسي</small>
                <strong>السنة الثانية ثانوي</strong>
              </div>
            </div>
          </section>
          <section className="detail-section">
            <div className="section-title">
              <strong>الارتباطات القرآنية</strong>
              <Button variant="secondary" icon="plus" onClick={onAssign}>
                إضافة إلى حلقة
              </Button>
            </div>
            <div className="relationship-flow">
              <button onClick={() => navigate("student")}>
                <span className="relation-icon">
                  <Icon name="school" />
                </span>
                <small>الطالب</small>
                <strong>محمد أمين</strong>
              </button>
              <Icon name="chevron" />
              <button onClick={() => navigate("halaqat")}>
                <span className="relation-icon">
                  <Icon name="book" />
                </span>
                <small>الحلقة</small>
                <strong>حلقة الإمام مالك</strong>
              </button>
              <Icon name="chevron" />
              <button onClick={() => navigate("sheikhs")}>
                <span className="relation-icon">
                  <Icon name="user" />
                </span>
                <small>الشيخ</small>
                <strong>الشيخ أحمد</strong>
              </button>
              <Icon name="chevron" />
              <button onClick={() => navigate("branches")}>
                <span className="relation-icon">
                  <Icon name="branch" />
                </span>
                <small>المقر</small>
                <strong>المقر الثاني</strong>
              </button>
            </div>
            <div className="relationship-note">
              <Icon name="check" />
              <span>
                <strong>عضوية إضافية</strong>
                <small>حلقة ابن الجزري · المقر الثالث · كل يوم جمعة</small>
              </span>
              <button onClick={() => navigate("halaqat")}>عرض الحلقة</button>
            </div>
          </section>
        </main>
        <aside className="profile-aside">
          <div className="aside-block">
            <strong>معلومات سريعة</strong>
            <div>
              <span>الحالة</span>
              <Badge tone="success">نشط</Badge>
            </div>
            <div>
              <span>تاريخ التسجيل</span>
              <b>12 سبتمبر 2025</b>
            </div>
            <div>
              <span>عدد الحلقات</span>
              <b>2</b>
            </div>
          </div>
          <div className="aside-block">
            <strong>آخر نشاط</strong>
            <div className="mini-activity">
              <i />
              <span>
                <b>تم تحديث المستوى الدراسي</b>
                <small>منذ يومين · بواسطة نبيل</small>
              </span>
            </div>
            <div className="mini-activity">
              <i />
              <span>
                <b>أضيف إلى حلقة ابن الجزري</b>
                <small>منذ 12 يوما</small>
              </span>
            </div>
            <button
              className="text-action"
              onClick={() => navigate("activity")}
            >
              عرض السجل الكامل
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

const entityContent: Record<string, {
  title: string
  subtitle: string
  action: string
  icon: IconName
  rows: string[][]
}> = {
  sheikhs: {
    title: "الشيوخ",
    subtitle: "إدارة الشيوخ والحلقات التي يشرفون عليها.",
    action: "إضافة شيخ",
    icon: "user",
    rows: [
      ["الشيخ أحمد", "3 حلقات", "المقر الأول، الثاني", "64 طالبا"],
      ["الشيخ ياسين", "حلقتان", "المقر الأول", "46 طالبا"],
      ["الشيخ محمد", "حلقة واحدة", "المقر الثاني", "24 طالبا"],
    ],
  },
  halaqat: {
    title: "الحلقات",
    subtitle: "عرض الحلقات، شيوخها وطلابها حسب المقر.",
    action: "إنشاء حلقة",
    icon: "book",
    rows: [
      ["حلقة الإمام مالك", "المقر الثاني", "الشيخ أحمد", "32 طالبا"],
      ["حلقة البخاري", "المقر الأول", "الشيخ ياسين", "28 طالبا"],
      ["حلقة النووي", "المقر الثاني", "الشيخ محمد", "24 طالبا"],
      ["حلقة ابن الجزري", "المقر الثالث", "الشيخ أحمد", "18 طالبا"],
      ["حلقة القرطبي", "المقر الأول", "الشيخ أحمد", "14 طالبا"],
    ],
  },
  branches: {
    title: "المقرات",
    subtitle: "إدارة البنية الجغرافية ومسؤولي كل مقر.",
    action: "إضافة مقر",
    icon: "branch",
    rows: [
      ["المقر الأول", "الجزائر الوسطى", "412 طالبا", "3 مسؤولين"],
      ["المقر الثاني", "وهران", "368 طالبا", "2 مسؤولان"],
      ["المقر الثالث", "قسنطينة", "276 طالبا", "3 مسؤولين"],
      ["المقر الرابع", "سطيف", "192 طالبا", "مسؤولان"],
    ],
  },
  roles: {
    title: "الأدوار والصلاحيات",
    subtitle: "تعيين أدوار مركزية أو مرتبطة بمقر محدد.",
    action: "إضافة دور",
    icon: "shield",
    rows: [
      ["المالية", "مركزي", "3 مستخدمين", "مخصص"],
      ["إدارة التنظيم", "مركزي", "6 مستخدمين", "كامل"],
      ["رئيس المقر", "خاص بالمقر", "4 مستخدمين", "مقيد"],
      ["الإعلام والاتصال", "مركزي", "3 مستخدمين", "مخصص"],
      ["الشباب", "مركزي وفروع", "5 مستخدمين", "مخصص"],
      ["الفعاليات الثقافية", "مركزي وفروع", "4 مستخدمين", "مخصص"],
      ["الإدارة", "مركزي", "2 مستخدمين", "كامل"],
    ],
  },
  users: {
    title: "حسابات المستخدمين",
    subtitle: "الحسابات منفصلة عن سجل الأشخاص ويمكن تعطيلها بأمان.",
    action: "إنشاء حساب",
    icon: "people",
    rows: [
      ["نبيل بوعلام", "n.boualam", "مدير مركزي", "اليوم 09:42"],
      ["سميرة قادري", "s.kadri", "إدارة المقر الثاني", "أمس 18:20"],
      ["أحمد بن يوسف", "a.benyoussef", "شيخ", "منذ 3 أيام"],
    ],
  },
}

type EntityType = keyof typeof entityContent

type EntityFilters = {
  branch: string
  halaqa: string
  status: string
  location: string
  level: string
  sheikh: string
}
type EntityAttributes = Partial<Record<keyof EntityFilters, string | string[]>>
const emptyEntityFilters: EntityFilters = {
  branch: "",
  halaqa: "",
  status: "",
  location: "",
  level: "",
  sheikh: "",
}
const entityAttributes: Record<string, EntityAttributes> = {
  "الشيخ أحمد": {
    branch: ["المقر الأول", "المقر الثاني", "المقر الثالث"],
    halaqa: ["حلقة الإمام مالك", "حلقة ابن الجزري", "حلقة القرطبي"],
    status: "نشط",
  },
  "الشيخ ياسين": {
    branch: "المقر الأول",
    halaqa: "حلقة البخاري",
    status: "نشط",
  },
  "الشيخ محمد": {
    branch: "المقر الثاني",
    halaqa: "حلقة النووي",
    status: "متوقف",
  },
  "حلقة الإمام مالك": {
    branch: "المقر الثاني",
    sheikh: "الشيخ أحمد",
    level: "ثانوي",
    status: "نشط",
  },
  "حلقة البخاري": {
    branch: "المقر الأول",
    sheikh: "الشيخ ياسين",
    level: "متوسط",
    status: "نشط",
  },
  "حلقة النووي": {
    branch: "المقر الثاني",
    sheikh: "الشيخ محمد",
    level: "ابتدائي",
    status: "نشط",
  },
  "حلقة ابن الجزري": {
    branch: "المقر الثالث",
    sheikh: "الشيخ أحمد",
    level: "جامعي",
    status: "نشط",
  },
  "حلقة القرطبي": {
    branch: "المقر الأول",
    sheikh: "الشيخ أحمد",
    level: "متوسط",
    status: "نشط",
  },
  "المقر الأول": { location: "الجزائر الوسطى", status: "نشط" },
  "المقر الثاني": { location: "وهران", status: "نشط" },
  "المقر الثالث": { location: "قسنطينة", status: "نشط" },
  "المقر الرابع": { location: "سطيف", status: "غير نشط" },
}

function EntityList({
  type,
  onAdd,
  onExport,
  onOpen,
  onEdit,
}: {
  type: EntityType
  onAdd: () => void
  onExport: () => void
  onOpen: (type: EntityType, name: string) => void
  onEdit: () => void
}) {
  const content = entityContent[type]
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<EntityFilters>(emptyEntityFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const activeFilters = Object.entries(filters).filter(([, value]) => value)
  const rows = content.rows.filter((row) => {
    if (!row.join(" ").includes(query)) return false
    const attributes = entityAttributes[row[0]] || { status: "نشط" }
    return activeFilters.every(([key, value]) => {
      const attribute = attributes[(key as keyof EntityFilters)]
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
            onChange={(event) => setQuery(event.target.value)}
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

function EntityFilterDrawer({
  type,
  value,
  onClose,
  onApply,
}: {
  type: EntityType
  value: EntityFilters
  onClose: () => void
  onApply: (filters: EntityFilters) => void
}) {
  const [draft, setDraft] = useState(value)
  const update = (key: keyof EntityFilters, value: string) =>
    setDraft({ ...draft, [key]: value })
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
                  value={draft.level}
                  onChange={(event) => update("level", event.target.value)}
                >
                  <option value="">كل المستويات</option>
                  <option>ابتدائي</option>
                  <option>متوسط</option>
                  <option>ثانوي</option>
                </select>
              </label>
            </>
          )}
          {isBranch && (
            <label>
              الموقع
              <select
                value={draft.location}
                onChange={(event) => update("location", event.target.value)}
              >
                <option value="">كل المواقع</option>
                <option>الجزائر الوسطى</option>
                <option>وهران</option>
                <option>قسنطينة</option>
                <option>سطيف</option>
              </select>
            </label>
          )}
          <label>
            الحالة
            <select
              value={draft.status}
              onChange={(event) => update("status", event.target.value)}
            >
              <option value="">كل الحالات</option>
              <option>نشط</option>
              {isSheikh && <option>متوقف</option>}
              {isBranch && <option>غير نشط</option>}
            </select>
          </label>
        </div>
        <div className="drawer-footer">
          <Button variant="ghost" onClick={() => setDraft(emptyEntityFilters)}>
            إعادة ضبط
          </Button>
          <Button onClick={() => onApply(draft)}>تطبيق الفلاتر</Button>
        </div>
      </aside>
    </div>
  )
}

const profileTabs: Record<EntityType, string[]> = {
  sheikhs: [
    "المعلومات الشخصية",
    "الحلقات",
    "الطلاب",
    "الأدوار الإدارية",
    "النشاط",
  ],
  halaqat: ["نظرة عامة", "الشيوخ", "الطلاب", "النشاط", "الإحصائيات"],
  branches: ["نظرة عامة", "الحلقات", "الطلاب", "الشيوخ", "المسؤولون", "النشاط"],
  roles: ["الصلاحيات", "المستخدمون", "النشاط"],
  users: ["الحساب", "الدور والنطاق", "النشاط"],
}

type HalaqaRecord = {
  name: string
  level: string
  branch: string
  sheikh: string
  students: number
}
const halaqaRecords: HalaqaRecord[] = [
  {
    name: "حلقة الإمام مالك",
    level: "ثانوي",
    branch: "المقر الثاني",
    sheikh: "الشيخ أحمد",
    students: 32,
  },
  {
    name: "حلقة البخاري",
    level: "متوسط",
    branch: "المقر الأول",
    sheikh: "الشيخ ياسين",
    students: 28,
  },
  {
    name: "حلقة النووي",
    level: "ابتدائي",
    branch: "المقر الثاني",
    sheikh: "الشيخ محمد",
    students: 24,
  },
  {
    name: "حلقة ابن الجزري",
    level: "جامعي",
    branch: "المقر الثالث",
    sheikh: "الشيخ أحمد",
    students: 18,
  },
  {
    name: "حلقة القرطبي",
    level: "متوسط",
    branch: "المقر الأول",
    sheikh: "الشيخ أحمد",
    students: 14,
  },
]

function EntityProfile({
  type,
  name,
  onBack,
  onEdit,
  onExport,
  onAssign,
  onDelete,
  onOpenRelated,
}: {
  type: EntityType
  name: string
  onBack: () => void
  onEdit: () => void
  onExport: () => void
  onAssign: () => void
  onDelete: () => void
  onOpenRelated: (type: EntityType, name: string) => void
}) {
  const content = entityContent[type]
  const [tab, setTab] = useState(profileTabs[type][0])
  const isHalaqa = type === "halaqat",
    isSheikh = type === "sheikhs",
    isBranch = type === "branches",
    isRole = type === "roles",
    isUser = type === "users"
  const primaryAssign = isHalaqa
    ? "إضافة طالب"
    : isSheikh
      ? "تعيين حلقة"
      : isBranch
        ? "إضافة حلقة"
        : isRole
          ? "تعيين مستخدم"
          : isUser
            ? "إعادة ضبط الوصول"
            : "إضافة ارتباط"
  return (
    <div className="page profile-page">
      <button className="back-link" onClick={onBack}>
        <Icon name="arrow" /> العودة إلى {content.title}
      </button>
      <section className="profile-header">
        <div className="profile-identity">
          <span className="avatar profile-avatar">
            <Icon name={content.icon} />
          </span>
          <div>
            <div className="title-with-badge">
              <div className="page-title">{name}</div>
              <Badge tone="info">
                {content.title.slice(0, -1) || content.title}
              </Badge>
            </div>
            <p>
              {isHalaqa
                ? `${entityAttributes[name]?.level || "ثانوي"} · ${entityAttributes[name]?.branch || "المقر الثاني"}`
                : isSheikh
                  ? `${halaqaRecords.filter((item) => item.sheikh === name).length} حلقات · ${halaqaRecords.filter((item) => item.sheikh === name).reduce((sum, item) => sum + item.students, 0)} طالبا`
                  : isBranch
                    ? `${entityAttributes[name]?.location || "وهران"} · ${students.filter((student) => student.branch === name).length} سجلات طلاب`
                    : isRole
                      ? "نطاق مركزي · 6 مستخدمين"
                      : "حساب نشط · آخر دخول اليوم"}
            </p>
          </div>
        </div>
        <div className="profile-actions">
          <Button variant="secondary" icon="download" onClick={onExport}>
            تصدير
          </Button>
          <Button variant="secondary" icon="plus" onClick={onAssign}>
            {primaryAssign}
          </Button>
          <Button icon="edit" onClick={onEdit}>
            تعديل
          </Button>
          <IconButton icon="more" label="حذف" onClick={onDelete} />
        </div>
      </section>
      <div className="profile-tabs">
        {profileTabs[type].map((item) => (
          <button
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="profile-layout">
        <main>
          <section className="detail-section">
            <div className="section-title">
              <strong>{tab}</strong>
              {!tab.includes("النشاط") && !tab.includes("إحصائيات") && (
                <button onClick={onEdit}>تعديل</button>
              )}
            </div>
            <ProfileTabContent
              type={type}
              name={name}
              tab={tab}
              onAssign={onAssign}
              onOpenRelated={onOpenRelated}
            />
          </section>
        </main>
        <aside className="profile-aside">
          <div className="aside-block">
            <strong>ملخص</strong>
            <div>
              <span>الحالة</span>
              <Badge tone="success">نشط</Badge>
            </div>
            <div>
              <span>النطاق</span>
              <b>{isBranch ? name : "كل المقرات"}</b>
            </div>
            <div>
              <span>آخر تحديث</span>
              <b>اليوم</b>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ProfileTabContent({
  type,
  name,
  tab,
  onAssign,
  onOpenRelated,
}: {
  type: EntityType
  name: string
  tab: string
  onAssign: () => void
  onOpenRelated: (type: EntityType, name: string) => void
}) {
  if (tab.includes("النشاط")) return <ActivityList compact />
  if (tab.includes("صلاحيات")) return <PermissionMatrix />
  if (tab.includes("طلاب"))
    return <RelatedStudents type={type} name={name} onAssign={onAssign} />
  if (tab.includes("حلقات") || (type === "branches" && tab === "الحلقات")) {
    const records =
      type === "sheikhs"
        ? halaqaRecords.filter((item) => item.sheikh === name)
        : type === "branches"
          ? halaqaRecords.filter((item) => item.branch === name)
          : halaqaRecords.filter((item) => item.name === name)
    return (
      <RelatedHalaqat
        records={records}
        onOpen={(halaqa) => onOpenRelated("halaqat", halaqa)}
        onAssign={onAssign}
      />
    )
  }
  if (tab.includes("شيوخ")) {
    const names =
      type === "halaqat"
        ? [entityAttributes[name]?.sheikh || "الشيخ أحمد"]
        : [
            ...new Set(
              halaqaRecords
                .filter((item) => item.branch === name)
                .map((item) => item.sheikh),
            ),
          ]
    return (
      <div className="compact-list">
        {names.map((sheikh) => (
          <button
            className="compact-row"
            key={sheikh}
            onClick={() => onOpenRelated("sheikhs", sheikh)}
          >
            <span className="avatar">
              <Icon name="user" size={18} />
            </span>
            <span>
              <strong>{sheikh}</strong>
              <small>
                {halaqaRecords.filter((item) => item.sheikh === sheikh).length}{" "}
                حلقات مرتبطة
              </small>
            </span>
            <Icon name="arrow" />
          </button>
        ))}
      </div>
    )
  }
  if (tab.includes("مسؤول"))
    return (
      <div className="compact-list">
        {["سميرة قادري", "نبيل بوعلام"].map((admin) => (
          <div key={admin}>
            <span className="avatar">{admin.slice(0, 2)}</span>
            <span>
              <strong>{admin}</strong>
              <small>مسؤول مقر · نشط</small>
            </span>
            <Badge tone="success">نشط</Badge>
          </div>
        ))}
      </div>
    )
  if (tab.includes("أدوار"))
    return (
      <div className="details-grid">
        <div>
          <small>الدور</small>
          <strong>التعليم والإشراف</strong>
        </div>
        <div>
          <small>النطاق</small>
          <strong>المقرات المرتبطة</strong>
        </div>
      </div>
    )
  if (tab.includes("مستخدم"))
    return (
      <div className="compact-list">
        {entityContent.users.rows.map((user) => (
          <div key={user[0]}>
            <span className="avatar">{user[0].slice(0, 2)}</span>
            <span>
              <strong>{user[0]}</strong>
              <small>{user[2]}</small>
            </span>
            <Badge tone="success">نشط</Badge>
          </div>
        ))}
      </div>
    )
  if (tab.includes("إحصائيات")) {
    const record = halaqaRecords.find((item) => item.name === name)
    return (
      <div className="details-grid">
        <div>
          <small>الطلاب</small>
          <strong>{record?.students || 0}</strong>
        </div>
        <div>
          <small>الشيوخ</small>
          <strong>1</strong>
        </div>
        <div>
          <small>المستوى</small>
          <strong>{record?.level || "—"}</strong>
        </div>
        <div>
          <small>المقر</small>
          <strong>{record?.branch || "—"}</strong>
        </div>
      </div>
    )
  }
  const details =
    type === "sheikhs"
      ? [
          ["الهاتف", "0556 43 28 19"],
          ["البريد", "ahmed@djam3ya.dz"],
          [
            "الحلقات",
            `${halaqaRecords.filter((item) => item.sheikh === name).length} حلقات`,
          ],
          [
            "الفروع",
            [
              ...new Set(
                halaqaRecords
                  .filter((item) => item.sheikh === name)
                  .map((item) => item.branch),
              ),
            ].join("، ") || "—",
          ],
        ]
      : type === "halaqat"
        ? [
            ["المستوى", entityAttributes[name]?.level || "—"],
            ["المقر", entityAttributes[name]?.branch || "—"],
            ["الشيخ", entityAttributes[name]?.sheikh || "—"],
            [
              "الطلاب",
              `${halaqaRecords.find((item) => item.name === name)?.students || 0} طالبا`,
            ],
          ]
        : type === "branches"
          ? [
              ["الموقع", entityAttributes[name]?.location || "—"],
              [
                "الحلقات",
                `${halaqaRecords.filter((item) => item.branch === name).length} حلقات`,
              ],
              [
                "الشيوخ",
                `${new Set(halaqaRecords.filter((item) => item.branch === name).map((item) => item.sheikh)).size} شيوخ`,
              ],
              ["المسؤولون", "2 من 3"],
            ]
          : [
              ["الحالة", "نشط"],
              ["النطاق", "مركزي"],
              ["آخر تحديث", "اليوم 10:24"],
              ["أنشئ بواسطة", "نبيل بوعلام"],
            ]
  return (
    <div className="details-grid">
      {details.map((item) => (
        <div key={item[0]}>
          <small>{item[0]}</small>
          <strong>{item[1]}</strong>
        </div>
      ))}
    </div>
  )
}

function RelatedHalaqat({
  records,
  onOpen,
  onAssign,
}: {
  records: HalaqaRecord[]
  onOpen: (name: string) => void
  onAssign: () => void
}) {
  if (!records.length)
    return (
      <EmptyState
        icon="book"
        title="لا توجد حلقات مرتبطة حالياً."
        detail="يمكن إضافة ارتباط جديد ضمن نطاق صلاحياتك."
        action="تعيين حلقة"
        onAction={onAssign}
      />
    )
  return (
    <div className="relation-list">
      {records.map((record) => (
        <button onClick={() => onOpen(record.name)} key={record.name}>
          <span className="relation-icon">
            <Icon name="book" />
          </span>
          <span>
            <strong>{record.name}</strong>
            <small>
              {record.level} · {record.branch} · {record.students} طالبا
            </small>
          </span>
          <Icon name="arrow" />
        </button>
      ))}
    </div>
  )
}

function RelatedStudents({
  type,
  name,
  onAssign,
}: {
  type: EntityType
  name: string
  onAssign: () => void
}) {
  const [query, setQuery] = useState("")
  const matching = students.filter((student) => {
    const relationship =
      type === "sheikhs"
        ? student.sheikh === name
        : type === "halaqat"
          ? student.halaqa === name
          : type === "branches"
            ? student.branch === name
            : true
    return relationship && student.name.includes(query)
  })
  return (
    <div>
      <div className="inline-toolbar">
        <label className="search-field">
          <Icon name="search" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن طالب..."
          />
        </label>
        <Button variant="secondary" icon="plus" onClick={onAssign}>
          إضافة طالب
        </Button>
      </div>
      {matching.length ? (
        <div className="compact-list">
          {matching.map((student) => (
            <div key={student.id}>
              <span className="avatar">{student.initials}</span>
              <span>
                <strong>{student.name}</strong>
                <small>
                  {student.level} · {student.school}
                </small>
              </span>
              <Badge tone="success">نشط</Badge>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="school"
          title="لا يوجد طلاب مرتبطون حالياً."
          detail="لا توجد سجلات تطابق هذه العلاقة أو البحث الحالي."
          action={query ? "مسح البحث" : "إضافة طالب"}
          onAction={() => (query ? setQuery("") : onAssign())}
        />
      )}
    </div>
  )
}

function PermissionMatrix() {
  return (
    <div className="permission-matrix">
      {[
        "عرض السجلات",
        "إنشاء وتعديل السجلات",
        "التصدير ضمن النطاق",
        "إدارة التعيينات",
        "عرض سجل النشاط",
      ].map((permission, index) => (
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

function Reports({ onExport }: { onExport: () => void }) {
  const [report, setReport] = useState("")
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)
  const generate = () => {
    setGenerating(true)
    window.setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 700)
  }
  const reports = [
    ["الطلاب حسب المقر", "توزيع وأعداد الطلاب النشطين", "branch"],
    ["الطلاب حسب المستوى الدراسي", "ابتدائي، متوسط، ثانوي وجامعي", "school"],
    ["الطلاب حسب الحلقة", "الحلقات والشيوخ المرتبطون", "book"],
    ["الطلاب حسب الشيخ", "أعداد الطلاب حسب الشيخ والحلقة", "user"],
    ["إحصائيات التسجيل", "التسجيلات حسب الفترة الزمنية", "calendar"],
  ]
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">التقارير</div>
          <p>أنشئ تقارير دقيقة ضمن نطاق صلاحياتك.</p>
        </div>
        <Button icon="download" onClick={() => setReport(reports[0][0])}>
          تقرير جديد
        </Button>
      </section>
      <div className="report-banner">
        <div>
          <Icon name="shield" />
          <span>
            <strong>نطاق التصدير: كل المقرات</strong>
            <small>لديك صلاحية التصدير المركزي.</small>
          </span>
        </div>
        <button onClick={() => setReport("الصلاحيات")}>مراجعة الصلاحيات</button>
      </div>
      {!report ? (
        <>
          <div className="report-grid">
            {reports.map((item) => (
              <button
                className="report-card"
                key={item[0]}
                onClick={() => {
                  setReport(item[0])
                  setGenerated(false)
                }}
              >
                <span>
                  <Icon name={item[2] as IconName} />
                </span>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
                <b>
                  إنشاء التقرير <Icon name="arrow" size={16} />
                </b>
              </button>
            ))}
          </div>
          <EmptyState
            icon="chart"
            title="لم يتم إنشاء تقرير بعد."
            detail="اختر أحد التقارير أعلاه وحدد نطاق البيانات المطلوب."
          />
        </>
      ) : (
        <section className="report-builder">
          <div className="section-title">
            <div>
              <strong>{report}</strong>
              <small>حدّد الفلاتر ثم أنشئ التقرير.</small>
            </div>
            <button
              onClick={() => {
                setReport("")
                setGenerated(false)
              }}
            >
              اختيار تقرير آخر
            </button>
          </div>
          <div className="form-grid">
            <label>
              المقر
              <select>
                <option>كل المقرات</option>
                <option>المقر الثاني</option>
              </select>
            </label>
            <label>
              المستوى الدراسي
              <select>
                <option>كل المستويات</option>
                <option>ثانوي</option>
              </select>
            </label>
            <label>
              من
              <input type="date" />
            </label>
            <label>
              إلى
              <input type="date" />
            </label>
          </div>
          <Button icon="chart" onClick={generate}>
            {generating ? "جارٍ إنشاء التقرير..." : "إنشاء التقرير"}
          </Button>
          {generating && <SkeletonRows />}
          {generated && (
            <div className="report-result">
              <div className="success-mark">
                <Icon name="check" />
              </div>
              <div>
                <strong>تم إنشاء التقرير.</strong>
                <small>يعرض 1,248 طالبا ضمن النطاق والفترة المحددين.</small>
              </div>
              <div className="mini-chart">
                {[82, 61, 46, 34].map((height, index) => (
                  <i key={height} style={{ height: `${height}%` }}>
                    <span>{["412", "368", "276", "192"][index]}</span>
                  </i>
                ))}
              </div>
              <div className="export-actions">
                <Button variant="secondary" onClick={onExport}>
                  PDF
                </Button>
                <Button variant="secondary" onClick={onExport}>
                  Excel
                </Button>
                <Button variant="secondary" onClick={onExport}>
                  CSV
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

const activityRows = [
  [
    "نبيل بوعلام",
    "أضاف الطالب",
    "محمد أمين بن علي",
    "المقر الثاني",
    "اليوم، 14:32",
  ],
  [
    "سميرة قادري",
    "حدّثت الحلقة",
    "حلقة الإمام مالك",
    "المقر الثاني",
    "اليوم، 13:57",
  ],
  [
    "أحمد بن يوسف",
    "عيّن الشيخ ياسين",
    "حلقة البخاري",
    "المقر الأول",
    "اليوم، 12:18",
  ],
  ["مدير النظام", "أنشأ حسابا", "سميرة قادري", "نطاق مركزي", "أمس، 16:25"],
]

function ActivityList({
  compact = false,
  rows = activityRows,
}: {
  compact?: boolean
  rows?: string[][]
}) {
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

function Activity() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState(false)
  const rows = activityRows
    .filter((row) => row.join(" ").includes(query))
    .filter((row) => !filter || row[3] === "المقر الثاني")
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
          onClick={() => setFilter(!filter)}
        >
          الفلاتر {filter && <span className="filter-count">1</span>}
        </Button>
      </div>
      {filter && (
        <div className="filter-chips">
          <span>
            المقر الثاني{" "}
            <button onClick={() => setFilter(false)}>
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
            setFilter(false)
          }}
        />
      )}
    </div>
  )
}

function SkeletonRows() {
  return (
    <div className="skeleton-list" aria-label="جارٍ التحميل">
      {[1, 2, 3].map((item) => (
        <div key={item}>
          <i />
          <span>
            <b />
            <small />
          </span>
        </div>
      ))}
    </div>
  )
}

function Settings({ onSave }: { onSave: (message: string) => void }) {
  const [section, setSection] = useState("الملف الشخصي")
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">الإعدادات</div>
          <p>إعدادات الحساب، اللغة وتجربة الاستخدام.</p>
        </div>
        <Button onClick={() => onSave("تم حفظ الإعدادات بنجاح.")}>
          حفظ التغييرات
        </Button>
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
          <div className="profile-edit">
            <span className="avatar profile-avatar">نب</span>
            <div>
              <strong>نبيل بوعلام</strong>
              <small>مدير مركزي · كل المقرات</small>
              <Button
                variant="secondary"
                onClick={() => onSave("يمكنك الآن اختيار صورة جديدة من جهازك.")}
              >
                تغيير الصورة
              </Button>
            </div>
          </div>
          <div className="form-grid">
            <label>
              الاسم الكامل
              <input defaultValue="نبيل بوعلام" />
            </label>
            <label>
              البريد الإلكتروني
              <input dir="ltr" defaultValue="n.boualam@djam3ya.dz" />
            </label>
            <label>
              اللغة
              <select defaultValue="ar">
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </label>
            <label>
              المنطقة الزمنية
              <select>
                <option>الجزائر (GMT+1)</option>
              </select>
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}

type FormKind = "student" | "sheikh" | "halaqa" | "branch" | "role" | "user"
const formLabels: Record<FormKind, string> = {
  student: "طالب",
  sheikh: "شيخ",
  halaqa: "حلقة",
  branch: "مقر",
  role: "دور",
  user: "حساب مستخدم",
}

function EntityForm({
  kind,
  mode = "add",
  onClose,
  onSuccess,
}: {
  kind: FormKind
  mode?: "add" | "edit"
  onClose: () => void
  onSuccess: (message: string) => void
}) {
  const [step, setStep] = useState(1),
    [name, setName] = useState(mode === "edit" ? sampleName(kind) : ""),
    [error, setError] = useState(false),
    [saving, setSaving] = useState(false),
    [dirty, setDirty] = useState(false),
    [confirmClose, setConfirmClose] = useState(false),
    [admins, setAdmins] = useState(["سميرة قادري"])
  const title = `${
    mode === "edit" ? "تعديل" : kind === "halaqa" ? "إنشاء" : "إضافة"
  } ${formLabels[kind]}`
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
          : `تمت إضافة ${formLabels[kind]} بنجاح.`,
      )
    }, 650)
  }
  const close = () => (dirty ? setConfirmClose(true) : onClose())
  const personal = kind === "student" || kind === "sheikh"
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
                  {step > index + 1 ? <Icon name="check" size={16} /> : item[0]}
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
                        <span className="field-error">الاسم الكامل مطلوب.</span>
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
                      {kind === "student"
                        ? "المؤسسة التعليمية"
                        : "الصفة المهنية"}
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
                        <option>
                          {kind === "student" ? "ثانوي" : "لا يوجد"}
                        </option>
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
                    {[
                      "حلقة الإمام مالك — المقر الثاني",
                      "حلقة البخاري — المقر الأول",
                      "حلقة النووي — المقر الثاني",
                    ].map((item, index) => (
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
                    : `حفظ ${formLabels[kind]}`}
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

function sampleName(kind: FormKind) {
  return {
    student: "محمد أمين بن علي",
    sheikh: "الشيخ أحمد",
    halaqa: "حلقة الإمام مالك",
    branch: "المقر الثاني",
    role: "إدارة التنظيم",
    user: "نبيل بوعلام",
  }[kind]
}

function EntitySpecificFields({
  kind,
  name,
  setName,
  error,
  admins,
  setAdmins,
}: {
  kind: FormKind
  name: string
  setName: (value: string) => void
  error: boolean
  admins: string[]
  setAdmins: (value: string[]) => void
}) {
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
              onClick={() =>
                admins.length < 3 &&
                setAdmins([
                  ...admins,
                  ["نبيل بوعلام", "أحمد بن يوسف"][admins.length - 1],
                ])
              }
            >
              إضافة مسؤول
            </Button>
          </div>
          {admins.map((admin) => (
            <div key={admin}>
              <span className="avatar">{admin.slice(0, 2)}</span>
              <strong>{admin}</strong>
              <button
                onClick={() =>
                  setAdmins(admins.filter((item) => item !== admin))
                }
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

function FilterDrawer({
  value,
  onClose,
  onApply,
}: {
  value: StudentFilters
  onClose: () => void
  onApply: (filters: StudentFilters) => void
}) {
  const [draft, setDraft] = useState(value)
  const update = (key: keyof StudentFilters, value: string) =>
    setDraft({ ...draft, [key]: value })
  return (
    <div className="drawer-layer">
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="filter-drawer">
        <div className="drawer-head">
          <div>
            <strong>تصفية الطلاب</strong>
            <small>اجمع بين عدة فلاتر لدقة أكبر</small>
          </div>
          <IconButton icon="close" label="إغلاق" onClick={onClose} />
        </div>
        <div className="drawer-content">
          <label>
            المقر
            <select
              value={draft.branch}
              onChange={(e) => update("branch", e.target.value)}
            >
              <option value="">كل المقرات</option>
              <option>المقر الثاني</option>
              <option>المقر الأول</option>
              <option>المقر الثالث</option>
            </select>
          </label>
          <label>
            الحلقة
            <select
              value={draft.halaqa}
              onChange={(e) => update("halaqa", e.target.value)}
            >
              <option value="">كل الحلقات</option>
              <option>حلقة الإمام مالك</option>
              <option>حلقة البخاري</option>
              <option>حلقة النووي</option>
            </select>
          </label>
          <label>
            الشيخ
            <select
              value={draft.sheikh}
              onChange={(e) => update("sheikh", e.target.value)}
            >
              <option value="">كل الشيوخ</option>
              <option>الشيخ أحمد</option>
              <option>الشيخ ياسين</option>
              <option>الشيخ محمد</option>
            </select>
          </label>
          <label>
            المستوى الدراسي
            <select
              value={draft.level}
              onChange={(e) => update("level", e.target.value)}
            >
              <option value="">كل المستويات</option>
              <option>ابتدائي</option>
              <option>متوسط</option>
              <option>ثانوي</option>
              <option>جامعي</option>
            </select>
          </label>
          <label>
            المؤسسة التعليمية
            <input
              value={draft.school}
              onChange={(e) => update("school", e.target.value)}
              placeholder="اسم المدرسة"
            />
          </label>
          <label>
            الجنس
            <select
              value={draft.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">الكل</option>
              <option>ذكر</option>
              <option>أنثى</option>
            </select>
          </label>
          <div className="two-fields">
            <label>
              العمر من
              <input
                type="number"
                value={draft.minAge}
                onChange={(e) => update("minAge", e.target.value)}
                placeholder="6"
              />
            </label>
            <label>
              إلى
              <input
                type="number"
                value={draft.maxAge}
                onChange={(e) => update("maxAge", e.target.value)}
                placeholder="25"
              />
            </label>
          </div>
          <div className="two-fields">
            <label>
              التسجيل من
              <input
                type="date"
                value={draft.from}
                onChange={(e) => update("from", e.target.value)}
              />
            </label>
            <label>
              إلى
              <input
                type="date"
                value={draft.to}
                onChange={(e) => update("to", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="drawer-footer">
          <Button variant="ghost" onClick={() => setDraft(emptyStudentFilters)}>
            إعادة ضبط
          </Button>
          <Button onClick={() => onApply(draft)}>تطبيق الفلاتر</Button>
        </div>
      </aside>
    </div>
  )
}

function ExportDialog({
  title,
  count,
  onClose,
  onReady,
}: {
  title: string
  count: number
  onClose: () => void
  onReady: (message: string) => void
}) {
  const [format, setFormat] = useState("Excel"),
    [scope, setScope] = useState("current"),
    [status, setStatus] = useState<"idle" | "preparing" | "ready">("idle")
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
                  {["Excel", "CSV", "PDF"].map((item) => (
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

function ConfirmDialog({
  title,
  detail,
  confirmLabel = "حذف",
  onCancel,
  onConfirm,
}: {
  title: string
  detail: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="modal-layer nested">
      <div
        className="dialog confirm-dialog"
        role="alertdialog"
        aria-modal="true"
      >
        <span className="warning-icon">
          <Icon name="warning" />
        </span>
        <strong>{title}</strong>
        <p>{detail}</p>
        <div className="dialog-footer">
          <Button variant="ghost" onClick={onCancel}>
            إلغاء
          </Button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function AssignmentDialog({
  kind,
  onClose,
  onDone,
}: {
  kind: FormKind
  onClose: () => void
  onDone: (message: string) => void
}) {
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
            {[
              "حلقة الإمام مالك — المقر الثاني",
              "حلقة البخاري — المقر الأول",
              "حلقة النووي — المقر الثاني",
            ].map((item, index) => (
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

function SuccessDialog({
  kind,
  message,
  onClose,
  onPrimary,
  onSecondary,
}: {
  kind: FormKind
  message: string
  onClose: () => void
  onPrimary: () => void
  onSecondary: () => void
}) {
  const primary =
    kind === "student"
      ? "عرض الطالب"
      : kind === "sheikh"
        ? "عرض الملف"
        : kind === "halaqa"
          ? "عرض الحلقة"
          : kind === "branch"
            ? "عرض المقر"
            : "عرض التفاصيل"
  const secondary =
    kind === "student"
      ? "إضافة طالب آخر"
      : kind === "sheikh"
        ? "تعيين حلقة أخرى"
        : kind === "halaqa"
          ? "إضافة طلاب"
          : kind === "branch"
            ? "إضافة حلقة"
            : "إضافة آخر"
  return (
    <div className="modal-layer">
      <div className="dialog dialog-state" role="dialog" aria-modal="true">
        <span className="success-mark">
          <Icon name="check" />
        </span>
        <strong>{message}</strong>
        <p>تم حفظ البيانات وأصبحت متاحة ضمن نطاق صلاحياتك.</p>
        <Button onClick={onPrimary}>{primary}</Button>
        <Button variant="secondary" onClick={onSecondary}>
          {secondary}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          إغلاق
        </Button>
      </div>
    </div>
  )
}

function SearchOverlay({
  onClose,
  navigate,
}: {
  onClose: () => void
  navigate: (s: Screen) => void
}) {
  const [query, setQuery] = useState("")
  const results: [string, string, IconName, Screen, string][] = [
    [
      "محمد أمين بن علي",
      "المقر الثاني · حلقة الإمام مالك",
      "school",
      "student",
      "الطلاب",
    ],
    ["الشيخ محمد", "شيخ · حلقة النووي", "user", "sheikhs", "الشيوخ"],
    [
      "حلقة الإمام مالك",
      "32 طالبا · المقر الثاني",
      "book",
      "halaqat",
      "الحلقات",
    ],
    ["المقر الثاني", "وهران · 368 طالبا", "branch", "branches", "المقرات"],
    ["نبيل بوعلام", "مدير مركزي", "userCog", "users", "المستخدمون"],
  ]
  const filtered = results.filter((item) => item.join(" ").includes(query))
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن طالب، شيخ، حلقة، مقر أو مستخدم..."
          />
          <kbd>Esc</kbd>
        </div>
        <div className="command-results">
          {filtered.length ? (
            filtered.map((item, index) => (
              <div className="result-group" key={item[0]}>
                {(index === 0 || filtered[index - 1][4] !== item[4]) && (
                  <small className="result-label">{item[4]}</small>
                )}
                <button
                  onClick={() => {
                    navigate(item[3])
                    onClose()
                  }}
                >
                  <span className="result-icon">
                    <Icon name={item[2]} />
                  </span>
                  <span>
                    <strong>{item[0]}</strong>
                    <small>{item[1]}</small>
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

const notificationData = [
  [
    "أضيف طالب جديد إلى حلقتك",
    "محمد أمين · حلقة الإمام مالك",
    "منذ 8 دقائق",
    "student",
  ],
  [
    "تم تعيينك في حلقة جديدة",
    "حلقة ابن الجزري · المقر الثالث",
    "منذ ساعتين",
    "halaqat",
  ],
  ["تم تحديث بيانات الحلقة", "حلقة البخاري", "أمس", "halaqat"],
  ["إشعار إداري", "تم تحديث صلاحيات إدارة المقر", "منذ يومين", "roles"],
] as const

function Notifications({
  onClose,
  onOpenCenter,
  navigate,
}: {
  onClose: () => void
  onOpenCenter: () => void
  navigate: (screen: Screen) => void
}) {
  const [read, setRead] = useState<number[]>([])
  return (
    <div className="popover-layer" onClick={onClose}>
      <aside
        className="notifications-popover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-head">
          <div>
            <strong>الإشعارات</strong>
            <small>{notificationData.length - read.length} غير مقروءة</small>
          </div>
          <button
            className="text-action"
            onClick={() => setRead(notificationData.map((_, index) => index))}
          >
            تحديد الكل كمقروء
          </button>
        </div>
        {notificationData.slice(0, 3).map((item, index) => (
          <button
            className={`notification ${read.includes(index) ? "" : "unread"}`}
            key={item[0]}
            onClick={() => {
              setRead([...read, index])
              navigate(item[3] as Screen)
              onClose()
            }}
          >
            <i />
            <span>
              <strong>{item[0]}</strong>
              <small>{item[1]}</small>
              <time>{item[2]}</time>
            </span>
          </button>
        ))}
        <Button
          variant="ghost"
          onClick={() => {
            onOpenCenter()
            onClose()
          }}
        >
          عرض مركز الإشعارات
        </Button>
      </aside>
    </div>
  )
}

function NotificationCenter({
  navigate,
}: {
  navigate: (screen: Screen) => void
}) {
  const [read, setRead] = useState<number[]>([])
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">الإشعارات</div>
          <p>تابع التغييرات والتعيينات الإدارية المهمة.</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => setRead(notificationData.map((_, index) => index))}
        >
          تحديد الكل كمقروء
        </Button>
      </section>
      <section className="notification-center">
        {notificationData.length ? (
          notificationData.map((item, index) => (
            <button
              className={read.includes(index) ? "" : "unread"}
              key={item[0]}
              onClick={() => {
                setRead([...read, index])
                navigate(item[3] as Screen)
              }}
            >
              <span className="notification-icon">
                <Icon
                  name={
                    item[3] === "student"
                      ? "school"
                      : item[3] === "roles"
                        ? "shield"
                        : "book"
                  }
                />
              </span>
              <span>
                <strong>{item[0]}</strong>
                <small>{item[1]}</small>
                <time>{item[2]}</time>
              </span>
              <Icon name="arrow" />
            </button>
          ))
        ) : (
          <EmptyState
            icon="bell"
            title="أنت مطّلع على كل شيء."
            detail="لا توجد إشعارات جديدة حاليا."
          />
        )}
      </section>
    </div>
  )
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [recovery, setRecovery] = useState(false)
  return (
    <div className="login-page">
      <section className="login-brand">
        <img
          className="brand-logo large"
          src="/assets/4a23e.svg"
          alt="Djam3ya"
        />
        <strong>Djam3ya</strong>
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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onLogin()
          }}
        >
          <label>
            البريد الإلكتروني أو اسم المستخدم
            <input defaultValue="n.boualam" />
          </label>
          <label>
            كلمة المرور
            <input type="password" defaultValue="password" />
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" /> تذكرني
            </label>
            <button type="button" onClick={() => setRecovery(true)}>
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

function MobileNav({
  screen,
  navigate,
}: {
  screen: Screen
  navigate: (s: Screen) => void
}) {
  return (
    <nav className="mobile-nav" aria-label="التنقل على الهاتف">
      {[
        ["dashboard", "الرئيسية", "home"],
        ["halaqat", "الحلقات", "book"],
        ["settings", "المزيد", "more"],
      ].map((n) => (
        <button
          key={n[0]}
          className={screen === n[0] ? "active" : ""}
          onClick={() => navigate(n[0] as Screen)}
        >
          <Icon name={n[2] as IconName} />
          <span>{n[1]}</span>
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("djam3ya-theme") === "dark",
  )
  const [mobileMenu, setMobileMenu] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [filtersOpen, setFiltersOpen] = useState(false),
    [notificationsOpen, setNotificationsOpen] = useState(false)
  const [filters, setFilters] = useState<StudentFilters>(emptyStudentFilters)
  const [form, setForm] = useState<{
    kind: FormKind
    mode: "add" | "edit"
  } | null>(null)
  const [profile, setProfile] = useState<{
    type: EntityType
    name: string
  } | null>(null)
  const [exporting, setExporting] = useState<{
    title: string
    count: number
  } | null>(null)
  const [assignment, setAssignment] = useState<FormKind | null>(null)
  const [success, setSuccess] = useState<{
    kind: FormKind
    message: string
  } | null>(null)
  const [confirm, setConfirm] = useState<{
    title: string
    detail: string
  } | null>(null)
  const [toast, setToast] = useState("")
  const [onlineState, setOnlineState] =
    useState<"online" | "offline" | "syncing">("online")
  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }
  const navigate = (next: Screen) => {
    setScreen(next)
    if (next !== "entity") setProfile(null)
  }
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === "Escape") {
        setSearchOpen(false)
        setNotificationsOpen(false)
      }
    }
    const offline = () => setOnlineState("offline")
    const online = () => {
      setOnlineState("syncing")
      window.setTimeout(() => setOnlineState("online"), 1800)
    }
    window.addEventListener("keydown", keyboard)
    window.addEventListener("offline", offline)
    window.addEventListener("online", online)
    return () => {
      window.removeEventListener("keydown", keyboard)
      window.removeEventListener("offline", offline)
      window.removeEventListener("online", online)
    }
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light"
    window.localStorage.setItem("djam3ya-theme", darkMode ? "dark" : "light")
  }, [darkMode])
  const titles: Record<Screen, string> = {
    dashboard: "نظرة عامة",
    students: "الطلاب",
    sheikhs: "الشيوخ",
    halaqat: "الحلقات",
    branches: "المقرات",
    roles: "الأدوار",
    users: "المستخدمون",
    reports: "التقارير",
    activity: "سجل النشاط",
    notifications: "الإشعارات",
    settings: "الإعدادات",
    student: "ملف الطالب",
    entity: profile?.name || "الملف",
    login: "تسجيل الدخول",
  }
  if (screen === "login")
    return <Login onLogin={() => setScreen("dashboard")} />
  const currentEntity = profile?.type || "sheikhs"
  const addKind = (type: EntityType): FormKind =>
    ({
      sheikhs: "sheikh",
      halaqat: "halaqa",
      branches: "branch",
      roles: "role",
      users: "user",
    })[type] as FormKind
  const content =
    screen === "dashboard" ? (
      <Dashboard
        navigate={navigate}
        onAdd={(kind) => setForm({ kind, mode: "add" })}
        onExport={() => setExporting({ title: "ملخص الجمعية", count: 1248 })}
      />
    ) : screen === "students" ? (
      <Students
        onProfile={() => navigate("student")}
        onAdd={() => setForm({ kind: "student", mode: "add" })}
        onFilters={() => setFiltersOpen(true)}
        onExport={() =>
          setExporting({ title: "الطلاب", count: students.length })
        }
        filters={filters}
        setFilters={setFilters}
        onEdit={() => setForm({ kind: "student", mode: "edit" })}
        onDelete={() =>
          setConfirm({
            title: "حذف الطالب؟",
            detail:
              "سيؤثر حذف الطالب في عضوياته ضمن الحلقات. لا يمكن التراجع عن هذا الإجراء.",
          })
        }
      />
    ) : screen === "student" ? (
      <StudentProfile
        goBack={() => navigate("students")}
        navigate={navigate}
        onEdit={() => setForm({ kind: "student", mode: "edit" })}
        onExport={() => setExporting({ title: "ملف الطالب", count: 1 })}
        onAssign={() => setAssignment("student")}
        onDelete={() =>
          setConfirm({
            title: "حذف الطالب؟",
            detail:
              "سيؤثر حذف الطالب في عضوياته ضمن الحلقات. لا يمكن التراجع عن هذا الإجراء.",
          })
        }
      />
    ) : screen === "entity" && profile ? (
      <EntityProfile
        key={`${profile.type}-${profile.name}`}
        type={profile.type}
        name={profile.name}
        onBack={() => navigate(profile.type as Screen)}
        onEdit={() => setForm({ kind: addKind(profile.type), mode: "edit" })}
        onExport={() =>
          setExporting({ title: entityContent[profile.type].title, count: 1 })
        }
        onAssign={() => setAssignment(addKind(profile.type))}
        onDelete={() =>
          setConfirm({
            title: `حذف ${profile.name}؟`,
            detail:
              "قد يؤثر الحذف في العلاقات والتعيينات المرتبطة. لا يمكن التراجع عن هذا الإجراء.",
          })
        }
        onOpenRelated={(type, relatedName) => {
          setProfile({ type, name: relatedName })
          setScreen("entity")
        }}
      />
    ) : ["sheikhs", "halaqat", "branches", "roles", "users"].includes(
        screen,
      ) ? (
      <EntityList
        type={screen as EntityType}
        onAdd={() =>
          setForm({ kind: addKind(screen as EntityType), mode: "add" })
        }
        onExport={() =>
          setExporting({
            title: entityContent[screen].title,
            count: entityContent[screen].rows.length,
          })
        }
        onOpen={(type, name) => {
          setProfile({ type, name })
          setScreen("entity")
        }}
        onEdit={() =>
          setForm({ kind: addKind(screen as EntityType), mode: "edit" })
        }
      />
    ) : screen === "reports" ? (
      <Reports
        onExport={() => setExporting({ title: "التقرير", count: 1248 })}
      />
    ) : screen === "activity" ? (
      <Activity />
    ) : screen === "notifications" ? (
      <NotificationCenter navigate={navigate} />
    ) : (
      <Settings onSave={showToast} />
    )
  return (
    <div className="app" dir="rtl">
      <Sidebar
        screen={screen}
        setScreen={navigate}
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
      />
      <div className="app-main">
        <Header
          title={titles[screen]}
          onMenu={() => setMobileMenu(true)}
          onSearch={() => setSearchOpen(true)}
          onNotifications={() => setNotificationsOpen(true)}
          onLanguage={() =>
            showToast(
              "يمكن تغيير العربية أو الفرنسية أو الإنجليزية من الإعدادات.",
            )
          }
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode((current) => !current)}
        />
        {onlineState !== "online" && (
          <div className="network-status">
            <Icon
              name={onlineState === "offline" ? "warning" : "upload"}
              size={16}
            />
            {onlineState === "offline"
              ? "غير متصل — يتم عرض البيانات المحفوظة."
              : "عاد الاتصال — جارٍ مزامنة التغييرات..."}
          </div>
        )}
        {content}
      </div>
      <MobileNav screen={screen} navigate={navigate} />
      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          navigate={navigate}
        />
      )}
      {filtersOpen && (
        <FilterDrawer
          value={filters}
          onClose={() => setFiltersOpen(false)}
          onApply={(value) => {
            setFilters(value)
            setFiltersOpen(false)
            showToast("تم تطبيق الفلاتر.")
          }}
        />
      )}
      {form && (
        <EntityForm
          kind={form.kind}
          mode={form.mode}
          onClose={() => setForm(null)}
          onSuccess={(message) => {
            const completed = form
            setForm(null)
            if (completed.mode === "add") {
              setSuccess({ kind: completed.kind, message })
            } else {
              showToast(message)
            }
          }}
        />
      )}
      {success && (
        <SuccessDialog
          kind={success.kind}
          message={success.message}
          onClose={() => setSuccess(null)}
          onPrimary={() => {
            const destination: Partial<Record<FormKind, Screen>> = {
              student: "student",
              sheikh: "sheikhs",
              halaqa: "halaqat",
              branch: "branches",
              role: "roles",
              user: "users",
            }
            setSuccess(null)
            navigate(destination[success.kind] || "dashboard")
          }}
          onSecondary={() => {
            const kind = success.kind
            setSuccess(null)
            if (kind === "student") setForm({ kind, mode: "add" })
            else if (kind === "sheikh") setAssignment(kind)
            else if (kind === "halaqa") setAssignment("student")
            else if (kind === "branch") setForm({ kind: "halaqa", mode: "add" })
            else setForm({ kind, mode: "add" })
          }}
        />
      )}
      {exporting && (
        <ExportDialog
          title={exporting.title}
          count={exporting.count}
          onClose={() => setExporting(null)}
          onReady={showToast}
        />
      )}
      {assignment && (
        <AssignmentDialog
          kind={assignment}
          onClose={() => setAssignment(null)}
          onDone={showToast}
        />
      )}
      {confirm && (
        <ConfirmDialog
          title={confirm.title}
          detail={confirm.detail}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            setConfirm(null)
            showToast("تم الحذف بنجاح.")
            navigate(currentEntity as Screen)
          }}
        />
      )}
      {notificationsOpen && (
        <Notifications
          onClose={() => setNotificationsOpen(false)}
          onOpenCenter={() => navigate("notifications")}
          navigate={navigate}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
