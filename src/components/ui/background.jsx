export const Circles = () => (
  <svg className='absolute inset-0 w-full h-full pointer-events-none' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='90%' cy='8%'  r='80'  fill='var(--color-bg-light-blue)' opacity='0.5' />
    <circle cx='-5%' cy='33%' r='65'  fill='var(--color-bg-light-blue)' opacity='0.3' />
    <circle cx='95%' cy='65%' r='100' fill='var(--color-bg-light-blue)' opacity='0.4' />
    <circle cx='10%' cy='90%' r='55'  fill='var(--color-bg-light-blue)' opacity='0.3' />
    <rect x='60%' y='2%'  width='55' height='55' rx='10' fill='var(--color-bg-light-blue)' opacity='0.3' transform='rotate(20 75 10)' />
    <rect x='-5%' y='50%' width='45' height='45' rx='9'  fill='var(--color-bg-light-blue)' opacity='0.2' transform='rotate(-15 5 55)' />
    <rect x='45%' y='80%' width='70' height='70' rx='12' fill='var(--color-bg-light-blue)' opacity='0.2' transform='rotate(30 60 87)' />
    <line x1='0' y1='25%' x2='100%' y2='20%' stroke='var(--color-border-primary)' strokeWidth='0.5' opacity='0.8' />
    <line x1='0' y1='58%' x2='100%' y2='53%' stroke='var(--color-border-primary)' strokeWidth='0.5' opacity='0.8' />
    <line x1='0' y1='83%' x2='100%' y2='78%' stroke='var(--color-border-primary)' strokeWidth='0.5' opacity='0.6' />
    <circle cx='25%' cy='15%' r='4' fill='var(--color-text-blue)' opacity='0.15' />
    <circle cx='72%' cy='43%' r='3' fill='var(--color-text-blue)' opacity='0.1' />
    <circle cx='15%' cy='70%' r='5' fill='var(--color-text-blue)' opacity='0.1' />
    <circle cx='88%' cy='88%' r='3.5' fill='var(--color-text-blue)' opacity='0.15' />
  </svg>
)