import TaskCard from './TaskCard'

const MAX_VISIBLE = 5

const COL_ICONS = {
  backlog: (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  in_progress: (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1"/>
      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  done: (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1"/>
      <path d="M5.5 8.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const COL_ACCENT = {
  backlog:     '#ff8a75',
  in_progress: '#2979FF',
  done:        '#00C48C',
}

export default function KanbanColumn({ col, tasks, users, selectedUser, expanded, hasFilters, addingTo, onSelectUser, onAssign, onToggleExpand, onRefetch, isMobile = false, ci = 0 }) {
  const isExpanded = expanded[col.key]
  const visible    = isExpanded ? tasks : tasks.slice(0, MAX_VISIBLE)
  const remaining  = tasks.length - MAX_VISIBLE
  const isAdding   = addingTo === col.key

  return (
    <div className='flex flex-col overflow-hidden p-3 bg-bg-page h-full'>

      <div
        className='flex items-center gap-1.5 mb-10 px-0.5 flex-shrink-0 pb-5'
        style={{ borderBottom: `2px solid ${COL_ACCENT[col.key]}` }}
      >
        {/* Icon */}
        <span className='text-text-primary'>
          {COL_ICONS[col.key]}
        </span>

        {/* Label */}
        <span className='text-xs font-bold text-text-primary'>{col.label}</span>

        {/* Count badge */}
        <span
          className='text-xs ml-auto px-2 py-0.5 rounded-full font-semibold text-white'
          style={{ background: COL_ACCENT[col.key] }}
        >
          {tasks.length}
        </span>
      </div>

      <div className='flex-1 overflow-y-auto min-h-0'>
        {visible.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            users={users}
            selectedUser={selectedUser?.[task.id] || ''}
            onSelectUser={onSelectUser}
            onAssign={onAssign}
            onRefetch={onRefetch}
          />
        ))}

        {tasks.length === 0 && !isAdding && (
          <div className='rounded-xl py-8 text-center border border-dashed border-border-primary mb-1.5'>
            <p className='text-xs font-medium text-text-gray'>
              {hasFilters ? 'No matching tasks' : 'No tasks yet'}
            </p>
          </div>
        )}

        {!isExpanded && remaining > 0 && (
          <button
            onClick={() => onToggleExpand(col.key)}
            className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 mb-1.5 bg-transparent font-medium border border-dashed border-border-primary text-text-gray'
          >
            + {remaining} more
          </button>
        )}

        {isExpanded && tasks.length > MAX_VISIBLE && (
          <button
            onClick={() => onToggleExpand(col.key)}
            className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 mb-1.5 bg-transparent border border-dashed border-border-primary text-text-gray'
          >
            Show less
          </button>
        )}
      </div>
    </div>
  )
}