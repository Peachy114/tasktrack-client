import { useState, useRef, useEffect } from 'react'

function AssigneeDropdown({ taskId, users, value, onChange }) {
  const [open,  setOpen]  = useState(false)
  const [query, setQuery] = useState('')
  const ref               = useRef(null)
  const inputRef          = useRef(null)

  const selected      = users.find(u => u.id === value)
  const employeeUsers = users.filter(u => u.role !== 'admin')
  const filtered      = employeeUsers.filter(u =>
    u.email.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (id) => {
    onChange(taskId, id)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={ref} className='relative inline-block'>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className='flex items-center gap-2 text-xs text-text-primary border border-border-primary rounded-md pl-2 pr-6 py-1.5 bg-bg-primary hover:border-border-secondary transition-colors min-w-[110px]'
      >
        <span className='flex-1 text-left truncate'>
          {selected?.email.split('@')[0] ?? 'Unassigned'}
        </span>
        <svg className='absolute right-1.5 top-1/2 -translate-y-1/2' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='m6 9 6 6 6-6' />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className='absolute z-50 top-full mt-1 left-0 bg-bg-primary border border-border-primary rounded-xl shadow-md w-[200px] py-1' style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>

          {/* Search */}
          <div className='px-2 pt-1 pb-1.5 border-b border-border-primary'>
            <div className='relative'>
              <svg className='absolute left-2 top-1/2 -translate-y-1/2 text-text-gray' width='10' height='10' viewBox='0 0 16 16' fill='none'>
                <circle cx='6.5' cy='6.5' r='5' stroke='currentColor' strokeWidth='1.5'/>
                <path d='M10 10l3.5 3.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
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

            {/* Employee list */}
            {employeeUsers.length === 0 ? (
              <p className='text-xs px-3 py-2 text-center text-text-gray'>No employees found</p>
            ) : filtered.length === 0 ? (
              <p className='text-xs px-3 py-2 text-center text-text-gray'>No match</p>
            ) : (
              filtered.map(u => (
                <div
                  key={u.id}
                  onClick={() => handleSelect(u.id)}
                  className={`px-3 py-1.5 text-xs cursor-pointer flex items-center gap-2 hover:opacity-80 ${u.id === value ? 'text-text-blue font-medium' : 'text-text-primary'}`}
                >
                  <div className='w-5 h-5 rounded-full flex items-center justify-center font-medium flex-shrink-0 bg-bg-page text-text-primary'>
                    {u.email[0].toUpperCase()}
                  </div>
                  <span className='truncate'>{u.email.split('@')[0]}</span>
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  )
}

export default AssigneeDropdown