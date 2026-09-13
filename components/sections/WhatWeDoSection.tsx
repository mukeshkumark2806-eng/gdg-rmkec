'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

interface ActionPillar {
  id: string;
  title: string;
  action: string;
  description: string;
  highlights: string[];
  image: string;
  tag: string;
  color: string;
}

const pillars: ActionPillar[] = [
  {
    id: 'learn',
    title: 'Learn',
    action: 'Hands-on Technical Learning',
    description: 'Conduct workshops, study jams, and hands-on technical sessions across emerging domains.',
    highlights: [
      '100+ Google Cloud Study Jam Learners',
      '40+ Certified Pathway Completers',
      'Agentic AI & Prompt Engineering Workshops',
      'Hands-on AI Sycophancy Mini Challenge',
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    tag: 'Workshops & Study Jams',
    color: '#4285F4',
  },
  {
    id: 'build',
    title: 'Build',
    action: 'Impactful Campus Solutions',
    description: 'Develop impactful solutions for students, faculty members, and college administration.',
    highlights: [
      'Real-Time College Bus Tracking System',
      'Autonomous Calendar Reminder Agents',
      'READTRACE Smart AI Highlighter Pen (₹1,179)',
      'TinyML Predictive Maintenance & ProcureIQ',
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    tag: 'Projects & Engineering',
    color: '#EA4335',
  },
  {
    id: 'collaborate',
    title: 'Collaborate',
    action: 'Interdisciplinary Community',
    description: 'Bring together students from different disciplines to solve real-world challenges.',
    highlights: [
      'HackNEXA \'26 (653 participants & 257 teams)',
      '114 Project Submissions & 55 On-site Finalists',
      'A.C.E Day Batches 1 & 2 (15+ AI pitches)',
      'Cross-disciplinary (ECE, CSE, IT, CSBS)',
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    tag: 'Hackathons & Teams',
    color: '#FBBC05',
  },
  {
    id: 'lead',
    title: 'Lead',
    action: 'Leadership & Personal Growth',
    description: 'Create opportunities for leadership, stage presentation, and personal career growth.',
    highlights: [
      'Top 3 Teams Awarded Google Reward Kits',
      'Google Solution Challenge Roadmap & Mentoring',
      'Student Keynote Speakers & Workshop Leads',
      'Evaluation by 14+ Senior Faculty Jury Members',
    ],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80',
    tag: 'Mentorship & Growth',
    color: '#34A853',
  },
];

export const WhatWeDoSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? pillars.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      if (distance > 50) {
        nextSlide();
      } else if (distance < -50) {
        prevSlide();
      }
    }
    setTimeout(() => {
      setIsHovered(false);
    }, 1500);
  };

  // Automatic Movement with Hover-to-Pause (strictly active when not hovering image box)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="relative overflow-hidden text-paper py-20 px-4 sm:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] mb-2 font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Core Methodology</span>
            </div>
            <h2 className="text-left text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-none tracking-tight text-white">
              What We Do
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <p className="text-sm text-white/70 max-w-md md:text-right">
              Four foundational pillars driving innovation, project execution, and student empowerment
              at RMK Engineering College.
            </p>
          </div>
        </div>

        {/* Carousel Viewport (Hover Boundary for Manual Mode) */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-black group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* In-box Manual Prev / Next Buttons (Appear on Hover) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/90 hover:scale-105 cursor-pointer shadow-xl"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-black/90 hover:scale-105 cursor-pointer shadow-xl"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {pillars.map((pillar) => (
              <article
                key={pillar.id}
                className="relative h-[55vh] md:h-[65vh] w-full shrink-0 overflow-hidden select-none"
              >
                {/* Background Photo */}
                <div className="absolute inset-0">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />
                </div>

                {/* Content Overlay */}
                <div className="relative flex h-full flex-col justify-end p-6 sm:p-12 md:p-16 z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-black/60 border border-white/15"
                      style={{ color: pillar.color }}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-4xl font-bold tracking-tight sm:text-6xl text-white flex items-baseline gap-3">
                    <span>{pillar.title}</span>
                    <span className="text-lg sm:text-2xl font-mono text-white/60 font-normal">
                      — {pillar.action}
                    </span>
                  </h3>

                  <p className="mt-3 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                    {pillar.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-mono text-white/90 border border-white/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
          <GlowButton
            onClick={prevSlide}
            shape="circle"
            size="md"
            ariaLabel="Previous slide"
            surfaceClassName="h-11 w-11 sm:h-12 sm:w-12 !p-0"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </GlowButton>

          <div className="flex items-center gap-2" role="tablist">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={pillar.title}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <GlowButton
            onClick={nextSlide}
            shape="circle"
            size="md"
            ariaLabel="Next slide"
            surfaceClassName="h-11 w-11 sm:h-12 sm:w-12 !p-0"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
};
