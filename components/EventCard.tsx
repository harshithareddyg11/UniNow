
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { UniversityEvent } from '../src/hooks/useMockData';
import GlassCard from './GlassCard';
import Badge from './Badge';
import { MapPinIcon, ClockIcon, ArrowRightIcon, LockClosedIcon, StarIcon, CheckCircleIcon } from './IconComponents';

interface EventCardProps {
  event: UniversityEvent;
}

interface OutletContextType {
    userCollege: string;
    interestedEvents: Set<string>;
    toggleInterested: (eventId: string) => void;
    rsvpedEvents: Set<string>;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { userCollege, interestedEvents, toggleInterested, rsvpedEvents } = useOutletContext<OutletContextType>();

  const isInterested = interestedEvents.has(event.id);
  const isRsvped = rsvpedEvents.has(event.id);
  
  const handleInterestedClick = (e: React.MouseEvent) => {
      e.preventDefault(); // prevent navigation
      e.stopPropagation();
      toggleInterested(event.id);
  };

  const isEligible = 
    event.eligibility === 'Public' || 
    event.eligibility === 'All Colleges' || 
    (event.eligibility === 'My College' && event.collegeName === userCollege);

  const eventDate = new Date(event.date);
  const now = new Date();
  const isPast = eventDate < now;
  const daysMissed = isPast ? Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 3600 * 24)) : 0;

  const eligibilityTooltip = event.eligibility === 'My College' 
    ? `Only for students of ${event.collegeName}`
    : `This event is not open to you.`;

  return (
    <GlassCard className="overflow-hidden flex flex-col group relative">
      {!isEligible && (
        <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center"
            title={eligibilityTooltip}
        >
            <LockClosedIcon className="h-12 w-12 text-teal-400 mb-2"/>
            <p className="font-bold text-white">Not Eligible</p>
            <p className="text-sm text-slate-300">{`This event is open to: ${event.eligibility === 'My College' ? event.collegeName : event.eligibility}`}</p>
        </div>
      )}
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <button 
            onClick={handleInterestedClick} 
            className="absolute top-3 right-3 z-20 p-2 bg-black/50 rounded-full hover:bg-teal-500/80 transition-colors"
            title={isInterested ? "Remove from interested" : "I'm interested"}
        >
            <StarIcon className={`h-5 w-5 ${isInterested ? 'text-teal-400 fill-current' : 'text-white'}`} />
        </button>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white flex-1 pr-2">{event.title}</h3>
            <Badge text={event.category}/>
        </div>
        <div className="flex items-center text-slate-400 text-sm mb-2">
          <span>{event.collegeName}</span>
        </div>
        <div className="flex items-center text-slate-400 text-sm mb-2">
          <ClockIcon className="h-4 w-4 mr-2 text-teal-400" />
          <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center text-slate-400 text-sm mb-4">
          <MapPinIcon className="h-4 w-4 mr-2 text-teal-400" />
          <span>{event.location}</span>
        </div>
        <p className="text-slate-300 text-sm flex-grow mb-4">{event.description.substring(0, 100)}...</p>
        
        {isPast && (
            <div className="mb-4 text-center bg-red-900/50 text-red-300 text-sm py-2 px-3 rounded-lg">
                You missed this event by {daysMissed} {daysMissed === 1 ? 'day' : 'days'}.
            </div>
        )}
        
        <div className="mt-auto flex justify-between items-center">
            <Link to={`/events/${event.id}`} className="inline-flex items-center gap-2 text-teal-300 font-semibold hover:text-teal-200 transition-colors duration-300 group-hover:underline">
              View Details
              <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            {isRsvped && !isPast && (
                <span className="flex items-center gap-1 text-sm font-semibold bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
                    <CheckCircleIcon className="h-4 w-4" />
                    Registered
                </span>
            )}
        </div>
      </div>
    </GlassCard>
  );
};

export default EventCard;
