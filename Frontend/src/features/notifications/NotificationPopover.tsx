import { useState, useEffect } from "react"
import { Button } from "@/components/ui"
import { notificationStore } from "@/services/store"
import type { Screen, NotificationItem } from "@/types"

export interface NotificationPopoverProps {
  onClose: () => void
  onOpenCenter: () => void
  navigate: (screen: Screen) => void
}

export function NotificationPopover({
  onClose,
  onOpenCenter,
  navigate,
}: NotificationPopoverProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    notificationStore.getAll(),
  )

  useEffect(() => {
    return notificationStore.subscribe(() => {
      setNotifications(notificationStore.getAll())
    })
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="popover-layer" onClick={onClose}>
      <aside
        className="notifications-popover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-head">
          <div>
            <strong>الإشعارات</strong>
            <small>{unreadCount} غير مقروءة</small>
          </div>
          <button
            className="text-action"
            onClick={() => notificationStore.markAllAsRead()}
          >
            تحديد الكل كمقروء
          </button>
        </div>
        {notifications.slice(0, 3).map((item) => (
          <button
            className={`notification ${item.read ? "" : "unread"}`}
            key={item.id}
            onClick={() => {
              notificationStore.markAsRead(item.id)
              navigate(item.targetScreen as Screen)
              onClose()
            }}
          >
            <i />
            <span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
              <time>{item.timeAgo}</time>
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
