<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center space-x-3">
          <div :class="iconClass" class="p-3 rounded-lg">
            <span class="text-2xl">{{ icon }}</span>
          </div>
          <div>
            <p class="text-sm text-gray-500">{{ title }}</p>
            <div class="flex items-baseline space-x-2 mt-1">
              <h3 class="text-2xl font-bold text-gray-900">{{ value }}</h3>
              <span v-if="subValue" class="text-sm text-gray-600">
                {{ trend }} {{ subValue }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  subValue: String,
  trend: String,
  icon: String,
  iconClass: {
    type: String,
    default: 'bg-blue-100'
  }
})
</script>
