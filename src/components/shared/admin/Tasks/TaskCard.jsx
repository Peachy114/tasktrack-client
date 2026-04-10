import { useState, useRef, useCallback, memo } from 'react'
import { getToken } from '@/utils/getToken'
import { taskService } from '@/services/taskServices'
import { toast } from 'sonner'
import EditTaskModal from '@/components/shared/admin/Tasks/EditTaskModal'
import AssignDropdown from '@/components/ui/assignDropdown_TaskCard'


const TaskCard = memo(function TaskCard({ task, users, onSelectUser, onAssign, onRefetch }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownPos,  setDropdownPos]  = useState({ top: 0, right: 0 })
  const [showEdit,     setShowEdit]     = useState(false)
  const [editForm,     setEditForm]     = useState({ title: task.title, description: task.description ?? '' })
  const [editLoading,  setEditLoading]  = useState(false)
  const avatarRef = useRef(null)

  const handleAvatarClick = useCallback(() => {
    if (!showDropdown && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
    }
    setShowDropdown(prev => !prev)
  }, [showDropdown])

  const handleSelect = useCallback((userId) => {
    onSelectUser(task.id, userId)
    onAssign(task.id, userId)
    setShowDropdown(false)
  }, [task.id, onSelectUser, onAssign])

  const handleUnassign = useCallback(async () => {
    try {
      const token = await getToken()
      await taskService.unassign(token, task.id)
      toast.success('Task unassigned!')
      setShowDropdown(false)
      onRefetch?.()
    } catch (err) {
      toast.error(err.message || 'Failed to unassign task.')
    }
  }, [task.id, onRefetch])

  const handleClose     = useCallback(() => setShowDropdown(false), [])
  const handleEditOpen  = useCallback(() => {
    setEditForm({ title: task.title, description: task.description ?? '' })
    setShowEdit(true)
  }, [task.title, task.description])
  const handleEditClose = useCallback(() => setShowEdit(false), [])

  const handleEditSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!editForm.title.trim())       { toast.error('Please add a title.');       return }
    if (!editForm.description.trim()) { toast.error('Please add a description.'); return }
    try {
      setEditLoading(true)
      const token = await getToken()
      await taskService.edit(token, task.id, {
        title:       editForm.title.trim(),
        description: editForm.description.trim(),
      })
      toast.success('Task updated!')
      setShowEdit(false)
      onRefetch?.()
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setEditLoading(false)
    }
  }, [editForm, task.id, onRefetch])

  const employeeUsers  = users.filter(u => u.role === 'employee')
  const isAssigned     = !!task.assignedEmail

  return (
    <>
      <EditTaskModal
        show={showEdit}
        loading={editLoading}
        modalForm={editForm}
        onChange={setEditForm}
        onSubmit={handleEditSubmit}
        onClose={handleEditClose}
      />

      <div className='bg-bg-primary rounded-2xl p-3 mb-2 border border-border-primary hover:shadow-md transition-shadow overflow-visible cursor-default group'>
        {/* Title */}
        <div className='flex items-start justify-between gap-1 mb-2'>
          <h3 className='text-sm font-semibold text-text-primary leading-snug flex-1'>
            {task.title}
          </h3>
          <button
            onClick={handleEditOpen}
            className='opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-text-gray hover:text-text-blue hover:bg-bg-light-blue border-none bg-transparent cursor-pointer'
            title='Edit task'
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5a1.5 1.5 0 012.121 2.121L5.5 12.743 2 13.5l.757-3.5L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Description */}
        {task.description && (
          <p className='text-xs text-text-gray line-clamp-2 mb-3'>
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className='flex items-center justify-between pt-2 border-t border-border-primary'>
          <p className='text-xs text-text-gray truncate flex-1'>
            {isAssigned ? task.assignedEmail.split('@')[0] : 'Unassigned'}
          </p>
          <div
            ref={avatarRef}
            onClick={handleAvatarClick}
            className='w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity bg-bg-page text-text-primary'
          >
            {isAssigned ? task.assignedEmail[0].toUpperCase() : '+'}
          </div>
        </div>

        {showDropdown && (
          <AssignDropdown
            pos={dropdownPos}
            employeeUsers={employeeUsers}
            isAssigned={isAssigned}
            onSelect={handleSelect}
            onClose={handleClose}
          />
        )}
      </div>
    </>
  )
})

export default TaskCard