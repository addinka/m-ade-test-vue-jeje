<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Hello {{ userStore.currentUser?.name || 'User' }},</h1>
        <p class="text-3xl font-bold text-gray-900 mt-1">Good Morning</p>
        <p class="text-sm text-gray-600 mt-1">Role: <span class="capitalize font-medium">{{ userStore.userRole }}</span></p>
        
        <!-- Notification Demo (Development Only) -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button @click="demoSuccess" class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200">Demo Success</button>
          <button @click="demoError" class="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full hover:bg-red-200">Demo Error</button>
          <button @click="demoWarning" class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full hover:bg-yellow-200">Demo Warning</button>
          <button @click="demoInfo" class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200">Demo Info</button>
          <button @click="demoSocial" class="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full hover:bg-purple-200">Demo Social</button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Timeframe</span>
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Nov 2025</option>
            <option>Oct 2025</option>
            <option>Sep 2025</option>
            <option>Aug 2025</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <!-- Search -->
          <div class="flex items-center space-x-2">
            <select
              v-model="searchField"
              @change="handleSearchFieldChange"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Fields</option>
              <option value="origin">Origin</option>
              <option value="destination">Destination</option>
              <option value="transporter">Transporter</option>
            </select>
            <input
              v-model="searchQuery"
              @input="handleSearchInput"
              type="text"
              placeholder="Search shipments..."
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="px-2 py-2 text-gray-400 hover:text-gray-600"
              title="Clear search"
            >
              ✕
            </button>
          </div>

          <button
            @click="handleExportCSV"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
          <button
            v-if="userStore.canAssignTransporters"
            @click="handleAddShipment"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <span>📦</span>
            <span>Add new shipment</span>
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total shipment"
          :value="statistics?.totalShipment?.toLocaleString() || '0'"
          :subValue="statistics?.totalShipmentItems ? `${statistics.totalShipmentItems} Items` : ''"
          trend="↗"
          icon="📦"
          iconClass="bg-purple-100"
        />
        <StatCard
          title="In transit"
          :value="statistics?.inTransit?.toLocaleString() || '0'"
          icon="🚚"
          iconClass="bg-green-100"
        />
        <StatCard
          title="Pending packages"
          :value="statistics?.pendingPackages?.toLocaleString() || '0'"
          icon="📦"
          iconClass="bg-orange-100"
        />
        <StatCard
          title="Delivered"
          :value="statistics?.delivered?.toLocaleString() || '0'"
          :subValue="statistics?.deliveredItems ? `${statistics.deliveredItems} Items` : ''"
          trend="❤️"
          icon="✅"
          iconClass="bg-blue-100"
        />
      </div>

      <!-- Chart and Live Tracking -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2">
          <ChartCard />
        </div>
        <div>
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Live Tracking</h3>
            <LiveTracking />
          </div>
        </div>
      </div>

      <!-- Incoming Orders Table -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Incoming Orders</h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Past 6 months</span>
              <button class="text-gray-400 hover:text-gray-600">▼</button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" class="rounded border-gray-300">
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processing Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ship Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pro. Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipping Method
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="shipment in paginatedShipments" :key="shipment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" class="rounded border-gray-300">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(shipment.processingStatus)" class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ shipment.processingStatus }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ shipment.shipStatus }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ shipment.proDate }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {{ shipment.orderNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ shipment.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm">
                      {{ shipment.shippingMethod === 'UPS' ? '📦' : shipment.shippingMethod === 'DHL' ? '✈️' : '🚚' }}
                    </span>
                    <span class="text-sm text-gray-900">{{ shipment.shippingMethod }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm">🇺🇸</span>
                    <span class="text-sm text-gray-900">{{ shipment.country }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ shipment.orderDate }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="viewDetails(shipment.id)"
                      class="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View Details"
                    >
                      ✏️
                    </button>
                    <div class="relative">
                      <button 
                        @click="toggleActionMenu(shipment.id)"
                        class="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="More Actions"
                      >
                        ⋮
                      </button>
                      
                      <!-- Dropdown Menu -->
                      <transition name="fade-scale">
                        <div 
                          v-if="activeActionMenu === shipment.id"
                          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                        >
                          <button
                            @click="handleAction('view', shipment)"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <span>👁️</span>
                            <span>View Details</span>
                          </button>
                          <button
                            @click="handleAction('track', shipment)"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <span>📍</span>
                            <span>Track Shipment</span>
                          </button>
                          <button
                            @click="handleAction('print', shipment)"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <span>🖨️</span>
                            <span>Print Label</span>
                          </button>
                          <button
                            @click="handleAction('duplicate', shipment)"
                            class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                            <span>📋</span>
                            <span>Duplicate Order</span>
                          </button>
                          <div class="border-t border-gray-200 my-1"></div>
                          <button
                            @click="handleAction('delete', shipment)"
                            class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <span>�️</span>
                            <span>Delete Order</span>
                          </button>
                        </div>
                      </transition>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-sm text-gray-600">Loading shipments...</p>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && paginatedShipments.length === 0" class="p-8 text-center text-gray-500">
          <div v-if="searchQuery">No shipments found matching "{{ searchQuery }}"</div>
          <div v-else>No shipments found</div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, totalFilteredShipments) }} of {{ totalFilteredShipments }} results
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span v-for="page in visiblePages" :key="page" class="px-3 py-1">
                <button
                  @click="goToPage(page)"
                  :class="page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'"
                  class="px-3 py-1 text-sm border border-gray-300 rounded-md"
                >
                  {{ page }}
                </button>
              </span>

              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>

