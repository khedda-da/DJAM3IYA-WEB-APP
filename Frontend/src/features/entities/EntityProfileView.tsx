import { useState } from "react"
import { Icon } from "@/components/ui/Icon"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Badge } from "@/components/ui/Badge"
import { EmptyState } from "@/components/ui/EmptyState"
import {
  entityContent,
  entityAttributes,
  profileTabs,
  halaqaRecords,
  initialStudents,
} from "@/services/mockData"
import type { EntityType } from "@/types/navigation"
import type { HalaqaRecord } from "@/types/halaqa"

// ── sub-components ──────────────────────────────────────────────────────────

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
  const matching = initialStudents.filter((student) => {
    const related =
      type === "sheikhs"
        ? student.sheikh === name
        : type === "halaqat"
          ? student.halaqa === name
          : type === "branches"
            ? student.branch === name
            : true
    return related && student.name.includes(query)
  })

  return (
    <div>
      <div className="inline-toolbar">
        <label className="search-field">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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

// ── ProfileTabContent ────────────────────────────────────────────────────────

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
  if (tab.includes("النشاط")) {
    // Compact activity placeholder (full ActivityView is screen-level)
    return (
      <div className="compact-list">
        <div>
          <span className="avatar">
            <Icon name="shield" size={18} />
          </span>
          <span>
            <strong>لا يوجد نشاط مسجّل حديثا</strong>
            <small>سيظهر سجل النشاط هنا عند حدوث تغييرات.</small>
          </span>
        </div>
      </div>
    )
  }

  if (tab.includes("صلاحيات")) return <PermissionMatrix />

  if (tab.includes("طلاب"))
    return (
      <RelatedStudents type={type} name={name} onAssign={onAssign} />
    )

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
    const rawSheikh = entityAttributes[name]?.sheikh
    const sheikhName = Array.isArray(rawSheikh)
      ? rawSheikh.join("، ")
      : rawSheikh || "الشيخ أحمد"
    const names: string[] =
      type === "halaqat"
        ? [sheikhName]
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

  if (tab.includes("مستخدم")) {
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
  }

  if (tab.includes("إحصائيات")) {
    const record = halaqaRecords.find((item) => item.name === name)
    return (
      <div className="details-grid">
        <div>
          <small>الطلاب</small>
          <strong>{record?.students ?? 0}</strong>
        </div>
        <div>
          <small>الشيوخ</small>
          <strong>1</strong>
        </div>
        <div>
          <small>المستوى</small>
          <strong>{record?.level ?? "—"}</strong>
        </div>
        <div>
          <small>المقر</small>
          <strong>{record?.branch ?? "—"}</strong>
        </div>
      </div>
    )
  }

  // Default: details grid
  const details: [string, string][] =
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
            ["المستوى", String(entityAttributes[name]?.level ?? "—")],
            ["المقر", String(entityAttributes[name]?.branch ?? "—")],
            ["الشيخ", String(entityAttributes[name]?.sheikh ?? "—")],
            [
              "الطلاب",
              `${halaqaRecords.find((item) => item.name === name)?.students ?? 0} طالبا`,
            ],
          ]
        : type === "branches"
          ? [
              ["الموقع", String(entityAttributes[name]?.location ?? "—")],
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
      {details.map(([label, value]) => (
        <div key={label}>
          <small>{label}</small>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  )
}

// ── EntityProfileView ────────────────────────────────────────────────────────

interface EntityProfileViewProps {
  type: EntityType
  name: string
  onBack: () => void
  onEdit: () => void
  onExport: () => void
  onAssign: () => void
  onDelete: () => void
  onOpenRelated: (type: EntityType, name: string) => void
}

const PRIMARY_ASSIGN_LABEL: Record<EntityType, string> = {
  halaqat: "إضافة طالب",
  sheikhs: "تعيين حلقة",
  branches: "إضافة حلقة",
  roles: "تعيين مستخدم",
  users: "إعادة ضبط الوصول",
}

export function EntityProfileView({
  type,
  name,
  onBack,
  onEdit,
  onExport,
  onAssign,
  onDelete,
  onOpenRelated,
}: EntityProfileViewProps) {
  const content = entityContent[type]
  const [tab, setTab] = useState(profileTabs[type][0])
  const isBranch = type === "branches"
  const isSheikh = type === "sheikhs"
  const isHalaqa = type === "halaqat"

  const subtitle = isHalaqa
    ? `${entityAttributes[name]?.level ?? "ثانوي"} · ${entityAttributes[name]?.branch ?? "المقر الثاني"}`
    : isSheikh
      ? `${halaqaRecords.filter((item) => item.sheikh === name).length} حلقات · ${halaqaRecords.filter((item) => item.sheikh === name).reduce((sum, item) => sum + item.students, 0)} طالبا`
      : isBranch
        ? `${entityAttributes[name]?.location ?? "وهران"} · ${initialStudents.filter((s) => s.branch === name).length} سجلات طلاب`
        : type === "roles"
          ? "نطاق مركزي · 6 مستخدمين"
          : "حساب نشط · آخر دخول اليوم"

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
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="profile-actions">
          <Button variant="secondary" icon="download" onClick={onExport}>
            تصدير
          </Button>
          <Button variant="secondary" icon="plus" onClick={onAssign}>
            {PRIMARY_ASSIGN_LABEL[type] ?? "إضافة ارتباط"}
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
