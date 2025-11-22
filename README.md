# 🚚 Shipment Tracker

Simple shipment tracking dashboard built for the frontend engineer test case using Vue 3.

## What's This?

This is my implementation of the transport shipment tracker test case. I built a dashboard where you can view shipments, see their details, and assign transporters to them. Added some extra features like toast notifications and real-time updates to make it feel more complete.

## Tech Stack

- Vue 3 (Composition API)
- Pinia for state management
- Vue Router for navigation
- TailwindCSS for styling
- Vite as build tool

## Advanced Features (Test Case Continuation)

### ✅ Role-Based Access Control (RBAC)
- **Admin Role**: Can assign transporters, add shipments, full access
- **Viewer Role**: Read-only access, cannot modify data
- **Role Switching**: Switch between Admin/Viewer in navbar dropdown
- **Persistent Roles**: Roles saved in localStorage

### ✅ Pagination & Search
- **Client-side Pagination**: Navigate through shipment pages
- **Advanced Search**: Search by origin, destination, or transporter name
- **Real-time Filtering**: Instant results as you type
- **Search Field Selection**: Choose which field to search in

### ✅ Global Notification System
- **Auto-dismiss Notifications**: Toast notifications that disappear automatically
- **Bottom Positioning**: Moved to bottom-right to avoid blocking UI
- **Multiple Types**: Success, error, warning, and info notifications
- **Smooth Animations**: Slide in/out animations

### ✅ Component Reusability & Architecture
- **Reusable UI Components**:
  - `Table.vue` - Generic table component with slots
  - `Input.vue` - Reusable input with validation
  - `SelectDropdown.vue` - Styled select dropdown
- **Composables Architecture**:
  - `useShipments.js` - Centralized shipment logic
  - `useToast.js` - Enhanced with notification system
- **Separation of Concerns**: API logic moved to composables

### ✅ Unit Testing
- **Vitest Setup**: Modern testing framework configured
- **Transporter Assignment Tests**: Comprehensive test coverage
- **Store Logic Testing**: Pinia store functionality tested
- **Mock Integration**: API mocking for isolated testing

## Tech Stack Enhancements

**Testing & Quality:**
- Vitest - Modern testing framework
- Vue Test Utils - Component testing utilities
- jsdom - DOM simulation for tests

**Architecture Improvements:**
- Composables pattern for reusable logic
- Component library for UI consistency
- Enhanced state management with RBAC

**User Experience:**
- Advanced search and filtering
- Role-based UI adaptation
- Global notification system
- Responsive pagination controls
- Statistics dashboard

## Features

**Base Requirements (Original Test Case):**
- ✅ List page showing all shipments
- ✅ Detail page for each shipment
- ✅ Assign transporter functionality with validation
- ✅ State management using Pinia
- ✅ Routing with Vue Router
- ✅ Mock API with dummy data

**Advanced Features (Continuation Test Case):**
- ✅ **RBAC System**: Admin/Viewer roles with conditional UI
- ✅ **Pagination**: Client-side pagination with navigation
- ✅ **Search & Filter**: Multi-field search functionality
- ✅ **Global Notifications**: Auto-dismiss toast notifications
- ✅ **Component Reusability**: Generic UI components (Table, Input, Select)
- ✅ **Architecture Refactor**: API logic moved to composables
- ✅ **Unit Testing**: Vitest setup with comprehensive test coverage

**Extra Features Added:**
- Real-time status updates (simulated every 10 seconds)
- Toast notification system (both legacy and new)
- Action menu with multiple options (view, track, print, duplicate, delete)
- Responsive design for mobile and desktop
- Live tracking widget with timeline
- Statistics dashboard with visual cards
- Role switching in navbar
- Persistent authentication state

**Bonus features from test case:**
- Real-time update simulation ✅
- Responsive design ✅
- Form validation ✅

## Quick Start

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests in watch mode
npm run test:run # Run tests once
```

### Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm run test:run
```

**Test Coverage:**
- ✅ Transporter assignment logic validation
- ✅ Store state management
- ✅ Error handling scenarios
- ✅ Loading state management

## Project Structure (Updated)

Here's how I organized the files:

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Table.vue         # Generic table component
│   │   ├── Input.vue         # Reusable input component
│   │   └── SelectDropdown.vue # Styled select dropdown
│   ├── Navbar.vue            # Top navigation with RBAC
│   ├── StatCard.vue          # Stats display cards
│   ├── ChartCard.vue         # Chart component
│   ├── LiveTracking.vue      # Tracking widget
│   ├── Toast.vue             # Toast notification
│   ├── ToastContainer.vue    # Toast container
│   └── NotificationContainer.vue # Global notifications
│
├── views/
│   ├── Dashboard.vue         # Homepage with pagination & search
│   └── ShipmentDetail.vue    # Detail page with RBAC
│
├── stores/
│   ├── shipmentStore.js      # Pinia store for shipments
│   ├── userStore.js          # RBAC user management
│   ├── notificationStore.js  # Global notifications
│   └── __tests__/            # Unit tests
│       └── shipmentStore.test.js
│
├── composables/
│   ├── useShipments.js       # Shipment logic & pagination
│   └── useToast.js           # Enhanced toast system
│
├── services/
│   └── apiService.js         # Mock API calls
│
├── data/
│   └── mockData.js           # Dummy shipment data
│
├── router/
│   └── index.js              # Route config
│
└── style.css                 # Global styles
```

Pretty standard Vue 3 structure. I separated components from pages and created a service layer for API calls (even though it's just mock data for now).

## � Steps to Run Locally

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation & Setup

Follow these steps to run the application on your local machine:

#### 1. Navigate to Project Directory

```bash
cd c:\Users\muham\OneDrive\Documents\GitHub\jeje-test
```

Or if you're cloning from repository:
```bash
git clone <repository-url>
cd jeje-test
```

#### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- Vue 3 (Frontend framework)
- Vite (Build tool)
- Pinia (State management)
- Vue Router (Routing)
- TailwindCSS (Styling)
- Axios (HTTP client)

**Expected time**: 30-60 seconds depending on internet speed

#### 3. Start Development Server

Run the development server with hot reload:

```bash
npm run dev
```

**Output you should see:**
```
VITE v5.4.21  ready in 323 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 4. Open in Browser

