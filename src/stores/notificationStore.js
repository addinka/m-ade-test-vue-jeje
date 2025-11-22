import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref([])
  let notificationId = 1

  // Notification types
  const TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    FRIEND_REQUEST: 'friend_request',
    LIKE: 'like',
    COMMENT: 'comment',
    SHARE: 'share',
    SYSTEM: 'system'
  }

  const add = (notification) => {
    const id = notificationId++
    const newNotification = {
      id,
      type: TYPES.INFO,
      title: '',
      message: '',
      timestamp: new Date(),
      read: false,
      user: null, // { name, avatar, id }
      actionUrl: null,
      metadata: {}, // additional data
      ...notification
    }

    notifications.value.unshift(newNotification) // Add to beginning

    // Keep only last 50 notifications
    if (notifications.value.length > 50) {
      notifications.value = notifications.value.slice(0, 50)
    }

    return id
  }

  const remove = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
  }

  const clear = () => {
    notifications.value = []
  }

  // Computed properties
  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })

  const recentNotifications = computed(() => {
    return notifications.value.slice(0, 10)
  })

  // Convenience methods
  const success = (title, message, options = {}) => {
    return add({ type: TYPES.SUCCESS, title, message, ...options })
  }

  const error = (title, message, options = {}) => {
    return add({ type: TYPES.ERROR, title, message, ...options })
  }

  const warning = (title, message, options = {}) => {
    return add({ type: TYPES.WARNING, title, message, ...options })
  }

  const info = (title, message, options = {}) => {
    return add({ type: TYPES.INFO, title, message, ...options })
  }

  const friendRequest = (fromUser, options = {}) => {
    return add({
      type: TYPES.FRIEND_REQUEST,
      title: 'Friend Request',
      message: `${fromUser.name} sent you a friend request`,
      user: fromUser,
      ...options
    })
  }

  const like = (fromUser, content, options = {}) => {
    return add({
      type: TYPES.LIKE,
      title: 'New Like',
      message: `${fromUser.name} liked your ${content}`,
      user: fromUser,
      ...options
    })
  }

  const comment = (fromUser, content, options = {}) => {
    return add({
      type: TYPES.COMMENT,
      title: 'New Comment',
      message: `${fromUser.name} commented on your ${content}`,
      user: fromUser,
      ...options
    })
  }

  const system = (title, message, options = {}) => {
    return add({
      type: TYPES.SYSTEM,
      title,
      message,
      ...options
    })
  }

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case TYPES.SUCCESS:
        return '✅'
      case TYPES.ERROR:
        return '❌'
      case TYPES.WARNING:
        return '⚠️'
      case TYPES.INFO:
        return 'ℹ️'
      case TYPES.FRIEND_REQUEST:
        return '👥'
      case TYPES.LIKE:
        return '❤️'
      case TYPES.COMMENT:
        return '💬'
      case TYPES.SHARE:
        return '🔗'
      case TYPES.SYSTEM:
        return '🔔'
      default:
        return '🔔'
    }
  }

  // Format time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - new Date(timestamp)
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return new Date(timestamp).toLocaleDateString()
  }

  return {
    notifications,
    unreadCount,
    recentNotifications,
    TYPES,
    add,
    remove,
    markAsRead,
    markAllAsRead,
    clear,
    success,
    error,
    warning,
    info,
    friendRequest,
    like,
    comment,
    system,
    getNotificationIcon,
    getTimeAgo
  }
})