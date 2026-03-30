# TaskTrack Client

A React-based frontend for the TaskTrack project management application.

## Tech Stack

- React (Vite)
- Firebase Authentication
- Firebase Firestore (real-time listeners)
- React Router DOM
- React Context API
- Tailwind CSS
- Chart.js + react-chartjs-2
- Sonner (toast notifications)

## Getting Started

### Prerequisites

- Node.js v16+
- npm
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/tasktrack-client.git
cd tasktrack-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

App will run on `http://localhost:5173`

## Features

### Authentication ✅
- User Signup and Login with Firebase Auth
- Friendly error messages for invalid credentials, weak passwords, and duplicate emails
- Role-based routing (Admin and Employee)
- Protected Routes — unauthenticated users redirected to `/login`
- Auth Context — provides `uid`, `email`, `role` to entire app

### Admin Dashboard 
- Dynamic greeting with live clock (Good Morning / Afternoon / Evening)
- Real-time Activity feed powered by Firestore `onSnapshot`
  - Filters by All, Created, Status
  - Shows Today's activities by default — click "See More" to load older ones
  - Limited to last 20 activities (10 task_created + 10 status_changed) to optimize performance
- Stat cards showing Total Tasks, In Progress, Completed — counts calculated on backend
- Tasks per Month bar chart (stacked) — data aggregated on backend, auto-updates every 10s
- Completion Trend line chart — data aggregated on backend, auto-updates every 10s
- Task Progress Ring — visualizes completion percentage
- Team Panel — real-time list of all team members

### Admin Tasks 
- Kanban board with Backlog, In Progress, Done columns
- Search tasks by name or description
- Filter tasks by assigned user
- Sort tasks by title or assignment status
- Create tasks with title and description validation
- Assign tasks to employees via searchable avatar dropdown
- Mobile responsive with tab-based column switching

### Employee Dashboard 
- Kanban board showing only assigned tasks
- Drag and drop tasks between columns to update status
- Real-time updates — status changes reflect on admin dashboard instantly
- Stat cards showing personal task breakdown
- Progress bar showing completion percentage
- Search tasks by name or description

### UI/UX 
- Dark mode / Light mode toggle (persisted in localStorage)
- Hide-on-scroll-down navbar — reappears on scroll up
- Invisible scrollbars across all pages
- Skeleton loaders while data is loading
- Toast notifications for all actions (create, assign, update, errors)

## Architecture

### Data Fetching Strategy

| Data | Method | Why |
|------|--------|-----|
| Activity feed | Firestore `onSnapshot` | Needs instant real-time updates |
| Stat cards | Polling every 10s (backend aggregated) | Counts calculated on server |
| Charts | Polling every 10s (backend aggregated) | Monthly grouping calculated on server |
| Team panel | Firestore `onSnapshot` | Needs instant real-time updates |
| Employee tasks | Firestore `onSnapshot` | Needs instant real-time updates |

### Custom Hooks

#### `useFirestoreTasks()`
Real-time listener for the tasks collection using Firestore `onSnapshot`.

#### `useFirestoreUsers()`
Real-time listener for the users collection using Firestore `onSnapshot`.

#### `useMyLiveTasks(uid)`
Real-time listener that returns only tasks assigned to the current employee.

#### `usePolledData(fetcher, interval)`
Polls a given API function at a set interval. Used for charts and stat cards.

```javascript
const polledStats = usePolledData(taskService.getTaskStats, POLL_INTERVAL)
```

#### `useStatus()`
Reusable hook for handling loading, error and success states.

```javascript
const { loading, error, success, start, done, fail, succeed } = useStatus()
```

### Services

| File | Description |
|------|-------------|
| `taskService.js` | All task-related API calls (create, assign, update status, get stats, get monthly) |
| `userService.js` | All user-related API calls (register, getMe, getAll) |
| `activityService.js` | Firestore real-time subscription for activity feed |

### Helper Functions (`utils/helper.js`)

| Function | Description |
|----------|-------------|
| `avatarCls(email)` | Returns consistent avatar color class based on email hash |
| `formatTime(date)` | Formats date to 12-hour time string |
| `formatDate(date)` | Returns Today, Yesterday, or formatted date |
| `isToday(date)` | Returns true if date is today |
| `groupByDate(activities)` | Groups activity array by date with dividers |
| `filterMatch(activity, filter)` | Filters activities by type |
| `getLabel(activity)` | Returns action and target label for activity row |

## Dynamic Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | Redirects to `/login` | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/admin` | AdminDashboard | Admin only |
| `/admin/tasks` | AdminTasks | Admin only |
| `/dashboard` | EmployeeDashboard | Employee only |

## User Roles

| Role | Default Route | Access |
|------|--------------|--------|
| Admin | `/admin` | All admin routes |
| Employee | `/dashboard` | All employee routes |

## Auth Context

Provides a single combined user object to the entire app.

```javascript
const { currentUser } = useAuth()
// currentUser = { uid, email, role }
```

## Security

- All API calls include a Firebase Bearer token in the `Authorization` header
- `AdminRoute` and `ProtectedRoute` guard frontend pages
- Backend `adminMiddleware` and `authMiddleware` protect all endpoints
- Even if a user bypasses the frontend, they cannot access admin data without the correct role in Firestore

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment Variables

Never commit your `.env` file! It is already added to `.gitignore`.

## Connected Backend

Make sure the TaskTrack Server is running on `http://localhost:5000`

## Notes

- Admin role must be set manually in Firestore console
- Change `role` field from `employee` to `admin` in the users collection
- Firestore indexes are required for the Activity feed split queries — create them via the Firebase console link in the browser error if prompted