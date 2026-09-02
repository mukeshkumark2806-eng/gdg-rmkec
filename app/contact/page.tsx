'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';
import { GlowButton } from '@/components/ui/GlowButton';
import { Mail, MapPin, Send, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Connect with Us</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Have questions about workshops, HackNEXA&apos;26 hackathon, study jams, or community
            collaborations? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-6 sm:p-10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-[#34A853] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-white/70 mt-2">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Our
                  team will respond to <span className="text-[#4285F4]">{formData.email}</span> shortly.
                </p>
                <div className="mt-6">
                  <GlowButton onClick={() => setSubmitted(false)} shape="pill" size="sm">
                    Send Another Note
                  </GlowButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@rmkec.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="HackNEXA Hackathon">HackNEXA Hackathon Inquiry</option>
                    <option value="Technical Workshops">Workshops & Study Jams</option>
                    <option value="Industry Collaboration">Industry Partnership / Sponsorship</option>
                    <option value="Membership & Volunteering">Membership & Volunteering</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can our community team assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                  />
                </div>

                <div className="pt-2">
                  <GlowButton
                    type="submit"
                    shape="pill"
                    size="md"
                    className="w-full"
                    surfaceClassName="w-full justify-center"
                  >
                    Send Message →
                  </GlowButton>
                </div>
              </form>
            )}
          </div>

          {/* Chapter Headquarters Details */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-[#121216]/80 p-6 sm:p-10 backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Chapter Headquarters</h2>
              <div className="space-y-6 text-xs sm:text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#EA4335] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">R.M.K. Engineering College</span>
                    <span className="text-white/60 leading-relaxed block mt-1">
                      RSM Nagar, Kavaraipettai, Gummidipoondi Taluk, Tiruvallur District, Tamil Nadu – 601206
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#4285F4] shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Official Email</span>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-[#4285F4] hover:underline"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Location Card */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-black p-6 text-center">
              <span className="text-xs font-mono uppercase text-[#34A853] block mb-1">
                College Campus
              </span>
              <p className="text-xs text-white/70">
                Main Computer Center & Innovation Lab · RMKEC Campus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
