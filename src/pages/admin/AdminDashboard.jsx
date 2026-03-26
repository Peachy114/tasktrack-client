import { useEffect, useState, useCallback, useMemo } from 'react'
import { useStatus } from '../../hook/useStatus'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { userService } from '../../services/userService'
import { getToken } from '../../utils/getToken'
import TaskForm from '@/components/shared/TaskForm'
import Activity from '@/components/shared/Activity'

const AV_COLORS = [
  'bg-tt-av1-bg text-tt-av1-text',
  'bg-tt-av2-bg text-tt-av2-text',
  'bg-tt-av3-bg text-tt-av3-text',
  'bg-tt-av4-bg text-tt-av4-text',
  'bg-tt-av5-bg text-tt-av5-text',
]

const STATUS_BADGE = {
  done:        { label: 'Completed',   cls: 'bg-tt-done-bg text-tt-done-text'         },
  in_progress: { label: 'In Progress', cls: 'bg-tt-progress-bg text-tt-progress-text' },
  backlog:     { label: 'Pending',     cls: 'bg-tt-backlog-bg text-tt-backlog-text'    },
}

export default function AdminDashboard() {
  const { loading, error, success, start, done, fail, succeed } = useStatus()
  const { data: tasks = [], fetch: fetchTasks } = useFetch(taskService.getAll)
  const { data: users = [], fetch: fetchUsers } = useFetch(userService.getAll)
  const [form, setForm] = useState({ title: '', description: '' })

  useEffect(() => { fetchTasks(); fetchUsers() }, [fetchTasks, fetchUsers])

  const handleCreateTask = useCallback(async (e) => {
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
  }, [form, start, succeed, fail, done, fetchTasks])

  const stats = useMemo(() => {
    const total        = tasks.length
    const doneTasks    = tasks.filter(t => t.status === 'done').length
    const activeTasks  = tasks.filter(t => t.status === 'in_progress').length
    const pendingTasks = tasks.filter(t => t.status === 'backlog').length
    const completionRate = total > 0 ? Math.round((doneTasks / total) * 100) : 0
    const r    = 52
    const circ = 2 * Math.PI * r
    return {
      total, doneTasks, activeTasks, pendingTasks, completionRate, r, circ,
      doneOffset:     circ - (doneTasks / (total || 1)) * circ,
      progressOffset: circ - ((doneTasks + activeTasks) / (total || 1)) * circ,
    }
  }, [tasks])

  return (
    <div className='min-h-screen flex flex-col gap-4'>

      <div>
        <div className='px-6 py-6 max-w-7xl mx-auto'>

          {/* Page header */}
          <div className='flex items-end justify-between mb-7'>
            <div>
              <p className='text-xs font-medium mb-1 text-white/60 uppercase tracking-widest'>Overview</p>
              <h1 className='text-3xl font-bold text-white leading-tight'>Dashboard</h1>
            </div>
          </div>

          {/* Stat cards row */}
          <div className='grid grid-cols-4 gap-4 mb-5'>
            {[
              {
                label: 'Total Tasks',
                value: stats.total,
                sub: 'All tasks',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12h8M8 8h5M8 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                iconBg: 'bg-tt-indigo-light',
                iconColor: 'text-tt-indigo',
                valueCls: 'text-tt-indigo',
                subCls: 'bg-tt-indigo-light text-tt-indigo',
              },
              {
                label: 'In Progress',
                value: stats.activeTasks,
                sub: 'Active now',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                iconBg: 'bg-tt-orange-light',
                iconColor: 'text-tt-orange',
                valueCls: 'text-tt-orange',
                subCls: 'bg-tt-orange-light text-tt-orange',
              },
              {
                label: 'Completed',
                value: stats.doneTasks,
                sub: `${stats.completionRate}% rate`,
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                iconBg: 'bg-tt-purple-light',
                iconColor: 'text-tt-purple',
                valueCls: 'text-tt-purple',
                subCls: 'bg-tt-purple-light text-tt-purple',
              },
              {
                label: 'Team Members',
                value: users.length,
                sub: 'Active members',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19 8v6M16 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                iconBg: 'bg-tt-done-bg',
                iconColor: 'text-tt-done-text',
                valueCls: 'text-tt-done-text',
                subCls: 'bg-tt-done-bg text-tt-done-text',
              },
            ].map((s, i) => (
              <div
                key={i}
                className='bg-tt-bg-card rounded-3xl p-5 flex flex-col gap-3 shadow-[var(--tt-shadow-card)]'
              >
                <div className='flex items-center justify-between'>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.iconBg} ${s.iconColor}`}>
                    {s.icon}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.subCls}`}>
                    {s.sub}
                  </span>
                </div>
                <div>
                  <p className='text-xs text-tt-text-muted mb-0.5'>{s.label}</p>
                  <p className={`text-3xl font-bold ${s.valueCls}`}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main content row */}
          <div className='grid grid-cols-12 gap-4'>

            {/* Progress ring card */}
            <div className='col-span-3 bg-tt-bg-card rounded-3xl p-5 flex flex-col shadow-[var(--tt-shadow-card)]'>
              <p className='text-sm font-bold text-tt-text mb-1'>Task Progress</p>
              <p className='text-xs text-tt-text-muted mb-4'>Overall completion</p>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='relative flex items-center justify-center mb-4'>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r={stats.r} fill="none" stroke="var(--color-tt-slate-light)" strokeWidth="14"/>
                    <circle cx="70" cy="70" r={stats.r} fill="none"
                      stroke="var(--color-tt-purple-muted)" strokeWidth="14"
                      strokeDasharray={stats.circ} strokeDashoffset={stats.progressOffset}
                      strokeLinecap="round" transform="rotate(-90 70 70)"
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
                    <circle cx="70" cy="70" r={stats.r} fill="none"
                      stroke="var(--color-tt-indigo)" strokeWidth="14"
                      strokeDasharray={stats.circ} strokeDashoffset={stats.doneOffset}
                      strokeLinecap="round" transform="rotate(-90 70 70)"
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
                  </svg>
                  <div className='absolute text-center'>
                    <p className='text-3xl font-bold text-tt-text'>{stats.completionRate}%</p>
                    <p className='text-xs text-tt-text-muted'>Done</p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  {[
                    { label: 'Completed', value: stats.doneTasks,    dotCls: 'bg-tt-indigo',      badgeCls: 'bg-tt-indigo-light text-tt-indigo'           },
                    { label: 'Active',    value: stats.activeTasks,  dotCls: 'bg-tt-purple-muted', badgeCls: 'bg-tt-purple-light text-tt-purple'           },
                    { label: 'Pending',   value: stats.pendingTasks, dotCls: 'bg-tt-slate-muted',  badgeCls: 'bg-tt-slate-light text-tt-slate-muted'       },
                  ].map(l => (
                    <div key={l.label} className='flex items-center justify-between px-1'>
                      <div className='flex items-center gap-2'>
                        <div className={`w-2.5 h-2.5 rounded-full ${l.dotCls}`}/>
                        <span className='text-xs text-tt-text-muted'>{l.label}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${l.badgeCls}`}>
                        {l.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className='col-span-5 bg-tt-bg-card rounded-3xl p-5 flex flex-col shadow-[var(--tt-shadow-card)]'>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <p className='text-sm font-bold text-tt-text'>Recent Tasks</p>
                  <p className='text-xs text-tt-text-muted mt-0.5'>{tasks.length} total tasks</p>
                </div>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                {tasks.slice(0, 5).map(task => {
                  const badge = STATUS_BADGE[task.status] ?? STATUS_BADGE.backlog
                  const borderCls =
                    task.status === 'done'        ? 'border-l-tt-purple' :
                    task.status === 'in_progress' ? 'border-l-tt-indigo' : 'border-l-tt-slate-muted'
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-2xl bg-tt-slate-bg border-l-[3px] ${borderCls}`}
                    >
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold truncate text-tt-text'>{task.title}</p>
                        <p className='text-xs truncate text-tt-text-hint mt-0.5'>
                          {task.assignedEmail ? task.assignedEmail.split('@')[0] : 'Unassigned'}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                  )
                })}
                {tasks.length === 0 && (
                  <div className='flex-1 flex items-center justify-center'>
                    <p className='text-xs text-tt-text-hint'>No tasks yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Team */}
            <div className='col-span-4 bg-tt-bg-card rounded-3xl p-5 flex flex-col shadow-[var(--tt-shadow-card)]'>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <p className='text-sm font-bold text-tt-text'>Team</p>
                  <p className='text-xs text-tt-text-muted mt-0.5'>{users.length} members</p>
                </div>
                <div className='flex -space-x-2'>
                  {users.slice(0, 4).map((u, i) => (
                    <div
                      key={u.uid}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-tt-bg-card ${AV_COLORS[i % AV_COLORS.length]}`}
                      title={u.email}
                    >
                      {u.email[0].toUpperCase()}
                    </div>
                  ))}
                  {users.length > 4 && (
                    <div className='w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-tt-bg-card bg-tt-bg-muted text-tt-text-muted'>
                      +{users.length - 4}
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                {users.slice(0, 5).map((user, i) => {
                  const userTasks  = tasks.filter(t => t.assignedEmail === user.email)
                  const userDone   = userTasks.filter(t => t.status === 'done').length
                  const userActive = userTasks.find(t => t.status === 'in_progress')
                  const badge      = userActive ? STATUS_BADGE.in_progress
                                   : userDone > 0 ? STATUS_BADGE.done
                                   : STATUS_BADGE.backlog
                  const pct = userTasks.length > 0 ? Math.round((userDone / userTasks.length) * 100) : 0
                  return (
                    <div key={user.uid} className='flex items-center gap-2.5 py-2 px-3 rounded-2xl bg-tt-slate-bg'>
                      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${AV_COLORS[i % AV_COLORS.length]}`}>
                        {user.email[0].toUpperCase()}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold truncate text-tt-text'>{user.email.split('@')[0]}</p>
                        <p className='text-xs truncate text-tt-text-hint mt-0.5'>
                          {userTasks.length} task{userTasks.length !== 1 ? 's' : ''} · {pct}% done
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                  )
                })}
                {users.length === 0 && (
                  <div className='flex-1 flex items-center justify-center'>
                    <p className='text-xs text-tt-text-hint'>No members yet</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div>
        <Activity />
      </div>
    </div>
  )
}