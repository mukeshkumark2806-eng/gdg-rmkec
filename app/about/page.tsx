import React from 'react';
import { Metadata } from 'next';
import { GlowButton } from '@/components/ui/GlowButton';
import { BookOpen, Hammer, Users2, Trophy, Target, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | GDG on Campus RMKEC',
  description:
    'Learn about GDG on Campus RMKEC, our founding story from September 2025, mission, vision, and core pillars.',
};

const pillars = [
  {
    icon: <BookOpen className="h-6 w-6 text-[#4285F4]" />,
    title: 'Learn',
    description: 'Conduct workshops, study jams, and hands-on technical sessions across emerging tech domains.',
    color: '#4285F4',
  },
  {
    icon: <Hammer className="h-6 w-6 text-[#EA4335]" />,
    title: 'Build',
    description: 'Develop impactful software and IoT solutions for students, faculty, and college administration.',
    color: '#EA4335',
  },
  {
    icon: <Users2 className="h-6 w-6 text-[#FBBC05]" />,
    title: 'Collaborate',
    description: 'Bring together students from different engineering disciplines to solve real-world problems.',
    color: '#FBBC05',
  },
  {
    icon: <Trophy className="h-6 w-6 text-[#34A853]" />,
    title: 'Lead',
    description: 'Create opportunities for leadership, stage presentation, and personal career growth.',
    color: '#34A853',
  },
];

const missionPoints = [
  'Promote technical learning and innovation',
  'Build solutions for the college ecosystem',
  'Encourage collaboration and knowledge sharing',
  'Provide industry-relevant exposure',
  'Develop future technology leaders',
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Who We Are</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            About GDG on Campus <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
              RMKEC
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-white/90 leading-relaxed font-medium">
            GDG on Campus RMKEC is a student-driven technology community focused on fostering
            innovation, technical excellence, and collaborative learning.
          </p>
        </div>

        {/* Our Story Box */}
        <div className="mb-20 rounded-3xl border border-white/15 bg-black p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FBBC05] mb-3 font-semibold">
            <span>Established September 2025</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            The community was established in <strong>September 2025</strong>, with a vision of
            bringing together passionate students interested in technology, innovation, and
            problem-solving. Over time, GDG on Campus RMKEC has evolved into a platform where students
            not only learn cutting-edge technologies but also contribute to impactful projects and
            large-scale events like HackNEXA&apos;26 and Google Cloud Study Jams.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-8 sm:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-black border border-white/10 text-[#4285F4]">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {missionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-black border border-white/10 text-[#FBBC05]">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                To become a leading student technology community recognized for innovation, technical
                excellence, and meaningful impact across the college ecosystem and beyond.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <GlowButton href="/family" shape="pill" size="md">
                Meet the Core Team & Leads →
              </GlowButton>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (What We Do) */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#EA4335] font-semibold block mb-1">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Four Pillars of Action</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="h-full rounded-3xl border border-white/15 bg-[#121216]/80 p-7 backdrop-blur-xl hover:border-white/30 hover:-translate-y-1 transition-all duration-300 group shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black border border-white/15 group-hover:scale-110 transition-transform mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
