'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, ArrowRight } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { GDGLogo } from '@/components/ui/GDGLogo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0F17]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Official GDG Logo */}
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <GDGLogo size={36} />
            </Link>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 text-sm font-medium transition-colors ${
                      isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Exact Rainbow Underline Accent for Active Link */}
                    {isActive && (
                      <motion.span
                        layoutId="activeRainbowNavLine"
                        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Action Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link href="/join" className="hidden sm:inline-block">
                <button className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-blue-400 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(66,133,244,0.3)]">
                  <span>Join Community</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="xl:hidden flex items-center justify-center rounded-xl bg-slate-900 p-2 text-white border border-white/15 hover:bg-slate-800 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
};
