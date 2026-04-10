// components/shared/admin/Tasks/TaskListViewSkeleton.jsx

function SkeletonCell({ width, height = 10, className = '' }) {
  return (
    <div
      className={`rounded animate-pulse bg-border-primary ${className}`}
      style={{ width, height }}
    />
  )
}

const ROWS = [
  { title: '68%', badge: 52, assignee: 110 },
  { title: '55%', badge: 62, assignee: 96  },
  { title: '72%', badge: 52, assignee: 124 },
  { title: '48%', badge: 68, assignee: 104 },
  { title: '63%', badge: 52, assignee: 118 },
  { title: '58%', badge: 62, assignee: 96  },
  { title: '70%', badge: 52, assignee: 110 },
]

export default function TaskListViewSkeleton({ rows = 7 }) {
  return (
    <div className='w-full overflow-x-auto h-full'>
      <table className='w-full border-collapse text-sm'>

        <thead>
          <tr className='border-b border-border-primary bg-bg-page'>
            <th className='text-left px-3 py-2.5 w-1/2'>
              <SkeletonCell width={32} />
            </th>
            <th className='text-left px-3 py-2.5'>
              <SkeletonCell width={38} />
            </th>
            <th className='text-left px-3 py-2.5'>
              <SkeletonCell width={50} />
            </th>
            <th className='text-right px-3 py-2.5'>
              <div className='flex justify-end'>
                <SkeletonCell width={42} />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {ROWS.slice(0, rows).map((row, i) => (
            <tr key={i} className='border-b border-border-primary last:border-b-0'>

              {/* Title + description */}
              <td className='px-3 py-3'>
                <SkeletonCell width={row.title} height={11} className='mb-2' />
                <SkeletonCell width={`calc(${row.title} - 20%)`} height={9} className='opacity-60' />
              </td>

              {/* Status badge */}
              <td className='px-3 py-3'>
                <SkeletonCell width={row.badge} height={22} className='rounded-md' />
              </td>

              {/* Assignee dropdown */}
              <td className='px-3 py-3'>
                <SkeletonCell width={row.assignee} height={28} className='rounded-md' />
              </td>

              {/* Created date */}
              <td className='px-3 py-3'>
                <div className='flex justify-end'>
                  <SkeletonCell width={58} />
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}