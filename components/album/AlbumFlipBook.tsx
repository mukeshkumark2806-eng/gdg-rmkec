'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  BookOpen,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { AlbumPhoto, EventAlbum, EventCategory } from '@/app/album/page';

interface AlbumFlipBookProps {
  album: EventAlbum;
  photos: AlbumPhoto[];
  onPhotoClick?: (photo: AlbumPhoto) => void;
  onClose?: () => void;
  onSelectNextAlbum?: (nextAlbumName: EventCategory) => void;
  nextAlbumName?: EventCategory;
}

interface FlippingState {
  direction: 'next' | 'prev';
  fromSpread: number;
  toSpread: number;
}

export const AlbumFlipBook: React.FC<AlbumFlipBookProps> = ({
  album,
  photos,
  onPhotoClick,
  onSelectNextAlbum,
  nextAlbumName,
}) => {
  // Spreads:
  // Spread 0: Front Cover
  // Spread 1..totalPhotoSpreads: 2-page photo spreads (Left = 2k-2, Right = 2k-1)
  // Spread totalPhotoSpreads + 1: Back Cover (Commemorative summary)
  const totalPhotoSpreads = Math.ceil(photos.length / 2);
  const maxSpreadIndex = totalPhotoSpreads + 1;

  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [flippingState, setFlippingState] = useState<FlippingState | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ALWAYS reset spread to beginning (Spread 0: Front Cover) when a new album is opened
  useEffect(() => {
    setCurrentSpread(0);
    setFlippingState(null);
    setIsAutoPlaying(false);
  }, [album.id, album.name]);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const poolIndexRef = useRef<number>(0);

  // Preload original studio-recorded paper flipping sounds
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      // Create a pool of audio instances for instant, seamless playback on consecutive flips
      const pool = [
        new Audio('/sounds/pageflip.wav'),
        new Audio('/sounds/pageflip.wav'),
        new Audio('/sounds/page-flip.mp3'),
        new Audio('/sounds/pageflip.wav'),
      ];
      pool.forEach((aud) => {
        aud.preload = 'auto';
        aud.volume = 0.95;
      });
      audioPoolRef.current = pool;
    } catch {
      // Audio initialization error
    }
  }, []);

  // Play original paper flipping sound
  const playPageTurnSound = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (audioPoolRef.current.length > 0) {
        const aud = audioPoolRef.current[poolIndexRef.current % audioPoolRef.current.length];
        poolIndexRef.current = (poolIndexRef.current + 1) % audioPoolRef.current.length;
        aud.currentTime = 0;
        aud.volume = 0.95;
        aud.play().catch(() => {
          // Fallback if needed
          const fallback = new Audio('/sounds/pageflip.wav');
          fallback.volume = 0.95;
          fallback.play().catch(() => {});
        });
      } else {
        const fresh = new Audio('/sounds/pageflip.wav');
        fresh.volume = 0.95;
        fresh.play().catch(() => {});
      }
    } catch {
      // Audio autoplay blocked or unsupported
    }
  }, [soundEnabled]);

  // Turn page forward (Right to Left flip)
  const turnNextPage = useCallback(() => {
    if (flippingState || currentSpread >= maxSpreadIndex) return;
    const from = currentSpread;
    const to = currentSpread + 1;
    playPageTurnSound();
    setFlippingState({ direction: 'next', fromSpread: from, toSpread: to });
  }, [flippingState, currentSpread, maxSpreadIndex, playPageTurnSound]);

  // Turn page backward (Left to Right flip)
  const turnPrevPage = useCallback(() => {
    if (flippingState || currentSpread <= 0) return;
    const from = currentSpread;
    const to = currentSpread - 1;
    playPageTurnSound();
    setFlippingState({ direction: 'prev', fromSpread: from, toSpread: to });
  }, [flippingState, currentSpread, playPageTurnSound]);

  // Complete flip animation
  const handleFlipComplete = useCallback(() => {
    if (!flippingState) return;
    setCurrentSpread(flippingState.toSpread);
    setFlippingState(null);
  }, [flippingState]);

  // Direct jump to a specific spread
  const jumpToSpread = (index: number) => {
    if (flippingState || index === currentSpread) return;
    playPageTurnSound();
    setFlippingState({
      direction: index > currentSpread ? 'next' : 'prev',
      fromSpread: currentSpread,
      toSpread: index,
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        turnNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        turnPrevPage();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnNextPage, turnPrevPage]);

  // Auto-play timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        if (currentSpread >= maxSpreadIndex) {
          setIsAutoPlaying(false);
          return;
        }
        turnNextPage();
      }, 4500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, currentSpread, maxSpreadIndex, turnNextPage]);

  // Helper to render the content of a single page (Left or Right)
  const renderPage = (
    spreadIndex: number,
    side: 'left' | 'right',
    options?: { isInteractive?: boolean; isTurning?: boolean }
  ) => {
    const { isInteractive = true, isTurning = false } = options || {};

    // ─── CASE 1: FRONT COVER (Spread 0) ───────────────────────────
    if (spreadIndex === 0) {
      if (side === 'left') {
        // Inside front cover (blank elegant textured endpaper)
        return (
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#111218] rounded-l-2xl border-r border-white/10 select-none">
            <div className="flex items-center gap-2 text-xs font-mono text-white/40">
              <Sparkles className="h-3.5 w-3.5 text-[#4285F4]" />
              <span>GDG on Campus RMKEC</span>
            </div>
            <div className="text-center my-auto p-4 rounded-2xl bg-white/[0.02] border border-white/08 max-w-xs mx-auto">
              <BookOpen className="h-8 w-8 text-[#4285F4] mx-auto mb-2 opacity-60" />
              <p className="text-xs font-mono text-white/50 italic">
                &ldquo;Dedicated to the passionate developers, builders, and community of RMKEC.&rdquo;
              </p>
            </div>
            <div className="text-[10px] font-mono text-white/30 text-center">
              Official Chapter Archive • 2025–2026
            </div>
          </div>
        );
      }

      // Spread 0 Right Side = FRONT COVER
      return (
        <div
          onClick={isInteractive ? turnNextPage : undefined}
          className="w-full h-full p-6 sm:p-8 flex flex-col items-center justify-between text-center relative overflow-hidden group cursor-pointer bg-gradient-to-b from-[#1c1e28] via-[#14151e] to-[#0c0d12] rounded-r-2xl select-none"
        >
          {/* Subtle Cover Light Beam & Gold Border */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${album.color}60, transparent 70%)`,
            }}
          />
          <div className="absolute inset-2.5 rounded-xl border border-white/15 pointer-events-none" />

          {/* Left Spine Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent border-r border-white/10" />

          {/* Top Badge */}
          <div className="relative z-10 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[11px] font-mono">
              <Sparkles className="h-3 w-3 text-[#FBBC05]" />
              GDG on Campus RMKEC
            </span>
          </div>

          {/* Cover Photo */}
          <div className="relative z-10 my-auto flex flex-col items-center">
            <div className="relative w-44 sm:w-56 aspect-[16/11] rounded-2xl p-2 bg-[#1a1b24] border border-white/25 shadow-2xl mb-4 transform group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-xl overflow-hidden bg-black">
                <img
                  src={album.coverImage}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 right-3 font-mono text-[9px] px-2 py-0.5 rounded-full bg-black/90 border border-white/20 text-white font-bold">
                {album.year}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-[#4285F4] transition-colors">
              {album.name}
            </h3>
            <p className="text-xs text-white/70 mt-1 max-w-xs">{album.tagline}</p>
          </div>

          {/* Bottom Action Prompt */}
          <div className="relative z-10 pb-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4285F4] text-white text-xs font-semibold shadow-lg group-hover:shadow-[0_0_20px_rgba(66,133,244,0.6)] group-hover:scale-105 transition-all">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Click Page to Open Book →</span>
            </span>
          </div>

          {/* Corner Dog-Ear Hint */}
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
            <div
              className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-[40px] border-r-[40px] border-t-transparent group-hover:scale-110 transition-transform origin-bottom-right"
              style={{ borderRightColor: album.color }}
            />
            <span className="absolute bottom-1 right-1 text-[8px] font-mono font-bold text-white uppercase">
              ❯
            </span>
          </div>
        </div>
      );
    }

    // ─── CASE 2: BACK COVER (Final Spread) ─────────────────────────
    if (spreadIndex === maxSpreadIndex) {
      if (side === 'left') {
        // Commemorative Left Page: Event Stats & Highlights
        return (
          <div
            onClick={isInteractive ? turnPrevPage : undefined}
            className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#121319] rounded-l-2xl border-r border-white/10 select-none cursor-pointer group"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold block mb-1">
                Event Milestone
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {album.name}
              </h3>
              <p className="text-xs text-white/75 leading-relaxed mb-4">
                {album.description}
              </p>

              <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Photos:</span>
                  <span className="font-bold text-white">{photos.length} Captures</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Venue:</span>
                  <span className="font-bold text-white truncate max-w-[160px]">
                    {album.location.split(',')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Attendees:</span>
                  <span className="font-bold text-[#FBBC05]">{album.attendees}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/08 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>❮ Click to turn back</span>
              <span>— Endpaper —</span>
            </div>
          </div>
        );
      }

      // Spread Final Right Side = BACK COVER
      return (
        <div className="w-full h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#1a1b24] via-[#12131a] to-[#0b0c10] rounded-r-2xl border-l border-white/10 select-none relative">
          <div className="w-14 h-14 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center mb-4 shadow-xl">
            <CheckCircle2 className="h-7 w-7 text-[#34A853]" />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold mb-1">
            Completed Album
          </span>
          <h4 className="text-2xl font-bold text-white mb-2">That’s a Wrap!</h4>
          <p className="text-xs text-white/70 max-w-xs mb-6">
            You’ve explored all {photos.length} memories from {album.name}.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {nextAlbumName && onSelectNextAlbum && (
              <button
                type="button"
                onClick={() => onSelectNextAlbum(nextAlbumName)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EA4335] hover:bg-[#d33426] text-white font-semibold text-xs transition-all shadow-md cursor-pointer group"
              >
                <span>Next Album: {nextAlbumName}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
            <button
              type="button"
              onClick={() => jumpToSpread(0)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4285F4] hover:bg-[#3367d6] text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Flip from Start</span>
            </button>
            <button
              type="button"
              onClick={turnPrevPage}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs transition-all cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous Page</span>
            </button>
          </div>
        </div>
      );
    }

    // ─── CASE 3: INSIDE PHOTO SPREAD (1 to totalPhotoSpreads) ───────
    const photoIdx = side === 'left' ? (spreadIndex - 1) * 2 : (spreadIndex - 1) * 2 + 1;
    const photo = photos[photoIdx];
    const pageNumber = side === 'left' ? spreadIndex * 2 - 1 : spreadIndex * 2;

    if (!photo) {
      // Blank page at end of odd-numbered album
      return (
        <div
          onClick={isInteractive ? turnNextPage : undefined}
          className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-[#13141a] rounded-r-2xl select-none cursor-pointer"
        >
          <BookOpen className="h-8 w-8 text-white/30 mb-2" />
          <h4 className="text-sm font-bold text-white mb-1">Next: Album Summary</h4>
          <p className="text-xs text-white/50">Click to view event milestone ❯</p>
        </div>
      );
    }

    const handleClick = () => {
      if (!isInteractive || isTurning) return;
      if (side === 'left') {
        turnPrevPage();
      } else {
        turnNextPage();
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`w-full h-full p-4 sm:p-6 flex flex-col justify-between select-none relative group/page cursor-pointer bg-[#14151c] ${
          side === 'left'
            ? 'rounded-l-2xl border-r border-white/10'
            : 'rounded-r-2xl border-l border-white/05'
        }`}
        style={{
          boxShadow:
            side === 'left'
              ? 'inset -14px 0 22px rgba(0,0,0,0.5)'
              : 'inset 14px 0 22px rgba(0,0,0,0.5)',
        }}
      >
        {/* Photo Mounted on Matte Paper */}
        <div className="flex flex-col h-full justify-between">
          <div className="relative w-full rounded-2xl p-2 bg-[#1b1c26] border border-white/15 shadow-xl group/photo overflow-hidden mb-3">
            <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-black">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105 pointer-events-none"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Enlarge Icon */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoClick?.(photo);
                }}
                aria-label="View photo in fullscreen"
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/80 border border-white/20 text-white/80 hover:text-white hover:bg-black transition-all cursor-pointer z-20 opacity-80 group-hover/photo:opacity-100 shadow-md"
                title="Enlarge Photo"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>

              {/* Photo Index Badge */}
              <div className="absolute bottom-2 left-2.5 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/85 border border-white/15 text-white/90">
                Photo #{photoIdx + 1}
              </div>
            </div>
          </div>

          {/* Caption & Metadata */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-1 group-hover/page:text-[#4285F4] transition-colors">
                {photo.title}
              </h4>
              <p className="text-xs text-white/75 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2">
                {photo.caption}
              </p>
            </div>

            <div className="pt-2 border-t border-white/08 flex items-center justify-between text-[11px] font-mono text-white/50">
              <span className="flex items-center gap-1 truncate max-w-[180px]">
                {side === 'left' ? (
                  <>
                    <MapPin className="h-3 w-3 text-[#EA4335] shrink-0" />
                    <span className="truncate">{photo.location.split(',')[0]}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="h-3 w-3 text-[#FBBC05] shrink-0" />
                    <span className="truncate">{photo.date}</span>
                  </>
                )}
              </span>
              <span className="text-white/40 font-medium">
                — Page {pageNumber} —
              </span>
            </div>
          </div>
        </div>

        {/* Corner Dog-Ear Cue */}
        {side === 'right' ? (
          <div className="absolute bottom-1.5 right-2 z-10 flex items-center gap-1 font-mono text-[10px] text-white/30 group-hover/page:text-white/80 transition-colors pointer-events-none">
            <span className="hidden sm:inline">Turn Page</span>
            <span>❯</span>
          </div>
        ) : (
          <div className="absolute bottom-1.5 left-2 z-10 flex items-center gap-1 font-mono text-[10px] text-white/30 group-hover/page:text-white/80 transition-colors pointer-events-none">
            <span>❮</span>
            <span className="hidden sm:inline">Turn Page</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* ─── Top Controls Header ─────────────────────────────────── */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-2 py-2 mb-3 text-xs font-mono border-b border-white/10 text-white/70">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#4285F4]" />
          <span className="text-white font-semibold">{album.name}</span>
          <span className="text-white/40">•</span>
          <span className="text-[#FBBC05]">
            {currentSpread === 0
              ? 'Front Cover'
              : currentSpread === maxSpreadIndex
              ? 'Back Cover'
              : `Spread ${currentSpread} of ${totalPhotoSpreads} (${photos.length} Photos)`}
          </span>
          {nextAlbumName && onSelectNextAlbum && (
            <>
              <span className="text-white/30 hidden md:inline">•</span>
              <button
                type="button"
                onClick={() => onSelectNextAlbum(nextAlbumName)}
                className="hidden md:inline-flex items-center gap-1 text-white/60 hover:text-[#4285F4] transition-colors cursor-pointer"
                title={`Jump to next album: ${nextAlbumName}`}
              >
                <span>Next: {nextAlbumName}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline-flex text-[11px] text-white/40 items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white/70">
              Click page
            </span>{' '}
            or{' '}
            <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white/70">
              ← →
            </span>{' '}
            to flip
          </span>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-label={soundEnabled ? 'Mute page flip sound' : 'Enable page flip sound'}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                : 'bg-black/40 border-white/10 text-white/40 hover:text-white'
            }`}
            title={soundEnabled ? 'Flip sound enabled' : 'Flip sound muted'}
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          {/* Auto-turn Pages */}
          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] transition-all cursor-pointer ${
              isAutoPlaying
                ? 'bg-[#34A853]/20 border-[#34A853]/40 text-[#34A853] font-bold shadow-[0_0_12px_rgba(52,168,83,0.3)]'
                : 'bg-white/08 border-white/15 text-white/70 hover:text-white hover:bg-white/15'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3 w-3" />
                <span>Auto-Flipping</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Auto-Turn</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── 3D BOOK STAGE ───────────────────────────────────────── */}
      <div
        className="relative w-full max-w-5xl my-2 flex items-center justify-center"
        style={{ perspective: '3000px' }}
      >
        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={turnPrevPage}
          disabled={currentSpread === 0 || flippingState !== null}
          aria-label="Previous page"
          className={`absolute -left-3 sm:-left-6 lg:-left-8 z-40 p-2.5 sm:p-3 rounded-full border backdrop-blur-md shadow-2xl transition-all cursor-pointer ${
            currentSpread === 0
              ? 'opacity-20 cursor-not-allowed border-white/05 bg-black/40 text-white/30'
              : 'border-white/25 bg-black/80 text-white hover:bg-[#4285F4] hover:border-[#4285F4] hover:scale-110 active:scale-95'
          }`}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={() => {
            if (currentSpread === maxSpreadIndex && nextAlbumName && onSelectNextAlbum) {
              onSelectNextAlbum(nextAlbumName);
            } else {
              turnNextPage();
            }
          }}
          disabled={(currentSpread === maxSpreadIndex && !onSelectNextAlbum) || flippingState !== null}
          aria-label={currentSpread === maxSpreadIndex && nextAlbumName ? `Next Album: ${nextAlbumName}` : 'Next page'}
          title={currentSpread === maxSpreadIndex && nextAlbumName ? `Next Album: ${nextAlbumName}` : 'Next page'}
          className={`absolute -right-3 sm:-right-6 lg:-right-8 z-40 p-2.5 sm:p-3 rounded-full border backdrop-blur-md shadow-2xl transition-all cursor-pointer ${
            currentSpread === maxSpreadIndex && !onSelectNextAlbum
              ? 'opacity-20 cursor-not-allowed border-white/05 bg-black/40 text-white/30'
              : currentSpread === maxSpreadIndex
              ? 'border-[#EA4335]/60 bg-[#EA4335] text-white hover:bg-[#d33426] hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(234,67,53,0.5)]'
              : 'border-white/25 bg-black/80 text-white hover:bg-[#4285F4] hover:border-[#4285F4] hover:scale-110 active:scale-95'
          }`}
        >
          {currentSpread === maxSpreadIndex && nextAlbumName && onSelectNextAlbum ? (
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>

        {/* Physical Book Cover Frame */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 bg-gradient-to-br from-[#20222a] via-[#14151b] to-[#0a0a0d] border border-white/15 shadow-[0_24px_65px_rgba(0,0,0,0.85),0_0_35px_rgba(66,133,244,0.12)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ribbon Bookmark Peeking from Top Center */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-8 sm:h-10 z-40 pointer-events-none shadow-md"
            style={{
              background: `linear-gradient(to bottom, ${album.color}, ${album.color}bb)`,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)',
            }}
          />

          {/* Book Pages Arena */}
          <div
            className="relative w-full min-h-[460px] sm:min-h-[510px] md:min-h-[550px] rounded-xl sm:rounded-2xl shadow-inner flex flex-col md:flex-row bg-[#111217]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ──── STATIC UNDERLYING LEFT PAGE (0% to 50%) ─────── */}
            <div className="relative w-full md:w-1/2 h-full min-h-[230px] md:min-h-[550px]">
              {flippingState?.direction === 'next'
                ? renderPage(flippingState.fromSpread, 'left', { isInteractive: false })
                : flippingState?.direction === 'prev'
                ? renderPage(flippingState.toSpread, 'left', { isInteractive: false })
                : renderPage(currentSpread, 'left')}

              {/* Dynamic shadow on left page as page turns onto it */}
              {flippingState?.direction === 'next' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.45, 0] }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-black pointer-events-none z-10 rounded-l-2xl"
                />
              )}
            </div>

            {/* ──── CENTER BINDING / SPINE (Divider) ─────────────── */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-5 bg-gradient-to-r from-black/80 via-black to-black/80 shadow-[inset_0_0_12px_rgba(0,0,0,0.95)] z-35 pointer-events-none">
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10" />
            </div>

            {/* ──── STATIC UNDERLYING RIGHT PAGE (50% to 100%) ───── */}
            <div className="relative w-full md:w-1/2 h-full min-h-[230px] md:min-h-[550px]">
              {flippingState?.direction === 'next'
                ? renderPage(flippingState.toSpread, 'right', { isInteractive: false })
                : flippingState?.direction === 'prev'
                ? renderPage(flippingState.fromSpread, 'right', { isInteractive: false })
                : renderPage(currentSpread, 'right')}

              {/* Dynamic shadow on right page as left page turns onto it */}
              {flippingState?.direction === 'prev' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.45, 0] }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-l from-transparent to-black pointer-events-none z-10 rounded-r-2xl"
                />
              )}
            </div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 3D TURNING PAPER LEAF (NEXT: FLIPS RIGHT TO LEFT)   */}
            {/* ═══════════════════════════════════════════════════ */}
            {flippingState?.direction === 'next' && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{
                  duration: 0.65,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
                onAnimationComplete={handleFlipComplete}
                className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1/2 z-30"
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front Face of Turning Leaf (Visible from 0deg to -90deg) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl rounded-r-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderPage(flippingState.fromSpread, 'right', {
                    isInteractive: false,
                    isTurning: true,
                  })}
                  {/* Specular lighting / curl gradient on front */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.55, 0] }}
                    transition={{ duration: 0.65 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/60 via-white/15 to-transparent pointer-events-none rounded-r-2xl"
                  />
                </div>

                {/* Back Face of Turning Leaf (Visible from -90deg to -180deg) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl rounded-l-2xl"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderPage(flippingState.toSpread, 'left', {
                    isInteractive: false,
                    isTurning: true,
                  })}
                  {/* Soft landing shadow on back face */}
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 0.15, 0] }}
                    transition={{ duration: 0.65 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent pointer-events-none rounded-l-2xl"
                  />
                </div>
              </motion.div>
            )}

            {/* ═══════════════════════════════════════════════════ */}
            {/* 3D TURNING PAPER LEAF (PREV: FLIPS LEFT TO RIGHT)   */}
            {/* ═══════════════════════════════════════════════════ */}
            {flippingState?.direction === 'prev' && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{
                  duration: 0.65,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
                onAnimationComplete={handleFlipComplete}
                className="hidden md:block absolute top-0 bottom-0 left-0 w-1/2 z-30"
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front Face of Turning Leaf (Visible from 0deg to 90deg) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl rounded-l-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderPage(flippingState.fromSpread, 'left', {
                    isInteractive: false,
                    isTurning: true,
                  })}
                  {/* Specular lighting gradient on front */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.55, 0] }}
                    transition={{ duration: 0.65 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/60 via-white/15 to-transparent pointer-events-none rounded-l-2xl"
                  />
                </div>

                {/* Back Face of Turning Leaf (Visible from 90deg to 180deg) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl rounded-r-2xl"
                  style={{
                    transform: 'rotateY(-180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderPage(flippingState.toSpread, 'right', {
                    isInteractive: false,
                    isTurning: true,
                  })}
                  {/* Soft landing shadow on back face */}
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 0.15, 0] }}
                    transition={{ duration: 0.65 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none rounded-r-2xl"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Page Thickness Edges along Outer Sides */}
          <div className="absolute right-0 top-6 bottom-6 w-2.5 bg-gradient-to-l from-white/15 via-white/05 to-transparent pointer-events-none hidden sm:block rounded-r-3xl" />
          <div className="absolute left-0 top-6 bottom-6 w-2.5 bg-gradient-to-r from-white/15 via-white/05 to-transparent pointer-events-none hidden sm:block rounded-l-3xl" />
        </div>
      </div>

      {/* ─── Bottom Navigation Scrubber Pills ────────────────────── */}
      <div className="mt-4 w-full max-w-4xl flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap px-2">
        <button
          type="button"
          onClick={() => jumpToSpread(0)}
          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
            currentSpread === 0
              ? 'bg-[#4285F4] text-white font-bold shadow-md'
              : 'bg-white/08 text-white/60 hover:text-white hover:bg-white/15'
          }`}
        >
          <span>Cover</span>
        </button>

        {Array.from({ length: totalPhotoSpreads }, (_, i) => {
          const spreadNum = i + 1;
          const p1 = i * 2 + 1;
          const p2 = Math.min(i * 2 + 2, photos.length);
          const isSelected = currentSpread === spreadNum;

          return (
            <button
              key={spreadNum}
              type="button"
              onClick={() => jumpToSpread(spreadNum)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#4285F4] text-white font-bold shadow-md'
                  : 'bg-white/08 text-white/60 hover:text-white hover:bg-white/15'
              }`}
            >
              <span>{p1 === p2 ? `p.${p1}` : `p.${p1}-${p2}`}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => jumpToSpread(maxSpreadIndex)}
          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
            currentSpread === maxSpreadIndex
              ? 'bg-[#34A853] text-white font-bold shadow-md'
              : 'bg-white/08 text-white/60 hover:text-white hover:bg-white/15'
          }`}
        >
          <span>End</span>
        </button>
      </div>
    </div>
  );
};
