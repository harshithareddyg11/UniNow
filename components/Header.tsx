
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LoginIcon, LogoutIcon } from './IconComponents';
import Logo from './Logo';

interface HeaderProps {
  isAuthenticated: boolean;
  isOrganizer: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, isOrganizer, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-teal-400/20 text-teal-300'
        : 'text-slate-300 hover:bg-slate-50/10 hover:text-white'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-white text-xl font-bold flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span>UniNow</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" className={navLinkClass}>All Events</NavLink>
                  <NavLink to="/student-dashboard" className={navLinkClass}>My Dashboard</NavLink>
                  {isOrganizer && <NavLink to="/organizer" className={navLinkClass}>Organizer</NavLink>}
                  <button onClick={handleLogoutClick} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-teal-500/20 hover:text-teal-400 transition-colors duration-300">
                    <LogoutIcon className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/login" className={navLinkClass}>
                  <LoginIcon className="h-5 w-5" />
                  Login
                </NavLink>
              )}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
