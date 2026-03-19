import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/pages/ProtectedRoutes';
import AdminRoute from './components/pages/AdminRoutes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* For the login and logout. */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes and AdminROutes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <h1>Employee Dashboard.</h1>
          </ProtectedRoute>
        }/>

        <Route path='/admin' element={
          <AdminRoute>
            <h1>This is the admin Route</h1>
          </AdminRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

