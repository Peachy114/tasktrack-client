import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'
import { getToken } from '@/utils/getToken'
import { taskService } from '@/services/taskServices'
import { toast } from 'sonner'
import EditTaskModal from '@/components/shared/admin/Tasks/EditTaskModal'

const AV_COLORS = [
  { bg: 'bg-tt-av1-bg', text: 'text-tt-av1-text' },
  { bg: 'bg-tt-av2-bg', text: 'text-tt-av2-text' },
  { bg: 'bg-tt-av3-bg', text: 'text-tt-av3-text' },
  { bg: 'bg-tt-av4-bg', text: 'text-tt-av4-text' },
  { bg: 'bg-tt-av5-bg', text: 'text-tt-av5-text' },
]

function getAvatarClass(index) {
  if (index < 0) return 'bg-tt-primary-light text-tt-primary'
  const av = AV_COLORS[index % AV_COLORS.length]
  return `${av.bg} ${av.text}`
}

// ── Assign dropdown (unchanged) ───────────────────────────────────────────
function AssignDropdown({ pos, employeeUsers, onSelect, onClose }) {
  const [query,  setQuery]  = useState('')
  const ref                 = useRef(null)
  const inputRef            = useRef(null)

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 0) }, [])

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [onClose])

  const filtered = employeeUsers.filter(u =>
    u.email.toLowerCase().includes(query.toLowerCase())
  )

  return createPortal(
    <div
      ref={ref}
      style={{ position: 'absolute', top: pos.top, right: pos.right, zIndex: 9999, width: 200, boxShadow: 'var(--tt-shadow-md)' }}
      className='rounded-xl py-1 bg-tt-bg-card border border-tt-border'
    >
      <div className='px-2 pt-1 pb-1.5 border-b border-tt-border'>
        <div className='relative'>
          <svg className='absolute left-2 top-1/2 -translate-y-1/2 text-tt-text-muted' width="10" height="10" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full text-xs pl-6 pr-2 py-1 rounded-lg outline-none bg-tt-bg-muted border border-tt-border text-tt-text'
          />
        </div>
      </div>
      <div className='max-h-[180px] overflow-y-auto h-30'>
        {employeeUsers.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-tt-text-hint'>No employees found</p>
        ) : filtered.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-tt-text-hint'>No match</p>
        ) : (
          filtered.map((user, i) => {
            const av = AV_COLORS[i % AV_COLORS.length]
            return (
              <div
                key={user.uid}
                onMouseDown={(e) => { e.stopPropagation(); onSelect(user.uid) }}
                className='px-3 py-1.5 text-xs cursor-pointer flex items-center gap-2 hover:opacity-80 text-tt-text'
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-medium flex-shrink-0 ${av.bg} ${av.text}`}>
                  {user.email[0].toUpperCase()}
                </div>
                <span className='truncate'>{user.email.split('@')[0]}</span>
              </div>
            )
          })
        )}
      </div>
    </div>,
    document.body
  )
}

// ── TaskCard ──────────────────────────────────────────────────────────────
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

  const handleClose     = useCallback(() => setShowDropdown(false), [])
  const handleEditOpen  = useCallback(() => {
    setEditForm({ title: task.title, description: task.description ?? '' })
    setShowEdit(true)
  }, [task.title, task.description])
  const handleEditClose = useCallback(() => setShowEdit(false), [])

  const handleEditSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!editForm.title.trim()) {
      toast.error('Please add a title.')
      return
    }
    if (!editForm.description.trim()) {
      toast.error('Please add a description.')
      return
    }
    try {
      setEditLoading(true)
      const token = await getToken()
      await taskService.edit(token, task.id, {
        title: editForm.title.trim(),
        description: editForm.description.trim()
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

  const assignedIndex = users.findIndex(u => u.email === task.assignedEmail)
  const employeeUsers = users.filter(u => u.role === 'employee')

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

      <div
        style={{ boxShadow: 'var(--tt-shadow-sm)' }}
        className='bg-tt-bg-card border border-tt-border rounded-lg p-2.5 mb-1.5 hover:opacity-90 transition-opacity overflow-visible cursor-default group'
      >
        {/* Title + description + edit button */}
        <div className='mb-1.5'>
          <div className='flex items-start justify-between gap-1'>
            <h3 className='text-xs font-semibold truncate text-tt-text flex-1'>
              {task.title}
            </h3>
            {/* Edit button — shows on hover */}
            <button
              onClick={handleEditOpen}
              className='opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-tt-text-muted hover:text-tt-primary hover:bg-tt-bg-muted border-none bg-transparent cursor-pointer'
              title='Edit task'
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5a1.5 1.5 0 012.121 2.121L5.5 12.743 2 13.5l.757-3.5L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {task.description && (
            <p className='text-xs mt-0.5 line-clamp-2 text-tt-text-muted'>
              {task.description}
            </p>
          )}
        </div>

        {/* Footer: assignee name + avatar */}
        <div className='relative'>
          <div className='flex items-center justify-between pt-1.5 border-t border-tt-border'>
            <p className='text-xs truncate flex-1 text-tt-text-hint'>
              {task.assignedEmail ? task.assignedEmail.split('@')[0] : 'Unassigned'}
            </p>
            <div
              ref={avatarRef}
              onClick={handleAvatarClick}
              className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity ${getAvatarClass(assignedIndex)}`}
            >
              {task.assignedEmail ? task.assignedEmail[0].toUpperCase() : '+'}
            </div>
          </div>

          {showDropdown && (
            <AssignDropdown
              pos={dropdownPos}
              employeeUsers={employeeUsers}
              onSelect={handleSelect}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  )
})

export default TaskCard