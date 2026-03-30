export const POLL_INTERVAL = 10_000

export const AV_COLORS = [
  'bg-tt-av1-bg text-tt-av1-text',
  'bg-tt-av2-bg text-tt-av2-text',
  'bg-tt-av3-bg text-tt-av3-text',
  'bg-tt-av4-bg text-tt-av4-text',
  'bg-tt-av5-bg text-tt-av5-text',
]

export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const C = {
  indigo:      '#6366f1',
  indigoAlpha: 'rgba(99,102,241,0.1)',
  purple:      '#a855f7',
  purpleAlpha: 'rgba(168,85,247,0.08)',
  orange:      '#f97316',
  red:         '#e24b4a',
  green:       '#639922',
  grid:        'rgba(255,255,255,0.05)',
  tick:        '#4b5673',
}

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: C.grid }, ticks: { color: C.tick, font: { size: 10 } } },
    y: { grid: { color: C.grid }, ticks: { color: C.tick, font: { size: 10 } } },
  },
}