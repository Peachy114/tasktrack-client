const CARDS = {
  total:       { color: '#2979FF' },
  completed:   { color: '#00C48C' },
  in_progress: { color: '#a855f7' },
  pending:     { color: '#FFB800' },
  rate:        { color: '#ff8a75' },
}

export default function StatsCard({ title, value, subtitle, icon = 'total', change }) {
  const card = CARDS[icon] ?? CARDS.total

  return (
    <div className='bg-bg-primary p-5 rounded-2xl border border-border-primary hover:-translate-y-0.5 transition-all cursor-pointer relative overflow-hidden'>

      {/* Top row */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full' style={{ background: card.color }} />
          <p className='text-xs font-medium text-text-primary'>{title}</p>
        </div>
      </div>

      {/* Value + optional change badge */}
      <div className='flex items-baseline gap-2 mb-2'>
        <p className='font-bold text-text-primary leading-none' style={{ fontSize: '32px' }}>
          {typeof value === 'string' && value.endsWith('%')
            ? <>
                {value.replace('%', '')}
                <span style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: card.color,
                  background: `${card.color}18`,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  marginLeft: '4px',
                }}>
                  %
                </span>
              </>
            : typeof value === 'number' ? value.toLocaleString() : value
          }
        </p>
        {change !== undefined && (
          <span
            className='text-[11px] font-semibold px-1.5 py-0.5 rounded-md'
            style={{
              background: change >= 0 ? `${card.color}18` : 'rgba(255,77,77,0.12)',
              color:      change >= 0 ? card.color         : '#FF6B6B',
            }}
          >
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && <p className='text-xs text-text-gray'>{subtitle}</p>}

      {/* Bottom accent line */}
      <div
        className='absolute bottom-0 left-0 right-0 h-0.5'
        style={{ background: card.color, opacity: 0.4 }}
      />
    </div>
  )
}