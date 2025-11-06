<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center cursor-pointer" @click="goHome">
            <div class="text-2xl font-bold">🚚</div>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden sm:flex sm:space-x-8">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.path"
              :to="item.path" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
              :class="isActive(item.path) ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
              @click="handleNavClick(item)"
            >
              <span class="mr-2">{{ item.icon }}</span>
              {{ item.label }}
            </router-link>
          </div>
        </div>
        
        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Notification Badge -->
          <button 
            @click="toggleNotifications" 
            class="relative p-2 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <span class="text-xl">�</span>
            <span 
              v-if="unreadNotifications > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
            >
              {{ unreadNotifications }}
            </span>
          </button>
          
          <!-- User Menu -->
          <div class="relative">
            <button 
              @click="toggleUserMenu"
              class="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-semibold">
                A
              </div>
              <span class="text-sm font-medium text-gray-700">Admin</span>
              <span class="text-gray-400 transition-transform" :class="{ 'rotate-180': showUserMenu }">▼</span>
            </button>
            
            <!-- Dropdown Menu -->
            <transition name="fade">
              <div 
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <a 
                  v-for="item in userMenuItems"
                  :key="item.label"
                  href="#"
                  @click.prevent="handleUserMenuClick(item)"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span class="mr-2">{{ item.icon }}</span>
                  {{ item.label }}
                </a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="sm:hidden border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link 
          v-for="item in navigationItems" 
          :key="item.path"
          :to="item.path"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="isActive(item.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'"
          @click="handleNavClick(item)"
        >
          <span class="mr-2">{{ item.icon }}</span>
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const { info, warning } = useToast()

const showUserMenu = ref(false)
const unreadNotifications = ref(3)

const navigationItems = ref([
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/shipping', label: 'Shipping', icon: '📦' },
  { path: '/tracking', label: 'Tracking', icon: '📍' },
  { path: '/clients', label: 'Clients', icon: '👥' },
  { path: '/settings', label: 'Settings', icon: '⚙️' }
])

const userMenuItems = ref([
  { label: 'Profile', icon: '👤', action: 'profile' },
  { label: 'Settings', icon: '⚙️', action: 'settings' },
  { label: 'Help', icon: '❓', action: 'help' },
  { label: 'Logout', icon: '🚪', action: 'logout' }
])

const isActive = (path) => {
  return computed(() => route.path === path).value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleNotifications = () => {
  info('Notifications', `You have ${unreadNotifications.value} unread notifications`)
  unreadNotifications.value = 0
}

const handleNavClick = (item) => {
  if (item.path !== '/' && !route.path.startsWith(item.path)) {
    warning('Coming Soon', `${item.label} page is under development`)
  }
}

const handleUserMenuClick = (item) => {
  showUserMenu.value = false
  
  if (item.action === 'logout') {
    warning('Logout', 'Logout functionality will be implemented')
  } else {
    info(item.label, `${item.label} feature coming soon`)
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
