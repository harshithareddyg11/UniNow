
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import EventCard from '../../EventCard';
import type { UniversityEvent } from '../../../src/hooks/useMockData';

interface MissedEventsContextType {
    events: UniversityEvent[];
}

// This tab simply displays all past events.
// The EventCard component already has logic to show the "missed by X days" message.
const MissedEventsTab: React.FC = () => {
    const { events } = useOutletContext<MissedEventsContextType>();
    const now = new Date();
    const missedEvents = events.filter(e => new Date(e.date) < now);

    return (
        <div>
            {missedEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {missedEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-800/30 rounded-xl">
                    <p className="text-slate-300">No missed events. You're all caught up!</p>
                </div>
            )}
        </div>
    );
};

export default MissedEventsTab;
