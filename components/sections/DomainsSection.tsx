'use client';

import React from 'react';
import { Cpu, Cloud, Smartphone, Globe, Shield, Palette, ArrowUpRight } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

const tracks = [
  {
    id: 'ai',
    title: 'Generative AI & Machine Learning',
    description:
      'Master Google Gemini APIs, multi-modal prompt engineering, RAG pipelines, fine-tuning, and open LLMs.',
    icon: <Cpu className="h-6 w-6 text-[#4285F4]" />,
    color: '#4285F4',
    tags: ['Gemini 2.5', 'TensorFlow', 'Vertex AI', 'LangChain'],
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure & DevOps',
    description:
      'Build resilient microservices, scale Kubernetes clusters, deploy serverless functions, and automate CI/CD.',
    icon: <Cloud className="h-6 w-6 text-[#EA4335]" />,
    color: '#EA4335',
    tags: ['Google Cloud', 'GKE', 'Terraform', 'Docker'],
  },
  {
    id: 'web',
    title: 'Modern Web Engineering',
    description:
      'Architect fast full-stack applications with Next.js 15, React 19, TypeScript, Edge Runtime, and modern CSS.',
    icon: <Globe className="h-6 w-6 text-[#FBBC05]" />,
    color: '#FBBC05',
    tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'mobile',
    title: 'Mobile & Multiplatform Apps',
    description:
      'Craft smooth native experiences with Flutter, Android Jetpack Compose, Kotlin Multiplatform, and Firebase.',
    icon: <Smartphone className="h-6 w-6 text-[#34A853]" />,
    color: '#34A853',
    tags: ['Flutter', 'Android Compose', 'Kotlin', 'Firebase'],
  },
  {
    id: 'security',
    title: 'Cybersecurity & Open Source',
    description:
      'Master application security, vulnerability testing, capture-the-flag (CTF) challenges, and OSS leadership.',
    icon: <Shield className="h-6 w-6 text-[#4285F4]" />,
    color: '#4285F4',
    tags: ['Ethical Hacking', 'OWASP', 'CTF', 'Git'],
  },
  {
    id: 'design',
    title: 'UI/UX & Creative Technology',
    description:
      'Design accessible, delightful experiences with Material 3, micro-interactions, Figma variables, and design systems.',
    icon: <Palette className="h-6 w-6 text-[#EA4335]" />,
    color: '#EA4335',
    tags: ['Material 3', 'Figma', 'Prototyping', 'Design Systems'],
  },
];

export const DomainsSection: React.FC = () => {
  return (
    <section id="tracks" className="relative py-24 px-4 sm:px-8 text-paper overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#4285F4] font-semibold block mb-2">
              Focus Tracks
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Tech Domains & Stages
            </h2>
          </div>
          <GlowButton href="/projects" shape="pill" size="md">
            Explore Projects →
          </GlowButton>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121216]/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-[#121216]/95 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Icon Box */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/05 group-hover:scale-110 transition-transform mb-5">
                  {track.icon}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white mb-2.5">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {track.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/06 px-2.5 py-1 text-[11px] font-mono text-white/70 border border-white/08"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
