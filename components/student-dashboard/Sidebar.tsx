
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CalendarIcon, CheckCircleIcon, StarIcon, ClockIcon } from '../IconComponents';
import Logo from '../Logo';

const Sidebar: React.FC = () => {
    
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-teal-400/20 text-teal-300'
        : 'text-slate-400 hover:bg-slate-50/10 hover:text-slate-200'
    }`;

  const iconClass = "h-5 w-5 flex-shrink-0";

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700/80 flex-col hidden md:flex">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
          <Logo className="h-8 w-8" />
          <span>UniNow</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <NavLink to="/student-dashboard" end className={navLinkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Overview</span>
        </NavLink>
        <NavLink to="/student-dashboard/all-events" className={navLinkClass}>
          <CalendarIcon className={iconClass} />
          <span>All Events</span>
        </NavLink>
        <NavLink to="/student-dashboard/my-registered-events" className={navLinkClass}>
          <CheckCircleIcon className={iconClass} />
          <span>My Registered Events</span>
        </NavLink>
        <NavLink to="/student-dashboard/interested-events" className={navLinkClass}>
          <StarIcon className={iconClass} />
          <span>Interested Events</span>
        </NavLink>
        <NavLink to="/student-dashboard/missed-events" className={navLinkClass}>
          <ClockIcon className={iconClass} />
          <span>Missed Events</span>
        </NavLink>
      </nav>
      <div className="px-4 pb-4">
        <NavLink to="/student-dashboard/settings" className={navLinkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
