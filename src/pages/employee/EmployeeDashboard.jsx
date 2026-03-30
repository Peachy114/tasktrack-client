import { useState, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getToken } from '../../utils/getToken'
import { useMyLiveTasks } from '@/hook/useMyLiveTasks'
import EmployeeStatsRow       from '@/components/shared/employee/EmployeeStatsRow'
import EmployeeProgressBar    from '@/components/shared/employee/EmployeeProgressBar'
import EmployeeBoardToolbar   from '@/components/shared/employee/EmployeeBoardToolbar'
import EmployeeKanbanColumn   from '@/components/shared/employee/EmployeeKanbanColumn'

const COLUMNS = [
  { key: 'backlog',     label: 'To Do',      bgCls: 'bg-tt-col-backlog-bg',   dot: 'bg-tt-col-backlog-dot',   accentCls: 'text-tt-col-backlog-accent',  countCls: 'bg-tt-col-backlog-count',  accent: '#185FA5' },
  { key: 'in_progress', label: 'In Progress', bgCls: 'bg-tt-col-progress-bg', dot: 'bg-tt-col-progress-dot', accentCls: 'text-tt-col-progress-accent', countCls: 'bg-tt-col-progress-count', accent: '#EA580C' },
  { key: 'done',        label: 'Done',        bgCls: 'bg-tt-col-done-bg',     dot: 'bg-tt-col-done-dot',     accentCls: 'text-tt-col-done-accent',     countCls: 'bg-tt-col-done-count',     accent: '#006644' },
]

export default function EmployeeDashboard() {
  const { currentUser } = useAuth()
  const tasks = useMyLiveTasks(currentUser?.uid)

  const [dragOver, setDragOver] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [search,   setSearch]   = useState('')
  const [error,    setError]    = useState(null)

  const total      = tasks.length
  const done       = useMemo(() => tasks.filter(t => t.status === 'done').length,        [tasks])
  const inProgress = useMemo(() => tasks.filter(t => t.status === 'in_progress').length, [tasks])
  const todo       = useMemo(() => tasks.filter(t => t.status === 'backlog').length,      [tasks])
  const percent    = total > 0 ? Math.round((done / total) * 100) : 0

  const filteredTasks = useMemo(() =>
    tasks.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
    ), [tasks, search])

  const handleStatusUpdate = async (taskId, status) => {
    try {
      setError(null)
      const token = await getToken()
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}/status`,
        { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) }
      )
      if (!res.ok) throw new Error('Failed to update status')
    } catch (err) { setError(err.message) }
  }

  const toggleExpand = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  const STATS = [
    { label: 'Total Tasks', value: total,      colorCls: 'text-tt-primary',             bgCls: 'bg-tt-primary-light'      },
    { label: 'In Progress', value: inProgress, colorCls: 'text-tt-col-progress-accent', bgCls: 'bg-tt-col-progress-count' },
    { label: 'Completed',   value: done,        colorCls: 'text-tt-done-text',           bgCls: 'bg-tt-done-bg'            },
    { label: 'To Do',       value: todo,        colorCls: 'text-tt-col-backlog-accent',  bgCls: 'bg-tt-col-backlog-count'  },
  ]

  return (
    <div className='min-h-screen'>
      <div className='px-4 sm:px-6 py-5 max-w-7xl mx-auto'>

        {/* Header */}
        <div className='mb-5 flex items-end justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-tt-white'>My Tasks</h1>
            <p className='text-xs mt-0.5 text-white/60'>
              {filteredTasks.length} of {total} tasks assigned to you
            </p>
          </div>
          <span className='flex items-center gap-1.5 text-[10px] font-semibold text-tt-done-text bg-tt-done-bg px-2 py-0.5 rounded-full'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-tt-done-text opacity-75'/>
              <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-tt-done-text'/>
            </span>
            Live
          </span>
        </div>

        {error && <p className='text-xs mb-4 px-3 py-2 rounded-lg font-medium bg-tt-backlog-bg text-red-600'>{error}</p>}

        <EmployeeStatsRow stats={STATS} />
        <EmployeeProgressBar done={done} total={total} percent={percent} />

        {/* Board */}
        <div className='rounded-2xl bg-tt-bg-card border border-tt-border overflow-hidden'>
          <EmployeeBoardToolbar
            filteredCount={filteredTasks.length}
            search={search} setSearch={setSearch}
          />

          <div className='grid grid-cols-1 sm:grid-cols-3'>
            {COLUMNS.map((col, ci) => (
              <EmployeeKanbanColumn
                key={col.key} col={col} ci={ci}
                tasks={filteredTasks.filter(t => t.status === col.key)}
                search={search} expanded={expanded} dragOver={dragOver}
                onToggleExpand={toggleExpand}
                onStatusUpdate={handleStatusUpdate}
                onDragOver={e => { e.preventDefault(); setDragOver(col.key) }}
                onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null) }}
                onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData('taskId'); if (id) handleStatusUpdate(id, col.key); setDragOver(null) }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}