
import React, { useState } from 'react';
import GlassCard from '../../GlassCard';
import Button from '../../Button';

const InputField: React.FC<{
    label: string, 
    id: string, 
    type?: string, 
    value: string, 
    disabled?: boolean, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({label, id, type="text", value, disabled=false, onChange}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50" 
        />
    </div>
);

const SelectField: React.FC<{
    label: string, 
    id: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
    children: React.ReactNode
}> = ({label, id, value, children, onChange}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
            {children}
        </select>
    </div>
)

const SettingsTab: React.FC = () => {
    const [profileData, setProfileData] = useState({
        fullName: 'Priya Sharma',
        email: 'priya.sharma@mbu.asia',
        college: 'Mohan Babu University',
        location: 'MBU Campus',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700/80 pb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" id="fullName" value={profileData.fullName} onChange={handleChange} />
            <InputField label="Email Address" id="email" type="email" value={profileData.email} onChange={handleChange} disabled />
            <SelectField label="Current College" id="college" value={profileData.college} onChange={handleChange}>
                <option>Mohan Babu University</option>
                <option>IIT Madras</option>
                <option>VIT Vellore</option>
            </SelectField>
            <SelectField label="Primary Location" id="location" value={profileData.location} onChange={handleChange}>
                <option>MBU Campus</option>
                <option>SV University Auditorium</option>
                <option>Tirupati City Center</option>
            </SelectField>
        </div>
         <div className="mt-8 text-right">
            <Button>Save Changes</Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default SettingsTab;
