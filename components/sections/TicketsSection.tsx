'use client';

import React, { useState } from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { Check, Sparkles, Zap, Shield, Heart } from 'lucide-react';

interface TicketTier {
  id: string;
  name: string;
  category: 'Student' | 'Professional' | 'Diversity';
  price: string;
  status: 'Available' | 'Fast Filling' | 'Next Phase';
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
}

const tiers: TicketTier[] = [
  {
    id: 'early-student',
    name: 'Early Student Pass',
    category: 'Student',
    price: '₹399',
    status: 'Fast Filling',
    description: 'Special access for verified college students across Chennai and Tamil Nadu.',
    features: [
      'Full Day Access to Keynotes & Tracks',
      'DevFest 2026 Official Swag Bag & T-Shirt',
      'Networking Lunch & Refreshments',
      'Certificate of Participation (GDG Verified)',
      'Hands-on Workshop & Lab Access',
    ],
    color: '#4285F4',
    popular: true,
  },
  {
    id: 'student-diversity',
    name: 'Women & Diverse Groups',
    category: 'Diversity',
    price: '₹399',
    status: 'Available',
    description: 'Subsidized pass to encourage diversity and inclusion across tech communities.',
    features: [
      'All Student Pass Benefits Included',
      'Exclusive Women Techmakers (WTM) Lounge',
      'Fast-track Mentorship Speed Dating',
      'Special GDG Swag Edition',
      '1-on-1 Career AMA with Google Mentors',
    ],
    color: '#EA4335',
  },
  {
    id: 'early-pro',
    name: 'Early Professional',
    category: 'Professional',
    price: '₹599',
    status: 'Available',
    description: 'Designed for software engineers, designers, founders, and tech professionals.',
    features: [
      'Priority Seating at Mainstage Keynotes',
      'VIP Networking Lounge Access',
      'Premium DevFest Backpack & Swag Kit',
      'Buffet Lunch with Speakers & Leads',
      'Direct Connect with Sponsoring Companies',
    ],
    color: '#FBBC05',
  },
  {
    id: 'late-pro',
    name: 'All-Access Pro + Hack',
    category: 'Professional',
    price: '₹799',
    status: 'Next Phase',
    description: 'Ultimate pass for hardcore builders, hackathon teams, and tech leads.',
    features: [
      'All Early Pro Benefits Included',
      '24-Hour Hackathon Arena Access',
      'Cloud Lab Credits ($100 USD value)',
      'Exclusive Speaker Dinner Invitation',
      'Private Discord VIP Channel Access',
    ],
    color: '#34A853',
  },
];

export const TicketsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Student' | 'Professional' | 'Diversity'>('All');

  const filteredTiers =
    selectedFilter === 'All'
      ? tiers
      : tiers.filter((t) => t.category === selectedFilter);

  return (
    <section id="tickets" className="relative py-24 px-4 sm:px-8 text-paper overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBBC05] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Secure Your Spot</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Get Your Passes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-lg">
              Join 1,200+ developers, designers, and innovators at RMK Engineering College. Limited
              seats available!
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-[#121216]/90 backdrop-blur-md">
            {(['All', 'Student', 'Professional', 'Diversity'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-white/20 text-white font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                tier.popular
                  ? 'border-[#4285F4]/60 bg-gradient-to-b from-[#4285F4]/15 via-black/80 to-black shadow-[0_8px_32px_rgba(66,133,244,0.25)]'
                  : 'border-white/10 bg-[#121216]/60 hover:border-white/25 hover:bg-[#121216]/90'
              }`}
            >
              {/* Popular Ribbon */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#4285F4] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </div>
              )}

              {/* Top Details */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="font-mono text-xs uppercase tracking-wider font-semibold"
                    style={{ color: tier.color }}
                  >
                    {tier.category}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {tier.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">{tier.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 my-4 pb-4 border-b border-white/10">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs text-white/50 font-mono">/ ticket</span>
                </div>

                {/* Inclusions */}
                <ul className="flex flex-col gap-2.5 my-4">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                      <Check
                        className="h-3.5 w-3.5 shrink-0 mt-0.5"
                        style={{ color: tier.color }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <GlowButton
                  href={`https://konfhub.com/widget/devfest-2026-rmkec?ticket=${tier.id}`}
                  shape="pill"
                  size="md"
                  className="w-full"
                  surfaceClassName="w-full justify-center !py-2.5"
                >
                  Book on KonfHub →
                </GlowButton>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-white/60 text-center">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#34A853]" />
            <span>100% Verified Community Pass</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#FBBC05]" />
            <span>Instant E-Ticket & QR Confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#EA4335]" />
            <span>Inclusive & Student-Friendly Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
