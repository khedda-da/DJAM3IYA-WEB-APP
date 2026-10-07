import { useState, useEffect } from "react"

// Layout
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"

// UI
import { Icon } from "@/components/ui/Icon"

// Features – auth
import { LoginView } from "@/features/auth"

// Features – dashboard
import { DashboardView } from "@/features/dashboard"

// Features – students
import { StudentsView } from "@/features/students/StudentsView"
import { StudentProfile } from "@/features/students/StudentProfile"
import { StudentFilterDrawer } from "@/features/students/StudentFilterDrawer"

// Features – entities
import {
  EntityListView,
  EntityProfileView,
  EntityForm,
  AssignmentDialog,
  ConfirmDialog,
  SuccessDialog,
  ExportDialog,
} from "@/features/entities"

// Features – misc screens
import { ActivityView } from "@/features/activity"
import { NotificationPopover } from "@/features/notifications/NotificationPopover"
import { NotificationCenterView } from "@/features/notifications/NotificationCenterView"
import { SettingsView } from "@/features/settings"
import { SearchOverlay } from "@/features/search"
import { ReportsView } from "@/features/reports"

// Services
import { entityContent } from "@/services/mockData"
import { studentStore } from "@/services/store"

// Types
import type { Screen, EntityType, FormKind } from "@/types/navigation"
import type { Student } from "@/types/student"
import type { StudentFilters } from "@/types/filters"

// ── Constants ────────────────────────────────────────────────────────────────

const SCREEN_TITLES: Record<Screen, string> = {
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
  entity: "الملف",
  login: "تسجيل الدخول",
}

const ENTITY_SCREENS: EntityType[] = [
  "sheikhs",
  "halaqat",
  "branches",
  "roles",
  "users",
]

const ENTITY_TO_FORM_KIND: Record<EntityType, FormKind> = {
  sheikhs: "sheikh",
  halaqat: "halaqa",
  branches: "branch",
  roles: "role",
  users: "user",
}

const SUCCESS_DESTINATION: Record<FormKind, Screen> = {
  student: "student",
  sheikh: "sheikhs",
  halaqa: "halaqat",
  branch: "branches",
  role: "roles",
  user: "users",
}

