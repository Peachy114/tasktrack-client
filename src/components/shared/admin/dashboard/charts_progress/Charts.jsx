import React, { useState } from 'react'
import '@/utils/chartSetup'
import { taskService } from '@/services/taskServices'
import { POLL_INTERVAL } from '@/utils/constants'
import { usePolledData } from '@/hook/useDashboard'
import { useDashboardStats } from '@/hook/useDashboardStats'
import TasksBarChart from './TasksBarChart'
import CompletionTrendChart from './CompletionTrendChart'
import ProgressRing from './ProgressRing'
import { Bar_Chart } from '@/components/ui/Icons'
import ProgressRingSkeleton from '@/components/ui/Progressringskeleton'

const VIEWS = [
  { key: 'bar',   label: 'Bar Chart' },
  { key: 'trend', label: 'Completion Trend' },
]

export default function Charts() {
  const [view, setView] = useState('bar')

  const polledStats   = usePolledData(taskService.getMonthlyStats, POLL_INTERVAL)
  const polledSummary = usePolledData(taskService.getTaskStats,    POLL_INTERVAL)
  const { stats }     = useDashboardStats(polledSummary)

  return (
    <div className='bg-bg-primary rounded-2xl border border-border-primary overflow-hidden h-full'>
      <div className='flex flex-col lg:grid lg:grid-cols-3'>

        {/* Chart — full width on mobile, 2/3 on desktop */}
        <div className='lg:col-span-2 p-5 lg:border-r border-border-primary'>
          <div className='flex justify-between items-start mb-1'>
            <div>
              <p className='text-text-primary font-bold text-base'>Monthly Productivity</p>
              <p className='text-text-gray text-xs mt-0.5'>Track task progress and completion rates over time.</p>
            </div>

            <button className='flex items-center gap-2 text-xs text-text-gray bg-bg-page px-3 py-1.5 rounded-xl flex-shrink-0'>
              <Bar_Chart fill='none' />
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className='bg-transparent outline-none text-text-gray text-xs cursor-pointer'
              >
                {VIEWS.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </button>
          </div>

          {view === 'bar'   && <TasksBarChart stats={polledStats} />}
          {view === 'trend' && <CompletionTrendChart stats={polledStats} />}
        </div>

        {/* ProgressRing — below chart on mobile, right column on desktop */}
        {/* ProgressRing — below chart on mobile, right column on desktop */}
        <div className='lg:col-span-1 p-5 border-t lg:border-t-0 border-border-primary'>
          {polledSummary
            ? <ProgressRing {...stats} />
            : <ProgressRingSkeleton />
          }
        </div>

      </div>
    </div>
  )
}