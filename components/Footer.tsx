
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-slate-700/80 mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} UniNow. All rights reserved.</p>
        <p className="text-sm mt-1">Connecting University Communities, One Event at a Time.</p>
      </div>
    </footer>
  );
};

export default Footer;
