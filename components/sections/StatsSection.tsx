'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Calendar, Code2, UsersRound, Landmark } from 'lucide-react';
import { statsData } from '@/data/stats';

const statConfig = [
  { icon: <Users    className="h-5 w-5" />, accent: '#4285F4' },
  { icon: <Calendar className="h-5 w-5" />, accent: '#EA4335' },
  { icon: <Code2    className="h-5 w-5" />, accent: '#34A853' },
  { icon: <UsersRound className="h-5 w-5" />, accent: '#FBBC05' },
  { icon: <Landmark  className="h-5 w-5" />, accent: '#4285F4' },
];

/* ── Animated counter ─────────────────────────────── */
const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export const StatsSection: React.FC = () => {
  return (
    <section className="relative bg-[#0D1117] py-28 overflow-hidden">

      {/* ── Background textures ── */}
      <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none" />

      {/* ── Large blobs ── */}
      <div className="blob" style={{ width: 700, height: 500, background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 60%, transparent 100%)', top: '-20%', left: '-10%', opacity: 0.08, animationDelay: '2s' }} />
      <div className="blob" style={{ width: 500, height: 400, background: 'radial-gradient(ellipse, #EA4335 0%, #FBBC05 60%, transparent 100%)', bottom: '-10%', right: '-8%', opacity: 0.07, animationDelay: '5s' }} />

      {/* ── Decorative rings ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' as const }}
        className="absolute pointer-events-none"
        style={{ top: '-5%', left: '-5%', width: 300, height: 300, borderRadius: '50%', border: '1px dashed rgba(66,133,244,0.15)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' as const }}
        className="absolute pointer-events-none"
        style={{ bottom: '-8%', right: '5%', width: 240, height: 240, borderRadius: '50%', border: '1px dashed rgba(52,168,83,0.15)' }}
      />
      <div className="absolute pointer-events-none" style={{ top: '10%', right: '20%', width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />

      {/* ── Floating geometric shapes ── */}
      {/* Top-left dots */}
      {[0,1,2,3,4].map(i => (
        <motion.div key={`dot-tl${i}`}
          animate={{ y: [0, i%2===0 ? -8 : 8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3+i*0.4, delay: i*0.3, repeat: Infinity }}
          className="absolute pointer-events-none rounded-full"
          style={{ top: `${8+i*5}%`, left: `${3+i*3}%`, width: 4+i%2*2, height: 4+i%2*2, background: ['#4285F4','#EA4335','#FBBC05','#34A853','#4285F4'][i] }}
        />
      ))}
      {/* Bottom-right dots */}
      {[0,1,2,3].map(i => (
        <motion.div key={`dot-br${i}`}
          animate={{ y: [0, i%2===0 ? 6 : -6, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5+i*0.5, delay: i*0.5+1, repeat: Infinity }}
          className="absolute pointer-events-none rounded-full"
          style={{ bottom: `${10+i*4}%`, right: `${4+i*3}%`, width: 4+i%3*2, height: 4+i%3*2, background: ['#34A853','#FBBC05','#EA4335','#4285F4'][i] }}
        />
      ))}

      {/* Floating squares */}
      <motion.div animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute pointer-events-none" style={{ top: '15%', right: '8%', width: 16, height: 16, background: '#4285F4', borderRadius: '3px', opacity: 0.2 }} />
      <motion.div animate={{ y: [0, 10, 0], rotate: [0, -20, 0] }} transition={{ duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute pointer-events-none" style={{ bottom: '20%', left: '12%', width: 12, height: 12, background: '#34A853', borderRadius: '3px', opacity: 0.22 }} />
      <motion.div animate={{ y: [0, -8, 0], rotate: [45, 60, 45] }} transition={{ duration: 7, delay: 2, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute pointer-events-none" style={{ top: '45%', left: '6%', width: 10, height: 10, background: '#FBBC05', borderRadius: '2px', opacity: 0.2, transform: 'rotate(45deg)' }} />

      {/* Horizontal accent lines */}
      <div className="absolute pointer-events-none" style={{ top: '30%', left: 0, width: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(66,133,244,0.25))' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '35%', right: 0, width: 80, height: 1, background: 'linear-gradient(270deg, transparent, rgba(52,168,83,0.25))' }} />

      {/* Cross accents */}
      <div className="absolute pointer-events-none opacity-10" style={{ top: '20%', left: '15%' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v16M2 10h16" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute pointer-events-none opacity-10" style={{ bottom: '25%', right: '18%' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v16M2 10h16" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(66,133,244,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8">

        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <span className="chip chip-dark-blue mb-4 inline-flex">Our Impact</span>
          <h2 className="heading-section text-[#E8EAED]" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
            Community by the{' '}
            <span className="text-gradient-blue">Numbers</span>
          </h2>
          {/* decorative line */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4285F4]/40" />
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] opacity-70" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] opacity-70" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05] opacity-70" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] opacity-70" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#34A853]/40" />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {statsData.map((stat, i) => {
            const cfg = statConfig[i % statConfig.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                className="card-dark flex flex-col items-center text-center p-6 gap-4 relative overflow-hidden"
              >
                {/* Card corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle at 100% 0%, ${cfg.accent}18 0%, transparent 70%)` }} />

                {/* Icon chip */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${cfg.accent}18`, color: cfg.accent }}>
                  {cfg.icon}
                </div>

                {/* Number */}
                <div className="font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', lineHeight: 1, color: cfg.accent }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label + description */}
                <div className="space-y-1">
                  <div className="font-semibold text-[#E8EAED] text-sm">{stat.label}</div>
                  <div className="text-[#8B949E] text-xs">{stat.description}</div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 rounded-full" style={{ background: cfg.accent, opacity: 0.5 }} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom GDG color strip */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex mt-14 mx-auto max-w-md h-1 rounded-full overflow-hidden"
          style={{ transformOrigin: 'left' }}
        >
          <div className="flex-1 bg-[#4285F4]" />
          <div className="flex-1 bg-[#EA4335]" />
          <div className="flex-1 bg-[#FBBC05]" />
          <div className="flex-1 bg-[#34A853]" />
        </motion.div>

      </div>

      {/* Wave divider: dark → light */}
      <div className="relative mt-24 -mb-px">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#F5F7FA" />
        </svg>
      </div>

    </section>
  );
};
