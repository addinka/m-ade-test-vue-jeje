<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="space-y-4">
      <div>
        <div class="text-sm font-medium text-gray-700">Tracking Number:</div>
        <div class="flex items-center space-x-2 mt-1">
          <div class="text-base font-semibold text-gray-900">{{ trackingNumber }}</div>
          <button class="text-blue-600 text-sm">📋</button>
        </div>
      </div>

      <!-- Status Timeline -->
      <div class="space-y-3 py-4">
        <div 
          v-for="(status, index) in trackingStatus" 
          :key="index"
          class="flex items-start space-x-3"
        >
          <div class="flex flex-col items-center">
            <div 
              :class="[
                'w-3 h-3 rounded-full',
                status.completed ? 'bg-blue-600' : 'bg-gray-300'
              ]"
            ></div>
            <div 
              v-if="index < trackingStatus.length - 1"
              :class="[
                'w-0.5 h-8',
                status.completed ? 'bg-blue-600' : 'bg-gray-300'
              ]"
            ></div>
          </div>
          <div class="flex-1 pb-2">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-gray-900">{{ status.label }}</div>
              <div class="text-xs text-gray-500">{{ status.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Track Button -->
      <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Track this order →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  trackingNumber: {
    type: String,
    default: '#54hD-17805yc5'
  }
})

const trackingStatus = ref([
  { label: 'Checking', completed: true, time: '12:35' },
  { label: 'In Transit', completed: true, time: '02:00' },
  { label: 'Out for Delivery', completed: false, time: '12:00 (Nov 15, 2025)' }
])
</script>
