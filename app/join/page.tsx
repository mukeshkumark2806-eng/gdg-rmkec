'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  Sparkles,
  CheckCircle,
  User,
  Mail,
  Github,
  Heart,
  BookOpen,
  Code2,
  Users,
  Trophy,
  Hammer,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';

const whyJoinPoints = [
  {
    title: 'Learn emerging technologies',
    desc: 'Master AI/ML, Gemini APIs, Google Cloud, Android, and modern full-stack architectures.',
    icon: <BookOpen className="h-5 w-5 text-[#4285F4]" />,
  },
  {
    title: 'Participate in workshops & hackathons',
    desc: 'Compete in events like HackNEXA’26, Agentic AI Study Jams, and Google Solution Challenge.',
    icon: <Trophy className="h-5 w-5 text-[#EA4335]" />,
  },
  {
    title: 'Build real-world projects',
    desc: 'Engineer solutions like the College Bus Tracking System and open-source campus platforms.',
    icon: <Hammer className="h-5 w-5 text-[#FBBC05]" />,
  },
  {
    title: 'Network with peers & mentors',
    desc: 'Connect with talented student engineers, alumni in top tech, and Google Developer Experts.',
    icon: <Users className="h-5 w-5 text-[#34A853]" />,
  },
  {
    title: 'Develop leadership skills',
    desc: 'Lead technical wings, direct event operations, and mentor juniors in real environments.',
    icon: <Lightbulb className="h-5 w-5 text-[#4285F4]" />,
  },
  {
    title: 'Contribute to impactful solutions',
    desc: 'Create open-source software and IoT tools directly benefiting RMKEC students and faculty.',
    icon: <Code2 className="h-5 w-5 text-[#EA4335]" />,
  },
];

const opportunities = [
  'Core Team',
  'Technical Wings (AI+Electronics, AI/ML, Backend, Cybersecurity, UI/UX)',
  'Event Management Team',
  'Community Initiatives & Outreach',
  'Design & Branding',
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'CSE',
    year: '2nd Year',
    opportunity: 'Technical Wings',
    github: '',
    motivation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 pt-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#34A853] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Heart className="h-3.5 w-3.5" />
            <span>Open Membership & Recruitment</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Become a Part of the Community
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Join GDG on Campus RMKEC to learn, build, collaborate, and grow alongside passionate
            student innovators.
          </p>
        </div>

        {/* Why Join Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold block mb-1">
              Member Value
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Why Join?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyJoinPoints.map((point, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/15 bg-[#121216]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:-translate-y-1"
              >
                <div className="p-3 rounded-2xl bg-black border border-white/10 w-fit mb-4">
                  {point.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{point.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities List */}
        <div className="mb-16 rounded-3xl border border-white/15 bg-black p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Open Opportunities</h3>
          <p className="text-xs sm:text-sm text-white/70 mb-6">
            We are looking for enthusiastic students across all years and departments to join:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {opportunities.map((opp, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-[#121216] border border-white/15 text-xs font-semibold text-white/90"
              >
                ✓ {opp}
              </span>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-[#34A853]/40 bg-black p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/40">
                <CheckCircle className="h-10 w-10" />
              </div>

              <h2 className="text-3xl font-bold text-white">Application Received!</h2>
              <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-md mx-auto">
                Thank you for applying to GDG on Campus RMKEC. We have recorded your interest in{' '}
                <span className="font-semibold text-[#4285F4]">{formData.opportunity}</span>. Our team
                will reach out via email shortly.
              </p>

              <div className="mt-8 flex justify-center">
                <GlowButton onClick={() => setSubmitted(false)} shape="pill" size="md">
                  Submit Another Form →
                </GlowButton>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/15 bg-[#121216]/80 p-6 sm:p-10 backdrop-blur-2xl space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-2">Member Application Form</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karthik Raja"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    RMKEC Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      type="email"
                      required
                      placeholder="student@rmkec.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4]"
                  >
                    <option value="CSE">Computer Science & Engineering (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="AI-DS">Artificial Intelligence & Data Science (AI-DS)</option>
                    <option value="ECE">Electronics & Communication (ECE)</option>
                    <option value="Cyber">Cyber Security</option>
                    <option value="Other">Other Branch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                    Year of Study
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4]"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                  Opportunity Preference
                </label>
                <select
                  value={formData.opportunity}
                  onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4]"
                >
                  <option value="Core Team">Core Team (Lead, Tech, PR, HR, Design, Events)</option>
                  <option value="AI + Electronics Wing">Technical Wing: AI + Electronics</option>
                  <option value="AI/ML Wing">Technical Wing: AI/ML & Gemini</option>
                  <option value="Backend Wing">Technical Wing: Backend & Cloud</option>
                  <option value="Cybersecurity Wing">Technical Wing: Cybersecurity</option>
                  <option value="UI/UX Wing">Technical Wing: UI/UX & Design</option>
                  <option value="Event Management">Event Management Team</option>
                  <option value="Community Member">General Community Member</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                  GitHub Profile / Portfolio (Optional)
                </label>
                <div className="relative">
                  <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                  Why do you want to join GDG on Campus RMKEC?
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your technical interests, problem-solving passion, or what you hope to build..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full p-4 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4]"
                />
              </div>

              <div className="pt-2">
                <GlowButton
                  type="submit"
                  shape="pill"
                  size="lg"
                  className="w-full"
                  surfaceClassName="w-full justify-center"
                >
                  Submit Application →
                </GlowButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
