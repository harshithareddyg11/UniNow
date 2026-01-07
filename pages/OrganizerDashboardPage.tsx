
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { PlusCircleIcon, ArrowRightIcon } from '../components/IconComponents';
import type { UniversityEvent } from '../hooks/useMockData';

interface OrganizerDashboardContextType {
  events: UniversityEvent[];
}

const OrganizerDashboardPage: React.FC = () => {
    // In a real app, organizerId would come from the authenticated user's session.
    const MOCK_ORGANIZER_ID = 'org1';
    const { events } = useOutletContext<OrganizerDashboardContextType>();
    const myEvents = events.filter(event => event.organizerId === MOCK_ORGANIZER_ID);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-4xl font-bold text-white">Organizer Dashboard</h1>
                <Link to="/create-event">
                    <Button className="inline-flex items-center gap-2">
                        <PlusCircleIcon className="h-6 w-6" />
                        Create New Event
                    </Button>
                </Link>
            </div>

            <GlassCard className="p-8">
                <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-700 pb-4">My Events</h2>
                {myEvents.length > 0 ? (
                    <div className="space-y-4">
                        {myEvents.map(event => (
                            <div key={event.id} className="bg-slate-800/50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-800/80 transition-colors duration-300">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{event.title}</h3>
                                    <p className="text-sm text-slate-400">
                                        {new Date(event.date).toLocaleDateString()} - {event.location}
                                    </p>
                                </div>
                                <Link to={`/events/${event.id}`}>
                                    <Button variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2">
                                        View
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-300">You haven't created any events yet.</p>
                        <Link to="/create-event" className="text-teal-400 hover:underline mt-2 inline-block">
                            Create your first event
                        </Link>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};

export default OrganizerDashboardPage;
