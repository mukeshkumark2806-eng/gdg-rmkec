'use client';

import React, { useState } from 'react';
import { galleryData } from '@/data/gallery';
import { GalleryItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Sparkles, Calendar, Tag, Maximize2, ArrowRight, Eye, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const categories = ['All', 'Workshops', 'Hackathons', 'Study Jams', 'Events', 'Team'] as const;
type CategoryType = (typeof categories)[number];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryData.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen bg-[#080C16]">
      {/* Background Radial Glows */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-40 right-10 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="blue" className="mb-4">
              <Sparkles className="h-3.5 w-3.5 inline mr-1.5" />
              Chapter Memories & Showcase
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Our Visual <span className="text-gradient-google">Gallery</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore moments from GDG RMKEC events, hackathon marathons, interactive study jams, hands-on workshops, and community celebrations.
            </p>
          </motion.div>
        </div>

        {/* Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-14 bg-slate-900/60 p-2.5 rounded-2xl border border-white/10 backdrop-blur-xl max-w-fit mx-auto shadow-xl"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'text-white shadow-[0_0_20px_rgba(66,133,244,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Masonry / Responsive Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const badgeVariant =
                item.category === 'Hackathons'
                  ? 'red'
                  : item.category === 'Workshops'
                  ? 'blue'
                  : item.category === 'Study Jams'
                  ? 'green'
                  : item.category === 'Team'
                  ? 'glass'
                  : 'yellow';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="break-inside-avoid inline-block w-full group relative rounded-3xl border border-white/10 bg-slate-900/70 overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)] cursor-pointer"
                  onClick={() => setActiveItem(item)}
                >
                  {/* Image Container with Overlay Glow */}
                  <div className="relative overflow-hidden bg-slate-800">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                      style={{
                        maxHeight: item.aspectRatio === 'tall' ? '450px' : item.aspectRatio === 'wide' ? '260px' : '320px',
                        minHeight: '220px',
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <Badge variant={badgeVariant}>{item.category}</Badge>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>

                    {/* Bottom Floating Event Name */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1 backdrop-blur-md border border-white/15 text-[11px] font-mono text-blue-300 mb-2">
                        <Tag className="h-3 w-3 shrink-0" />
                        <span className="truncate">{item.eventName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Moment</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
            <ImageIcon className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">No Moments Found</h3>
            <p className="text-sm text-slate-400 mt-1">There are no photos in this category yet. Check back soon!</p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/30 via-slate-900/80 to-purple-900/30 p-8 sm:p-12 text-center backdrop-blur-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Want to be part of our next <span className="text-gradient-google">Memorable Moment?</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Join GDG RMKEC to attend workshops, hackathons, and connect with passionate student developers.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/join">
                <MagneticButton variant="google" size="lg">
                  <span>Join GDG Chapter Now</span>
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={activeItem?.title}
        maxWidth="2xl"
      >
        {activeItem && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black max-h-[70vh] flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-auto max-h-[65vh] object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/60 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
                <Tag className="h-4 w-4 text-blue-400" />
                <span className="font-semibold">{activeItem.eventName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{activeItem.date}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">About This Moment</h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-white/5">
                {activeItem.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
