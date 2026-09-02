'use client';

import React, { useState } from 'react';
import { TicketsSection } from '@/components/sections/TicketsSection';
import { GlowButton } from '@/components/ui/GlowButton';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'What is included with my DevFest RMKEC ticket?',
    a: 'Every ticket includes full-day access to all keynote sessions, breakout tracks, hands-on workshop labs, official DevFest 2026 swag kit, catering (lunch & high-tea snacks), networking sessions, and a verifiable Google Developer Group certificate.',
  },
  {
    q: 'Are students from any college eligible for the Student Pass?',
    a: 'Yes! Students from all universities and polytechnics are welcome. Please ensure you bring a valid college student ID card on the day of the event for fast-track badge collection.',
  },
  {
    q: 'Can I transfer or cancel my ticket?',
    a: 'Tickets are non-refundable, but you can transfer your ticket to a friend or colleague up to 48 hours before the event starts by updating attendee details on KonfHub.',
  },
  {
    q: 'What should I bring with me?',
    a: 'Bring your laptop + charger (for interactive workshop sessions), your digital ticket QR code on your phone, and a valid photo ID.',
  },
  {
    q: 'Is there accommodation available for outstation participants?',
    a: 'We have discounted partner hostels and hotels near the campus. Reach out to gdg@rmkec.ac.in for accommodation assistance.',
  },
];

export default function TicketsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-24 relative overflow-hidden">
      {/* Hero Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center mb-6 pt-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>DevFest Passes 2026</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Choose Your Pass
        </h1>
        <p className="mt-4 text-base sm:text-xl text-white/70 max-w-2xl mx-auto">
          Secure your seat for Chennai’s flagship developer conference. Limited tickets per tier.
        </p>
      </div>

      {/* Main Tickets Component */}
      <TicketsSection />

      {/* FAQ Section */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-16">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold block mb-1">
            Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#121216]/80 backdrop-blur-md overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-[#4285F4] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-[#4285F4] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-white/60 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/06 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support box */}
        <div className="mt-12 text-center p-8 rounded-3xl border border-white/10 bg-[#121216]/40 backdrop-blur-md">
          <p className="text-sm text-white/80">Need custom bulk ticketing or institutional invoices?</p>
          <div className="mt-4 flex justify-center">
            <GlowButton href="/contact" shape="pill" size="md">
              Contact Organizing Team →
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
