import AssigneeDropdown from "@/components/ui/AssigneeDropdown_TaskListView"

const STATUS_CONFIG = {
  in_progress: {
    label: 'In Progress',
    cls: 'bg-bg-light-blue text-text-blue border border-border-primary',
  },
  backlog: {
    label: 'Backlog',
    cls: 'bg-bg-page text-text-gray border border-border-primary',
  },
  done: {
    label: 'Done',
    cls: 'bg-bg-page text-success border border-border-primary',
  },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.backlog
  return (
    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-md whitespace-nowrap ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

function MobileCard({ task, users, selectedUser, onSelectUser, onAssign }) {
  return (
    <div className='px-4 py-3 border-b border-border-primary last:border-0'>

      {/* Title + status */}
      <div className='flex items-start justify-between gap-2 mb-1'>
        <p className='text-text-primary font-medium text-sm truncate flex-1'>{task.title}</p>
        <StatusBadge status={task.status} />
      </div>

      {/* Description */}
      {task.description && (
        <p className='text-text-gray text-xs truncate mb-3'>{task.description}</p>
      )}

      {/* Footer: assignee + date */}
      <div className='flex items-center justify-between gap-2'>
        <AssigneeDropdown
          taskId={task.id}
          users={users}
          value={selectedUser[task.id] ?? task.assignedTo ?? ''}
          onChange={(taskId, userId) => {
            onSelectUser(taskId, userId)
            onAssign(taskId, userId)
          }}
        />
        <span className='text-xs text-text-gray whitespace-nowrap'>
          {task.created_at
            ? new Date(task.created_at).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
              })
            : '—'}
        </span>
      </div>

    </div>
  )
}

export default function TaskListView({ tasks, users, selectedUser, onSelectUser, onAssign }) {
  if (!tasks.length) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-text-gray text-sm'>
        <p className='font-medium'>No tasks found</p>
        <p className='text-xs mt-1'>Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full'>

      {/* Mobile — card list */}
      <div className='md:hidden'>
        {tasks.map(task => (
          <MobileCard
            key={task.id}
            task={task}
            users={users}
            selectedUser={selectedUser}
            onSelectUser={onSelectUser}
            onAssign={onAssign}
          />
        ))}
      </div>

      {/* Desktop — table */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full min-w-[640px] border-collapse text-sm'>

          <thead>
            <tr className='border-b border-border-primary bg-bg-page'>
              <th className='text-left text-xs font-normal text-text-gray px-3 py-2.5 w-1/2'>Task</th>
              <th className='text-left text-xs font-normal text-text-gray px-3 py-2.5'>Status</th>
              <th className='text-left text-xs font-normal text-text-gray px-3 py-2.5'>Assignee</th>
              <th className='text-right text-xs font-normal text-text-gray px-3 py-2.5'>Created</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => (
              <tr
                key={task.id}
                className='border-b border-border-primary last:border-b-0 hover:bg-bg-page transition-colors duration-100'
              >
                <td className='px-3 py-3'>
                  <p className='text-text-primary font-medium text-sm truncate'>{task.title}</p>
                  <p className='text-text-gray text-xs mt-0.5 truncate'>{task.description}</p>
                </td>

                <td className='px-3 py-3 whitespace-nowrap'>
                  <StatusBadge status={task.status} />
                </td>

                <td className='px-3 py-3'>
                  <AssigneeDropdown
                    taskId={task.id}
                    users={users}
                    value={selectedUser[task.id] ?? task.assignedTo ?? ''}
                    onChange={(taskId, userId) => {
                      onSelectUser(taskId, userId)
                      onAssign(taskId, userId)
                    }}
                  />
                </td>

                <td className='px-3 py-3 text-right text-xs text-text-gray whitespace-nowrap'>
                  {task.created_at
                    ? new Date(task.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}