const statusStyle = {
  done:        { background: 'var(--tt-done-bg)',     color: 'var(--tt-done-text)'     },
  in_progress: { background: 'var(--tt-progress-bg)', color: 'var(--tt-progress-text)' },
  backlog:     { background: 'var(--tt-backlog-bg)',  color: 'var(--tt-backlog-text)'  },
}

export default function EmployeeTaskCard({ task }) {
    
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
      style={{
        background: 'var(--tt-bg-card)',
        border:     '0.5px solid var(--tt-border)',
        cursor:     'grab',
      }}
      className='rounded-lg p-2.5 mb-1.5'>

      {/* Title + status badge */}
      <div className='flex justify-between items-start gap-2 mb-1.5'>
        <div className='flex-1 min-w-0'>
          <h3 style={{ color: 'var(--tt-text)' }} className='text-xs font-medium truncate'>
            {task.title}
          </h3>
          <p style={{ color: 'var(--tt-text-muted)' }} className='text-xs mt-0.5 truncate'>
            {task.description}
          </p>
        </div>
        <span
          style={statusStyle[task.status] || statusStyle.backlog}
          className='text-xs px-1.5 py-0.5 rounded-md font-medium flex-shrink-0'>
          {task.status === 'in_progress' ? 'Active' :
           task.status === 'done'        ? 'Done'   : 'Todo'}
        </span>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '0.5px solid var(--tt-border)' }}
        className='flex items-center justify-between pt-1.5'>
        <p style={{ color: 'var(--tt-text-hint)' }} className='text-xs'>
          Assigned to me
        </p>

        {/* Drag handle hint */}
        <div style={{ color: 'var(--tt-text-hint)' }} className='flex items-center gap-1 text-xs'>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <circle cx="5"  cy="4"  r="1.2" fill="currentColor"/>
            <circle cx="5"  cy="8"  r="1.2" fill="currentColor"/>
            <circle cx="5"  cy="12" r="1.2" fill="currentColor"/>
            <circle cx="11" cy="4"  r="1.2" fill="currentColor"/>
            <circle cx="11" cy="8"  r="1.2" fill="currentColor"/>
            <circle cx="11" cy="12" r="1.2" fill="currentColor"/>
          </svg>
          drag
        </div>
      </div>
    </div>
  )
}