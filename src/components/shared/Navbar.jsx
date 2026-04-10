import React, { useState } from 'react'
import UserCard from './Card/userCard'
import { useAuth } from '@/context/AuthContext'
import { TaskFlowIcon } from '../ui/Icons'
import { useDarkMode } from '@/hook/useDarkMood'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const { currentUser, logOut } = useAuth()
  const username = currentUser?.email?.split('@')[0]
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useDarkMode()

  return (
    <nav className='relative border-b border-border-primary bg-bg-primary'>

      {/* Top gradient line */}
      <div
        className='absolute top-0 left-0 right-0 h-[2px] pointer-events-none'
        style={{ background: 'linear-gradient(90deg, #2979FF, #00C48C, #2979FF)' }}
      />

      <div className='flex justify-between items-center py-2 px-5'>

        {/* Logo */}
        <NavLink to="/admin" className='flex items-center gap-3'>
          <TaskFlowIcon />
          <span className='text-lg font-bold text-text-primary'>TaskFlow</span>
          <div className='hidden sm:block h-4 w-px bg-border-primary' />
          <h1 className='hidden sm:flex text-sm items-center gap-1 text-text-primary'>
            Hello,{' '}
            <span className='font-semibold text-text-blue'>{username}</span>
          </h1>
        </NavLink>

        {/* Desktop right */}
        <div className='hidden sm:flex items-center gap-2 relative z-10 overflow-visible'>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className='w-8 h-8 flex items-center justify-center rounded-xl border border-border-primary hover:bg-bg-page transition-colors'
          >
            {dark ? (
              <svg width='15' height='15' viewBox='0 0 24 24' fill='none'
                stroke='var(--color-text-primary)'
                strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='12' r='5'/>
                <line x1='12' y1='1' x2='12' y2='3'/>
                <line x1='12' y1='21' x2='12' y2='23'/>
                <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'/>
                <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'/>
                <line x1='1' y1='12' x2='3' y2='12'/>
                <line x1='21' y1='12' x2='23' y2='12'/>
                <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'/>
                <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'/>
              </svg>
            ) : (
              <svg width='15' height='15' viewBox='0 0 24 24' fill='none'
                stroke='var(--color-text-primary)'
                strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'/>
              </svg>
            )}
          </button>

          <UserCard />
        </div>

        {/* Mobile hamburger */}
        <button
          className='sm:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-bg-page transition-colors'
          onClick={() => setMobileOpen(o => !o)}
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='sm:hidden border-t border-border-primary bg-bg-primary px-5 py-4 flex flex-col gap-4'>

          {/* User info */}
          <div className='flex items-center gap-3'>
            <div className='relative flex-shrink-0'>
              <img
                src='https://i.pravatar.cc/150?img=1'
                alt='avatar'
                className='w-10 h-10 rounded-full object-cover ring-2 ring-border-primary'
              />
              <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-bg-primary' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold text-text-primary truncate'>{currentUser?.email}</p>
              <p className='text-xs text-text-gray capitalize'>{currentUser?.role}</p>
            </div>

            {/* Dark mode toggle in mobile */}
            <button
              onClick={toggle}
              className='w-8 h-8 flex items-center justify-center rounded-xl border border-border-primary hover:bg-bg-page transition-colors flex-shrink-0'
            >
              {dark ? (
                <svg width='15' height='15' viewBox='0 0 24 24' fill='none'
                  stroke='var(--color-text-primary)'
                  strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <circle cx='12' cy='12' r='5'/>
                  <line x1='12' y1='1' x2='12' y2='3'/>
                  <line x1='12' y1='21' x2='12' y2='23'/>
                  <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'/>
                  <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'/>
                  <line x1='1' y1='12' x2='3' y2='12'/>
                  <line x1='21' y1='12' x2='23' y2='12'/>
                  <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'/>
                  <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'/>
                </svg>
              ) : (
                <svg width='15' height='15' viewBox='0 0 24 24' fill='none'
                  stroke='var(--color-text-primary)'
                  strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'/>
                </svg>
              )}
            </button>
          </div>

          {/* Sign out */}
          <button
            onClick={logOut}
            className='w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors'
            style={{
              border: '1px solid rgba(255,77,77,0.3)',
              background: 'rgba(255,77,77,0.08)',
              color: '#FF6B6B',
            }}
          >
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4'/>
              <polyline points='16 17 21 12 16 7'/>
              <line x1='21' y1='12' x2='9' y2='12'/>
            </svg>
            Sign out
          </button>

        </div>
      )}

    </nav>
  )
}