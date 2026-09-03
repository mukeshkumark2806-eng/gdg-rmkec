'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { GDGLogo } from '@/components/ui/GDGLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLiteMode } from '@/context/LiteModeContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Journey', href: '/journey' },
  { label: 'Events', href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Album', href: '/album' },
  { label: 'Family Wall', href: '/family' },
  { label: 'Join Us', href: '/join' },
];

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Journey', href: '/journey' },
  { label: 'Events & Jams', href: '/events' },
  { label: 'Campus Projects', href: '/projects' },
  { label: 'Event Album', href: '/album' },
  { label: 'Family Wall', href: '/family' },
  { label: 'Join the Community', href: '/join' },
  { label: 'Contact & Support', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isLiteMode, toggleLiteMode } = useLiteMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Top Left Brand Logo ─────────────────────────────────── */}
      <div className="fixed top-5 left-4 sm:left-8 z-50 pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 group p-1.5 rounded-full bg-[#121216]/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all"
        >
          <GDGLogo size={36} theme="dark" />
        </Link>
      </div>

      {/* ─── Center Floating Capsule Navbar (Desktop) ─────────────── */}
      <header className="fixed inset-x-0 top-5 z-40 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#121216]/80 px-2 py-1.5 backdrop-blur-md shadow-2xl transition-all duration-300 ${
            scrolled ? 'border-white/20 bg-black/90 shadow-[0_8px_32px_rgba(0,0,0,0.8)]' : ''
          }`}
        >
          <ul className="flex items-center gap-1 whitespace-nowrap">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/15 text-white shadow-sm'
                        : 'text-white/70 hover:bg-white/08 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* ─── Right Fixed Action Glow Buttons + Theme Toggle ────────── */}
      <div className="fixed top-5 right-4 sm:right-8 z-50 flex items-center gap-2.5 pointer-events-auto">
        {/* Dark / Light Theme Toggle Switch */}
        <ThemeToggle />

        {/* Contact / Support Glow Button */}
        <GlowButton
          href="/contact"
          shape="box"
          size="sm"
          surfaceClassName="h-9 w-9 sm:h-10 sm:w-10 !p-0"
          ariaLabel="Contact & Support"
        >
          <User className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white/90" />
        </GlowButton>

        {/* Hamburger Menu Trigger */}
        <GlowButton
          onClick={() => setMenuOpen(!menuOpen)}
          shape="box"
          size="sm"
          surfaceClassName="h-9 w-9 sm:h-10 sm:w-10 !p-0"
          ariaLabel={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative flex flex-col items-center justify-center gap-1.5 w-4.5 h-4.5">
            <span
              className={`block h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-0.5' : ''
              }`}
            />
          </div>
        </GlowButton>
      </div>

      {/* ─── Fullscreen Hamburger Overlay ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 sm:gap-6 bg-black/95 px-6 backdrop-blur-2xl text-2xl sm:text-4xl md:text-5xl select-none"
          >
            {/* Close & Theme Toggle on top right */}
            <div className="absolute top-6 right-6 sm:right-10 flex items-center gap-3">
              <ThemeToggle />
              <GlowButton
                onClick={() => setMenuOpen(false)}
                shape="circle"
                size="sm"
                surfaceClassName="h-10 w-10 !p-0"
                ariaLabel="Close menu"
              >
                <X className="h-5 w-5 text-white" />
              </GlowButton>
            </div>

            {/* Menu Links with rolling animations */}
            <div className="flex flex-col items-center gap-3 sm:gap-5 overflow-y-auto max-h-[80vh] py-6 w-full">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 + 0.05, duration: 0.3 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-center gap-3 font-semibold text-white/80 hover:text-white transition-colors"
                  >
                    <span className="text-roll-wrapper">
                      <span className="text-roll-top inline-block">{item.label}</span>
                      <span className="text-roll-bottom inline-block" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-white/40 group-hover:text-white group-hover:translate-x-1.5 transition-all">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer note & Lite mode toggle */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => toggleLiteMode()}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/05 px-3 py-1.5 text-xs font-mono text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                title={isLiteMode ? 'Disable Lite mode' : 'Enable Lite mode'}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                    isLiteMode ? 'bg-[#34A853] shadow-[0_0_8px_rgba(52,168,83,0.8)]' : 'bg-white/30'
                  }`}
                />
                Lite Mode:{' '}
                <span className={isLiteMode ? 'text-[#34A853] font-bold' : 'text-white/40'}>
                  {isLiteMode ? 'ON' : 'OFF'}
                </span>
              </button>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                GDG on Campus RMKEC · Established Sept 2025
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
