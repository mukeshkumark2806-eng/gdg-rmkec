'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TeamMember } from '@/types';
import { GlowButton } from '@/components/ui/GlowButton';
import { ChevronLeft, ChevronRight, Github, Linkedin, Twitter, Pause, Play, User } from 'lucide-react';

interface FamilyCarouselProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  autoPlayInterval?: number;
}

export const FamilyCarousel: React.FC<FamilyCarouselProps> = ({
  members,
  title,
  subtitle,
  autoPlayInterval = 2800,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive cards per view calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, members.length - cardsPerView);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Automatic Movement with Hover-to-Pause
  useEffect(() => {
    if (isHovered || maxIndex <= 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovered, maxIndex, autoPlayInterval]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    }
    touchStartX.current = null;
  };

  if (members.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden select-none py-4 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header with Title, Hover Status & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 px-2">
        <div>
          {title && <h3 className="text-2xl sm:text-3xl font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-xs sm:text-sm text-white/70 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle Auto-movement status badge */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-white/50 px-2.5 py-1 rounded-full bg-black/40 border border-white/08">
            {isHovered ? (
              <>
                <Pause className="h-3 w-3 text-[#FBBC05]" />
                <span className="text-[#FBBC05]">PAUSED</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-[#34A853]" />
                <span>AUTO-SCROLLING</span>
              </>
            )}
          </div>

          <GlowButton
            onClick={prevSlide}
            shape="circle"
            size="sm"
            ariaLabel="Previous team members"
            surfaceClassName="h-10 w-10 !p-0"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </GlowButton>
          <GlowButton
            onClick={nextSlide}
            shape="circle"
            size="sm"
            ariaLabel="Next team members"
            surfaceClassName="h-10 w-10 !p-0"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </GlowButton>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="relative overflow-hidden rounded-3xl p-1">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-5"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView + (cardsPerView > 1 ? 1.5 : 0))}%)`,
          }}
        >
          {members.map((member) => (
            <div
              key={member.id}
              className="shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] rounded-3xl border border-white/15 bg-[#121216]/80 backdrop-blur-xl overflow-hidden group hover:border-white/35 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Card Media Top */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-black">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#15161e]">
                    <User className="h-16 w-16 text-white/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90">
                    {member.teamCategory}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-[#4285F4] transition-colors">
                    {member.name}
                  </h4>
                  <p className="font-mono text-xs text-[#FBBC05] font-medium mt-0.5">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="mt-3 text-xs text-white/70 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>

                {/* Social Links Footer */}
                <div className="mt-5 pt-4 border-t border-white/08 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {member.domain || 'Core'}
                  </span>

                  <div className="flex items-center gap-2">
                    {member.socials?.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full bg-white/06 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full bg-white/06 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full bg-white/06 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-7 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
