import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useFetch } from './useFetch'
import { taskService } from '@/services/taskServices'
import { userService } from '@/services/userService'
import { getToken } from '@/utils/getToken'
import { useStatus } from './useStatus'
import { toast } from 'sonner'

const EMPTY_ARRAY = []
const AdminTasksContext = createContext(null)

// This file contains the context provider and hook for the AdminTasks page, 
// which has a lot of state and logic related to managing tasks.
// By putting it in a context, we can keep the AdminTasks.jsx component cleaner and more focused on rendering, 
// while still having access to all the necessary data and functions through the context. 
// The provider fetches tasks and users, manages the state for the add task modal, search/filter/sort functionality, and task assignment logic. 
// The useAdminTasksContext hook allows any component within the provider to easily access this data and functionality without prop drilling.
export function AdminTasksProvider({ children }) {
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
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [activeTab,        setActiveTab]        = useState('backlog')
  const mobileSearchRef = useRef(null)

  useEffect(() => { fetchTasks(); fetchUsers() }, [fetchTasks, fetchUsers])

  //submitting the Add Task form.
  const handleModalSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!modalForm.title.trim())       { toast.error('Please add a title.');       return }
    if (!modalForm.description.trim()) { toast.error('Please add a description.'); return }
    try {
      start()
      const token = await getToken()
      await taskService.create(token, { ...modalForm, status: 'backlog' })
      toast.success('Task created!')
      await fetchTasks()
      setModalForm({ title: '', description: '' })
      setShowModal(false)
    } catch (err) {
      toast.error(err.message)
    } finally {
      done()
    }
  }, [modalForm, start, done, fetchTasks])

  const handleAssign = useCallback(async (taskId, userId) => {
    try {
      const token = await getToken()
      const user  = users.find(u => u.uid === (userId || selectedUser[taskId]))
      if (!user) return
      await taskService.assign(token, taskId, { userId: user.uid, userEmail: user.email })
      await fetchTasks()
    } catch (err) { console.error(err.message) }
  }, [users, selectedUser, fetchTasks])

  //handles selecting a user from the dropdown when assigning a task.
  const handleSelectUser = useCallback(
    (taskId, userId) => setSelectedUser(prev => ({ ...prev, [taskId]: userId })), []
  )

  //handles closing the Add Task modal and resetting the form state.
  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setModalForm({ title: '', description: '' })
  }, [])

  //toggles the expanded state of a task in the UI,
  // allowing the admin to see more details about the task when expanded.
  const toggleExpand = useCallback(
    (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] })), []
  )

  //clears all search, filter, and sort options, resetting the task list to its default state.
  const clearFilters = useCallback(() => {
    setSearch(''); setFilterUser(''); setSortBy('')
  }, [])

  //filters and sorts the tasks based on the current search, filter, and sort state.
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

  // The value provided by the context, which includes all the data and functions needed by components within the AdminTasks page.
  const value = {
    users, filteredTasks, loading,
    showModal, setShowModal, modalForm, setModalForm,
    handleModalSubmit, handleCloseModal,
    search, setSearch, filterUser, setFilterUser,
    sortBy, setSortBy, hasFilters: !!(search || filterUser || sortBy), clearFilters,
    expanded, toggleExpand,
    selectedUser, handleSelectUser, handleAssign,
    showMobileSearch, setShowMobileSearch,
    activeTab, setActiveTab,
    mobileSearchRef, fetchTasks,
  }

  return (
    <AdminTasksContext.Provider value={value}>
      {children}
    </AdminTasksContext.Provider>
  )
}

export function useAdminTasksContext() {
  const ctx = useContext(AdminTasksContext)
  if (!ctx) throw new Error('useAdminTasksContext must be used inside AdminTasksProvider')
  return ctx
}