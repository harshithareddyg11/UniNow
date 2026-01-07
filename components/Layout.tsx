
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import type { UniversityEvent } from '../src/hooks/useMockData';
import type { NewEventData } from '../src/App';

interface LayoutProps {
  isAuthenticated: boolean;
  isOrganizer: boolean;
  onLogout: () => void;
  rsvpedEvents: Set<string>;
  toggleRsvp: (eventId: string) => void;
  interestedEvents: Set<string>;
  toggleInterested: (eventId: string) => void;
  userCollege: string;
  events: UniversityEvent[];
  addEvent: (eventData: NewEventData) => void;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, isOrganizer, onLogout, rsvpedEvents, toggleRsvp, interestedEvents, toggleInterested, userCollege, events, addEvent }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-slate-200 font-sans">
      <Header isAuthenticated={isAuthenticated} isOrganizer={isOrganizer} onLogout={onLogout} />
      <main className="container mx-auto px-4 py-8 pt-24 md:pt-32">
        <Outlet context={{ rsvpedEvents, toggleRsvp, interestedEvents, toggleInterested, userCollege, events, addEvent }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
