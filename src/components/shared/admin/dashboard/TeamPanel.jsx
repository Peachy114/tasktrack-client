import { avatarCls } from '../../../../utils/helper'

export default function TeamPanel({ users }) {
  return (
    <div className='bg-tt-bg-card rounded-3xl p-5 flex flex-col shadow-[var(--tt-shadow-card)] overflow-auto h-100'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-sm font-bold text-tt-text'>Team</p>
          <p className='text-xs text-tt-text-muted mt-0.5'>
            {users.length} member{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className='flex -space-x-2'>
          {users.slice(0, 4).map((u) => (
            <div
              key={u.uid}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-tt-bg-card ${avatarCls(u.email)}`}
              title={u.email}
            >
              {(u.email?.[0] ?? '?').toUpperCase()}
            </div>
          ))}
          {users.length > 4 && (
            <div className='w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-tt-bg-card bg-tt-bg-muted text-tt-text-muted'>
              +{users.length - 4}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2 flex-1 overflow-y-auto'>
        {users.map((user) => (
          <div key={user.uid} className='flex items-center gap-2.5 py-2 px-3 rounded-2xl bg-tt-slate-bg'>
            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarCls(user.email)}`}>
              {(user.email?.[0] ?? '?').toUpperCase()}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs font-semibold truncate text-tt-text'>
                {user.email?.split('@')[0] ?? 'Unknown'}
              </p>
              <p className='text-[10px] truncate text-tt-text-hint mt-0.5'>{user.email}</p>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-xs text-tt-text-hint'>No members yet</p>
          </div>
        )}
      </div>
    </div>
  )
}