import { useAuth } from '@/context/AuthContext'
import { useEffect, useState, useRef } from 'react'
import { useLogout } from '@/hook/useLogout'

export default function Navbar() {
  const { currentUser } = useAuth();
  const logout = useLogout();
  const [dark, setDark] = useState(() => localStorage.getItem('tt-theme') === 'dark');
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('tt-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 10) {
        setVisible(true)
      } else if (currentY < lastScrollY.current) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const date = now.toLocaleDateString([], { month: 'short', day: 'numeric' })
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      setTimeStr(`${date} · ${time}`)
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className={`h-[var(--tt-navbar-h)] bg-tt-bg-card border-b border-tt-border shadow-[var(--tt-shadow-sm)]
      px-3 sm:px-4 flex items-center justify-between sticky top-0 z-50
      transition-transform duration-300 ease-in-out
      ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Left: Logo */}
      <div className='flex items-center gap-2 flex-shrink-0'>
        <div className='w-7 h-7 rounded-lg bg-tt-primary flex items-center justify-center flex-shrink-0'>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
            <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
            <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
            <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
          </svg>
        </div>
        <span className='text-sm font-bold text-tt-primary hidden xs:block sm:block'>TaskTrack</span>
      </div>

      {/* Right */}
      <div className='flex items-center gap-1.5 sm:gap-2 min-w-0'>

        {/* Time — hidden on mobile */}
        <span className='text-xs font-medium text-tt-text-muted hidden md:block'>
          {timeStr}
        </span>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(v => !v)}
          className='w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
            hover:opacity-80 transition-opacity bg-transparent border border-tt-border text-tt-text-muted'
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <div className='w-px h-5 bg-tt-border flex-shrink-0' />

        {/* User Info */}
        <div className='flex items-center gap-1.5 px-2 py-1 rounded-full bg-tt-bg-muted border border-tt-border min-w-0'>
          <div className='w-5 h-5 rounded-full bg-tt-primary flex items-center justify-center
            text-white font-bold flex-shrink-0 text-[10px]'>
            {currentUser?.email?.[0].toUpperCase()}
          </div>
          {/* Email + role hidden on small screens */}
          <span className='text-xs font-semibold text-tt-text hidden sm:block truncate max-w-[80px]'>
            {currentUser?.email?.split('@')[0]}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium hidden sm:block flex-shrink-0 ${
            currentUser?.role === 'admin'
              ? 'bg-tt-primary-light text-tt-primary'
              : 'bg-tt-progress-bg text-tt-progress-text'
          }`}>
            {currentUser?.role}
          </span>
        </div>

        <div className='w-px h-5 bg-tt-border flex-shrink-0' />

        {/* Sign out — icon only on mobile, icon+text on sm+ */}
        <button
          onClick={logout}
          className='flex items-center gap-1.5 text-xs px-2 sm:px-3 py-1.5 rounded-full flex-shrink-0
            hover:opacity-80 transition-opacity bg-transparent border border-tt-border text-tt-text-muted'
          title='Sign out'
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className='hidden sm:inline'>Sign out</span>
        </button>

      </div>
    </nav>
  )
}