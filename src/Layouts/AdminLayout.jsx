import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'


// note: I'm still designing 
export default function AdminLayout({ children }) {
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
      <nav>
        <h2>TaskTrack</h2>
        
        <div className='bg-black'>
          <Link to='/admin'>
            Dashboard
          </Link>
          <Link to='/admin/tasks'>
            Tasks
          </Link>
          <Link to='/admin/users'>
            Users
          </Link>
          <button onClick={handleLogout} >
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