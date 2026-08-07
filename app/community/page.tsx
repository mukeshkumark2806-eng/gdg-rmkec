import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Sparkles, Code, Cpu, Cloud, Smartphone, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community Tracks & Perks',
  description: 'Explore the domain tracks, student developer perks, and learning opportunities at GDG RMKEC.',
};

const perks = [
  'Google Cloud Qwiklabs Credits & Skill Badges',
  'Exclusive GenAI & Gemini 1.5 API Access',
  '1-on-1 Mentorship from Senior Engineers & Alumni',
  'Priority Registration for Google Solution Challenge',
  'Hands-on Hackathon Incubators & Seed Guidance',
  'Certificates of Recognition Verified by GDG Leads',
];

export default function CommunityPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="green" className="mb-4">
            Developer Ecosystem
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Our Student <span className="text-gradient-google">Community</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Discover domain tracks, student perks, and collaborative build environments designed to accelerate tech careers.
          </p>
        </div>

        {/* Member Perks Box - Black Box */}
        <div className="mb-20 rounded-3xl border border-white/15 bg-black text-white p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
            Member Perks & <span className="text-gradient-google">Benefits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-start gap-3 rounded-xl bg-zinc-950 p-4 border border-white/15 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(52,168,83,0.2)] transition-all duration-300"
              >
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white font-semibold">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/join">
            <MagneticButton variant="google" size="lg">
              <span>Join GDG Community Now</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
