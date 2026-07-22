'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Github, Star, GitFork, ArrowRight, Sparkles } from 'lucide-react';
import { eventsData } from '@/data/events';
import { projectsData } from '@/data/projects';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { EventItem } from '@/types';

export const FeaturedSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const featuredEvents = eventsData.filter((e) => e.featured || e.status === 'Upcoming').slice(0, 3);
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative py-24 bg-slate-950/70 border-t border-white/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Events Sub-Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="red" className="mb-3">
                Live & Upcoming
              </Badge>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Featured Workshops & <span className="text-gradient-google">Hackathons</span>
              </h2>
            </div>
            <Link href="/events">
              <MagneticButton variant="outline" size="sm">
                <span>View All Events</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </MagneticButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl hover:border-red-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={event.status === 'Upcoming' ? 'green' : 'glass'}>
                      {event.status}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">{event.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">{event.tagline}</p>

                  <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    View Details & RSVP →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects Sub-Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="blue" className="mb-3">
                Built by Students
              </Badge>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Open-Source <span className="text-gradient-google">Showcase</span>
              </h2>
            </div>
            <Link href="/projects">
              <MagneticButton variant="outline" size="sm">
                <span>View All Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </MagneticButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">{project.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-800/90 px-2 py-0.5 text-[10px] text-slate-300 border border-white/5 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">By {project.author.name}</span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-300 hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Popup Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
      >
        {selectedEvent && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="green">{selectedEvent.status}</Badge>
              <Badge variant="glass">{selectedEvent.category}</Badge>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{selectedEvent.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-800/60 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-slate-400 block">Date & Time</span>
                <span className="font-semibold text-white">{selectedEvent.date} ({selectedEvent.time})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Venue / Format</span>
                <span className="font-semibold text-white">{selectedEvent.location}</span>
              </div>
            </div>

            {selectedEvent.speakers && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Featured Speakers</h4>
                <div className="flex flex-col gap-2">
                  {selectedEvent.speakers.map((spk) => (
                    <div key={spk.name} className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-lg border border-white/5">
                      <span className="font-bold text-white">{spk.name}</span>
                      <span className="text-slate-400">{spk.role} @ {spk.company}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-end gap-3">
              {selectedEvent.registrationUrl && (
                <a href={selectedEvent.registrationUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <MagneticButton variant="google" size="sm" className="w-full">
                    <span>RSVP on GDG Portal</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </MagneticButton>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