<script setup>
import { onMounted, onUnmounted, ref, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useShipmentStore } from '@/stores/shipmentStore'
import { useUserStore } from '@/stores/userStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useShipments } from '@/composables/useShipments'
import { useToast } from '@/composables/useToast'
import Navbar from '@/components/Navbar.vue'
import StatCard from '@/components/StatCard.vue'
import ChartCard from '@/components/ChartCard.vue'
import LiveTracking from '@/components/LiveTracking.vue'

const router = useRouter()
const shipmentStore = useShipmentStore()
const userStore = useUserStore()
const { statistics, loading } = storeToRefs(shipmentStore)
const { success, info, warning, error: showError } = useToast()

// Use the shipments composable
const {
  paginatedShipments,
  currentPage,
  itemsPerPage,
  totalPages,
  totalFilteredShipments,
  searchQuery,
  searchField,
  goToPage,
  nextPage,
  prevPage,
  setSearchQuery,
  setSearchField,
  clearSearch
} = useShipments()

const activeActionMenu = ref(null)

// Pagination helpers
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// Search handlers
const handleSearchInput = () => {
  setSearchQuery(searchQuery.value)
}

const handleSearchFieldChange = () => {
  setSearchField(searchField.value)
}

onMounted(async () => {
  await shipmentStore.fetchShipments()
  await shipmentStore.fetchStatistics()
  await shipmentStore.fetchTransporters()

  // Start real-time updates
  shipmentStore.startRealtimeUpdates()

  // Listen for status updates
  shipmentStore.onStatusUpdate((update) => {
    info(
      'Shipment Status Updated',
      `Order ${update.orderNumber} status changed from "${update.oldStatus}" to "${update.newStatus}"`,
      6000
    )
  })

  // Close menu when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeActionMenu.value = null
  }
}

const toggleActionMenu = (id) => {
  activeActionMenu.value = activeActionMenu.value === id ? null : id
}

const handleAction = (action, shipment) => {
  activeActionMenu.value = null
  
  switch(action) {
    case 'view':
      viewDetails(shipment.id)
      break
    case 'track':
      info('Track Shipment', `Opening live tracking for ${shipment.trackingNumber}`, 3000)
      setTimeout(() => {
        viewDetails(shipment.id)
      }, 1000)
      break
    case 'print':
      info('Print Label', `Printing shipping label for order ${shipment.orderNumber}...`, 3000)
      setTimeout(() => {
        success('Print Ready', 'Label has been sent to printer', 3000)
      }, 1500)
      break
    case 'duplicate':
      info('Duplicate Order', `Creating copy of order ${shipment.orderNumber}...`, 3000)
      setTimeout(() => {
        success('Order Duplicated', 'New order has been created', 4000)
      }, 1500)
      break
    case 'delete':
      warning(
        'Delete Order', 
        `Are you sure you want to delete order ${shipment.orderNumber}? This action cannot be undone.`,
        5000
      )
      break
  }
}

const viewDetails = (id) => {
  router.push(`/shipment/${id}`)
}

const getStatusClass = (status) => {
  const statusClasses = {
    'Ready to process': 'bg-yellow-100 text-yellow-800',
    'In transit': 'bg-blue-100 text-blue-800',
    'Out for delivery': 'bg-green-100 text-green-800',
    'Delivered': 'bg-green-100 text-green-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const handleExportCSV = () => {
  info('Export CSV', 'Exporting shipment data to CSV...', 3000)
  setTimeout(() => {
    success('Export Complete', 'CSV file has been downloaded successfully', 4000)
  }, 2000)
}

const handleAddShipment = () => {
  info('Add Shipment', 'Opening add shipment form...', 3000)
}

// Demo functions for notification testing
const demoSuccess = () => {
  success('Success!', 'Operation completed successfully')
}

const demoError = () => {
  showError('Error!', 'Something went wrong. Please try again.')
}

const demoWarning = () => {
  warning('Warning!', 'This action cannot be undone.')
}

const demoInfo = () => {
  info('Information', 'Here is some useful information for you.')
}

const demoSocial = () => {
  const notificationStore = useNotificationStore()

  // Add some demo social notifications
  notificationStore.like(
    { name: 'John Doe', avatar: '👨' },
    'your post'
  )

  setTimeout(() => {
    notificationStore.comment(
      { name: 'Jane Smith', avatar: '👩' },
      'your photo'
    )
  }, 1000)

  setTimeout(() => {
    notificationStore.friendRequest(
      { name: 'Bob Wilson', avatar: '👨‍💼' }
    )
  }, 2000)

  setTimeout(() => {
    notificationStore.system(
      'System Update',
      'Your account has been successfully verified'
    )
  }, 3000)
}
</script>
