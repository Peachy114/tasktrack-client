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
 
- User Signup and Login with Firebase Auth
- Role-based routing (Admin and Employee)
- Protected Routes
- Auth Context for global user state
 
## User Roles
 
| Role | Access |
|------|--------|
| Employee | `/dashboard` |
| Admin | `/admin` |
 
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
 