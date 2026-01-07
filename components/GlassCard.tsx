
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-500/30 shadow-lg transition-all duration-300 hover:bg-slate-800/50 hover:shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
