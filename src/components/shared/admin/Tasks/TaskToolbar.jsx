import { useState, useRef } from 'react'
import { useAdminTasksContext } from '@/hook/useAdminTask'
import UserFilterDropdown from '../../../ui/userFilterDropdown'
import { Search } from '@/components/ui/Icons'
import SortDropdown from '@/components/ui/SortDropdown'

const COLUMNS = [
  { key: 'backlog',     label: 'Backlog',     dot: 'bg-pending',     accentCls: 'text-text-gray',    countCls: 'bg-bg-page',       bgCls: 'bg-bg-page'  },
  { key: 'in_progress', label: 'In Progress', dot: 'bg-in_progress', accentCls: 'text-text-blue',    countCls: 'bg-bg-light-blue', bgCls: 'bg-bg-light-blue' },
  { key: 'done',        label: 'Done',        dot: 'bg-completed',   accentCls: 'text-success',      countCls: 'bg-bg-page',       bgCls: 'bg-bg-page'  },
]

function ViewToggle({ view, setView }) {
  const base     = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors'
  const active   = 'bg-bg-secondary text-text-secondary'
  const inactive = 'text-text-gray hover:bg-bg-light-blue hover:text-text-primary'

  return (
    <div className='flex items-center gap-1 border border-border-primary rounded-xl p-1 bg-bg-primary flex-shrink-0'>
      <button onClick={() => setView('list')} className={`${base} ${view === 'list' ? active : inactive}`}>
        <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <line x1='8' y1='6'  x2='21' y2='6' /><line x1='8' y1='12' x2='21' y2='12' /><line x1='8' y1='18' x2='21' y2='18' />
          <line x1='3' y1='6'  x2='3.01' y2='6' /><line x1='3' y1='12' x2='3.01' y2='12' /><line x1='3' y1='18' x2='3.01' y2='18' />
        </svg>
        <span className='hidden sm:inline'>List</span>
      </button>
      <button onClick={() => setView('board')} className={`${base} ${view === 'board' ? active : inactive}`}>
        <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <rect x='3' y='3' width='7' height='18' rx='1'/><rect x='14' y='3' width='7' height='18' rx='1'/>
        </svg>
        <span className='hidden sm:inline'>Board</span>
      </button>
    </div>
  )
}

export default function TaskToolbar({ view, setView }) {
  const {
    users, filteredTasks,
    search, setSearch,
    sortBy, setSortBy,
    filterUser, setFilterUser,
    hasFilters, clearFilters,
    showMobileSearch, setShowMobileSearch,
    mobileSearchRef,
    activeTab, setActiveTab,
    setShowModal,
  } = useAdminTasksContext()

  const [showUserFilter, setShowUserFilter] = useState(false)
  const filterBtnRef = useRef(null)

  return (
    <div>

      {/* ── Row 1: filters + right actions ── */}
      <div className='flex items-center justify-between py-3 gap-2'>

        {/* Left: search, sort, user filter */}
        <div className='flex items-center gap-1.5 sm:gap-2 flex-shrink-0'>

          {/* Search — desktop */}
          <div className='hidden sm:block relative'>
            <Search />
            <input
              type='text' placeholder='Search tasks…' value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-36 md:w-40 border border-border-primary text-text-primary bg-bg-primary placeholder:text-text-gray'
            />
          </div>

          {/* Search — mobile toggle */}
          <button
            className='sm:hidden w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 bg-transparent border border-border-primary text-text-gray'
            onClick={() => setShowMobileSearch(v => !v)}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Sort */}
          <SortDropdown
            value={sortBy} onChange={setSortBy}
            className='hidden sm:flex'
          />

          {/* User filter button */}
          <button
            ref={filterBtnRef}
            onClick={() => setShowUserFilter(v => !v)}
            className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-all bg-transparent border border-border-primary'
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={filterUser ? 'text-text-blue' : 'text-text-gray'}>
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
              className='w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 bg-transparent text-xs border border-border-primary text-text-gray'
            >✕</button>
          )}
        </div>

        {/* Right: view toggle + add task */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <ViewToggle view={view} setView={setView} />
          <button
            onClick={() => setShowModal(true)}
            className='flex items-center gap-1.5 text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:opacity-90 transition-opacity bg-button-primary text-white'
          >
            <span className='text-sm leading-none'>+</span>
            <span className='hidden sm:inline'>Add Task</span>
          </button>
        </div>
      </div>

      {/* ── Row 2 (mobile only): expandable search + sort ── */}
      {showMobileSearch && (
        <div ref={mobileSearchRef} className='sm:hidden flex items-center gap-2 pb-3'>
          <div className='relative flex-1'>
            <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 text-text-gray' width="11" height="11" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type='text' placeholder='Search tasks…' value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className='text-xs rounded-full pl-7 pr-3 py-1.5 outline-none w-full border border-border-primary text-text-primary bg-bg-primary placeholder:text-text-gray'
            />
          </div>
          <select
            value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className='text-xs rounded-full px-2.5 py-1.5 outline-none border border-border-primary text-text-gray bg-bg-primary'
          >
            <option value=''>Sort…</option>
            <option value='title_asc'>A → Z</option>
            <option value='title_desc'>Z → A</option>
            <option value='assigned'>Assigned</option>
            <option value='unassigned'>Unassigned first</option>
          </select>
        </div>
      )}

      {/* ── Row 3 (mobile only): column tabs — board view only ── */}
      {view !== 'list' && (
        <div className='md:hidden flex border-t border-border-primary'>
          {COLUMNS.map((col) => {
            const count    = filteredTasks.filter(t => t.status === col.key).length
            const isActive = activeTab === col.key
            return (
              <button
                key={col.key}
                onClick={() => setActiveTab(col.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-colors border-none bg-transparent ${
                  isActive ? col.accentCls + ' border-b-2 border-current' : 'text-text-gray'
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
      )}

    </div>
  )
}