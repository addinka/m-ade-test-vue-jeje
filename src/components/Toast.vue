<template>
  <transition name="slide-fade">
    <div 
      v-if="visible"
      :class="[
        'fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4',
        borderColorClass
      ]"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <span class="text-2xl">{{ icon }}</span>
        </div>
        <div class="ml-3 flex-1">
          <p :class="['text-sm font-medium', textColorClass]">
            {{ title }}
          </p>
          <p class="mt-1 text-sm text-gray-600">
            {{ message }}
          </p>
        </div>
        <button 
          @click="close"
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info', // success, error, warning, info
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 5000
  }
})

const emit = defineEmits(['close'])

const visible = ref(props.show)
let timeout = null

const borderColorClass = computed(() => {
  const classes = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500'
  }
  return classes[props.type]
})

const textColorClass = computed(() => {
  const classes = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }
  return classes[props.type]
})

const icon = computed(() => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }
  return icons[props.type]
})

watch(() => props.show, (newVal) => {
  visible.value = newVal
  if (newVal && props.duration > 0) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      close()
    }, props.duration)
  }
})

const close = () => {
  visible.value = false
  if (timeout) clearTimeout(timeout)
  emit('close')
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
