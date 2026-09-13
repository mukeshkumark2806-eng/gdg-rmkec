'use client';

import React from 'react';
import Link from 'next/link';
import { SignalDots } from '@/components/ui/SignalDots';
import { Calendar, Users, ArrowRight, FolderOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-8 text-paper select-none">
      {/* 4 Signal Dots */}
      <SignalDots size="md" />

      {/* 404 Label */}
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#EA4335] font-semibold">
        404 · Page Not Found
      </p>
      <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-white">
        This route took a wrong turn.
      </h1>
      <p className="mt-3 text-sm sm:text-base text-white/70 max-w-xl">
        The page you are looking for doesn&apos;t exist or might have been relocated. Here are the most helpful destinations to get you back on track.
      </p>

      {/* Divider */}
      <div className="mt-8 h-px w-full bg-white/10" aria-hidden="true" />

      {/* Primary Helpful Routes */}
      <h2 className="mt-8 text-base font-semibold tracking-tight text-white">
        Popular Chapter Destinations
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Explore Events */}
        <Link href="/events" className="block h-full group">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121216]/80 p-5 sm:p-6 h-full transition-all hover:border-white/25 hover:bg-[#121216]">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-[#4285F4]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#4285F4] font-semibold">
                Workshops &amp; Jams
              </span>
            </div>
            <span className="block text-lg font-bold text-white group-hover:text-[#4285F4] transition-colors">
              Explore Events &rarr;
            </span>
            <span className="mt-1 block text-xs text-white/70">
              Browse HackNEXA&apos;26 archives, Agentic AI jams, and upcoming chapter sessions.
            </span>
          </div>
        </Link>

        {/* Join Community */}
        <Link href="/join" className="block h-full group">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121216]/80 p-5 sm:p-6 h-full transition-all hover:border-white/25 hover:bg-[#121216]">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-[#34A853]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#34A853] font-semibold">
                Get Involved
              </span>
            </div>
            <span className="block text-lg font-bold text-white group-hover:text-[#34A853] transition-colors">
              Join GDG RMKEC &rarr;
            </span>
            <span className="mt-1 block text-xs text-white/70">
              Become an active member or student contributor across our 5 technical wings.
            </span>
          </div>
        </Link>
      </div>

      {/* Everywhere else on the site */}
      <h2 className="mt-10 font-mono text-xs uppercase tracking-widest text-white/50">
        All Other Chapter Pages
      </h2>

      <ul className="mt-3 flex flex-wrap gap-2">
        {[
          { label: 'Home', path: '/' },
          { label: 'About Us', path: '/about' },
          { label: 'Our Journey', path: '/journey' },
          { label: 'Events & Jams', path: '/events' },
          { label: 'Campus Projects', path: '/projects' },
          { label: 'Event Album', path: '/album' },
          { label: 'Family Wall', path: '/family' },
          { label: 'Join Us', path: '/join' },
          { label: 'Website Credits', path: '/credits' },
          { label: 'Contact', path: '/contact' },
        ].map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              <span className="text-white font-medium">{item.label}</span>
              <span className="font-mono text-[10px] text-white/40">{item.path}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Event Album Card */}
      <div className="mt-10 h-px w-full bg-white/10" aria-hidden="true" />

      <Link
        href="/album"
        className="group mt-8 block sm:flex sm:items-center sm:gap-6 rounded-2xl border border-white/10 bg-[#121216]/60 p-5 hover:border-white/25 transition-all"
      >
        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-black border border-white/15 text-[#FBBC05] shrink-0">
          <FolderOpen className="h-6 w-6" />
        </div>
        <div className="mt-3 sm:mt-0">
          <p className="font-bold text-white flex items-center gap-1.5">
            <span>Browse Event Album &amp; Campus Memories</span>
            <ArrowRight className="h-4 w-4 text-[#4285F4] group-hover:translate-x-1 transition-transform" />
          </p>
          <p className="mt-1 text-xs text-white/70 max-w-lg leading-relaxed">
            The archive is always online. Relive 100+ moments from HackNEXA&apos;26, Agentic AI, Google Cloud campaigns, and A.C.E Day.
          </p>
        </div>
      </Link>

      {/* Signoff */}
      <div className="mt-12 pt-6 border-t border-white/08">
        <p className="text-lg font-bold tracking-tight text-white">
          GDG on Campus RMKEC
        </p>
        <p className="mt-0.5 font-mono text-xs text-white/60">
          R.M.K. Engineering College · Established September 2025
        </p>
      </div>
    </div>
  );
}
