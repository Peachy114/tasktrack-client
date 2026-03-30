export default function ChartLegend({ items }) {
  return (
    <div className='flex gap-3 flex-wrap'>
      {items.map(item => (
        <span key={item.label} className='flex items-center gap-1.5 text-[10px] text-tt-text-muted'>
          <span className='w-2 h-2 rounded-sm flex-shrink-0' style={{ background: item.color }}/>
          {item.label}
        </span>
      ))}
    </div>
  )
}