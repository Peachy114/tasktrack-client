import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function PillBar(props) {
  const { x, y, width, height, fill, striped } = props
  if (!height || height <= 0) return null
  const r = width / 2

  return (
    <g>
      {striped && (
        <defs>
          <pattern id='stripe' patternUnits='userSpaceOnUse' width='6' height='6' patternTransform='rotate(45)'>
            <rect width='6' height='6' fill='#E8F0FE' />
            <line x1='0' y1='0' x2='0' y2='6' stroke='#2979FF' strokeWidth='2.5' opacity='0.3' />
          </pattern>
        </defs>
      )}
      <rect
          x={x} y={y} width={width} height={height}
          rx={r} ry={r}
          fill={striped ? 'url(#stripe)' : fill}
          tabIndex={-1}
          style={{ outline: 'none' }}
        />
    </g>
  )
}

export default function TasksBarChart({ stats }) {
  const pending   = stats?.pending   ?? []
  const completed = stats?.completed ?? []
  const labels    = stats?.labels    ?? []

  const data = labels.map((label, i) => ({
    label,
    completed: completed[i] ?? 0,
    pending:   pending[i]   ?? 0,
  }))

  return (
    <div className='mt-5 flex flex-col gap-4'>
      <div className='flex gap-3'>
        <span className='flex items-center gap-1.5 text-xs text-gray-400'>
          <span className='w-2 h-2 rounded-full flex-shrink-0 bg-bg-secondary' />
          Completed
        </span>
        <span className='flex items-center gap-1.5 text-xs text-gray-400'>
          <span className='w-2 h-2 rounded-full flex-shrink-0' style={{ background: '#E8F0FE', border: '1px solid #2979FF' }} />
          Pending
        </span>
      </div>

      <ResponsiveContainer width='100%' height={200} style={{ outline: 'none' }}>
        <BarChart data={data} barGap={6} barCategoryGap='30%'>
          <XAxis
            dataKey='label'
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9B9B9B' }}
          />
          <Bar dataKey='completed' shape={(props) => <PillBar {...props} striped={false} fill='#2979FF' />} />
          <Bar dataKey='pending'   shape={(props) => <PillBar {...props} striped={true}  fill='#E8F0FE' />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}