import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
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
  
  const success = (title, message, duration) => {
    return showToast({ type: 'success', title, message, duration })
  }
  
  const error = (title, message, duration) => {
    return showToast({ type: 'error', title, message, duration })
  }
  
  const warning = (title, message, duration) => {
    return showToast({ type: 'warning', title, message, duration })
  }
  
  const info = (title, message, duration) => {
    return showToast({ type: 'info', title, message, duration })
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
