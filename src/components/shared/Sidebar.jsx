import React from 'react'
import { NavLink } from 'react-router-dom'
import { Group, Dashboard } from '../ui/Icons'
import Girl from '@/assets/Girl.png'
import UserCard from './Card/userCard'
import { Circles } from '../ui/background'

const navItems = [
  { label: 'Dashboard', href: '/admin',       icon: Dashboard, end: true  },
  { label: 'All Tasks', href: '/admin/tasks', icon: Group,     end: false },
]

export default function Sidebar() {
  return (
    <>
      {/* ── Desktop / Tablet sidebar ── */}
      <aside className='
        hidden sm:flex
        bg-bg-primary border-r border-border-primary
        flex-col justify-between
        min-h-screen h-full
        overflow-hidden relative
        w-16 lg:w-56
        transition-all duration-300
        p-3 lg:p-5
      '>

        {/* SVG background */}
        <Circles />

        {/* Girl illustration */}
        <div className='absolute -bottom-70 w-160 -right-60 hidden lg:block pointer-events-none'>
          <img src={Girl} alt='' />
        </div>

        {/* Nav */}
        <div className='mt-4 flex flex-col gap-8 relative z-10'>
          <nav>
            <p className='hidden lg:block text-[10px] text-text-gray font-semibold uppercase tracking-widest mb-4'>
              Overview
            </p>
            <ul className='flex flex-col gap-1'>
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    end={item.end}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl w-full transition text-sm
                       justify-center lg:justify-start relative
                       ${isActive
                         ? 'bg-bg-light-blue text-text-blue font-semibold'
                         : 'text-text-gray hover:text-text-primary hover:bg-bg-page'
                       }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? 'bg-button-primary' : 'bg-transparent'
                        }`}>
                          <item.icon fill={isActive ? '#ffffff' : 'var(--color-text-gray)'} />
                        </span>

                        <span className='hidden lg:inline'>{item.label}</span>

                        {/* Tooltip on tablet */}
                        <span className='
                          pointer-events-none
                          absolute left-full ml-2 top-1/2 -translate-y-1/2
                          bg-bg-sidebar text-text-secondary text-xs font-medium
                          px-2.5 py-1 rounded-md whitespace-nowrap
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-150
                          lg:hidden z-50
                        '>
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom UserCard */}
        <div className='hidden lg:block relative z-10'>
          <UserCard />
        </div>

      </aside>

      {/* ── Mobile bottom bar ── */}
      <nav className='
        sm:hidden fixed bottom-0 left-0 right-0 z-50
        bg-bg-primary border-t border-border-primary
        flex items-center justify-around
        px-4 py-2
      '>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            end={item.end}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition text-[10px] font-medium
               ${isActive ? 'text-text-blue' : 'text-text-gray'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-button-primary' : 'bg-transparent'
                }`}>
                  <item.icon fill={isActive ? '#ffffff' : 'var(--color-text-gray)'} />
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  )
}