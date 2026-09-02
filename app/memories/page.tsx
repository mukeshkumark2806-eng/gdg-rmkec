'use client';

import React, { useState } from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { Camera, Sparkles, Filter } from 'lucide-react';

interface Memory {
  id: string;
  year: '2025' | '2024' | '2023';
  title: string;
  category: 'Keynotes' | 'Hackathons' | 'Workshops' | 'Community';
  image: string;
  caption: string;
}

const memories: Memory[] = [
  {
    id: 'm1',
    year: '2025',
    title: 'Flagship DevFest Grand Stage',
    category: 'Keynotes',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    caption: '1,200+ attendees packing the main campus auditorium for the opening keynote.',
  },
  {
    id: 'm2',
    year: '2025',
    title: 'Generative AI Sprint & Build Session',
    category: 'Hackathons',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    caption: 'Teams building multi-modal Gemini apps late into the night.',
  },
  {
    id: 'm3',
    year: '2025',
    title: 'Cloud & Kubernetes Workshop Jam',
    category: 'Workshops',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hands-on live deployment jams with Google Developer Experts.',
  },
  {
    id: 'm4',
    year: '2024',
    title: 'The Great DevFest Group Portrait',
    category: 'Community',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Speakers, volunteers, leads, and attendees celebrating the closing ceremony.',
  },
  {
    id: 'm5',
    year: '2024',
    title: 'Women in Tech & Diversity Panel',
    category: 'Community',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Inspiring leaders discussing career pathways, open source, and AI safety.',
  },
  {
    id: 'm6',
    year: '2024',
    title: 'Pitchathon & Startup Demos',
    category: 'Hackathons',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Student founders demoing working MVPs in front of angel investors.',
  },
];

export default function MemoriesPage() {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = memories.filter((m) => {
    const matchYear = selectedYear === 'All' || m.year === selectedYear;
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    return matchYear && matchCat;
  });

  return (
    <div className="pt-24 pb-24 relative overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center mb-12 pt-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EA4335] px-4 py-1 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
          <Camera className="h-3.5 w-3.5" />
          <span>DevFest Chennai Archive</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Memories & Moments
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
          A visual lookback at previous DevFest roadshows, hackathons, and community jams that defined
          our journey.
        </p>

        {/* Filter Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {/* Year Filter */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-[#121216]/90 backdrop-blur-md">
            {['All', '2025', '2024'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedYear === year
                    ? 'bg-[#4285F4] text-white font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-[#121216]/90 backdrop-blur-md">
            {['All', 'Keynotes', 'Hackathons', 'Workshops', 'Community'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white">
                    {item.year}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#4285F4]/30 backdrop-blur-md border border-[#4285F4]/40 text-blue-300">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white group-hover:text-[#4285F4] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join next edition CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl border border-white/10 bg-[#121216]/60 backdrop-blur-md">
          <h3 className="text-2xl font-bold text-white mb-2">Be Part of the 2026 Memories</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mb-6">
            Grab your tickets now and make memories with 1,200+ passionate tech enthusiasts.
          </p>
          <GlowButton href="/tickets" shape="pill" size="lg">
            Get DevFest Tickets →
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
