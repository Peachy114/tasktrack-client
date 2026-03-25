import { useEffect, useState } from 'react'
import { useFetch } from '../../hook/useFetch'
import { userService } from '../../services/userService'

const AV_COLORS = [
  { bg: '#ddd6fe', text: '#5b21b6' },
  { bg: '#bfdbfe', text: '#1e40af' },
  { bg: '#bbf7d0', text: '#065f46' },
  { bg: '#fde68a', text: '#92400e' },
  { bg: '#fce7f3', text: '#9d174d' },
  { bg: '#e0e7ff', text: '#3730a3' },
  { bg: '#fed7aa', text: '#c2410c' },
  { bg: '#d1fae5', text: '#065f46' },
]

export default function Sidebar() {
  const { data: users, fetch: fetchUsers } = useFetch(userService.getAll)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const MAX = 8
  const hasMore = users.length > MAX
  const displayed = showAll ? users : users.slice(0, MAX)

  return (
    <div className='w-72 flex-shrink-0 flex flex-col py-4 px-3'
      style={{ borderLeft: '0.5px solid var(--tt-border)', background: 'var(--tt-bg-card)' }}>

      {/* Header */}
      <div className='flex items-center justify-between mb-4 px-1'>
        <div className='flex items-center gap-1.5'>
          <div className='w-1.5 h-1.5 rounded-full bg-emerald-400'/>
          <span className='text-xs font-semibold' style={{ color: 'var(--tt-text)' }}>Members</span>
          <span className='text-xs px-1.5 py-0.5 rounded-full font-medium'
            style={{ background: 'var(--tt-primary-light)', color: 'var(--tt-primary)' }}>
            {users.length}
          </span>
        </div>
        {hasMore && (
          <button onClick={() => setShowAll(!showAll)}
            className='text-xs hover:opacity-80 bg-transparent border-none p-0 cursor-pointer'
            style={{ color: 'var(--tt-primary)' }}>
            {showAll ? 'Less' : 'All'}
          </button>
        )}
      </div>

      {/* Member list */}
      <div className='flex flex-col gap-1.5'>
        {displayed.map((user, i) => (
          <div key={user.uid}
            className='flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all hover:opacity-80 cursor-default'
            style={{ border: '0.5px solid var(--tt-border)' }}>

            {/* Avatar with color */}
            <div className='w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center flex-shrink-0'
              style={{
                background: AV_COLORS[i % AV_COLORS.length].bg,
                color: AV_COLORS[i % AV_COLORS.length].text,
              }}>
              {user.email[0].toUpperCase()}
            </div>

            <div className='flex-1 min-w-0'>
              <p className='text-xs font-medium truncate' style={{ color: 'var(--tt-text)' }}>
                {user.email.split('@')[0]}
              </p>
              <span className='text-xs px-1.5 py-0 rounded-full font-medium'
                style={user.role === 'admin' ? {
                  color: 'var(--tt-primary)',
                  background: 'var(--tt-primary-light)',
                } : {
                  color: '#0ea5e9',
                  background: '#f0f9ff',
                }}>
                {user.role}
              </span>
            </div>

            {/* Online dot */}
            <div className='w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0'/>
          </div>
        ))}
      </div>

      {hasMore && !showAll && (
        <button onClick={() => setShowAll(true)}
          className='mt-3 w-full text-xs py-1.5 rounded-xl hover:opacity-80 bg-transparent cursor-pointer'
          style={{ border: '0.5px dashed var(--tt-border)', color: 'var(--tt-text-hint)' }}>
          + {users.length - MAX} more
        </button>
      )}
    </div>
  )
}