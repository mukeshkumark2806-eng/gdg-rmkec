'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Sparkles,
  CheckCircle,
  User,
  Mail,
  Github,
  Code,
  Award,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

const perks = [
  {
    icon: <Code className="h-5 w-5 text-blue-500" />,
    title: 'Hands-on Workshops',
    desc: 'Access exclusive sessions on Gemini API, Android, Google Cloud, and Web tech.',
  },
  {
    icon: <Award className="h-5 w-5 text-amber-500" />,
    title: 'Google Swag & Credentials',
    desc: 'Earn official Google Cloud badges, certificates, and community swags.',
  },
  {
    icon: <Users className="h-5 w-5 text-emerald-500" />,
    title: 'Peer Mentorship',
    desc: 'Connect with senior devs, industry mentors, and passionate student builders.',
  },
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'CSE',
    year: '2nd Year',
    track: 'AI/ML & Gemini',
    github: '',
    motivation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
    });

    setSubmitted(true);
  };

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
      <FloatShape
        yRange={[0, -20, 0]}
        xRange={[0, 12, 0]}
        dur={8}
        del={0.3}
        style={{ top: '35%', right: '5%', width: 70, height: 70, border: '2px solid rgba(66,133,244,0.18)', borderRadius: '12px', transform: 'rotate(15deg)' }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="blue" className="mb-4">
            Free Chapter Membership
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A2E] tracking-tight leading-tight">
            Join <span className="text-gradient-google">GDG RMKEC</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
            Start your journey as a Google Developer Group student member. Learn, build, and grow together.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-500/30 bg-white/95 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl shadow-emerald-500/10"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-inner">
              <CheckCircle className="h-10 w-10" />
            </div>

            <h2 className="text-3xl font-extrabold text-[#1A1A2E]">Welcome to GDG RMKEC!</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Your application has been received. We have sent a confirmation email to{' '}
              <span className="font-semibold text-blue-600">{formData.email}</span> with your Discord invite link and orientation schedule.
            </p>

            <div className="mt-8">
              <MagneticButton variant="google" onClick={() => setSubmitted(false)}>
                Register Another Member
              </MagneticButton>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-blue-500/5 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                placeholder="e.g. Karthik Raja"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                icon={<User className="h-4 w-4 text-slate-400" />}
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                labelClassName="text-slate-700 font-bold"
              />

              <Input
                label="RMKEC Email Address"
                type="email"
                placeholder="student@rmkec.ac.in"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={<Mail className="h-4 w-4 text-slate-400" />}
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                labelClassName="text-slate-700 font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-sm transition-all duration-200 cursor-pointer hover:border-slate-300"
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="AI-DS">Artificial Intelligence & Data Science (AI-DS)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="Cyber">Cyber Security</option>
                  <option value="Other">Other Branch</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Year of Study</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-sm transition-all duration-200 cursor-pointer hover:border-slate-300"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Primary Track Interest</label>
              <select
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-sm transition-all duration-200 cursor-pointer hover:border-slate-300"
              >
                <option value="AI/ML & Gemini">AI & Machine Learning (Gemini, PyTorch)</option>
                <option value="Web Development">Web Development (Next.js, React)</option>
                <option value="Android & Kotlin">Android & Mobile (Kotlin, Jetpack Compose)</option>
                <option value="Cloud & DevOps">Google Cloud & DevOps (GCP, Docker, K8s)</option>
                <option value="UI/UX Design">UI/UX & Product Design</option>
              </select>
            </div>

            <Input
              label="GitHub Profile URL (Optional)"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              icon={<Github className="h-4 w-4 text-slate-400" />}
              className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              labelClassName="text-slate-700 font-bold"
            />

            <Textarea
              label="Why do you want to join GDG RMKEC?"
              placeholder="Tell us briefly about your interest in developer tech..."
              rows={3}
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              labelClassName="text-slate-700 font-bold"
            />

            <div className="pt-2">
              <MagneticButton type="submit" variant="google" size="lg" className="w-full shadow-lg hover:shadow-xl transition-all duration-300">
                <span>Submit Member Application</span>
                <Sparkles className="h-4 w-4" />
              </MagneticButton>
            </div>
          </form>
        )}

        {/* Member Perks Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-2"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/60">
                {perk.icon}
              </div>
              <h4 className="text-sm font-bold text-[#1A1A2E]">{perk.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
