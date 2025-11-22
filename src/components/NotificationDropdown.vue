<template>
  <div class="notification-dropdown">
    <!-- Simple Bell Button for Testing -->
    <div
      @click="handleBellClick"
      style="background: blue; color: white; padding: 10px; border-radius: 50%; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 10px;"
    >
      🔔
    </div>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      style="position: fixed; top: 60px; right: 20px; width: 300px; height: 200px; background: yellow; border: 2px solid red; padding: 20px; z-index: 10000; box-shadow: 0 0 10px rgba(0,0,0,0.5);"
    >
      <h3 style="color: red; margin: 0 0 10px 0;">DROPDOWN TEST</h3>
      <p style="color: blue;">isOpen: {{ isOpen }}</p>
      <p style="color: green;">isOpen.value: {{ isOpen.value }}</p>
      <button
        @click="isOpen = false"
        style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;"
      >
        Close
      </button>
    </div>

    <!-- Backdrop -->
    <!-- <div
      v-if="isOpen"
      class="notification-backdrop"
      @click="closeDropdown"
    ></div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()
const {
  notifications,
  unreadCount,
  recentNotifications,
  getNotificationIcon,
  getTimeAgo
} = storeToRefs(notificationStore)

const { markAsRead, markAllAsRead, remove, clear } = notificationStore

const isOpen = ref(false)
const dropdown = ref(null)

const handleBellClick = () => {
  console.log('Bell clicked!')
  console.log('isOpen before:', isOpen.value)
  isOpen.value = !isOpen.value
  console.log('isOpen after:', isOpen.value)
}

const toggleDropdown = () => {
  console.log('Bell clicked!')
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleNotificationClick = (notification) => {
  if (!notification.read) {
    markAsRead(notification.id)
  }

  // Handle navigation or actions
  if (notification.actionUrl) {
    // Navigate to the action URL
    console.log('Navigate to:', notification.actionUrl)
  }

  closeDropdown()
}

const clearAll = () => {
  clear()
  closeDropdown()
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target) &&
      !event.target.closest('.notification-bell')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.notification-dropdown {
  position: relative;
  display: inline-block;
  z-index: 50;
}

.notification-bell {
  position: relative;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  z-index: 10;
  min-width: 40px;
  min-height: 40px;
}

.notification-bell:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.notification-bell.has-unread {
  color: #1877f2;
}

.bell-icon {
  font-size: 20px;
  line-height: 1;
}

.unread-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #e41e3f;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

.notification-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 360px;
  max-height: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e1e5e9;
  z-index: 1000;
  overflow: hidden;
}

.notification-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-title {
  font-size: 16px;
  font-weight: 600;
  color: #1c1e21;
  margin: 0;
}

.notification-actions {
  display: flex;
  gap: 8px;
}

.mark-read-btn,
.clear-btn {
  background: none;
  border: none;
  color: #1877f2;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.mark-read-btn:hover,
.clear-btn:hover {
  background-color: rgba(24, 119, 242, 0.1);
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  border-bottom: 1px solid #f0f2f5;
}

.notification-item:hover {
  background-color: #f8f9fa;
}

.notification-item.unread {
  background-color: #e7f3ff;
}

.notification-item.unread:hover {
  background-color: #d4e8ff;
}

.notification-avatar {
  flex-shrink: 0;
  margin-right: 12px;
}

.user-avatar,
.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: #f0f2f5;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-message {
  font-size: 14px;
  line-height: 1.4;
  color: #1c1e21;
  margin-bottom: 2px;
}

.user-name {
  font-weight: 600;
  color: #1c1e21;
}

.notification-text {
  color: #65676b;
}

.notification-time {
  font-size: 12px;
  color: #8a8d91;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #1877f2;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 8px;
  margin-top: 6px;
}

.notification-close {
  background: none;
  border: none;
  color: #8a8d91;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.2s;
  font-size: 16px;
  line-height: 1;
}

.notification-item:hover .notification-close {
  opacity: 1;
}

.notification-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #1c1e21;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #8a8d91;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.empty-subtext {
  font-size: 14px;
}

.notification-footer {
  padding: 12px 20px;
  border-top: 1px solid #e1e5e9;
  text-align: center;
}

.view-all-btn {
  background: none;
  border: none;
  color: #1877f2;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.view-all-btn:hover {
  background-color: rgba(24, 119, 242, 0.1);
}

.notification-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

/* Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Scrollbar styling */
.notification-list::-webkit-scrollbar {
  width: 6px;
}

.notification-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notification-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.notification-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .notification-menu {
    width: calc(100vw - 20px);
    max-width: 360px;
    right: 10px;
    left: 10px;
  }
}
</style>