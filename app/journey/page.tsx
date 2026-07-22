import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { Calendar, Trophy, Rocket, Sparkles, Star, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Journey & Milestones',
  description: 'Explore the timeline and growth story of GDG RMKEC from 2022 to the present.',
};

const timelineEvents = [
  {
    year: '2026',
    title: 'Generative AI & Solution Challenge Expansion',
    tagline: 'Leading multimodal Gemini integration across student projects.',
    description: 'Surpassed 1,200 active student members. Launched dedicated GenAI RAG pipelines and hosted campus hackathons with 250+ coders.',
    icon: <Sparkles className="h-5 w-5 text-yellow-400" />,
    badgeColor: 'yellow' as const,
  },
  {
    year: '2025',
    title: 'Google Cloud Jam Victory & Smart India Hackathon',
    tagline: 'Securing top podium finishes nationally.',
    description: '150+ students earned official Google Cloud skill badges. Team EcoRoute AI secured top recognition at Google Solution Challenge.',
    icon: <Trophy className="h-5 w-5 text-red-400" />,
    badgeColor: 'red' as const,
  },
  {
    year: '2024',
    title: 'Android DevFest & Open Source Drive',
    tagline: 'Over 200 open-source pull requests merged.',
    description: 'Conducted inaugural Android DevFest with Jetpack Compose. Partnered with regional chapters for statewide Hacktoberfest sprint.',
    icon: <Rocket className="h-5 w-5 text-blue-400" />,
    badgeColor: 'blue' as const,
  },
  {
    year: '2023',
    title: 'First Google Cloud Bootcamp',
    tagline: 'Hands-on Kubernetes and Docker training.',
    description: 'Expanded domain tracks to include Cloud & DevOps. Trained 300+ students on Google Cloud infrastructure and GCP Console.',
    icon: <Users className="h-5 w-5 text-green-400" />,
    badgeColor: 'green' as const,
  },
  {
    year: '2022',
    title: 'Official Chapter Inception',
    tagline: 'Founded at R.M.K. Engineering College.',
    description: 'Inauguration of GDSC / GDG RMKEC under faculty advisement, kicking off inaugural Web & Mobile developer cohorts.',
    icon: <Star className="h-5 w-5 text-purple-400" />,
    badgeColor: 'glass' as const,
  },
];

export default function JourneyPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="yellow" className="mb-4">
            Chapter Timeline
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Our Journey of <br />
            <span className="text-gradient-google">Growth & Impact</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed font-normal">
            From our founding days to national hackathon podiums, follow the major milestones that shaped GDG RMKEC.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative border-l-2 border-white/15 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-8">
          {timelineEvents.map((item, idx) => (
            <FadeIn key={item.year + item.title} delay={idx * 0.1}>
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border-2 border-blue-500 shadow-[0_0_15px_rgba(66,133,244,0.4)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-mono font-bold text-blue-400 tracking-wider">
                      {item.year}
                    </span>
                    <Badge variant={item.badgeColor}>{item.title.split(' ')[0]}</Badge>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-400 mb-3">{item.tagline}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
