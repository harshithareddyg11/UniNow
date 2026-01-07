
import React, { useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { MapPinIcon, ClockIcon, UserGroupIcon, ArrowRightIcon, CheckCircleIcon, TagIcon } from '../components/IconComponents';
import type { UniversityEvent } from '../hooks/useMockData';

interface DetailPageContextType {
    rsvpedEvents: Set<string>;
    toggleRsvp: (eventId: string) => void;
    userCollege: string;
    events: UniversityEvent[];
}

const EventDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { rsvpedEvents, toggleRsvp, userCollege, events } = useOutletContext<DetailPageContextType>();
    const event = events.find(e => e.id === id);
    
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    if (!event) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-white">Event not found</h1>
                <p className="text-slate-400 mt-4">The event you are looking for does not exist or may have been moved.</p>
                <Link to="/dashboard">
                    <Button className="mt-8">Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    const isRsvped = rsvpedEvents.has(event.id);
    const isEligible = 
      event.eligibility === 'Public' || 
      event.eligibility === 'All Colleges' || 
      (event.eligibility === 'My College' && event.collegeName === userCollege);
    
    const isPast = new Date(event.date) < new Date();

    const handleRegisterClick = () => {
        if (!isEligible || isPast) return;

        toggleRsvp(event.id);
        if (!isRsvped) {
            setConfirmationVisible(true);
        }
    };

    const eligibilityTextMap = {
        'My College': `Open to ${event.collegeName} only`,
        'All Colleges': 'Open to all college students',
        'Public': 'Open to everyone'
    };

    return (
        <div>
            <Modal
                isOpen={isConfirmationVisible}
                onClose={() => setConfirmationVisible(false)}
                title="Registration Successful!"
            >
                <div className="text-center">
                    <CheckCircleIcon className="h-16 w-16 text-teal-400 mx-auto mb-4" />
                    <p className="text-lg text-white">You're all set for</p>
                    <p className="font-bold text-xl text-teal-300 mb-4">{event.title}</p>
                    <p className="text-slate-400">We'll see you there. A confirmation has been sent to your email (not really!).</p>
                    <Button onClick={() => setConfirmationVisible(false)} className="mt-6">
                        Awesome!
                    </Button>
                </div>
            </Modal>

            <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">{event.title}</h1>
                    <div className="mt-2"><Badge text={event.category} /></div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">About this event</h2>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">{event.description}</p>
                    </GlassCard>
                </div>
                
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-3">Event Details</h3>
                        <div className="flex items-start gap-4">
                            <ClockIcon className="h-6 w-6 text-teal-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-white">Date and Time</p>
                                <p className="text-slate-300">{new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPinIcon className="h-6 w-6 text-teal-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-white">Location</p>
                                <p className="text-slate-300">{event.location}, {event.collegeName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <UserGroupIcon className="h-6 w-6 text-teal-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-white">Eligibility</p>
                                <p className="text-slate-300">{eligibilityTextMap[event.eligibility]}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <TagIcon className="h-6 w-6 text-teal-400 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-white">Organized by</p>
                                <p className="text-slate-300">{event.organizer}</p>
                            </div>
                        </div>
                        <Button 
                            className="w-full mt-4 flex items-center justify-center gap-2"
                            onClick={handleRegisterClick}
                            variant={isRsvped ? 'secondary' : 'primary'}
                            disabled={!isEligible || isPast}
                        >
                            {isPast ? 'Event has ended' : (isRsvped ? (
                                <>
                                    <CheckCircleIcon className="h-5 w-5" />
                                    Registered
                                </>
                            ) : (
                                <>
                                    Register for Event
                                    <ArrowRightIcon className="h-5 w-5" />
                                </>
                            ))}
                        </Button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
