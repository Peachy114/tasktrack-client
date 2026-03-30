import EmployeeTaskCard from './TaskCard'

const MAX_VISIBLE = 5

export default function EmployeeKanbanColumn({ col, ci, tasks, search, expanded, dragOver, onToggleExpand, onStatusUpdate, onDragOver, onDragLeave, onDrop }) {
  const isExpanded = expanded[col.key]
  const visible    = isExpanded ? tasks : tasks.slice(0, MAX_VISIBLE)
  const remaining  = tasks.length - MAX_VISIBLE
  const isOver     = dragOver === col.key

  return (
    <div
      className={`p-3 transition-all ${col.bgCls} ${ci < 2 ? 'border-r border-tt-border' : ''}`}
      style={{
        outline:       isOver ? `2px dashed ${col.accent}` : '2px dashed transparent',
        outlineOffset: '-3px',
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header */}
      <div className='flex items-center gap-1.5 mb-2.5 px-0.5'>
        <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
        <span className={`text-xs font-bold ${col.accentCls}`}>{col.label}</span>
        <span className={`text-xs ml-auto px-2 py-0.5 rounded-full font-semibold border border-tt-border ${col.accentCls} ${col.countCls}`}>
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
        <div className='rounded-xl py-10 text-center border border-dashed border-tt-border mb-1.5'>
          <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${col.countCls}`}>
            <div className={`w-3 h-3 rounded-full opacity-40 ${col.dot}`} />
          </div>
          <p className='text-xs font-medium text-tt-text-hint'>
            {search ? 'No matching tasks' : 'No tasks here'}
          </p>
        </div>
      )}

      {/* Show more / less */}
      {!isExpanded && remaining > 0 && (
        <button
          onClick={() => onToggleExpand(col.key)}
          className={`w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 bg-transparent font-medium border border-dashed border-tt-border ${col.accentCls}`}
        >+ {remaining} more</button>
      )}
      {isExpanded && tasks.length > MAX_VISIBLE && (
        <button
          onClick={() => onToggleExpand(col.key)}
          className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 bg-transparent border border-dashed border-tt-border text-tt-text-muted'
        >Show less</button>
      )}
    </div>
  )
}