import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { userService } from '../../services/userService'
import { getToken } from '../../utils/getToken'
import { useStatus } from '../../hook/useStatus'
import TaskCard from '@/components/shared/TaskCard'

const COLUMNS = [
  { key: 'backlog',     label: 'Backlog',     dot: 'bg-tt-col-backlog-dot',  accentCls: 'text-tt-col-backlog-accent',  countCls: 'bg-tt-col-backlog-count',  bgCls: 'bg-tt-col-backlog-bg'  },
  { key: 'in_progress', label: 'In Progress', dot: 'bg-tt-col-progress-dot', accentCls: 'text-tt-col-progress-accent', countCls: 'bg-tt-col-progress-count', bgCls: 'bg-tt-col-progress-bg' },
  { key: 'done',        label: 'Done',        dot: 'bg-tt-col-done-dot',     accentCls: 'text-tt-col-done-accent',     countCls: 'bg-tt-col-done-count',     bgCls: 'bg-tt-col-done-bg'     },
]

const MAX_VISIBLE = 5
const EMPTY_ARRAY = []

function UserFilterDropdown({ users, filterUser, onSelect, onClose, anchorRef }) {
  const [query, setQuery] = useState('')
  const ref               = useRef(null)
  const inputRef          = useRef(null)
  const [pos, setPos]     = useState({ top: 0, right: 0 })

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
    }
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [anchorRef])

  useEffect(() => {
    const handler = (e) => {
      if (
        ref.current && !ref.current.contains(e.target) &&
        anchorRef.current && !anchorRef.current.contains(e.target)
      ) onClose()
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [onClose, anchorRef])

  const options = [
    { label: 'All users',  value: '' },
    { label: 'Unassigned', value: 'unassigned' },
    ...users.map(u => ({ label: u.email.split('@')[0], value: u.email })),
  ]

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  return createPortal(
    <div
      ref={ref}
      style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999, width: 200, boxShadow: 'var(--tt-shadow-md)' }}
      className='rounded-xl py-1 bg-tt-bg-card border border-tt-border'
    >
      <div className='px-2 pt-1 pb-1.5 border-b border-tt-border'>
        <div className='relative'>
          <svg className='absolute left-2 top-1/2 -translate-y-1/2 text-tt-text-muted' width="10" height="10" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search user…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full text-xs pl-6 pr-2 py-1 rounded-lg outline-none bg-tt-bg-muted border border-tt-border text-tt-text'
          />
        </div>
      </div>
      <div className='max-h-[200px] overflow-y-auto'>
        {filtered.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-tt-text-hint'>No users found</p>
        ) : filtered.map(opt => (
          <div
            key={opt.value}
            onMouseDown={(e) => { e.stopPropagation(); onSelect(opt.value); onClose() }}
            className={`text-xs px-3 py-1.5 cursor-pointer flex items-center justify-between gap-3 hover:opacity-80 ${
              filterUser === opt.value ? 'bg-tt-primary-light text-tt-primary' : 'text-tt-text-muted'
            }`}
          >
            <span className='truncate'>{opt.label}</span>
            {filterUser === opt.value && <span className='text-tt-primary flex-shrink-0'>✓</span>}
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}

export default function AdminTasks() {
  const { loading, error, success, start, done, fail, succeed } = useStatus()
  const { data: tasks = EMPTY_ARRAY, fetch: fetchTasks } = useFetch(taskService.getAll)
  const { data: users = EMPTY_ARRAY, fetch: fetchUsers } = useFetch(userService.getAll)

  const [selectedUser,   setSelectedUser]   = useState({})
  const [showModal,      setShowModal]      = useState(false)
  const [modalForm,      setModalForm]      = useState({ title: '', description: '' })
  const [search,         setSearch]         = useState('')
  const [filterUser,     setFilterUser]     = useState('')
  const [sortBy,         setSortBy]         = useState('')
  const [expanded,       setExpanded]       = useState({})
  const [showUserFilter, setShowUserFilter] = useState(false)
  const [addingTo,       setAddingTo]       = useState(null)
  const filterBtnRef = useRef(null)

  useEffect(() => { fetchTasks(); fetchUsers() }, [fetchTasks, fetchUsers])

  const handleModalSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!modalForm.title.trim()) return
    try {
      start()
      const token = await getToken()
      await taskService.create(token, { ...modalForm, status: 'backlog' })
      setModalForm({ title: '', description: '' })
      succeed()
      fetchTasks()
      setShowModal(false)
    } catch (err) { fail(err.message) }
    finally { done() }
  }, [modalForm, start, succeed, fail, done, fetchTasks])

  
  const handleAssign = useCallback(async (taskId, userId) => {
    try {
      const token = await getToken()
      const user  = users.find(u => u.uid === (userId || selectedUser[taskId]))
      if (!user) return
      await taskService.assign(token, taskId, { userId: user.uid, userEmail: user.email })
      fetchTasks()
    } catch (err) { console.error(err.message) }
  }, [users, selectedUser, fetchTasks])

  const handleSelectUser = useCallback(
    (taskId, userId) => setSelectedUser(prev => ({ ...prev, [taskId]: userId })), []
  )

  const toggleExpand = useCallback(
    (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] })), []
  )

  const clearFilters = useCallback(() => { setSearch(''); setFilterUser(''); setSortBy('') }, [])
  const hasFilters = search || filterUser || sortBy

  const filteredTasks = useMemo(() => tasks
    .filter(task => {
      const matchSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
      const matchUser =
        filterUser === ''           ? true :
        filterUser === 'unassigned' ? !task.assignedEmail :
        task.assignedEmail === filterUser
      return matchSearch && matchUser
    })
    .sort((a, b) => {
      if (sortBy === 'title_asc')  return a.title.localeCompare(b.title)
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title)
      if (sortBy === 'assigned')   return (a.assignedEmail || '').localeCompare(b.assignedEmail || '')
      if (sortBy === 'unassigned') return a.assignedEmail ? 1 : -1
      return 0
    }),
  [tasks, search, filterUser, sortBy])

  return (
    <div className='flex min-h-screen items-stretch'>
      <div className='flex-1 min-w-0 transition-all duration-300'>

        {/* Add Task Modal */}
        {showModal && (
          <div className='fixed inset-0 flex items-center justify-center z-50 bg-tt-bg-overlay'>
            <div className='rounded-2xl p-6 w-full max-w-md bg-tt-bg-card border border-tt-border shadow-[var(--tt-shadow-lg)]'>
              <div className='flex justify-between items-center mb-5'>
                <div>
                  <h2 className='text-sm font-semibold text-tt-text'>New Task</h2>
                  <p className='text-xs mt-0.5 text-tt-text-muted'>Add a task to the board</p>
                </div>
                <button
                  onClick={() => { setShowModal(false); setModalForm({ title: '', description: '' }) }}
                  className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity bg-tt-bg-muted text-tt-text border-none'
                >✕</button>
              </div>
              {error   && <p className='text-xs mb-3 text-red-500'>{error}</p>}
              {success && <p className='text-xs mb-3 text-tt-done-text'>Task created!</p>}
              <form onSubmit={handleModalSubmit} className='flex flex-col gap-3'>
                <input
                  type='text'
                  placeholder='Task title…'
                  value={modalForm.title}
                  onChange={e => setModalForm(p => ({ ...p, title: e.target.value }))}
                  className='w-full text-xs px-3 py-2 rounded-xl outline-none border border-tt-border bg-tt-bg text-tt-text focus:border-tt-primary'
                  required
                  autoFocus
                />
                <textarea
                  placeholder='Description (optional)…'
                  value={modalForm.description}
                  onChange={e => setModalForm(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className='w-full text-xs px-3 py-2 rounded-xl outline-none border border-tt-border bg-tt-bg text-tt-text resize-none focus:border-tt-primary'
                />
                <div className='flex justify-end gap-2 mt-1'>
                  <button
                    type='button'
                    onClick={() => { setShowModal(false); setModalForm({ title: '', description: '' }) }}
                    className='text-xs px-3 py-2 rounded-xl border border-tt-border text-tt-text-muted bg-transparent hover:opacity-70 transition-opacity'
                  >Cancel</button>
                  <button
                    type='submit'
                    disabled={loading}
                    className='text-xs px-4 py-2 rounded-xl font-semibold bg-tt-primary text-white border-none hover:opacity-90 transition-opacity disabled:opacity-50'
                  >{loading ? 'Adding…' : 'Add Task'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className='px-6 py-6'>

          {/* Board card */}
          <div className='rounded-2xl bg-tt-bg-card border border-tt-border'>

            {/* Toolbar */}
            <div className='flex items-center justify-between px-5 py-3 border-b border-tt-border bg-tt-bg-muted rounded-t-2xl'>
              <div className='flex items-center gap-2'>
                
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="4" height="10" rx="1.5" fill="var(--color-tt-primary)" opacity=".4"/>
                  <rect x="6" y="1" width="4" height="12" rx="1.5" fill="var(--color-tt-primary)" opacity=".7"/>
                  <rect x="11" y="5" width="4" height="8" rx="1.5" fill="var(--color-tt-primary)"/>
                </svg>
                <p className='text-sm font-semibold text-tt-primary'>Task Board</p>
                <span className='text-xs px-2 py-0.5 rounded-full font-medium bg-tt-border text-tt-primary'>
                  {filteredTasks.length} tasks
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setShowModal(true)}
                  className='flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity bg-tt-primary text-white border-none'
                >
                  <span className='text-sm leading-none'>+</span> Add Task
                </button>

                {/* Search */}
                <div className='relative'>
                  <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 text-tt-text-muted' width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input
                    type='text' placeholder='Search tasks…' value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-40 border border-tt-border text-tt-text bg-tt-bg-card'
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className='text-xs rounded-full px-2.5 py-1.5 outline-none border border-tt-border text-tt-text-muted bg-tt-bg-card'
                >
                  <option value=''>Sort…</option>
                  <option value='title_asc'>A → Z</option>
                  <option value='title_desc'>Z → A</option>
                  <option value='assigned'>Assigned</option>
                  <option value='unassigned'>Unassigned first</option>
                </select>

                {/* User filter */}
                <button
                  ref={filterBtnRef}
                  onClick={() => setShowUserFilter(v => !v)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-all bg-transparent border ${
                    filterUser ? 'border-tt-primary bg-tt-primary-light' : 'border-tt-border'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={filterUser ? 'text-tt-primary' : 'text-tt-text-muted'}>
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {showUserFilter && (
                  <UserFilterDropdown
                    users={users} filterUser={filterUser}
                    onSelect={setFilterUser} onClose={() => setShowUserFilter(false)}
                    anchorRef={filterBtnRef}
                  />
                )}

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 bg-transparent text-xs border border-tt-border text-tt-text-muted'
                  >✕</button>
                )}
              </div>
            </div>

            {/* Kanban columns */}
            <div className='grid grid-cols-3 gap-0'>
              {COLUMNS.map((col, ci) => {
                const colTasks   = filteredTasks.filter(t => t.status === col.key)
                const isExpanded = expanded[col.key]
                const visible    = isExpanded ? colTasks : colTasks.slice(0, MAX_VISIBLE)
                const remaining  = colTasks.length - MAX_VISIBLE
                const isAdding   = addingTo === col.key

                return (
                  <div
                    key={col.key}
                    className={`p-3 ${col.bgCls} ${ci < 2 ? 'border-r border-tt-border' : ''}`}
                  >
                    {/* Column header */}
                    <div className='flex items-center gap-1.5 mb-2.5 px-0.5'>
                      <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`}/>
                      <span className={`text-xs font-bold ${col.accentCls}`}>{col.label}</span>
                      <span className={`text-xs ml-auto px-2 py-0.5 rounded-full font-semibold border border-tt-border ${col.accentCls} ${col.countCls}`}>
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Cards */}
                    {visible.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        users={users}
                        selectedUser={selectedUser?.[task.id] || ''}
                        onSelectUser={handleSelectUser}
                        onAssign={handleAssign}
                      />
                    ))}

                    {colTasks.length === 0 && !isAdding && (
                      <div className='rounded-xl py-8 text-center border border-dashed border-tt-border mb-1.5'>
                        <p className='text-xs font-medium text-tt-text-hint'>
                          {hasFilters ? 'No matching tasks' : 'No tasks yet'}
                        </p>
                      </div>
                    )}

                    {/* Expand/collapse */}
                    {!isExpanded && remaining > 0 && (
                      <button
                        onClick={() => toggleExpand(col.key)}
                        className={`w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 mb-1.5 bg-transparent font-medium border border-dashed border-tt-border ${col.accentCls}`}
                      >
                        + {remaining} more
                      </button>
                    )}
                    {isExpanded && colTasks.length > MAX_VISIBLE && (
                      <button
                        onClick={() => toggleExpand(col.key)}
                        className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 mb-1.5 bg-transparent border border-dashed border-tt-border text-tt-text-muted'
                      >
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

      <div>
        
      </div>
    </div>
  )
}