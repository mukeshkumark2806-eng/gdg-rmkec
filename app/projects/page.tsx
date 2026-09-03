'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Users,
  CheckCircle2,
  X,
  ArrowRight,
  Cpu,
  Globe,
  Brain,
  Palette,
  Cloud,
  Compass,
  Zap,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { projectsData } from '@/data/projects';
import { ProjectItem } from '@/types';

const domainIcons: Record<string, React.ReactNode> = {
  'Campus Solutions': <Compass className="h-4 w-4 text-[#4285F4]" />,
  Web: <Globe className="h-4 w-4 text-[#34A853]" />,
  'AI/ML': <Brain className="h-4 w-4 text-[#EA4335]" />,
  'UI/UX': <Palette className="h-4 w-4 text-[#FBBC05]" />,
  Cloud: <Cloud className="h-4 w-4 text-[#4285F4]" />,
};

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  const domains = ['All', 'Campus Solutions', 'AI/ML', 'Web'];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedDomain === 'All') return true;
    return p.domain === selectedDomain;
  });

  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Campus Innovation Labs</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Projects in Development
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Student-engineered applications, real-time IoT solutions, and campus tools built by GDG on
            Campus RMKEC. Click any project to explore full architectural details and the team behind it.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              <span>{projectsData.length} Ongoing Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
              <span>25+ Active Contributors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
              <span>100% Student-Led</span>
            </div>
          </div>
        </div>

        {/* Domain Filter Bar */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {domains.map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => setSelectedDomain(dom)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-white text-black font-semibold shadow-lg scale-105'
                  : 'bg-[#121216]/80 text-white/70 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group relative rounded-3xl border border-white/15 bg-[#121216]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/35 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col justify-between"
            >
              {/* Top Row: Domain & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/06 border border-white/10 text-white/80">
                    {domainIcons[project.domain] || <Cpu className="h-3.5 w-3.5 text-[#4285F4]" />}
                    {project.domain}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border ${
                      project.status === 'Deployed & Active' || project.status === 'Active Production'
                        ? 'bg-[#34A853]/20 text-[#34A853] border-[#34A853]/40'
                        : project.status === 'Ongoing Development'
                        ? 'bg-[#FBBC05]/20 text-[#FBBC05] border-[#FBBC05]/40'
                        : 'bg-[#4285F4]/20 text-[#4285F4] border-[#4285F4]/40'
                    }`}
                  >
                    {project.status || 'Active'}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#4285F4] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-3 mb-5">
                  {project.tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/08 text-[10px] font-mono text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 rounded-lg bg-white/06 text-[10px] font-mono text-white/50">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Contributor Avatars & View Details Trigger */}
              <div className="pt-4 border-t border-white/08 flex items-center justify-between">
                {/* Contributor Avatar Stacks */}
                {project.contributors && project.contributors.length > 0 ? (
                  <div className="flex items-center -space-x-2">
                    {project.contributors.slice(0, 4).map((contrib, i) => (
                      <div
                        key={i}
                        className="relative h-7 w-7 rounded-full overflow-hidden border-2 border-black bg-black/80"
                        title={`${contrib.name} (${contrib.role})`}
                      >
                        {contrib.avatarUrl ? (
                          <img
                            src={contrib.avatarUrl}
                            alt={contrib.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#4285F4] to-[#34A853] text-[9px] font-bold text-white">
                            {contrib.name
                              .split(' ')
                              .filter(Boolean)
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                        )}
                      </div>
                    ))}
                    {project.contributors.length > 4 && (
                      <div className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-black bg-[#1f1f24] text-[9px] font-mono font-semibold text-white/70">
                        +{project.contributors.length - 4}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-[11px] font-mono text-white/50">{project.author.name}</span>
                )}

                {/* Clickable indicator */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4285F4] group-hover:text-white transition-colors">
                  Details &amp; Team <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="text-center p-10 rounded-3xl border border-white/10 bg-[#121216]/60 backdrop-blur-md">
          <h3 className="text-2xl font-bold text-white mb-2">Want to Build Campus-Scale Projects?</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mb-6">
            Join the GDG on Campus RMKEC Technical Wings or Design Team and collaborate on real student solutions.
          </p>
          <GlowButton href="/join" shape="pill" size="lg">
            Apply to Join Technical Wings →
          </GlowButton>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PROJECT DETAILS & CONTRIBUTORS MODAL                          */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#121216] p-6 sm:p-8 md:p-10 shadow-2xl text-paper"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/08 border border-white/15 text-white">
                    {domainIcons[activeProject.domain] || <Cpu className="h-3.5 w-3.5 text-[#4285F4]" />}
                    {activeProject.domain}
                  </span>
                  <span
                    className={`font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${
                      activeProject.status === 'Deployed & Active' || activeProject.status === 'Active Production'
                        ? 'bg-[#34A853]/20 text-[#34A853] border-[#34A853]/40'
                        : activeProject.status === 'Ongoing Development'
                        ? 'bg-[#FBBC05]/20 text-[#FBBC05] border-[#FBBC05]/40'
                        : 'bg-[#4285F4]/20 text-[#4285F4] border-[#4285F4]/40'
                    }`}
                  >
                    {activeProject.status || 'Active'}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  aria-label="Close project modal"
                  className="p-2 rounded-full bg-white/06 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 2-COLUMN LAYOUT: LEFT (Project Details) & RIGHT (People Who Worked on Project) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ─── LEFT COLUMN: Project Details (col-span-7) ─── */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      {activeProject.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[#4285F4] font-medium leading-relaxed">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* Impact Banner if available */}
                  {activeProject.impact && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4285F4]/10 via-[#34A853]/10 to-transparent border border-white/10 flex items-start gap-3">
                      <Zap className="h-5 w-5 text-[#FBBC05] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#FBBC05] font-semibold block">
                          Campus Impact
                        </span>
                        <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5">
                          {activeProject.impact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* About / Overview */}
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2 font-semibold">
                      About This Project
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Key Objectives */}
                  {activeProject.objectives && activeProject.objectives.length > 0 && (
                    <div className="pt-5 border-t border-white/10">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">
                        Key Objectives
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeProject.objectives.map((obj, i) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-white/08 bg-black/50 p-3.5"
                          >
                            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                              {obj.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-white/65 leading-relaxed">
                              {obj.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Core Technical Features */}
                  {activeProject.features && activeProject.features.length > 0 && (
                    <div className="pt-5 border-t border-white/10">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">
                        Core Technical Features
                      </h3>
                      <ul className="space-y-2">
                        {activeProject.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75"
                          >
                            <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Stack */}
                  <div className="pt-5 border-t border-white/10">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3 font-semibold">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/06 border border-white/10 text-xs font-mono text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── RIGHT COLUMN: People Who Worked on That Project (col-span-5) ─── */}
                <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-black/70 p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between self-stretch">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">Project Members</h3>
                          <span className="font-mono text-[10px] text-white/50">
                            People who worked on this project
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                        {activeProject.contributors?.length || 0} Members
                      </span>
                    </div>

                    {/* Contributor List */}
                    <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                      {activeProject.contributors && activeProject.contributors.length > 0 ? (
                        activeProject.contributors.map((member, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-[#121216] p-3.5 transition-all hover:border-white/25 hover:bg-[#18181d]"
                          >
                            {/* Avatar or Initials Fallback */}
                            <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden border border-white/15 bg-[#1f1f24] flex items-center justify-center">
                              {member.avatarUrl ? (
                                <img
                                  src={member.avatarUrl}
                                  alt={member.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center font-bold text-xs text-white bg-gradient-to-br from-[#4285F4] to-[#34A853]">
                                  {member.name
                                    .split(' ')
                                    .filter(Boolean)
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join('')}
                                </div>
                              )}
                            </div>

                            {/* Contributor Info */}
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                                {member.name}
                              </h4>
                              <span className="text-[11px] font-semibold text-[#4285F4] block mt-0.5">
                                {member.role}
                              </span>
                              <span className="font-mono text-[10px] text-white/50 block mt-0.5">
                                {member.team}
                              </span>
                              {member.bio && (
                                <p className="mt-1 text-[11px] text-white/65 leading-snug">
                                  {member.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-white/60 p-4 text-center">
                          Engineered collaboratively by {activeProject.author.name}.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column Footer Badge */}
                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                      GDG on Campus RMKEC Technical Wings
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Bar */}
              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
                <span>GDG on Campus RMKEC · Internal Project Registry</span>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
