import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div
      className='min-h-screen flex flex-col'
      style={{
        background: 'linear-gradient(160deg, #0F4C75 0%, #3282B8 45%, #BBE1FA 100%)',
        fontFamily: 'inherit',
      }}
    >
      {/* ── Subtle mesh overlay ── */}
      <div
        className='fixed inset-0 pointer-events-none'
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(187,225,250,0.18) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(15,76,117,0.35) 0%, transparent 50%)`,
        }}
      />

      {/* ── Nav ── */}
      <nav className='flex items-center justify-between px-8 py-5 relative z-10'>
        <div className='flex items-center gap-2.5'>
          <div
            className='w-8 h-8 rounded-xl flex items-center justify-center'
            style={{ background: '#1B262C' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className='font-bold text-base' style={{ color: '#ffffff', letterSpacing: '-0.01em' }}>TaskTrack</span>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate('/login')}
            className='px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all hover:bg-white/10'
            style={{ color: 'rgba(255,255,255,0.85)', background: 'transparent', border: 'none' }}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/signup')}
            className='px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all hover:opacity-90'
            style={{ background: '#1B262C', color: '#BBE1FA', border: 'none' }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className='flex flex-col items-center justify-center text-center px-6 pt-12 pb-10 relative z-10'>

        {/* Badge */}
        <div
          className='flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium uppercase tracking-widest'
          style={{
            background: 'rgba(27,38,44,0.25)',
            border: '1px solid rgba(187,225,250,0.3)',
            color: '#DDE6ED',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className='w-1.5 h-1.5 rounded-full animate-pulse' style={{ background: '#BBE1FA' }}/>
          Real-time task management
        </div>

        {/* Title */}
        <h1
          className='text-5xl sm:text-6xl font-bold leading-tight mb-5'
          style={{ color: '#ffffff', letterSpacing: '-0.03em', textShadow: '0 2px 24px rgba(15,76,117,0.4)' }}
        >
          Manage tasks.<br/>
          <span style={{ color: '#BBE1FA' }}>Track progress.</span><br/>
          Ship faster.
        </h1>

        {/* Subtitle */}
        <p className='text-sm max-w-md leading-relaxed mb-10' style={{ color: 'rgba(221,230,237,0.8)' }}>
          TaskTrack helps teams stay aligned. Admins create and assign tasks,
          employees update progress — all synced in real time.
        </p>

        {/* Buttons */}
        <div className='flex items-center gap-3 flex-wrap justify-center mb-14'>
          <button
            onClick={() => navigate('/signup')}
            className='flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5'
            style={{ background: '#1B262C', color: '#BBE1FA', border: 'none', boxShadow: '0 4px 20px rgba(27,38,44,0.4)' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5" r="3" stroke="#BBE1FA" strokeWidth="1.5"/>
              <path d="M2 13c0-3 2.686-4 6-4s6 1 6 4" stroke="#BBE1FA" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 2v4M10 4h4" stroke="#BBE1FA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Create free account
          </button>
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all hover:bg-white/15'
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#ffffff',
              backdropFilter: 'blur(8px)',
            }}
          >
            Sign in
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── App Mockup ── */}
        <div
          className='w-full max-w-3xl rounded-2xl overflow-hidden mb-14'
          style={{
            background: 'rgba(221,230,237,0.95)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 32px 64px rgba(15,76,117,0.35), 0 0 0 1px rgba(255,255,255,0.2)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Browser bar */}
          <div
            className='flex items-center gap-3 px-4 py-3'
            style={{ background: '#0F4C75', borderBottom: '1px solid rgba(50,130,184,0.3)' }}
          >
            <div className='flex gap-1.5'>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#ff5f57' }}/>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#febc2e' }}/>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#28c840' }}/>
            </div>
            <div
              className='flex-1 rounded-md py-1 px-3 text-center text-xs'
              style={{ background: 'rgba(187,225,250,0.15)', color: 'rgba(187,225,250,0.7)' }}
            >
              tasktrack.app/admin/tasks
            </div>
          </div>

          {/* Kanban columns */}
          <div className='grid grid-cols-3 gap-3 p-4'>
            {/* Backlog */}
            <div className='rounded-xl p-3' style={{ background: '#DDE6ED', border: '1px solid rgba(50,130,184,0.15)' }}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-2 h-2 rounded-full' style={{ background: '#6a96b0' }}/>
                <span className='text-xs font-semibold' style={{ color: '#3282B8' }}>Backlog</span>
              </div>
              {[{ t: 'Design login page', d: 'Create UI for auth', u: 'J' }, { t: 'Write unit tests', d: 'Cover all endpoints', u: '+' }].map((c, i) => (
                <div key={i} className='rounded-lg p-2.5 mb-2' style={{ background: '#ffffff', border: '1px solid rgba(50,130,184,0.12)', boxShadow: '0 1px 4px rgba(15,76,117,0.06)' }}>
                  <p className='text-xs font-semibold mb-1' style={{ color: '#1B262C' }}>{c.t}</p>
                  <p className='text-xs mb-2' style={{ color: '#6a96b0', fontSize: '10px' }}>{c.d}</p>
                  <div className='flex items-center justify-between'>
                    <div className='w-5 h-5 rounded-full flex items-center justify-center font-semibold' style={{ background: '#BBE1FA', color: '#0F4C75', fontSize: '8px' }}>{c.u}</div>
                    <span className='text-xs px-2 py-0.5 rounded-full' style={{ background: '#DDE6ED', color: '#6a96b0', fontSize: '9px' }}>Pending</span>
                  </div>
                </div>
              ))}
            </div>

            {/* In Progress */}
            <div className='rounded-xl p-3' style={{ background: '#BBE1FA', border: '1px solid rgba(50,130,184,0.2)' }}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-2 h-2 rounded-full' style={{ background: '#3282B8' }}/>
                <span className='text-xs font-semibold' style={{ color: '#0F4C75' }}>In Progress</span>
              </div>
              {[{ t: 'Build dashboard', d: 'Admin overview page', u: 'A' }, { t: 'API integration', d: 'Connect Firestore', u: 'M' }].map((c, i) => (
                <div key={i} className='rounded-lg p-2.5 mb-2' style={{ background: '#ffffff', border: '1px solid rgba(50,130,184,0.15)', boxShadow: '0 1px 4px rgba(15,76,117,0.08)' }}>
                  <p className='text-xs font-semibold mb-1' style={{ color: '#1B262C' }}>{c.t}</p>
                  <p className='text-xs mb-2' style={{ color: '#6a96b0', fontSize: '10px' }}>{c.d}</p>
                  <div className='flex items-center justify-between'>
                    <div className='w-5 h-5 rounded-full flex items-center justify-center font-semibold' style={{ background: '#3282B8', color: '#ffffff', fontSize: '8px' }}>{c.u}</div>
                    <span className='px-2 py-0.5 rounded-full' style={{ background: 'rgba(50,130,184,0.15)', color: '#0F4C75', fontSize: '9px', fontWeight: 600 }}>Active</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Done */}
            <div className='rounded-xl p-3' style={{ background: '#e8f8f0', border: '1px solid rgba(0,102,68,0.12)' }}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-2 h-2 rounded-full' style={{ background: '#22c55e' }}/>
                <span className='text-xs font-semibold' style={{ color: '#006644' }}>Done</span>
              </div>
              {[{ t: 'Setup Firebase', d: 'Auth + Firestore config', u: 'S' }, { t: 'User auth flow', d: 'Login and signup', u: 'R' }].map((c, i) => (
                <div key={i} className='rounded-lg p-2.5 mb-2' style={{ background: '#ffffff', border: '1px solid rgba(0,102,68,0.1)', boxShadow: '0 1px 4px rgba(0,102,68,0.06)' }}>
                  <p className='text-xs font-semibold mb-1' style={{ color: '#1B262C' }}>{c.t}</p>
                  <p className='text-xs mb-2' style={{ color: '#6a96b0', fontSize: '10px' }}>{c.d}</p>
                  <div className='flex items-center justify-between'>
                    <div className='w-5 h-5 rounded-full flex items-center justify-center font-semibold' style={{ background: '#dcfce7', color: '#006644', fontSize: '8px' }}>{c.u}</div>
                    <span className='px-2 py-0.5 rounded-full' style={{ background: '#dcfce7', color: '#006644', fontSize: '9px', fontWeight: 600 }}>Done</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Features ── */}
        <div className='w-full max-w-3xl flex items-center justify-center gap-6 flex-wrap py-6'>
          {[
            { label: 'Real-time updates', icon: <path d="M14 8 11 8 9 14 6 2 4 8 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> },
            { label: 'Kanban board', icon: <><rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M5 5h4M5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
            { label: 'Activity feed', icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
            { label: 'Role-based access', icon: <path d="M8 2a4 4 0 100 8 4 4 0 000-8zM2 12c0-2 2.686-3 6-3s6 1 6 3v1H2v-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/> },
            { label: 'Dark mode', icon: <path d="M13 12.79A9 9 0 117.21 3a7 7 0 005.79 9.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> },
          ].map((f, i) => (
            <div
              key={i}
              className='flex items-center gap-2 text-xs font-medium'
              style={{ color: 'rgba(221,230,237,0.85)' }}
            >
              <div
                className='w-7 h-7 rounded-lg flex items-center justify-center'
                style={{ background: 'rgba(27,38,44,0.3)', color: '#BBE1FA', backdropFilter: 'blur(4px)', border: '1px solid rgba(187,225,250,0.2)' }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: '#BBE1FA' }}>{f.icon}</svg>
              </div>
              {f.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}