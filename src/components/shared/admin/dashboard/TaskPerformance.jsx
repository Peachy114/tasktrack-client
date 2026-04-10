import { useState, useEffect, useMemo } from "react"
import { useFetch } from "@/hook/useFetch"
import { taskService } from "@/services/taskServices"
import { userService } from "@/services/userService"

const AVATAR_COLORS = [
  { bg: 'rgba(41,121,255,0.15)',  text: '#2979FF' },
  { bg: 'rgba(0,196,140,0.15)',   text: '#00C48C' },
  { bg: 'rgba(255,184,0,0.15)',   text: '#FFB800' },
  { bg: 'rgba(255,77,77,0.15)',   text: '#FF4D4D' },
  { bg: 'rgba(14,165,233,0.15)',  text: '#0ea5e9' },
  { bg: 'rgba(236,72,153,0.15)',  text: '#ec4899' },
]

function getInitials(email = "") {
  const name  = email.split("@")[0]
  const parts = name.split(/[._-]/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function getAvatarColor(uid = "") {
  const index = uid.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

function Avatar({ email, uid }) {
  const { bg, text } = getAvatarColor(uid)
  return (
    <span
      className='inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-medium flex-shrink-0'
      style={{ background: bg, color: text }}
    >
      {getInitials(email)}
    </span>
  )
}

function RoleBadge({ role }) {
  const isAdmin = role === 'admin'
  return (
    <span
      className='inline-block text-[11px] font-medium rounded-full px-2.5 py-0.5 capitalize'
      style={{
        background: isAdmin ? 'rgba(41,121,255,0.15)' : 'rgba(155,155,155,0.15)',
        color:      isAdmin ? '#2979FF'               : 'var(--color-text-gray)',
        border:     isAdmin ? '1px solid rgba(41,121,255,0.3)' : '1px solid var(--color-border-primary)',
      }}
    >
      {role}
    </span>
  )
}

function WorkloadBar({ assigned, completed, inProgress }) {
  if (assigned === 0) return <span className="text-xs text-text-gray">—</span>

  const completedPct  = Math.round((completed  / assigned) * 100)
  const inProgressPct = Math.round((inProgress / assigned) * 100)
  const pendingPct    = Math.max(0, 100 - completedPct - inProgressPct)

  const barColor =
    completedPct >= 80 ? '#00C48C' :
    completedPct >= 40 ? '#2979FF' :
    inProgressPct > 0  ? '#FFB800' : 'var(--color-border-primary)'

  return (
    <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-border-primary">
      <div className="transition-all" style={{ width: `${completedPct}%`,  background: barColor }} />
      <div className="transition-all" style={{ width: `${inProgressPct}%`, background: 'rgba(41,121,255,0.4)' }} />
      <div className="transition-all" style={{ width: `${pendingPct}%`,    background: 'transparent' }} />
    </div>
  )
}

function Skeleton() {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border-primary last:border-0">
          <div className="w-7 h-7 rounded-full bg-border-primary animate-pulse flex-shrink-0" />
          <div className="flex-1 h-3 rounded-full bg-border-primary animate-pulse" />
          <div className="w-16 h-3 rounded-full bg-border-primary animate-pulse" />
          <div className="w-16 h-3 rounded-full bg-border-primary animate-pulse" />
          <div className="w-16 h-3 rounded-full bg-border-primary animate-pulse" />
          <div className="w-20 h-2 rounded-full bg-border-primary animate-pulse" />
          <div className="w-16 h-5 rounded-full bg-border-primary animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function MobileCard({ row }) {
  return (
    <div className="px-4 py-3 border-b border-border-primary last:border-0">
      {/* Top row: avatar + email + role badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar email={row.email} uid={row.uid} />
          <span className="text-xs text-text-primary truncate">{row.email}</span>
        </div>
        <RoleBadge role={row.role} />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-2.5 text-xs text-text-gray">
        <span><span className="text-text-primary font-medium">{row.assigned}</span> assigned</span>
        <span><span className="text-text-primary font-medium">{row.completed}</span> done</span>
        <span><span className="text-text-primary font-medium">{row.inProgress}</span> in progress</span>
      </div>

      {/* Workload bar */}
      <WorkloadBar assigned={row.assigned} completed={row.completed} inProgress={row.inProgress} />
    </div>
  )
}

export default function TeamPerformanceTracker() {
  const { data: users = [], loading: loadingUsers, fetch: fetchUsers } = useFetch(userService.getAll)
  const { data: tasks = [], loading: loadingTasks, fetch: fetchTasks } = useFetch(taskService.getAll)

  useEffect(() => {
    fetchUsers()
    fetchTasks()
  }, [fetchUsers, fetchTasks])

  const rows = useMemo(() => {
    return users
      .map(user => {
        const userTasks  = tasks.filter(t => t.assignedTo === user.uid)
        const assigned   = userTasks.length
        const completed  = userTasks.filter(t => t.status === "done").length
        const inProgress = userTasks.filter(t => t.status === "in_progress").length
        return { uid: user.uid, email: user.email ?? "—", role: user.role ?? "employee", assigned, completed, inProgress }
      })
      .sort((a, b) => (a.role === "admin" ? -1 : 1))
  }, [users, tasks])

  const loading = loadingUsers || loadingTasks

  return (
    <div className="bg-bg-primary rounded-2xl border border-border-primary overflow-hidden">

      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-border-primary bg-bg-page">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Team performance tracker</h2>
          <p className="text-xs text-text-gray mt-0.5">Monitor tasks, assignments and team workload.</p>
        </div>
        <button
          onClick={() => { fetchUsers(); fetchTasks() }}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-xs text-text-gray border border-border-primary rounded-lg px-3 py-1.5 hover:bg-bg-page transition-colors disabled:opacity-50"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={loading ? "animate-spin" : ""}>
            <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M13.5 2.5v3h-3"              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Refresh data
        </button>
      </div>

      {loading ? (
        <Skeleton />
      ) : rows.length === 0 ? (
        <p className="text-xs text-text-gray px-5 py-8 text-center">No team members found.</p>
      ) : (
        <>
          {/* Mobile — card list */}
          <div className="sm:hidden">
            {rows.map(row => <MobileCard key={row.uid} row={row} />)}
          </div>

          {/* Desktop — table */}
          <table className="hidden sm:table w-full text-sm border-collapse">
            <thead>
              <tr className="bg-bg-page border-b border-border-primary">
                <th className="px-5 py-3 text-left text-xs font-medium text-text-gray">Member</th>
                <th className="w-32 px-4 py-3 text-left text-xs font-medium text-text-gray">Assigned</th>
                <th className="w-32 px-4 py-3 text-left text-xs font-medium text-text-gray">Completed</th>
                <th className="w-32 px-4 py-3 text-left text-xs font-medium text-text-gray">In Progress</th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium text-text-gray">Workload</th>
                <th className="w-28 px-4 py-3 text-left text-xs font-medium text-text-gray">Role</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.uid}
                  className={`hover:bg-bg-page transition-colors ${i < rows.length - 1 ? "border-b border-border-primary" : ""}`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar email={row.email} uid={row.uid} />
                      <span className="text-xs text-text-primary truncate">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs text-text-gray">{row.assigned} tasks</span></td>
                  <td className="px-4 py-3"><span className="text-xs text-text-gray">{row.completed} tasks</span></td>
                  <td className="px-4 py-3"><span className="text-xs text-text-gray">{row.inProgress} tasks</span></td>
                  <td className="px-4 py-3">
                    <WorkloadBar assigned={row.assigned} completed={row.completed} inProgress={row.inProgress} />
                  </td>
                  <td className="px-4 py-3"><RoleBadge role={row.role} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}