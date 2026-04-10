const STAT_CONFIG = {
  'Total Tasks': {
    accent: '#2979FF',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6"  x2="21" y2="6"  />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6"  x2="3.01" y2="6"  />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  'In Progress': {
    accent: '#2979FF',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  'Completed': {
    accent: '#00C48C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  'To Do': {
    accent: '#ff8a75',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8"  x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
}

export default function EmployeeStatsRow({ stats }) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4'>
      {stats.map(stat => {
        const cfg    = STAT_CONFIG[stat.label] ?? {}
        const accent = cfg.accent ?? '#E0E0E0'
        return (
          <div
            key={stat.label}
            className='rounded-xl px-4 py-3 flex items-center gap-4 border border-border-primary'
          >
            {/* Icon box */}
            <div
              className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
              style={{ background: accent }}
            >
              {cfg.icon}
            </div>

            {/* Text */}
            <div>
              <p className='text-xs text-text-gray'>{stat.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${stat.colorCls}`}>{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}