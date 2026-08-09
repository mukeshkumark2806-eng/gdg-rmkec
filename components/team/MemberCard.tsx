'use client';

import React from 'react';
import { TeamMember } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Linkedin, Mail, Github, Twitter, Globe } from 'lucide-react';

interface MemberCardProps {
  member: TeamMember;
  featured?: boolean;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const getBadgeVariant = (cat?: string) => {
    switch (cat) {
      case 'Faculty Coordinator':
        return 'blue';
      case 'Core Leads':
        return 'blue';
      case 'Technical Team':
        return 'green';
      case 'HR Team':
        return 'yellow';
      case 'Design Team':
        return 'red';
      case 'PR Team':
        return 'blue';
      case 'Event Management':
        return 'green';
      default:
        return 'glass';
    }
  };

  const badgeText = member.teamCategory || member.domain;
  const badgeVariant = getBadgeVariant(member.teamCategory);

  return (
    <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/15 bg-[#0D111A]/90 text-white p-4 shadow-lg backdrop-blur-xl hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(66,133,244,0.2)] transition-all duration-300">
      <div>
        {/* Compact Portrait Image */}
        <div className="relative mb-3 overflow-hidden rounded-xl aspect-[4/4.5] w-full border border-white/10 shadow-sm bg-zinc-900">
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 left-2.5">
            <Badge variant={badgeVariant} className="text-[10px] px-2 py-0.5 font-medium">{badgeText}</Badge>
          </div>
        </div>

        <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight leading-snug">{member.name}</h3>
        <p className="text-xs font-semibold text-blue-400 mt-0.5">{member.role}</p>
        {member.bio && (
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mt-2 line-clamp-2">{member.bio}</p>
        )}
      </div>

      {/* Footer Social Icons */}
      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2">
        {member.socials?.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-blue-600/80 rounded-lg border border-white/10 hover:border-blue-400 transition-all duration-200"
            aria-label="LinkedIn"
            title="LinkedIn Profile"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
        {member.socials?.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-red-600/80 rounded-lg border border-white/10 hover:border-red-400 transition-all duration-200"
            aria-label="Email"
            title="Send Email"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        )}
        {member.socials?.github && (
          <a
            href={member.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-zinc-800 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-200"
            aria-label="GitHub"
            title="GitHub Profile"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
        )}
        {member.socials?.twitter && (
          <a
            href={member.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200"
            aria-label="Twitter"
          >
            <Twitter className="h-3.5 w-3.5" />
          </a>
        )}
        {member.socials?.portfolio && (
          <a
            href={member.socials.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200"
            aria-label="Portfolio"
          >
            <Globe className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
