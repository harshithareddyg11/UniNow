
import React from 'react';

interface BadgeProps {
    text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
    const colorClasses: { [key: string]: string } = {
        'Tech': 'bg-blue-500/20 text-blue-300',
        'Cultural': 'bg-purple-500/20 text-purple-300',
        'Sports': 'bg-green-500/20 text-green-300',
        'Arts': 'bg-pink-500/20 text-pink-300',
        'Business': 'bg-yellow-500/20 text-yellow-300',
        'Charity': 'bg-red-500/20 text-red-300',
        'Default': 'bg-gray-500/20 text-gray-300'
    };
    
    const className = colorClasses[text] || colorClasses['Default'];
    
    return (
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${className}`}>
            {text}
        </span>
    );
};

export default Badge;
