import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

// ── Icons ────────────────────────────────────────────────────────────────────

const IconGrid = ({ active }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 1 : 0.7}
    />
    <rect x="9" y="1" width="6" height="6" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 0.6 : 0.4}
    />
    <rect x="1" y="9" width="6" height="6" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 0.6 : 0.4}
    />
    <rect x="9" y="9" width="6" height="6" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 0.3 : 0.25}
    />
  </svg>
)

const IconKanban = ({ active }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="4" height="10" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 0.5 : 0.5}
    />
    <rect x="6" y="1" width="4" height="12" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 0.8 : 0.7}
    />
    <rect x="11" y="5" width="4" height="8" rx="1.5"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
    />
  </svg>
)

const IconCheckSquare = ({ active }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="1.5" width="13" height="13" rx="3"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.4"
      opacity={active ? 0.15 : 1}
    />
    {active && (
      <path d="M4.5 8.5l2.5 2.5 4.5-5"
        stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
      />
    )}
    {!active && (
      <path d="M4.5 8.5l2.5 2.5 4.5-5"
        stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.4"
      />
    )}
  </svg>
)

// ── Link config ──────────────────────────────────────────────────────────────

const adminLinks = [
  { to: '/admin',       label: 'Dashboard', Icon: IconGrid        },
  { to: '/admin/tasks', label: 'Tasks',     Icon: IconKanban      },
]

const employeeLinks = [
  { to: '/dashboard',   label: 'My Tasks',  Icon: IconCheckSquare },
]

// ── Navigator ────────────────────────────────────────────────────────────────

export default function Navigator() {
  const location    = useLocation()
  const { currentUser } = useAuth()
  const isAdmin     = currentUser?.role === 'admin'
  const links       = isAdmin ? adminLinks : employeeLinks

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes nav-in {
          from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
        }
        @keyframes pip-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
        .nav-root {
          animation: nav-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .nav-link {
          position: relative;
          transition: color 0.2s ease;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: var(--color-tt-primary, #6366f1);
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nav-link:hover::before {
          opacity: 0.07;
          transform: scale(1);
        }
        .nav-link.active-link::before {
          opacity: 0;
          transform: scale(1);
        }
        .active-pill {
          transition: left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pip { animation: pip-pulse 2.4s ease-in-out infinite; }
      `}</style>

      <nav
        className='nav-root fixed bottom-6 z-50 left-1/2'
        style={{ transform: 'translateX(-50%)' }}
        aria-label='Main navigation'
      >


        
        <div
          className='relative flex items-center rounded-2xl bg-tt-bg-card border border-tt-border'
          style={{
            boxShadow: '0 8px 32px -4px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
            padding: '5px',
            gap: '2px',
          }}
        >
          {links.map(({ to, label, Icon }) => {
            const isActive = location.pathname === to

            return (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive ? 'active-link' : ''} relative flex items-center gap-2 rounded-[14px] transition-colors`}
                style={{
                  padding: '7px 16px 7px 13px',
                  color: isActive
                    ? 'white'
                    : 'var(--color-tt-text-muted, #6b7280)',
                  textDecoration: 'none',
                  zIndex: 1,
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active background pill */}
                {isActive && (
                  <span
                    aria-hidden
                    className='absolute inset-0 rounded-[14px]'
                    style={{
                      background: 'var(--color-tt-primary, #6366f1)',
                      boxShadow: '0 2px 12px -2px color-mix(in srgb, var(--color-tt-primary, #6366f1) 60%, transparent)',
                    }}
                  />
                )}

                {/* Icon */}
                <span className='relative z-10 flex-shrink-0' style={{ lineHeight: 0 }}>
                  <Icon active={isActive} />
                </span>

                {/* Label */}
                <span
                  className='relative z-10 font-semibold whitespace-nowrap'
                  style={{ fontSize: '12px', letterSpacing: '0.01em' }}
                >
                  {label}
                </span>

                {/* Active pip dot */}
                {isActive && (
                  <span
                    aria-hidden
                    className='pip relative z-10 flex-shrink-0 rounded-full'
                    style={{
                      width: 4,
                      height: 4,
                      background: 'rgba(255,255,255,0.7)',
                      marginLeft: -2,
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}