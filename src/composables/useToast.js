import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const notificationStore = useNotificationStore()

  const showToast = (options) => {
    const id = toastId++
    const toast = {
      id,
      show: true,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message || '',
      duration: options.duration || 5000
    }

    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title, message, duration = 3000) => {
    // Use notification system
    return notificationStore.success(title, message, { persistent: false })
  }

  const error = (title, message, duration = 4000) => {
    // Use notification system
    return notificationStore.error(title, message, { persistent: false })
  }

  const warning = (title, message, duration = 4000) => {
    // Use notification system
    return notificationStore.warning(title, message, { persistent: false })
  }

  const info = (title, message, duration = 3000) => {
    // Use notification system
    return notificationStore.info(title, message, { persistent: false })
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}