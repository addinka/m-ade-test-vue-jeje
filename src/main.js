import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import { useUserStore } from './stores/userStore'
import { useNotificationStore } from './stores/notificationStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize authentication on app start
const userStore = useUserStore()
userStore.initializeAuth()

// Add some demo notifications
const notificationStore = useNotificationStore()
setTimeout(() => {
  notificationStore.success('Welcome!', 'Welcome to the Shipment Tracker dashboard')
}, 1000)

setTimeout(() => {
  notificationStore.like(
    { name: 'Sarah Johnson', avatar: '👩‍💼' },
    'your recent shipment update'
  )
}, 3000)

setTimeout(() => {
  notificationStore.system(
    'New Feature',
    'Try the new notification system by clicking the bell icon!'
  )
}, 5000)

app.mount('#app')
