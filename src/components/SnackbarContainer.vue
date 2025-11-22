<template>
  <teleport to="body">
    <transition-group name="snackbar-queue" tag="div" class="snackbar-container">
      <div
        v-for="(snackbar, index) in visibleSnackbars"
        :key="snackbar.id"
        :class="getSnackbarClasses(snackbar.type)"
        class="snackbar"
        :style="{ bottom: `${index * 60 + 20}px` }"
      >
        <!-- Icon -->
        <div class="snackbar-icon">
          <span>{{ getSnackbarIcon(snackbar.type) }}</span>
        </div>

        <!-- Content -->
        <div class="snackbar-content">
          <div v-if="snackbar.title" class="snackbar-title">
            {{ snackbar.title }}
          </div>
          <div class="snackbar-message">
            {{ snackbar.message }}
          </div>
        </div>

        <!-- Actions -->
        <div class="snackbar-actions">
          <button
            v-if="snackbar.action"
            @click="handleAction(snackbar)"
            class="snackbar-action-btn"
          >
            {{ snackbar.action.label }}
          </button>
          <button
            @click="dismiss(snackbar.id)"
            class="snackbar-close-btn"
          >
            ✕
          </button>
        </div>

        <!-- Progress bar for auto-dismiss -->
        <div
          v-if="!snackbar.persistent && snackbar.duration > 0"
          class="snackbar-progress"
          :style="{ animationDuration: `${snackbar.duration}ms` }"
        ></div>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbarStore'

const snackbarStore = useSnackbarStore()
const { snackbars } = storeToRefs(snackbarStore)

// Show maximum 3 snackbars at once
const visibleSnackbars = computed(() => {
  return snackbars.value.slice(0, 3)
})

const dismiss = (id) => {
  snackbarStore.remove(id)
}

const handleAction = (snackbar) => {
  if (snackbar.action && snackbar.action.handler) {
    snackbar.action.handler()
  }
  dismiss(snackbar.id)
}

const getSnackbarClasses = (type) => {
  const baseClasses = 'snackbar'

  switch (type) {
    case 'success':
      return `${baseClasses} snackbar-success`
    case 'error':
      return `${baseClasses} snackbar-error`
    case 'warning':
      return `${baseClasses} snackbar-warning`
    case 'info':
    default:
      return `${baseClasses} snackbar-info`
  }
}

const getSnackbarIcon = (type) => {
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
.snackbar-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: none;
}

.snackbar {
  display: flex;
  align-items: center;
  min-width: 320px;
  max-width: 600px;
  margin: 0 auto 8px;
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  position: relative;
  overflow: hidden;
}

.snackbar-success {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
}

.snackbar-error {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
}

.snackbar-warning {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: #333;
}

.snackbar-info {
  background: linear-gradient(135deg, #2196f3, #1976d2);
  color: white;
}

.snackbar-icon {
  flex-shrink: 0;
  margin-right: 12px;
  font-size: 18px;
}

.snackbar-content {
  flex: 1;
  min-width: 0;
}

.snackbar-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.snackbar-message {
  font-size: 14px;
  line-height: 1.4;
}

.snackbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
}

.snackbar-action-btn {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.snackbar-action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.snackbar-close-btn {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 16px;
}

.snackbar-close-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.snackbar-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.8);
  animation: progress linear;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Animations */
.snackbar-queue-enter-active,
.snackbar-queue-leave-active {
  transition: all 0.4s ease;
}

.snackbar-queue-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}

.snackbar-queue-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(100%);
}

.snackbar-queue-move {
  transition: transform 0.4s ease;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .snackbar-container {
    left: 16px;
    right: 16px;
    transform: none;
  }

  .snackbar {
    min-width: auto;
    max-width: none;
    margin: 0 0 8px 0;
  }
}
</style>