import Statistics     from '@/components/shared/admin/dashboard/Statistics/Statistics'
import Charts         from '@/components/shared/admin/dashboard/charts_progress/Charts'
import TaskPerformance from '@/components/shared/admin/dashboard/TaskPerformance'
import Activity        from '@/components/shared/admin/dashboard/Activity'

export default function AdminDashboard() {
  return (
    <div className='mb-10'>
      <div className='mt-5'>
        <Statistics />
      </div>

      <div className='flex flex-col gap-5 mt-5'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <div className='lg:col-span-2'>
            <Charts />
          </div>
          <div className='lg:col-span-1'>
            <Activity />
          </div>
        </div>
        <TaskPerformance />
      </div>
    </div>
  )
}