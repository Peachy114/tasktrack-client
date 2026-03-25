import { useEffect, useState } from 'react'
import { useStatus } from '../../hook/useStatus'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { userService } from '../../services/userService'
import { getToken } from '../../utils/getToken'
import TaskForm from '@/components/shared/TaskForm'

const AV_COLORS = [
  { bg: 'var(--tt-av1-bg)', text: 'var(--tt-av1-text)' },
  { bg: 'var(--tt-av2-bg)', text: 'var(--tt-av2-text)' },
  { bg: 'var(--tt-av3-bg)', text: 'var(--tt-av3-text)' },
  { bg: 'var(--tt-av4-bg)', text: 'var(--tt-av4-text)' },
  { bg: 'var(--tt-av5-bg)', text: 'var(--tt-av5-text)' },
]

const STATUS_BADGE = {
  done:        { label: 'Completed',   bg: 'var(--tt-done-bg)',     color: 'var(--tt-done-text)'     },
  in_progress: { label: 'In Progress', bg: 'var(--tt-progress-bg)', color: 'var(--tt-progress-text)' },
  backlog:     { label: 'Pending',     bg: 'var(--tt-backlog-bg)',  color: 'var(--tt-backlog-text)'  },
}

export default function AdminDashboard() {
  const { loading, error, success, start, done, fail, succeed } = useStatus()
  const { data: tasks, fetch: fetchTasks } = useFetch(taskService.getAll)
  const { data: users, fetch: fetchUsers } = useFetch(userService.getAll)
  const [form, setForm]           = useState({ title: '', description: '' })
  const [showModal, setShowModal] = useState(false)

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

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total          = tasks.length
  const doneTasks      = tasks.filter(t => t.status === 'done').length
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length
  const backlogTasks   = tasks.filter(t => t.status === 'backlog').length
  const completionRate = total > 0 ? Math.round((doneTasks / total) * 100) : 0

  // Progress ring
  const r    = 54
  const circ = 2 * Math.PI * r
  const doneOffset     = circ - (doneTasks / (total || 1)) * circ
  const progressOffset = circ - ((doneTasks + inProgressTasks) / (total || 1)) * circ

  // Stat cards config
  const STAT_CARDS = [
    {
      label: 'Tasks Today',
      value: `${doneTasks} / ${total}`,
      accent: '#185FA5',
      iconBg: '#EEF5FF',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#185FA5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      accent: '#f97316',
      iconBg: '#fff7ed',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#f97316" strokeWidth="2"/>
          <path d="M12 7v5l3 3" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: 'Completed',
      value: doneTasks,
      accent: '#22c55e',
      iconBg: '#f0fdf4',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="2"/>
          <path d="M8 12l3 3 5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Team Members',
      value: users.length,
      accent: '#8b5cf6',
      iconBg: '#f5f3ff',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="4" stroke="#8b5cf6" strokeWidth="2"/>
          <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17 11c2.21 0 4 1.79 4 4s-1.79 4-4 4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2"/>
        </svg>
      ),
    },
  ]

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
        <div className='flex items-center justify-between mb-6'>
          <div>
            <p className='text-xs font-medium mb-0.5' style={{ color: 'var(--tt-text-hint)' }}>Overview</p>
            <h1 className='text-2xl font-bold' style={{ color: 'var(--tt-primary)' }}>Dashboard</h1>
            <p className='text-xs mt-0.5' style={{ color: 'var(--tt-text-muted)' }}>
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>
          <button onClick={() => setShowModal(true)}
            className='flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity'
            style={{ background: 'var(--tt-primary)', color: '#ffffff', border: 'none' }}>
            <span className='text-sm leading-none'>+</span> Add Task
          </button>
        </div>

        {/* ── Stat cards ────────────────────────────────────────────────────── */}
        <div className='grid grid-cols-4 gap-3 mb-5'>
          {STAT_CARDS.map((s, i) => (
            <div key={i} className='rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden'
              style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>

              {/* Top accent bar */}
              <div className='absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl' style={{ background: s.accent }}/>
              <div className='w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0'
                style={{ background: s.iconBg }}>
                {s.icon}
              </div>
              <div>
                <p className='text-xs font-medium mb-0.5' style={{ color: 'var(--tt-text-muted)' }}>{s.label}</p>
                <p className='text-2xl font-bold' style={{ color: s.accent }}>{s.value}</p>
              </div>

              {/* Decorative blob */}
              <div className='absolute -bottom-4 -right-4 w-16 h-16 rounded-full'
                style={{ background: s.accent, opacity: 0.06 }}/>
            </div>
          ))}
        </div>

        {/* ── Middle row: recent tasks ──────────────── */}
        <div className='grid grid-cols-12 gap-3 mb-5'>

          {/* Progress ring */}
          <div className='col-span-3 rounded-2xl p-4 flex flex-col items-center justify-center'
            style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>
            <p className='text-sm font-semibold mb-3 self-start' style={{ color: 'var(--tt-primary)' }}>Task Progress</p>
            <div className='relative flex items-center justify-center'>
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={r} fill="none" stroke="var(--tt-bg-muted)" strokeWidth="12"/>
                <circle cx="65" cy="65" r={r} fill="none" stroke="var(--tt-secondary)" strokeWidth="12"
                  strokeDasharray={circ} strokeDashoffset={progressOffset}
                  strokeLinecap="round" transform="rotate(-90 65 65)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
                <circle cx="65" cy="65" r={r} fill="none" stroke="var(--tt-primary)" strokeWidth="12"
                  strokeDasharray={circ} strokeDashoffset={doneOffset}
                  strokeLinecap="round" transform="rotate(-90 65 65)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
              </svg>
              <div className='absolute text-center'>
                <p className='text-2xl font-bold' style={{ color: 'var(--tt-primary)' }}>{completionRate}%</p>
                <p className='text-xs' style={{ color: 'var(--tt-text-muted)' }}>Completed</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mt-3'>
              {[
                { label: 'Done',    color: 'var(--tt-primary)'   },
                { label: 'Active',  color: 'var(--tt-secondary)' },
                { label: 'Pending', color: 'var(--tt-bg-muted)'  },
              ].map(l => (
                <div key={l.label} className='flex items-center gap-1.5'>
                  <div className='w-2 h-2 rounded-full' style={{ background: l.color }}/>
                  <span className='text-xs' style={{ color: 'var(--tt-text-muted)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tasks */}
          <div className='col-span-4 rounded-2xl p-4'
            style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-sm font-semibold' style={{ color: 'var(--tt-primary)' }}>Recent Tasks</p>
              <span className='text-xs' style={{ color: 'var(--tt-text-hint)' }}>{tasks.length} total</span>
            </div>
            <div className='flex flex-col gap-1.5'>
              {tasks.slice(0, 5).map((task) => {
                const badge    = STATUS_BADGE[task.status] || STATUS_BADGE['backlog']
                const dotColor = task.status === 'done'        ? 'var(--tt-primary)'
                               : task.status === 'in_progress' ? 'var(--tt-secondary)'
                               : 'var(--tt-border)'
                return (
                  <div key={task.id} className='flex items-center gap-2 py-2 px-2.5 rounded-xl'
                    style={{ background: 'var(--tt-primary-light)', border: '1px solid var(--tt-border)' }}>
                    <div className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ background: dotColor }}/>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-semibold truncate' style={{ color: 'var(--tt-primary)' }}>{task.title}</p>
                      <p className='text-xs truncate' style={{ color: 'var(--tt-text-muted)' }}>
                        {task.assignedEmail ? task.assignedEmail.split('@')[0] : 'Unassigned'}
                      </p>
                    </div>
                    <span className='text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium'
                      style={{ background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                )
              })}
              {tasks.length === 0 && (
                <p className='text-xs text-center py-6' style={{ color: 'var(--tt-text-hint)' }}>No tasks yet</p>
              )}
            </div>
          </div>

          {/* ── Team Collaboration ────────────────────────────────────────────── */}
          <div className='col-span-5 rounded-2xl p-4'
            style={{ background: 'var(--tt-bg-card)', border: '1px solid var(--tt-border)' }}>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-sm font-semibold' style={{ color: 'var(--tt-primary)' }}>Team Collaboration</p>
              <span className='text-xs px-2 py-0.5 rounded-full font-medium'
                style={{ background: 'var(--tt-bg-muted)', color: 'var(--tt-primary)' }}>
                {users.length} members
              </span>
            </div>

            <div className='grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-1'>
              {users.slice(0, 5).map((user, i) => {
                const userTasks  = tasks.filter(t => t.assignedEmail === user.email)
                const userDone   = userTasks.filter(t => t.status === 'done').length
                const userActive = userTasks.find(t => t.status === 'in_progress')
                const badge      = userActive ? STATUS_BADGE['in_progress'] : userDone > 0 ? STATUS_BADGE['done'] : STATUS_BADGE['backlog']
                return (
                  <div key={user.uid} className='flex items-center gap-2.5 py-2 px-2.5 rounded-xl'
                    style={{ background: 'var(--tt-primary-light)', border: '1px solid var(--tt-border)' }}>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'
                      style={{ background: AV_COLORS[i % AV_COLORS.length].bg, color: AV_COLORS[i % AV_COLORS.length].text }}>
                      {user.email[0].toUpperCase()}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-semibold truncate' style={{ color: 'var(--tt-primary)' }}>
                        {user.email.split('@')[0]}
                      </p>
                      <p className='text-xs truncate' style={{ color: 'var(--tt-text-muted)' }}>
                        {userActive ? userActive.title : userDone > 0 ? `${userDone} tasks done` : 'No active tasks'}
                      </p>
                    </div>
                    <span className='text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium'
                      style={{ background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                )
              })}
              {users.length === 0 && (
                <p className='text-xs text-center py-6 col-span-full' style={{ color: 'var(--tt-text-hint)' }}>
                  No members yet
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}