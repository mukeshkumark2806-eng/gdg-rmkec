'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Sparkles, CheckCircle, ArrowRight, User, Mail, GraduationCap, Github } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="yellow" className="mb-4">
            Free Chapter Membership
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Join <span className="text-gradient-google">GDG RMKEC</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Start your journey as a Google Developer Group student member. Learn, build, and grow together.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-green-500/40 bg-slate-900/90 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500/40">
              <CheckCircle className="h-10 w-10" />
            </div>

            <h2 className="text-3xl font-extrabold text-white">Welcome to GDG RMKEC!</h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Your application has been received. We have sent a confirmation email to <span className="font-semibold text-blue-400">{formData.email}</span> with your Discord invite link and orientation schedule.
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
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-10 backdrop-blur-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                placeholder="e.g. Karthik Raja"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                icon={<User className="h-4 w-4" />}
              />

              <Input
                label="RMKEC Email Address"
                type="email"
                placeholder="student@rmkec.ac.in"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={<Mail className="h-4 w-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
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
                <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Year of Study</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Primary Track Interest</label>
              <select
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                className="rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
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
              icon={<Github className="h-4 w-4" />}
            />

            <Textarea
              label="Why do you want to join GDG RMKEC?"
              placeholder="Tell us briefly about your interest in developer tech..."
              rows={3}
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            />

            <div className="pt-2">
              <MagneticButton type="submit" variant="google" size="lg" className="w-full">
                <span>Submit Member Application</span>
                <Sparkles className="h-4 w-4" />
              </MagneticButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
