'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { siteConfig } from '@/data/site';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: 'circle(30px at calc(100% - 40px) 40px)',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
    open: {
      opacity: 1,
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
  };

  const linkVariants: Variants = {
    closed: { y: 30, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-slate-950/95 p-6 md:p-12 backdrop-blur-2xl text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-400/30">
                <Sparkles className="h-5 w-5 text-blue-400" />
              </div>
              <span className="font-extrabold tracking-tight text-lg text-gradient-google">
                GDG RMKEC
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links Grid */}
          <div className="my-auto py-8 flex flex-col gap-4">
            {mainNav.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div key={item.href} custom={index} variants={linkVariants}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between text-2xl sm:text-4xl font-bold tracking-tight transition-all duration-300 ${
                      isActive ? 'text-blue-400 pl-2' : 'text-slate-300 hover:text-white hover:pl-2'
                    }`}
                  >
                    <span>{item.label}</span>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-xs font-semibold uppercase bg-blue-500/20 border border-blue-400/40 text-blue-400 px-2.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} GDG RMKEC. Built with Google Tech.
            </p>
            <Link href="/join" onClick={onClose} className="w-full sm:w-auto">
              <MagneticButton variant="google" className="w-full sm:w-auto">
                Join GDG Chapter
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
