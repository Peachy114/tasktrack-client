import React from 'react'

export default function LoadingPage() {
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center relative overflow-hidden'
      style={{
        background: 'linear-gradient(160deg, #0F4C75 0%, #3282B8 55%, #BBE1FA 100%)',
        fontFamily: 'inherit',
      }}
    >
      {/* Background glow orbs */}
      <div
        className='absolute pointer-events-none'
        style={{
          top: '20%', left: '25%',
          width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(187,225,250,0.15) 0%, transparent 65%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className='absolute pointer-events-none'
        style={{
          bottom: '10%', right: '10%',
          width: '40%', height: '40%',
          background: 'radial-gradient(circle, rgba(15,76,117,0.5) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Logo */}
      <div
        className='w-16 h-16 rounded-2xl flex items-center justify-center mb-5 relative z-10'
        style={{
          background: '#1B262C',
          boxShadow: '0 8px 32px rgba(27,38,44,0.45), 0 0 0 1px rgba(187,225,250,0.15)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1.5" fill="#BBE1FA"/>
          <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#BBE1FA" opacity="0.5"/>
          <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#BBE1FA" opacity="0.5"/>
          <rect x="9" y="9" width="5" height="5" rx="1.5" fill="#BBE1FA"/>
        </svg>
      </div>

      {/* Brand name */}
      <p
        className='text-base font-bold mb-10 relative z-10'
        style={{ color: '#ffffff', letterSpacing: '-0.01em' }}
      >
        TaskTrack
      </p>

      {/* Spinner */}
      <div className='relative w-10 h-10 z-10'>
        <svg
          className='animate-spin'
          style={{ animationDuration: '1s' }}
          width="40" height="40" viewBox="0 0 40 40" fill="none"
        >
          <circle cx="20" cy="20" r="16" stroke="rgba(221,230,237,0.2)" strokeWidth="3"/>
          <path d="M20 4a16 16 0 0116 16" stroke="#BBE1FA" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Loading text */}
      <p
        className='text-xs mt-6 relative z-10'
        style={{ color: 'rgba(221,230,237,0.5)', letterSpacing: '0.04em' }}
      >
        Loading your workspace…
      </p>
    </div>
  )
}