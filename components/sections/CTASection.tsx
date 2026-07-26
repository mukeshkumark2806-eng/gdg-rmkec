'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => (
  <section className="relative bg-white overflow-hidden py-28">

    {/* Large blobs */}
    <div className="blob" style={{ width: 600, height: 500, background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 50%, transparent 100%)', top: '-120px', left: '-80px', opacity: 0.10 }} />
    <div className="blob" style={{ width: 450, height: 360, background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 60%, transparent 100%)', bottom: '-80px', right: '-60px', opacity: 0.08, animationDelay: '6s' }} />
    <div className="blob" style={{ width: 300, height: 250, background: 'radial-gradient(ellipse, #34A853 0%, transparent 70%)', top: '40%', right: '20%', opacity: 0.06, animationDelay: '10s' }} />

    {/* Dot grid */}
    <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

    {/* Rotating dashed rings */}
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' as const }}
      className="absolute pointer-events-none"
      style={{ top: '-15%', left: '-8%', width: 400, height: 400, borderRadius: '50%', border: '1.5px dashed rgba(66,133,244,0.12)' }} />
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' as const }}
      className="absolute pointer-events-none"
      style={{ bottom: '-20%', right: '-5%', width: 350, height: 350, borderRadius: '50%', border: '1.5px dashed rgba(52,168,83,0.12)' }} />

    {/* Static rings */}
    <div className="absolute pointer-events-none" style={{ top: '25%', right: '10%', width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(251,188,5,0.15)' }} />
    <div className="absolute pointer-events-none" style={{ bottom: '25%', left: '10%', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(234,67,53,0.15)' }} />

    {/* Floating colored dots */}
    {[
      { top: '10%', left: '5%', color: '#4285F4', w: 10 },
      { top: '25%', left: '3%', color: '#34A853', w: 8 },
      { top: '60%', left: '6%', color: '#FBBC05', w: 11 },
      { top: '80%', left: '4%', color: '#EA4335', w: 7 },
      { top: '8%', right: '5%', color: '#EA4335', w: 9 },
      { top: '35%', right: '3%', color: '#FBBC05', w: 11 },
      { top: '65%', right: '5%', color: '#4285F4', w: 8 },
      { bottom: '10%', right: '8%', color: '#34A853', w: 10 },
    ].map((d, i) => (
      <motion.div key={i}
        animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5 + i * 0.4, delay: i * 0.3, repeat: Infinity }}
        className="absolute pointer-events-none rounded-full"
        style={{ top: (d as any).top, left: (d as any).left, right: (d as any).right, bottom: (d as any).bottom, width: d.w, height: d.w, background: d.color }}
      />
    ))}

    {/* Floating diamonds */}
    {[
      { top: '5%', left: '20%', color: '#4285F4' },
      { bottom: '8%', left: '30%', color: '#EA4335' },
      { top: '5%', right: '18%', color: '#34A853' },
      { bottom: '5%', right: '25%', color: '#FBBC05' },
    ].map((d, i) => (
      <motion.div key={`d${i}`}
        animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0], rotate: [30, 50, 30] }}
        transition={{ duration: 5 + i * 0.5, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute pointer-events-none"
        style={{ top: (d as any).top, left: (d as any).left, right: (d as any).right, bottom: (d as any).bottom, width: 14, height: 14, background: d.color, borderRadius: '3px', opacity: 0.28, transform: 'rotate(30deg)' }}
      />
    ))}

    {/* Cross accents */}
    {[
      { top: '40%', left: '2%', color: '#4285F4' },
      { top: '55%', right: '2%', color: '#34A853' },
    ].map((d, i) => (
      <div key={`c${i}`} className="absolute pointer-events-none" style={{ opacity: 0.15, top: d.top, left: (d as any).left, right: (d as any).right }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v16M2 10h16" stroke={d.color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    ))}

    {/* Animated dot cluster — center top */}
    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
      {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c, i) => (
        <motion.div key={c} animate={{ y: [0, -5, 0] }} transition={{ duration: 2 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
          className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.55 }} />
      ))}
    </div>

    <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8 text-center">
      <div className="max-w-2xl mx-auto space-y-8">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="chip chip-blue inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Ready to innovate?
          </span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          className="heading-display text-[#1A1A2E]" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}>
          Take Your Developer Journey
          <br />to the{' '}
          <span className="text-gradient-google">Next Level</span>
        </motion.h2>

        {/* GDG color underline */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center" style={{ transformOrigin: 'center' }}>
          <div className="flex h-1 w-24 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#4285F4]" /><div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" /><div className="flex-1 bg-[#34A853]" />
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
          className="text-[#5F6B7A] mx-auto max-w-lg" style={{ fontSize: '18px', lineHeight: '1.75' }}>
          Become part of GDG RMKEC. Access Google Cloud credits, GenAI mentorship, hackathon teams, and career opportunities.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/join" className="btn-primary">
            Join Chapter Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="btn-ghost">Learn About Us</Link>
        </motion.div>

        {/* Perks row */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {['Free Events', 'Cloud Credits', 'Mentorship', 'Hackathon Teams', 'Career Network'].map((p, i) => (
            <span key={p} className={`chip ${ ['chip-blue', 'chip-red', 'chip-green', 'chip-yellow', 'chip-blue'][i]} text-xs`}>{p}</span>
          ))}
        </motion.div>

      </div>
    </div>
  </section>
);
