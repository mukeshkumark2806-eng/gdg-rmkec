'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ArrowDown } from 'lucide-react';
import { HeroCanvas } from '@/components/sections/HeroCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen h-screen flex flex-col justify-between pt-28 pb-4 overflow-hidden bg-[#0B0F17]">
      {/* Background Interactive Real-Time Neural Network Visualization Canvas */}
      <HeroCanvas />

      {/* Main Content Area — 93 vw, generous desktop padding */}
      <div className="relative z-20 w-[93vw] mx-auto px-12 xl:px-16 my-auto flex flex-col justify-center">
        {/* Two-column grid: 55% text | 45% canvas breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center">

          {/* ── Left Column: Hero Text ── */}
          <div className="flex flex-col lg:pl-0">

            {/* Developer Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-1.5 border border-white/15 backdrop-blur-md mb-10 shadow-lg w-fit"
            >
              <span className="text-xs sm:text-sm font-mono text-slate-300 tracking-wide">
                &lt; Developers <span className="text-slate-500">|</span> Innovators <span className="text-slate-500">| </span> Problem Solvers /&gt;
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }}
              className="text-5xl sm:text-7xl lg:text-[84px] font-black tracking-tight text-white leading-[1.06] mb-8"
            >
              Build. Learn. <br />
              <span className="whitespace-nowrap">Grow. <span className="text-gradient-google text-[1.08em]">Together.</span></span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-12 max-w-lg"
            >
              Google Developer Group RMKEC is a community of passionate developers building the future through learning, collaboration, and impactful solutions.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-5"
            >
              <Link href="/join">
                <button className="group relative inline-flex items-center justify-center gap-3 rounded-[14px] bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)] px-8 py-4 text-sm font-bold text-white transition-all duration-300 ease-out hover:brightness-110 hover:scale-[1.025] active:scale-[0.98]">
                  <span>Join Community</span>
                  <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </Link>

              <Link href="/events">
                <button className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/30 hover:bg-slate-800/50 hover:shadow-[0_0_20px_rgba(66,133,244,0.15)] active:scale-[0.98]">
                  <span>Explore Events</span>
                  <Calendar className="h-4 w-4 text-slate-300 transition-all duration-300 ease-out group-hover:translate-x-[3px] group-hover:text-white" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* ── Right Column: Empty — the canvas animation fills this zone via absolute positioning ── */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-20 mx-auto mb-2 flex flex-col items-center gap-2 text-slate-400 text-xs font-medium"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 backdrop-blur-md shadow-lg">
          <ArrowDown className="h-4 w-4 text-white animate-bounce" />
        </div>
        <span className="tracking-wide text-slate-400">Scroll to explore</span>
      </motion.div>
    </section>
  );
};
