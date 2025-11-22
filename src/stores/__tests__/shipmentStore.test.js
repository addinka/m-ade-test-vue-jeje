import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShipmentStore } from '@/stores/shipmentStore'

// Mock the apiService
vi.mock('@/services/apiService', () => ({
  apiService: {
    assignTransporter: vi.fn()
  }
}))

describe('Shipment Store - Transporter Assignment', () => {
  let shipmentStore
  let mockApiService

  beforeEach(() => {
    setActivePinia(createPinia())
    shipmentStore = useShipmentStore()

    // Reset store state
    shipmentStore.shipments = [
      {
        id: 1,
        orderNumber: 'ORD-001',
        status: 'Not Assigned',
        assignedTransporter: null
      },
      {
        id: 2,
        orderNumber: 'ORD-002',
        status: 'Assigned',
        assignedTransporter: 'Transporter A'
      }
    ]

    shipmentStore.transporters = [
      { id: 1, name: 'Transporter A', rating: 4.5 },
      { id: 2, name: 'Transporter B', rating: 4.8 }
    ]

    shipmentStore.loading = false
    shipmentStore.error = null

    // Get the mocked apiService
    mockApiService = vi.mocked(require('@/services/apiService').apiService)
  })

  describe('assignTransporter', () => {
    it('should successfully assign transporter to shipment', async () => {
      // Arrange
      const shipmentId = 1
      const transporterId = 2
      const expectedResponse = {
        data: {
          id: 1,
          orderNumber: 'ORD-001',
          status: 'Assigned',
          assignedTransporter: 'Transporter B'
        },
        message: 'Transporter assigned successfully'
      }

      mockApiService.assignTransporter.mockResolvedValue(expectedResponse)

      // Act
      const result = await shipmentStore.assignTransporter(shipmentId, transporterId)

      // Assert
      expect(mockApiService.assignTransporter).toHaveBeenCalledWith(shipmentId, transporterId)
      expect(result.success).toBe(true)
      expect(result.message).toBe('Transporter assigned successfully')

      // Check if shipment was updated in store
      const updatedShipment = shipmentStore.shipments.find(s => s.id === shipmentId)
      expect(updatedShipment.status).toBe('Assigned')
      expect(updatedShipment.assignedTransporter).toBe('Transporter B')
    })

    it('should handle assignment failure', async () => {
      // Arrange
      const shipmentId = 1
      const transporterId = 999 // Non-existent transporter
      const errorMessage = 'Invalid shipment or transporter'

      mockApiService.assignTransporter.mockRejectedValue(new Error(errorMessage))

      // Act
      const result = await shipmentStore.assignTransporter(shipmentId, transporterId)

      // Assert
      expect(mockApiService.assignTransporter).toHaveBeenCalledWith(shipmentId, transporterId)
      expect(result.success).toBe(false)
      expect(result.message).toBe(errorMessage)
      expect(shipmentStore.error).toBe(errorMessage)
    })

    it('should set loading state during assignment', async () => {
      // Arrange
      const shipmentId = 1
      const transporterId = 1

      mockApiService.assignTransporter.mockResolvedValue({
        data: { id: 1, status: 'Assigned', assignedTransporter: 'Transporter A' },
        message: 'Success'
      })

      // Act
      const promise = shipmentStore.assignTransporter(shipmentId, transporterId)

      // Assert loading state
      expect(shipmentStore.loading).toBe(true)

      await promise

      // Assert loading state cleared
      expect(shipmentStore.loading).toBe(false)
    })

    it('should validate shipment exists', async () => {
      // Arrange
      const nonExistentShipmentId = 999
      const transporterId = 1

      // Act & Assert
      await expect(shipmentStore.assignTransporter(nonExistentShipmentId, transporterId))
        .rejects.toThrow()
    })

    it('should validate transporter exists', async () => {
      // Arrange
      const shipmentId = 1
      const nonExistentTransporterId = 999

      // Act & Assert
      await expect(shipmentStore.assignTransporter(shipmentId, nonExistentTransporterId))
        .rejects.toThrow()
    })
  })

  describe('getShipmentById', () => {
    it('should return correct shipment by id', () => {
      // Act
      const shipment = shipmentStore.getShipmentById(1)

      // Assert
      expect(shipment).toBeDefined()
      expect(shipment.id).toBe(1)
      expect(shipment.orderNumber).toBe('ORD-001')
    })

    it('should return undefined for non-existent shipment', () => {
      // Act
      const shipment = shipmentStore.getShipmentById(999)

      // Assert
      expect(shipment).toBeUndefined()
    })
  })
})