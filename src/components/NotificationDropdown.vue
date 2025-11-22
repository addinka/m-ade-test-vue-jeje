<template>
  <div class="notification-dropdown">
    <!-- Notification Bell Button -->
    <div
      @click="toggleDropdown"
      class="notification-bell"
      :class="{ 'has-unread': unreadCount > 0 }"
      role="button"
      tabindex="0"
    >
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="unread-badge">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </div>

    <!-- Dropdown Menu -->
    <transition name="dropdown">
      <div
        v-if="isOpen"
        ref="dropdown"
        class="notification-menu"
        @click.stop
      >
        <!-- Header -->
        <div class="notification-header">
          <h3 class="notification-title">Notifications</h3>
          <div class="notification-actions">
            <button
              v-if="unreadCount > 0"
              @click="markAllAsRead"
              class="mark-read-btn"
            >
              Mark all read
            </button>
            <button @click="clearAll" class="clear-btn">
              Clear all
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div class="notification-list">
          <div
            v-for="notification in recentNotifications"
            :key="notification.id"
            @click="handleNotificationClick(notification)"
            class="notification-item"
            :class="{ 'unread': !notification.read }"
          >
            <!-- Avatar/Icon -->
            <div class="notification-avatar">
              <span v-if="notification.user?.avatar" class="user-avatar">
                {{ notification.user.avatar }}
              </span>
              <span v-else class="notification-icon">
                {{ getNotificationIcon(notification.type) }}
              </span>
            </div>

            <!-- Content -->
            <div class="notification-content">
              <div class="notification-message">
                <span v-if="notification.user" class="user-name">
                  {{ notification.user.name }}
                </span>
                <span class="notification-text">{{ notification.message }}</span>
              </div>
              <div class="notification-time">
                {{ getTimeAgo(notification.timestamp) }}
              </div>
            </div>

            <!-- Unread Indicator -->
            <div v-if="!notification.read" class="unread-dot"></div>

            <!-- Close Button -->
            <button
              @click.stop="remove(notification.id)"
              class="notification-close"
            >
              ×
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="recentNotifications.length === 0" class="empty-state">
            <div class="empty-icon">🔔</div>
            <div class="empty-text">No notifications yet</div>
            <div class="empty-subtext">We'll notify you when something happens</div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="notifications.length > 10" class="notification-footer">
          <button class="view-all-btn">
            View All Notifications
          </button>
        </div>
      </div>
    </transition>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="notification-backdrop"
      @click="closeDropdown"
    ></div>
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
  recentNotifications
} = storeToRefs(notificationStore)

const { markAsRead, markAllAsRead, remove, clear, getNotificationIcon, getTimeAgo } = notificationStore

const isOpen = ref(false)
const dropdown = ref(null)

const toggleDropdown = () => {
  console.log('🔔 Bell clicked! Current state:', isOpen.value)
  isOpen.value = !isOpen.value
  console.log('🔔 New state:', isOpen.value)
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
  z-index: 100;
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
  z-index: 101;
  min-width: 40px;
  min-height: 40px;
  pointer-events: all;
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