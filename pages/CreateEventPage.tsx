
import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import type { NewEventData } from '../App';
import type { UniversityEvent } from '../hooks/useMockData';

const eventCategories: UniversityEvent['category'][] = ['Tech', 'Cultural', 'Sports', 'Arts', 'Business', 'Charity'];

const organizerClubs = {
    'D.A.T.A Club': 'org1',
    'Sports Council MBU': 'org1',
    'TAIT Club': 'org1',
    'Business Club MBU': 'org2',
    'NSS Wing MBU': 'org2',
    'Student Cultural Committee': 'org3',
    'ISTE MBU': 'org4',
    'IEEE MBU': 'org5',
};

type OrganizerName = keyof typeof organizerClubs;

interface CreateEventContextType {
    addEvent: (eventData: NewEventData) => void;
}

const InputField: React.FC<{
    label: string;
    name: string;
    type?: string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    children?: React.ReactNode;
}> = ({label, name, type="text", value, required=true, onChange, children}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
        {children || <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />}
    </div>
);

const CreateEventPage: React.FC = () => {
    const navigate = useNavigate();
    const { addEvent } = useOutletContext<CreateEventContextType>();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: eventCategories[0],
        organizer: Object.keys(organizerClubs)[0] as OrganizerName,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { title, description, location, category, imageUrl, date, time, organizer } = formData;
        
        // Combine date and time into a single ISO string
        const eventDateTime = new Date(`${date}T${time}`).toISOString();
        const organizerId = organizerClubs[organizer as OrganizerName];

        addEvent({
            title,
            description,
            date: eventDateTime,
            location,
            category: category as UniversityEvent['category'],
            imageUrl,
            organizer: organizer,
            organizerId: organizerId,
        });
        
        alert('Event created successfully!');
        navigate('/organizer');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Create New Event</h1>
            <GlassCard>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <InputField label="Event Title" name="title" value={formData.title} onChange={handleChange} />
                    
                    <InputField label="Organizer / Club" name="organizer" value={formData.organizer} onChange={handleChange}>
                       <select
                            id="organizer"
                            name="organizer"
                            value={formData.organizer}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                       >
                            {Object.keys(organizerClubs).map(club => <option key={club} value={club}>{club}</option>)}
                       </select>
                    </InputField>

                    <InputField label="Description" name="description" value={formData.description} onChange={handleChange}>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                    </InputField>

                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
                        <InputField label="Time" name="time" type="time" value={formData.time} onChange={handleChange} />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
                        <InputField label="Category" name="category" value={formData.category} onChange={handleChange}>
                           <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                           >
                                {eventCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                           </select>
                        </InputField>
                    </div>
                    
                    <InputField label="Image URL" name="imageUrl" value={formData.imageUrl} required={false} onChange={handleChange} />

                    <div className="pt-4 flex justify-end gap-4">
                        <Button type="button" variant="secondary" onClick={() => navigate('/organizer')}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create Event
                        </Button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
};

export default CreateEventPage;