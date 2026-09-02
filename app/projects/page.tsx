'use client';

import React from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { Bus, MapPin, Radio, Compass, Shield, Clock, CheckCircle2, Sparkles, Code2 } from 'lucide-react';

const busObjectives = [
  {
    title: 'Real-time location visibility',
    desc: 'Live GPS telemetry streaming bus locations directly to student mobile phones and campus kiosks.',
    icon: <Radio className="h-5 w-5 text-[#4285F4]" />,
  },
  {
    title: 'Improved travel planning',
    desc: 'Accurate ETA calculations and route visualizations to eliminate waiting times during peak college hours.',
    icon: <Clock className="h-5 w-5 text-[#EA4335]" />,
  },
  {
    title: 'Better transportation management',
    desc: 'Centralized administrator dashboard for the transport department to oversee fleet operations and routes.',
    icon: <Compass className="h-5 w-5 text-[#FBBC05]" />,
  },
  {
    title: 'Enhanced user convenience',
    desc: 'Automated delay alerts, pickup point notifications, and unified access for students and faculty.',
    icon: <CheckCircle2 className="h-5 w-5 text-[#34A853]" />,
  },
];

const futurePlaceholders = [
  {
    title: 'Autonomous Campus AI Scheduler',
    desc: 'Agentic scheduling tool optimizing lab reservations, seminar slots, and student study groups.',
    tag: 'In Research',
  },
  {
    title: 'RMK Open Cloud Lab Platform',
    desc: 'Unified student sandbox for spinning up development containers and deploying open-source projects.',
    tag: 'Prototyping',
  },
  {
    title: 'Student Hackathon Judging Engine',
    desc: 'Real-time evaluation platform used to evaluate 650+ teams at HackNEXA with live leaderboard.',
    tag: 'Testing',
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Campus Innovation Labs</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Building Solutions for the Campus
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Student-engineered applications, real-time IoT systems, and infrastructure tools solving
            day-to-day challenges within the college ecosystem.
          </p>
        </div>

        {/* 1. Flagship Project: Real-Time College Bus Tracking System */}
        <div className="mb-20 rounded-3xl border border-white/15 bg-black p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="p-3 rounded-2xl bg-[#121216] border border-white/10 text-[#4285F4]">
                <Bus className="h-6 w-6" />
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold">
                  Flagship Campus Solution
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-white">
                  Real-Time College Bus Tracking System
                </h2>
              </div>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[#FBBC05]/20 text-[#FBBC05] border border-[#FBBC05]/40">
              Status: Ongoing Development
            </span>
          </div>

          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2 font-semibold">
              Overview
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              A transportation solution designed to provide real-time bus tracking for students,
              faculty members, and college administration. It eliminates transit uncertainties by
              combining on-vehicle GPS telemetry with real-time map interfaces and push alerts.
            </p>
          </div>

          {/* Objectives Grid */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6 font-semibold">
              Key Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {busObjectives.map((obj, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-[#121216] p-5 transition-all hover:border-white/25"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {obj.icon}
                    <h4 className="text-base font-bold text-white">{obj.title}</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {['GPS IoT Telemetry', 'Next.js 15', 'WebSockets', 'Node.js Backend', 'Google Maps API'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/06 border border-white/10 text-xs font-mono text-white/80"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
            <GlowButton href="/join" shape="pill" size="sm">
              Contribute to Tech Wings →
            </GlowButton>
          </div>
        </div>

        {/* 2. Future Projects Section */}
        <div>
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold block mb-1">
              Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Upcoming Community Innovations</h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70">
              Future projects currently in research, prototyping, and ideation phases across student
              wings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futurePlaceholders.map((p, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/15 bg-[#121216]/80 p-6 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 mb-3 inline-block">
                    {p.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/08 text-xs text-white/40 font-mono">
                  GDG RMKEC Technical Wings
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
