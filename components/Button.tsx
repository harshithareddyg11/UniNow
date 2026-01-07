
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-6 py-3 font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100";

  const variantClasses = {
    primary: "bg-gradient-to-r from-teal-400 to-emerald-500 text-white hover:shadow-lg hover:shadow-teal-400/30 focus:ring-teal-300",
    secondary: "bg-slate-700/50 border border-slate-600/80 text-slate-200 hover:bg-slate-700 focus:ring-slate-500",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
