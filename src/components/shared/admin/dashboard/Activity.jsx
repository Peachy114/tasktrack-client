import React, { useState, useEffect, useRef } from 'react'
import activityService from '@/services/activityServices'
import { avatarCls } from '@/utils/helper'

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(date) {
  if (!date) return ''
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const STATUS_LABEL = {
  in_progress: 'In Progress',
  done:        'Done',
  backlog:     'Pending',
}

const STATUS_BADGE = {
  in_progress: 'bg-tt-progress-bg text-tt-progress-text',
  done:        'bg-tt-done-bg text-tt-done-text',
  backlog:     'bg-tt-backlog-bg text-tt-backlog-text',
}

const TYPE_META = {
  task_created:   { badgeCls: 'bg-tt-indigo-light text-tt-indigo',  label: 'Created'  },
  status_changed: { badgeCls: 'bg-tt-orange-light text-tt-orange',  label: 'Status'   },
}

function getLabel(activity) {
  switch (activity.type) {
    case 'task_created':   return { action: 'created',                                       target: activity.taskTitle }
    case 'status_changed': return { action: STATUS_LABEL[activity.nextStatus] ?? activity.nextStatus, target: activity.taskTitle }
    default:               return { action: 'did something', target: null }
  }
}

function groupByDate(activities) {
  const groups = []
  let currentDate = null
  activities.forEach(a => {
    const label = formatDate(a.createdAt)
    if (label !== currentDate) {
      currentDate = label
      groups.push({ type: 'divider', label })
    }
    groups.push({ type: 'item', data: a })
  })
  return groups
}

const FILTERS = ['All', 'Created', 'Status']

function filterMatch(a, f) {
  if (f === 'All')     return true
  if (f === 'Created') return a.type === 'task_created'
  if (f === 'Status')  return a.type === 'status_changed'
  return true
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function ActivityIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Avatar({ email = 'A' }) {
  return (
    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${avatarCls(email)}`}>
      {(email[0] ?? 'A').toUpperCase()}
    </div>
  )
}

function DateDivider({ label }) {
  return (
    <div className='flex items-center gap-2 my-2'>
      <div className='flex-1 h-px bg-tt-border' />
      <span className='text-[9px] font-bold tracking-widest uppercase text-tt-text-hint bg-tt-bg-muted border border-tt-border px-2.5 py-0.5 rounded-full'>
        {label}
      </span>
      <div className='flex-1 h-px bg-tt-border' />
    </div>
  )
}

function ActivityRow({ activity }) {
  const meta = TYPE_META[activity.type] ?? TYPE_META.task_created
  const { action, target } = getLabel(activity)
  const displayName = activity.userEmail
    ? activity.userEmail.split('@')[0]
    : 'Admin'
  const statusBadge = activity.nextStatus ? STATUS_BADGE[activity.nextStatus] : null

  return (
    <div className='flex items-start gap-2.5 py-2.5 px-3 rounded-2xl hover:bg-tt-bg-muted transition-colors duration-150 group'>
      <Avatar email={activity.userEmail ?? 'admin'} />

      <div className='flex-1 min-w-0'>
        {/* Name + Time on the same row */}
        <div className='flex items-center justify-between gap-2 mb-1'>
          <span className='text-[11px] font-bold text-tt-text capitalize truncate'>
            {displayName}
          </span>
          <span className='text-[10px] text-tt-text-hint flex-shrink-0'>
            {formatTime(activity.createdAt)}
          </span>
        </div>

        {/* Action row */}
        <div className='flex items-center gap-1.5 flex-wrap'>
          {activity.type === 'task_created' ? (
            <>
              <span className='text-[10px] text-tt-text-muted'>Created</span>
              {target && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full truncate max-w-[120px] inline-block ${meta.badgeCls}`}>
                  {target}
                </span>
              )}
            </>
          ) : (
            <>
              <span className='text-[10px] text-tt-text-muted'>Marked</span>
              {target && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full truncate max-w-[120px] inline-block ${meta.badgeCls}`}>
                  {target}
                </span>
              )}
              {statusBadge && (
                <>
                  <span className='text-[10px] text-tt-text-hint'>as</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge}`}>
                    {STATUS_LABEL[activity.nextStatus] ?? activity.nextStatus}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div className='flex flex-col gap-1'>
      {[0.9, 0.7, 0.85, 0.6].map((op, i) => (
        <div key={i} className='flex gap-2.5 items-start px-3 py-2.5'>
          <div className='w-7 h-7 rounded-xl bg-tt-bg-muted animate-pulse flex-shrink-0' style={{ animationDelay: `${i * 0.15}s` }} />
          <div className='flex-1 flex flex-col gap-1.5'>
            <div className='h-3 rounded-full bg-tt-bg-muted animate-pulse w-1/3' style={{ opacity: op }} />
            <div className='h-3 rounded-full bg-tt-bg-muted animate-pulse w-2/3' style={{ opacity: op * 0.7 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Activity() {
  const [activities,   setActivities]   = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading,      setLoading]      = useState(true)
  const prevIdsRef = useRef(new Set())

  useEffect(() => {
    const unsubscribe = activityService.subscribe((data) => {
      setActivities(data)
      setLoading(false)
      prevIdsRef.current = new Set(data.map(a => a.id))
    })
    return () => unsubscribe()
  }, [])

  const filtered  = activities.filter(a => filterMatch(a, activeFilter))
  const grouped   = groupByDate(filtered)
  const itemCount = filtered.length 

  return (
    <div className='py-6 h-96 max-w-7xl mx-auto overflow-auto'>
      <div className='bg-tt-bg-card rounded-2xl border border-tt-border h-full flex flex-col overflow-hidden'>

        {/* ── Toolbar (matches AdminTask style) ── */}
        <div className='flex items-center justify-between px-5 py-3 border-b border-tt-border bg-tt-bg-muted rounded-t-2xl'>
          <div className='flex items-center gap-2'>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className='text-tt-primary'>
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className='text-sm font-semibold text-tt-primary'>Activity</p>
            <span className='text-xs px-2 py-0.5 rounded-full font-medium bg-tt-border text-tt-primary'>
              {itemCount} events
            </span>
          </div>

          {/* Filter tabs */}
          <div className='flex items-center gap-1 p-1 bg-tt-bg-card rounded-xl border border-tt-border'>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg border-none cursor-pointer transition-all duration-150 ${
                  activeFilter === f
                    ? 'bg-tt-primary text-white shadow-sm'
                    : 'bg-transparent text-tt-text-muted hover:text-tt-text'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Live dot */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold transition-all ${
            loading
              ? 'bg-tt-bg-muted border-tt-border text-tt-text-hint'
              : 'bg-tt-done-bg border-tt-done-bg text-tt-done-text'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-tt-text-hint' : 'bg-tt-done-text animate-pulse'}`} />
            {loading ? 'Loading' : 'Live'}
          </div>
        </div>

        {/* ── Feed ── */}
        <div className='flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-tt-border'>
          {loading ? (
            <Skeleton />
          ) : itemCount === 0 ? (
            <div className='flex flex-col items-center justify-center h-44 gap-2'>
              <div className='w-10 h-10 rounded-2xl bg-tt-bg-muted text-tt-text-hint flex items-center justify-center'>
                <ActivityIcon />
              </div>
              <p className='text-xs text-tt-text-hint font-medium'>No activity yet</p>
            </div>
          ) : (
            <div className='flex flex-col'>
              {grouped.map((item, i) =>
                item.type === 'divider' ? (
                  <DateDivider key={`divider-${item.label}`} label={item.label} />
                ) : (
                  <ActivityRow key={item.data.id} activity={item.data} />
                )
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {!loading && itemCount > 0 && (
          <div className='px-5 py-2.5 border-t border-tt-border bg-tt-bg-muted rounded-b-2xl flex items-center justify-between'>
            <span className='text-[10px] font-semibold text-tt-text-hint bg-tt-bg-card border border-tt-border px-2.5 py-0.5 rounded-full'>
              {itemCount} event{itemCount !== 1 ? 's' : ''}
            </span>
            <span className='text-[10px] text-tt-text-hint font-medium'>Real-time updates</span>
          </div>
        )}
      </div>
    </div>
  )
}