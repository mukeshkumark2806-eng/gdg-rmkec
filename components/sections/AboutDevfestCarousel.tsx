'use client';

import React, { useState, useEffect } from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const slides: Slide[] = [
  {
    id: 'roadshows',
    title: 'Roadshows',
    description:
      'Catch a DevFest Roadshow near you. A month long celebration hosted across the campus and city.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    tag: 'Celebration',
  },
  {
    id: 'build',
    title: 'Build sessions',
    description: 'Come, vibe, build, share your projects with an amazing audience.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    tag: 'Hack & Code',
  },
  {
    id: 'competitions',
    title: 'Competitions',
    description:
      'Bring your A game to our favorite competitions ranging from pitchathons to CTFs.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    tag: 'Compete & Win',
  },
  {
    id: 'talks',
    title: 'Talks',
    description:
      'Hear from some of the best minds out there as they talk about real stories and projects.',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80',
    tag: 'Keynotes & Tech',
  },
  {
    id: 'networking',
    title: 'Networking',
    description:
      'Not your average social media connections. Real networking, projects, careers and collaborations.',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80',
    tag: 'Connect & Tribe',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Join us as we celebrate the community while you find your tribe here.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    tag: 'Everyone Welcome',
  },
];

export const AboutDevfestCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="after-hero" className="relative overflow-hidden text-paper py-20 px-4 sm:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Title */}
        <h2 className="text-left text-[clamp(2.25rem,7vw,4.5rem)] font-bold leading-none tracking-tight text-white mb-10">
          About DevFest
        </h2>

        {/* Carousel Viewport */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <article
                key={slide.id}
                className="relative h-[55vh] md:h-[65vh] w-full shrink-0 overflow-hidden select-none"
              >
                {/* Background Image with Dark Vignette */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                </div>

                {/* Content Overlay */}
                <div className="relative flex h-full flex-col justify-end p-6 sm:p-12 md:p-16 z-10">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] mb-2 font-semibold">
                    {slide.tag}
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base sm:text-lg md:text-xl text-white/85 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls Bar: Prev Button, Dot Indicators, Next Button */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
          {/* Previous Button */}
          <GlowButton
            onClick={prevSlide}
            shape="circle"
            size="md"
            ariaLabel="Previous card"
            surfaceClassName="h-11 w-11 sm:h-12 sm:w-12 !p-0"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </GlowButton>

          {/* Dots / Tabs */}
          <div className="flex items-center gap-2" role="tablist" aria-label="About DevFest cards">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={slide.title}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <GlowButton
            onClick={nextSlide}
            shape="circle"
            size="md"
            ariaLabel="Next card"
            surfaceClassName="h-11 w-11 sm:h-12 sm:w-12 !p-0"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
};
