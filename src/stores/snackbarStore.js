import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbars = ref([])

  const add = (snackbar) => {
    const id = Date.now() + Math.random()
    const newSnackbar = {
      id,
      type: 'info', // success, error, warning, info
      title: '',
      message: '',
      duration: 5000, // auto-dismiss after 5 seconds
      persistent: false, // if true, won't auto-dismiss
      action: null, // { label: 'Undo', handler: () => {} }
      ...snackbar
    }

    snackbars.value.unshift(newSnackbar)

    // Auto-dismiss if not persistent
    if (!newSnackbar.persistent && newSnackbar.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, newSnackbar.duration)
    }

    return id
  }

  const remove = (id) => {
    const index = snackbars.value.findIndex(s => s.id === id)
    if (index > -1) {
      snackbars.value.splice(index, 1)
    }
  }

  const clear = () => {
    snackbars.value = []
  }

  // Convenience methods
  const success = (message, options = {}) => {
    return add({ type: 'success', message, ...options })
  }

  const error = (message, options = {}) => {
    return add({ type: 'error', message, ...options })
  }

  const warning = (message, options = {}) => {
    return add({ type: 'warning', message, ...options })
  }

  const info = (message, options = {}) => {
    return add({ type: 'info', message, ...options })
  }

  return {
    snackbars,
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info
  }
})