import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const currentUser = ref(null)
  const isAuthenticated = ref(false)

  // Available roles
  const ROLES = {
    ADMIN: 'admin',
    VIEWER: 'viewer'
  }

  // Getters
  const userRole = computed(() => currentUser.value?.role || null)
  const isAdmin = computed(() => userRole.value === ROLES.ADMIN)
  const isViewer = computed(() => userRole.value === ROLES.VIEWER)
  const canAssignTransporters = computed(() => isAdmin.value)
  const canViewDetails = computed(() => isAuthenticated.value)

  // Actions
  function login(role = ROLES.ADMIN) {
    // Simulate login with role
    const user = {
      id: 1,
      name: role === ROLES.ADMIN ? 'Admin User' : 'Viewer User',
      email: role === ROLES.ADMIN ? 'admin@example.com' : 'viewer@example.com',
      role: role,
      avatar: '👤'
    }

    currentUser.value = user
    isAuthenticated.value = true

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAuthenticated', 'true')

    return user
  }

  function logout() {
    currentUser.value = null
    isAuthenticated.value = false

    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  function initializeAuth() {
    // Check localStorage on app start
    const savedUser = localStorage.getItem('user')
    const savedAuth = localStorage.getItem('isAuthenticated')

    if (savedUser && savedAuth === 'true') {
      currentUser.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    } else {
      // Default to admin for demo purposes
      login(ROLES.ADMIN)
    }
  }

  function switchRole(role) {
    if (Object.values(ROLES).includes(role)) {
      login(role)
    }
  }

  return {
    // State
    currentUser,
    isAuthenticated,
    ROLES,

    // Getters
    userRole,
    isAdmin,
    isViewer,
    canAssignTransporters,
    canViewDetails,

    // Actions
    login,
    logout,
    initializeAuth,
    switchRole
  }
})
