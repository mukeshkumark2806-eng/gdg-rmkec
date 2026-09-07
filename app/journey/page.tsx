import React from 'react';
import { Metadata } from 'next';
import { Sparkles, History, Clock, Compass, CheckCircle2, Rocket } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

export const metadata: Metadata = {
  title: 'Our Journey | GDG on Campus RMKEC',
  description: 'Explore the past, present, and future roadmap of GDG on Campus RMKEC.',
};

const futureRoadmap = [
  'More campus-wide initiatives & technical bootcamps',
  'Larger hackathons connecting regional student innovators',
  'Deep industry collaborations & Google mentor sessions',
  'Open-source contributions across university repositories',
  'AI-driven campus solutions and student tooling',
  'Scalable products for students, faculty, and administration',
];

export default function JourneyPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBBC05] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Chapter Timeline & Vision</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Our Journey
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            From our founding in September 2025 to our active present and ambitious future roadmap.
          </p>
        </div>

        {/* 3 Main Stages: Past, Present, Future */}
        <div className="space-y-8">
          {/* 1. The Past */}
          <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-black border border-white/10 text-[#4285F4]">
                <History className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold">
                  Inception · September 2025
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">The Past</h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Our journey began with a shared passion for technology and community building. Founded
              in September 2025 at R.M.K. Engineering College, passionate student leaders and faculty
              advisors united to build an open, collaborative home for developers.
            </p>
          </div>

          {/* 2. The Present */}
          <div className="rounded-3xl border border-white/15 bg-black p-8 sm:p-10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#121216] border border-white/10 text-[#34A853]">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#34A853] font-semibold">
                  Active Community
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">The Present</h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
              An active community conducting events, building projects, and nurturing future leaders.
              With landmark achievements including the <strong>Google Cloud Campaign Study Jam</strong> (100+
              learners, 40 completers), the flagship <strong>HackNEXA&apos;26 Hackathon</strong> (650+ Hackathon Teams
              Participated), and ongoing development of the <strong>Real-Time College Bus Tracking System</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                650+ Hackathon Teams Participated
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                40+ Cloud Completers
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                5 Technical Wings
              </span>
            </div>
          </div>

          {/* 3. The Future */}
          <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-black border border-white/10 text-[#FBBC05]">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold">
                  Upcoming Horizons
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">The Future</h2>
              </div>
            </div>

            <p className="text-sm text-white/70 mb-6">
              Expanding our reach, tooling, and ecosystem impact across the institution:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {futureRoadmap.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-black/60 border border-white/10"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#FBBC05] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <GlowButton href="/join" shape="pill" size="md">
                Shape the Future with Us →
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
