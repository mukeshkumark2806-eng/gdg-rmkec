'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Tag,
  Search,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

export interface AlbumPhoto {
  id: string;
  title: string;
  event: string;
  category: 'Hackathons' | 'Cloud Jams' | 'AI Workshops' | 'Keynotes' | 'Team Sprints' | 'Community';
  year: '2026' | '2025';
  date: string;
  location: string;
  image: string;
  caption: string;
  attendees?: string;
  tags: string[];
}

const albumPhotos: AlbumPhoto[] = [
  // 1. HackNEXA'26 Hackathon
  {
    id: 'alb-hacknexa-1',
    title: "HackNEXA'26 Flagship Opening Keynote",
    event: "HackNEXA'26 Hackathon (TechSprint)",
    category: 'Hackathons',
    year: '2026',
    date: 'February 2026',
    location: 'Main Auditorium, RMKEC',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Kickoff ceremony of HackNEXA’26 bringing together 650+ participating teams across RMK Group of Institutions to solve real-world problems.',
    attendees: '650+ Teams',
    tags: ['HackNEXA', 'TechSprint', 'Opening Ceremony', 'Keynote'],
  },
  {
    id: 'alb-hacknexa-2',
    title: 'Late Night Prototyping & Sprint Jam',
    event: "HackNEXA'26 Hackathon (TechSprint)",
    category: 'Hackathons',
    year: '2026',
    date: 'February 2026',
    location: 'Central Computing Lab, RMKEC',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Student builder teams collaborating through the night on software MVPs, hardware IoT circuits, and AI agent architectures.',
    attendees: '250+ Finalists',
    tags: ['Hackathon', 'Coding Sprint', 'Innovation', 'Mentorship'],
  },
  {
    id: 'alb-hacknexa-3',
    title: 'Jury Evaluation & Live Demos',
    event: "HackNEXA'26 Hackathon (TechSprint)",
    category: 'Hackathons',
    year: '2026',
    date: 'February 2026',
    location: 'Auditorium Seminar Hall, RMKEC',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Finalist teams pitching working prototypes in front of GDG India mentors and faculty evaluators on the HackNEXA portal.',
    attendees: '250+ Evaluated',
    tags: ['Jury Review', 'Live Demos', 'Pitchathon'],
  },
  {
    id: 'alb-hacknexa-4',
    title: 'HackNEXA Winners & Swags Felicitation',
    event: "HackNEXA'26 Hackathon (TechSprint)",
    category: 'Hackathons',
    year: '2026',
    date: 'February 2026',
    location: 'Main Stage, RMKEC',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Celebrating top 3 champion teams awarded exclusive GDG India swags, certificates, and incubator mentorship.',
    attendees: 'Champions',
    tags: ['GDG India Swags', 'Awards', 'Felicitation', 'Winners'],
  },

  // 2. Google Cloud Campaign Study Jam (October 2025)
  {
    id: 'alb-cloud-1',
    title: 'Principal Felicitations & T-Shirt Distribution',
    event: 'Google Cloud Campaign Study Jam',
    category: 'Cloud Jams',
    year: '2025',
    date: 'October 2025',
    location: 'Main Auditorium, RMKEC',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    caption:
      'College Principal officially felicitating 40+ certified pathway completers and presenting official Google Cloud T-shirt rewards.',
    attendees: '40+ Completers',
    tags: ['Google Cloud', 'Principal Felicitations', 'Milestone', 'T-Shirts'],
  },
  {
    id: 'alb-cloud-2',
    title: 'Hands-on Cloud Infrastructure Lab Jam',
    event: 'Google Cloud Campaign Study Jam',
    category: 'Cloud Jams',
    year: '2025',
    date: 'October 2025',
    location: 'Computer Centre 3, RMKEC',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    caption:
      '100+ students navigating Google Cloud Skill Boost quests, spinning up Compute Engine instances and Kubernetes clusters.',
    attendees: '100+ Learners',
    tags: ['GCP Badges', 'Cloud Skills Boost', 'Kubernetes', 'Hands-on'],
  },

  // 3. Agentic AI & Gemini Study Jam
  {
    id: 'alb-agentic-1',
    title: 'Agentic AI Masterclass & Tool Use',
    event: 'Agentic AI Study Jam',
    category: 'AI Workshops',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Hands-on exploration of autonomous agent architectures, multi-agent frameworks, and multimodal reasoning with Gemini 2.5.',
    attendees: '250+ Attendees',
    tags: ['Agentic AI', 'Gemini 2.5', 'LLMs', 'Prompt Engineering'],
  },
  {
    id: 'alb-agentic-2',
    title: 'Building Campus AI Multi-Agent Workflows',
    event: 'Agentic AI Study Jam',
    category: 'AI Workshops',
    year: '2026',
    date: 'January 2026',
    location: 'AI/ML Lab, RMKEC',
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Students live-coding tool-calling agents for automated course scheduling, timetable queries, and campus resource booking.',
    attendees: 'AI/ML Wing',
    tags: ['FastAPI', 'LangChain', 'Vector Search', 'RAG'],
  },

  // 4. A.C.E – AI Collage Day
  {
    id: 'alb-ace-1',
    title: 'A.C.E – AI Collage Day Creative Pitching',
    event: 'A.C.E – AI Collage Day',
    category: 'AI Workshops',
    year: '2026',
    date: 'January 2026',
    location: 'Online Studio Stream & RMKEC',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Students pitching innovative futuristic problem statements through artistic and architectural AI-generated visual collages.',
    attendees: '300+ Participants',
    tags: ['A.C.E', 'Generative Art', 'Idea Pitching', 'Creativity'],
  },

  // 5. Flagship DevFest Keynote & Summits
  {
    id: 'alb-keynote-1',
    title: 'Annual DevFest Mainstage Assembly',
    event: 'DevFest Grand Summit',
    category: 'Keynotes',
    year: '2025',
    date: 'September 2025',
    location: 'Central Campus Auditorium',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Over 1,200 enthusiastic student developers, speakers, and tech mentors gathering for the chapter inaugural summit.',
    attendees: '1,200+ Attendees',
    tags: ['DevFest', 'Grand Stage', 'Inaugural Summit', 'Keynote'],
  },
  {
    id: 'alb-keynote-2',
    title: 'Google Developer Expert Speaker Session',
    event: 'DevFest Tech Talks',
    category: 'Keynotes',
    year: '2025',
    date: 'September 2025',
    location: 'Audi Hall 1, RMKEC',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Deep dive on scalable cloud native architectures, container security, and next-generation AI workflows by industry experts.',
    attendees: '500+ Engineers',
    tags: ['GDE Talk', 'Industry Mentorship', 'Cloud Native'],
  },

  // 6. Core Team & Technical Wings Ideation Sprints
  {
    id: 'alb-team-1',
    title: 'Campus Bus Tracking IoT Hardware Assembly',
    event: 'Technical Wings Sprint Jam',
    category: 'Team Sprints',
    year: '2026',
    date: 'January 2026',
    location: 'IoT & Electronics Lab, RMKEC',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Tech Team testing GPS microcontrollers, power telemetry circuits, and WebSocket backends for the campus bus tracking system.',
    attendees: 'Tech Wings',
    tags: ['IoT', 'Bus Tracking', 'Microcontrollers', 'Hardware Lab'],
  },
  {
    id: 'alb-team-2',
    title: 'UI/UX Design System Prototyping Workshop',
    event: 'Design Team Creative Sprint',
    category: 'Team Sprints',
    year: '2025',
    date: 'November 2025',
    location: 'Design Studio Lab, RMKEC',
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Design team leads standardizing Google Material Design 3 tokens, dark/light theme palettes, and web components.',
    attendees: 'Design Team',
    tags: ['Design System', 'Figma', 'Material Design', 'UI/UX'],
  },

  // 7. Community & Diversity Sessions
  {
    id: 'alb-community-1',
    title: 'Women in Tech & Student Mentorship Roundtable',
    event: 'Diversity & Inclusion Series',
    category: 'Community',
    year: '2025',
    date: 'November 2025',
    location: 'Campus Conference Hall',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Student leads discussing career journeys, open source contributions, and women leadership in developer ecosystems.',
    attendees: '150+ Attendees',
    tags: ['Women In Tech', 'Mentorship', 'Community Leadership'],
  },
  {
    id: 'alb-community-2',
    title: 'All-Hands Chapter Family Celebration',
    event: 'GDG RMKEC Chapter Assembly',
    category: 'Community',
    year: '2025',
    date: 'December 2025',
    location: 'Campus Lawn Amphitheatre',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    caption:
      'Faculty advisors, core leads, wing members, and student organizers celebrating successful milestone campaigns.',
    attendees: 'Full Chapter',
    tags: ['Chapter Family', 'Celebration', 'Milestones'],
  },
];

