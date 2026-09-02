'use client';

import React, { useState, useEffect } from 'react';
import { TeamMember } from '@/types';
import { GlowButton } from '@/components/ui/GlowButton';
import { ChevronLeft, ChevronRight, Github, Linkedin, Pause, Play, Sparkles } from 'lucide-react';

interface LeadershipSpotlightProps {
  leaders: TeamMember[];
}

export const LeadershipSpotlightCarousel: React.FC<LeadershipSpotlightProps> = ({ leaders }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? leaders.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === leaders.length - 1 ? 0 : prev + 1));
  };

  // Automatic Movement with Hover-to-Pause
  useEffect(() => {
    if (isHovered || leaders.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === leaders.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, leaders.length]);

  if (leaders.length === 0) return null;

  const currentLeader = leaders[activeIndex];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-black p-6 sm:p-10 shadow-2xl backdrop-blur-2xl group/spotlight"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Leader Media (5 cols) */}
        <div className="md:col-span-5 relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#121216] border border-white/10 group">
          <img
            src={currentLeader.avatarUrl}
            alt={currentLeader.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[#4285F4]">
              ★ Community Leadership
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <span className="font-mono text-xs text-[#FBBC05] font-semibold block">
              {currentLeader.teamCategory}
            </span>
            <span className="text-xl font-bold text-white">{currentLeader.name}</span>
          </div>
        </div>

        {/* Leader Details & Quotes (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between h-full py-2">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#34A853] font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Leadership Spotlight ({activeIndex + 1} of {leaders.length})</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1 font-mono text-[10px] text-white/40">
                {isHovered ? (
                  <>
                    <Pause className="h-3 w-3 text-[#FBBC05]" />
                    <span className="text-[#FBBC05]">PAUSED</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 text-[#34A853]" />
                    <span>AUTO</span>
                  </>
                )}
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              {currentLeader.name}
            </h3>
            <p className="font-mono text-sm text-[#4285F4] font-semibold mb-6">
              {currentLeader.role} · {currentLeader.domain}
            </p>

            <blockquote className="text-sm sm:text-base text-white/80 leading-relaxed italic border-l-2 border-[#FBBC05] pl-4 py-1 mb-6">
              &ldquo;{currentLeader.bio}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              {currentLeader.socials?.linkedin && (
                <GlowButton
                  href={currentLeader.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  shape="pill"
                  size="sm"
                >
                  Connect on LinkedIn →
                </GlowButton>
              )}
              {currentLeader.socials?.github && (
                <GlowButton
                  href={currentLeader.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  shape="box"
                  size="sm"
                  surfaceClassName="h-9 w-9 !p-0"
                >
                  <Github className="h-4 w-4 text-white" />
                </GlowButton>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {leaders.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <GlowButton
                onClick={prevSlide}
                shape="circle"
                size="sm"
                ariaLabel="Previous leader"
                surfaceClassName="h-9 w-9 !p-0"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </GlowButton>
              <GlowButton
                onClick={nextSlide}
                shape="circle"
                size="sm"
                ariaLabel="Next leader"
                surfaceClassName="h-9 w-9 !p-0"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
