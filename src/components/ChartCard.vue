<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Shipment Over Time</h3>
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span class="px-3 py-1 bg-gray-100 rounded">📅 {{ selectedMonth }}</span>
        <button class="text-gray-400 hover:text-gray-600">▼</button>
      </div>
    </div>
    
    <!-- Simple Chart Visualization -->
    <div class="relative h-64">
      <svg class="w-full h-full" viewBox="0 0 700 250" preserveAspectRatio="none">
        <!-- Grid lines -->
        <line v-for="i in 5" :key="i" 
              :y1="i * 50" :y2="i * 50" 
              x1="0" x2="700" 
              stroke="#e5e7eb" stroke-width="1" />
        
        <!-- Chart line -->
        <polyline
          :points="chartPoints"
          fill="none"
          stroke="#3b82f6"
          stroke-width="2"
        />
        
        <!-- Fill area under curve -->
        <polygon
          :points="chartAreaPoints"
          fill="url(#gradient)"
          opacity="0.3"
        />
        
        <!-- Data points -->
        <circle
          v-for="(point, index) in dataPoints"
          :key="index"
          :cx="point.x"
          :cy="point.y"
          r="4"
          fill="#3b82f6"
          class="cursor-pointer hover:r-6 transition-all"
          @mouseenter="showTooltip(point, $event)"
          @mouseleave="hideTooltip"
        />
        
        <!-- Gradient definition -->
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
          </linearGradient>
        </defs>
      </svg>
      
      <!-- X-axis labels -->
      <div class="flex justify-between mt-2 text-xs text-gray-500">
        <span v-for="label in xAxisLabels" :key="label">{{ label }}</span>
      </div>
      
      <!-- Tooltip -->
      <div
        v-if="tooltip.show"
        class="absolute bg-gray-900 text-white px-3 py-2 rounded text-sm"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        <div class="font-semibold">{{ tooltip.date }}</div>
        <div>{{ tooltip.value }} shipments</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMonth = ref('Feb 2025')

// Sample data for the chart
const chartData = [
  { day: 1, value: 450 },
  { day: 4, value: 580 },
  { day: 7, value: 620 },
  { day: 10, value: 550 },
  { day: 13, value: 326 }, // Highlighted point in the image
  { day: 16, value: 420 },
  { day: 19, value: 500 },
  { day: 22, value: 380 },
  { day: 25, value: 250 },
  { day: 28, value: 600 }
]

const xAxisLabels = computed(() => [1, 4, 7, 10, 13, 16, 19, 22, 25, 28])

// Convert data to SVG points
const dataPoints = computed(() => {
  return chartData.map((item, index) => ({
    x: (index * 700) / (chartData.length - 1),
    y: 250 - (item.value / 700) * 250,
    value: item.value,
    day: item.day
  }))
})

const chartPoints = computed(() => {
  return dataPoints.value.map(p => `${p.x},${p.y}`).join(' ')
})

const chartAreaPoints = computed(() => {
  const points = dataPoints.value.map(p => `${p.x},${p.y}`).join(' ')
  const lastPoint = dataPoints.value[dataPoints.value.length - 1]
  return `${points} ${lastPoint.x},250 0,250`
})

// Tooltip
const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  date: '',
  value: 0
})

const showTooltip = (point, event) => {
  tooltip.value = {
    show: true,
    x: point.x,
    y: point.y - 40,
    date: `Sun, Oct ${point.day}`,
    value: point.value
  }
}

const hideTooltip = () => {
  tooltip.value.show = false
}
</script>
