
import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/80 p-4 sm:p-6 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300 hidden sm:block">Priya Sharma</span>
            <img 
              className="h-10 w-10 rounded-full border-2 border-teal-400" 
              src="https://i.pravatar.cc/150?u=priyasharma" 
              alt="User profile" 
            />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
