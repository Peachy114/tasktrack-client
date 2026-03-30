export default function LiveBadge() {
  return (
    <span className='flex items-center gap-1.5 text-[10px] font-semibold text-tt-done-text bg-tt-done-bg px-2 py-0.5 rounded-full'>
      <span className='relative flex h-1.5 w-1.5'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-tt-done-text opacity-75'/>
        <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-tt-done-text'/>
      </span>
      Live
    </span>
  )
}