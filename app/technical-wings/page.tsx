'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  Cpu,
  Cloud,
  Shield,
  Palette,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Github,
  Mail,
  User,
  Hash,
  Phone,
  GraduationCap,
  Layers,
  Code2,
  Lightbulb,
  Clock,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  FolderGit2,
} from 'lucide-react';

interface WingOption {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  skills: string[];
  projectsSample: string;
}

const technicalWings: WingOption[] = [
  {
    id: 'ai-electronics',
    name: 'AI + Electronics Integration',
    shortName: 'AI + Electronics',
    tagline: 'Hardware Prototyping, Embedded AI & IoT Interfacing',
    description:
      'Develop smart embedded devices, integrate sensor networks with microcontrollers (ESP32 / Arduino / Raspberry Pi), and deploy edge AI models for real-world campus telemetry.',
    icon: <Cpu className="h-5 w-5 text-[#34A853]" />,
    color: '#34A853',
    badgeBg: 'bg-[#34A853]/15',
    badgeBorder: 'border-[#34A853]/40',
    badgeText: 'text-[#34A853]',
    skills: ['ESP32 / Arduino', 'Edge AI', 'C++', 'Raspberry Pi', 'Sensors & Actuators', 'MQTT', 'Circuit Design'],
    projectsSample: 'Smart Campus Sensor Hub, Embedded IoT Telemetry, Automated Lab Monitor',
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    shortName: 'AI / ML',
    tagline: 'Generative AI, LLMs & Intelligent Systems',
    description:
      'Build generative agents, fine-tune open models, orchestrate RAG pipelines with Google Gemini APIs, and implement computer vision systems.',
    icon: <Cpu className="h-5 w-5 text-[#4285F4]" />,
    color: '#4285F4',
    badgeBg: 'bg-[#4285F4]/15',
    badgeBorder: 'border-[#4285F4]/40',
    badgeText: 'text-[#4285F4]',
    skills: ['Python', 'Gemini API', 'PyTorch', 'LangChain', 'TensorFlow', 'HuggingFace', 'FastAPI'],
    projectsSample: 'AI Campus Prep Assistant, Semantic Search Engine, Agentic Workflows',
  },
  {
    id: 'backend',
    name: 'Backend Development',
    shortName: 'Backend',
    tagline: 'High-Scale Microservices & Cloud Architectures',
    description:
      'Architect resilient backend services, deploy containerized clusters on Google Cloud (GKE), design distributed databases, and automate CI/CD pipelines.',
    icon: <Cloud className="h-5 w-5 text-[#EA4335]" />,
    color: '#EA4335',
    badgeBg: 'bg-[#EA4335]/15',
    badgeBorder: 'border-[#EA4335]/40',
    badgeText: 'text-[#EA4335]',
    skills: ['Google Cloud', 'Docker', 'Kubernetes', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Terraform'],
    projectsSample: 'Real-Time Bus Tracking API, Chapter Scalable Auth Gateway',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    shortName: 'Cybersecurity',
    tagline: 'Defensive Security, CTFs & Infrastructure Hardening',
    description:
      'Perform security audits, vulnerability triage, secure API engineering, Linux systems administration, and compete in national capture-the-flag competitions.',
    icon: <Shield className="h-5 w-5 text-[#4285F4]" />,
    color: '#4285F4',
    badgeBg: 'bg-[#4285F4]/15',
    badgeBorder: 'border-[#4285F4]/40',
    badgeText: 'text-[#4285F4]',
    skills: ['Linux', 'OWASP Top 10', 'Penetration Testing', 'Network Analysis', 'Cryptography', 'Bash'],
    projectsSample: 'Chapter Security Auditing, GDG RMKEC Internal CTF Arena',
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    shortName: 'UI/UX',
    tagline: 'Material 3 & Motion-Driven Digital Product Design',
    description:
      'Design accessible, human-centric developer experiences, wireframe interactive prototypes in Figma, and build cohesive tokenized design systems.',
    icon: <Palette className="h-5 w-5 text-[#FBBC05]" />,
    color: '#FBBC05',
    badgeBg: 'bg-[#FBBC05]/15',
    badgeBorder: 'border-[#FBBC05]/40',
    badgeText: 'text-[#FBBC05]',
    skills: ['Figma', 'Material Design 3', 'User Research', 'Design Tokens', 'Prototyping', 'Design Systems'],
    projectsSample: 'GDG RMKEC UI Component Kit, HackNEXA Digital Experience Suite',
  },
];

const availableSkillBadges = [
  'Python',
  'TypeScript',
  'JavaScript',
  'Next.js',
  'React',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'Flutter',
  'Kotlin',
  'PyTorch',
  'Gemini API',
  'PostgreSQL',
  'Go',
  'C++',
  'Figma',
  'Linux',
  'Tailwind CSS',
  'Firebase',
  'FastAPI',
];

const departments = [
  'Computer Science and Engineering (CSE)',
  'Electronics and Communication Engineering (ECE)',
  'Artificial Intelligence and Data Science (AIDS)',
  'Information Technology (IT)',
  'Electrical and Electronics Engineering (EEE)',
  'Mechanical Engineering (MECH)',
  'Other Department',
];

const yearLevels = [
  '1st Year (Junior Apprentice)',
  '2nd Year (Core Associate)',
  '3rd Year (Lead Contributor)',
  '4th Year (Senior Mentor / Architect)',
];

const intakeFaqs = [
  {
    q: 'What is the role of a Technical Wing member?',
    a: 'Technical Wing members are the primary builders of GDG on Campus RMKEC. You work in focused squads on live campus solutions (such as the Bus Tracker and Navigation Console), conduct technical study jams, and mentor peers in hackathons.',
  },
  {
    q: 'Can 1st-year students apply for the Technical Wings?',
    a: 'Yes! First-year students with a genuine passion for coding or electronics can join as Apprentice Builders. You will pair with 2nd and 3rd-year leads to learn industry practices and contribute to live repos.',
  },
  {
    q: 'Do I need a finished project or portfolio to apply?',
    a: 'While having a GitHub profile or sample project is helpful, what matters most is your problem-solving mindset, curiosity, and commitment to learning and shipping software.',
  },
  {
    q: 'How much time do I need to commit each week?',
    a: 'We recommend 3–5 hours per week for sprint standups, coding sprints, and collaborative workshops. We naturally pause or reduce hours during college midterms and semester exams.',
  },
  {
    q: 'What benefits and perks do Technical Wing members receive?',
    a: 'Direct mentorship from Core Leads, priority passes to GDG events and hackathons, Google Cloud learning pathways & swags, an official certificate of contribution, and real production software for your engineering resume.',
  },
];

export default function TechnicalWingsRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    department: 'Computer Science and Engineering (CSE)',
    year: '2nd Year (Core Associate)',
    primaryWing: 'AI + Electronics Integration',
    secondaryWing: 'AI / ML',
    skills: ['Python', 'TypeScript'],
    github: '',
    portfolio: '',
    experience: '',
    motivation: '',
    commitment: '3-5 hours/week',
  });

  const [customSkillInput, setCustomSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const handleWingSelect = (wingName: string) => {
    setFormData((prev) => ({ ...prev, primaryWing: wingName }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      }
      return { ...prev, skills: [...prev.skills, skill] };
    });
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setCustomSkillInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.fullName.trim() || !formData.rollNumber.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in all required fields (Full Name, Roll Number, Email).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (formData.skills.length === 0) {
      setErrorMessage('Please select or add at least one technical skill.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          rollNumber: formData.rollNumber,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          year: formData.year,
          opportunity: `Technical Wing: ${formData.primaryWing}`,
          primaryWing: formData.primaryWing,
          secondaryWing: formData.secondaryWing,
          skills: formData.skills.join(', '),
          github: formData.github,
          portfolio: formData.portfolio,
          experience: formData.experience,
          motivation: formData.motivation,
          commitment: formData.commitment,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application. Please try again.');
      }

      setIsSubmitted(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
        });
      } catch {
        // Confetti fallback
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-12 relative overflow-hidden text-paper">
      {/* Background Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] opacity-25"
        style={{
          background:
            'radial-gradient(circle at center, rgba(66,133,244,0.25) 0%, rgba(234,67,53,0.15) 35%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* ============================================================ */}
        {/* TOP HERO HEADER                                              */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-8 pt-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4285F4] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-3 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#4285F4]" />
            <span>GDG on Campus RMKEC · Technical Wings Intake 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Join the Technical Wings
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
            Engineer high-impact campus solutions, deploy production-grade software, and build alongside
            mentors across AI + Electronics Integration, AI / ML, Backend Development, Cybersecurity, and UI/UX Design.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 font-mono text-xs text-white/70">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/05 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
              <span>5 Specialized Focus Wings</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/05 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              <span>Real Campus Deployments</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/05 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
              <span>100% Student-Led</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN SIDE-BY-SIDE LAYOUT                                     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8">
          {/* ========================================================== */}
          {/* LEFT SIDE: WINGS SELECTOR WITH BALANCED SCROLLABLE HEIGHT  */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Header / Intro */}
            <div className="mb-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs uppercase tracking-wider text-[#34A853] font-semibold">
                  Engineering Squads
                </span>
                <span className="font-mono text-[10px] text-white/40">Click to Select</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Select Your Technical Wing
              </h2>
              <p className="text-xs text-white/60 mt-0.5">
                Choose a primary wing below to inspect its domain and auto-set it in the registration form.
              </p>
            </div>

            {/* Wings Interactive List (No inner scrolling, instant 1-click select & inspect) */}
            <div className="space-y-2.5">
              {technicalWings.map((wing) => {
                const isSelected = formData.primaryWing === wing.name;
                return (
                  <div
                    key={wing.id}
                    onClick={() => handleWingSelect(wing.name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleWingSelect(wing.name)}
                    className={`group rounded-2xl border transition-all duration-200 cursor-pointer text-left overflow-hidden ${
                      isSelected
                        ? 'border-[#4285F4] bg-[#161626] ring-2 ring-[#4285F4]/60 shadow-[0_8px_24px_rgba(66,133,244,0.25)] p-4 sm:p-5'
                        : 'border-white/10 bg-[#121216]/80 hover:border-white/25 hover:bg-[#15151c] p-3.5 sm:p-4'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'border-[#4285F4]/40 bg-[#4285F4]/15'
                              : 'border-white/10 bg-white/05'
                          }`}
                        >
                          {wing.icon}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                            {wing.name}
                          </h3>
                          <p className="text-xs font-mono text-white/50">{wing.tagline}</p>
                        </div>
                      </div>

                      {isSelected ? (
                        <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#4285F4] text-white font-semibold flex items-center gap-1 shadow-sm shrink-0">
                          <CheckCircle2 className="h-3 w-3" />
                          Selected
                        </span>
                      ) : (
                        <span
                          className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${wing.badgeBg} ${wing.badgeBorder} ${wing.badgeText} font-semibold shrink-0`}
                        >
                          {wing.shortName}
                        </span>
                      )}
                    </div>

                    {/* Expanded Content for Selected Wing */}
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="pt-3.5 mt-3 border-t border-white/10 space-y-3"
                        >
                          <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
                            {wing.description}
                          </p>

                          <div>
                            <span className="text-[10px] font-mono text-white/40 block mb-1.5">
                              Key Technologies:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {wing.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] font-mono text-white/75"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-black/50 border border-white/08 text-[11px] text-white/70 flex items-start gap-2">
                            <FolderGit2 className="h-3.5 w-3.5 text-white/40 shrink-0 mt-0.5" />
                            <span>{wing.projectsSample}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT SIDE: TECHNICAL WING REGISTRATION FORM (SIDE BY SIDE)*/}
          {/* ========================================================== */}
          <div className="lg:col-span-7">
            <div
              id="registration-form"
              className="rounded-3xl border border-white/15 bg-[#121218] p-5 sm:p-7 backdrop-blur-2xl shadow-2xl relative"
            >
              {/* Form Header */}
              <div className="border-b border-white/10 pb-4 mb-5">
                <div className="mb-2">
                  <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#4285F4] px-3 py-1 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/10">
                    Official Application Form
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  <Code2 className="h-6 w-6 text-[#4285F4]" />
                  <span>Technical Wing Registration</span>
                </h2>
                <p className="text-xs sm:text-sm text-white/65 mt-1">
                  Applying for <strong className="text-white">{formData.primaryWing}</strong>. Fill in
                  your details to register for the technical squad.
                </p>
              </div>

              {/* Error banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-[#EA4335]/15 border border-[#EA4335]/40 text-[#EA4335] text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success View */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#34A853]/20 border border-[#34A853]/40 text-[#34A853] mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    Application Received!
                  </h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your
                    registration for{' '}
                    <span className="text-[#4285F4] font-semibold">{formData.primaryWing}</span> has been
                    logged.
                  </p>

                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/50 border border-white/10 text-left text-xs font-mono text-white/70 space-y-2 mb-8">
                    <div className="flex justify-between border-b border-white/08 pb-1.5">
                      <span>Registered Wing:</span>
                      <span className="text-white font-semibold">{formData.primaryWing}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/08 pb-1.5">
                      <span>Applicant Email:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span>Next Step:</span>
                      <span className="text-[#34A853]">Invitation to WhatsApp group &amp; Offer letter</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          rollNumber: '',
                          email: '',
                          phone: '',
                          department: 'Computer Science and Engineering (CSE)',
                          year: '2nd Year (Core Associate)',
                          primaryWing: 'AI + Electronics Integration',
                          secondaryWing: 'AI / ML',
                          skills: ['Python', 'TypeScript'],
                          github: '',
                          portfolio: '',
                          experience: '',
                          motivation: '',
                          commitment: '3-5 hours/week',
                        });
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-mono text-white/70 hover:text-white bg-white/08 hover:bg-white/15 transition-all cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                    <GlowButton href="/projects" shape="pill" size="md">
                      Explore Campus Projects →
                    </GlowButton>
                  </div>
                </motion.div>
              ) : (
                /* The Registration Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 1. Candidate Particulars (Side-by-side) */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/90 border-b border-white/10 pb-1.5 flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-[#4285F4]" />
                      <span>1. Candidate Particulars</span>
                    </h4>

                    {/* Name & Roll Number side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Full Name <span className="text-[#EA4335]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Mukesh Kumar K"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Roll / Register Number <span className="text-[#EA4335]">*</span>
                        </label>
                        <div className="relative">
                          <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="text"
                            required
                            value={formData.rollNumber}
                            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                            placeholder="e.g. 111723104088"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Student Email Address <span className="text-[#EA4335]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="student@rmkec.ac.in"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          WhatsApp / Contact
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Department & Year side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Department / Branch
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <select
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] appearance-none transition-all cursor-pointer"
                          >
                            {departments.map((dept) => (
                              <option key={dept} value={dept} className="bg-[#121216] text-white">
                                {dept}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Current Year of Study
                        </label>
                        <div className="relative">
                          <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <select
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] appearance-none transition-all cursor-pointer"
                          >
                            {yearLevels.map((lvl) => (
                              <option key={lvl} value={lvl} className="bg-[#121216] text-white">
                                {lvl}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Technical Wing & Skills (Side-by-side) */}
                  <div className="space-y-3.5 pt-3 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/90 border-b border-white/10 pb-1.5 flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-[#EA4335]" />
                      <span>2. Technical Wing &amp; Tech Stack</span>
                    </h4>

                    {/* Primary Wing & Secondary Wing side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Primary Technical Wing <span className="text-[#EA4335]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.primaryWing}
                            onChange={(e) => setFormData({ ...formData, primaryWing: e.target.value })}
                            className="w-full px-3.5 pr-8 py-2.5 rounded-xl bg-black/50 border border-[#4285F4]/60 text-white text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] appearance-none transition-all cursor-pointer"
                          >
                            {technicalWings.map((w) => (
                              <option key={w.id} value={w.name} className="bg-[#121216] text-white">
                                {w.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Alternative Wing (Optional)
                        </label>
                        <div className="relative">
                          <select
                            value={formData.secondaryWing}
                            onChange={(e) => setFormData({ ...formData, secondaryWing: e.target.value })}
                            className="w-full px-3.5 pr-8 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] appearance-none transition-all cursor-pointer"
                          >
                            <option value="None" className="bg-[#121216] text-white">
                              None (Only Primary Wing)
                            </option>
                            {technicalWings.map((w) => (
                              <option key={w.id} value={w.name} className="bg-[#121216] text-white">
                                {w.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        </div>
                      </div>
                    </div>

                    {/* Skill Badges Selection */}
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-2">
                        Select Your Known Technologies <span className="text-[#EA4335]">*</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-black/40 border border-white/10 mb-2.5">
                        {availableSkillBadges.map((badge) => {
                          const isSelected = formData.skills.includes(badge);
                          return (
                            <button
                              type="button"
                              key={badge}
                              onClick={() => toggleSkill(badge)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#4285F4] text-white font-semibold shadow-sm'
                                  : 'bg-white/06 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '}
                              {badge}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Skill Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customSkillInput}
                          onChange={(e) => setCustomSkillInput(e.target.value)}
                          onKeyDown={handleAddCustomSkill}
                          placeholder="Add custom tools (e.g. Flutter, Rust, OpenCV, Figma)..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#4285F4] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomSkill}
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>

                    {/* GitHub & Portfolio side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          GitHub Profile URL
                        </label>
                        <div className="relative">
                          <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="url"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            placeholder="https://github.com/username"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Portfolio / LinkedIn Link
                        </label>
                        <div className="relative">
                          <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="url"
                            value={formData.portfolio}
                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Engineering Experience & Project Ideas (Side-by-side) */}
                  <div className="space-y-3.5 pt-3 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/90 border-b border-white/10 pb-1.5 flex items-center gap-2">
                      <Lightbulb className="h-3.5 w-3.5 text-[#FBBC05]" />
                      <span>3. Projects, Experience &amp; Motivation</span>
                    </h4>

                    {/* Projects & Motivation side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          Prior Projects / Learning Journey
                        </label>
                        <textarea
                          rows={3}
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          placeholder="Projects you built, hackathons attended, or tools you're exploring..."
                          className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all resize-y"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1.5">
                          What campus problem do you want to solve?
                        </label>
                        <textarea
                          rows={3}
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          placeholder="Ideas for AI campus tools, real-time bus tracking, Kubernetes, or CTF challenges..."
                          className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 text-xs focus:border-[#4285F4] focus:outline-none focus:ring-1 focus:ring-[#4285F4] transition-all resize-y"
                        />
                      </div>
                    </div>

                    {/* Time Commitment (3 columns) */}
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5">
                        Weekly Time Commitment
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {['3-5 hours/week', '5-8 hours/week', '8+ hours/week'].map((commitment) => (
                          <button
                            type="button"
                            key={commitment}
                            onClick={() => setFormData({ ...formData, commitment })}
                            className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              formData.commitment === commitment
                                ? 'border-[#4285F4] bg-[#4285F4]/20 text-[#4285F4] font-semibold shadow-sm'
                                : 'border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/20'
                            }`}
                          >
                            <Clock className="h-3.5 w-3.5" />
                            {commitment}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-white/40">
                      * Applications are reviewed on a rolling basis.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-xs sm:text-sm shadow-[0_0_24px_rgba(66,133,244,0.4)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Technical Wing Application</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* INTAKE ROADMAP BANNER (FULL WIDTH TRANSITION)               */}
        {/* ============================================================ */}
        <div className="rounded-3xl border border-white/10 bg-[#121216]/70 backdrop-blur-xl p-5 sm:p-7 mb-10 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5 mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#FBBC05] font-semibold block mb-0.5">
                Intake Process
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Selection &amp; Onboarding Roadmap</h3>
            </div>
            <span className="font-mono text-xs text-white/50 bg-white/05 px-3 py-1 rounded-full border border-white/10 w-fit">
              3 Streamlined Stages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/08 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#4285F4] block mb-1">STAGE 01</span>
                <h4 className="text-sm font-semibold text-white mb-1">Online Application</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  Submit your candidate particulars, known tech stack, and motivation via the registration form above.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/08 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#EA4335] block mb-1">STAGE 02</span>
                <h4 className="text-sm font-semibold text-white mb-1">Technical Review</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  Participate in a friendly domain interaction or solve a mini task aligned with your chosen wing.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/08 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#34A853] block mb-1">STAGE 03</span>
                <h4 className="text-sm font-semibold text-white mb-1">Squad Onboarding</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  Candidates will be invited to the WhatsApp group and will receive their offer letter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* FAQ ACCORDION SECTION                                        */}
        {/* ============================================================ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-[#34A853] font-semibold block mb-1">
              Have Questions?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Technical Wings Intake FAQ</h3>
          </div>

          <div className="space-y-3">
            {intakeFaqs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#121216]/75 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white/90">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/60 transition-transform duration-200 shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#4285F4]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/05 pt-3">
                          {faq.a}
                        </div>
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
