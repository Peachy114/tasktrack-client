import { Line } from 'react-chartjs-2'
import { C, chartDefaults } from '../../../../utils/constants'
import LiveBadge from './LiveBadge'

export default function CompletionTrendChart({ stats }) {
const labels     = stats?.labels     ?? []
const inProgress = stats?.inProgress ?? []
const completed  = stats?.completed  ?? []

  const data = {
    labels,
    datasets: [
      {
        label: 'Completed',
        data: completed,
        borderColor: C.indigo, backgroundColor: C.indigoAlpha,
        borderWidth: 2, pointRadius: 4, pointBackgroundColor: C.indigo,
        fill: true, tension: 0.4,
      },
      {
        label: 'In Progress',
        data: inProgress,
        borderColor: C.purple, backgroundColor: C.purpleAlpha,
        borderWidth: 2, pointRadius: 4, pointBackgroundColor: C.purple,
        fill: true, tension: 0.4,
      },
    ],
  }

  const options = {
    ...chartDefaults,
    plugins: {
      legend: {
        display: true,
        labels: { color: C.tick, font: { size: 10 }, boxWidth: 10, boxHeight: 10, useBorderRadius: true, borderRadius: 2 },
      },
    },
  }

  return (
    <div className='bg-tt-bg-card rounded-3xl p-5 shadow-[var(--tt-shadow-card)]'>
      <div className='mb-4'>
        <div className='flex items-center gap-2 mb-0.5'>
          <p className='text-sm font-bold text-tt-text'>Completion</p>
          <LiveBadge />
        </div>
        <p className='text-xs text-tt-text-muted'>Tasks completed over time · auto-updates every 10s</p>
      </div>
      <div className='relative w-full h-52'>
        <Line data={data} options={options}/>
      </div>
    </div>
  )
}