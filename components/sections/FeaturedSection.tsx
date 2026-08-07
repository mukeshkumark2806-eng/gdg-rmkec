'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, ExternalLink, Github,
  Star, GitFork, ArrowRight, ChevronRight
} from 'lucide-react';
import { eventsData } from '@/data/events';
import { projectsData } from '@/data/projects';
import { Modal } from '@/components/ui/Modal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { EventItem } from '@/types';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
});

export const FeaturedSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const featuredEvents = eventsData.filter((e) => e.featured || e.status === 'Upcoming').slice(0, 3);
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative bg-[#0D1117] pt-24 pb-0 overflow-hidden">

      {/* Background textures */}
      <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none" />
      <div
        className="blob"
        style={{
          width: 500, height: 400,
          background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 70%, transparent 100%)',
          bottom: '10%', right: '-80px',
          opacity: 0.06,
          animationDelay: '2s',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8 space-y-24">

        {/* ── Events Sub-section ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <div>
              <motion.span {...fadeUp(0)} className="chip chip-dark-neutral mb-3 inline-flex">Live &amp; Upcoming</motion.span>
              <motion.h2
                {...fadeUp(0.08)}
                className="heading-section text-[#E8EAED]"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}
              >
                Featured Workshops &amp;{' '}
                <span className="text-gradient-google">Hackathons</span>
              </motion.h2>
            </div>
            <motion.div {...fadeUp(0.12)}>
              <Link href="/events" className="btn-ghost-dark inline-flex items-center gap-2 text-sm">
                View All Events <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                {...fadeUp(i * 0.08)}
                className="card-dark flex flex-col gap-4 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className={`chip ${event.status === 'Upcoming' ? 'chip-dark-green' : 'chip-dark-neutral'}`}>
                    {event.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#8B949E]">{event.category}</span>
                </div>

                <div className="flex-1">
                  <h3
                    className="font-bold text-[#E8EAED] mb-2 hover:text-[#6BA3F7] transition-colors cursor-default"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', lineHeight: 1.3 }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-[13px] text-[#8B949E] leading-relaxed">{event.tagline}</p>
                </div>

                <div className="flex flex-col gap-1.5 text-[12px] text-[#8B949E]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[#4285F4] shrink-0" />
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#EA4335] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/08">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6BA3F7] hover:text-[#4285F4] transition-colors cursor-pointer"
                  >
                    Details &amp; RSVP <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Projects Sub-section ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <div>
              <motion.span {...fadeUp(0)} className="chip chip-dark-neutral mb-3 inline-flex">Built by Students</motion.span>
              <motion.h2
                {...fadeUp(0.08)}
                className="heading-section text-[#E8EAED]"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}
              >
                Open-Source{' '}
                <span className="text-gradient-blue">Showcase</span>
              </motion.h2>
            </div>
            <motion.div {...fadeUp(0.12)}>
              <Link href="/projects" className="btn-ghost-dark inline-flex items-center gap-2 text-sm">
                View All Projects <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                {...fadeUp(i * 0.08)}
                className="card-dark flex flex-col gap-4 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="chip chip-dark-blue text-[11px]">{project.domain}</span>
                  <div className="flex items-center gap-3 text-[11px] text-[#8B949E] font-mono">
                    {project.stars && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-[#FBBC05]" />{project.stars}
                      </span>
                    )}
                    {project.forks && (
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3 text-[#6BA3F7]" />{project.forks}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h3
                    className="font-bold text-[#E8EAED] mb-2"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', lineHeight: 1.3 }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-[#8B949E] leading-relaxed">{project.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span key={t} className="chip chip-dark-neutral text-[10px] font-mono">{t}</span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/08 flex items-center justify-between">
                  <span className="text-[12px] text-[#8B949E]">By {project.author.name}</span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] text-[#8B949E] hover:text-[#E8EAED] transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Wave divider: dark → light (white CTA) */}
      <div className="relative mt-24 -mb-px">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,48 C480,0 960,64 1440,16 L1440,64 L0,64 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Event Modal */}
      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title={selectedEvent?.title}>
        {selectedEvent && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`chip ${selectedEvent.status === 'Upcoming' ? 'chip-green' : 'chip-neutral'}`}>
                {selectedEvent.status}
              </span>
              <span className="chip chip-neutral">{selectedEvent.category}</span>
            </div>

            <p className="text-[14px] text-[#5F6B7A] leading-relaxed">{selectedEvent.description}</p>

            <div className="grid grid-cols-2 gap-3 bg-[#F5F7FA] p-4 rounded-xl text-[13px]">
              <div>
                <span className="text-[#5F6B7A] block text-xs mb-1">Date &amp; Time</span>
                <span className="font-semibold text-[#1A1A2E]">{selectedEvent.date} · {selectedEvent.time}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block text-xs mb-1">Venue</span>
                <span className="font-semibold text-[#1A1A2E]">{selectedEvent.location}</span>
              </div>
            </div>

            {selectedEvent.speakers && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5F6B7A] mb-2">Speakers</h4>
                <div className="flex flex-col gap-2">
                  {selectedEvent.speakers.map((spk) => (
                    <div key={spk.name} className="flex items-center justify-between text-[13px] bg-[#F5F7FA] p-3 rounded-xl">
                      <span className="font-bold text-[#1A1A2E]">{spk.name}</span>
                      <span className="text-[#5F6B7A]">{spk.role} @ {spk.company}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              {selectedEvent.registrationUrl && (
                <a href={selectedEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                  <MagneticButton variant="google" size="sm">
                    RSVP on GDG Portal <ExternalLink className="h-3.5 w-3.5" />
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
