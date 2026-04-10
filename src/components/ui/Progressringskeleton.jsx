export default function ProgressRingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title */}
      <div className="h-3.5 w-24 rounded-full bg-bg-secondary mb-1.5" />
      <div className="h-3 w-32 rounded-full bg-bg-secondary mb-4" />

      {/* Donut */}
      <div className="flex items-center justify-center my-2">
        <div className="relative w-[180px] h-[180px]">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle
              cx="90" cy="90" r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="18"
              className="text-bg-secondary"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
            <div className="h-2.5 w-14 rounded-full bg-bg-secondary" />
            <div className="h-7 w-10 rounded-md bg-bg-secondary" />
            <div className="h-2.5 w-16 rounded-full bg-bg-secondary" />
          </div>
        </div>
      </div>

      {/* Legend rows */}
      <div className="flex flex-col divide-y divide-border-primary mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-bg-secondary flex-shrink-0" />
              <div className="h-2.5 w-16 rounded-full bg-bg-secondary" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-6 rounded-full bg-bg-secondary" />
              <div className="h-3 w-4 rounded bg-bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}