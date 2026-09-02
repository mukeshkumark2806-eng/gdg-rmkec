'use client';

import React from 'react';
import { Users, Trophy, BookOpen, Cloud, Code2, ShieldCheck, Sparkles } from 'lucide-react';

const impactStats = [
  {
    value: '650+',
    label: 'Hackathon Teams Participated',
    subtext: 'Across RMK Group of Institutions in HackNEXA',
    icon: <Users className="h-6 w-6 text-[#4285F4]" />,
    color: '#4285F4',
  },
  {
    value: '250+',
    label: 'Teams Qualified for Evaluation',
    subtext: 'Selected for live jury and prototype reviews',
    icon: <Trophy className="h-6 w-6 text-[#EA4335]" />,
    color: '#EA4335',
  },
  {
    value: '100+',
    label: 'Study Jam Participants',
    subtext: 'Hands-on technical lab learners',
    icon: <BookOpen className="h-6 w-6 text-[#FBBC05]" />,
    color: '#FBBC05',
  },
  {
    value: '40+',
    label: 'Google Cloud Completers',
    subtext: 'Official milestone certified students',
    icon: <Cloud className="h-6 w-6 text-[#34A853]" />,
    color: '#34A853',
  },
  {
    value: 'Multiple',
    label: 'Student-Led Projects',
    subtext: 'Solving transport & administrative challenges',
    icon: <Code2 className="h-6 w-6 text-[#4285F4]" />,
    color: '#4285F4',
  },
  {
    value: 'Dedicated',
    label: 'Technical & Community Teams',
    subtext: '5 Specialized Tech Wings & 5 Core Teams',
    icon: <ShieldCheck className="h-6 w-6 text-[#FBBC05]" />,
    color: '#FBBC05',
  },
];

export const ImpactSnapshotSection: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-8 text-paper overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBBC05] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Real Metrics & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Community Impact Snapshot
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            A track record of technical excellence, massive student participation, and institutional
            problem solving since September 2025.
          </p>
        </div>

        {/* 6 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactStats.map((stat, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/15 bg-[#121216]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:-translate-y-1 hover:bg-[#121216]"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl bg-black border border-white/10">{stat.icon}</div>
                <span
                  className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{stat.label}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
