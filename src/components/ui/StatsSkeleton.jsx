export default function StatsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='bg-bg-primary border border-border-primary rounded-2xl p-5 flex flex-col gap-3 animate-pulse'
        >
          <div className='h-3 w-1/2 rounded-full bg-border-primary' />
          <div className='h-8 w-16 rounded-lg bg-border-primary' />
          <div className='h-2.5 w-3/4 rounded-full bg-border-primary opacity-60' />
        </div>
      ))}
    </>
  )
}