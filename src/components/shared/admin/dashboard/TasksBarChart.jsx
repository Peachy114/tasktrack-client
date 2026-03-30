import { Bar } from 'react-chartjs-2'
import { C, chartDefaults } from '../../../../utils/constants'
import LiveBadge from './LiveBadge'
import ChartLegend from './ChartLegend'

export default function TasksBarChart({ stats }) {
  const labels     = stats?.labels     ?? []
  const pending    = stats?.pending    ?? []
  const inProgress = stats?.inProgress ?? []
  const completed  = stats?.completed  ?? []

  const data = {
    labels,
    datasets: [
      { label: 'Pending',     data: pending,    backgroundColor: C.red,    borderRadius: 4, borderSkipped: false },
      { label: 'In Progress', data: inProgress, backgroundColor: C.orange, borderRadius: 4, borderSkipped: false },
      { label: 'Completed',   data: completed,  backgroundColor: C.green,  borderRadius: 4, borderSkipped: false },
    ],
  }

  const options = {
    ...chartDefaults,
    scales: {
      x: { ...chartDefaults.scales.x, stacked: true },
      y: { ...chartDefaults.scales.y, stacked: true },
    },
  }

  return (
    <div className='bg-tt-bg-card rounded-3xl p-5 shadow-[var(--tt-shadow-card)]'>
      <div className='flex items-start justify-between mb-4 gap-2 flex-wrap'>
        <div>
          <div className='flex items-center gap-2 mb-0.5'>
            <p className='text-sm font-bold text-tt-text'>Tasks per Month</p>
            <LiveBadge />
          </div>
          <p className='text-xs text-tt-text-muted'>Last 6 months · auto-updates every 10s</p>
        </div>
        <ChartLegend items={[
          { label: 'Pending',     color: C.red    },
          { label: 'In Progress', color: C.orange },
          { label: 'Completed',   color: C.green  },
        ]}/>
      </div>
      <div className='relative w-full h-52'>
        <Bar data={data} options={options}/>
      </div>
    </div>
  )
}