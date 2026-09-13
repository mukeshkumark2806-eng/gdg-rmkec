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
  GraduationCap,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Hash,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Who is eligible to join the Core Team vs become an Event Participant?',
    answer:
      'Active core team roles and technical wing memberships commence from the 2nd year onwards across all engineering branches. 1st-year students can actively participate in all GDG workshops, hackathons, and study jams to build practical skills and prepare for future core intake.',
  },
  {
    question: 'Is there any registration or membership fee?',
    answer:
      'Zero. GDG on Campus RMKEC is 100% free and open for all students of RMK Engineering College. We believe in open-access technical community building.',
  },
  {
    question: 'What is the Core Team induction process?',
    answer:
      'The process involves online application review, a short domain interaction or task with current wing leads (Tech, PR, HR, Design, or Events), and final onboarding into chapter leadership.',
  },
  {
    question: 'Do I need advanced coding or AI experience before applying?',
    answer:
      'No! We value consistency, curiosity, problem-solving mindset, and passion to build with peers far more than expert knowledge. Our senior leads and faculty advisors guide your journey.',
  },
  {
    question: 'What is the expected weekly time commitment for Core Team members?',
    answer:
      'Typically 3–5 hours per week for wing meetups, collaborative project sprints, and organizing events. Sprints flex conveniently around college internal assessments and semester exams.',
  },
];

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
    desc: 'Engineer solutions like the College Bus Tracking System, Navigation Console, and AI tools.',
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
          {/* ============================================================ */}
          {/* LEFT SIDE: Header + Why Join Details + Open Opportunities   */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-10">
            {/* Header / Intro */}
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#34A853] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
                <Heart className="h-3.5 w-3.5" />
                <span>Open Membership &amp; Recruitment</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                Become a Part of the Community
              </h1>
              <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl">
                Join GDG on Campus RMKEC to learn, build, collaborate, and grow alongside passionate
                student innovators across AI, Cloud, and campus-wide software engineering.
              </p>
            </div>

            {/* Why Join Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold">
                  Member Value &amp; Growth
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Why Join GDG RMKEC?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyJoinPoints.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/12 bg-[#121216]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5"
                  >
                    <div className="p-2.5 rounded-xl bg-black border border-white/10 w-fit mb-3">
                      {point.icon}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{point.title}</h3>
                    <p className="text-xs text-white/65 leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Opportunities */}
            <div className="rounded-3xl border border-white/12 bg-black/80 p-6 sm:p-8 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#4285F4]" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Open Opportunities</h3>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#34A853] font-semibold px-2.5 py-0.5 rounded-full bg-[#34A853]/10 border border-[#34A853]/30">
                  Active Intake
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70">
                We are actively recruiting enthusiastic students across all years and departments to join:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {opportunities.map((opp, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-[#121216] border border-white/15 text-xs font-semibold text-white/90"
                  >
                    ✓ {opp}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#121216]/90 border border-white/10 flex items-center gap-2.5">
                  <span className="flex h-2 w-2 rounded-full bg-[#34A853] animate-pulse shrink-0" />
                  <div className="text-[11px]">
                    <span className="font-semibold text-white block">Rolling Intake</span>
                    <span className="text-white/60">Reviewed on a weekly basis</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#121216]/90 border border-white/10 flex items-center gap-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FBBC05] shrink-0" />
                  <div className="text-[11px]">
                    <span className="font-semibold text-white block">Zero Cost Membership</span>
                    <span className="text-white/60">100% free chapter for RMKEC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Benefits & Eligibility Guide */}
            <div className="p-5 sm:p-6 rounded-2xl bg-black/50 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                <GraduationCap className="h-4 w-4 text-[#34A853]" />
                <span>Eligibility &amp; Community Participation</span>
              </div>
              <ul className="text-xs text-white/70 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853] shrink-0 mt-0.5" />
                  <span>Open to all students across all engineering branches and academic years (2nd to 4th year).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853] shrink-0 mt-0.5" />
                  <span>Active team roles and core contributions commence from the 2nd year onwards, while 1st-year students can actively participate in all GDG events, workshops, and study jams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853] shrink-0 mt-0.5" />
                  <span>Direct involvement in flagship hackathons (HackNEXA&apos;26), Agentic AI Jams &amp; A.C.E Day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853] shrink-0 mt-0.5" />
                  <span>Hands-on collaboration on active campus solutions (Bus Tracker, Navigation Console, AI Placement).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE (TOP RIGHT): Member Application Form              */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-[#34A853]/40 bg-black/90 p-8 sm:p-10 text-center backdrop-blur-2xl shadow-2xl"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/40">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <span className="font-mono text-xs uppercase tracking-widest text-[#34A853] px-3.5 py-1 rounded-full border border-[#34A853]/30 bg-[#34A853]/10 inline-block mb-3">
                  Application Received
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">You&apos;re on the List!</h2>
                <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-sm mx-auto">
                  Thank you for applying to GDG on Campus RMKEC. We have recorded your interest in{' '}
                  <span className="font-semibold text-[#4285F4]">{formData.opportunity}</span>. Our team
                  will review your submission and reach out via email shortly.
                </p>

                <div className="mt-7 flex justify-center">
                  <GlowButton onClick={() => setSubmitted(false)} shape="pill" size="md">
                    Submit Another Form →
                  </GlowButton>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/15 bg-[#121216]/90 p-7 sm:p-9 backdrop-blur-2xl shadow-2xl space-y-5"
              >
                {/* Form Header */}
                <div className="border-b border-white/10 pb-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#4285F4] px-3 py-1 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/10">
                      Member Application
                    </span>
                    <span className="text-xs font-mono text-white/50">AY 2025–2026</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                    <User className="h-5 w-5 text-[#4285F4]" />
                    Apply for Membership
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 mt-1">
                    Fill in your details to join the community or technical wings.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                      Full Name <span className="text-[#EA4335]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karthik Raja"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                      College Roll Number / Register Number <span className="text-[#EA4335]">*</span>
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 111723104001 or RMK23CS045"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                      RMKEC Email Address <span className="text-[#EA4335]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="email"
                        required
                        placeholder="student@rmkec.ac.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                        Department <span className="text-[#EA4335]">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-3 text-sm rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4] transition-colors"
                      >
                        <option value="CSE">CSE – Computer Science &amp; Engineering</option>
                        <option value="ECE">ECE – Electronics &amp; Communication</option>
                        <option value="CSBS">CSBS – Computer Science &amp; Business Systems</option>
                        <option value="IT">IT – Information Technology</option>
                        <option value="CSD">CSD – Computer Science &amp; Design</option>
                        <option value="ECA">ECA – Electronics &amp; Computer Engineering</option>
                        <option value="AIDS">AIDS – AI &amp; Data Science</option>
                        <option value="CIVIL">CIVIL – Civil Engineering</option>
                        <option value="EEV">EEV – Electrical &amp; Electric Vehicle</option>
                        <option value="EEE">EEE – Electrical &amp; Electronics Engineering</option>
                        <option value="MECH">MECH – Mechanical Engineering</option>
                        <option value="Other">Other Department</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                        Year of Study <span className="text-[#EA4335]">*</span>
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3.5 py-3 text-sm rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4] transition-colors"
                      >
                        <option value="1st Year" disabled className="text-white/40 bg-zinc-900">
                          1st Year (Intake starts from 2nd Year)
                        </option>
                        <option value="2nd Year">2nd Year (Core / Wings)</option>
                        <option value="3rd Year">3rd Year (Core / Wings)</option>
                        <option value="4th Year">4th Year (Lead / Mentor)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                      Opportunity Preference <span className="text-[#EA4335]">*</span>
                    </label>
                    <select
                      value={formData.opportunity}
                      onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                      className="w-full px-3.5 py-3 text-sm rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-[#4285F4] transition-colors"
                    >
                      <option value="Core Team">Core Team (Lead, Tech, PR, HR, Design, Events)</option>
                      <option value="AI + Electronics Wing">Technical Wing: AI + Electronics</option>
                      <option value="AI/ML Wing">Technical Wing: AI/ML &amp; Gemini</option>
                      <option value="Backend Wing">Technical Wing: Backend &amp; Cloud</option>
                      <option value="Cybersecurity Wing">Technical Wing: Cybersecurity</option>
                      <option value="UI/UX Wing">Technical Wing: UI/UX &amp; Design</option>
                      <option value="Event Management">Event Management Team</option>
                      <option value="Community Member">General Community Member</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                      GitHub Profile / Portfolio (Optional)
                    </label>
                    <div className="relative">
                      <Github className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/75 block mb-1.5">
                      Why do you want to join? <span className="text-[#EA4335]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share your technical interests, problem-solving passion, or what you hope to build..."
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      className="w-full p-3.5 text-sm rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#4285F4] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 space-y-2.5">
                  <GlowButton
                    type="submit"
                    shape="pill"
                    size="lg"
                    className="w-full"
                    surfaceClassName="w-full justify-center py-3.5 text-sm font-semibold"
                  >
                    Submit Application →
                  </GlowButton>
                  <p className="text-center font-mono text-xs text-white/50">
                    Official Chapter Review • Turnaround within 48–72 hours
                  </p>
                </div>
              </form>
            )}

            {/* Core Team Selection Process & Induction Roadmap */}
            <div className="rounded-3xl border border-white/12 bg-black/80 p-6 sm:p-7 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Core Team Selection Process
                  </h3>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4285F4] font-semibold px-2.5 py-0.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30">
                  Core Induction
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#121216] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 rounded-full bg-[#4285F4]/20 text-[#4285F4] font-mono text-[10px] font-bold items-center justify-center shrink-0">
                      1
                    </span>
                    <span className="font-bold text-white text-xs">Application &amp; Profile Screening</span>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    Leads evaluate technical domain interests, project portfolios, and motivation within 48–72 hours.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121216] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 rounded-full bg-[#EA4335]/20 text-[#EA4335] font-mono text-[10px] font-bold items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="font-bold text-white text-xs">Domain Interaction &amp; Task</span>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    Interactive technical sync or short domain task with Wing Leads (AI, Backend, Design, PR, HR).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121216] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 rounded-full bg-[#FBBC05]/20 text-[#FBBC05] font-mono text-[10px] font-bold items-center justify-center shrink-0">
                      3
                    </span>
                    <span className="font-bold text-white text-xs">Core Team Induction</span>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    Formal induction into chapter workspace, access to Google Cloud credits, and domain roadmaps.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#121216] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 rounded-full bg-[#34A853]/20 text-[#34A853] font-mono text-[10px] font-bold items-center justify-center shrink-0">
                      4
                    </span>
                    <span className="font-bold text-white text-xs">Lead Initiatives &amp; Ship</span>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    Drive flagship hackathons (HackNEXA), mentor juniors, and engineer active campus solutions.
                  </p>
                </div>
              </div>

              {/* Direct Support Footer */}
              <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
                <span>Questions about core team roles?</span>
                <a
                  href="/contact"
                  className="text-[#4285F4] hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  Contact Chapter Leads →
                </a>
              </div>
            </div>

            {/* Frequently Asked Questions (FAQ) */}
            <div className="rounded-3xl border border-white/12 bg-[#121216]/90 p-6 sm:p-7 backdrop-blur-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#FBBC05]" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Frequently Asked Questions
                  </h3>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#FBBC05] font-semibold px-2.5 py-0.5 rounded-full bg-[#FBBC05]/10 border border-[#FBBC05]/30">
                  FAQ
                </span>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/08 bg-black/60 overflow-hidden transition-colors hover:border-white/15"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-white/60 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#4285F4]' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-xs text-white/70 leading-relaxed border-t border-white/06 pt-2.5">
                              {faq.answer}
                            </p>
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
      </div>
    </div>
  );
}
