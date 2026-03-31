import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function NotFound() {
  const navigate    = useNavigate()
  const { currentUser } = useAuth()

  const handleGoHome = () => {
    if (currentUser?.role === 'admin')         navigate('/admin')
    else if (currentUser?.role === 'employee') navigate('/dashboard')
    else                                        navigate('/')
  }

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center px-4 text-center'
      style={{ background: '#0f1020', fontFamily: 'inherit' }}
    >
      {/* Glowing 404 */}
      <div className='relative mb-6 select-none'>
        <p
          className='font-bold leading-none'
          style={{
            fontSize: '140px',
            background: 'linear-gradient(135deg, #5e60c2 0%, #9596CF 50%, rgba(255,255,255,0.3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0.9,
          }}
        >
          404
        </p>
        {/* Glow behind */}
        <div
          className='absolute inset-0 -z-10 blur-3xl rounded-full'
          style={{ background: 'rgba(94,96,194,0.15)', transform: 'scale(1.2)' }}
        />
      </div>

      {/* Icon */}
      <div
        className='w-16 h-16 rounded-2xl flex items-center justify-center mb-6'
        style={{ background: 'rgba(94,96,194,0.15)', border: '0.5px solid rgba(94,96,194,0.3)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#9596CF" strokeWidth="1.5"/>
          <path d="M12 8v4M12 16v.5" stroke="#9596CF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Text */}
      <h1 className='text-2xl font-semibold mb-2' style={{ color: 'white' }}>
        Page not found
      </h1>
      <p className='text-sm mb-8 max-w-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.45)' }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      {/* Buttons */}
      <div className='flex items-center gap-3 flex-wrap justify-center'>
        <button
          onClick={handleGoHome}
          className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border-none cursor-pointer hover:opacity-85 transition-opacity'
          style={{ background: '#5e60c2' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go to dashboard
        </button>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer hover:opacity-70 transition-opacity bg-transparent'
          style={{ border: '0.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M9 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go back
        </button>
      </div>

      {/* Bottom branding */}
      <div className='absolute bottom-8 flex items-center gap-2 opacity-30'>
        <div
          className='w-6 h-6 rounded-md flex items-center justify-center'
          style={{ background: '#5e60c2' }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
            <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
            <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
            <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
          </svg>
        </div>
        <span className='text-xs text-white font-medium'>TaskTrack</span>
      </div>
    </div>
  )
}