import { ref, computed } from 'vue'
import { useShipmentStore } from '@/stores/shipmentStore'
import { useToast } from '@/composables/useToast'

export function useShipments() {
  const shipmentStore = useShipmentStore()
  const { success, error: showError, info } = useToast()

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  // Search state
  const searchQuery = ref('')
  const searchField = ref('all') // 'all', 'origin', 'destination', 'transporter'

  // Computed filtered and paginated shipments
  const filteredShipments = computed(() => {
    let shipments = [...shipmentStore.shipments]

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()

      shipments = shipments.filter(shipment => {
        switch (searchField.value) {
          case 'origin':
            return shipment.origin.toLowerCase().includes(query)
          case 'destination':
            return shipment.destination.toLowerCase().includes(query)
          case 'transporter':
            return (shipment.assignedTransporter || '').toLowerCase().includes(query)
          case 'all':
          default:
            return (
              shipment.origin.toLowerCase().includes(query) ||
              shipment.destination.toLowerCase().includes(query) ||
              (shipment.assignedTransporter || '').toLowerCase().includes(query) ||
              shipment.orderNumber.toLowerCase().includes(query) ||
              shipment.name.toLowerCase().includes(query)
            )
        }
      })
    }

    return shipments
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredShipments.value.length / itemsPerPage.value)
  })

  const paginatedShipments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredShipments.value.slice(start, end)
  })

  const totalFilteredShipments = computed(() => filteredShipments.value.length)

  // Actions
  const fetchShipments = async () => {
    try {
      await shipmentStore.fetchShipments()
      info('Shipments Loaded', `Loaded ${shipmentStore.shipments.length} shipments`, 2000)
    } catch (err) {
      showError('Error', 'Failed to load shipments', 3000)
    }
  }

  const assignTransporter = async (shipmentId, transporterId) => {
    const result = await shipmentStore.assignTransporter(shipmentId, transporterId)

    if (result.success) {
      success('Success', result.message, 3000)
    } else {
      showError('Error', result.message, 3000)
    }

    return result
  }

  const getShipmentById = (id) => {
    return shipmentStore.getShipmentById(id)
  }

  // Pagination methods
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const resetPagination = () => {
    currentPage.value = 1
  }

  // Search methods
  const setSearchQuery = (query) => {
    searchQuery.value = query
    resetPagination()
  }

  const setSearchField = (field) => {
    searchField.value = field
    resetPagination()
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchField.value = 'all'
    resetPagination()
  }

  return {
    // State
    currentPage,
    itemsPerPage,
    searchQuery,
    searchField,

    // Computed
    filteredShipments,
    paginatedShipments,
    totalPages,
    totalFilteredShipments,

    // Actions
    fetchShipments,
    assignTransporter,
    getShipmentById,

    // Pagination
    goToPage,
    nextPage,
    prevPage,
    resetPagination,

    // Search
    setSearchQuery,
    setSearchField,
    clearSearch
  }
}