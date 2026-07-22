import React from 'react';
import { Metadata } from 'next';
import { teamData } from '@/data/team';
import { Badge } from '@/components/ui/Badge';
import { Github, Linkedin, Twitter, Globe, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Family Wall & Team',
  description: 'Meet the faculty advisors, core chapter leads, domain heads, and alumni of GDG RMKEC.',
};

export default function FamilyPage() {
  const leads = teamData.filter((t) => t.domain !== 'Alumni');
  const alumni = teamData.filter((t) => t.domain === 'Alumni');

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="blue" className="mb-4">
            People Behind GDG RMKEC
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Our <span className="text-gradient-google">Family Wall</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Meet the faculty advisors, student chapter leads, domain heads, and alumni building the GDG RMKEC chapter.
          </p>
        </div>

        {/* Core Team & Leads */}
        <div className="mb-24">
          <h2 className="text-2xl font-extrabold text-white mb-8 border-b border-white/10 pb-4">
            Faculty Advisors & Core Leads
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leads.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300"
              >
                <div>
                  <div className="relative mb-6 overflow-hidden rounded-xl aspect-square border border-white/10">
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
                  <p className="text-xs text-slate-300 leading-relaxed mt-3">{member.bio}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
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
                      className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
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
                      className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
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

        {/* Alumni Network */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-8 border-b border-white/10 pb-4">
            Alumni Wall
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-14 w-14 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <p className="text-xs text-yellow-400 font-semibold">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
