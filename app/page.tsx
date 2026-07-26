import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { DomainsSection } from '@/components/sections/DomainsSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Interactive Hero Experience */}
      <HeroSection />

      {/* 3. Live Impact Stats */}
      <StatsSection />

      {/* 3. Technology Tracks & Domains */}
      <DomainsSection />

      {/* 4. Featured Workshops & Projects */}
      <FeaturedSection />

      {/* 5. Community Join CTA Banner */}
      <section className="relative py-24 bg-gradient-to-b from-[#0B0F17] to-slate-950 overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 border border-blue-500/30 text-xs font-bold uppercase tracking-wider text-blue-400 mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Ready to innovate?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Take Your Developer Journey to the <br />
            <span className="text-gradient-google">Next Level</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Become part of GDG RMKEC today. Gain access to Google Cloud credits, GenAI mentorship, hackathon teams, and exclusive career opportunities.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/join">
              <MagneticButton variant="google" size="lg">
                <span>Join Chapter Now</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
