import '@/utils/chartSetup';
import { useMemo } from 'react';
import { taskService } from '../../services/taskServices';
import { POLL_INTERVAL } from '@/utils/constants';
import { useFirestoreUsers, usePolledData } from '@/hook/useDashboard';
import StatCard             from '@/components/shared/admin/dashboard/StatCard';
import ProgressRing         from '@/components/shared/admin/dashboard/ProgressRing';
import TeamPanel            from '@/components/shared/admin/dashboard/TeamPanel';
import TasksBarChart        from '@/components/shared/admin/dashboard/TasksBarChart';
import CompletionTrendChart from '@/components/shared/admin/dashboard/CompletionTrendChart';
import Activity             from '@/components/shared/admin/dashboard/Activity';

export default function AdminDashboard() {
  const liveUsers      = useFirestoreUsers();
  const polledStats    = usePolledData(taskService.getMonthlyStats, POLL_INTERVAL);
  const polledSummary  = usePolledData(taskService.getTaskStats, POLL_INTERVAL);

  const stats = useMemo(() => {
    const total          = polledSummary?.total          ?? 0
    const doneTasks      = polledSummary?.completed      ?? 0
    const activeTasks    = polledSummary?.inProgress     ?? 0
    const pendingTasks   = polledSummary?.pending        ?? 0
    const completionRate = polledSummary?.completionRate ?? 0
    const r    = 52
    const circ = 2 * Math.PI * r
    return {
      total, doneTasks, activeTasks, pendingTasks, completionRate, r, circ,
      doneOffset:     circ - (doneTasks / (total || 1)) * circ,
      progressOffset: circ - ((doneTasks + activeTasks) / (total || 1)) * circ,
    }
  }, [polledSummary])

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
    <div className='min-h-screen pb-28 p-0'>

      {/* HEADER */}
      <div className='px-4 sm:px-6 pt-8 pb-4'>
        <h3 className='text-tt-text-muted text-sm'>Overview</h3>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white'>
          Dashboard
        </h1>
      </div>

      {/* MAIN CONTENT — single column on mobile, side-by-side on lg+ */}
      <div className='flex flex-col lg:grid lg:grid-cols-3 gap-0'>

        {/* Activity panel — full width on mobile, 1 col on lg */}
        <div className='px-4 sm:px-6 py-4 w-full'>
          <Activity />
        </div>

        {/* Right content — full width on mobile, 2 cols on lg */}
        <div className='px-4 sm:px-6 py-4 w-full lg:col-span-2'>

          {/* Stat cards — 1 col mobile, 3 col lg */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4'>
            {statCards.map((card, i) => <StatCard key={i} {...card} />)}
          </div>

          {/* Charts — 1 col mobile, 2 col lg */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4'>
            <TasksBarChart stats={polledStats} />
            <CompletionTrendChart stats={polledStats} />
          </div>

          {/* Progress + Team — 1 col mobile, 2 col lg */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <ProgressRing {...stats} />
            <TeamPanel users={liveUsers} />
          </div>

        </div>
      </div>
    </div>
  )
}