// import React, { useEffect } from 'react'
// import { useStatus } from '../../hook/useStatus'
// import { useFetch } from '../../hook/useFetch'
// import { taskService } from '../../services/taskServices'
// import { getToken } from '../../utils/getToken'

// export default function EmployeeDashboard() {
//   const { error } = useStatus();
//   const { data: tasks, fetch: fetchTasks } = useFetch(taskService.getMy);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   const handleStatusUpdate = async (taskId, status) => {
//     try {
//       const token = await getToken();
//       await taskService.updateStatus(token, taskId, status);
//       fetchTasks();
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   return (
//     <div>
//       <h1>Employee Dashboard</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <h2>My Tasks</h2>
//       {tasks.length === 0
//         ? <p>No tasks assigned yet!</p>
//         : <table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th>Update Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map(task => (
//                 <tr key={task.id}>
//                   <td>{task.title}</td>
//                   <td>{task.description}</td>
//                   <td>{task.status}</td>
//                   <td>
//                     <select
//                       value={task.status}
//                       onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
//                     >
//                       <option value='backlog'>Backlog</option>
//                       <option value='in_progress'>In Progress</option>
//                       <option value='done'>Done</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//       }
//     </div>
//   )
// }



import { useEffect, useState } from 'react'
import { useStatus } from '../../hook/useStatus'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { getToken } from '../../utils/getToken'
import EmployeeTaskCard from '@/components/shared/employee/TaskCard'

const COLUMNS = [
  {
    key:     'backlog',
    label:   'To Do',
    colBg:   'var(--tt-col-backlog-bg)',
    accent:  '#185FA5',
    countBg: '#EEF5FF',
  },
  {
    key:     'in_progress',
    label:   'In Progress',
    colBg:   'var(--tt-col-progress-bg)',
    accent:  '#f97316',
    countBg: '#fff7ed',
  },
  {
    key:     'done',
    label:   'Done',
    colBg:   'var(--tt-col-done-bg)',
    accent:  '#22c55e',
    countBg: '#f0fdf4',
  },
]

const MAX_VISIBLE = 5

export default function EmployeeDashboard() {
  const { error } = useStatus()
  const { data: tasks, fetch: fetchTasks } = useFetch(taskService.getMy)
  const [dragOver, setDragOver] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [search,   setSearch]   = useState('')

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const handleStatusUpdate = async (taskId, status) => {
    try {
      const token = await getToken()
      await taskService.updateStatus(token, taskId, status)
      fetchTasks()
    } catch (err) { console.log(err.message) }
  }

  const toggleExpand = (key) => setExpanded({ ...expanded, [key]: !expanded[key] })

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase())
  )

  // ── Stats ──
  const total      = tasks.length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const done       = tasks.filter(t => t.status === 'done').length
  const percent    = total === 0 ? 0 : Math.round((done / total) * 100)

  const stats = [
    {
      label:   'Total Tasks',
      value:   total,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="4" height="10" rx="1.5" fill="currentColor" opacity=".4"/>
          <rect x="6" y="1" width="4" height="12" rx="1.5" fill="currentColor" opacity=".7"/>
          <rect x="11" y="5" width="4" height="8"  rx="1.5" fill="currentColor"/>
        </svg>
      ),
      accent:  'var(--tt-primary)',
      bg:      'var(--tt-primary-light)',
    },
    {
      label:   'In Progress',
      value:   inProgress,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      accent:  '#f97316',
      bg:      '#fff7ed',
    },
    {
      label:   'Completion',
      value:   `${percent}%`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" opacity=".3"/>
          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent:  '#22c55e',
      bg:      '#f0fdf4',
      // show progress bar only on this card
      progress: percent,
    },
  ]

  return (
    <div className='min-h-screen' style={{ background: 'var(--tt-bg)' }}>
      <div className='px-6 py-6 max-w-7xl mx-auto'>

        {/* ── Page header ── */}
        <div className='flex items-center justify-between mb-5'>
          <div>
            <p className='text-xs font-medium mb-0.5' style={{ color: 'var(--tt-text-hint)' }}>Board</p>
            <h1 className='text-2xl font-bold' style={{ color: 'var(--tt-primary)' }}>My Tasks</h1>
            <p className='text-xs mt-0.5' style={{ color: 'var(--tt-text-muted)' }}>
              {filteredTasks.length} of {tasks.length} tasks assigned to you
            </p>
          </div>
        </div>

        {error && <p className='text-red-500 text-xs mb-4'>{error}</p>}

        {/* ── Stats row ── */}
        <div className='grid grid-cols-3 gap-3 mb-5'>
          {stats.map(stat => (
            <div key={stat.label}
              className='rounded-xl p-4'
              style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>

              {/* Top row */}
              <div className='flex items-center justify-between mb-3'>
                <p className='text-xs font-medium' style={{ color: 'var(--tt-text-muted)' }}>
                  {stat.label}
                </p>
                <div className='w-7 h-7 rounded-lg flex items-center justify-center'
                  style={{ background: stat.bg, color: stat.accent }}>
                  {stat.icon}
                </div>
              </div>

              {/* Value */}
              <p className='text-2xl font-bold' style={{ color: stat.accent }}>
                {stat.value}
              </p>

              {/* Progress bar — only for completion */}
              {stat.progress !== undefined && (
                <div className='mt-2.5'>
                  <div className='w-full rounded-full overflow-hidden'
                    style={{ height: 4, background: 'var(--tt-border)' }}>
                    <div className='h-full rounded-full transition-all duration-500'
                      style={{ width: `${stat.progress}%`, background: stat.accent }}/>
                  </div>
                  <p className='text-xs mt-1' style={{ color: 'var(--tt-text-hint)' }}>
                    {done} of {total} done
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Board card ── */}
        <div className='rounded-2xl'
          style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>

          {/* Toolbar */}
          <div className='flex items-center justify-between px-5 py-3'
            style={{ borderBottom: '1px solid var(--tt-border)', background: 'var(--tt-bg-muted)' }}>

            <div className='flex items-center gap-2'>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="4" height="10" rx="1.5" fill="var(--tt-primary)" opacity=".4"/>
                <rect x="6" y="1" width="4" height="12" rx="1.5" fill="var(--tt-primary)" opacity=".7"/>
                <rect x="11" y="5" width="4" height="8"  rx="1.5" fill="var(--tt-primary)"/>
              </svg>
              <p className='text-sm font-semibold' style={{ color: 'var(--tt-primary)' }}>Task Board</p>
              <span className='text-xs px-2 py-0.5 rounded-full font-medium'
                style={{ background: 'var(--tt-border)', color: 'var(--tt-primary)' }}>
                {filteredTasks.length} tasks
              </span>
            </div>

            {/* Search */}
            <div className='relative'>
              <svg className='absolute left-2.5 top-1/2 -translate-y-1/2' width="11" height="11" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="var(--tt-text-muted)" strokeWidth="1.5"/>
                <path d="M10 10l3.5 3.5" stroke="var(--tt-text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type='text' placeholder='Search tasks…' value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-40'
                style={{ border: '1px solid var(--tt-border)', color: 'var(--tt-text)', background: 'var(--tt-bg-card)' }}/>
            </div>
          </div>

          {/* ── Kanban columns ── */}
          <div className='grid grid-cols-3 gap-0'>
            {COLUMNS.map((col, ci) => {
              const colTasks   = filteredTasks.filter(t => t.status === col.key)
              const isExpanded = expanded[col.key]
              const visible    = isExpanded ? colTasks : colTasks.slice(0, MAX_VISIBLE)
              const remaining  = colTasks.length - MAX_VISIBLE
              const isOver     = dragOver === col.key

              return (
                <div key={col.key}
                  className='p-3 transition-all'
                  style={{
                    borderRight:   ci < 2 ? '1px solid var(--tt-border)' : 'none',
                    background:    col.colBg,
                    outline:       isOver ? `2px dashed ${col.accent}` : '2px dashed transparent',
                    outlineOffset: '-3px',
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(col.key) }}
                  onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null) }}
                  onDrop={(e) => {
                    e.preventDefault()
                    const taskId = e.dataTransfer.getData('taskId')
                    if (taskId) handleStatusUpdate(taskId, col.key)
                    setDragOver(null)
                  }}>

                  {/* Column header */}
                  <div className='flex items-center gap-1.5 mb-2.5 px-0.5'>
                    <div className='w-2.5 h-2.5 rounded-full' style={{ background: col.accent }}/>
                    <span className='text-xs font-bold' style={{ color: col.accent }}>{col.label}</span>
                    <span className='text-xs ml-auto px-2 py-0.5 rounded-full font-semibold'
                      style={{ color: col.accent, background: col.countBg, border: `1px solid ${col.accent}22` }}>
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Task cards */}
                  {visible.map(task => (
                    <EmployeeTaskCard key={task.id} task={task} />
                  ))}


                  {/* Empty state */}
                  {colTasks.length === 0 && (
                    <div className='rounded-xl py-10 text-center'
                      style={{ border: `1px dashed ${col.accent}44` }}>
                      <div className='w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center'
                        style={{ background: col.countBg }}>
                        <div className='w-3 h-3 rounded-full' style={{ background: col.accent, opacity: 0.4 }}/>
                      </div>
                      <p className='text-xs font-medium' style={{ color: 'var(--tt-text-hint)' }}>
                        {search ? 'No matching tasks' : 'No tasks here'}
                      </p>
                    </div>
                  )}

                  {/* Show more / less */}
                  {!isExpanded && remaining > 0 && (
                    <button onClick={() => toggleExpand(col.key)}
                      className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 bg-transparent font-medium'
                      style={{ color: col.accent, border: `1px dashed ${col.accent}66` }}>
                      + {remaining} more
                    </button>
                  )}

                  {isExpanded && colTasks.length > MAX_VISIBLE && (
                    <button onClick={() => toggleExpand(col.key)}
                      className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 bg-transparent'
                      style={{ color: 'var(--tt-text-muted)', border: '1px dashed var(--tt-border)' }}>
                      Show less
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}