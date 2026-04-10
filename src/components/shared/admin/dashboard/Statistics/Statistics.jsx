// Statistics.jsx
import React, { useEffect, useState } from 'react'
import StatsCard from './StatsCard'
import { taskService } from '@/services/taskServices'
import { getToken } from '@/utils/getToken'
import StatsSkeleton from '@/components/ui/StatsSkeleton'

const STAT_CONFIG = [
  { key: 'total',          title: 'Total Tasks',       subtitle: 'All tasks in the system',   icon: 'total'       },
  { key: 'completed',      title: 'Tasks Completed',   subtitle: 'Tasks marked as done',      icon: 'completed'   },
  { key: 'inProgress',     title: 'Tasks In Progress', subtitle: 'Currently being worked on', icon: 'in_progress' },
  { key: 'pending',        title: 'Pending Tasks',     subtitle: 'Tasks in backlog',          icon: 'pending'     },
  { key: 'completionRate', title: 'Completion Rate',   subtitle: 'Percentage of tasks done',  icon: 'rate'        },
]


export default function Statistics() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getToken().then(token =>
      taskService.getTaskStats(token).then(data => {
        const total = data.total || 1

        const changes = {
          total:          undefined,
          completed:      Math.round((data.completed      / total) * 100),
          inProgress:     Math.round((data.inProgress     / total) * 100),
          pending:        Math.round((data.pending        / total) * 100),
          completionRate: undefined,
        }

        setStats({ ...data, changes })
      })
    ).catch(console.error)
  }, [])

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
      {!stats ? (
        <StatsSkeleton />
      ) : (
        STAT_CONFIG.map(({ key, title, subtitle, icon }) => (
          <StatsCard
            key={key}
            title={title}
            value={key === 'completionRate' ? `${stats[key]}%` : stats[key]}
            subtitle={subtitle}
            icon={icon}
            change={stats.changes?.[key]}
          />
        ))
      )}
    </div>
  )
}