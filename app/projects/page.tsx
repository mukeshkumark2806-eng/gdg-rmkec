'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Search, Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const domains = ['All', 'AI/ML', 'Web', 'Mobile', 'Cloud', 'Open Source'];

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter((proj) => {
    const matchesDomain = selectedDomain === 'All' || proj.domain === selectedDomain;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDomain && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="blue" className="mb-4">
            Built by RMKEC Coders
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Open Source <span className="text-gradient-google">Projects</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Explore innovative software applications, AI models, and mobile apps created by GDG RMKEC members.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                  selectedDomain === dom
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(66,133,244,0.4)]'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="blue">{project.domain}</Badge>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    {project.stars && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-400" />
                        {project.stars}
                      </span>
                    )}
                    {project.forks && (
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5 text-blue-400" />
                        {project.forks}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">By {project.author.name}</span>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-300 hover:text-white font-semibold"
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      <span>Demo</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
