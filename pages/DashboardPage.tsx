
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import EventCard from '../components/EventCard';
import type { UniversityEvent } from '../hooks/useMockData';

type EligibilityFilter = 'All' | 'My College' | 'All Colleges' | 'Public';

interface DashboardContextType {
  events: UniversityEvent[];
}

const FilterDropdown: React.FC<{value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[]}> = ({value, onChange, options}) => (
    <select
        value={value}
        onChange={onChange}
        className="w-full md:w-auto px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
    >
        {options.map(opt => (
            <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
        ))}
    </select>
);

const DashboardPage: React.FC = () => {
    const { events } = useOutletContext<DashboardContextType>();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterLocation, setFilterLocation] = useState('All');
    const [filterEligibility, setFilterEligibility] = useState<EligibilityFilter>('All');
    const [filterClub, setFilterClub] = useState('All');

    const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];
    const locations = ['All', ...Array.from(new Set(events.map(e => e.location)))];
    const clubs = ['All', ...Array.from(new Set(events.map(e => e.organizer)))];
    const eligibilities: EligibilityFilter[] = ['All', 'My College', 'All Colleges', 'Public'];

    const happeningNearYouEvents = events.filter(event => event.location === 'MBU Campus' && new Date(event.date) >= new Date());

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
        const matchesLocation = filterLocation === 'All' || event.location === filterLocation;
        const matchesEligibility = filterEligibility === 'All' || event.eligibility === filterEligibility;
        const matchesClub = filterClub === 'All' || event.organizer === filterClub;
        return matchesSearch && matchesCategory && matchesLocation && matchesEligibility && matchesClub;
    });

    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-bold text-white">Student Dashboard</h1>
            
            {/* Filters */}
            <div className="bg-slate-800/30 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center flex-wrap">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center">
                    <span className="text-slate-400 font-semibold hidden sm:block">Filter by:</span>
                    <FilterDropdown value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} options={categories} />
                    <FilterDropdown value={filterClub} onChange={(e) => setFilterClub(e.target.value)} options={clubs} />
                    <FilterDropdown value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} options={locations} />
                    <FilterDropdown value={filterEligibility} onChange={(e) => setFilterEligibility(e.target.value as EligibilityFilter)} options={eligibilities} />
                </div>
            </div>
            
            {/* Happening Near You Section */}
            {happeningNearYouEvents.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-6">Happening on MBU Campus</h2>
                    <div className="flex overflow-x-auto space-x-8 pb-4">
                        {happeningNearYouEvents.map(event => (
                            <div key={event.id} className="w-96 flex-shrink-0">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Event Grid */}
            <div>
                <h2 className="text-2xl font-semibold text-white mb-6">All Events</h2>
                 {filteredEvents.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800/30 rounded-xl">
                        <p className="text-slate-300">No events match your criteria. Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
