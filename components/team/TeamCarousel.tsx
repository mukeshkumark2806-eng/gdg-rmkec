'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { TeamMember } from '@/types';
import { MemberCard } from './MemberCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamCarouselProps {
  members: TeamMember[];
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hover and scroll state
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Mouse drag state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  // Check scroll boundary state
  const checkScrollBounds = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  // Smooth Left-to-Right Continuous Auto Loop when cursor is NOT hovering
  useEffect(() => {
    let animationFrameId: number;

    const loopStep = () => {
      const el = containerRef.current;
      if (el && !isHovered && !isDraggingRef.current) {
        const speed = 1.0;
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (el.scrollLeft >= maxScroll - 2) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += speed;
        }
        checkScrollBounds();
      }
      animationFrameId = requestAnimationFrame(loopStep);
    };

    animationFrameId = requestAnimationFrame(loopStep);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, checkScrollBounds]);

  // Handle scroll events
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => checkScrollBounds();
    el.addEventListener('scroll', handleScroll, { passive: true });
    checkScrollBounds();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [checkScrollBounds, members]);

  // Manual scroll by card width / container page width
  const handleManualScroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    const delta = direction === 'right' ? scrollAmount : -scrollAmount;

    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
    checkScrollBounds();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handleManualScroll('left');
    } else if (e.key === 'ArrowRight') {
      handleManualScroll('right');
    }
  };

  if (!members || members.length === 0) return null;

  return (
    <div
      className="w-full flex flex-col gap-6"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Team Members Horizontal Showcase"
    >
      {/* Header Title */}
      <div className="flex items-center justify-between gap-4 px-2">
        <h2 className="text-xl sm:text-2xl font-black text-[#1A1A2E] tracking-tight flex items-center gap-3">
          <span>Member Showcase</span>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-300/80">
            {members.length} {members.length === 1 ? 'Member' : 'Members'}
          </span>
        </h2>
      </div>

      {/* Carousel Container Wrapper - Full Width, No Extra Side Padding */}
      <div
        className="relative w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
        }}
      >
        {/* Left Side Scroll Button */}
        <button
          onClick={() => handleManualScroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200/90 backdrop-blur-md transition-all duration-300 ${
            canScrollLeft
              ? 'hover:bg-blue-600 hover:text-white hover:border-blue-600 opacity-90 group-hover:opacity-100 cursor-pointer shadow-blue-500/10'
              : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Scroll Left"
          title="Scroll Left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Right Side Scroll Button */}
        <button
          onClick={() => handleManualScroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200/90 backdrop-blur-md transition-all duration-300 ${
            canScrollRight
              ? 'hover:bg-blue-600 hover:text-white hover:border-blue-600 opacity-90 group-hover:opacity-100 cursor-pointer shadow-blue-500/10'
              : 'opacity-30 cursor-not-allowed'
          }`}
          aria-label="Scroll Right"
          title="Scroll Right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Horizontal Track - Full width spanning without large side padding */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="flex gap-6 overflow-x-auto hide-scrollbar py-4 items-stretch select-none cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {members.map((member) => (
            <div
              key={member.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 flex flex-col items-stretch"
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
