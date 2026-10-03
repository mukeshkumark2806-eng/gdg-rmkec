'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-full bg-white/05 border border-white/10 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 border cursor-pointer ${
        theme === 'dark'
          ? 'bg-[#121216] border-white/15 text-[#FBBC05] hover:bg-white/10 hover:border-white/30 shadow-[0_0_12px_rgba(251,188,5,0.2)]'
          : 'bg-[#ffffff] border-black/15 text-[#4285F4] hover:bg-black/05 hover:border-black/30 shadow-[0_0_12px_rgba(66,133,244,0.25)]'
      } ${className}`}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform duration-500 rotate-0 hover:rotate-90 text-[#FBBC05]" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-500 -rotate-12 hover:rotate-0 text-[#4285F4]" />
      )}
    </button>
  );
};
