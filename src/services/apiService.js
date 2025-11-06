import { shipments, transporters, statistics } from '@/data/mockData'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const apiService = {
  // Get all shipments
  async getShipments() {
    await delay(300)
    return { data: shipments }
  },

  // Get shipment by ID
  async getShipmentById(id) {
    await delay(300)
    const shipment = shipments.find(s => s.id === id)
    if (!shipment) {
      throw new Error('Shipment not found')
    }
    return { data: shipment }
  },

  // Get all transporters
  async getTransporters() {
    await delay(200)
    return { data: transporters }
  },

  // Assign transporter to shipment
  async assignTransporter(shipmentId, transporterId) {
    await delay(500)
    const shipment = shipments.find(s => s.id === shipmentId)
    const transporter = transporters.find(t => t.id === transporterId)
    
    if (!shipment || !transporter) {
      throw new Error('Invalid shipment or transporter')
    }

    shipment.assignedTransporter = transporter.name
    shipment.status = 'Assigned'
    
    return { 
      data: shipment,
      message: 'Transporter assigned successfully'
    }
  },

  // Get statistics
  async getStatistics() {
    await delay(200)
    return { data: statistics }
  }
}
