'use client';

import React, { useState } from 'react';
import { faqData } from '@/data/contact';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Mail, MapPin, Send, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Float helper ──────────────────────────────────── */
const floatAnim = (yRange: number[], xRange: number[], dur: number, del = 0) => ({
  animate: { y: yRange, x: xRange },
  transition: { duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut' as const, repeatType: 'loop' as const },
});

interface ShapeProps {
  style?: React.CSSProperties;
  className?: string;
  yRange?: number[];
  xRange?: number[];
  dur?: number;
  del?: number;
  children?: React.ReactNode;
}
const FloatShape: React.FC<ShapeProps> = ({ style, className = '', yRange = [0, -10, 0], xRange = [0, 5, 0], dur = 5, del = 0, children }) => (
  <motion.div {...floatAnim(yRange, xRange, dur, del)} className={`absolute pointer-events-none ${className}`} style={style}>{children}</motion.div>
);

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(faqData[0].id);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-[#F5F7FA] min-h-screen flex flex-col justify-between">
      {/* ════════════════════════════════
          LAYER 1 — LARGE BLOBS (HOME PAGE MATCH)
      ════════════════════════════════ */}
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

      {/* ════════════════════════════════
          LAYER 2 — DOT GRID TEXTURE
      ════════════════════════════════ */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* ════════════════════════════════
          LAYER 3 — GEOMETRIC SHAPES (HOME PAGE ACCENTS)
      ════════════════════════════════ */}
      <FloatShape
        yRange={[0, -18, 0]}
        xRange={[0, 10, 0]}
        dur={7}
        del={0}
        style={{ top: '6%', right: '10%', width: 220, height: 220 }}
        className="rounded-full border-2 border-dashed border-[#4285F4]/20"
      />
      <FloatShape
        yRange={[0, 12, 0]}
        xRange={[0, -8, 0]}
        dur={5.5}
        del={1}
        style={{ top: '15%', left: '8%', width: 110, height: 110 }}
        className="rounded-full border border-[#34A853]/30"
      />
      <FloatShape
        yRange={[0, -14, 0]}
        xRange={[0, 6, 0]}
        dur={6}
        del={0.5}
        style={{ top: '10%', left: '4%', width: 18, height: 18, background: '#4285F4', borderRadius: '50%', opacity: 0.35 }}
      />
      <FloatShape
        yRange={[0, 10, 0]}
        xRange={[0, -5, 0]}
        dur={4.5}
        del={2}
        style={{ top: '42%', left: '3%', width: 12, height: 12, background: '#34A853', borderRadius: '50%', opacity: 0.45 }}
      />
      <FloatShape
        yRange={[0, -8, 0]}
        xRange={[0, 4, 0]}
        dur={5}
        del={3}
        style={{ top: '65%', left: '5%', width: 10, height: 10, background: '#EA4335', borderRadius: '3px', opacity: 0.35, transform: 'rotate(45deg)' }}
      />
      <FloatShape
        yRange={[0, 8, 0]}
        xRange={[0, -4, 0]}
        dur={6.5}
        del={1.5}
        style={{ bottom: '15%', left: '8%', width: 14, height: 14, background: '#FBBC05', borderRadius: '50%', opacity: 0.4 }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="blue" className="mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Contact & <span className="text-gradient-google">Support</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Have questions about workshops, events, or membership? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-blue-500/5">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1A1A2E]">Message Sent!</h3>
                <p className="text-xs text-slate-600 mt-2">Thank you. Our leads will respond via email shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <Input
                  label="Your Name"
                  placeholder="Full Name"
                  required
                  className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  labelClassName="text-slate-700 font-bold"
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="email@domain.com"
                  required
                  className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  labelClassName="text-slate-700 font-bold"
                />
                <Textarea
                  label="Message"
                  placeholder="How can we assist you?"
                  required
                  rows={4}
                  className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  labelClassName="text-slate-700 font-bold"
                />
                <MagneticButton type="submit" variant="google" className="w-full shadow-lg">
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Location & Details Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-blue-500/5">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Chapter Headquarters</h2>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A2E] block">R.M.K. Engineering College</span>
                    <span className="text-xs text-slate-600 font-medium">{siteConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                  <span className="font-semibold text-[#1A1A2E]">{siteConfig.contactEmail}</span>
                </div>
              </div>
            </div>

            {/* Embedded Visual Map Card */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <span className="text-xs font-mono uppercase text-blue-600 block mb-1 font-semibold">Campus Location</span>
              <p className="text-xs text-slate-600 font-medium">RSM Nagar, Kavaraipettai, Tiruvallur District, Tamil Nadu - 601206</p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 overflow-hidden transition-all duration-300 shadow-sm hover:border-blue-500/40 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-base font-bold text-[#1A1A2E] hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
