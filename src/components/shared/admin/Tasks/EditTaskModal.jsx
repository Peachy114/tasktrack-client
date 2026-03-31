import { useEffect, useRef } from 'react'

export default function EditTaskModal({ show, loading, modalForm, onChange, onSubmit, onClose }) {
  if (!show) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-tt-bg-overlay px-4'>
      <div className='rounded-2xl p-5 sm:p-6 w-full max-w-md bg-tt-bg-card border border-tt-border shadow-[var(--tt-shadow-lg)]'>
        <div className='flex justify-between items-center mb-5'>
          <div>
            <h2 className='text-sm font-semibold text-tt-text'>Edit Task</h2>
            <p className='text-xs mt-0.5 text-tt-text-muted'>Update task title and description</p>
          </div>
          <button
            onClick={onClose}
            className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity bg-tt-bg-muted text-tt-text border-none'
          >✕</button>
        </div>
        <form onSubmit={onSubmit} className='flex flex-col gap-3'>
          <input
            type='text'
            placeholder='Task title…'
            value={modalForm.title}
            onChange={e => onChange(p => ({ ...p, title: e.target.value }))}
            className='w-full text-xs px-3 py-2 rounded-xl outline-none border border-tt-border bg-tt-bg text-tt-text focus:border-tt-primary'
            required
            autoFocus
          />
          <textarea
            placeholder='Description'
            value={modalForm.description}
            onChange={e => onChange(p => ({ ...p, description: e.target.value }))}
            rows={3}
            className='w-full text-xs px-3 py-2 rounded-xl outline-none border border-tt-border bg-tt-bg text-tt-text resize-none focus:border-tt-primary'
          />
          <div className='flex justify-end gap-2 mt-1'>
            <button
              type='button' onClick={onClose}
              className='text-xs px-3 py-2 rounded-xl border border-tt-border text-tt-text-muted bg-transparent hover:opacity-70 transition-opacity'
            >Cancel</button>
            <button
              type='submit' disabled={loading}
              className='text-xs px-4 py-2 rounded-xl font-semibold bg-tt-primary text-white border-none hover:opacity-90 transition-opacity disabled:opacity-50'
            >{loading ? 'Saving…' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}