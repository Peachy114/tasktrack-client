export default function EmployeeProgressBar({ done, total, percent }) {
  if (total === 0) return null
  return (
    <div className='rounded-xl px-4 py-3 mb-4 bg-bg-primary border border-border-primary'>
      <div className='flex items-center justify-between mb-2'>
        <p className='text-xs font-medium text-text-primary'>Overall Progress</p>
        <p className='text-xs font-bold text-success'>{percent}%</p>
      </div>
      <div className='w-full rounded-full h-1.5 bg-border-primary'>
        <div
          className='h-1.5 rounded-full transition-all duration-500 bg-success'
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className='text-xs mt-1.5 text-text-gray'>
        {done} of {total} tasks completed
      </p>
    </div>
  )
}