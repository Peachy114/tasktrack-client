import { useEffect, useState } from 'react'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { userService } from '../../services/userService'
import { getToken } from '../../utils/getToken'
import { useStatus } from '../../hook/useStatus'
import TaskForm from '@/components/shared/TaskForm'
import TaskCard from '@/components/shared/TaskCard'

const COLUMNS = [
  {
    key:    'backlog',
    label:  'To Do',
    dot:    'var(--tt-col-backlog-dot)',
    colBg:  'var(--tt-col-backlog-bg)',
    accent: '#185FA5',
    countBg:'#EEF5FF',
  },
  {
    key:    'in_progress',
    label:  'In Progress',
    dot:    'var(--tt-col-progress-dot)',
    colBg:  'var(--tt-col-progress-bg)',
    accent: '#f97316',
    countBg:'#fff7ed',
  },
  {
    key:    'done',
    label:  'Done',
    dot:    'var(--tt-col-done-dot)',
    colBg:  'var(--tt-col-done-bg)',
    accent: '#22c55e',
    countBg:'#f0fdf4',
  },
]

const MAX_VISIBLE = 5

export default function AdminTasks() {
  const { loading, error, success, start, done, fail, succeed } = useStatus()
  const { data: tasks, fetch: fetchTasks } = useFetch(taskService.getAll)
  const { data: users, fetch: fetchUsers } = useFetch(userService.getAll)
  const [form, setForm]               = useState({ title: '', description: '' })
  const [selectedUser, setSelectedUser] = useState({})
  const [showModal, setShowModal]     = useState(false)
  const [search, setSearch]           = useState('')
  const [filterUser, setFilterUser]   = useState('')
  const [sortBy, setSortBy]           = useState('')
  const [expanded, setExpanded]       = useState({})

  useEffect(() => { fetchTasks(); fetchUsers() }, [fetchTasks, fetchUsers])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      start()
      const token = await getToken()
      await taskService.create(token, form)
      setForm({ title: '', description: '' })
      succeed()
      fetchTasks()
      setShowModal(false)
    } catch (err) { fail(err.message) }
    finally { done() }
  }

  const handleAssign = async (taskId, userId) => {
    try {
      const token = await getToken()
      const user = users.find(u => u.uid === (userId || selectedUser[taskId]))
      if (!user) return
      await taskService.assign(token, taskId, { userId: user.uid, userEmail: user.email })
      fetchTasks()
    } catch (err) { console.log(err.message) }
  }
  const handleSelectUser = (taskId, userId) => setSelectedUser({ ...selectedUser, [taskId]: userId })
  const toggleExpand = (key) => setExpanded({ ...expanded, [key]: !expanded[key] })
  const clearFilters = () => { setSearch(''); setFilterUser(''); setSortBy('') }
  const hasFilters = search || filterUser || sortBy


  const filteredTasks = tasks
    .filter(task => {
      const matchSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
      const matchUser = filterUser === '' || task.assignedEmail === filterUser
      return matchSearch && matchUser
    })
    .sort((a, b) => {
      if (sortBy === 'title_asc')  return a.title.localeCompare(b.title)
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title)
      if (sortBy === 'assigned')   return (a.assignedEmail || '').localeCompare(b.assignedEmail || '')
      if (sortBy === 'unassigned') return a.assignedEmail ? 1 : -1
      return 0
    })

  return (
    <div className='min-h-screen' style={{ background: 'var(--tt-bg)' }}>

      {/* ── Add Task Modal ─────────────────────────────────────────────────── */}
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='rounded-2xl p-6 w-full max-w-md shadow-xl'
            style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>
            <div className='flex justify-between items-center mb-5'>
              <div>
                <h2 className='text-sm font-semibold' style={{ color: 'var(--tt-text)' }}>New Task</h2>
                <p className='text-xs mt-0.5' style={{ color: 'var(--tt-text-muted)' }}>Add a task to the board</p>
              </div>
              <button onClick={() => setShowModal(false)}
                className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity'
                style={{ background: 'var(--tt-bg-muted)', color: 'var(--tt-text)' }}>✕</button>
            </div>
            {error   && <p className='text-red-600 text-xs mb-3'>{error}</p>}
            {success && <p className='text-green-700 text-xs mb-3'>Task created!</p>}
            <TaskForm form={form} onChange={handleChange} onSubmit={handleCreateTask}
              loading={loading} onClose={() => setShowModal(false)}/>
          </div>
        </div>
      )}

      <div className='px-6 py-6 max-w-7xl mx-auto'>

        {/* ── Page header ───────────────────────────────────────────────────── */}
        <div className='flex items-center justify-between mb-5'>
          <div>
            <p className='text-xs font-medium mb-0.5' style={{ color: 'var(--tt-text-hint)' }}>Board</p>
            <h1 className='text-2xl font-bold' style={{ color: 'var(--tt-primary)' }}>Tasks</h1>
            <p className='text-xs mt-0.5' style={{ color: 'var(--tt-text-muted)' }}>
              {filteredTasks.length} of {tasks.length} tasks shown
            </p>
          </div>
          <button onClick={() => setShowModal(true)}
            className='flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity'
            style={{ background: 'var(--tt-primary)', color: '#ffffff', border: 'none' }}>
            <span className='text-sm leading-none'>+</span> Add Task
          </button>
        </div>

  
        {/* ── Board card ────────────────────────────────────────────────────── */}
        <div className='rounded-2xl'
          style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>

          {/* Board toolbar */}
          <div className='flex items-center justify-between px-5 py-3'
            style={{ borderBottom: '1px solid var(--tt-border)', background: 'var(--tt-bg-muted)' }}>

            {/* Left: title + count */}
            <div className='flex items-center gap-2'>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="4" height="10" rx="1.5" fill="var(--tt-primary)" opacity=".4"/>
                <rect x="6" y="1" width="4" height="12" rx="1.5" fill="var(--tt-primary)" opacity=".7"/>
                <rect x="11" y="5" width="4" height="8" rx="1.5" fill="var(--tt-primary)"/>
              </svg>
              <p className='text-sm font-semibold' style={{ color: 'var(--tt-primary)' }}>Task Board</p>
              <span className='text-xs px-2 py-0.5 rounded-full font-medium'
                style={{ background: 'var(--tt-border)', color: 'var(--tt-primary)' }}>
                {filteredTasks.length} tasks
              </span>
            </div>

            {/* Right: filters */}
            <div className='flex items-center gap-2'>

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

              {/* Sort */}
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className='text-xs rounded-full px-2.5 py-1.5 outline-none'
                style={{ border: '1px solid var(--tt-border)', color: 'var(--tt-text-muted)', background: 'var(--tt-bg-card)' }}>
                <option value=''>Sort…</option>
                <option value='title_asc'>A → Z</option>
                <option value='title_desc'>Z → A</option>
                <option value='assigned'>Assigned</option>
                <option value='unassigned'>Unassigned first</option>
              </select>

              {/* User filter */}
              <div className='relative group'>
                <button
                  className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-all bg-transparent'
                  style={{
                    border: '1px solid ' + (filterUser ? 'var(--tt-primary)' : 'var(--tt-border)'),
                    background: filterUser ? 'var(--tt-primary-light)' : 'transparent',
                  }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3"
                      stroke={filterUser ? 'var(--tt-primary)' : 'var(--tt-text-muted)'} strokeWidth="1.5"/>
                    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
                      stroke={filterUser ? 'var(--tt-primary)' : 'var(--tt-text-muted)'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* Dropdown */}
                <div className='absolute hidden group-hover:block rounded-xl py-1 z-20 shadow-md'
                  style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)', top: 34, right: 0, minWidth: 160 }}>
                  <p className='text-xs px-3 py-1.5 font-semibold'
                    style={{ color: 'var(--tt-text-muted)', borderBottom: '1px solid var(--tt-border)' }}>
                    Filter by user
                  </p>
                  {[
                    { label: 'All users',   value: ''           },
                    { label: 'Unassigned',  value: 'unassigned' },
                    ...users.map(u => ({ label: u.email.split('@')[0], value: u.email })),
                  ].map(opt => (
                    <div key={opt.value} onClick={() => setFilterUser(opt.value)}
                      className='text-xs px-3 py-1.5 cursor-pointer hover:opacity-80 flex items-center justify-between gap-4'
                      style={{
                        color:      filterUser === opt.value ? 'var(--tt-primary)' : 'var(--tt-text-muted)',
                        background: filterUser === opt.value ? 'var(--tt-primary-light)' : 'transparent',
                      }}>
                      {opt.label}
                      {filterUser === opt.value && <span style={{ color: 'var(--tt-primary)' }}>✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {hasFilters && (
                <button onClick={clearFilters}
                  className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 bg-transparent text-xs'
                  style={{ border: '1px solid var(--tt-border)', color: 'var(--tt-text-muted)' }}>✕</button>
              )}
            </div>
          </div>

          {/* ── Kanban columns ─────────────────────────────────────────────── */}
          <div className='grid grid-cols-3 gap-0'>
            {COLUMNS.map((col, ci) => {
              const colTasks  = filteredTasks.filter(t => t.status === col.key)
              const isExpanded = expanded[col.key]
              const visible   = isExpanded ? colTasks : colTasks.slice(0, MAX_VISIBLE)
              const remaining = colTasks.length - MAX_VISIBLE

              return (
                <div key={col.key} className='p-3'
                  style={{
                    borderRight: ci < 2 ? '1px solid var(--tt-border)' : 'none',
                    background:  col.colBg,
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
                    <TaskCard key={task.id} task={task} users={users}
                      selectedUser={selectedUser?.[task.id] || ''}
                      onSelectUser={handleSelectUser} onAssign={handleAssign}/>
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
                        {hasFilters ? 'No matching tasks' : 'No tasks yet'}
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