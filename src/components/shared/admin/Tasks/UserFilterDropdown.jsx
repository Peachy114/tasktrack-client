import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function UserFilterDropdown({ users, filterUser, onSelect, onClose, anchorRef }) {
  const [query, setQuery] = useState('')
  const ref               = useRef(null)
  const inputRef          = useRef(null)
  const [pos, setPos]     = useState({ top: 0, right: 0 })

  useEffect(() => {
    if (anchorRef.current) {
      const rect  = anchorRef.current.getBoundingClientRect()
      const right = Math.max(8, window.innerWidth - rect.right)
      setPos({ top: rect.bottom + 4, right })
    }
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [anchorRef])

  useEffect(() => {
    const handler = (e) => {
      if (
        ref.current && !ref.current.contains(e.target) &&
        anchorRef.current && !anchorRef.current.contains(e.target)
      ) onClose()
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [onClose, anchorRef])

  const options = [
    { label: 'All users',  value: '' },
    { label: 'Unassigned', value: 'unassigned' },
    ...users.map(u => ({ label: u.email.split('@')[0], value: u.email })),
  ]

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  return createPortal(
    <div
      ref={ref}
      style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999, width: 200, boxShadow: 'var(--tt-shadow-md)' }}
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
            placeholder='Search user…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full text-xs pl-6 pr-2 py-1 rounded-lg outline-none bg-tt-bg-muted border border-tt-border text-tt-text'
          />
        </div>
      </div>
      <div className='max-h-[200px] overflow-y-auto'>
        {filtered.length === 0 ? (
          <p className='text-xs px-3 py-2 text-center text-tt-text-hint'>No users found</p>
        ) : filtered.map(opt => (
          <div
            key={opt.value}
            onMouseDown={(e) => { e.stopPropagation(); onSelect(opt.value); onClose() }}
            className={`text-xs px-3 py-1.5 cursor-pointer flex items-center justify-between gap-3 hover:opacity-80 ${
              filterUser === opt.value ? 'bg-tt-primary-light text-tt-primary' : 'text-tt-text-muted'
            }`}
          >
            <span className='truncate'>{opt.label}</span>
            {filterUser === opt.value && <span className='text-tt-primary flex-shrink-0'>✓</span>}
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}