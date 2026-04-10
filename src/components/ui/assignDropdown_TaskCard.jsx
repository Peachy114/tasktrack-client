import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

function AssignDropdown({ pos, employeeUsers, isAssigned, onSelect, onClose }) {
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
      style={{ position: 'absolute', top: pos.top, right: pos.right, zIndex: 9999, width: 200, boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
      className='rounded-xl py-1 bg-bg-primary border border-border-primary'
    >
      {/* Search */}
      <div className='px-2 pt-1 pb-1.5 border-b border-border-primary'>
        <div className='relative'>
          <svg className='absolute left-2 top-1/2 -translate-y-1/2 text-text-gray' width="10" height="10" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type='text'
            placeholder='Search…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full text-xs pl-6 pr-2 py-1 rounded-lg outline-none bg-bg-page border border-border-primary text-text-primary'
          />
        </div>
      </div>

      {/* List */}
      <div className='max-h-[180px] overflow-y-auto'>
        {employeeUsers.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-text-gray'>No employees found</p>
        ) : filtered.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-text-gray'>No match</p>
        ) : (
          filtered.map((user) => (
            <div
              key={user.uid}
              onMouseDown={(e) => { e.stopPropagation(); onSelect(user.uid) }}
              className='px-3 py-1.5 text-xs cursor-pointer flex items-center gap-2 hover:opacity-80 text-text-primary'
            >
              <div className='w-5 h-5 rounded-full flex items-center justify-center font-medium flex-shrink-0 bg-bg-page text-text-primary'>
                {user.email[0].toUpperCase()}
              </div>
              <span className='truncate'>{user.email.split('@')[0]}</span>
            </div>
          ))
        )}
      </div>
    </div>,
    document.body
  )
}

export default AssignDropdown