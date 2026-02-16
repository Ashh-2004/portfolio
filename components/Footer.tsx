
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} ASHISH RAMANA. All Rights Reserved.
        </p>
        <div className="flex gap-8">
          <span className="text-sm text-zinc-500">Based in Bengaluru</span>
          <a href="#contact" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Hire Me</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
