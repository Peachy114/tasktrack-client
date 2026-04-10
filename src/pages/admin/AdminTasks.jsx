import { useState, useEffect } from 'react'
import { AdminTasksProvider, useAdminTasksContext } from '@/hook/useAdminTask'
import AddTaskModal from '@/components/shared/admin/Tasks/AddTaskModal'
import KanbanColumn from '@/components/shared/admin/Tasks/KanbanColumn'
import TaskToolbar  from '@/components/shared/admin/Tasks/TaskToolbar'
import TaskListView from '@/components/shared/admin/Tasks/TaskListView'
import TaskListViewSkeleton from '@/components/shared/admin/Tasks/TaskListViewSkeleton'

const COLUMNS = [
  { key: 'backlog',     label: 'BACKLOG',     borderCls: 'border-border-primary' },
  { key: 'in_progress', label: 'IN PROGRESS', borderCls: 'border-border-primary' },
  { key: 'done',        label: 'DONE',        borderCls: 'border-border-primary' },
]

const ITEMS_PER_PAGE = 12

function AdminTasksContent() {
  const [view, setView] = useState('list')
  const [page, setPage] = useState(1)

  const {
    users, filteredTasks, loading,
    showModal, modalForm, setModalForm,
    handleModalSubmit, handleCloseModal,
    hasFilters, expanded, toggleExpand,
    selectedUser, handleSelectUser, handleAssign,
    activeTab, fetchTasks,
  } = useAdminTasksContext()

  const totalPages     = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE)
  const paginatedTasks = filteredTasks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const startItem      = filteredTasks.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1
  const endItem        = Math.min(page * ITEMS_PER_PAGE, filteredTasks.length)

  useEffect(() => { setPage(1) }, [filteredTasks.length])

  return (
    <div className='flex h-screen overflow-hidden bg-bg-primary mt-5 rounded-2xl py-2 px-5'>
      <div className='flex-1 min-w-0 flex flex-col overflow-hidden'>

        <AddTaskModal
          show={showModal}      loading={loading}
          modalForm={modalForm} onChange={setModalForm}
          onSubmit={handleModalSubmit}
          onClose={handleCloseModal}
        />

        <div className='flex-1 overflow-hidden'>
          <div className='h-full flex flex-col overflow-hidden gap-3'>

            {/* Toolbar — ViewToggle is now inside TaskToolbar */}
            <TaskToolbar view={view} setView={setView} />

            {/* LIST VIEW */}
            {view === 'list' && (
              <div className='flex-1 min-h-0 flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-primary'>

                <div className='flex-1 overflow-y-auto'>
                  {loading || (filteredTasks.length === 0 && !hasFilters)
                    ? <TaskListViewSkeleton rows={12} />
                    : <TaskListView
                        tasks={paginatedTasks}
                        users={users}
                        selectedUser={selectedUser}
                        onSelectUser={handleSelectUser}
                        onAssign={handleAssign}
                      />
                  }
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                  <div className='flex items-center justify-between px-4 py-2.5 border-t border-border-primary flex-shrink-0'>
                    <p className='text-xs text-text-gray'>
                      {startItem}–{endItem} of {filteredTasks.length} tasks
                    </p>
                    <div className='flex items-center gap-1'>
                      <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                        className='w-7 h-7 rounded-lg flex items-center justify-center border border-border-primary text-text-gray hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed bg-transparent'
                      >
                        <svg width='12' height='12' viewBox='0 0 16 16' fill='none'>
                          <path d='M10 3L5 8l5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                        </svg>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`w-7 h-7 rounded-lg text-xs font-medium border transition-colors ${
                            page === n
                              ? 'bg-button-primary text-white border-button-primary'
                              : 'border-border-primary text-text-gray hover:opacity-80 bg-transparent'
                          }`}
                        >
                          {n}
                        </button>
                      ))}

                      <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                        className='w-7 h-7 rounded-lg flex items-center justify-center border border-border-primary text-text-gray hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed bg-transparent'
                      >
                        <svg width='12' height='12' viewBox='0 0 16 16' fill='none'>
                          <path d='M6 3l5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOARD VIEW */}
            {view === 'board' && (
              <>
                <div className='hidden md:grid md:grid-cols-3 flex-1 min-h-0 gap-4'>
                  {COLUMNS.map((col, ci) => (
                    <div key={col.key} className={`rounded-2xl border overflow-hidden ${col.borderCls}`}>
                      <KanbanColumn
                        col={col} ci={ci}
                        tasks={filteredTasks.filter(t => t.status === col.key)}
                        users={users}           selectedUser={selectedUser}
                        expanded={expanded}     hasFilters={hasFilters}
                        onSelectUser={handleSelectUser}
                        onAssign={handleAssign}
                        onToggleExpand={toggleExpand}
                        onRefetch={fetchTasks}
                      />
                    </div>
                  ))}
                </div>

                <div className='md:hidden flex-1 overflow-y-auto'>
                  {COLUMNS.filter(col => col.key === activeTab).map((col, ci) => (
                    <div key={col.key} className={`rounded-2xl border-2 overflow-hidden ${col.borderCls}`}>
                      <KanbanColumn
                        col={col} ci={ci} isMobile
                        tasks={filteredTasks.filter(t => t.status === col.key)}
                        users={users}           selectedUser={selectedUser}
                        expanded={expanded}     hasFilters={hasFilters}
                        onSelectUser={handleSelectUser}
                        onAssign={handleAssign}
                        onToggleExpand={toggleExpand}
                        onRefetch={fetchTasks}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminTasks() {
  return (
    <AdminTasksProvider>
      <AdminTasksContent />
    </AdminTasksProvider>
  )
}