import { AV_COLORS, MONTHS } from './constants'

export function avatarCls(email = '') {
  let hash = 0
  for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash)
  return AV_COLORS[Math.abs(hash) % AV_COLORS.length]
}

export function buildMonthlyData(tasks, monthCount = 6) {
  const now = new Date()
  const labels = []
  const pending = [], inProgress = [], completed = []

  for (let i = monthCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    labels.push(MONTHS[d.getMonth()])
    const monthTasks = tasks.filter(t => {
      const date = t.createdAt ? new Date(t.createdAt) : null
      return date && date.getMonth() === d.getMonth() && date.getFullYear() === d.getFullYear()
    })
    pending.push(monthTasks.filter(t => t.status === 'backlog').length)
    inProgress.push(monthTasks.filter(t => t.status === 'in_progress').length)
    completed.push(monthTasks.filter(t => t.status === 'done').length)
  }

  return { labels, pending, inProgress, completed }
}