'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Code2, Cloud, Sparkles, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#0B0F17] overflow-hidden z-20">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[300px] w-[500px] rounded-full bg-green-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ── Left Column: Content ── */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 border border-blue-500/20 w-fit mb-8"
            >
              <span className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider">
                About GDG RMKEC
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-6"
            >
              Empowering students through <span className="text-gradient-google">technology</span> and community.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-10"
            >
              We are a passionate community of developers, designers, and tech enthusiasts. Our goal is to bridge the gap between academic learning and industry standards by fostering an environment of collaboration, innovation, and hands-on experience with Google technologies.
            </motion.p>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-slate-900/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 transition-transform group-hover:scale-110 group-hover:bg-blue-500/20">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    To build a thriving ecosystem where students can transform their ideas into impactful, real-world solutions.
                  </p>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-slate-900/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 transition-transform group-hover:scale-110 group-hover:bg-green-500/20">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    To provide resources, mentorship, and opportunities for members to learn, grow, and succeed in the tech industry.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Right Column: Animated Visual ── */}
          <div className="relative flex items-center justify-center h-[500px] w-full mt-10 lg:mt-0">
            {/* Center Main Node */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute z-20 flex h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-slate-800/80 shadow-[0_0_50px_rgba(66,133,244,0.3)] backdrop-blur-xl"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-inner">
                <Code2 className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            {/* Orbiting / Floating Elements */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 -top-4 right-4 sm:right-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl shadow-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <Cloud className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Google Cloud</span>
                <span className="text-xs text-slate-400">Infrastructure</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute z-10 bottom-8 -left-4 sm:left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl shadow-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Gen AI</span>
                <span className="text-xs text-slate-400">Innovation</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-10, 10, -10], x: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute z-10 top-16 -left-2 sm:top-20 sm:left-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl shadow-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Machine Learning</span>
                <span className="text-xs text-slate-400">Intelligence</span>
              </div>
            </motion.div>

            {/* Connecting lines / decorative circles */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 500 500">
              <motion.circle 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                cx="250" cy="250" r="160" 
                fill="none" stroke="#4285F4" strokeWidth="1.5" strokeDasharray="6 6" 
              />
              <motion.circle 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                cx="250" cy="250" r="220" 
                fill="none" stroke="#EA4335" strokeWidth="1" 
              />
            </svg>
            
          </div>
        </div>
      </div>
    </section>
  );
};
