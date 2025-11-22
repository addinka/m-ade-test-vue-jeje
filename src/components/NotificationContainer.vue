<template>
  <div class="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="getNotificationClasses(notification.type)"
        class="p-3 rounded-lg shadow-md border flex items-center space-x-3 min-w-72 max-w-sm backdrop-blur-sm"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <span class="text-base">{{ getNotificationIcon(notification.type) }}</span>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0 text-sm">
          <div v-if="notification.title" class="font-medium">
            {{ notification.title }}
          </div>
          <div class="opacity-90">
            {{ notification.message }}
          </div>
        </div>

        <!-- Close button -->
        <button
          @click="remove(notification.id)"
          class="flex-shrink-0 text-white opacity-70 hover:opacity-100 transition-opacity text-sm hover:bg-white hover:bg-opacity-20 rounded px-1"
        >
          ✕
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)

const remove = (id) => {
  notificationStore.remove(id)
}

const getNotificationClasses = (type) => {
  const baseClasses = 'text-white border-0'

  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-600`
    case 'error':
      return `${baseClasses} bg-red-600`
    case 'warning':
      return `${baseClasses} bg-yellow-500 text-gray-900`
    case 'info':
    default:
      return `${baseClasses} bg-blue-600`
  }
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
    default:
      return 'ℹ️'
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>