import React from 'react';
import { Metadata } from 'next';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  Sparkles,
  Users,
  Code2,
  Cpu,
  Brain,
  Server,
  Shield,
  Palette,
  Megaphone,
  UserCheck,
  CalendarCheck,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Structure | GDG on Campus RMKEC',
  description:
    'Explore the organizational framework of GDG on Campus RMKEC: Core Teams and specialized Technical Wings.',
};

const coreTeams = [
  {
    name: 'Tech Team',
    role: 'Technical Architecture & Codebases',
    desc: 'Architects scalable campus software, manages GitHub repositories, reviews code, and leads hands-on workshop labs.',
    icon: <Code2 className="h-5 w-5 text-[#4285F4]" />,
  },
  {
    name: 'PR Team (Public Relations)',
    role: 'Outreach & Campus Communications',
    desc: 'Drives community awareness, handles external chapter collaborations, social media broadcasts, and attendee relations.',
    icon: <Megaphone className="h-5 w-5 text-[#EA4335]" />,
  },
  {
    name: 'HR Team (Human Resources)',
    role: 'Member Engagement & Culture',
    desc: 'Manages member onboarding, internal team coordination, feedback loops, and leadership growth initiatives.',
    icon: <UserCheck className="h-5 w-5 text-[#FBBC05]" />,
  },
  {
    name: 'Event Management Team',
    role: 'Operations & Event Logistics',
    desc: 'Newly formed powerhouse responsible for curating, organizing, and executing large-scale hackathons and study jams.',
    icon: <CalendarCheck className="h-5 w-5 text-[#34A853]" />,
  },
  {
    name: 'Design Team',
    role: 'UI/UX & Brand Identity',
    desc: 'Crafts visual assets, marketing graphics, presentations, and modern accessible user interfaces adhering to Google guidelines.',
    icon: <Palette className="h-5 w-5 text-[#4285F4]" />,
  },
];

const techWings = [
  {
    name: 'AI + Electronics Wing',
    tech: 'IoT, Microcontrollers, Edge AI, Embedded Systems',
    desc: 'Bridges hardware and intelligent software, building IoT prototypes like campus GPS trackers and sensor integrations.',
    icon: <Cpu className="h-5 w-5 text-[#4285F4]" />,
    color: '#4285F4',
  },
  {
    name: 'AI/ML Wing',
    tech: 'Gemini 2.5, Agentic AI, PyTorch, RAG Pipelines',
    desc: 'Focuses on deep learning, multimodal reasoning, AI agents, and Google Solution Challenge machine learning architectures.',
    icon: <Brain className="h-5 w-5 text-[#EA4335]" />,
    color: '#EA4335',
  },
  {
    name: 'Backend Wing',
    tech: 'Node.js, Python FastAPI, WebSockets, Databases, Cloud Run',
    desc: 'Engineers robust server architectures, real-time data streaming engines, and scalable microservice backends.',
    icon: <Server className="h-5 w-5 text-[#FBBC05]" />,
    color: '#FBBC05',
  },
  {
    name: 'Cybersecurity Wing',
    tech: 'Vulnerability Analysis, OWASP, CTF, Network Security',
    desc: 'Focuses on application security, defensive engineering, capture-the-flag competitions, and safe deployment practices.',
    icon: <Shield className="h-5 w-5 text-[#34A853]" />,
    color: '#34A853',
  },
  {
    name: 'UI/UX Wing',
    tech: 'Figma, Material Design 3, Design Tokens, Prototyping',
    desc: 'Designs intuitive digital journeys, responsive wireframes, design systems, and delightful developer experiences.',
    icon: <Palette className="h-5 w-5 text-[#4285F4]" />,
    color: '#4285F4',
  },
];

export default function CommunityStructurePage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#34A853] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>Community Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Community Structure
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            A structured, multidisciplinary ecosystem comprising dedicated Core Teams and specialized
            Technical Wings.
          </p>
        </div>

        {/* 1. Core Teams */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold block mb-1">
              Operational Backbone
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Core Teams</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeams.map((team) => (
              <div
                key={team.name}
                className="rounded-3xl border border-white/15 bg-[#121216]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-black border border-white/10">{team.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{team.name}</h3>
                    <span className="text-[11px] font-mono text-white/50">{team.role}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{team.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Technical Wings */}
        <div className="mb-20 rounded-3xl border border-white/15 bg-black p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold block mb-1">
              Specialized Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Technical Wings</h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
              Domain-focused technical cells where students research, build, and deploy projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techWings.map((wing) => (
              <div
                key={wing.name}
                className="rounded-2xl border border-white/10 bg-[#121216] p-6 transition-all duration-300 hover:border-white/25"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-black border border-white/10">{wing.icon}</div>
                  <h3 className="text-base font-bold text-white">{wing.name}</h3>
                </div>
                <p className="text-xs text-white/75 leading-relaxed mb-3">{wing.desc}</p>
                <div className="pt-3 border-t border-white/06">
                  <span className="font-mono text-[10px] text-[#4285F4] block font-semibold">
                    {wing.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center">
          <GlowButton href="/join" shape="pill" size="lg">
            Apply to Join a Wing or Core Team →
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
