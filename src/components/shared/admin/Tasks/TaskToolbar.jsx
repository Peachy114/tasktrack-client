import { useState, useRef } from 'react'
import UserFilterDropdown from './UserFilterDropdown'

export default function TaskToolbar({
  filteredCount, search, setSearch, sortBy, setSortBy,
  filterUser, setFilterUser, showMobileSearch, setShowMobileSearch,
  mobileSearchRef, hasFilters, clearFilters, onAddTask,
  columns, filteredTasks, activeTab, setActiveTab, users,
}) {
  const [showUserFilter, setShowUserFilter] = useState(false)
  const filterBtnRef = useRef(null)

  return (
    <div className='border-b border-tt-border bg-tt-bg-muted rounded-t-2xl'>

      {/* ── Row 1: title + primary actions ── */}
      <div className='flex items-center justify-between px-4 sm:px-5 py-3 gap-2'>
        {/* Left: board title */}
        <div className='flex items-center gap-2 min-w-0'>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className='flex-shrink-0'>
            <rect x="1" y="3" width="4" height="10" rx="1.5" fill="var(--color-tt-primary)" opacity=".4"/>
            <rect x="6" y="1" width="4" height="12" rx="1.5" fill="var(--color-tt-primary)" opacity=".7"/>
            <rect x="11" y="5" width="4" height="8" rx="1.5" fill="var(--color-tt-primary)"/>
          </svg>
          <p className='text-sm font-semibold text-tt-primary whitespace-nowrap'>Task Board</p>
          <span className='text-xs px-2 py-0.5 rounded-full font-medium bg-tt-border text-tt-primary whitespace-nowrap'>
            {filteredCount} tasks
          </span>
        </div>

        {/* Right: controls */}
        <div className='flex items-center gap-1.5 sm:gap-2 flex-shrink-0'>

          {/* Add Task button */}
          <button
            onClick={onAddTask}
            className='flex items-center gap-1.5 text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:opacity-90 transition-opacity bg-tt-primary text-white border-none'
          >
            <span className='text-sm leading-none'>+</span>
            <span className='hidden sm:inline'>Add Task</span>
          </button>

          {/* Search — desktop */}
          <div className='hidden sm:block relative'>
            <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 text-tt-text-muted' width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type='text' placeholder='Search tasks…' value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-36 md:w-40 border border-tt-border text-tt-text bg-tt-bg-card'
            />
          </div>

          {/* Search — mobile toggle */}
          <button
            className='sm:hidden w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 bg-transparent border border-tt-border text-tt-text-muted'
            onClick={() => setShowMobileSearch(v => !v)}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Sort */}
          <select
            value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className='hidden sm:block text-xs rounded-full px-2.5 py-1.5 outline-none border border-tt-border text-tt-text-muted bg-tt-bg-card'
          >
            <option value=''>Sort…</option>
            <option value='title_asc'>A → Z</option>
            <option value='title_desc'>Z → A</option>
            <option value='assigned'>Assigned</option>
            <option value='unassigned'>Unassigned first</option>
          </select>

          {/* User filter button */}
          <button
            ref={filterBtnRef}
            onClick={() => setShowUserFilter(v => !v)}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-all bg-transparent border ${
              filterUser ? 'border-tt-primary bg-tt-primary-light' : 'border-tt-border'
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={filterUser ? 'text-tt-primary' : 'text-tt-text-muted'}>
              <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {showUserFilter && (
            <UserFilterDropdown
              users={users} filterUser={filterUser}
              onSelect={setFilterUser} onClose={() => setShowUserFilter(false)}
              anchorRef={filterBtnRef}
            />
          )}

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 bg-transparent text-xs border border-tt-border text-tt-text-muted'
            >✕</button>
          )}
        </div>
      </div>

      {/* ── Row 2 (mobile only): expandable search + sort ── */}
      {showMobileSearch && (
        <div ref={mobileSearchRef} className='sm:hidden flex items-center gap-2 px-4 pb-3'>
          <div className='relative flex-1'>
            <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 text-tt-text-muted' width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type='text' placeholder='Search tasks…' value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-full border border-tt-border text-tt-text bg-tt-bg-card'
            />
          </div>
          <select
            value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className='text-xs rounded-full px-2.5 py-1.5 outline-none border border-tt-border text-tt-text-muted bg-tt-bg-card'
          >
            <option value=''>Sort…</option>
            <option value='title_asc'>A → Z</option>
            <option value='title_desc'>Z → A</option>
            <option value='assigned'>Assigned</option>
            <option value='unassigned'>Unassigned first</option>
          </select>
        </div>
      )}

      {/* ── Row 3 (mobile only): column tabs ── */}
      <div className='md:hidden flex border-t border-tt-border'>
        {columns.map((col) => {
          const count    = filteredTasks.filter(t => t.status === col.key).length
          const isActive = activeTab === col.key
          return (
            <button
              key={col.key}
              onClick={() => setActiveTab(col.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-colors border-none bg-transparent ${
                isActive ? col.accentCls + ' border-b-2 border-current' : 'text-tt-text-muted'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`}/>
              <span>{col.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${col.countCls} ${col.accentCls}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

    </div>
  )
}