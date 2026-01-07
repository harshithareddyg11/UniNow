
import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { UniversityEvent } from '../../../src/hooks/useMockData';
import GlassCard from '../../GlassCard';
import Button from '../../Button';

interface RegisteredEventsContextType {
  rsvpedEvents: Set<string>;
  events: UniversityEvent[];
}

const RegisteredEventRow: React.FC<{event: UniversityEvent}> = ({ event }) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const isPast = eventDate < now;
    
    // Check if event is happening today
    const isToday = eventDate.toDateString() === now.toDateString();
    
    // Check if event is ongoing (started but not ended, assuming a 2-hour duration for demo)
    const eventEndDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
    const isOngoing = !isPast && now >= eventDate && now <= eventEndDate;

    const getStatus = () => {
        if (isPast) {
            return <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-500/20 text-gray-300">Completed</span>;
        }
        if (isOngoing) {
            return <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 animate-pulse">Ongoing</span>;
        }
        if (isToday) {
            return <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-300">Happening Today</span>;
        }
        return <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">Upcoming</span>;
    };

    return (
        <tr className="border-b border-slate-700/80 hover:bg-slate-50/5 transition-colors">
            <td className="p-4 font-medium text-white">{event.title}</td>
            <td className="p-4 text-slate-300 hidden md:table-cell">{eventDate.toLocaleDateString()}</td>
            <td className="p-4 text-slate-300 hidden lg:table-cell">{event.collegeName}</td>
            <td className="p-4 text-slate-300 hidden md:table-cell">{event.location}</td>
            <td className="p-4">{getStatus()}</td>
            <td className="p-4 text-right">
                <Link to={`/events/${event.id}`}>
                    <Button variant="secondary" className="!py-1 !px-3 text-sm">View</Button>
                </Link>
            </td>
        </tr>
    );
};

const RegisteredEventsTab: React.FC = () => {
  const { rsvpedEvents, events } = useOutletContext<RegisteredEventsContextType>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const myRegisteredEvents = events.filter(event => rsvpedEvents.has(event.id));

  const now = new Date();
  const upcomingRegistered = myRegisteredEvents.filter(e => new Date(e.date) >= now);
  const completedRegistered = myRegisteredEvents.filter(e => new Date(e.date) < now);
  
  const eventsToShow = activeTab === 'upcoming' ? upcomingRegistered : completedRegistered;

  const TabButton: React.FC<{tabName: 'upcoming' | 'completed', label: string}> = ({ tabName, label }) => (
      <button 
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tabName ? 'bg-teal-400/20 text-teal-300' : 'text-slate-400 hover:bg-slate-50/10'}`}
      >
        {label} ({tabName === 'upcoming' ? upcomingRegistered.length : completedRegistered.length})
      </button>
  );

  return (
    <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-700/80 flex items-center gap-2">
            <TabButton tabName="upcoming" label="Upcoming" />
            <TabButton tabName="completed" label="Completed" />
        </div>
        {eventsToShow.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/5 text-slate-300 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="p-4">Event</th>
                            <th className="p-4 hidden md:table-cell">Date</th>
                            <th className="p-4 hidden lg:table-cell">College</th>
                            <th className="p-4 hidden md:table-cell">Location</th>
                            <th className="p-4">Status</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsToShow.map(event => <RegisteredEventRow key={event.id} event={event} />)}
                    </tbody>
                </table>
            </div>
        ) : (
             <div className="text-center py-16">
                <p className="text-slate-300">You have no {activeTab} registered events.</p>
                 {activeTab === 'upcoming' && 
                    <Link to="/student-dashboard/all-events">
                        <Button variant="secondary" className="mt-4">Find Events</Button>
                    </Link>
                 }
            </div>
        )}
    </GlassCard>
  );
};

export default RegisteredEventsTab;
