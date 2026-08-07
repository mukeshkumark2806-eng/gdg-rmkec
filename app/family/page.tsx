'use client';

import React, { useEffect } from 'react';
import { teamData } from '@/data/team';
import { Badge } from '@/components/ui/Badge';
import { Github, Linkedin, Twitter, Globe, Sparkles } from 'lucide-react';

export default function FamilyPage() {
  const leads = teamData.filter((t) => t.domain !== 'Alumni');
  const alumni = teamData.filter((t) => t.domain === 'Alumni');

  useEffect(() => {
    // Load dotlottie-wc web component script if not already present
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Top Left DotLottie Animation below Navbar */}
      <div className="absolute top-20 left-2 sm:left-6 md:left-12 z-0 pointer-events-none opacity-85 lg:opacity-100">
        <dotlottie-wc
          src="https://lottie.host/e06e6375-0cd0-456c-83da-f71380ba0f37/oiab0MZhHC.lottie"
          style={{ width: '360px', height: '360px' }}
          autoplay
          loop
        />
      </div>

      {/* Top Right DotLottie Animation below Navbar */}
      <div className="absolute top-20 right-2 sm:right-6 md:right-12 z-0 pointer-events-none opacity-85 lg:opacity-100">
        <dotlottie-wc
          src="https://lottie.host/08caeb60-a827-4280-aee6-603f19d00b3c/qNbz8leWyQ.lottie"
          style={{ width: '360px', height: '360px' }}
          autoplay
          loop
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="blue" className="mb-4">
            People Behind GDG RMKEC
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Our <span className="text-gradient-google">Family Wall</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Meet the faculty advisors, student chapter leads, domain heads, and alumni building the GDG RMKEC chapter.
          </p>
        </div>

        {/* Core Team & Leads - Black Grid Cards */}
        <div className="mb-24">
          <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-8 border-b border-slate-300 pb-4 flex items-center justify-between">
            <span>Faculty Advisors &amp; Core Leads</span>
            <span className="text-xs text-blue-600 font-mono font-bold bg-blue-100 px-3 py-1 rounded-full border border-blue-300">{leads.length} Members</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leads.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black text-white p-6 shadow-xl hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(66,133,244,0.25)] transition-all duration-300"
              >
                <div>
                  <div className="relative mb-6 overflow-hidden rounded-xl aspect-square border border-white/15">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="glass">{member.domain}</Badge>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{member.name}</h3>
                  <p className="text-xs font-semibold text-blue-400 mt-1">{member.role}</p>
                  <p className="text-xs text-slate-200 leading-relaxed mt-3">{member.bio}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-3">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-blue-400 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Section - Black Grid Cards */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-8 border-b border-slate-300 pb-4 flex items-center justify-between">
            <span>Alumni &amp; Past Leaders</span>
            <span className="text-xs text-emerald-600 font-mono font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">{alumni.length} Alumni</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black text-white p-6 shadow-xl hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(52,168,83,0.25)] transition-all duration-300"
              >
                <div>
                  <div className="relative mb-6 overflow-hidden rounded-xl aspect-square border border-white/15">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="glass">Alumni</Badge>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400 mt-1">{member.role}</p>
                  <p className="text-xs text-slate-200 leading-relaxed mt-3">{member.bio}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
