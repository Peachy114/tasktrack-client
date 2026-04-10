export const TaskFlowIcon = () => (
<svg
    width="30"
    height="30" 
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="10" fill="#2563EB" />
    <g fill="white">
      {/* Four rounded squares arranged around center */}
    <rect x="10" y="10" width="12" height="12" rx="3" fill="#BBE1FA" />
    <rect x="26" y="10" width="12" height="12" rx="3" fill="#BBE1FA" opacity="0.35" />
    <rect x="10" y="26" width="12" height="12" rx="3" fill="#BBE1FA" opacity="0.35" />
    <rect x="26" y="26" width="12" height="12" rx="3" fill="#BBE1FA" />

      {/* Center connector dot */}
    <circle cx="24" cy="24" r="3" fill="#2563EB" />

    {/* Connecting lines between boxes */}
    <rect x="22" y="9"  width="4" height="13" fill="#2563EB" />
    <rect x="22" y="26" width="4" height="13" fill="#2563EB" />
    <rect x="9"  y="22" width="13" height="4" fill="#2563EB" />
    <rect x="26" y="22" width="13" height="4" fill="#2563EB" />
    </g>
  </svg>
);

export const Purple_Dot = () => (
  <span className="w-3 h-3 bg-button-primary rounded-full inline-block"></span>
);

export const Live_Badge = () => (
  <span className='flex items-center gap-1.5 text-[10px] font-semibold text-tt-done-text bg-tt-done-bg px-2 py-0.5 rounded-full'>
      <span className='relative flex h-1.5 w-1.5'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-tt-done-text opacity-75'/>
        <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-tt-done-text'/>
      </span>
      Live
    </span>
);


export const Calendar_Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
);


// Sidebar
export const Group = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 -960 960 960" 
    width="24px" 
    fill={fill}>
      <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 
      126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 
      43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 
      6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 
      113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 
      0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 
      0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z"/>
  </svg>
)
export const Dashboard = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" 
  height="24px" 
  viewBox="0 -960 960 960" 
  width="24px" 
  fill={fill}>
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
  </svg>
)

// Charts
export const Bar_Chart = ({ fill }) => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill={fill} stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='12' width='4' height='9' rx='1'/>
    <rect x='10' y='7' width='4' height='14' rx='1'/>
    <rect x='17' y='3' width='4' height='18' rx='1'/>
  </svg>
)


// Search
export const Search = () => (
      <svg className='absolute left-2 top-1/2 -translate-y-1/2 text-text-gray' width="10" height="10" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
)