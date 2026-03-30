export default function EmployeeProgressBar({ done, total, percent }) {
  if (total === 0) return null
  return (
    <div className='rounded-xl px-4 py-3 mb-4 bg-tt-bg-muted border border-tt-border'>
      <div className='flex items-center justify-between mb-2'>
        <p className='text-xs font-medium text-tt-text'>Overall Progress</p>
        <p className='text-xs font-bold text-tt-done-text'>{percent}%</p>
      </div>
      <div className='w-full rounded-full h-1.5 bg-tt-border'>
        <div
          className='h-1.5 rounded-full transition-all duration-500 bg-tt-done-text'
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className='text-xs mt-1.5 text-tt-text-hint'>
        {done} of {total} tasks completed
      </p>
    </div>
  )
}