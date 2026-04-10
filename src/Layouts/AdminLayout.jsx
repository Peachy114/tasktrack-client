// import React from 'react'
// import Navbar from '@/components/shared/Navbar'
// import Sidebar from '@/components/shared/Sidebar'
// import { NavLink, Outlet } from 'react-router-dom'
// import { Calendar_Icon } from '@/components/ui/Icons'

// export default function AdminLayout() {
//   return (
//     <div className='min-h-screen bg-bg-primary'>
//       <Navbar />
//       <div className='grid grid-cols-[230px_1fr] gap-5 pr-5'>
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main outlet */}
//         <main className=' rounded-2xl mx-auto w-full min-h-screen'>
//           <div>
//             {/* Dashboard + Date */}
//             <div className='flex py-5 mt-3'>
//               <div className='inline-flex gap-1 bg-gray-100 rounded-2xl py-1 px-1'>
//                 <NavLink
//                   to="/admin"
//                   end
//                   className={({ isActive }) =>
//                     `px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
//                       isActive
//                         ? 'bg-white text-text-purple shadow-sm'
//                         : 'text-gray-400 hover:text-gray-600'
//                     }`
//                   }
//                 >
//                   Dashboard
//                 </NavLink>
//                 <NavLink
//                   to="/admin/tasks"
//                   className={({ isActive }) =>
//                     `px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
//                       isActive
//                         ? 'bg-white text-text-purple shadow-sm'
//                         : 'text-gray-400 hover:text-gray-600'
//                     }`
//                   }
//                 >
//                   Tasks
//                 </NavLink>
//               </div>
//             </div>
//           </div>
        
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   )
// }

import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className='min-h-screen bg-bg-page'>

      {/* Navbar */}
      <div className='fixed top-0 left-0 right-0 z-30'>
        <Navbar />
      </div>

      <div className='flex pt-[57px]'>

        {/* Sidebar — renders aside on sm+, bottom nav on mobile */}
        <div className='fixed top-[57px] left-0 bottom-0 z-20'>
          <Sidebar />
        </div>

        {/* Main — no left margin on mobile, offset by sidebar on sm+ */}
        <main className='flex-1 min-w-0 sm:ml-16 lg:ml-56 px-4 lg:px-6 pb-24 sm:pb-6 transition-all duration-300'>
          <Outlet />
        </main>

      </div>

    </div>
  )
}