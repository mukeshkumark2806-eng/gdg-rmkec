'use client';

import React, { useState } from 'react';
import { eventsData } from '@/data/events';
import { EventItem } from '@/types';
import { GlowButton } from '@/components/ui/GlowButton';
import { Calendar, MapPin, Search, Sparkles, X, Trophy, Info, Tag } from 'lucide-react';

const categories = ['All', 'Upcoming', 'Workshop', 'Hackathon', 'Bootcamp', 'Past'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

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
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EA4335] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Campus Events & Hackathons</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Events & Study Jams
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Join flagship hackathons, hands-on Agentic AI bootcamps, and Google Cloud campaigns at
            RMK Engineering College.
          </p>

          {/* Official Schedule Note */}
          <div className="mt-6 inline-flex items-center gap-2 p-3 px-5 rounded-2xl bg-[#121216]/80 border border-white/10 text-xs text-white/80">
            <Info className="h-4 w-4 text-[#FBBC05] shrink-0" />
            <span>
              <strong>Note:</strong> Exact dates for HackNEXA&apos;26, Agentic AI Study Jam, and A.C.E will be
              announced soon.
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 p-3 rounded-2xl border border-white/10 bg-[#121216]/80 backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4285F4] text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/06'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search event, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-black/60 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/15 bg-[#121216]/80 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#121216]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      event.status === 'Upcoming'
                        ? 'bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30'
                        : 'bg-white/10 text-white/70 border-white/15'
                    }`}
                  >
                    {event.status}
                  </span>
                  <span className="text-xs font-mono text-[#4285F4] font-semibold">
                    {event.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#4285F4] transition-colors mb-2.5">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed mb-4">
                  {event.tagline}
                </p>

                <div className="flex flex-col gap-2.5 text-xs text-white/75 bg-black/50 p-4 rounded-2xl border border-white/08 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#FBBC05] shrink-0" />
                    <span>
                      <strong>Date:</strong> {event.date} {event.time ? `(${event.time})` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#EA4335] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Highlights / Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/06 border border-white/10 px-2.5 py-0.5 text-[10px] text-white/70 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalEvent(event)}
                  className="text-xs font-bold text-[#4285F4] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View Full Details</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup for Event Details */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-black p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4 text-white" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#34A853]/20 text-[#34A853]">
                {activeModalEvent.status}
              </span>
              <span className="font-mono text-xs text-[#4285F4] font-semibold">
                {activeModalEvent.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{activeModalEvent.title}</h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
              {activeModalEvent.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#121216] border border-white/10 text-xs mb-6">
              <div>
                <span className="text-[#FBBC05] block font-mono font-semibold">Date & Time</span>
                <span className="text-white font-medium">
                  {activeModalEvent.date} ({activeModalEvent.time})
                </span>
              </div>
              <div>
                <span className="text-[#EA4335] block font-mono font-semibold">Venue</span>
                <span className="text-white font-medium">{activeModalEvent.location}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white/60 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <GlowButton
                href="https://gdg.community.dev/rmk-engineering-college/"
                target="_blank"
                rel="noreferrer"
                shape="pill"
                size="sm"
              >
                GDG Community Portal →
              </GlowButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
