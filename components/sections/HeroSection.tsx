'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles, Users, Code2, Cloud, Globe, Zap } from 'lucide-react';
import { GDGWaveStrip } from '@/components/GDGWaveStrip';

/* ── Fade-in-up helper ─────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
});

/* ── Float helper ──────────────────────────────────── */
const floatAnim = (yRange: number[], xRange: number[], dur: number, del = 0) => ({
  animate: { y: yRange, x: xRange },
  transition: { duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut' as const, repeatType: 'loop' as const },
});

/* ── Floating shape ────────────────────────────────── */
interface ShapeProps {
  style?: React.CSSProperties;
  className?: string;
  yRange?: number[];
  xRange?: number[];
  dur?: number;
  del?: number;
  children?: React.ReactNode;
}
const FloatShape: React.FC<ShapeProps> = ({ style, className = '', yRange = [0, -10, 0], xRange = [0, 5, 0], dur = 5, del = 0, children }) => (
  <motion.div {...floatAnim(yRange, xRange, dur, del)} className={`absolute pointer-events-none ${className}`} style={style}>{children}</motion.div>
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-[#F5F7FA] overflow-hidden flex flex-col">

      {/* ════════════════════════════════
          LAYER 1 — LARGE BLOBS
      ════════════════════════════════ */}
      {/* Top-right — Blue+Green */}
      <div className="blob" style={{ width: 700, height: 600, background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 55%, transparent 100%)', top: -200, right: -150, opacity: 0.13 }} />
      {/* Bottom-left — Yellow+Red */}
      <div className="blob" style={{ width: 500, height: 400, background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 55%, transparent 100%)', bottom: 40, left: -120, opacity: 0.09, animationDelay: '4s' }} />
      {/* Center subtle — Blue only */}
      <div className="blob" style={{ width: 600, height: 400, background: 'radial-gradient(ellipse, #4285F4 0%, transparent 70%)', top: '30%', left: '25%', opacity: 0.05, animationDelay: '8s' }} />

      {/* ════════════════════════════════
          LAYER 2 — DOT GRID TEXTURE
      ════════════════════════════════ */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* ════════════════════════════════
          LAYER 3 — GEOMETRIC SHAPES
      ════════════════════════════════ */}

      {/* Dashed ring (large, top-right) */}
      <FloatShape yRange={[0, -18, 0]} xRange={[0, 10, 0]} dur={7} del={0}
        style={{ top: '5%', right: '12%', width: 260, height: 260 }}
        className="rounded-full border-2 border-dashed border-[#4285F4]/20"
      />

      {/* Solid ring (smaller, top-right inner) */}
      <FloatShape yRange={[0, 12, 0]} xRange={[0, -8, 0]} dur={5.5} del={1}
        style={{ top: '12%', right: '18%', width: 120, height: 120 }}
        className="rounded-full border border-[#34A853]/30"
      />

      {/* Blue filled circle — upper left */}
      <FloatShape yRange={[0, -14, 0]} xRange={[0, 6, 0]} dur={6} del={0.5}
        style={{ top: '8%', left: '4%', width: 18, height: 18, background: '#4285F4', borderRadius: '50%', opacity: 0.35 }}
      />
      {/* Green filled circle — left mid */}
      <FloatShape yRange={[0, 10, 0]} xRange={[0, -5, 0]} dur={4.5} del={2}
        style={{ top: '38%', left: '2%', width: 12, height: 12, background: '#34A853', borderRadius: '50%', opacity: 0.45 }}
      />
      {/* Red square — left lower */}
      <FloatShape yRange={[0, -8, 0]} xRange={[0, 4, 0]} dur={5} del={3}
        style={{ top: '60%', left: '6%', width: 10, height: 10, background: '#EA4335', borderRadius: '3px', opacity: 0.35, transform: 'rotate(45deg)' }}
      />
      {/* Yellow dot — bottom left */}
      <FloatShape yRange={[0, 8, 0]} xRange={[0, -4, 0]} dur={6.5} del={1.5}
        style={{ bottom: '15%', left: '10%', width: 14, height: 14, background: '#FBBC05', borderRadius: '50%', opacity: 0.4 }}
      />

      {/* Large blue square (outline) — right mid */}
      <FloatShape yRange={[0, -20, 0]} xRange={[0, 12, 0]} dur={8} del={0.3}
        style={{ top: '35%', right: '4%', width: 80, height: 80, border: '2px solid rgba(66,133,244,0.18)', borderRadius: '12px', transform: 'rotate(15deg)' }}
      />
      {/* Small green diamond — right upper */}
      <FloatShape yRange={[0, 14, 0]} xRange={[0, -8, 0]} dur={5} del={2}
        style={{ top: '20%', right: '7%', width: 20, height: 20, background: '#34A853', borderRadius: '4px', opacity: 0.28, transform: 'rotate(45deg)' }}
      />
      {/* Small yellow triangle/diamond — bottom right */}
      <FloatShape yRange={[0, -10, 0]} xRange={[0, 6, 0]} dur={4.8} del={1}
        style={{ bottom: '18%', right: '10%', width: 16, height: 16, background: '#FBBC05', borderRadius: '3px', opacity: 0.32, transform: 'rotate(30deg)' }}
      />

      {/* Horizontal accent line — left side */}
      <FloatShape yRange={[0, -5, 0]} xRange={[0, 3, 0]} dur={9} del={0}
        style={{ top: '52%', left: 0, width: 60, height: 2, background: 'linear-gradient(90deg, transparent, #4285F4)', opacity: 0.3 }}
      />
      {/* Vertical accent line — right side */}
      <FloatShape yRange={[0, 8, 0]} xRange={[0, -3, 0]} dur={7} del={2}
        style={{ top: '25%', right: 0, width: 2, height: 80, background: 'linear-gradient(180deg, transparent, #34A853)', opacity: 0.3 }}
      />

      {/* Cross/plus icon — scattered */}
      <FloatShape yRange={[0, -12, 0]} xRange={[0, 5, 0]} dur={6} del={3.5}
        style={{ top: '72%', left: '18%', width: 20, height: 20, opacity: 0.22 }}
        className="text-[#4285F4]"
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M10 2v16M2 10h16" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </FloatShape>
      <FloatShape yRange={[0, 10, 0]} xRange={[0, -4, 0]} dur={5.5} del={1.8}
        style={{ top: '15%', left: '40%', width: 16, height: 16, opacity: 0.18 }}
      >
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M8 1v14M1 8h14" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </FloatShape>

      {/* Dotted cluster — bottom right area */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <FloatShape key={i} yRange={[0, (i % 2 === 0 ? -8 : 8), 0]} xRange={[0, (i % 3 === 0 ? 5 : -5), 0]} dur={4 + i * 0.4} del={i * 0.3}
          style={{
            bottom: `${12 + (i % 3) * 5}%`,
            right: `${14 + (i % 4) * 3}%`,
            width: 5, height: 5,
            borderRadius: '50%',
            background: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#4285F4', '#34A853'][i],
            opacity: 0.35,
          }}
        />
      ))}

      {/* Dotted cluster — top left area */}
      {[0, 1, 2, 3].map(i => (
        <FloatShape key={`tl${i}`} yRange={[0, (i % 2 === 0 ? -6 : 6), 0]} xRange={[0, (i % 2 === 0 ? 4 : -4), 0]} dur={3.5 + i * 0.5} del={i * 0.4}
          style={{
            top: `${6 + (i % 3) * 4}%`,
            left: `${8 + (i % 3) * 4}%`,
            width: 4, height: 4,
            borderRadius: '50%',
            background: ['#34A853', '#FBBC05', '#4285F4', '#EA4335'][i],
            opacity: 0.4,
          }}
        />
      ))}

      {/* ════════════════════════════════
          LAYER 4 — CORNER BRACKET DECORATIONS
      ════════════════════════════════ */}
      {/* Top-left corner bracket */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 4L4 20" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 4v16M4 4h16" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-20 right-6 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M36 36v-16M36 36h-16" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════ */}
      <div className="relative z-10 flex-1 mx-auto max-w-[1280px] w-full px-6 sm:px-8 flex items-center pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-center">

          {/* LEFT: Text content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">

            {/* Eyebrow chip */}
            <motion.div {...fadeUp(0.1)}>
              <span className="chip chip-blue">
                <Sparkles className="h-3.5 w-3.5" />
                Official Google Developer Group · RMKEC
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div {...fadeUp(0.2)} className="space-y-2">
              <h1 className="heading-display text-[#1A1A2E]" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>
                Build. Learn.
                <br />
                Grow.{' '}
                <span className="text-gradient-google">Together.</span>
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p {...fadeUp(0.32)} className="text-[#5F6B7A] max-w-lg" style={{ fontSize: '18px', lineHeight: '1.75' }}>
              A vibrant community of student developers at RMK Engineering College — building real products, mastering Google technologies, and growing careers together.
            </motion.p>

            {/* Domain chips */}
            <motion.div {...fadeUp(0.42)} className="flex flex-wrap gap-2">
              <span className="chip chip-blue"><Code2 className="h-3.5 w-3.5" /> Web Dev</span>
              <span className="chip chip-red"><Sparkles className="h-3.5 w-3.5" /> AI &amp; ML</span>
              <span className="chip chip-green"><Cloud className="h-3.5 w-3.5" /> Cloud</span>
              <span className="chip chip-yellow"><Users className="h-3.5 w-3.5" /> Community</span>
              <span className="chip chip-neutral"><Globe className="h-3.5 w-3.5" /> Android</span>
              <span className="chip chip-blue"><Zap className="h-3.5 w-3.5" /> DevFest</span>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.52)} className="flex flex-wrap gap-4 items-center">
              <Link href="/join" className="btn-primary">
                Join the Community
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('trigger-google-loader'))}
                className="btn-ghost flex items-center gap-2 border border-[#4285F4]/30 hover:border-[#4285F4] hover:bg-[#4285F4]/05 text-[#4285F4]"
              >
                <Sparkles className="h-4 w-4 text-[#FBBC05]" />
                Play Google Loading Effect
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div {...fadeUp(0.62)} className="flex items-center gap-8 pt-2">
              {[
                { value: '650+', label: 'Members', color: '#4285F4' },
                { value: '40+', label: 'Events', color: '#EA4335' },
                { value: '25+', label: 'Projects', color: '#34A853' },
              ].map((s) => (
                <div key={s.label} className="text-center relative">
                  <div className="font-bold text-[#1A1A2E]" style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', lineHeight: 1, color: s.color }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-[#5F6B7A] mt-1 font-medium">{s.label}</div>
                </div>
              ))}
              {/* Divider dots */}
              <div className="flex gap-1 items-center pb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] opacity-60" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] opacity-60" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] opacity-60" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05] opacity-60" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: GDG Visual (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px]">

              {/* Background rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#4285F4]/15" />
              <div className="absolute inset-[30px] rounded-full border border-[#34A853]/10" />
              <div className="absolute inset-[60px] rounded-full border border-dashed border-[#EA4335]/10" />

              {/* Glow */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(66,133,244,0.10) 0%, transparent 70%)' }} />

              {/* Red + Blue Combined Floating Segment */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' as const }}
                className="absolute inset-0 w-full h-full p-8 sm:p-12"
              >
                <svg viewBox="2.586 66.379 250.828 124.639" fill="none" className="w-full h-full filter drop-shadow-[0_4px_20px_rgba(66,133,244,0.4)]">
                  <path d="m102.907 106.981-66.897 40.034c-9.6 5.83-22.009 2.773-27.716-6.83-5.708-9.601-2.552-22.112 7.048-27.942l66.897-40.034c9.6-5.83 22.009-2.773 27.716 6.83s2.552 22.112-7.048 27.942z" fill="#EA4335" />
                  <path d="m82.153 185.617-66.182-38.053c-9.742-5.4-13.214-17.764-7.754-27.614s17.784-13.457 27.527-8.057l66.182 38.054c9.743 5.4 13.214 17.763 7.754 27.613s-17.784 13.458-27.527 8.057z" fill="#4285F4" />
                </svg>
              </motion.div>

              {/* Green + Yellow Combined Floating Segment */}
              <motion.div
                animate={{ y: [0, 12, 0], x: [0, 5, 0] }}
                transition={{ duration: 4.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' as const }}
                className="absolute inset-0 w-full h-full p-8 sm:p-12"
              >
                <svg viewBox="2.586 66.379 250.828 124.639" fill="none" className="w-full h-full filter drop-shadow-[0_4px_20px_rgba(52,168,83,0.4)]">
                  <path d="m173.847 185.617 66.182-38.053c9.742-5.4 13.214-17.764 7.754-27.614s-17.784-13.457-27.527-8.057l-66.182 38.054c-9.743 5.4-13.214 17.763-7.754 27.613s17.784 13.458 27.527 8.057z" fill="#FBBC04" />
                  <path d="m153.093 106.981 66.897 40.034c9.6 5.83 22.009 2.773 27.716-6.83 5.708-9.601-2.552-22.112-7.048-27.942l-66.897-40.034c-9.6-5.83-22.009-2.773-27.716 6.83s-2.552 22.112 7.048 27.942z" fill="#0F9D58" />
                </svg>
              </motion.div>

              {/* Orbiting dot — blue */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' as const }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#4285F4] shadow-[0_0_10px_#4285F4]" />
              </motion.div>

              {/* Orbiting dot — green */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' as const }}
                className="absolute inset-[20px]"
              >
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#34A853] shadow-[0_0_8px_#34A853]" />
              </motion.div>

              {/* Orbiting dot — yellow */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, delay: 3, repeat: Infinity, ease: 'linear' as const }}
                className="absolute inset-[10px]"
              >
                <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-[#FBBC05] shadow-[0_0_8px_#FBBC05]" />
              </motion.div>

              {/* Pulsing dots */}
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute w-3 h-3 rounded-full bg-[#4285F4] top-[8%] right-[28%]" />
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, delay: 0.8, repeat: Infinity }}
                className="absolute w-2 h-2 rounded-full bg-[#34A853] bottom-[8%] left-[30%]" />
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.8, delay: 1.4, repeat: Infinity }}
                className="absolute w-3.5 h-3.5 rounded-full bg-[#FBBC05] top-[40%] left-[2%]" />
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3.2, delay: 2, repeat: Infinity }}
                className="absolute w-2.5 h-2.5 rounded-full bg-[#EA4335] bottom-[30%] right-[2%]" />

              {/* Small floating squares */}
              <FloatShape yRange={[0, -12, 0]} xRange={[0, 6, 0]} dur={5} del={0.5}
                style={{ top: '6%', left: '15%', width: 12, height: 12, background: '#4285F4', borderRadius: '3px', opacity: 0.4, transform: 'rotate(20deg)' }} />
              <FloatShape yRange={[0, 10, 0]} xRange={[0, -5, 0]} dur={4.5} del={1.5}
                style={{ bottom: '6%', right: '20%', width: 10, height: 10, background: '#EA4335', borderRadius: '3px', opacity: 0.38, transform: 'rotate(45deg)' }} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-10 text-[#5F6B7A]"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8ECF0] bg-white shadow-sm">
          <ArrowDown className="h-4 w-4 text-[#4285F4]" />
        </motion.div>
        <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
      </motion.div>

      {/* Animated GDG Wave Transition Area (220–280px tall) */}
      <GDGWaveStrip />

    </section>
  );
};
