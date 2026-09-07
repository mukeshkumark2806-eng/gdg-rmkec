'use client';

import React from 'react';
import { MapPin, Navigation, Bus, Wifi, ShieldCheck } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="relative py-24 px-4 sm:px-8 text-paper overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#34A853] font-semibold block mb-2">
            The Location
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Venue & Destination
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70">
            A state-of-the-art tech campus equipped with high-speed fiber, auditorium halls, and
            maker labs.
          </p>
        </div>

        {/* Venue Glass Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-white/15 bg-black/80 p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-2xl">
          {/* Left Details */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4285F4] mb-3 font-semibold">
                <MapPin className="h-4 w-4" />
                <span>RSM Nagar, Kavaraipettai, Chennai</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                R.M.K. Engineering College
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg">
                Located along the Chennai-Kolkata National Highway (NH-16), RMK Engineering College
                features world-class auditoriums, computing centers, and dedicated spaces for
                hackathons, workshops, and speaker lounges.
              </p>
            </div>

            {/* Amenities / Perks */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Wifi className="h-4 w-4 text-[#4285F4] shrink-0" />
                <span>High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Bus className="h-4 w-4 text-[#EA4335] shrink-0" />
                <span>Free Campus Shuttles</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#34A853] shrink-0" />
                <span>24/7 Security</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Navigation className="h-4 w-4 text-[#4285F4] shrink-0" />
                <span>Kavaraipettai Station (1 km)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <GlowButton
                href="https://maps.google.com/?q=RMK+Engineering+College+Kavaraipettai"
                target="_blank"
                rel="noreferrer"
                shape="pill"
                size="md"
              >
                Open in Google Maps →
              </GlowButton>
            </div>
          </div>

          {/* Right Campus Image / Visual */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto min-h-[300px] rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-xl">
            <img
              src="/images/rmkec-campus.webp"
              alt="R.M.K. Engineering College"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs text-white/90">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">R.M.K. Engineering College</p>
                  <p className="text-[11px] text-white/70 font-mono mt-0.5">
                    RSM Nagar, Kavaraipettai Campus
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
                  RMKEC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
