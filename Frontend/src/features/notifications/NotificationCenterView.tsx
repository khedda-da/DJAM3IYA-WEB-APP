import { useState, useEffect } from "react"
import { Icon, Button, EmptyState } from "@/components/ui"
import { notificationStore } from "@/services/store"
import type { Screen, NotificationItem, IconName } from "@/types"

export interface NotificationCenterViewProps {
  navigate: (screen: Screen) => void
}

export function NotificationCenterView({
  navigate,
}: NotificationCenterViewProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    notificationStore.getAll(),
  )

  useEffect(() => {
    return notificationStore.subscribe(() => {
      setNotifications(notificationStore.getAll())
    })
  }, [])

  const getNotificationIcon = (target: string): IconName => {
    if (target === "student") return "school"
    if (target === "roles") return "shield"
    return "book"
  }

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <div className="page-title">الإشعارات</div>
          <p>تابع التغييرات والتعيينات الإدارية المهمة.</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => notificationStore.markAllAsRead()}
        >
          تحديد الكل كمقروء
        </Button>
      </section>

      <section className="notification-center">
        {notifications.length ? (
          notifications.map((item) => (
            <button
              className={item.read ? "" : "unread"}
              key={item.id}
              onClick={() => {
                notificationStore.markAsRead(item.id)
                navigate(item.targetScreen as Screen)
              }}
            >
              <span className="notification-icon">
                <Icon name={getNotificationIcon(item.targetScreen)} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
                <time>{item.timeAgo}</time>
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
