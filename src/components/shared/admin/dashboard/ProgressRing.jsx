export default function ProgressRing({ r, circ, doneOffset, progressOffset, completionRate, doneTasks, activeTasks, pendingTasks }) {
  return (
    <div className='bg-tt-bg-card rounded-3xl p-5 flex flex-col shadow-[var(--tt-shadow-card)]'>
      <p className='text-sm font-bold text-tt-text mb-1'>Task Progress</p>
      <p className='text-xs text-tt-text-muted mb-4'>Overall completion</p>


      <div className='flex-1 flex flex-col items-center justify-center'>
        <div className='relative flex items-center justify-center mb-4'>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-tt-slate-light)" strokeWidth="14"/>
            <circle cx="70" cy="70" r={r} fill="none"
              stroke="var(--color-tt-purple-muted)" strokeWidth="14"
              strokeDasharray={circ} strokeDashoffset={progressOffset}
              strokeLinecap="round" transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
            <circle cx="70" cy="70" r={r} fill="none"
              stroke="var(--color-tt-indigo)" strokeWidth="14"
              strokeDasharray={circ} strokeDashoffset={doneOffset}
              strokeLinecap="round" transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
          </svg>

          <div className='absolute text-center'>
            <p className='text-3xl font-bold text-tt-text'>{completionRate}%</p>
            <p className='text-xs text-tt-text-muted'>Done</p>
          </div>
        </div>


        <div className='w-full flex flex-col gap-2'>
          {[
            { label: 'Completed', value: doneTasks,    dotCls: 'bg-tt-indigo',      badgeCls: 'bg-tt-indigo-light text-tt-indigo'     },
            { label: 'Active',    value: activeTasks,  dotCls: 'bg-tt-purple-muted', badgeCls: 'bg-tt-purple-light text-tt-purple'     },
            { label: 'Pending',   value: pendingTasks, dotCls: 'bg-tt-slate-muted',  badgeCls: 'bg-tt-slate-light text-tt-slate-muted' },
          ].map(l => (
            <div key={l.label} className='flex items-center justify-between px-1'>
              <div className='flex items-center gap-2'>
                <div className={`w-2.5 h-2.5 rounded-full ${l.dotCls}`}/>
                <span className='text-xs text-tt-text-muted'>{l.label}</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${l.badgeCls}`}>
                {l.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}