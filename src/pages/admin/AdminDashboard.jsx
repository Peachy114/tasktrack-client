import '@/utils/chartSetup'
import { useMemo } from 'react'
import { taskService } from '../../services/taskServices'
import { POLL_INTERVAL } from '@/utils/constants'
import { useFirestoreTasks, useFirestoreUsers, usePolledData } from '@/hook/useDashboard'
import StatCard           from '@/components/shared/admin/dashboard/StatCard'
import ProgressRing       from '@/components/shared/admin/dashboard/ProgressRing'
import TeamPanel          from '@/components/shared/admin/dashboard/TeamPanel'
import TasksBarChart      from '@/components/shared/admin/dashboard/TasksBarChart'
import CompletionTrendChart from '@/components/shared/admin/dashboard/CompletionTrendChart'
import Activity           from '@/components/shared/admin/dashboard/Activity'

export default function AdminDashboard() {
  const liveTasks   = useFirestoreTasks()
  const liveUsers   = useFirestoreUsers()
  const polledTasks = usePolledData(taskService.getAll, POLL_INTERVAL)

  const stats = useMemo(() => {
    const total          = liveTasks.length
    const doneTasks      = liveTasks.filter(t => t.status === 'done').length
    const activeTasks    = liveTasks.filter(t => t.status === 'in_progress').length
    const pendingTasks   = liveTasks.filter(t => t.status === 'backlog').length
    const completionRate = total > 0 ? Math.round((doneTasks / total) * 100) : 0
    const r    = 52
    const circ = 2 * Math.PI * r
    return {
      total, doneTasks, activeTasks, pendingTasks, completionRate, r, circ,
      doneOffset:     circ - (doneTasks / (total || 1)) * circ,
      progressOffset: circ - ((doneTasks + activeTasks) / (total || 1)) * circ,
    }
  }, [liveTasks])

  // statCards uses stats values
  const statCards = [
    {
      label: 'Total Tasks', value: stats.total, sub: 'All tasks',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12h8M8 8h5M8 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      iconBg: 'bg-tt-indigo-light', iconColor: 'text-tt-indigo',
      valueCls: 'text-tt-indigo', subCls: 'bg-tt-indigo-light text-tt-indigo',
    },
    {
      label: 'In Progress', value: stats.activeTasks, sub: 'Active now',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      iconBg: 'bg-tt-orange-light', iconColor: 'text-tt-orange',
      valueCls: 'text-tt-orange', subCls: 'bg-tt-orange-light text-tt-orange',
    },
    {
      label: 'Completed', value: stats.doneTasks, sub: `${stats.completionRate}% rate`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: 'bg-tt-purple-light', iconColor: 'text-tt-purple',
      valueCls: 'text-tt-purple', subCls: 'bg-tt-purple-light text-tt-purple',
    },
  ]

  return (
    <div className='min-h-screen flex flex-col gap-4 pb-20'>
      <div className='px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full'>

        

        <Activity />

        {/*  map over statCards, spread each object as props into StatCard */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5'>
          {statCards.map((card, i) => <StatCard key={i} {...card} />)}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5'>
          <TasksBarChart tasks={polledTasks} />
          <CompletionTrendChart tasks={polledTasks} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-2'>
          <ProgressRing {...stats} />
          <TeamPanel users={liveUsers} />
        </div>

      </div>
    </div>
  )
}