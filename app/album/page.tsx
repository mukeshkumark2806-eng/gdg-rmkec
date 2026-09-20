'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  FolderOpen,
  Grid,
  Images,
  ArrowRight,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { eventAlbums, albumPhotos } from '@/data/album';
import { EventCategory, AlbumPhoto, EventAlbum } from '@/types';

export type { EventCategory, AlbumPhoto, EventAlbum };

export default function AlbumPage() {
  // When an album is clicked, this modal opens showing all photos of that event
  const [activeModalAlbum, setActiveModalAlbum] = useState<EventCategory | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number>(0);
  const [modalViewMode, setModalViewMode] = useState<'slideshow' | 'grid'>('slideshow');

  // Fullscreen single-photo lightbox (used inside album modal)
  const [lightboxPhoto, setLightboxPhoto] = useState<AlbumPhoto | null>(null);

  // Photos belonging to the currently opened album in modal
  const activeAlbumPhotos = activeModalAlbum
    ? albumPhotos.filter((p) => p.category === activeModalAlbum)
    : [];

  const activeAlbumData = activeModalAlbum
    ? eventAlbums.find((a) => a.name === activeModalAlbum)
    : null;

  // Open an album
  const handleOpenAlbum = (albumName: EventCategory) => {
    setActiveModalAlbum(albumName);
    setModalPhotoIndex(0);
  };

  // Keyboard navigation for album modal slideshow & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhoto) {
        if (e.key === 'Escape') {
          setLightboxPhoto(null);
        }
        return;
      }

      if (activeModalAlbum && activeAlbumPhotos.length > 0) {
        if (e.key === 'Escape') {
          setActiveModalAlbum(null);
        } else if (e.key === 'ArrowRight') {
          setModalPhotoIndex((prev) => (prev < activeAlbumPhotos.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowLeft') {
          setModalPhotoIndex((prev) => (prev > 0 ? prev - 1 : activeAlbumPhotos.length - 1));
        }
      }
    };

    if (activeModalAlbum || lightboxPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalAlbum, activeAlbumPhotos.length, lightboxPhoto]);

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Google Cloud Campaign':
        return 'border-[#4285F4]/40 bg-[#4285F4]/20 text-blue-300';
      case "HackNEXA'26 Hackathon":
        return 'border-[#EA4335]/40 bg-[#EA4335]/20 text-red-300';
      case 'Agentic AI Study Jam':
        return 'border-[#34A853]/40 bg-[#34A853]/20 text-emerald-300';
      case 'A.C.E - AI Collage Day':
        return 'border-[#FBBC05]/40 bg-[#FBBC05]/20 text-amber-300';
      default:
        return 'border-[#4285F4]/40 bg-[#4285F4]/20 text-blue-300';
    }
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 pt-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EA4335] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>Event Photography &amp; Archives</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Event Album
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            A visual chronicle of Google Cloud Campaign, HackNEXA&apos;26 Hackathon, Agentic AI Study Jam,
            and A.C.E - AI Collage Day at Google Developer Group on Campus RMKEC.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
              <span>4 Flagship Albums</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
              <span>{albumPhotos.length} Captured Photos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              <span>650+ Teams &amp; 1,000+ Learners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
              <span>40+ Cloud Completers</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4 ALBUMS IN A ROW (COMPACT SIZE)                            */}
        {/* ============================================================ */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-[#4285F4]" />
              <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Select an Event Album
              </h2>
              <span className="text-xs text-white/40 font-mono">(4 Flagship Events)</span>
            </div>
            <span className="text-xs text-white/50 font-mono hidden sm:inline-block">
              Click album to open all event photos
            </span>
          </div>

          {/* Responsive grid: 1 col on mobile, 2 cols on tablet, exactly 4 in a row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventAlbums.map((album) => {
              const eventPhotoCount = albumPhotos.filter((p) => p.category === album.name).length;
              const isSelected = activeModalAlbum === album.name;

              return (
                <div
                  key={album.id}
                  onClick={() => handleOpenAlbum(album.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOpenAlbum(album.name)}
                  aria-label={`Open ${album.name} album`}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-white/40 ring-2 ring-[#4285F4]/50 bg-[#15151c] shadow-[0_12px_28px_rgba(0,0,0,0.8)] -translate-y-1'
                      : 'border-white/12 bg-black/60 hover:border-white/30 hover:bg-[#121218] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {/* Compact Cover Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#121216]">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                        album.id === 'ace-collage' ? 'object-cover object-top' : 'object-cover'
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white">
                        {album.year}
                      </span>
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white/90 flex items-center gap-1">
                        <Images className="h-2.5 w-2.5 text-[#4285F4]" />
                        {eventPhotoCount} Photos
                      </span>
                    </div>

                    {/* Hover Prompt Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4285F4] text-white text-xs font-semibold shadow-lg">
                        <FolderOpen className="h-3.5 w-3.5" />
                        View All {eventPhotoCount} Photos
                      </span>
                    </div>
                  </div>

                  {/* Album Compact Meta Content */}
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${album.badgeBg} ${album.badgeBorder} ${album.badgeText}`}
                        >
                          {album.date}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-[#4285F4] font-semibold">
                            Active
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-[#4285F4] transition-colors line-clamp-1">
                        {album.name}
                      </h3>
                      <p className="text-[11px] text-white/65 mt-0.5 line-clamp-1">
                        {album.tagline}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-3 pt-2.5 border-t border-white/08 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white/50 truncate max-w-[130px]">
                        {album.location.split(',')[0]}
                      </span>
                      <span className="text-[#4285F4] group-hover:text-white flex items-center gap-0.5 transition-colors font-semibold">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Join upcoming events CTA */}
        <div className="text-center p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#121216]/60 backdrop-blur-md">
          <h3 className="text-2xl font-bold text-white mb-2">Be Part of the Next Album</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mb-6">
            Attend HackNEXA’26, join our next Agentic AI jam, and shape the next chapter of memories.
          </p>
          <GlowButton href="/events" shape="pill" size="lg">
            Explore Upcoming Events →
          </GlowButton>
        </div>
      </div>

      {/* ============================================================ */}
      {/* EVENT ALBUM MODAL (SHOWS ALL PHOTOS OF THE CLICKED EVENT)   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModalAlbum && activeAlbumData && activeAlbumPhotos.length > 0 && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActiveModalAlbum(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalAlbum(null)}
              aria-label="Close album viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/75 border border-white/20 text-white/80 hover:text-white hover:bg-black transition-all cursor-pointer z-30 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl xl:max-w-7xl w-full rounded-3xl border border-white/20 bg-[#121216] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Top Modal Navigation & Album Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${activeAlbumData.badgeBg} ${activeAlbumData.badgeBorder} ${activeAlbumData.badgeText}`}
                    >
                      {activeAlbumData.year}
                    </span>
                    <span className="font-mono text-xs text-white/60">
                      {activeAlbumData.date} • {activeAlbumData.location.split(',')[0]}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <FolderOpen
                      className="h-5 w-5 shrink-0"
                      style={{ color: activeAlbumData.color }}
                    />
                    <span>{activeAlbumData.name}</span>
                    <span className="text-xs font-mono text-white/50 font-normal">
                      ({activeAlbumPhotos.length} Photos)
                    </span>
                  </h2>
                </div>

                {/* View Mode Toggle: Slideshow vs Grid */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="p-1 rounded-full bg-white/08 border border-white/10 flex items-center">
                    <button
                      type="button"
                      onClick={() => setModalViewMode('slideshow')}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        modalViewMode === 'slideshow'
                          ? 'bg-[#4285F4] text-white font-semibold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Images className="h-3 w-3" />
                      Slideshow
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalViewMode('grid')}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        modalViewMode === 'grid'
                          ? 'bg-[#4285F4] text-white font-semibold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Grid className="h-3 w-3" />
                      Grid (All {activeAlbumPhotos.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                {modalViewMode === 'slideshow' ? (
                  /* Slideshow View: Large preview on left + thumbnails on the right */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Left: Main Photo Preview + Active Info Card */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
                      {/* Main Photo Preview */}
                      <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[280px] sm:min-h-[380px] max-h-[54vh] border border-white/10 group shadow-xl">
                        <img
                          src={activeAlbumPhotos[modalPhotoIndex].image}
                          alt={activeAlbumPhotos[modalPhotoIndex].title}
                          className="max-h-[54vh] w-full object-contain"
                          decoding="async"
                        />

                        {/* Prev Photo Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalPhotoIndex((prev) =>
                              prev > 0 ? prev - 1 : activeAlbumPhotos.length - 1
                            );
                          }}
                          aria-label="Previous photo in this album"
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:scale-110 transition-all cursor-pointer"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        {/* Next Photo Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalPhotoIndex((prev) =>
                              prev < activeAlbumPhotos.length - 1 ? prev + 1 : 0
                            );
                          }}
                          aria-label="Next photo in this album"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:scale-110 transition-all cursor-pointer"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>

                        {/* Expand Button */}
                        <button
                          type="button"
                          onClick={() => setLightboxPhoto(activeAlbumPhotos[modalPhotoIndex])}
                          aria-label="View photo in fullscreen"
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>

                        <div className="absolute bottom-3 right-3 font-mono text-[11px] px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white">
                          Photo {modalPhotoIndex + 1} of {activeAlbumPhotos.length}
                        </div>
                      </div>

                      {/* Active Photo Info Card */}
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                          {activeAlbumPhotos[modalPhotoIndex].title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-3">
                          {activeAlbumPhotos[modalPhotoIndex].caption}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mb-3 pt-2 border-t border-white/10">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#EA4335]" />
                            {activeAlbumPhotos[modalPhotoIndex].location}
                          </span>
                          {activeAlbumPhotos[modalPhotoIndex].attendees && (
                            <span className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-[#34A853]" />
                              {activeAlbumPhotos[modalPhotoIndex].attendees}
                            </span>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {activeAlbumPhotos[modalPhotoIndex].tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-white/06 border border-white/08 text-[10px] font-mono text-white/60"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: All Album Photos Gallery Column */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-black/40 p-3.5 sm:p-4 self-stretch">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
                        <div>
                          <span className="text-xs font-mono text-white/90 font-bold block">
                            All Album Photos ({activeAlbumPhotos.length})
                          </span>
                          <span className="text-[11px] font-mono text-white/50">
                            Click any photo to preview
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#4285F4]/20 border border-[#4285F4]/40 text-[#4285F4] font-semibold">
                          {modalPhotoIndex + 1} / {activeAlbumPhotos.length}
                        </span>
                      </div>

                      {/* Scrollable Thumbnails Grid on the Right */}
                      <div className="overflow-y-auto max-h-[64vh] pr-1.5 grid grid-cols-2 gap-2.5">
                        {activeAlbumPhotos.map((photo, idx) => (
                          <div
                            key={photo.id}
                            onClick={() => setModalPhotoIndex(idx)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setModalPhotoIndex(idx)}
                            className={`relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border transition-all ${
                              modalPhotoIndex === idx
                                ? 'border-[#4285F4] ring-2 ring-[#4285F4]/70 scale-[1.02] shadow-[0_0_14px_rgba(66,133,244,0.4)]'
                                : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                            }`}
                          >
                            <img
                              src={photo.image}
                              alt={photo.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                            <div className="absolute top-1 left-1 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/75 border border-white/10 text-white">
                              #{idx + 1}
                            </div>
                            <span className="absolute bottom-1 left-1.5 right-1.5 font-mono text-[9px] text-white truncate block">
                              {photo.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Grid View: All photos of this event displayed simultaneously */
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {activeAlbumPhotos.map((photo, idx) => (
                        <div
                          key={photo.id}
                          onClick={() => {
                            setModalPhotoIndex(idx);
                            setModalViewMode('slideshow');
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setModalPhotoIndex(idx);
                              setModalViewMode('slideshow');
                            }
                          }}
                          className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/50 hover:border-white/40 transition-all cursor-pointer flex flex-col justify-between"
                        >
                          <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
                            <img
                              src={photo.image}
                              alt={photo.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute top-2 right-2 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/70 border border-white/15 text-white">
                              #{idx + 1}
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="text-xs font-bold text-white group-hover:text-[#4285F4] transition-colors line-clamp-1 mb-1">
                              {photo.title}
                            </h4>
                            <p className="text-[11px] text-white/60 line-clamp-2 leading-snug">
                              {photo.caption}
                            </p>
                            <div className="mt-2.5 pt-2 border-t border-white/08 flex items-center justify-between text-[10px] font-mono text-[#4285F4]">
                              <span>Click to enlarge</span>
                              <Maximize2 className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Switcher: Quick jump to another album */}
              <div className="p-3 sm:p-4 border-t border-white/10 bg-black/50 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <span className="text-xs font-mono text-white/50">Browse other albums:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {eventAlbums.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleOpenAlbum(a.name)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        activeModalAlbum === a.name
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/60 hover:text-white hover:bg-white/08'
                      }`}
                    >
                      {a.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* SINGLE PHOTO FULLSCREEN LIGHTBOX                             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setLightboxPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-5 right-5 p-2.5 rounded-full bg-black/75 border border-white/20 text-white/80 hover:text-white hover:bg-black transition-all cursor-pointer z-20"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl border border-white/20 bg-[#121216] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Photo Area */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={lightboxPhoto.image}
                  alt={lightboxPhoto.title}
                  decoding="async"
                  className="max-h-[65vh] md:max-h-[85vh] w-full object-contain"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between overflow-y-auto bg-[#121216]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                      {lightboxPhoto.year}
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${getCategoryBadgeStyle(
                        lightboxPhoto.category
                      )}`}
                    >
                      {lightboxPhoto.category}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-[#4285F4] font-semibold block mb-1">
                    {lightboxPhoto.event}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {lightboxPhoto.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    {lightboxPhoto.caption}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-white/70 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#FBBC05]" />
                      <span>{lightboxPhoto.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#EA4335]" />
                      <span>{lightboxPhoto.location}</span>
                    </div>
                    {lightboxPhoto.attendees && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#34A853]" />
                        <span>Participation: {lightboxPhoto.attendees}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {lightboxPhoto.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/06 border border-white/08 text-[10px] font-mono text-white/60"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>GDG on Campus RMKEC Archive</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxPhoto(null);
                      handleOpenAlbum(lightboxPhoto.category);
                    }}
                    className="text-[#4285F4] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    View entire album <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
