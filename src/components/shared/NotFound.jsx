import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

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
      style={{ background: 'linear-gradient(160deg, #13131E 0%, #1C1C28 50%, #1a2744 100%)' }}
    >

      {/* Animated background blobs */}
      <motion.div
        className='absolute pointer-events-none rounded-full'
        style={{
          top: '-10%', left: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(41,121,255,0.08) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute pointer-events-none rounded-full'
        style={{
          bottom: '-10%', right: '-5%', width: '45%', height: '45%',
          background: 'radial-gradient(circle, rgba(91,155,255,0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full pointer-events-none'
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: 'rgba(91,155,255,0.3)',
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}

      {/* 404 */}
      <motion.div
        className='relative mb-4 select-none z-10'
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p
          className='font-bold leading-none'
          style={{
            fontSize: '140px',
            color: 'rgba(226,226,238,0.04)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          404
        </p>
        <motion.p
          className='font-bold leading-none absolute inset-0 flex items-center justify-center'
          style={{
            fontSize: '140px',
            background: 'linear-gradient(135deg, #E2E2EE 0%, #5B9BFF 60%, rgba(91,155,255,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.05em',
          }}
          animate={{ opacity: [1, 0.75, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.p>
      </motion.div>

      {/* Icon */}
      <motion.div
        className='w-14 h-14 rounded-2xl flex items-center justify-center mb-6 z-10'
        style={{
          background: 'rgba(41,121,255,0.12)',
          border: '1px solid rgba(91,155,255,0.25)',
          backdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'backOut' }}
      >
        <motion.svg
          width='26' height='26' viewBox='0 0 24 24' fill='none'
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 0.6, delay: 1.2, ease: 'easeInOut' }}
        >
          <circle cx='12' cy='12' r='10' stroke='#5B9BFF' strokeWidth='1.5'/>
          <path d='M12 8v4M12 16v.5' stroke='#5B9BFF' strokeWidth='2' strokeLinecap='round'/>
        </motion.svg>
      </motion.div>

      {/* Text */}
      <motion.h1
        className='text-2xl font-bold mb-2 z-10'
        style={{ color: '#E2E2EE', letterSpacing: '-0.02em' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Page not found
      </motion.h1>

      <motion.p
        className='text-sm mb-10 max-w-sm leading-relaxed z-10'
        style={{ color: 'rgba(139,139,168,0.9)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className='flex items-center gap-3 flex-wrap justify-center z-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.button
          onClick={handleGoHome}
          className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer'
          style={{
            background: '#2979FF',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 4px 20px rgba(41,121,255,0.35)',
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
            <path d='M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
          Go to dashboard
        </motion.button>

        <motion.button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer'
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#E2E2EE',
          }}
          whileHover={{ scale: 1.05, y: -2, background: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
            <path d='M19 12H5M9 6l-6 6 6 6' stroke='#E2E2EE' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
          Go back
        </motion.button>
      </motion.div>

      {/* Bottom branding */}
      <motion.div
        className='absolute bottom-8 flex items-center gap-2 z-10'
        style={{ opacity: 0.45 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className='w-6 h-6 rounded-lg flex items-center justify-center' style={{ background: 'rgba(41,121,255,0.2)', border: '1px solid rgba(91,155,255,0.2)' }}>
          <svg width='12' height='12' viewBox='0 0 16 16' fill='none'>
            <rect x='2' y='2' width='5' height='5' rx='1.5' fill='#5B9BFF'/>
            <rect x='9' y='2' width='5' height='5' rx='1.5' fill='#5B9BFF' opacity='0.5'/>
            <rect x='2' y='9' width='5' height='5' rx='1.5' fill='#5B9BFF' opacity='0.5'/>
            <rect x='9' y='9' width='5' height='5' rx='1.5' fill='#5B9BFF'/>
          </svg>
        </div>
        <span className='text-xs font-semibold' style={{ color: '#8B8BA8' }}>TaskTrack</span>
      </motion.div>

    </div>
  )
}