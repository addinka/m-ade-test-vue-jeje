export const shipments = [
  {
    id: 'ABCD-0780967',
    origin: 'Francis Lakasiou',
    destination: 'USA',
    status: 'Ready to process',
    shipStatus: 'In Progress',
    country: 'USA',
    orderDate: '08/02/2025',
    deliveryDate: '15/02/2025',
    shippingMethod: 'UPS',
    trackingNumber: '#54hD-17805yc5',
    route: 'Jakarta → Surabaya → Bali',
    vehicleType: 'Truck',
    assignedTransporter: null,
    processingStatus: 'Ready to process',
    proDate: '08/02/2025',
    orderNumber: '#ABCD-0780967',
    name: 'Francis Lakasiou'
  },
  {
    id: 'EFGH-1234567',
    origin: 'John Doe',
    destination: 'Singapore',
    status: 'Assigned',
    shipStatus: 'Checking',
    country: 'Singapore',
    orderDate: '10/03/2025',
    deliveryDate: '18/03/2025',
    shippingMethod: 'DHL',
    trackingNumber: '#12hD-98765yc4',
    route: 'Jakarta → Singapore',
    vehicleType: 'Air Freight',
    assignedTransporter: 'PT Trans Indo',
    processingStatus: 'In transit',
    proDate: '10/03/2025',
    orderNumber: '#EFGH-1234567',
    name: 'John Doe'
  },
  {
    id: 'IJKL-9876543',
    origin: 'Jane Smith',
    destination: 'Malaysia',
    status: 'Not Assigned',
    shipStatus: 'In Transit',
    country: 'Malaysia',
    orderDate: '20/04/2025',
    deliveryDate: '28/04/2025',
    shippingMethod: 'FedEx',
    trackingNumber: '#78hD-45678yc9',
    route: 'Jakarta → Kuala Lumpur',
    vehicleType: 'Truck',
    assignedTransporter: null,
    processingStatus: 'Ready to process',
    proDate: '20/04/2025',
    orderNumber: '#IJKL-9876543',
    name: 'Jane Smith'
  },
  {
    id: 'MNOP-5555555',
    origin: 'Bob Wilson',
    destination: 'Thailand',
    status: 'Assigned',
    shipStatus: 'Out for Delivery',
    country: 'Thailand',
    orderDate: '05/05/2025',
    deliveryDate: '12/05/2025',
    shippingMethod: 'UPS',
    trackingNumber: '#99hD-11111yc7',
    route: 'Jakarta → Bangkok',
    vehicleType: 'Air Freight',
    assignedTransporter: 'Express Logistics',
    processingStatus: 'Out for delivery',
    proDate: '05/05/2025',
    orderNumber: '#MNOP-5555555',
    name: 'Bob Wilson'
  }
]

export const transporters = [
  { id: 1, name: 'PT Trans Indo', rating: 4.5, vehicleTypes: ['Truck', 'Container'] },
  { id: 2, name: 'Express Logistics', rating: 4.8, vehicleTypes: ['Air Freight', 'Truck'] },
  { id: 3, name: 'Speed Cargo', rating: 4.2, vehicleTypes: ['Van', 'Truck'] },
  { id: 4, name: 'Global Transport', rating: 4.6, vehicleTypes: ['Container', 'Air Freight'] },
  { id: 5, name: 'Fast Delivery', rating: 4.3, vehicleTypes: ['Truck', 'Van'] }
]

export const statistics = {
  totalShipment: 19329,
  totalShipmentItems: 738,
  inTransit: 12000,
  pendingPackages: 345,
  delivered: 7000,
  deliveredItems: 45
}
