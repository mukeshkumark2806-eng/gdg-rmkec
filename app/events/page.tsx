'use client';

import React, { useState, useEffect } from 'react';
import { eventsData } from '@/data/events';
import { EventItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Search, Calendar, MapPin, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = ['All', 'Upcoming', 'Workshop', 'Hackathon', 'Bootcamp', 'Past'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    // Load dotlottie-wc web component script if not already present
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.4/dist/dotlottie-wc.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Upcoming'
        ? event.status === 'Upcoming'
        : selectedCategory === 'Past'
        ? event.status === 'Past'
        : event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-[#F5F7FA]">
      {/* Background Blobs like Home Page */}
      <div className="blob" style={{ width: 700, height: 600, background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 55%, transparent 100%)', top: -200, right: -150, opacity: 0.13 }} />
      <div className="blob" style={{ width: 500, height: 400, background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 55%, transparent 100%)', bottom: 40, left: -120, opacity: 0.09, animationDelay: '4s' }} />
      <div className="blob" style={{ width: 600, height: 400, background: 'radial-gradient(ellipse, #4285F4 0%, transparent 70%)', top: '30%', left: '25%', opacity: 0.05, animationDelay: '8s' }} />

      {/* Dot Grid Texture like Home Page */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      {/* Top Left DotLottie Animation below Navbar */}
      <div className="absolute top-20 left-2 sm:left-6 md:left-12 z-0 pointer-events-none opacity-85 lg:opacity-100">
        <dotlottie-wc
          src="https://lottie.host/15fb94bb-ad03-4ae3-baec-ee1492599330/pKuLjHKXhA.lottie"
          style={{ width: '280px', height: '280px' }}
          autoplay
          loop
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="red" className="mb-4">
            Hands-on Learning
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Events & <span className="text-gradient-google">Workshops</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Join Google Cloud jams, GenAI hackathons, Android devfests, and open-source build sessions.
          </p>
        </div>

        {/* Filter Bar Box - Black Color Box */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-black text-white p-4 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(66,133,244,0.5)] border border-blue-400/50'
                    : 'bg-zinc-900 text-slate-300 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <Input
              placeholder="Search events or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4 text-blue-400" />}
            />
          </div>
        </div>

        {/* Events Grid Boxes - Black Boxes with White Text */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-white/15 bg-black text-white">
            <p className="text-slate-300 text-sm">No events found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black p-6 shadow-xl hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(66,133,244,0.25)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={event.status === 'Upcoming' ? 'green' : 'glass'}>
                      {event.status}
                    </Badge>
                    <span className="text-xs font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                      {event.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed mb-4">{event.tagline}</p>

                  <div className="flex flex-col gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="text-white font-medium">{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="truncate text-white/90">{event.location}</span>
                    </div>
                  </div>

                  {/* Small Pieces / Tech Tags matching Black box */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-950/80 border border-blue-500/30 px-2.5 py-0.5 text-[10px] text-blue-300 font-mono font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalEvent(event)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    <span>View Details & RSVP</span>
                    <span className="text-red-400">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal popup */}
      <Modal
        isOpen={!!activeModalEvent}
        onClose={() => setActiveModalEvent(null)}
        title={activeModalEvent?.title}
      >
        {activeModalEvent && (
          <div className="flex flex-col gap-4 bg-black text-white p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <Badge variant="green">{activeModalEvent.status}</Badge>
              <Badge variant="glass">{activeModalEvent.category}</Badge>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">{activeModalEvent.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-950 p-4 rounded-xl border border-white/15">
              <div>
                <span className="text-cyan-400 block font-semibold">Date & Time</span>
                <span className="font-semibold text-white">{activeModalEvent.date} ({activeModalEvent.time})</span>
              </div>
              <div>
                <span className="text-cyan-400 block font-semibold">Location / Format</span>
                <span className="font-semibold text-white">{activeModalEvent.location}</span>
              </div>
            </div>

            {activeModalEvent.registrationUrl && (
              <div className="mt-4 flex justify-end">
                <a href={activeModalEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                  <MagneticButton variant="google" size="sm">
                    <span>Register on GDG Portal</span>
                    <ExternalLink className="h-4 w-4" />
                  </MagneticButton>
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
