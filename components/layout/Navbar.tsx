'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, ArrowRight } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { GDGLogo } from '@/components/ui/GDGLogo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full bg-[rgba(8,12,22,0.92)] backdrop-blur-[18px] border-b border-[rgba(255,255,255,0.06)]"
      >
        <div className="flex items-center justify-between h-[80px] px-6 xl:px-10 w-full">
          {/* Logo - Left */}
          <Link href="/" className="hover:opacity-90 transition-opacity z-10 flex-shrink-0">
            <GDGLogo size={36} />
          </Link>

          {/* Centered Navigation */}
          <nav className="hidden xl:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-8">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex flex-col items-center font-inter text-[15px] transition-colors ${
                    isActive ? 'font-medium text-[#F8F9FA]' : 'font-medium text-[#F8F9FA]/70 hover:text-[#F8F9FA]'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Google Style Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[30px] h-[3px] rounded-full bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Menu */}
          <div className="flex items-center gap-4 z-10 flex-shrink-0">
            <Link href="/join" className="hidden sm:block">
              {/* Gradient Border Button */}
              <button className="group relative h-[50px] inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)] p-[1px] transition-all duration-300 hover:scale-[1.02]">
                <div className="flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#0B1220] px-6">
                  <span className="font-inter font-semibold text-white text-[15px]">Join Community</span>
                  <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                </div>
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
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
};
