'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Smartphone, BrainCircuit, Cloud, Palette, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';

const domains = [
  {
    id: 'web',
    title: 'Web Development',
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    badgeColor: 'blue' as const,
    glow: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(66,133,244,0.25)]',
    description: 'Master modern frontend architectures with Next.js, React 19, TypeScript, and serverless edge APIs.',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GraphQL'],
    leads: 'Web Squad',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: <BrainCircuit className="h-6 w-6 text-red-400" />,
    badgeColor: 'red' as const,
    glow: 'hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(234,67,53,0.25)]',
    description: 'Harness multimodal Google Gemini AI models, RAG pipelines, PyTorch neural nets, and TensorFlow Lite.',
    skills: ['Gemini API', 'PyTorch', 'TensorFlow', 'LangChain', 'Python'],
    leads: 'GenAI Guild',
  },
  {
    id: 'android',
    title: 'Android & Mobile',
    icon: <Smartphone className="h-6 w-6 text-green-400" />,
    badgeColor: 'green' as const,
    glow: 'hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(52,168,83,0.25)]',
    description: 'Build beautiful native Android apps with Kotlin, Jetpack Compose, Material 3, and Kotlin Multiplatform.',
    skills: ['Kotlin', 'Jetpack Compose', 'KMP', 'Firebase', 'Coroutines'],
    leads: 'Android Unit',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: <Cloud className="h-6 w-6 text-yellow-400" />,
    badgeColor: 'yellow' as const,
    glow: 'hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(251,188,5,0.25)]',
    description: 'Architect scalable containerized applications on Google Cloud Platform using Docker & Kubernetes.',
    skills: ['GCP', 'Docker', 'Kubernetes', 'Cloud Run', 'Terraform'],
    leads: 'Cloud Ops',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design',
    icon: <Palette className="h-6 w-6 text-purple-400" />,
    badgeColor: 'glass' as const,
    glow: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    description: 'Craft world-class user experiences, glassmorphism design systems, micro-interactions, and design specs.',
    skills: ['Figma', 'Material You', 'Prototyping', 'Design Systems'],
    leads: 'Creative Lab',
  },
];

export const DomainsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#0B0F17] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Technology Tracks"
          badgeVariant="yellow"
          title="Master the Next Generation of"
          highlightText="Tech Domains"
          subtitle="Join specialized domain tracks led by expert student mentors and build portfolio-worthy open source software."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, idx) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 ${domain.glow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 border border-white/10 group-hover:scale-110 transition-transform">
                    {domain.icon}
                  </div>
                  <Badge variant={domain.badgeColor}>{domain.leads}</Badge>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  {domain.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                  {domain.description}
                </p>

                {/* Skill Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[11px] text-slate-300 border border-white/5 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <Link href="/projects" className="flex items-center gap-1.5">
                  <span>Explore Track</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
