// components/ui/SortDropdown.jsx

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const OPTIONS = [
  { value: '',            label: 'Sort…' },
  { value: 'title_asc',  label: 'A → Z' },
  { value: 'title_desc', label: 'Z → A' },
  { value: 'assigned',   label: 'Assigned' },
  { value: 'unassigned', label: 'Unassigned first' },
]

export default function SortDropdown({ value, onChange, className = '' }) {
  const [open, setOpen]   = useState(false)
  const [pos,  setPos]    = useState({ top: 0, left: 0 })
  const btnRef            = useRef(null)
  const menuRef           = useRef(null)

  const selected = OPTIONS.find(o => o.value === value) ?? OPTIONS[0]

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          btnRef.current  && !btnRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler, true)
    return () => document.removeEventListener('mousedown', handler, true)
  }, [open])

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left })
    }
    setOpen(v => !v)
  }

  const handleSelect = (val) => {
    onChange(val)
    setOpen(false)
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className={`flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1.5 border border-border-primary text-text-gray bg-bg-primary hover:opacity-80 transition-opacity whitespace-nowrap ${className}`}
      >
        {selected.label}
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 9999, minWidth: 140 }}
          className='rounded-xl py-1 bg-bg-primary border border-border-primary shadow-sm'
        >
          {OPTIONS.slice(1).map(opt => (
            <div
              key={opt.value}
              onMouseDown={() => handleSelect(opt.value)}
              className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-bg-page transition-colors ${
                value === opt.value ? 'text-text-blue font-medium' : 'text-text-primary'
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}