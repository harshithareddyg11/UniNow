
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import EventCard from '../../EventCard';
import type { UniversityEvent } from '../../../src/hooks/useMockData';

interface InterestedEventsContextType {
  interestedEvents: Set<string>;
  events: UniversityEvent[];
}

const InterestedEventsTab: React.FC = () => {
  const { interestedEvents, events } = useOutletContext<InterestedEventsContextType>();
  const myInterestedEvents = events.filter(event => interestedEvents.has(event.id));

  return (
    <div>
        {myInterestedEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {myInterestedEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-slate-800/30 rounded-xl">
                <p className="text-slate-300">You haven't marked any events as "interested" yet.</p>
                <p className="text-sm text-slate-400 mt-2">Click the star icon on an event to add it here.</p>
            </div>
        )}
    </div>
  );
};

export default InterestedEventsTab;
