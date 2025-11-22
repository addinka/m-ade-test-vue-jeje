import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/apiService'

// Event bus for real-time updates
const updateCallbacks = []

export const useShipmentStore = defineStore('shipment', () => {
  // State
  const shipments = ref([])
  const transporters = ref([])
  const statistics = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Search & Pagination State
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  // Getters
  const totalShipments = computed(() => shipments.value.length)
  const assignedShipments = computed(() =>
    shipments.value.filter(s => s.status === 'Assigned').length
  )
  const notAssignedShipments = computed(() =>
    shipments.value.filter(s => s.status !== 'Assigned').length
  )

  // Filtered shipments based on search
  const filteredShipments = computed(() => {
    if (!searchQuery.value) return shipments.value

    const query = searchQuery.value.toLowerCase()
    return shipments.value.filter(shipment =>
      shipment.origin?.toLowerCase().includes(query) ||
      shipment.destination?.toLowerCase().includes(query) ||
      shipment.assignedTransporter?.toLowerCase().includes(query) ||
      shipment.name?.toLowerCase().includes(query)
    )
  })

  // Paginated shipments
  const paginatedShipments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredShipments.value.slice(start, end)
  })

  // Pagination info
  const totalPages = computed(() => Math.ceil(filteredShipments.value.length / itemsPerPage.value))
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  // Actions
  async function fetchShipments() {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.getShipments()
      shipments.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching shipments:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchTransporters() {
    try {
      const response = await apiService.getTransporters()
      transporters.value = response.data
    } catch (err) {
      console.error('Error fetching transporters:', err)
    }
  }

  async function fetchStatistics() {
    try {
      const response = await apiService.getStatistics()
      statistics.value = response.data
    } catch (err) {
      console.error('Error fetching statistics:', err)
    }
  }

  function getShipmentById(id) {
    return shipments.value.find(s => s.id === id)
  }

  async function assignTransporter(shipmentId, transporterId) {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.assignTransporter(shipmentId, transporterId)
      
      // Update local state
      const index = shipments.value.findIndex(s => s.id === shipmentId)
      if (index !== -1) {
        shipments.value[index] = response.data
      }
      
      return { success: true, message: response.message }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  // Real-time update simulation
  function startRealtimeUpdates() {
    setInterval(() => {
      // Simulate random status updates
      if (shipments.value.length > 0) {
        const randomIndex = Math.floor(Math.random() * shipments.value.length)
        const statuses = ['Checking', 'In Transit', 'Out for Delivery']
        const oldStatus = shipments.value[randomIndex].shipStatus
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        
        if (oldStatus !== randomStatus) {
          shipments.value[randomIndex].shipStatus = randomStatus
          
          // Notify all callbacks
          const updateInfo = {
            shipmentId: shipments.value[randomIndex].id,
            orderNumber: shipments.value[randomIndex].orderNumber,
            oldStatus,
            newStatus: randomStatus
          }
          
          updateCallbacks.forEach(callback => callback(updateInfo))
        }
      }
    }, 10000) // Update every 10 seconds
  }
  
  function onStatusUpdate(callback) {
    updateCallbacks.push(callback)
  }

  // Search & Pagination Actions
  function setSearchQuery(query) {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page when searching
  }

  function setCurrentPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  function resetPagination() {
    currentPage.value = 1
    searchQuery.value = ''
  }

  return {
    // State
    shipments,
    transporters,
    statistics,
    loading,
    error,
    searchQuery,
    currentPage,
    itemsPerPage,

    // Getters
    totalShipments,
    assignedShipments,
    notAssignedShipments,
    filteredShipments,
    paginatedShipments,
    totalPages,
    hasNextPage,
    hasPrevPage,

    // Actions
    fetchShipments,
    fetchTransporters,
    fetchStatistics,
    getShipmentById,
    assignTransporter,
    startRealtimeUpdates,
    onStatusUpdate,
    setSearchQuery,
    setCurrentPage,
    nextPage,
    prevPage,
    resetPagination
  }
})
