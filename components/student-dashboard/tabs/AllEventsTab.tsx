
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import EventCard from '../../EventCard';
import type { UniversityEvent } from '../../../src/hooks/useMockData';

interface AllEventsContextType {
    events: UniversityEvent[];
}

// This tab simply displays all events using the existing EventCard component.
const AllEventsTab: React.FC = () => {
    const { events } = useOutletContext<AllEventsContextType>();

    return (
        <div>
            {events.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-800/30 rounded-xl">
                    <p className="text-slate-300">No events found.</p>
                </div>
            )}
        </div>
    );
};

export default AllEventsTab;
