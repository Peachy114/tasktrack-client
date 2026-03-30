export default function TaskForm({ form, onChange, onSubmit, loading, onClose }) {
  return (
    <div className='flex flex-col gap-3'>

      {/* Title */}
      <div>
        <label className='text-xs font-semibold tracking-widest uppercase text-tt-text-hint'>
          Title
        </label>
        <input
          type='text'
          name='title'
          placeholder='e.g. Update landing page copy'
          value={form.title}
          onChange={onChange}
          className='mt-1.5 w-full text-sm rounded-lg px-3 py-2 outline-none transition-colors border border-tt-border bg-tt-bg-muted text-tt-text focus:border-tt-primary'
        />
      </div>

      {/* Description */}
      <div>
        <label className='text-xs font-semibold tracking-widest uppercase text-tt-text-hint'>
          Description
        </label>
        <textarea
          name='description'
          placeholder='Add more context or details...'
          value={form.description}
          onChange={onChange}
          rows={3}
          className='mt-1.5 w-full text-sm rounded-lg px-3 py-2 outline-none resize-none leading-relaxed transition-colors border border-tt-border bg-tt-bg-muted text-tt-text focus:border-tt-primary'
        />
      </div>

      {/* Footer */}
      <div className='flex justify-end items-center gap-2 pt-1'>
        <button
          type='button'
          onClick={onClose}
          disabled={loading}
          className='text-xs font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity bg-transparent border border-tt-border text-tt-text-muted'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={onSubmit}
          disabled={loading || !form.title.trim()}
          className='text-xs font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed bg-tt-primary text-white border-none'
        >
          {loading ? 'Creating...' : 'Create task'}
        </button>
      </div>

    </div>
  )
}