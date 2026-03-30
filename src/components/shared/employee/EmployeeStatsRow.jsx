export default function EmployeeStatsRow({ stats }) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4'>
      {stats.map(stat => (
        <div
          key={stat.label}
          className='rounded-xl px-4 py-3 flex items-center justify-between bg-tt-bg-muted border border-tt-border'
        >
          <div>
            <p className='text-xs text-tt-text-muted'>{stat.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${stat.colorCls}`}>{stat.value}</p>
          </div>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${stat.bgCls}`}>
            <span className={`text-sm font-bold ${stat.colorCls}`}>{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}