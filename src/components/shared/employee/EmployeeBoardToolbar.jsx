export default function EmployeeBoardToolbar({ filteredCount, search, setSearch }) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-border-primary bg-bg-primary rounded-t-2xl'>
      <div className='flex items-center gap-2'>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="4" height="10" rx="1.5" fill="#2979FF" opacity=".4"/>
          <rect x="6" y="1" width="4" height="12" rx="1.5" fill="#2979FF" opacity=".7"/>
          <rect x="11" y="5" width="4" height="8" rx="1.5" fill="#2979FF"/>
        </svg>
        <p className='text-sm font-semibold text-text-blue'>Task Board</p>
        <span className='text-xs px-2 py-0.5 rounded-full font-medium bg-bg-light-blue text-text-blue'>
          {filteredCount} tasks
        </span>
      </div>
      <div className='relative'>
        <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 text-text-gray' width="11" height="11" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type='text' placeholder='Search tasks…' value={search}
          onChange={e => setSearch(e.target.value)}
          className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-40 border border-border-primary text-text-primary bg-bg-page'
        />
      </div>
    </div>
  )
}