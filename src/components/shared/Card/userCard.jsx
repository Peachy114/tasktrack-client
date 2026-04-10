import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function UserCard() {
  const { currentUser, logOut } = useAuth()
  const [open, setOpen] = useState(false)
  const avatar = `https://i.pravatar.cc/150?img=1`

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(o => !o)}
        className='w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-bg-page transition-colors'
      >
        {/* Info */}
        <div className='text-left'>
          <p className='text-sm font-semibold text-text-primary leading-tight'>{currentUser.displayName ?? currentUser.email}</p>
          <p className='text-xs text-text-gray capitalize'>{currentUser.role}</p>
        </div>

        {/* Avatar */}
        <div className='relative flex-shrink-0'>
          <img
            src={avatar}
            alt='avatar'
            className='w-9 h-9 rounded-full object-cover ring-2 ring-border-primary'
          />
          <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-white' />
        </div>

        {/* Chevron */}
        <svg
          width='14' height='14' viewBox='0 0 24 24' fill='none'
          stroke='#9B9B9B' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d='m6 9 6 6 6-6'/>
        </svg>
      </button>



    {open && (
    <div className='absolute right-0 top-full mt-2 w-44 bg-bg-primary border border-border-primary rounded-xl shadow-sm overflow-hidden z-50'>
        <button
        onClick={logOut}
        className='w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-50 transition-colors'
        >
        <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4'/>
            <polyline points='16 17 21 12 16 7'/>
            <line x1='21' y1='12' x2='9' y2='12'/>
        </svg>
        Sign out
        </button>
    </div>
    )}
    </div>
  )
}