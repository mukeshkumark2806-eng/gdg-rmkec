'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface EventGalleryProps {
  eventName: string;
  images: GalleryImage[];
  description?: string;
  eventDate?: string;
  eventLocation?: string;
  eventCategory?: string;
  badgeText?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export const EventGallery: React.FC<EventGalleryProps> = ({
  eventName,
  images = [],
  description,
  eventDate,
  eventLocation,
  eventCategory,
  badgeText,
  autoPlay = true,
  autoPlayInterval = 3500,
  className = '',
}) => {
  // In-box slideshow state
  const [[currentSlide, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  // Full-screen lightbox state
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const totalImages = images.length;
  const activeSlideIndex = ((currentSlide % totalImages) + totalImages) % totalImages;

  // In-box slide navigation
  const paginate = useCallback(
    (newDirection: number) => {
      if (totalImages <= 1) return;
      setSlide(([curr]) => [curr + newDirection, newDirection]);
    },
    [totalImages]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeSlideIndex) return;
      const newDirection = index > activeSlideIndex ? 1 : -1;
      setSlide([index, newDirection]);
    },
    [activeSlideIndex]
  );

  // Auto-advance in-box slideshow
  useEffect(() => {
    if (!autoPlay || isHovered || isFullscreenOpen || totalImages <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isHovered, isFullscreenOpen, autoPlayInterval, paginate, totalImages]);

  // Full-screen lightbox controls & Header lock
  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = useCallback(() => {
    setIsFullscreenOpen(false);
  }, []);

  useEffect(() => {
    if (!isFullscreenOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Save previous body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Disable pointer events on header so it stays behind and non-interactable
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
  }, [isFullscreenOpen, closeFullscreen, paginate]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Event Header Block */}
      <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {badgeText && (
              <span className="chip chip-blue text-[11px] py-0.5 px-3">
                <Sparkles className="w-3 h-3 text-[#4285F4]" />
                {badgeText}
              </span>
            )}
            {eventCategory && (
              <span className="text-[11px] font-mono text-[#5F6B7A] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                {eventCategory}
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight font-heading">
            {eventName}
          </h3>

          {description && (
            <p className="mt-1 text-sm text-[#5F6B7A] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Metadata Badges */}
        {(eventDate || eventLocation) && (
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#5F6B7A] shrink-0 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
            {eventDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>{eventDate}</span>
              </div>
            )}
            {eventLocation && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                <span className="truncate max-w-[180px]">{eventLocation}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main In-Box Slideshow Container */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slideshow Display Stage */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[440px] overflow-hidden flex items-center justify-center bg-black/40">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 280, damping: 28 },
                opacity: { duration: 0.25 },
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <img
                src={images[activeSlideIndex].src}
                alt={images[activeSlideIndex].alt || `Slide ${activeSlideIndex + 1}`}
                className="w-full h-full object-cover select-none"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 sm:p-3 text-white bg-black/40 hover:bg-black/80 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={() => paginate(1)}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 sm:p-3 text-white bg-black/40 hover:bg-black/80 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}

          {/* Top-Right Expand Button */}
          <button
            type="button"
            onClick={openFullscreen}
            className="absolute top-3.5 right-3.5 z-10 rounded-full p-2 text-white bg-black/40 hover:bg-black/80 border border-white/20 backdrop-blur-md transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            aria-label="Open full-screen view"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Bottom Controls: Counter Badge and Dots */}
          <div className="absolute bottom-3.5 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
            {/* Slide Counter */}
            <span className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md pointer-events-auto">
              {activeSlideIndex + 1} / {totalImages}
            </span>

            {/* Interactive Dot Indicators */}
            {totalImages > 1 && (
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 pointer-events-auto">
                {images.map((_, dotIdx) => (
                  <button
                    key={`dot-${dotIdx}`}
                    onClick={() => goToSlide(dotIdx)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 cursor-pointer',
                      dotIdx === activeSlideIndex
                        ? 'w-6 bg-white shadow-sm'
                        : 'w-2 bg-white/40 hover:bg-white/75'
                    )}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        {totalImages > 1 && (
          <div className="p-3 bg-white/95 border-t border-slate-200/80 flex items-center gap-2.5 overflow-x-auto hide-scrollbar">
            {images.map((img, thumbIdx) => {
              const isActive = thumbIdx === activeSlideIndex;
              return (
                <button
                  key={`thumb-${thumbIdx}`}
                  onClick={() => goToSlide(thumbIdx)}
                  className={cn(
                    'relative h-14 sm:h-16 flex-1 min-w-[60px] sm:min-w-[70px] rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer shrink-0',
                    isActive
                      ? 'ring-2 ring-blue-500 border-blue-500 shadow-md scale-100'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:scale-[1.02]'
                  )}
                  aria-label={`Jump to image ${thumbIdx + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt || `Thumb ${thumbIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-Screen Slideshow Overlay */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 select-none"
            onClick={closeFullscreen}
            role="dialog"
            aria-modal="true"
            aria-label={`${eventName} Fullscreen Slideshow`}
          >
            {/* Top Bar */}
            <div
              className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md tracking-wider">
                  {activeSlideIndex + 1} / {totalImages}
                </span>
                <span className="text-white/80 text-sm font-semibold hidden sm:inline-block font-heading">
                  {eventName}
                </span>
              </div>

              <button
                type="button"
                onClick={closeFullscreen}
                className="rounded-full p-2.5 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-lg active:scale-95"
                aria-label="Close fullscreen (Escape)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Prev Arrow Button */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 sm:p-4 text-white bg-white/10 hover:bg-white/25 border border-white/20 hover:border-blue-400/60 backdrop-blur-md transition-all duration-200 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer active:scale-90"
                aria-label="Previous photo (Left arrow key)"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            )}

            {/* Next Arrow Button */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 sm:p-4 text-white bg-white/10 hover:bg-white/25 border border-white/20 hover:border-blue-400/60 backdrop-blur-md transition-all duration-200 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer active:scale-90"
                aria-label="Next photo (Right arrow key)"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            )}

            {/* Fullscreen Image Stage (Pure Image, No Descriptions) */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[82vh] w-full flex items-center justify-center p-2 z-10"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[80vh] w-auto max-w-full flex items-center justify-center">
                <img
                  src={images[activeSlideIndex].src}
                  alt={images[activeSlideIndex].alt || `Slide ${activeSlideIndex + 1}`}
                  className="max-h-[78vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl select-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default EventGallery;