export default function AlbumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filter photos
  const filteredPhotos = albumPhotos.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchYear = selectedYear === 'All' || item.year === selectedYear;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchYear && matchSearch;
  });

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  // Keyboard controls for modal navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        );
      }
    };

    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoIndex, filteredPhotos.length]);

  const categories = ['All', 'Hackathons', 'Cloud Jams', 'AI Workshops', 'Keynotes', 'Team Sprints', 'Community'];
  const years = ['All', '2026', '2025'];

  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EA4335] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>Event Photography &amp; Archives</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Event Album
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            A visual chronicle of hackathons, cloud jams, hands-on workshops, and community moments at
            Google Developer Group on Campus RMKEC.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
              <span>{albumPhotos.length} Documented Moments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
              <span>650+ Hackathon Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              <span>40+ Cloud Completers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
              <span>1,200+ Attendees</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl border border-white/10 bg-[#121216]/80 backdrop-blur-xl">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search event, tag, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-black/60 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4285F4] text-white font-semibold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/06'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/60 border border-white/10 shrink-0">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedYear === y
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Result Count */}
        <div className="flex items-center justify-between mb-6 px-2 text-xs font-mono text-white/50">
          <span>
            Showing {filteredPhotos.length} of {albumPhotos.length} photos
          </span>
          {(selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedYear('All');
                setSearchQuery('');
              }}
              className="text-[#4285F4] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ============================================================ */}
        {/* PHOTO GALLERY GRID                                           */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/35 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121216]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white">
                    {photo.year}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#4285F4]/30 backdrop-blur-md border border-[#4285F4]/40 text-blue-300">
                    {photo.category}
                  </span>
                </div>

                {/* Attendee stat badge if exists */}
                {photo.attendees && (
                  <div className="absolute bottom-3.5 right-3.5 font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/80">
                    {photo.attendees}
                  </div>
                )}
              </div>

              {/* Photo Description Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] text-[#4285F4] font-semibold block mb-1">
                    {photo.event}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#4285F4] transition-colors mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2 mb-4">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/08 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {photo.date}
                  </span>
                  <span className="flex items-center gap-1 text-[#4285F4] group-hover:text-white transition-colors">
                    <Maximize2 className="h-3 w-3" /> View Photo
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search has no results */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-white/10 bg-[#121216]/50 mb-20">
            <Camera className="h-10 w-10 text-white/30 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No photos match your filter</h3>
            <p className="text-xs text-white/60 mt-1 mb-4">
              Try adjusting your search terms or category selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedYear('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#4285F4] text-white text-xs font-semibold cursor-pointer"
            >
              Show All Photos
            </button>
          </div>
        )}

        {/* Join upcoming events CTA */}
        <div className="text-center p-10 rounded-3xl border border-white/10 bg-[#121216]/60 backdrop-blur-md">
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
      {/* FULLSCREEN LIGHTBOX MODAL                                    */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Close photo preview"
              className="absolute top-5 right-5 p-2.5 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:bg-black transition-all cursor-pointer z-20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Photo Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
                );
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/15 text-white/80 hover:text-white hover:scale-110 transition-all cursor-pointer z-20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Photo Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) =>
                  prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
                );
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/15 text-white/80 hover:text-white hover:scale-110 transition-all cursor-pointer z-20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Modal Content Box */}
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
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-h-[65vh] md:max-h-[85vh] w-full object-contain"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between overflow-y-auto bg-[#121216]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                      {activePhoto.year}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#4285F4]/30 text-blue-300 border border-[#4285F4]/40">
                      {activePhoto.category}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-[#4285F4] font-semibold block mb-1">
                    {activePhoto.event}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {activePhoto.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    {activePhoto.caption}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-white/70 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#FBBC05]" />
                      <span>{activePhoto.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#EA4335]" />
                      <span>{activePhoto.location}</span>
                    </div>
                    {activePhoto.attendees && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#34A853]" />
                        <span>Participation: {activePhoto.attendees}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {activePhoto.tags.map((t) => (
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

                {/* Bottom Navigation Index */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>
                    Photo {activePhotoIndex! + 1} of {filteredPhotos.length}
                  </span>
                  <span className="text-[11px]">Use ← / → keys</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