Open your browser and navigate to:
```
http://localhost:5173/
```

**Note**: If port 5173 is already in use, Vite will automatically use the next available port (5174, 5175, etc.)

#### 5. Explore the Application

- **Dashboard**: View all shipments with statistics
- **Click on any shipment**: View details and assign transporter
- **Real-time updates**: Status changes every 10 seconds with toast notifications
- **Action menu**: Click ⋮ button for more options

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (output to `/dist`) |
| `npm run preview` | Preview production build locally |

### Production Build

To create a production-ready build:

```bash
npm run build
```

This will generate optimized files in the `/dist` folder.

To preview the production build:

```bash
npm run preview
```

### Troubleshooting

#### Port Already in Use
If you see "Port 5173 is in use":
- Vite will automatically try the next available port
- Or manually kill the process using that port
- Or specify a different port in `vite.config.js`

#### Dependencies Installation Failed
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

#### Build Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Development Tips

1. **Hot Module Replacement (HMR)** is enabled - changes will reflect immediately
2. **Vue DevTools** extension recommended for debugging
3. **Check browser console** for any errors or warnings
4. **Port forwarding** available with `npm run dev -- --host` for network access

## How It Works

**Dashboard** (`/`)
Shows all shipments in a table with stats cards, chart, and live tracking widget. Click any shipment to see details. The action menu (⋮) gives quick access to print, duplicate, or delete.

**Detail Page** (`/shipment/:id`)
Shows full shipment info. You can assign/change the transporter here using the dropdown form. Has validation so you can't submit without selecting something.

**State Management**
Using Pinia to manage shipments, transporters, and stats. All components share the same state.

**Toast Notifications**
Built a custom toast system for showing feedback. Pops up for status changes, form validation, and user actions.

**Mock API**
Created `apiService.js` to simulate API calls with setTimeout. Data comes from `mockData.js`.

**Routes:**
- `/` - Dashboard
- `/shipment/:id` - Detail page

## Mock Data

Check `src/data/mockData.js` for the sample data. I created:
- 4 sample shipments with realistic data
- 5 transporters with ratings
- Dashboard statistics

The `apiService.js` simulates API delays (200-500ms) to make it feel more realistic.

## Assumptions & Notes

Some things I had to assume or simplify for this test case:

**No Real Backend**
- Using mock data in `mockData.js`
- API calls are simulated with setTimeout delays
- Changes don't persist (no database)

**Authentication**
- No login/logout system
- Assuming user is already logged in as "Admin"
- No role-based permissions

**Real-time Updates**
- Using `setInterval` to simulate updates (every 10 seconds)
- In production, would use WebSocket or Server-Sent Events
- Status changes are random for demo purposes

**Data & Validation**
- All transporters are available for all shipments
- No capacity checks or availability
- Date validation is minimal
- Tracking numbers are just random strings

**UI Decisions**
- Used emoji icons instead of icon library (faster to implement)
- Dashboard stats are static mock data
- Chart data is hardcoded
- No pagination (only 4 shipments for demo)

**What's Missing**
- No unit tests (would add Vitest in real project)
- No E2E tests
- Limited error handling
- Basic accessibility
- Only tested on Chrome/Firefox

**Why I Made These Choices**

Used **Pinia** instead of Vuex because it's simpler and more modern. 

Went with **TailwindCSS** because I can style quickly without writing custom CSS.

**Vue 3 Composition API** makes the code cleaner and easier to reuse logic.

Used **emoji icons** to save time - in a real project I'd use a proper icon library.

**Color coding:**
- Yellow = pending/not assigned
- Blue = in transit
- Green = success/assigned
- Red = errors/delete actions

## What I'd Add in Production

If this was going to production, I'd need to:

1. Connect to real API endpoints
2. Add proper authentication (JWT probably)
3. Implement real WebSocket for live updates
4. Add unit tests and E2E tests
5. Pagination for large datasets
6. Better error handling
7. Loading states everywhere
8. Accessibility improvements
9. Input sanitization for security
10. Performance optimizations (virtual scrolling, code splitting)

## Screenshots

**Dashboard:**
- Stats cards showing shipment counts
- Line chart with trends
- Live tracking widget
- Full shipment table with action menu

**Detail Page:**
- Shipment info and route
- Assign transporter form
- Quick actions (email, print, copy, delete)
- Tracking timeline

**Toast Notifications:**
Shows up for:
- Status updates
- Form validation errors
- Success/error messages
- User action feedback

**Action Menu (⋮):**
- View Details
- Track Shipment
- Print Label
- Duplicate Order
- Delete Order (with warning)

---

