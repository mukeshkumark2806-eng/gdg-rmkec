'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData, galleryCategories, GalleryItem } from '@/data/gallery';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  X,
  Layers,
  Heart,
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

export default function CommunityGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

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
            Community <span className="text-gradient-google">Gallery</span>
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
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setActivePhoto(item)}
                className="group relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-xl hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(66,133,244,0.3)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

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
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal for Full View */}
        {activePhoto && (
          <Modal isOpen={!!activePhoto} onClose={() => setActivePhoto(null)} title={activePhoto.title}>
            <div className="flex flex-col gap-6">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/15 bg-black">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="blue">{activePhoto.category}</Badge>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                  {activePhoto.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {activePhoto.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-900 border border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>{activePhoto.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="truncate">{activePhoto.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Users className="w-4 h-4 text-green-400" />
                    <span>{activePhoto.attendees} Attendees</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activePhoto.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-950/80 border border-blue-500/30 text-blue-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}

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
