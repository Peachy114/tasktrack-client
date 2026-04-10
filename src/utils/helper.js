import { AV_COLORS } from './constants'
import { STATUS_LABEL } from './constants'

// ── Avatar ────────────────────────────────────────────────────────────────────
//Activity.jsx + TeamModal.jsx
export function avatarCls(email = '') {
  let hash = 0
  for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash)
  return AV_COLORS[Math.abs(hash) % AV_COLORS.length]
}

// ── Activity Helpers BELOW ──────────────────────────────────────────────────────────
//Activity.jsx
export function formatTime(date) {
  if (!date) return ''
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
}

export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

//Activity.jsx + TeamModal.jsx
export function isToday(date) {
  if (!date) return false
  return new Date(date).toDateString() === new Date().toDateString()
}


export function getLabel(activity) {
  switch (activity.type) {
    case 'task_created':   return { action: 'created',      target: activity.taskTitle }
    case 'status_changed': return { action: STATUS_LABEL[activity.nextStatus] ?? activity.nextStatus, target: activity.taskTitle }
    default:               return { action: 'did something', target: null }
  }
}

export function groupByDate(activities) {
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

export function filterMatch(a, f) {
  if (f === 'All')     return true
  if (f === 'Created') return a.type === 'task_created'
  if (f === 'Status')  return a.type === 'status_changed'
  return true
}