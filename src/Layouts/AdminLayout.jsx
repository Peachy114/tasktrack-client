import React, { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import Navigator from '@/components/shared/Navigator'

export default function AdminLayout({ children }) {

  return (
    <div className='bg-(image:--gradient-tt-bg)'>
      <Navbar />
      <main>
        {children}
      </main>
      <Navigator />
    </div>
  )
}