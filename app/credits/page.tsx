import React from 'react';
import { Metadata } from 'next';
import { Sparkles, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { websiteCreators, websiteTechStack } from '@/data/creators';

export const metadata: Metadata = {
  title: 'Website Credits & Creators | GDG on Campus RMKEC',
  description:
    'Meet the student developers and architects behind the official Google Developer Group on Campus RMKEC platform.',
};

export default function CreditsPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(66,133,244,0.3) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Platform Builders &amp; Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Behind the Code
          </h1>

          <p className="mt-5 text-base sm:text-xl text-white/85 leading-relaxed font-medium">
            Built from scratch by student developers at R.M.K. Engineering College using
            Next.js 16, React 19, and Google Material Design guidelines.
          </p>

          {/* Quick Technology Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {websiteTechStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs font-mono"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tech.color }} />
                <span className="text-white font-semibold">{tech.name}</span>
                <span className="text-white/40 hidden sm:inline">· {tech.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Creators Grid (2 Developers Centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {websiteCreators.map((creator) => (
            <div
              key={creator.id}
              className="group relative rounded-3xl border border-white/15 bg-[#121216]/85 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/35 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              <div>
                {/* Avatar / Photo */}
                <div className="relative mb-6">
                  <div className="relative h-32 w-32 mx-auto rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl bg-black flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {creator.avatarUrl ? (
                      <img
                        src={encodeURI(creator.avatarUrl)}
                        alt={creator.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-bold text-3xl text-white bg-gradient-to-br from-[#4285F4] to-[#34A853]">
                        {creator.name
                          .split(' ')
                          .filter(Boolean)
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Name & Titles */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{creator.name}</h3>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#4285F4] font-semibold block mt-1">
                    {creator.role}
                  </span>
                  {creator.subRole && (
                    <span className="text-xs text-white/60 block mt-0.5">{creator.subRole}</span>
                  )}
                  {creator.department && (
                    <span className="text-[11px] font-mono text-white/40 block mt-1">
                      {creator.department}
                    </span>
                  )}
                </div>

                {/* Key Contributions */}
                <div className="border-t border-white/10 pt-5 space-y-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 font-semibold block mb-2">
                    Key Contributions
                  </span>
                  {creator.contributions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/75">
                      <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links Bottom Bar */}
              <div className="border-t border-white/10 pt-5 mt-6 flex items-center justify-center gap-3">
                {creator.socials.github && (
                  <a
                    href={creator.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/06 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer"
                    aria-label={`${creator.name} GitHub`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {creator.socials.linkedin && (
                  <a
                    href={creator.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] hover:text-white hover:bg-[#4285F4] transition-all cursor-pointer"
                    aria-label={`${creator.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