const EMPTY_STUDENT_FILTERS: StudentFilters = {
  level: "",
  branch: "",
  sheikh: "",
  halaqa: "",
  school: "",
  minAge: "",
  maxAge: "",
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  // Navigation
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [entityProfile, setEntityProfile] = useState<{
    type: EntityType
    name: string
  } | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Live student list from store
  const [students, setStudents] = useState(() => studentStore.getAll())

  // UI state
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("djam3ya-theme") === "dark",
  )
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [onlineState, setOnlineState] = useState<"online" | "offline" | "syncing">("online")
  const [toast, setToast] = useState("")

  // Filters
  const [studentFilters, setStudentFilters] = useState<StudentFilters>(EMPTY_STUDENT_FILTERS)

  // Modals / dialogs
  const [form, setForm] = useState<{ kind: FormKind; mode: "add" | "edit" } | null>(null)
  const [exporting, setExporting] = useState<{ title: string; count: number } | null>(null)
  const [assignment, setAssignment] = useState<FormKind | null>(null)
  const [success, setSuccess] = useState<{ kind: FormKind; message: string } | null>(null)
  const [confirm, setConfirm] = useState<{ title: string; detail: string; onConfirm: () => void } | null>(null)

  // ── Helpers ────────────────────────────────────────────────────────────────

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }

  const navigate = (next: Screen) => {
    setScreen(next)
    if (next !== "entity") setEntityProfile(null)
  }

  const openEntityProfile = (type: EntityType, name: string) => {
    setEntityProfile({ type, name })
    setScreen("entity")
  }

  const addKind = (type: EntityType): FormKind =>
    ENTITY_TO_FORM_KIND[type]

  // ── Effects ────────────────────────────────────────────────────────────────

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

  // Subscribe to student store so the list re-renders on mutations
  useEffect(() => {
    return studentStore.subscribe(() => setStudents(studentStore.getAll()))
  }, [])

  // ── Login screen ───────────────────────────────────────────────────────────

  if (screen === "login")
    return <LoginView onLogin={() => setScreen("dashboard")} />

  // ── Main content ───────────────────────────────────────────────────────────

  const screenTitle =
    screen === "entity"
      ? entityProfile?.name ?? "الملف"
      : SCREEN_TITLES[screen]

  const content = (() => {
    if (screen === "dashboard")
      return (
        <DashboardView
          navigate={navigate}
          onAdd={(kind) => setForm({ kind, mode: "add" })}
          onExport={() => setExporting({ title: "ملخص الجمعية", count: 1248 })}
        />
      )

    if (screen === "students")
      return (
        <StudentsView
          students={students}
          filters={studentFilters}
          setFilters={setStudentFilters}
          onProfile={(student) => {
            setSelectedStudent(student)
            navigate("student")
          }}
          onAdd={() => setForm({ kind: "student", mode: "add" })}
          onFilters={() => setFiltersOpen(true)}
          onExport={() =>
            setExporting({ title: "الطلاب", count: students.length })
          }
          onEdit={() => setForm({ kind: "student", mode: "edit" })}
          onDelete={(student) =>
            setConfirm({
              title: "حذف الطالب؟",
              detail:
                "سيؤثر حذف الطالب في عضوياته ضمن الحلقات. لا يمكن التراجع عن هذا الإجراء.",
              onConfirm: () => {
                studentStore.delete(student.id)
                navigate("students")
                showToast("تم حذف الطالب بنجاح.")
              },
            })
          }
        />
      )

    if (screen === "student")
      return (
        <StudentProfile
          student={selectedStudent ?? undefined}
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
              onConfirm: () => {
                if (selectedStudent) studentStore.delete(selectedStudent.id)
                navigate("students")
                showToast("تم حذف الطالب بنجاح.")
              },
            })
          }
        />
      )

    if (screen === "entity" && entityProfile)
      return (
        <EntityProfileView
          key={`${entityProfile.type}-${entityProfile.name}`}
          type={entityProfile.type}
          name={entityProfile.name}
          onBack={() => navigate(entityProfile.type as Screen)}
          onEdit={() =>
            setForm({ kind: addKind(entityProfile.type), mode: "edit" })
          }
          onExport={() =>
            setExporting({
              title: entityContent[entityProfile.type].title,
              count: 1,
            })
          }
          onAssign={() => setAssignment(addKind(entityProfile.type))}
          onDelete={() =>
            setConfirm({
              title: `حذف ${entityProfile.name}؟`,
              detail:
                "قد يؤثر الحذف في العلاقات والتعيينات المرتبطة. لا يمكن التراجع عن هذا الإجراء.",
              onConfirm: () => {
                navigate(entityProfile.type as Screen)
                showToast("تم الحذف بنجاح.")
              },
            })
          }
          onOpenRelated={openEntityProfile}
        />
      )

    if ((ENTITY_SCREENS as string[]).includes(screen))
      return (
        <EntityListView
          type={screen as EntityType}
          onAdd={() => setForm({ kind: addKind(screen as EntityType), mode: "add" })}
          onExport={() =>
            setExporting({
              title: entityContent[screen as EntityType].title,
              count: entityContent[screen as EntityType].rows.length,
            })
          }
          onOpen={openEntityProfile}
          onEdit={() => setForm({ kind: addKind(screen as EntityType), mode: "edit" })}
        />
      )

    if (screen === "reports")
      return (
        <ReportsView
          onExport={() => setExporting({ title: "التقرير", count: 1248 })}
        />
      )

    if (screen === "activity") return <ActivityView />

    if (screen === "notifications")
      return <NotificationCenterView navigate={navigate} />

    return <SettingsView onSave={showToast} />
  })()

  // ── Render ─────────────────────────────────────────────────────────────────

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
          title={screenTitle}
          onMenu={() => setMobileMenu(true)}
          onSearch={() => setSearchOpen(true)}
          onNotifications={() => setNotificationsOpen(true)}
          onLanguage={() =>
            showToast(
              "يمكن تغيير العربية أو الفرنسية أو الإنجليزية من الإعدادات.",
            )
          }
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode((prev) => !prev)}
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

      {/* ── Overlays ──────────────────────────────────────────────────────── */}

      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          navigate={navigate}
        />
      )}

      {filtersOpen && (
        <StudentFilterDrawer
          value={studentFilters}
          onClose={() => setFiltersOpen(false)}
          onApply={(value) => {
            setStudentFilters(value)
            setFiltersOpen(false)
            showToast("تم تطبيق الفلاتر.")
          }}
        />
      )}

      {notificationsOpen && (
        <NotificationPopover
          onClose={() => setNotificationsOpen(false)}
          onOpenCenter={() => navigate("notifications")}
          navigate={navigate}
        />
      )}

      {/* ── Modals ────────────────────────────────────────────────────────── */}

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
            setSuccess(null)
            navigate(SUCCESS_DESTINATION[success.kind])
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
            confirm.onConfirm()
          }}
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
