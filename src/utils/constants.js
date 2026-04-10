export const POLL_INTERVAL = 10_000

export const AV_COLORS = [
  'bg-tt-av1-bg text-tt-av1-text',
  'bg-tt-av2-bg text-tt-av2-text',
  'bg-tt-av3-bg text-tt-av3-text',
  'bg-tt-av4-bg text-tt-av4-text',
  'bg-tt-av5-bg text-tt-av5-text',
]

// ── Chart Constants ───────────────────────────────────────────────────────────
export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const C = {
  indigo:      '#6366f1',
  indigoAlpha: 'rgba(99,102,241,0.1)',
  purple:      '#a855f7',
  purpleAlpha: 'rgba(168,85,247,0.08)',
  orange:      '#f97316',
  red:         '#e24b4a',
  green:       '#639922',
  grid: 'rgba(0,0,0,0.06)',
  tick: '#9B9B9B', 
}

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false },                          // ← remove vertical grid lines like the reference
      ticks: { color: C.tick, font: { size: 10 } },
      border: { display: false },
    },
    y: {
      grid: { color: C.grid, drawBorder: false },
      ticks: { color: C.tick, font: { size: 10 } },
      border: { display: false },
    },
  },
}


//Activity.jsx + TeamModal.jsx
export const STATUS_LABEL = {
  in_progress: 'In Progress',
  done:        'Done',
  backlog:     'Pending',
}

export const STATUS_BADGE = {
  in_progress: 'bg-tt-progress-bg text-tt-progress-text',
  done:        'bg-tt-done-bg text-tt-done-text',
  backlog:     'bg-tt-backlog-bg text-tt-backlog-text',
}

export const TYPE_META = {
  task_created:   { badgeCls: 'bg-tt-indigo-light text-tt-indigo',  label: 'Created' },
  status_changed: { badgeCls: 'bg-tt-orange-light text-tt-orange',  label: 'Status'  },
}