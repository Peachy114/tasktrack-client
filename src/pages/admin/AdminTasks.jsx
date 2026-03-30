import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useFetch } from '../../hook/useFetch'
import { taskService } from '../../services/taskServices'
import { userService } from '../../services/userService'
import { getToken } from '../../utils/getToken'
import { useStatus } from '../../hook/useStatus'
import { toast } from 'sonner'
import AddTaskModal from '@/components/shared/admin/Tasks/AddTaskModal'
import KanbanColumn from '@/components/shared/admin/Tasks/KanbanColumn'
import TaskToolbar from '@/components/shared/admin/Tasks/TaskToolbar'

const COLUMNS = [
  { key: 'backlog',     label: 'Backlog',     dot: 'bg-tt-col-backlog-dot',  accentCls: 'text-tt-col-backlog-accent',  countCls: 'bg-tt-col-backlog-count',  bgCls: 'bg-tt-col-backlog-bg'  },
  { key: 'in_progress', label: 'In Progress', dot: 'bg-tt-col-progress-dot', accentCls: 'text-tt-col-progress-accent', countCls: 'bg-tt-col-progress-count', bgCls: 'bg-tt-col-progress-bg' },
  { key: 'done',        label: 'Done',        dot: 'bg-tt-col-done-dot',     accentCls: 'text-tt-col-done-accent',     countCls: 'bg-tt-col-done-count',     bgCls: 'bg-tt-col-done-bg'     },
]

const EMPTY_ARRAY = []

export default function AdminTasks() {
  const { loading, start, done } = useStatus()
  const { data: tasks = EMPTY_ARRAY, fetch: fetchTasks } = useFetch(taskService.getAll)
  const { data: users = EMPTY_ARRAY, fetch: fetchUsers } = useFetch(userService.getAll)

  const [selectedUser,     setSelectedUser]     = useState({})
  const [showModal,        setShowModal]        = useState(false)
  const [modalForm,        setModalForm]        = useState({ title: '', description: '' })
  const [search,           setSearch]           = useState('')
  const [filterUser,       setFilterUser]       = useState('')
  const [sortBy,           setSortBy]           = useState('')
  const [expanded,         setExpanded]         = useState({})
  const [addingTo,         setAddingTo]         = useState(null)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [activeTab,        setActiveTab]        = useState('backlog')
  const mobileSearchRef = useRef(null)

  useEffect(() => { fetchTasks(); fetchUsers() }, [fetchTasks, fetchUsers])

  const handleModalSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!modalForm.title.trim()) {
      toast.error('Please add a title.')
    return
    }
    if (!modalForm.description.trim()) {
      toast.error('Please add a description.')
      return
    }
    try {
      start()
      const token = await getToken()
      await taskService.create(token, { ...modalForm, status: 'backlog' })
      setModalForm({ title: '', description: '' })
      toast.success('Task created!')
      fetchTasks()
      setShowModal(false)
    } catch (err) { toast.error(err.message) }
    finally { done() }
  }, [modalForm, start, done, fetchTasks])

  const handleAssign = useCallback(async (taskId, userId) => {
    try {
      const token = await getToken()
      const user  = users.find(u => u.uid === (userId || selectedUser[taskId]))
      if (!user) return
      await taskService.assign(token, taskId, { userId: user.uid, userEmail: user.email })
      fetchTasks()
    } catch (err) { console.error(err.message) }
  }, [users, selectedUser, fetchTasks])

  const handleSelectUser = useCallback(
    (taskId, userId) => setSelectedUser(prev => ({ ...prev, [taskId]: userId })), []
  )

  const toggleExpand  = useCallback((key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] })), [])
  const clearFilters  = useCallback(() => { setSearch(''); setFilterUser(''); setSortBy('') }, [])
  const hasFilters    = search || filterUser || sortBy

  const filteredTasks = useMemo(() => tasks
    .filter(task => {
      const matchSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
      const matchUser =
        filterUser === ''           ? true :
        filterUser === 'unassigned' ? !task.assignedEmail :
        task.assignedEmail === filterUser
      return matchSearch && matchUser
    })
    .sort((a, b) => {
      if (sortBy === 'title_asc')  return a.title.localeCompare(b.title)
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title)
      if (sortBy === 'assigned')   return (a.assignedEmail || '').localeCompare(b.assignedEmail || '')
      if (sortBy === 'unassigned') return a.assignedEmail ? 1 : -1
      return 0
    }),
  [tasks, search, filterUser, sortBy])


  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='flex-1 min-w-0 flex flex-col overflow-hidden transition-all duration-300'>

        <AddTaskModal
          show={showModal} loading={loading}
          modalForm={modalForm} onChange={setModalForm}
          onSubmit={handleModalSubmit}
          onClose={() => { setShowModal(false); 
          setModalForm({ title: '', description: '' }) }}
        />

        <div className='flex-1 overflow-hidden px-3 py-3 sm:px-6 sm:py-6'>
          <div className='h-full flex flex-col rounded-2xl bg-tt-bg-card border border-tt-border overflow-hidden'>

            <TaskToolbar
              filteredCount={filteredTasks.length}
              search={search} setSearch={setSearch}
              sortBy={sortBy}           
              setSortBy={setSortBy}
              filterUser={filterUser}   
              setFilterUser={setFilterUser}
              showMobileSearch={showMobileSearch} 
              setShowMobileSearch={setShowMobileSearch}
              mobileSearchRef={mobileSearchRef}
              hasFilters={hasFilters}   
              clearFilters={clearFilters}
              onAddTask={() => setShowModal(true)}
              columns={COLUMNS}
              filteredTasks={filteredTasks}
              activeTab={activeTab}     
              setActiveTab={setActiveTab}
              users={users}
            />

            {/* Mobile */}
            <div className='md:hidden flex-1 overflow-y-auto'>
              {COLUMNS.filter(col => col.key === activeTab).map((col, ci) => (
                <KanbanColumn
                  key={col.key} col={col} ci={ci} isMobile
                  tasks={filteredTasks.filter(t => t.status === col.key)}
                  users={users} 
                  selectedUser={selectedUser}
                  expanded={expanded} 
                  hasFilters={hasFilters} 
                  addingTo={addingTo}
                  onSelectUser={handleSelectUser} 
                  onAssign={handleAssign}
                  onToggleExpand={toggleExpand}
                />
              ))}
            </div>

            {/* Desktop */}
            <div className='hidden md:grid md:grid-cols-3 flex-1 min-h-0'>
              {COLUMNS.map((col, ci) => (
                <KanbanColumn
                  key={col.key} col={col} ci={ci}
                  tasks={filteredTasks.filter(t => t.status === col.key)}
                  users={users} 
                  selectedUser={selectedUser}
                  expanded={expanded} 
                  hasFilters={hasFilters} 
                  addingTo={addingTo}
                  onSelectUser={handleSelectUser} 
                  onAssign={handleAssign}
                  onToggleExpand={toggleExpand}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}