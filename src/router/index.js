import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import ShipmentDetail from '@/views/ShipmentDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/shipment/:id',
    name: 'ShipmentDetail',
    component: ShipmentDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
