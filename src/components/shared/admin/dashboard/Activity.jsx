import React, { useState, useEffect, useRef } from 'react'
import activityService from '@/services/activityServices'
import { formatTime, isToday, getLabel, groupByDate, filterMatch } from '@/utils/helper'
import { STATUS_LABEL } from '@/utils/constants'

const FILTERS = ['All', 'Created', 'Status']

const DOT_COLOR = {
  task_created:   'bg-button-primary',
  status_changed: 'bg-success',
}

function ActivityDot({ type }) {
  return (
    <div className="flex flex-col items-center pt-[5px]">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT_COLOR[type] ?? 'bg-text-gray'}`} />
    </div>
  )
}

function ActivityRow({ activity }) {
  const { target } = getLabel(activity)
  const displayName = activity.userEmail
    ? activity.userEmail.split('@')[0]
    : 'Admin'

  const actionText =
    activity.type === 'task_created'
      ? `created ${target}`
      : `${STATUS_LABEL[activity.nextStatus] ?? activity.nextStatus} ${target}`

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border-primary last:border-0">
      <ActivityDot type={activity.type} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-gray leading-snug truncate">
          <span className="font-semibold text-text-primary">{displayName}</span>{' '}
          {actionText}
        </p>
        <p className="text-[11px] text-text-gray mt-0.5">
          {formatTime(activity.createdAt)}
        </p>
      </div>
    </div>
  )
}

function DateDivider({ label }) {
  return (
    <div className="flex items-center gap-2 my-2">
      <div className="flex-1 h-px bg-border-primary" />
      <span className="text-[11px] text-text-gray">{label}</span>
      <div className="flex-1 h-px bg-border-primary" />
    </div>
  )
}

function Skeleton() {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex gap-3 items-start py-[9px] border-b border-border-primary last:border-0">
          <div className="w-2 h-2 rounded-full bg-border-primary animate-pulse mt-[5px] flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-[6px]">
            <div className="h-[9px] rounded-full bg-border-primary animate-pulse w-3/4" />
            <div className="h-[9px] rounded-full bg-border-primary animate-pulse w-2/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

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

  const filtered = activities.filter(a => filterMatch(a, activeFilter))
  const visible  = filtered.slice(0, 10)
  const grouped  = groupByDate(visible)

  return (
    <div className="bg-bg-primary border border-border-primary rounded-2xl px-5 py-4 h-full">

      <p className="text-sm font-semibold text-text-primary mb-3">Recent activity</p>

      <div className="flex bg-bg-page rounded-xl p-[3px] gap-[2px] mb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-1 py-1.5 px-2 rounded-[9px] text-[11px] font-medium transition-all border-none cursor-pointer ${
              activeFilter === f
                ? 'bg-bg-primary text-text-primary'
                : 'text-text-gray hover:text-text-primary bg-transparent'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto max-h-[260px] pr-1 flex flex-col gap-0.5">
        {loading ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <p className="text-xs text-text-gray py-2">No activity yet.</p>
        ) : (
          grouped.map(item =>
            item.type === 'divider' ? (
              <DateDivider key={`div-${item.label}`} label={item.label} />
            ) : (
              <ActivityRow key={item.data.id} activity={item.data} />
            )
          )
        )}
      </div>
    </div>
  )
}