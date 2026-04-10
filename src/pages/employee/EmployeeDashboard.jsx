import { useState, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getToken } from '../../utils/getToken'
import { useMyLiveTasks } from '@/hook/useMyLiveTasks'
import EmployeeStatsRow       from '@/components/shared/employee/EmployeeStatsRow'
import EmployeeProgressBar    from '@/components/shared/employee/EmployeeProgressBar'
import EmployeeBoardToolbar   from '@/components/shared/employee/EmployeeBoardToolbar'
import EmployeeKanbanColumn   from '@/components/shared/employee/EmployeeKanbanColumn'

const COLUMNS = [
  { key: 'backlog',     label: 'To Do',       accent: '#9B9B9B' },
  { key: 'in_progress', label: 'In Progress', accent: '#2979FF' },
  { key: 'done',        label: 'Done',        accent: '#00C48C' },
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
    { label: 'Total Tasks', value: total,      colorCls: 'text-text-blue',    bgCls: 'bg-bg-light-blue'  },
    { label: 'In Progress', value: inProgress, colorCls: 'text-warning',      bgCls: 'bg-bg-page'        },
    { label: 'Completed',   value: done,        colorCls: 'text-success',      bgCls: 'bg-bg-page'        },
    { label: 'To Do',       value: todo,        colorCls: 'text-text-gray',    bgCls: 'bg-bg-page'        },
  ]

  return (
    <div className='min-h-screen'>
      <div className='px-4 sm:px-6 py-5 max-w-7xl mx-auto'>

        {/* Header */}
        <div className='mb-5 flex items-end justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-text-primary'>My Workspace</h1>
            <p className='text-xs mt-0.5 text-text-gray'>
              Here's what you need to focus on today.
            </p>
          </div>
          <span className='flex items-center gap-1.5 text-[10px] font-semibold text-success bg-bg-page px-2 py-0.5 rounded-full border border-border-primary'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75'/>
              <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-success'/>
            </span>
            Live
          </span>
        </div>

        {error && (
          <p className='text-xs mb-4 px-3 py-2 rounded-lg font-medium bg-bg-page border border-danger text-danger'>
            {error}
          </p>
        )}

        <EmployeeStatsRow stats={STATS} />
        <EmployeeProgressBar done={done} total={total} percent={percent} />

        {/* Board */}
        <div className='rounded-2xl bg-bg-primary border border-border-primary overflow-hidden'>
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