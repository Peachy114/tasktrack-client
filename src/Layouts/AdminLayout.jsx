import React from 'react'
import Navbar from '@/components/shared/Navbar';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/shared/Sidebar';

export default function AdminLayout({ children }) {
  const { currentUser } = useAuth();

  return (
    <div>
      <Navbar role={currentUser?.role} />
      <div className='flex'>
        <main className='w-full'>
          {children}
        </main>
        <Sidebar />
      </div>
    </div>
  )
}
