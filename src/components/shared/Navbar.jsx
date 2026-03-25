import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFetch } from '../../hook/useFetch'
import { userService } from '../../services/userService'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'


export default function Navbar({ role }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: users, fetch: fetchUsers } = useFetch(userService.getAll)
  const [notifCount] = useState(3)
  const { currentUser } = useAuth();

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleLogout = async () => {
    try { await signOut(auth); navigate('/login') }
    catch (err) { console.log(err.message) }
  }

  const adminLinks = [
    { to: '/admin',       label: 'Dashboard' },
    { to: '/admin/tasks', label: 'Tasks'     },
  ]
  const employeeLinks = [{ to: '/dashboard', label: 'My Tasks' }]
  const links = role === 'admin' ? adminLinks : employeeLinks

  return (
    <nav
      className='h-14 px-6 flex items-center justify-between gap-4 sticky top-0 z-50'
      style={{ background: 'var(--tt-bg-card)', borderBottom: '1px solid var(--tt-border)' }}
    >
      {/* ── Left: Logo + nav links ── */}
      <div className='flex items-center gap-4'>

        {/* Logo */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <div
            className='w-7 h-7 rounded-lg flex items-center justify-center'
            style={{ background: 'var(--tt-primary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className='text-sm font-bold' style={{ color: 'var(--tt-primary)' }}>TaskTrack</span>
          <span className='text-xs hidden sm:block' style={{ color: 'var(--tt-text-muted)' }}>
            — Smart Productivity Hub
          </span>
        </div>

        {/* Divider */}
        <div className='w-px h-5 flex-shrink-0' style={{ background: 'var(--tt-border)' }}/>

        {/* Nav links */}
        <div className='flex items-center gap-1'>
          {links.map(link => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className='text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-80'
                style={isActive
                  ? { background: 'var(--tt-primary)', color: '#ffffff' }
                  : { color: 'var(--tt-text-muted)', background: 'transparent' }
                }
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Right: icons + avatars + logout ── */}
      <div className='flex items-center gap-2.5'>

        {/* Notification bell */}
        <button
          className='relative w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity'
          style={{ background: 'var(--tt-bg-muted)', color: 'var(--tt-text-muted)', border: '1px solid var(--tt-border)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.17V11a6 6 0 10-12 0v3.17a2 2 0 01-.6 1.42L4 17h5m6 0H9m6 0a3 3 0 11-6 0"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          {notifCount > 0 && (
            <span
              className='absolute -top-1 -right-1 text-white font-bold rounded-full flex items-center justify-center'
              style={{ fontSize: 9, background: '#ef4444', minWidth: 16, height: 16, padding: '0 4px' }}
            >
              {notifCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className='w-px h-5' style={{ background: 'var(--tt-border)' }}/>


        {/* User chip */}
        <div
          className='flex items-center gap-2 px-2 py-1 rounded-full'
          style={{ background: 'var(--tt-bg-muted)', border: '1px solid var(--tt-border)' }}
        >
          <div
            className='w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0'
            style={{ fontSize: 10, background: 'var(--tt-primary)' }}
          >
            {currentUser?.email?.[0].toUpperCase()}
          </div>
          <span className='text-xs font-semibold hidden sm:block' style={{ color: 'var(--tt-text)' }}>{currentUser?.email?.split('@')[0]}</span>
        </div>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity bg-transparent'
          style={{ border: '1px solid var(--tt-border)', color: 'var(--tt-text-muted)' }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sign out
        </button>
      </div>
    </nav>
  )
}