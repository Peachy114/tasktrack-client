import { motion } from 'framer-motion'

export default function LoadingPage() {
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-bg-page'
    >
      {/* Soft background blobs */}
      <div
        className='absolute pointer-events-none rounded-full'
        style={{
          top: '-10%', left: '-10%',
          width: '45%', height: '45%',
          background: 'radial-gradient(circle, #E8F0FE 0%, transparent 70%)',
        }}
      />
      <div
        className='absolute pointer-events-none rounded-full'
        style={{
          bottom: '-10%', right: '-10%',
          width: '50%', height: '50%',
          background: 'radial-gradient(circle, #E8F0FE 0%, transparent 70%)',
        }}
      />

      {/* Logo box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='w-16 h-16 rounded-2xl flex items-center justify-center mb-5 relative z-10 bg-button-primary'
        style={{ boxShadow: '0 8px 32px rgba(41,121,255,0.25)' }}
      >
        <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1.5" fill="#ffffff"/>
          <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#ffffff" opacity="0.5"/>
          <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#ffffff" opacity="0.5"/>
          <rect x="9" y="9" width="5" height="5" rx="1.5" fill="#ffffff"/>
        </svg>
      </motion.div>

      {/* Brand name */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        className='text-base font-bold mb-10 relative z-10 text-text-primary'
        style={{ letterSpacing: '-0.01em' }}
      >
        TaskTrack
      </motion.p>

      {/* Animated dots spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='flex items-center gap-1.5 z-10'
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className='w-2 h-2 rounded-full bg-button-primary'
            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className='text-xs mt-6 relative z-10 text-text-gray'
        style={{ letterSpacing: '0.04em' }}
      >
        Loading your workspace…
      </motion.p>

    </div>
  )
}