import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

// im still designing
export default function EmployeeLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav className='bg-blue-900'>
        <h2>TaskTrack</h2>

        <div >
          <Link to='/dashboard'>
            My Tasks
          </Link>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main>
        {children}
      </main>
    </div>
  )
}