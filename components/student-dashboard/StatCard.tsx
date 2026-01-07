
import React from 'react';
import GlassCard from '../GlassCard';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    const colorClasses: { [key: string]: string } = {
        teal: 'text-teal-400',
        green: 'text-green-400',
        yellow: 'text-yellow-400',
        red: 'text-red-400',
    };
    
    return (
        <GlassCard className="p-6 flex items-center gap-6">
            <div className={`p-4 bg-slate-50/10 rounded-full ${colorClasses[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-400 font-medium">{title}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
        </GlassCard>
    );
};

export default StatCard;
