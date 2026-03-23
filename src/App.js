import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/auth/Signup';
import Login from './components/auth/Login';

import ProtectedRoute from './components/pages/ProtectedRoutes';
import AdminRoute from './components/pages/AdminRoutes';

import './App.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import AdminLayout from './Layouts/AdminLayout';
import EmployeeLayout from './Layouts/EmployeeLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route path='/admin' element={
          <AdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminRoute>
        }
        />

        {/* Employee Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          </ProtectedRoute>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

