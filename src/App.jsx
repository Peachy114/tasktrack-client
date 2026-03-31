import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { Toaster } from './components/ui/sonner';

import ProtectedRoute from './routes/ProtectedRoutes';
import AdminRoute from './routes/AdminRoutes';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeLayout from './layouts/EmployeeLayout';
import AdminTasks from './pages/admin/AdminTasks';

import LandingPage from './pages/landingPage';
import NotFound from './components/shared/NotFound';



function App() {
  return (
    <>
     <Toaster position='top-right' richColors /> 
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
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
          <Route path='/admin/tasks' element={
            <AdminRoute>
              <AdminLayout>
                <AdminTasks />
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
    </>
  );
}

export default App;

