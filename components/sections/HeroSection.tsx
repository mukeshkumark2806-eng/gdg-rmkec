'use client';

import React from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code2, Calendar, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center relative z-10">
        {/* Presenter Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#f0f0f2]/80 px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/70 backdrop-blur-md shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4285F4]" />
          </span>
          <span>GDG ON CAMPUS RMKEC</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-white select-none"
        >
          Building the Future of Technology at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">RMKEC</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed"
        >
          A community of innovators, builders, problem solvers, and future technology leaders working
          together to learn, create, and impact the college ecosystem through technology.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 text-xs sm:text-sm md:text-base text-white/70 max-w-2xl leading-relaxed"
        >
          Google Developer Group on Campus – R.M.K. Engineering College is a student-led technology
          community that empowers students to learn, build, collaborate, and innovate. Through
          workshops, hackathons, study jams, technical projects, and community initiatives, we create
          opportunities for students to grow their technical and leadership skills while solving
          real-world challenges within the college ecosystem.
        </motion.p>

        {/* CTA Buttons from Document: Join Community, Explore Projects, View Events */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <GlowButton href="/join" shape="pill" size="lg">
            Join Community →
          </GlowButton>
          <GlowButton href="/projects" shape="pill" size="lg">
            Explore Projects →
          </GlowButton>
          <GlowButton href="/events" shape="pill" size="lg">
            View Events →
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
};
