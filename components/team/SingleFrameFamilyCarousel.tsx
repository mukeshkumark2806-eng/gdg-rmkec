'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TeamMember } from '@/types';
import { Github, Linkedin, Twitter, User, Hand, MoveHorizontal } from 'lucide-react';

interface SingleFrameFamilyCarouselProps {
  members: TeamMember[];
  categories: readonly string[];
}

export const SingleFrameFamilyCarousel: React.FC<SingleFrameFamilyCarouselProps> = ({
  members,
  categories,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Filter members according to active category
  const filteredMembers = useMemo(() => {
    if (activeCategory === 'All') return members;
    return members.filter((m) => m.teamCategory === activeCategory);
  }, [activeCategory, members]);

  // Duplicate members array for seamless infinite loop
  const marqueeList = useMemo(() => {
    if (filteredMembers.length === 0) return [];
    let list = [...filteredMembers];
    while (list.length < 12) {
      list = [...list, ...filteredMembers];
    }
    return [...list, ...list];
  }, [filteredMembers]);

  // ─── Automatic Slow Right-to-Left Glide Loop ─────────────────
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.55; // Calm, slow pixels per frame

    const scrollLoop = () => {
      if (!isHovered && !isDragging && containerRef.current) {
        const container = containerRef.current;
        container.scrollLeft += speed;

        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  // ─── Mouse Drag Handlers for Manual Movement on Hover ────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.6; // Drag sensitivity
    dragDistanceRef.current = Math.abs(walk);
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;

    // Seamless loop during manual drag
    const halfWidth = containerRef.current.scrollWidth / 2;
    if (containerRef.current.scrollLeft >= halfWidth) {
      containerRef.current.scrollLeft = 0;
      scrollLeftRef.current = 0;
      startXRef.current = e.pageX - containerRef.current.offsetLeft;
    } else if (containerRef.current.scrollLeft <= 0) {
      containerRef.current.scrollLeft = halfWidth;
      scrollLeftRef.current = halfWidth;
      startXRef.current = e.pageX - containerRef.current.offsetLeft;
    }
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    setIsDragging(false);
  };

  // ─── Touch Drag Handlers (Mobile) ────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsHovered(true);
    isDownRef.current = true;
    startXRef.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.6;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;

    const halfWidth = containerRef.current.scrollWidth / 2;
    if (containerRef.current.scrollLeft >= halfWidth) {
      containerRef.current.scrollLeft = 0;
      scrollLeftRef.current = 0;
      startXRef.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    } else if (containerRef.current.scrollLeft <= 0) {
      containerRef.current.scrollLeft = halfWidth;
      scrollLeftRef.current = halfWidth;
      startXRef.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    }
  };

  const handleTouchEnd = () => {
    isDownRef.current = false;
    setIsHovered(false);
  };

  // Color mapping based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Faculty Coordinator':
      case 'Core Lead':
        return '#4285F4';
      case 'Technical Team':
        return '#34A853';
      case 'Design Team':
        return '#EA4335';
      case 'Event Management':
        return '#FBBC05';
      case 'HR Team':
        return '#FBBC05';
      case 'PR Team':
        return '#4285F4';
      default:
        return '#4285F4';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ─── Filter Tabs Bar ────────────────────────────────────────── */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-center gap-2 mb-8 px-4">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-white text-black border-white shadow-md'
              : 'bg-[#121216]/80 text-white/70 hover:bg-[#121216] border-white/10 hover:border-white/25'
          }`}
        >
          All Members ({members.length})
        </button>

        {categories.map((cat) => {
          const count = members.filter((m) => m.teamCategory === cat).length;
          if (count === 0) return null;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-[#121216]/80 text-white/70 hover:bg-[#121216] border-white/10 hover:border-white/25'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* ─── Single Rectangular Moving Frame Bar (Draggable on Hover) ─ */}
      <div
        className="relative w-full overflow-hidden border-y border-white/10 bg-black/50 py-8 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUp();
        }}
      >
        {/* Left & Right Edge Smooth Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />

        {/* Scrollable Container with Smooth Mouse Drag & Wheel Support */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-6 overflow-x-hidden no-scrollbar py-2 px-8 ${
            isDragging ? 'cursor-grabbing' : isHovered ? 'cursor-grab' : 'cursor-default'
          }`}
          style={{ scrollBehavior: 'auto' }}
        >
          {marqueeList.map((member, index) => {
            const badgeColor = getCategoryColor(member.teamCategory);
            const safeAvatarUrl = member.avatarUrl ? encodeURI(member.avatarUrl) : '';

            return (
              <div
                key={`${member.id}-${index}`}
                className="w-[280px] sm:w-[300px] h-[400px] shrink-0 rounded-3xl border border-white/15 bg-[#121216] backdrop-blur-xl overflow-hidden group hover:border-white/45 hover:scale-[1.02] transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                {/* Rectangular Image with full, bright visibility */}
                <div className="relative h-[230px] w-full overflow-hidden bg-[#181820]">
                  {safeAvatarUrl ? (
                    <img
                      src={safeAvatarUrl}
                      alt={member.name}
                      draggable={false}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#181820]">
                      <User className="h-16 w-16 text-white/40" />
                    </div>
                  )}

                  {/* Subtle bottom gradient only */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#121216] to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-md"
                      style={{ color: badgeColor }}
                    >
                      {member.teamCategory}
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 pt-1 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#4285F4] transition-colors line-clamp-1">
                      {member.name}
                    </h4>
                    <p className="font-mono text-xs text-[#FBBC05] font-semibold mt-0.5 line-clamp-1">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="mt-2 text-xs text-white/75 leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Social Links Footer */}
                  <div className="mt-3 pt-3 border-t border-white/08 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-medium">
                      {member.domain || 'Core'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {member.socials?.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            if (dragDistanceRef.current > 6) e.preventDefault();
                          }}
                          className="p-1.5 rounded-full bg-white/06 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
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
                          onClick={(e) => {
                            if (dragDistanceRef.current > 6) e.preventDefault();
                          }}
                          className="p-1.5 rounded-full bg-white/06 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
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
                          onClick={(e) => {
                            if (dragDistanceRef.current > 6) e.preventDefault();
                          }}
                          className="p-1.5 rounded-full bg-white/06 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
