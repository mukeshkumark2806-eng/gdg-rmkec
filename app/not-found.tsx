'use client';

import React from 'react';
import Link from 'next/link';
import { SignalDots } from '@/components/ui/SignalDots';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-8 text-paper select-none">
      {/* 4 Signal Dots */}
      <SignalDots size="md" />

      {/* 404 Label */}
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-white/50">404</p>
      <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-white">
        Page not found.
      </h1>

      {/* Divider */}
      <div className="mt-10 h-px w-full bg-white/10" aria-hidden="true" />

      {/* What most people are looking for */}
      <h2 className="mt-8 text-lg font-semibold tracking-tight text-white">
        What most people are looking for
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Get Tickets */}
        <Link href="/tickets" className="block h-full group">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121216]/80 p-5 sm:p-6 h-full transition-all hover:border-white/25 hover:bg-[#121216]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#4285F4] font-semibold">
              Get in
            </span>
            <span className="mt-2 block text-lg font-bold text-white group-hover:text-[#4285F4] transition-colors">
              Get Tickets →
            </span>
            <span className="mt-1 block text-xs text-white/70">
              Book your place at DevFest RMKEC 2026.
            </span>
          </div>
        </Link>

        {/* Speak at DevFest */}
        <a
          href="https://devfest.gdgchennai.in/cfp"
          target="_blank"
          rel="noreferrer"
          className="block h-full group"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121216]/80 p-5 sm:p-6 h-full transition-all hover:border-white/25 hover:bg-[#121216]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#EA4335] font-semibold">
              Get on stage
            </span>
            <span className="mt-2 block text-lg font-bold text-white group-hover:text-[#EA4335] transition-colors">
              Speak at DevFest →
            </span>
            <span className="mt-1 block text-xs text-white/70">
              First-time speakers as welcome as conference regulars.
            </span>
          </div>
        </a>
      </div>

      {/* Everywhere else on the site */}
      <h2 className="mt-12 font-mono text-xs uppercase tracking-widest text-white/50">
        Everywhere else on the site
      </h2>

      <ul className="mt-3 flex flex-wrap gap-2">
        {[
          { label: 'Home', path: '/' },
          { label: 'Tickets', path: '/tickets' },
          { label: 'Memories', path: '/memories' },
          { label: 'Events', path: '/events' },
          { label: 'Projects', path: '/projects' },
          { label: 'About', path: '/about' },
          { label: 'Family', path: '/family' },
          { label: 'Volunteer', path: '/join' },
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

      {/* Archive Card */}
      <div className="mt-12 h-px w-full bg-white/10" aria-hidden="true" />

      <Link
        href="/memories"
        className="group mt-8 block sm:flex sm:items-center sm:gap-6 rounded-2xl border border-white/10 bg-[#121216]/60 p-4 hover:border-white/25 transition-all"
      >
        <div className="w-full sm:w-56 sm:shrink-0 aspect-[3/2] overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
            alt="Closing group photo"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="font-bold text-white">While you’re here</p>
          <p className="mt-1 text-xs text-white/70 max-w-md">
            The archive is the one part of this site that was never going to 404. Explore previous
            DevFest group photos and memories →
          </p>
        </div>
      </Link>

      {/* Signoff */}
      <p className="mt-14 text-xl font-bold tracking-tight text-white">
        Hope to see you at DevFest.
      </p>
      <p className="mt-1 font-mono text-xs text-white/60">
        Saturday, 17 October 2026 · RMK Engineering College
      </p>
    </div>
  );
}
