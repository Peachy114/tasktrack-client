import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const adminLinks = [
  { to: '/admin',       label: 'Dashboard' },
  { to: '/admin/tasks', label: 'Tasks'     },
]

const employeeLinks = [
  { to: '/dashboard', label: 'My Tasks' },
]

export default function Navigator() {
  const location = useLocation()
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'
  const links   = isAdmin ? adminLinks : employeeLinks

  return (
    <div className='flex items-center fixed bottom-5 z-50 left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden bg-tt-bg-card border border-tt-border shadow-[var(--tt-shadow-lg)]'>
      {links.map((link, i) => {
        const isActive = location.pathname === link.to
        return (
          <div key={link.to} className='flex items-center'>
            <Link
              to={link.to}
              className={`text-xs font-semibold px-6 py-2.5 transition-all hover:opacity-80 ${
                isActive
                  ? 'bg-tt-primary text-white'
                  : 'text-tt-text-muted bg-transparent'
              }`}
            >
              {link.label}
            </Link>
            {i < links.length - 1 && (
              <div className='h-5 w-px bg-tt-border' />
            )}
          </div>
        )
      })}
    </div>
  )
}