'use client';

import React, { useState } from 'react';
import { faqData } from '@/data/contact';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Mail, MapPin, Send, ChevronDown, CheckCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(faqData[0].id);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="blue" className="mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Contact & <span className="text-gradient-google">Support</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Have questions about workshops, events, or membership? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-10 backdrop-blur-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-xs text-slate-300 mt-2">Thank you. Our leads will respond via email shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <Input label="Your Name" placeholder="Full Name" required />
                <Input label="Email Address" type="email" placeholder="email@domain.com" required />
                <Textarea label="Message" placeholder="How can we assist you?" required rows={4} />
                <MagneticButton type="submit" variant="google" className="w-full">
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Location & Details Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-10 backdrop-blur-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Chapter Headquarters</h2>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">R.M.K. Engineering College</span>
                    <span className="text-xs text-slate-400">{siteConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="font-semibold text-white">{siteConfig.contactEmail}</span>
                </div>
              </div>
            </div>

            {/* Embedded Visual Map Card */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950 p-6 text-center">
              <span className="text-xs font-mono uppercase text-blue-400 block mb-1">Campus Location</span>
              <p className="text-xs text-slate-400">RSM Nagar, Kavaraipettai, Tiruvallur District, Tamil Nadu - 601206</p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-base font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-400' : ''
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
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3"
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
