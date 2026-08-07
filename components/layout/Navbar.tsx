'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { GDGLogo } from '@/components/ui/GDGLogo';

// Smaller subset for desktop nav to avoid overcrowding
const desktopNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Community', href: '/community' },
  { label: 'Family', href: '/family' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_20px_rgba(26,26,46,0.08)] border-b border-[#E8ECF0]'
            : 'bg-transparent'
          }`}
        style={{ transitionDuration: '350ms' }}
      >
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            {/* Logo */}
            <Link
              href="/"
              onClick={() => window.dispatchEvent(new CustomEvent('trigger-google-loader'))}
              className="hover:opacity-85 transition-opacity duration-200"
            >
              <GDGLogo size={48} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {desktopNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (item.href === '/') {
                        window.dispatchEvent(new CustomEvent('trigger-google-loader'));
                      }
                    }}
                    className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                        ? 'bg-[#4285F4]/10 text-[#4285F4] font-semibold'
                        : 'text-[#5F6B7A] hover:text-[#1A1A2E] hover:bg-[#1A1A2E]/06'
                      }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4285F4]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Join button */}
              <Link href="/join" className="hidden sm:flex">
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#4285F4] text-white text-sm font-semibold rounded-full shadow-[0_2px_12px_rgba(66,133,244,0.35)] hover:bg-[#3367D6] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(66,133,244,0.5)] transition-all duration-250 cursor-pointer">
                  Join Community
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-full bg-[#1A1A2E]/06 text-[#1A1A2E] hover:bg-[#1A1A2E]/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[110] w-[min(340px,90vw)] bg-[#0D1117] text-white flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/08">
                <GDGLogo size={42} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full bg-white/08 hover:bg-white/12 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
                {mainNav.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          setMobileOpen(false);
                          if (item.href === '/') {
                            window.dispatchEvent(new CustomEvent('trigger-google-loader'));
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-200 ${isActive
                            ? 'bg-[#4285F4]/15 text-[#6BA3F7]'
                            : 'text-[#8B949E] hover:text-white hover:bg-white/05'
                          }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="px-6 py-6 border-t border-white/08">
                <Link
                  href="/join"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Join GDG RMKEC
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
