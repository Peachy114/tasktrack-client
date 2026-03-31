import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col' style={{ background: '#0f1020', fontFamily: 'inherit' }}>

      {/* ── Hero ── */}
      <div className='flex flex-col items-center justify-center text-center px-4 pt-16 pb-8'>

        {/* Badge */}
        <div
          className='flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs uppercase tracking-widest'
          style={{ background: 'rgba(94,96,194,0.15)', border: '0.5px solid rgba(94,96,194,0.4)', color: '#9596CF' }}
        >
          <span className='w-1.5 h-1.5 rounded-full animate-pulse' style={{ background: '#5e60c2' }}/>
          Real-time task management
        </div>

        {/* Title */}
        <h1
          className='text-5xl sm:text-6xl font-bold leading-tight mb-4'
          style={{ background: 'linear-gradient(135deg, #ffffff 0%, #9596CF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          Manage tasks.<br/>Track progress.<br/>Ship faster.
        </h1>

        {/* Subtitle */}
        <p className='text-sm max-w-md leading-relaxed mb-8' style={{ color: 'rgba(255,255,255,0.5)' }}>
          TaskTrack helps teams stay aligned. Admins create and assign tasks, employees update progress — all synced in real time.
        </p>

        {/* Buttons */}
        <div className='flex items-center gap-3 flex-wrap justify-center mb-12'>
          <button
            onClick={() => navigate('/signup')}
            className='flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white font-semibold hover:opacity-85 transition-opacity border-none cursor-pointer'
            style={{ background: '#5e60c2' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5" r="3" stroke="white" strokeWidth="1.5"/>
              <path d="M2 13c0-3 2.686-4 6-4s6 1 6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 2v4M10 4h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Create free account
          </button>
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold hover:opacity-70 transition-opacity bg-transparent cursor-pointer'
            style={{ border: '0.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
          >
            Sign in
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── App Mockup ── */}
        <div
          className='w-full max-w-3xl rounded-2xl overflow-hidden mb-12'
          style={{ background: '#1a1b2e', border: '0.5px solid rgba(255,255,255,0.1)' }}
        >
          {/* Browser bar */}
          <div
            className='flex items-center gap-3 px-4 py-3'
            style={{ background: '#13142a', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}
          >
            <div className='flex gap-1.5'>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#ff5f57' }}/>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#febc2e' }}/>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#28c840' }}/>
            </div>
            <div
              className='flex-1 rounded-md py-1 px-3 text-center text-xs'
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
            >
              tasktrack.app/admin/tasks
            </div>
          </div>

          {/* Kanban columns */}
          <div className='grid grid-cols-3 gap-3 p-4'>
            {/* Backlog */}
            <div className='rounded-xl p-3' style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-2 h-2 rounded-full' style={{ background: '#888' }}/>
                <span className='text-xs font-semibold' style={{ color: 'rgba(255,255,255,0.5)' }}>Backlog</span>
              </div>
              {[{ t: 'Design login page', d: 'Create UI for auth', u: 'J' }, { t: 'Write unit tests', d: 'Cover all endpoints', u: '+' }].map((c, i) => (
                <div key={i} className='rounded-lg p-2 mb-2' style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                  <p className='text-xs font-semibold mb-1' style={{ color: 'rgba(255,255,255,0.7)' }}>{c.t}</p>
                  <p className='text-xs mb-2' style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>{c.d}</p>
                  <div className='flex items-center justify-between'>
                    <div className='w-4 h-4 rounded-full flex items-center justify-center text-xs font-semibold' style={{ background: 'rgba(94,96,194,0.3)', color: '#9596CF', fontSize: '8px' }}>{c.u}</div>
                    <span className='text-xs px-1.5 py-0.5 rounded-full' style={{ background: 'rgba(136,136,136,0.15)', color: '#888', fontSize: '9px' }}>Pending</span>
                  </div>
                </div>
              ))}
            </div>

            {/* In Progress */}
            <div className='rounded-xl p-3' style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-2 h-2 rounded-full' style={{ background: '#5e60c2' }}/>
                <span className='text-xs font-semibold' style={{ color: 'rgba(255,255,255,0.5)' }}>In Progress</span>
              </div>
              {[{ t: 'Build dashboard', d: 'Admin overview page', u: 'A' }, { t: 'API integration', d: 'Connect Firestore', u: 'M' }].map((c, i) => (
                <div key={i} className='rounded-lg p-2 mb-2' style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                  <p className='text-xs font-semibold mb-1' style={{ color: 'rgba(255,255,255,0.7)' }}>{c.t}</p>
                  <p className='text-xs mb-2' style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>{c.d}</p>
                  <div className='flex items-center justify-between'>
                    <div className='w-4 h-4 rounded-full flex items-center justify-center font-semibold' style={{ background: 'rgba(94,96,194,0.3)', color: '#9596CF', fontSize: '8px' }}>{c.u}</div>
                    <span className='px-1.5 py-0.5 rounded-full' style={{ background: 'rgba(94,96,194,0.15)', color: '#9596CF', fontSize: '9px' }}>Active</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Done */}
            <div className='rounded-xl p-3' style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-2 h-2 rounded-full' style={{ background: '#4BCE97' }}/>
                <span className='text-xs font-semibold' style={{ color: 'rgba(255,255,255,0.5)' }}>Done</span>
              </div>
              {[{ t: 'Setup Firebase', d: 'Auth + Firestore config', u: 'S' }, { t: 'User auth flow', d: 'Login and signup', u: 'R' }].map((c, i) => (
                <div key={i} className='rounded-lg p-2 mb-2' style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                  <p className='text-xs font-semibold mb-1' style={{ color: 'rgba(255,255,255,0.7)' }}>{c.t}</p>
                  <p className='text-xs mb-2' style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>{c.d}</p>
                  <div className='flex items-center justify-between'>
                    <div className='w-4 h-4 rounded-full flex items-center justify-center font-semibold' style={{ background: 'rgba(75,206,151,0.2)', color: '#4BCE97', fontSize: '8px' }}>{c.u}</div>
                    <span className='px-1.5 py-0.5 rounded-full' style={{ background: 'rgba(75,206,151,0.15)', color: '#4BCE97', fontSize: '9px' }}>Done</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Features ── */}
        <div
          className='w-full max-w-3xl flex items-center justify-center gap-8 flex-wrap py-6 rounded-2xl'
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Real-time updates', icon: <path d="M14 8 11 8 9 14 6 2 4 8 2 8" stroke="#9596CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> },
            { label: 'Kanban board', icon: <><rect x="2" y="2" width="12" height="12" rx="3" stroke="#9596CF" strokeWidth="1.5"/><path d="M5 8h6M5 5h4M5 11h3" stroke="#9596CF" strokeWidth="1.5" strokeLinecap="round"/></> },
            { label: 'Activity feed', icon: <><circle cx="8" cy="8" r="6" stroke="#9596CF" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="#9596CF" strokeWidth="1.5" strokeLinecap="round"/></> },
            { label: 'Role-based access', icon: <path d="M8 2a4 4 0 100 8 4 4 0 000-8zM2 12c0-2 2.686-3 6-3s6 1 6 3v1H2v-1z" stroke="#9596CF" strokeWidth="1.5" strokeLinecap="round"/> },
            { label: 'Dark mode', icon: <path d="M13 12.79A9 9 0 117.21 3a7 7 0 005.79 9.79z" stroke="#9596CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> },
          ].map((f, i) => (
            <div key={i} className='flex items-center gap-2 text-xs' style={{ color: 'rgba(255,255,255,0.4)' }}>
              <div className='w-7 h-7 rounded-lg flex items-center justify-center' style={{ background: 'rgba(94,96,194,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">{f.icon}</svg>
              </div>
              {f.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}