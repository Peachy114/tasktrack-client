import EmployeeTaskCard from './TaskCard'

const MAX_VISIBLE = 5

const COL_ACCENT = {
  backlog:     '#ff8a75',
  in_progress: '#2979FF',
  done:        '#00C48C',
}

const COL_STYLES = {
  backlog:     { text: 'text-text-gray',  count: 'bg-bg-page',       dot: 'bg-text-gray'  },
  in_progress: { text: 'text-text-blue',  count: 'bg-bg-light-blue', dot: 'bg-button-primary' },
  done:        { text: 'text-success',    count: 'bg-bg-page',       dot: 'bg-success'    },
}

export default function EmployeeKanbanColumn({ col, ci, tasks, search, expanded, dragOver, onToggleExpand, onStatusUpdate, onDragOver, onDragLeave, onDrop }) {
  const isExpanded = expanded[col.key]
  const visible    = isExpanded ? tasks : tasks.slice(0, MAX_VISIBLE)
  const remaining  = tasks.length - MAX_VISIBLE
  const isOver     = dragOver === col.key
  const styles     = COL_STYLES[col.key] ?? COL_STYLES.backlog
  const accent     = COL_ACCENT[col.key] ?? '#E0E0E0'

  return (
    <div
      className={`p-3 transition-all bg-bg-page ${ci < 2 ? 'border-r border-border-primary' : ''}`}
      style={{
        outline:       isOver ? `2px dashed ${accent}` : '2px dashed transparent',
        outlineOffset: '-3px',
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header */}
      <div
        className='flex items-center gap-1.5 mb-2.5 px-0.5 pb-2.5'
        style={{ borderBottom: `2px solid ${accent}` }}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
        <span className={`text-xs font-bold ${styles.text}`}>{col.label}</span>
        <span className={`text-xs ml-auto px-2 py-0.5 rounded-full font-semibold border border-border-primary ${styles.text} ${styles.count}`}>
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      {visible.map(task => (
        <EmployeeTaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusUpdate}
        />
      ))}

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className='rounded-xl py-10 text-center border border-dashed border-border-primary mb-1.5'>
          <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${styles.count}`}>
            <div className={`w-3 h-3 rounded-full opacity-40 ${styles.dot}`} />
          </div>
          <p className='text-xs font-medium text-text-gray'>
            {search ? 'No matching tasks' : 'No tasks here'}
          </p>
        </div>
      )}

      {/* Show more / less */}
      {!isExpanded && remaining > 0 && (
        <button
          onClick={() => onToggleExpand(col.key)}
          className={`w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 bg-transparent font-medium border border-dashed border-border-primary ${styles.text}`}
        >+ {remaining} more</button>
      )}
      {isExpanded && tasks.length > MAX_VISIBLE && (
        <button
          onClick={() => onToggleExpand(col.key)}
          className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 bg-transparent border border-dashed border-border-primary text-text-gray'
        >Show less</button>
      )}
    </div>
  )
}