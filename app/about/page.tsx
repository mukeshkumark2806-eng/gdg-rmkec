import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerText } from '@/components/animations/StaggerText';
import { siteConfig } from '@/data/site';
import { Globe, Users, Code, Sparkles, Target, Rocket, Award, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Google Developer Group at RMK Engineering College, our mission, core values, and community leads.',
};

const pillars = [
  {
    icon: <Users className="h-6 w-6 text-blue-400" />,
    title: 'Connect',
    description: 'Bridge the gap between academic theory and real-world technology by meeting fellow student developers and industry mentors.',
    color: 'blue' as const,
  },
  {
    icon: <Globe className="h-6 w-6 text-red-400" />,
    title: 'Learn',
    description: 'Master cutting-edge tech stacks from Google Cloud and GenAI to Android Compose and Next.js through hands-on workshops.',
    color: 'red' as const,
  },
  {
    icon: <Code className="h-6 w-6 text-amber-400" />,
    title: 'Build',
    description: 'Collaborate in teams to create impactful open-source products solving real problems for local businesses and campus communities.',
    color: 'yellow' as const,
  },
  {
    icon: <Rocket className="h-6 w-6 text-green-400" />,
    title: 'Grow',
    description: 'Elevate career potential with Google Cloud credentials, hackathon accolades, public speaking opportunities, and leadership roles.',
    color: 'green' as const,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="pointer-events-none absolute top-40 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-96 right-1/4 h-[350px] w-[350px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="blue" className="mb-4">
            Our Mission & Identity
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Pioneering Innovation @ <br />
            <span className="text-gradient-google">RMK Engineering College</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
            Google Developer Group (GDG) RMKEC is a university-based community for students passionate about Google developer technologies and modern software engineering.
          </p>
        </div>

        {/* 4 Pillars Grid - Black Boxes */}
        <div className="mb-24">
          <SectionHeader
            badgeText="Core Philosophy"
            badgeVariant="yellow"
            title="Built on Four Pillars of"
            highlightText="Excellence"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <FadeIn key={pillar.title} delay={idx * 0.1}>
                <div className="h-full rounded-2xl border border-white/15 bg-black text-white p-6 backdrop-blur-xl hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(66,133,244,0.25)] transition-all duration-300 group shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-white/15 group-hover:scale-110 transition-transform mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed">{pillar.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Chapter Story Section - Black Box with White Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 rounded-3xl border border-white/15 bg-black text-white p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
          <FadeIn direction="right">
            <div>
              <Badge variant="red" className="mb-3">
                Established 2022
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                From Campus Club to <br />
                <span className="text-gradient-google">Developer Ecosystem</span>
              </h2>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed">
                Founded with a mission to bridge academia and global tech trends, GDG RMKEC has evolved into one of Tamil Nadu's premier university developer chapters.
              </p>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                We empower students across all branches—from First Year coders to Final Year researchers—by providing hands-on mentorship, Google Cloud lab credits, and hackathon incubation.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/15 bg-zinc-950 p-6 text-center shadow-lg hover:border-blue-500/40 transition-colors">
                <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white block">100%</span>
                <span className="text-xs text-slate-300 font-medium">Practical Hands-on Jams</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-zinc-950 p-6 text-center shadow-lg hover:border-amber-500/40 transition-colors">
                <Award className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white block">15+</span>
                <span className="text-xs text-slate-300 font-medium">National Podium Wins</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-zinc-950 p-6 text-center shadow-lg hover:border-red-500/40 transition-colors">
                <Sparkles className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white block">1,200+</span>
                <span className="text-xs text-slate-300 font-medium">Student Community</span>
              </div>
              <div className="rounded-2xl border border-white/15 bg-zinc-950 p-6 text-center shadow-lg hover:border-green-500/40 transition-colors">
                <ShieldCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <span className="text-2xl font-black text-white block">Zero</span>
                <span className="text-xs text-slate-300 font-medium">Fee Membership</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
