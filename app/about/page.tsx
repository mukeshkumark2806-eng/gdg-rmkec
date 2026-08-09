import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerText } from '@/components/animations/StaggerText';
import { siteConfig } from '@/data/site';
import { Globe, Users, Code, Sparkles, Target, Rocket, Award, ShieldCheck } from 'lucide-react';
import { SparklesText } from '@/registry/magicui/sparkles-text';

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
    <div className="pt-32 pb-24 relative overflow-hidden bg-[#F5F7FA]">
      {/* Background Blobs like Home Page */}
      <div className="blob" style={{ width: 700, height: 600, background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 55%, transparent 100%)', top: -200, right: -150, opacity: 0.13 }} />
      <div className="blob" style={{ width: 500, height: 400, background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 55%, transparent 100%)', bottom: 40, left: -120, opacity: 0.09, animationDelay: '4s' }} />
      <div className="blob" style={{ width: 600, height: 400, background: 'radial-gradient(ellipse, #4285F4 0%, transparent 70%)', top: '30%', left: '25%', opacity: 0.05, animationDelay: '8s' }} />

      {/* Dot Grid Texture like Home Page */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="blue" className="mb-4">
            Our Mission & Identity
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Pioneering Innovation @ <br />
            <SparklesText sparklesCount={24} className="text-gradient-google">RMK Engineering College</SparklesText>
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
                <span className="text-gradient-google">Premier Tech Chapter</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                Founded with a mission to bridge academia and global industry benchmarks, GDG RMKEC has grown from a handful of enthusiastic developers to one of Tamil Nadu's most active student developer communities.
              </p>
              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                We organize hands-on hackathons, technical workshops, study jams, open-source sprints, and peer-to-peer code reviews — empowering students to turn creative concepts into production-grade software.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/15">
                  <div className="text-2xl font-black text-blue-400">1,200+</div>
                  <div className="text-xs text-slate-300 mt-0.5">Students Trained</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/15">
                  <div className="text-2xl font-black text-green-400">25+</div>
                  <div className="text-xs text-slate-300 mt-0.5">Workshops & Events</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-video bg-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="GDG RMKEC Community Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs text-slate-200 font-medium">
                  Annual GDG Hackfest &amp; Cloud Workshop Series at RMKEC Campus
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
