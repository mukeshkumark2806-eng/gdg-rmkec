'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Smartphone, BrainCircuit, Cloud, Palette, ChevronRight } from 'lucide-react';

const domains = [
  {
    id: 'web',
    title: 'Web Development',
    tagline: 'Next.js · React · TypeScript',
    icon: <Globe className="h-5 w-5" />,
    accent: '#4285F4',
    chipText: 'Web Squad',
    chipClass: 'chip-blue',
    description: 'Master modern frontend architecture with React 19, Next.js App Router, TypeScript, and serverless edge APIs that scale globally.',
    skills: ['Next.js', 'React 19', 'TypeScript', 'GraphQL', 'Tailwind'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    tagline: 'Gemini · PyTorch · LangChain',
    icon: <BrainCircuit className="h-5 w-5" />,
    accent: '#EA4335',
    chipText: 'GenAI Guild',
    chipClass: 'chip-red',
    description: 'Harness multimodal Google Gemini AI models, build RAG pipelines, train PyTorch neural networks, and deploy on Vertex AI.',
    skills: ['Gemini API', 'PyTorch', 'LangChain', 'TensorFlow', 'Vertex AI'],
  },
  {
    id: 'android',
    title: 'Android & Mobile',
    tagline: 'Kotlin · Compose · KMP',
    icon: <Smartphone className="h-5 w-5" />,
    accent: '#34A853',
    chipText: 'Android Unit',
    chipClass: 'chip-green',
    description: 'Build beautiful native Android apps with Kotlin, Jetpack Compose, Material 3, and scale cross-platform with Kotlin Multiplatform.',
    skills: ['Kotlin', 'Jetpack Compose', 'KMP', 'Firebase', 'Material 3'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    tagline: 'GCP · Docker · Kubernetes',
    icon: <Cloud className="h-5 w-5" />,
    accent: '#4285F4',
    chipText: 'Cloud Ops',
    chipClass: 'chip-blue',
    description: 'Architect scalable systems on Google Cloud Platform. Container orchestration with Kubernetes, IaC with Terraform, CI/CD pipelines.',
    skills: ['GCP', 'Docker', 'Kubernetes', 'Cloud Run', 'Terraform'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Design',
    tagline: 'Figma · Material You · Systems',
    icon: <Palette className="h-5 w-5" />,
    accent: '#FBBC05',
    chipText: 'Creative Lab',
    chipClass: 'chip-yellow',
    description: 'Craft world-class user experiences using Material Design 3, build scalable design systems in Figma, and define micro-interaction specs.',
    skills: ['Figma', 'Material You', 'Prototyping', 'Design Systems', 'Motion'],
  },
];

export const DomainsSection: React.FC = () => {
  return (
    <section className="relative bg-[#F5F7FA] py-28 overflow-hidden">

      {/* ── Large blobs ── */}
      <div className="blob" style={{ width: 500, height: 400, background: 'radial-gradient(ellipse, #34A853 0%, #4285F4 70%, transparent 100%)', top: '-80px', right: '5%', opacity: 0.08, animationDelay: '1s' }} />
      <div className="blob" style={{ width: 400, height: 320, background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 60%, transparent 100%)', bottom: '0px', left: '-80px', opacity: 0.07, animationDelay: '6s' }} />
      <div className="blob" style={{ width: 300, height: 250, background: 'radial-gradient(ellipse, #4285F4 0%, transparent 70%)', top: '50%', left: '50%', opacity: 0.05, animationDelay: '10s' }} />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* ── Rotating rings ── */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' as const }}
        className="absolute pointer-events-none"
        style={{ top: '-10%', right: '-5%', width: 350, height: 350, borderRadius: '50%', border: '1.5px dashed rgba(66,133,244,0.12)' }} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 65, repeat: Infinity, ease: 'linear' as const }}
        className="absolute pointer-events-none"
        style={{ bottom: '-8%', left: '-3%', width: 280, height: 280, borderRadius: '50%', border: '1.5px dashed rgba(52,168,83,0.12)' }} />

      {/* ── Static rings ── */}
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '8%', width: 100, height: 100, borderRadius: '50%', border: '1px solid rgba(251,188,5,0.15)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '15%', right: '12%', width: 70, height: 70, borderRadius: '50%', border: '1px solid rgba(234,67,53,0.15)' }} />

      {/* ── Floating colored dots ── */}
      {[
        { top: '8%', left: '3%', color: '#4285F4', w: 10 },
        { top: '18%', left: '7%', color: '#34A853', w: 7 },
        { top: '30%', left: '2%', color: '#FBBC05', w: 9 },
        { top: '55%', left: '5%', color: '#EA4335', w: 7 },
        { top: '70%', left: '3%', color: '#4285F4', w: 11 },
        { top: '12%', right: '4%', color: '#EA4335', w: 8 },
        { top: '28%', right: '2%', color: '#FBBC05', w: 10 },
        { top: '50%', right: '5%', color: '#34A853', w: 7 },
        { top: '68%', right: '3%', color: '#4285F4', w: 9 },
        { bottom: '8%', right: '8%', color: '#EA4335', w: 8 },
      ].map((d, i) => (
        <motion.div key={i}
          animate={{ y: [0, i%2===0 ? -10 : 10, 0], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 3.5+i*0.4, delay: i*0.3, repeat: Infinity }}
          className="absolute pointer-events-none rounded-full"
          style={{ top: d.top, left: (d as any).left, right: (d as any).right, bottom: (d as any).bottom, width: d.w, height: d.w, background: d.color }}
        />
      ))}

      {/* ── Floating squares/diamonds ── */}
      {[
        { top: '5%', left: '20%', color: '#4285F4', rot: 30 },
        { top: '85%', left: '25%', color: '#34A853', rot: 20 },
        { top: '10%', right: '25%', color: '#EA4335', rot: 45 },
        { bottom: '10%', right: '22%', color: '#FBBC05', rot: 15 },
      ].map((d, i) => (
        <motion.div key={`sq${i}`}
          animate={{ y: [0, i%2===0 ? -12 : 12, 0], rotate: [d.rot, d.rot+10, d.rot] }}
          transition={{ duration: 4.5+i*0.6, delay: i*0.7, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute pointer-events-none"
          style={{ top: d.top, left: (d as any).left, right: (d as any).right, bottom: (d as any).bottom, width: 13, height: 13, background: d.color, borderRadius: '3px', opacity: 0.28, transform: `rotate(${d.rot}deg)` }}
        />
      ))}

      {/* ── Cross / plus decorations ── */}
      {[
        { top: '40%', left: '1%', color: '#4285F4' },
        { top: '60%', right: '2%', color: '#34A853' },
        { top: '25%', left: '48%', color: '#EA4335', small: true },
      ].map((d, i) => (
        <div key={`cross${i}`} className="absolute pointer-events-none" style={{ top: d.top, left: (d as any).left, right: (d as any).right, opacity: 0.15 }}>
          <svg width={(d as any).small ? 14 : 20} height={(d as any).small ? 14 : 20} viewBox="0 0 20 20" fill="none">
            <path d="M10 2v16M2 10h16" stroke={d.color} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {/* ── Horizontal accent lines ── */}
      <div className="absolute pointer-events-none" style={{ top: '42%', left: 0, width: 70, height: 2, background: 'linear-gradient(90deg, transparent, rgba(66,133,244,0.3))' }} />
      <div className="absolute pointer-events-none" style={{ top: '62%', right: 0, width: 70, height: 2, background: 'linear-gradient(270deg, transparent, rgba(52,168,83,0.3))' }} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8">

        {/* ── Asymmetric header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="chip chip-blue mb-4 inline-flex">Technology Tracks</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="heading-section text-[#1A1A2E]" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
              Master the Next Generation
              <br />of{' '}<span className="text-gradient-google">Tech Domains</span>
            </motion.h2>

            {/* GDG color bar under header */}
            <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex mt-4 h-1 w-32 rounded-full overflow-hidden" style={{ transformOrigin: 'left' }}>
              <div className="flex-1 bg-[#4285F4]" />
              <div className="flex-1 bg-[#EA4335]" />
              <div className="flex-1 bg-[#FBBC05]" />
              <div className="flex-1 bg-[#34A853]" />
            </motion.div>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-[#5F6B7A] max-w-sm lg:text-right" style={{ lineHeight: '1.75', fontSize: '15px' }}>
            Join domain squads led by expert student mentors. Build real projects, earn credentials, and ship open-source software.
          </motion.p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              className="card-light group flex flex-col p-6 gap-5 relative overflow-hidden"
              style={{ borderLeft: `3px solid ${d.accent}` }}
            >
              {/* Card background corner shape */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at 100% 0%, ${d.accent}0A 0%, transparent 70%)` }} />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full pointer-events-none"
                style={{ border: `1px dashed ${d.accent}22` }} />

              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: `${d.accent}14`, color: d.accent }}>
                  {d.icon}
                </div>
                <span className={`chip ${d.chipClass} text-[11px]`}>{d.chipText}</span>
              </div>

              {/* Title + tagline */}
              <div>
                <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#4285F4] transition-colors duration-250"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', color: d.accent === '#4285F4' ? undefined : d.accent }}>
                  {d.title}
                </h3>
                <p className="text-xs text-[#5F6B7A] mt-0.5 font-medium">{d.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-[13.5px] text-[#5F6B7A] leading-relaxed flex-1">{d.description}</p>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-1.5">
                {d.skills.map((s) => (
                  <span key={s} className="chip chip-neutral text-[11px] font-mono">{s}</span>
                ))}
              </div>

              {/* Footer link */}
              <div className="pt-4 border-t border-[#E8ECF0] flex items-center justify-between">
                <Link href="/community"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
                  style={{ color: d.accent }}>
                  Explore Track
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                {/* mini dot decoration */}
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.accent, opacity: 0.5 }} />
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.accent, opacity: 0.3 }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative row */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center gap-3 mt-14">
          {['#4285F4','#EA4335','#FBBC05','#34A853'].map((c) => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.55 }} />
          ))}
        </motion.div>

      </div>

      {/* Wave divider: light → dark */}
      <div className="relative mt-24 -mb-px">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,20 C360,80 1080,0 1440,60 L1440,80 L0,80 Z" fill="#0D1117" />
        </svg>
      </div>

    </section>
  );
};
