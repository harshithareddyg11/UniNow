
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StatCard from '../StatCard';
import EventCard from '../../EventCard';
import { CalendarIcon, CheckCircleIcon, StarIcon, ClockIcon } from '../../IconComponents';
import type { UniversityEvent } from '../../../src/hooks/useMockData';

interface OverviewContextType {
  rsvpedEvents: Set<string>;
  interestedEvents: Set<string>;
  events: UniversityEvent[];
}

const OverviewTab: React.FC = () => {
  const { rsvpedEvents, interestedEvents, events } = useOutletContext<OverviewContextType>();
  const now = new Date();

  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const missedEventsCount = events.filter(e => new Date(e.date) < now).length;
  
  const happeningNearYou = events.filter(event => event.location === 'MBU Campus' && new Date(event.date) >= now).slice(0, 4);

  const iconClass = "h-8 w-8";

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Upcoming Events" value={upcomingEvents.length} icon={<CalendarIcon className={iconClass} />} color="teal" />
        <StatCard title="Registered Events" value={rsvpedEvents.size} icon={<CheckCircleIcon className={iconClass} />} color="green" />
        <StatCard title="Interested Events" value={interestedEvents.size} icon={<StarIcon className={iconClass} />} color="yellow" />
        <StatCard title="Missed Events" value={missedEventsCount} icon={<ClockIcon className={iconClass} />} color="red" />
      </div>

      {/* Happening Near You */}
      {happeningNearYou.length > 0 && (
          <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Happening on MBU Campus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {happeningNearYou.map(event => (
                      <EventCard key={event.id} event={event} />
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default OverviewTab;
