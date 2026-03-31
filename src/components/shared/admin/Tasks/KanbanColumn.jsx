import TaskCard from './TaskCard'

const MAX_VISIBLE = 5

export default function KanbanColumn({ col, tasks, users, selectedUser, expanded, hasFilters, addingTo, onSelectUser, onAssign, onToggleExpand, onRefetch, isMobile = false, ci = 0 }) {
  const isExpanded = expanded[col.key]
  const visible    = isExpanded ? tasks : tasks.slice(0, MAX_VISIBLE)
  const remaining  = tasks.length - MAX_VISIBLE
  const isAdding   = addingTo === col.key

  return (
    <div className={`flex flex-col overflow-hidden p-3 ${col.bgCls} ${!isMobile && ci < 2 ? 'border-r border-tt-border' : ''}`}>
      <div className='flex items-center gap-1.5 mb-2.5 px-0.5 flex-shrink-0'>
        <div className={`w-2.5 h-2.5 rounded-full ${col.dot}`}/>
        <span className={`text-xs font-bold ${col.accentCls}`}>{col.label}</span>
        <span className={`text-xs ml-auto px-2 py-0.5 rounded-full font-semibold border border-tt-border ${col.accentCls} ${col.countCls}`}>
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
          <div className='rounded-xl py-8 text-center border border-dashed border-tt-border mb-1.5'>
            <p className='text-xs font-medium text-tt-text-hint'>
              {hasFilters ? 'No matching tasks' : 'No tasks yet'}
            </p>
          </div>
        )}

        {!isExpanded && remaining > 0 && (
          <button
            onClick={() => onToggleExpand(col.key)}
            className={`w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 mb-1.5 bg-transparent font-medium border border-dashed border-tt-border ${col.accentCls}`}
          >+ {remaining} more</button>
        )}
        {isExpanded && tasks.length > MAX_VISIBLE && (
          <button
            onClick={() => onToggleExpand(col.key)}
            className='w-full text-xs py-1.5 rounded-xl hover:opacity-80 mt-1.5 mb-1.5 bg-transparent border border-dashed border-tt-border text-tt-text-muted'
          >Show less</button>
        )}
      </div>
    </div>
  )
}