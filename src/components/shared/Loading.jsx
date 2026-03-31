import React from 'react'

export default function LoadingPage() {
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center'
      style={{ background: '#0f1020' }}
    >
      {/* Logo */}
      <div
        className='w-14 h-14 rounded-2xl flex items-center justify-center mb-6'
        style={{ background: '#5e60c2' }}
      >
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
          <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
          <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
          <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
        </svg>
      </div>

      {/* Brand name */}
      <p className='text-sm font-semibold mb-8' style={{ color: 'rgba(255,255,255,0.6)' }}>
        TaskTrack
      </p>

      {/* Spinner */}
      <div className='relative w-8 h-8'>
        <svg className='animate-spin' width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="rgba(94,96,194,0.2)" strokeWidth="3"/>
          <path d="M16 3a13 13 0 0113 13" stroke="#5e60c2" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Bottom text */}
      <p className='text-xs mt-6' style={{ color: 'rgba(255,255,255,0.2)' }}>
        Loading your workspace…
      </p>
    </div>
  )
}