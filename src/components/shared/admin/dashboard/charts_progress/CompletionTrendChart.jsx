import { Line } from 'react-chartjs-2'
import { useRef } from 'react'
import { C, chartDefaults } from '@/utils/constants'

export default function CompletionTrendChart({ stats }) {
  const chartRef   = useRef(null)
  const labels     = stats?.labels     ?? []
  const inProgress = stats?.inProgress ?? []
  const completed  = stats?.completed  ?? []

  function createGradient(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    return gradient
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Completed',
        data: completed,
        borderColor: '#00C48C',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(0,196,140,0.15)'
          return createGradient(ctx, 'rgba(0, 196, 140, 0.4)')
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#00C48C',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'In Progress',
        data: inProgress,
        borderColor: '#2979FF',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(41,121,255,0.15)'
          return createGradient(ctx, 'rgba(41, 121, 255, 0.4)')
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#2979FF',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    ...chartDefaults,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: C.tick,
          font: { size: 10 },
          boxWidth: 10,
          boxHeight: 10,
          useBorderRadius: true,
          borderRadius: 2,
        },
      },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      ...chartDefaults.scales,
      y: {
        ...chartDefaults.scales.y,
        ticks: {
          ...chartDefaults.scales.y.ticks,
          stepSize: 1,
          callback: (value) => Number.isInteger(value) ? value : null,
        },
      },
    },
  }

  return (
    <div className='relative w-full h-52 mt-5'>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  )
}