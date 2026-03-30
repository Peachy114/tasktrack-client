export default function StatCard({ label, value, sub, icon, iconBg, iconColor, valueCls, subCls }) {
  return (
    <div className='bg-tt-bg-card rounded-3xl p-5 flex flex-col gap-3 shadow-[var(--tt-shadow-card)]'>
      <div className='flex items-center justify-between'>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${subCls}`}>{sub}</span>
      </div>
      <div>
        <p className='text-xs text-tt-text-muted mb-0.5'>{label}</p>
        <p className={`text-3xl font-bold transition-all duration-300 ${valueCls}`}>{value}</p>
      </div>
    </div>
  )
}