import React from 'react'
import Navbar from '@/components/shared/Navbar';


export default function EmployeeLayout({ children }) {
  return (
    <div className='bg-(image:--gradient-tt-bg)'>
      {/* Navbar */}
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}