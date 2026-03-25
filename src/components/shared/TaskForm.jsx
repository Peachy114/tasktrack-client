// import React from 'react'

// export default function TaskForm({form, onChange, onSubmit, loading }) {
//   return (
//     <div>
//         <h2>Create Task</h2>
//         <form onSubmit={onSubmit}>
//             <input
//             type='text'
//             name='title'
//             placeholder='Task title'
//             value={form.title}
//             onChange={onChange}
//             />
//             <textarea
//             name='description'
//             placeholder='Task description'
//             value={form.description}
//             onChange={onChange}
//             />
//             <button type='submit' disabled={loading}>
//             {loading ? 'Creating...' : 'Create Task'}
//             </button>
//         </form>
//     </div>
//   )
// }

export default function TaskForm({ form, onChange, onSubmit, loading, onClose }) {
  return (
    <div className='flex flex-col gap-3'>

      {/* Title */}
      <div>
        <label className='text-xs font-medium tracking-wide' style={{ color: 'var(--tt-text-muted)' }}>
          TITLE
        </label>
        <input
          type='text'
          name='title'
          placeholder='e.g. Update landing page copy'
          value={form.title}
          onChange={onChange}
          className='mt-1.5 w-full text-xs rounded-lg px-3 py-2 outline-none transition-colors'
          style={{
            border: '0.5px solid var(--tt-border)',
            background: 'var(--tt-bg-muted)',
            color: 'var(--tt-text)',
          }}
        />
      </div>

      {/* Description */}
      <div>
        <label className='text-xs font-medium tracking-wide' style={{ color: 'var(--tt-text-muted)' }}>
          DESCRIPTION
        </label>
        <textarea
          name='description'
          placeholder='Add more context or details...'
          value={form.description}
          onChange={onChange}
          rows={3}
          className='mt-1.5 w-full text-xs rounded-lg px-3 py-2 outline-none resize-none leading-relaxed font-sans transition-colors'
          style={{
            border: '0.5px solid var(--tt-border)',
            background: 'var(--tt-bg-muted)',
            color: 'var(--tt-text)',
          }}
        />
      </div>

      {/* Footer */}
      <div className='flex justify-end items-center gap-2 pt-1'>
        <button
          type='button'
          onClick={onClose}
          disabled={loading}
          className='text-xs px-3.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity bg-transparent'
          style={{ border: '0.5px solid var(--tt-border)', color: 'var(--tt-text-muted)' }}>
          Cancel
        </button>
        <button
          type='button'
          onClick={onSubmit}
          disabled={loading || !form.title.trim()}
          className='text-xs font-medium px-3.5 py-1.5 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
          style={{ background: 'var(--tt-primary)', color: 'white', border: 'none' }}>
          {loading ? 'Creating...' : 'Create task'}
        </button>
      </div>

    </div>
  )
}