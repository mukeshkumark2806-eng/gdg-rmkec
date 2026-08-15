'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData, galleryCategories, GalleryItem } from '@/data/gallery';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Search,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

const perks = [
  'Google Cloud Qwiklabs Credits & Skill Badges',
  'Exclusive GenAI & Gemini 1.5 API Access',
  '1-on-1 Mentorship from Senior Engineers & Alumni',
  'Priority Registration for Google Solution Challenge',
  'Hands-on Hackathon Incubators & Seed Guidance',
  'Certificates of Recognition Verified by GDG Leads',
];

function GalleryCard({ 
  item, 
  idx, 
  setActivePhotoIndex 
}: { 
  item: GalleryItem; 
  idx: number; 
  setActivePhotoIndex: (idx: number) => void 
}) {
  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIdx((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      onClick={() => setActivePhotoIndex(idx)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIdx(0);
      }}
      className="group relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-xl hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(66,133,244,0.3)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIdx]}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-[2000ms] ease-out brightness-90 group-hover:brightness-100 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

        {/* Slideshow Progress Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIdx ? 'w-4 bg-blue-500' : 'w-1.5 bg-white/40'}`} 
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-blue-600/90 text-white backdrop-blur-md border border-blue-400/40 shadow-md">
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
            <Users className="w-3 h-3 text-blue-400" />
            {item.attendees}
          </span>
        </div>

        {/* Expand icon hover badge */}
        <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="p-6 relative z-10 bg-black">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-2">
          {item.title}
        </h3>
        <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            {item.date}
          </span>
          <span className="flex items-center gap-1.5 font-medium truncate max-w-[140px]">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunityGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredItems = galleryData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const isLightboxOpen = activePhotoIndex !== null && filteredItems.length > 0;

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setActivePhotoIndex((curr) => {
      if (curr === null || filteredItems.length === 0) return null;
      return (curr - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const goToNext = useCallback(() => {
    setActivePhotoIndex((curr) => {
      if (curr === null || filteredItems.length === 0) return null;
      return (curr + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  // Lock body scroll and disable header interactivity when slideshow is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const headers = document.querySelectorAll('header, nav');
    headers.forEach((h) => {
      (h as HTMLElement).style.pointerEvents = 'none';
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      headers.forEach((h) => {
        (h as HTMLElement).style.pointerEvents = '';
      });
    };
  }, [isLightboxOpen, closeLightbox, goToPrev, goToNext]);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-[#F5F7FA]">
      {/* Background Blobs */}
      <div
        className="blob"
        style={{
          width: 700,
          height: 600,
          background: 'radial-gradient(ellipse, #4285F4 0%, #34A853 55%, transparent 100%)',
          top: -200,
          right: -150,
          opacity: 0.13,
        }}
      />
      <div
        className="blob"
        style={{
          width: 500,
          height: 400,
          background: 'radial-gradient(ellipse, #FBBC05 0%, #EA4335 55%, transparent 100%)',
          bottom: 40,
          left: -120,
          opacity: 0.09,
          animationDelay: '4s',
        }}
      />
      <div
        className="blob"
        style={{
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, #4285F4 0%, transparent 70%)',
          top: '30%',
          left: '25%',
          opacity: 0.05,
          animationDelay: '8s',
        }}
      />

      {/* Dot Grid Texture */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="green" className="mb-4">
            Moments &amp; Memories
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Community <span className="text-gradient-google">Showcase</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Relive the high-energy hackathons, technical workshops, campus meetups, and devfests captured through our lens at RMKEC.
          </p>
        </div>

        {/* Community Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#4285F4] block font-heading">1,500+</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Event Attendees</span>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#EA4335] block font-heading">25+</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Major Events</span>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#FBBC05] block font-heading">100+</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Hours of Coding</span>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#34A853] block font-heading">45+</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Core Mentors</span>
          </div>
        </div>

        {/* Filter Bar Box */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-black text-white p-4 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(66,133,244,0.5)] border border-blue-400/50'
                    : 'bg-zinc-900 text-slate-300 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <Input
              placeholder="Search gallery moments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4 text-blue-400" />}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <GalleryCard 
                key={item.id} 
                item={item} 
                idx={idx} 
                setActivePhotoIndex={setActivePhotoIndex} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Full-Screen Image Slideshow Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && activePhotoIndex !== null && (
            <div
              className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 select-none"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Gallery Slideshow"
            >
              {/* Top Bar */}
              <div
                className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md tracking-wider">
                  {activePhotoIndex + 1} / {filteredItems.length}
                </span>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="rounded-full p-2.5 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-lg active:scale-95"
                  aria-label="Close slideshow (Escape)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Prev Navigation Arrow */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 sm:p-4 text-white bg-white/10 hover:bg-white/25 border border-white/20 hover:border-blue-400/60 backdrop-blur-md transition-all duration-200 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer active:scale-90"
                  aria-label="Previous photo (Left arrow key)"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>
              )}

              {/* Next Navigation Arrow */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 sm:p-4 text-white bg-white/10 hover:bg-white/25 border border-white/20 hover:border-blue-400/60 backdrop-blur-md transition-all duration-200 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer active:scale-90"
                  aria-label="Next photo (Right arrow key)"
                >
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </button>
              )}

              {/* Image Container (Pure Image, No Descriptions) */}
              <motion.div
                key={activePhotoIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[82vh] w-full flex items-center justify-center p-2 z-10"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[80vh] w-auto max-w-full flex items-center justify-center">
                  <Image
                    src={filteredItems[activePhotoIndex].image}
                    alt={filteredItems[activePhotoIndex].title}
                    width={1200}
                    height={800}
                    className="max-h-[78vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl select-none"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Member Perks & Benefits Section */}
        <div className="mb-20 rounded-3xl border border-white/15 bg-black text-white p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="yellow" className="mb-3">
              Developer Ecosystem
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Member Perks &amp; <span className="text-gradient-google">Benefits</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
              Join GDG RMKEC to unlock official Google developer resources, mentorship, and cloud credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-start gap-3 rounded-xl bg-zinc-950 p-4 border border-white/15 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(52,168,83,0.2)] transition-all duration-300"
              >
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white font-semibold">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/join">
            <MagneticButton variant="google" size="lg">
              <span>Join GDG Community Now</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
