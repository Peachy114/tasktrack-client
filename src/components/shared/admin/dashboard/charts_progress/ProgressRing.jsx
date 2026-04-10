// export default function ProgressRing({ completionRate, doneTasks, activeTasks, pendingTasks }) {
//   const total = doneTasks + activeTasks + pendingTasks || 1

//   const stats = [
//     { label: 'Completed', value: doneTasks,    color: '#00C48C', pct: Math.round((doneTasks    / total) * 100) },
//     { label: 'Active',    value: activeTasks,  color: '#2979FF', pct: Math.round((activeTasks  / total) * 100) },
//     { label: 'Pending',   value: pendingTasks, color: '#9B9B9B', pct: Math.round((pendingTasks / total) * 100) },
//   ]

//   return (
//     <div>
//       <p className="text-sm font-semibold text-text-primary">Task progress</p>
//       <p className="text-xs text-text-gray mt-0.5 mb-5">Overall completion</p>

//       <div className="flex items-baseline gap-1.5 mb-5">
//         <span className="text-4xl font-bold text-text-primary leading-none">{completionRate}</span>
//         <span className="text-base font-medium text-text-gray">%</span>
//         <span className="text-xs text-text-gray ml-1">of tasks done</span>
//       </div>

//       {/* Segmented bar */}
//       <div className="w-full h-1.5 rounded-full bg-bg-light-blue overflow-hidden flex mb-5">
//         <div className="h-full transition-all duration-500" style={{ width: `${stats[0].pct}%`, background: '#2979FF' }} />
//         <div className="h-full transition-all duration-500" style={{ width: `${stats[1].pct}%`, background: '#00C48C' }} />
//         <div className="h-full transition-all duration-500" style={{ width: `${stats[2].pct}%`, background: '#FFB800' }} />
//       </div>

//       {/* Rows */}
//       <div className="flex flex-col divide-y divide-border-primary">
//         {stats.map(s => (
//           <div key={s.label} className="flex items-center justify-between py-2.5">
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
//               <span className="text-xs text-text-gray">{s.label}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-[11px] text-text-gray">{s.pct}%</span>
//               <span className="text-sm font-medium text-text-primary w-3 text-right">{s.value}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

export default function ProgressRing({ completionRate, doneTasks, activeTasks, pendingTasks }) {
  const total = doneTasks + activeTasks + pendingTasks || 1

  const stats = [
    { label: 'Completed', value: doneTasks,    color: '#00C48C', pct: doneTasks    / total },
    { label: 'Active',    value: activeTasks,  color: '#2979FF', pct: activeTasks  / total },
    { label: 'Pending',   value: pendingTasks, color: '#E0E0E0', pct: pendingTasks / total },
  ]

  const R = 70
  const STROKE = 18
  const GAP = 3
  const circumference = 2 * Math.PI * R

  // Build arc segments
  let offset = 0
  const segments = stats.map((s) => {
    const dash = Math.max(0, s.pct * circumference - GAP)
    const seg = { ...s, dash, gap: circumference - dash, offset }
    offset += s.pct * circumference
    return seg
  })

  return (
    <div>
      <p className="text-sm font-semibold text-text-primary">Task progress</p>
      <p className="text-xs text-text-gray mt-0.5 mb-4">Overall completion</p>

      {/* Donut */}
      <div className="flex items-center justify-center my-2">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Background ring */}
            <circle
              cx="90" cy="90" r={R}
              fill="none"
              stroke="#F0F0F0"
              strokeWidth={STROKE}
            />
            {/* Segments */}
            {segments.map((s) => (
              <circle
                key={s.label}
                cx="90" cy="90" r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={STROKE}
                strokeDasharray={`${s.dash} ${s.gap}`}
                strokeDashoffset={circumference / 4 - s.offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.6s ease' }}
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] text-text-gray">Total tasks</span>
            <span className="text-3xl font-bold text-text-primary leading-tight">{total}</span>
            <span className="text-xs text-text-gray">{completionRate}% done</span>
          </div>
        </div>
      </div>

      {/* Legend rows */}
      <div className="flex flex-col divide-y divide-border-primary mt-2">
        {stats.map(s => (
          <div key={s.label} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-xs text-text-gray">{s.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-text-gray">{Math.round(s.pct * 100)}%</span>
              <span className="text-sm font-medium text-text-primary w-4 text-right">{s.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}