# Toast Notification System Documentation

## Overview

Sistem notifikasi toast yang telah diimplementasikan di aplikasi Shipment Tracker untuk memberikan feedback real-time kepada pengguna.

## Fitur Toast Notification

### 1. **Tipe Toast**
- ✅ **Success** - Hijau, untuk aksi yang berhasil
- ❌ **Error** - Merah, untuk error atau kegagalan
- ⚠️ **Warning** - Kuning, untuk peringatan
- ℹ️ **Info** - Biru, untuk informasi umum

### 2. **Penggunaan**

#### Import composable:
```javascript
import { useToast } from '@/composables/useToast'

const { success, error, warning, info } = useToast()
```

#### Contoh penggunaan:
```javascript
// Success notification
success('Success!', 'Transporter assigned successfully', 4000)

// Error notification
error('Error', 'Failed to assign transporter', 5000)

// Warning notification
warning('Warning', 'This feature is under development', 3000)

// Info notification
info('Information', 'Shipment status updated', 3000)
```

### 3. **Fitur Toast di Aplikasi**

#### A. Real-time Status Updates
Setiap 10 detik, ketika status shipment berubah, toast notification otomatis muncul:
```
"Shipment Status Updated"
"Order #ABCD-0780967 status changed from 'Checking' to 'In Transit'"
```

#### B. User Actions
- **Export CSV**: Toast konfirmasi dan sukses
- **Add Shipment**: Toast info saat membuka form
- **Assign Transporter**: Toast sukses/error saat assign
- **Quick Actions**: Toast feedback untuk setiap aksi

#### C. Navigation
- **Menu Items**: Toast info untuk fitur yang belum tersedia
- **User Menu**: Toast feedback untuk aksi profil/logout

#### D. Form Validation
- Toast warning untuk input yang tidak valid
- Toast error untuk submission yang gagal

### 4. **Konfigurasi**

#### Auto-dismiss Duration:
- Default: 5000ms (5 detik)
- Success: 4000ms
- Error: 5000ms
- Warning: 3000ms
- Info: 3000ms

#### Position:
- Fixed di pojok kanan atas
- Multiple toast stack secara vertikal

#### Animations:
- Slide-in dari kanan dengan fade
- Smooth exit animation

### 5. **Komponen**

#### Toast.vue
Single toast component dengan:
- Border berwarna sesuai tipe
- Icon emoji
- Title dan message
- Close button
- Auto-dismiss timer

#### ToastContainer.vue
Container untuk menampung multiple toast:
- Fixed positioning
- Z-index tinggi
- Space antar toast

#### useToast.js
Composable untuk manage toast state:
- Global state dengan ref
- Helper functions (success, error, warning, info)
- Auto-remove functionality

## Contoh Implementasi

### Dashboard.vue
```javascript
// Listen for real-time updates
shipmentStore.onStatusUpdate((update) => {
  info(
    'Shipment Status Updated',
    `Order ${update.orderNumber} status changed`,
    6000
  )
})

// Export CSV action
const handleExportCSV = () => {
  info('Export CSV', 'Exporting shipment data to CSV...', 3000)
  setTimeout(() => {
    success('Export Complete', 'CSV file downloaded', 4000)
  }, 2000)
}
```

### ShipmentDetail.vue
```javascript
// Assign transporter success
if (result.success) {
  success('Success!', result.message, 4000)
  // Update UI
}

// Validation error
if (!selectedTransporter.value) {
  warning('Validation Error', 'Please select a transporter', 3000)
  return
}

// Quick actions
const handleQuickAction = (action) => {
  if (action === 'copy') {
    success('Copied!', 'Tracking number copied', 3000)
  }
}
```

### Navbar.vue
```javascript
// Notification badge
const toggleNotifications = () => {
  info('Notifications', `You have ${unreadNotifications.value} unread`, 3000)
  unreadNotifications.value = 0
}

// Menu navigation
const handleNavClick = (item) => {
  if (item.path !== '/') {
    warning('Coming Soon', `${item.label} page is under development`)
  }
}
```

## Styling

### Tailwind Classes
- Border: `border-l-4` dengan warna dinamis
- Shadow: `shadow-lg`
- Rounded: `rounded-lg`
- Background: `bg-white`
- Positioning: `fixed top-4 right-4 z-50`

### Transitions
```css
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
```

## Best Practices

1. **Jangan spam toast** - Gunakan dengan bijak
2. **Duration tepat** - Error lebih lama dari info
3. **Message jelas** - Title singkat, message deskriptif
4. **Consistent** - Gunakan tipe yang sesuai dengan situasi
5. **User control** - Selalu sediakan tombol close

## Future Improvements

- [ ] Sound notifications (optional)
- [ ] Toast history/log
- [ ] Customizable position
- [ ] Progress bar untuk duration
- [ ] Action buttons dalam toast
- [ ] Persist toast saat page refresh
- [ ] Toast queue management
