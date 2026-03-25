import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import Navbar from '@/components/shared/Navbar';
import { useAuth } from '@/context/AuthContext';

// im still designing
export default function EmployeeLayout({ children }) {
  const { currentUser } = useAuth();
  
  return (
    <div>
      {/* Navbar */}
      <Navbar role={currentUser?.role} />
      <main>
        {children}
      </main>
    </div>
  )
}