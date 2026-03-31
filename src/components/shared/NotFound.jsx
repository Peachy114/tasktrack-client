import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function NotFound() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleGoHome = () => {
    if (currentUser?.role === 'admin')         navigate('/admin')
    else if (currentUser?.role === 'employee') navigate('/dashboard')
    else                                        navigate('/')
  }

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden'
      style={{
        background: 'linear-gradient(160deg, #0F4C75 0%, #3282B8 55%, #BBE1FA 100%)',
        fontFamily: 'inherit',
      }}
    >
      {/* Background blobs */}
      <div
        className='absolute pointer-events-none'
        style={{
          top: '-10%', left: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(187,225,250,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className='absolute pointer-events-none'
        style={{
          bottom: '-10%', right: '-5%', width: '45%', height: '45%',
          background: 'radial-gradient(circle, rgba(15,76,117,0.5) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Glowing 404 */}
      <div className='relative mb-4 select-none z-10'>
        <p
          className='font-bold leading-none'
          style={{
            fontSize: '140px',
            color: 'rgba(221,230,237,0.12)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          404
        </p>
        {/* Overlay colored text */}
        <p
          className='font-bold leading-none absolute inset-0 flex items-center justify-center'
          style={{
            fontSize: '140px',
            background: 'linear-gradient(135deg, #ffffff 0%, #BBE1FA 60%, rgba(187,225,250,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.05em',
            filter: 'drop-shadow(0 0 40px rgba(187,225,250,0.3))',
          }}
        >
          404
        </p>
      </div>

      {/* Icon */}
      <div
        className='w-14 h-14 rounded-2xl flex items-center justify-center mb-6 z-10'
        style={{
          background: 'rgba(27,38,44,0.3)',
          border: '1px solid rgba(187,225,250,0.3)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(15,76,117,0.3)',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#BBE1FA" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16v.5" stroke="#BBE1FA" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Text */}
      <h1 className='text-2xl font-bold mb-2 z-10' style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
        Page not found
      </h1>
      <p className='text-sm mb-10 max-w-sm leading-relaxed z-10' style={{ color: 'rgba(221,230,237,0.7)' }}>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      {/* Buttons */}
      <div className='flex items-center gap-3 flex-wrap justify-center z-10'>
        <button
          onClick={handleGoHome}
          className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5'
          style={{
            background: '#1B262C',
            color: '#BBE1FA',
            border: 'none',
            boxShadow: '0 4px 20px rgba(27,38,44,0.45)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="#BBE1FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go to dashboard
        </button>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all hover:bg-white/15'
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#ffffff',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M9 6l-6 6 6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go back
        </button>
      </div>

      {/* Bottom branding */}
      <div className='absolute bottom-8 flex items-center gap-2 z-10' style={{ opacity: 0.45 }}>
        <div
          className='w-6 h-6 rounded-lg flex items-center justify-center'
          style={{ background: '#1B262C' }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1.5" fill="#BBE1FA"/>
            <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#BBE1FA" opacity="0.5"/>
            <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#BBE1FA" opacity="0.5"/>
            <rect x="9" y="9" width="5" height="5" rx="1.5" fill="#BBE1FA"/>
          </svg>
        </div>
        <span className='text-xs font-semibold' style={{ color: '#DDE6ED' }}>TaskTrack</span>
      </div>
    </div>
  )
}