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
    <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/15 bg-[#0D111A]/90 text-white p-6 shadow-xl backdrop-blur-xl hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(66,133,244,0.25)] transition-all duration-300">
      <div>
        {/* Large Portrait Image (4:5 Aspect Ratio) */}
        <div className="relative mb-5 overflow-hidden rounded-xl aspect-[4/5] w-full border border-white/15 shadow-md">
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant}>{badgeText}</Badge>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{member.name}</h3>
        <p className="text-xs sm:text-sm font-semibold text-blue-400 mt-1">{member.role}</p>
        {member.bio && (
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 line-clamp-3">{member.bio}</p>
        )}
      </div>

      {/* Footer Social Icons */}
      <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-3">
        {member.socials?.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-slate-300 hover:text-white hover:bg-blue-600/80 rounded-lg border border-white/10 hover:border-blue-400 transition-all duration-200"
            aria-label="LinkedIn"
            title="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        {member.socials?.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-red-600/80 rounded-lg border border-white/10 hover:border-red-400 transition-all duration-200"
            aria-label="Email"
            title="Send Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        )}
        {member.socials?.github && (
          <a
            href={member.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-slate-300 hover:text-white hover:bg-zinc-800 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-200"
            aria-label="GitHub"
            title="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
        {member.socials?.twitter && (
          <a
            href={member.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-slate-300 hover:text-cyan-400 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        )}
        {member.socials?.portfolio && (
          <a
            href={member.socials.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200"
            aria-label="Portfolio"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};
