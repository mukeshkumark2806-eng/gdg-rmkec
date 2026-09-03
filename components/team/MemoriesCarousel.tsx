'use client';

import React, { useState, useEffect } from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { ChevronLeft, ChevronRight, Camera, Pause, Play } from 'lucide-react';
import Link from 'next/link';

interface MemoryItem {
  id: string;
  title: string;
  tag: string;
  date: string;
  description: string;
  image: string;
  color: string;
}

const memories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: "HackNEXA'26 Hackathon Live Evaluations",
    tag: 'TechSprint Campaign',
    date: 'Flagship Event',
    description:
      'Over 650+ participating teams and 250+ teams presenting their software and IoT prototypes to jury panels.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    color: '#4285F4',
  },
  {
    id: 'mem-2',
    title: 'Google Cloud Campaign Study Jam & Felicitations',
    tag: 'Cloud Jam October 2025',
    date: 'October 2025',
    description:
      '100+ passionate student developers, 40+ certified milestone completers, and official rewards distributed by the college Principal.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    color: '#34A853',
  },
  {
    id: 'mem-3',
    title: 'Core Team & Technical Wings Ideation Sprint',
    tag: 'Campus Community',
    date: 'Community Gathering',
    description:
      'Planning hackathon problem statements, bus tracking IoT architecture, and workshop curriculum.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    color: '#FBBC05',
  },
  {
    id: 'mem-4',
    title: 'Agentic AI & Gemini Bootcamps',
    tag: 'Hands-on Labs',
    date: 'AI Workshop Series',
    description:
      'Student coders mastering LLM agents, multimodal tool use, and automated reasoning workflows in computer labs.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    color: '#EA4335',
  },
];

export const MemoriesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  // Automatic Movement with Hover-to-Pause
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const current = memories[currentIndex];

  return (
    <div
      className="relative rounded-3xl border border-white/15 bg-black overflow-hidden shadow-2xl p-6 sm:p-10 backdrop-blur-2xl group/memories"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EA4335] mb-2 font-semibold">
            <Camera className="h-4 w-4" />
            <span>Community Memories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Growing Together, One Milestone at a Time
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-2xl">
            Every event organized, every project built, and every challenge overcome adds another
            chapter to our journey. These moments represent the spirit of collaboration, learning,
            and friendship that defines our community.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-white/40 px-2.5 py-1 rounded-full bg-black/40 border border-white/08">
            {isHovered ? (
              <>
                <Pause className="h-3 w-3 text-[#FBBC05]" />
                <span className="text-[#FBBC05]">PAUSED</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-[#34A853]" />
                <span>AUTO-PLAY</span>
              </>
            )}
          </div>

          <GlowButton
            onClick={prevSlide}
            shape="circle"
            size="sm"
            ariaLabel="Previous memory"
            surfaceClassName="h-10 w-10 !p-0"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </GlowButton>
          <GlowButton
            onClick={nextSlide}
            shape="circle"
            size="sm"
            ariaLabel="Next memory"
            surfaceClassName="h-10 w-10 !p-0"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </GlowButton>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/10 group bg-[#121216]">
        <img
          src={current.image}
          alt={current.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Slide Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col justify-end">
          <div className="flex items-center gap-2.5 mb-2">
            <span
              className="font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-black/80 border border-white/15"
              style={{ color: current.color }}
            >
              {current.tag}
            </span>
            <span className="font-mono text-xs text-white/60">{current.date}</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-bold text-white mb-2">{current.title}</h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            {current.description}
          </p>
        </div>
      </div>

      {/* Footer Indicators */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {memories.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <Link
          href="/album"
          className="text-xs font-semibold text-[#4285F4] hover:text-white transition-colors"
        >
          View Full Event Album →
        </Link>
      </div>
    </div>
  );
};
