# TaskTrack Client

A React-based frontend for the TaskTrack project management application.

## Tech Stack

- React (Create React App)
- Firebase Authentication
- Firebase Firestore
- React Router DOM
- React Context API

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
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

App will run on `http://localhost:3000`

## Features

### Completed ✅
- User Signup and Login with Firebase Auth
- Role-based routing (Admin and Employee)
- Protected Routes — unauthenticated users redirected to /login
- Auth Context — provides uid, email, role to entire app
- Custom Hook — useStatus() for reusable loading/error/success states
- Admin Dashboard — Create tasks, view all users and tasks, assign tasks to employees
- Employee Dashboard — View only assigned tasks, update task status
- Admin Layout — navbar with links to Dashboard, Tasks, Users
- Employee Layout — navbar with link to My Tasks

### In Design 🎨
- Admin Tasks page — View all tasks with navigation to detail view
- Admin Task Detail page — View single task details, assign to user
- Admin Users page — View all users and their roles
- Employee Task Detail page — View single task details, update status

## Dynamic Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | Redirects to /login | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/admin` | AdminDashboard | Admin only |
| `/admin/tasks` | AdminTasks | Admin only |
| `/admin/tasks/:taskId` | AdminTaskDetail | Admin only |
| `/admin/users` | AdminUsers | Admin only |
| `/dashboard` | EmployeeDashboard | Employee only |
| `/dashboard/tasks/:taskId` | EmployeeTaskDetail | Employee only |

## User Roles

| Role | Default Route | Access |
|------|--------------|--------|
| Admin | `/admin` | All admin routes |
| Employee | `/dashboard` | All employee routes |

## Custom Hook — useStatus

Reusable hook for handling loading, error and success states across all components.

```javascript
const { loading, error, success, start, done, fail, succeed } = useStatus();
```

| Method | Description |
|--------|-------------|
| `start()` | Sets loading to true, clears error and success |
| `done()` | Sets loading to false |
| `fail(message)` | Sets error message |
| `succeed()` | Sets success to true |

## Auth Context

Provides a single combined user object to the entire app.

```javascript
const { currentUser } = useAuth();
// currentUser = { uid, email, role }
```

## Available Scripts

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## Environment Variables

Never commit your `.env` file! It is already added to `.gitignore`.

## Connected Backend

Make sure the TaskTrack Server is running on `http://localhost:5000`

## Notes

- Admin role must be set manually in Firestore console
- Change `role` field from `employee` to `admin` in the users collections
