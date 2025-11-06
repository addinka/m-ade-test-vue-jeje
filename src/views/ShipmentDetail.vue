<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <button 
        @click="goBack" 
        class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <span>←</span>
        <span>Back to Dashboard</span>
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading shipment details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-800">{{ error }}</p>
        <button @click="goBack" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Go Back
        </button>
      </div>

      <!-- Shipment Details -->
      <div v-else-if="shipment" class="space-y-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Shipment Details</h1>
          <p class="text-lg text-gray-600">Order #{{ shipment.id }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Info -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Shipment Information -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">📦 Shipment Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm text-gray-500">Tracking Number</label>
                  <p class="font-medium text-gray-900">{{ shipment.trackingNumber }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Status</label>
                  <p>
                    <span :class="getStatusClass(shipment.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                      {{ shipment.status }}
                    </span>
                  </p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Origin</label>
                  <p class="font-medium text-gray-900">{{ shipment.origin }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Destination</label>
                  <p class="font-medium text-gray-900">{{ shipment.destination }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Order Date</label>
                  <p class="font-medium text-gray-900">{{ shipment.orderDate }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Delivery Date</label>
                  <p class="font-medium text-gray-900">{{ shipment.deliveryDate }}</p>
                </div>
              </div>
            </div>

            <!-- Route Information -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">🗺️ Route Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="text-sm text-gray-500">Route</label>
                  <p class="font-medium text-gray-900 text-lg">{{ shipment.route }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm text-gray-500">Vehicle Type</label>
                    <p class="font-medium text-gray-900">{{ shipment.vehicleType }}</p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">Shipping Method</label>
                    <p class="font-medium text-gray-900">{{ shipment.shippingMethod }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Transporter -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">🚚 Current Transporter</h2>
              <div v-if="shipment.assignedTransporter" class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-green-900">{{ shipment.assignedTransporter }}</p>
                    <p class="text-sm text-green-700 mt-1">✓ Assigned</p>
                  </div>
                  <button 
                    @click="showAssignForm = true"
                    class="px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50"
                  >
                    Change Transporter
                  </button>
                </div>
              </div>
              <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p class="text-yellow-800 mb-3">⚠️ No transporter assigned yet</p>
                <button 
                  @click="showAssignForm = true"
                  class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Assign Transporter
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Assign Transporter Form -->
            <div v-if="showAssignForm" class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Assign Transporter</h3>
              
              <form @submit.prevent="handleAssignTransporter" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Select Transporter *
                  </label>
                  <select 
                    v-model="selectedTransporter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': formError && !selectedTransporter }"
                    required
                  >
                    <option value="">-- Choose a transporter --</option>
                    <option 
                      v-for="transporter in transporters" 
                      :key="transporter.id" 
                      :value="transporter.id"
                    >
                      {{ transporter.name }} (⭐ {{ transporter.rating }})
                    </option>
                  </select>
                  <p v-if="formError && !selectedTransporter" class="mt-1 text-sm text-red-600">
                    Please select a transporter
                  </p>
                </div>

                <!-- Transporter Details -->
                <div v-if="selectedTransporter" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p class="text-sm font-medium text-blue-900">
                    {{ selectedTransporterDetails?.name }}
                  </p>
                  <p class="text-xs text-blue-700 mt-1">
                    Rating: ⭐ {{ selectedTransporterDetails?.rating }}
                  </p>
                  <p class="text-xs text-blue-700 mt-1">
                    Vehicle Types: {{ selectedTransporterDetails?.vehicleTypes.join(', ') }}
                  </p>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p class="text-sm text-green-800">✓ {{ successMessage }}</p>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p class="text-sm text-red-800">✗ {{ errorMessage }}</p>
                </div>

                <div class="flex space-x-3">
                  <button 
                    type="submit"
                    :disabled="assignLoading"
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {{ assignLoading ? 'Assigning...' : 'Assign Now' }}
                  </button>
                  <button 
                    type="button"
                    @click="cancelAssign"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-2">
                <button 
                  @click="handleQuickAction('email')"
                  class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-left transition-colors"
                >
                  📧 Email Tracking Info
                </button>
                <button 
                  @click="handleQuickAction('print')"
                  class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-left transition-colors"
                >
                  📄 Print Label
                </button>
                <button 
                  @click="handleQuickAction('copy')"
                  class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-left transition-colors"
                >
                  📋 Copy Tracking Number
                </button>
                <button 
                  @click="handleQuickAction('cancel')"
                  class="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-left transition-colors"
                >
                  🗑️ Cancel Shipment
                </button>
              </div>
            </div>

            <!-- Timeline -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">📍 Tracking Timeline</h3>
              <LiveTracking :trackingNumber="shipment.trackingNumber" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useShipmentStore } from '@/stores/shipmentStore'
import { useToast } from '@/composables/useToast'
import Navbar from '@/components/Navbar.vue'
import LiveTracking from '@/components/LiveTracking.vue'

const route = useRoute()
const router = useRouter()
const shipmentStore = useShipmentStore()
const { transporters, loading } = storeToRefs(shipmentStore)
const { success, error: showError, warning, info } = useToast()

const shipment = ref(null)
const error = ref(null)
const showAssignForm = ref(false)
const selectedTransporter = ref('')
const assignLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const formError = ref(false)

const selectedTransporterDetails = computed(() => {
  if (!selectedTransporter.value) return null
  return transporters.value.find(t => t.id === parseInt(selectedTransporter.value))
})

onMounted(async () => {
  const shipmentId = route.params.id
  
  // Fetch data if not already loaded
  if (shipmentStore.shipments.length === 0) {
    await shipmentStore.fetchShipments()
  }
  if (transporters.value.length === 0) {
    await shipmentStore.fetchTransporters()
  }
  
  // Get shipment details
  shipment.value = shipmentStore.getShipmentById(shipmentId)
  
  if (!shipment.value) {
    error.value = 'Shipment not found'
    showError('Error', 'Shipment not found', 5000)
  } else {
    info('Shipment Loaded', `Viewing details for order ${shipment.value.orderNumber}`, 3000)
  }
  
  // Show assign form if no transporter assigned
  if (shipment.value && !shipment.value.assignedTransporter) {
    showAssignForm.value = true
  }
})

const handleAssignTransporter = async () => {
  formError.value = false
  successMessage.value = ''
  errorMessage.value = ''
  
  // Validation
  if (!selectedTransporter.value) {
    formError.value = true
    errorMessage.value = 'Please select a transporter'
    warning('Validation Error', 'Please select a transporter', 3000)
    return
  }
  
  assignLoading.value = true
  info('Processing', 'Assigning transporter...', 2000)
  
  const result = await shipmentStore.assignTransporter(
    shipment.value.id, 
    parseInt(selectedTransporter.value)
  )
  
  assignLoading.value = false
  
  if (result.success) {
    successMessage.value = result.message
    success('Success!', result.message, 4000)
    
    // Update local shipment data
    shipment.value = shipmentStore.getShipmentById(shipment.value.id)
    
    // Hide form after 2 seconds
    setTimeout(() => {
      showAssignForm.value = false
      successMessage.value = ''
    }, 2000)
  } else {
    errorMessage.value = result.message
    showError('Error', result.message, 5000)
  }
}

const cancelAssign = () => {
  showAssignForm.value = false
  selectedTransporter.value = ''
  formError.value = false
  successMessage.value = ''
  errorMessage.value = ''
  info('Cancelled', 'Transporter assignment cancelled', 2000)
}

const goBack = () => {
  router.push('/')
}

const getStatusClass = (status) => {
  const statusClasses = {
    'Assigned': 'bg-green-100 text-green-800',
    'Not Assigned': 'bg-yellow-100 text-yellow-800',
    'Ready to process': 'bg-yellow-100 text-yellow-800',
    'In transit': 'bg-blue-100 text-blue-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const handleQuickAction = (action) => {
  const messages = {
    email: 'Email with tracking information has been sent',
    print: 'Printing label...',
    copy: 'Tracking number copied to clipboard',
    cancel: 'Shipment cancellation initiated'
  }
  
  if (action === 'cancel') {
    warning('Cancel Shipment', messages[action], 4000)
  } else if (action === 'copy') {
    success('Copied!', messages[action], 3000)
  } else {
    info('Action', messages[action], 3000)
  }
}
</script>
