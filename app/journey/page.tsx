import React from 'react';
import { Metadata } from 'next';
import {
  Sparkles,
  History,
  Clock,
  Compass,
  CheckCircle2,
  Trophy,
  Cpu,
  Palette,
  Cloud,
  Layers,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

export const metadata: Metadata = {
  title: 'Our Journey | GDG on Campus RMKEC',
  description: 'Explore the past, present milestones, and future roadmap of GDG on Campus RMKEC.',
};

const milestones = [
  {
    period: 'September 2025',
    title: 'Chapter Inception & Core Foundation',
    icon: <History className="h-6 w-6 text-[#4285F4]" />,
    color: '#4285F4',
    badge: 'Foundation',
    description:
      'GDG on Campus RMKEC was established under the guidance of Faculty Coordinator Dr. Siva Chandar K (Associate Professor, ECE) and Chapter Lead R J Vishal (III ECE). A passionate team of student leads across Technical, HR, PR, and Design united to create an open developer home for engineering students across all departments.',
    tags: ['Chapter Launch', 'Faculty Advisory', '5 Core Wings', 'Zero-Cost Community'],
  },
  {
    period: 'October 2025',
    title: 'Google Cloud Campaign Study Jam',
    icon: <Cloud className="h-6 w-6 text-[#34A853]" />,
    color: '#34A853',
    badge: 'Milestone 1',
    description:
      'Our inaugural large-scale learning campaign mobilized 100+ passionate students into hands-on Google Cloud computing pathways. Over 40 students achieved certified milestone completions, earning official Google Cloud t-shirts and badges felicitated directly by the college Principal.',
    tags: ['100+ Learners', '40+ Certified Completers', 'Principal Felicitations', 'Google Cloud Badges'],
  },
  {
    period: 'January 8, 2026',
    title: 'HackNEXA \'26 – Flagship National Tech Sprint Hackathon',
    icon: <Trophy className="h-6 w-6 text-[#FBBC05]" />,
    color: '#FBBC05',
    badge: 'Flagship Hackathon',
    description:
      'Organized under the national Tech Sprint campaign by Google Developer Group on Campus India. Conducted on Hack2Skill with 653 registered participants, 257 teams, and 114 project submissions under Open Innovation. 55 shortlisted teams presented live prototypes in the ECE laboratories evaluated by a 10-member faculty jury, followed by 21 finalists evaluated by senior professors. Top 3 teams—Mavericks (Gold 🥇), Outliers (Silver 🥈), and G.O.A.T (Bronze 🥉)—won official Google reward kits.',
    tags: ['653 Participants', '257 Teams', '114 Submissions', '55 On-site Finalists', 'Top 3 Google Kits'],
  },
  {
    period: 'March 4, 2026',
    title: 'Agentic AI Study Jam – An Immersive Workshop',
    icon: <Cpu className="h-6 w-6 text-[#EA4335]" />,
    color: '#EA4335',
    badge: 'In-Person Workshop',
    description:
      'Hosted at RJ Block, SH-1 (First Floor), RMKEC from 8:50 AM to 12:50 PM. Covered hands-on Prompt Engineering, an AI sycophancy experiment challenge, and guided development of an autonomous Calendar Reminder Agent utilizing Agentic AI frameworks led by Dhakshinesh (III CSE) and R J Vishal (III ECE). Ended with a high-stakes Quiz Arena recognizing the top 3 teams.',
    tags: ['Hands-on Lab', 'AI Prompting', 'AI Sycophancy Challenge', 'Calendar Agent', 'Quiz Arena'],
  },
  {
    period: 'April 6, 2026',
    title: 'A.C.E DAY – AI Collage Exchange (Batches 1 & 2)',
    icon: <Palette className="h-6 w-6 text-[#4285F4]" />,
    color: '#4285F4',
    badge: 'Online Showcase',
    description:
      'A unique double-batch online initiative via Google Meet blending generative AI art with project pitching. 15+ student innovators pitched real-world solutions through AI-generated collages across EdTech, GovTech, Healthcare, and TinyML—including READTRACE (Smart AI Highlighter Pen by Kanika S), NGO CONNECT, ProcureIQ, and SEIS. Included step-by-step onboarding for the Google Solution Challenge.',
    tags: ['15+ AI Pitch Collages', 'Double Batch', 'READTRACE Pen', 'ProcureIQ', 'Solution Challenge'],
  },
];

const futureRoadmap = [
  'Google Solution Challenge campus project submissions & global mentoring',
  'Inter-college hackathons and developer summits at RMKEC campus',
  'Deployment of the Real-Time College Bus Tracking System for 4,000+ commuters',
  'Expansion of indoor-outdoor College Navigation Console across 80+ labs',
  'AI mock interview and placement preparation tooling powered by Gemini',
  'Open-source student developer incubation across university repositories',
];

export default function JourneyPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 pt-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBBC05] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Chapter Timeline & Milestones</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Our Journey
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            From our founding in September 2025 through HackNEXA&apos;26, Agentic AI, and A.C.E Day to our active present and future roadmap.
          </p>
        </div>

        {/* Journey Continuous Line Summary Banner */}
        <div className="relative mb-16 p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-r from-[#4285F4]/10 via-[#34A853]/10 via-[#FBBC05]/10 to-[#EA4335]/10 backdrop-blur-xl text-center overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />
          <p className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold mb-2">
            The Continuous Journey
          </p>
          <blockquote className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug max-w-3xl mx-auto">
            &ldquo;From chapter inception to national hackathons, Agentic AI workshops, and campus-wide deployments — one unbroken line of passion, code, and community impact.&rdquo;
          </blockquote>
        </div>

        {/* Connected Journey Timeline */}
        <div className="relative mb-20">
          {/* Continuous vertical timeline line connecting all milestones, the present, and the future */}
          <div
            className="absolute left-4 sm:left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#4285F4] via-[#34A853] via-[#FBBC05] via-[#EA4335] to-[#4285F4] opacity-50 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-12">
            {milestones.map((ms, idx) => (
              <div key={idx} className="relative pl-10 sm:pl-16 group">
                {/* Connecting Node on the Line */}
                <div
                  className="absolute left-4 sm:left-7 top-8 -translate-x-1/2 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border-2 transition-transform duration-300 group-hover:scale-125 z-10"
                  style={{
                    borderColor: ms.color,
                    boxShadow: `0 0 14px ${ms.color}80`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ms.color }}
                  />
                </div>

                <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-7 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:-translate-y-1 hover:bg-[#121216]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-black border border-white/10">
                        {ms.icon}
                      </div>
                      <div>
                        <span
                          className="font-mono text-xs uppercase tracking-widest font-semibold block"
                          style={{ color: ms.color }}
                        >
                          {ms.period}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                          {ms.title}
                        </h2>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/06 border border-white/10 text-white/80">
                      {ms.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-5">
                    {ms.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/08">
                    {ms.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] sm:text-xs font-mono text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Present Community Snapshot */}
            <div className="relative pl-10 sm:pl-16 group">
              {/* Connecting Node on the Line */}
              <div
                className="absolute left-4 sm:left-7 top-8 -translate-x-1/2 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border-2 border-[#34A853] transition-transform duration-300 group-hover:scale-125 z-10"
                style={{ boxShadow: '0 0 14px #34A85380' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>

              <div className="rounded-3xl border border-white/15 bg-black p-7 sm:p-10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-[#121216] border border-white/10 text-[#34A853]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#34A853] font-semibold">
                      Active Chapter Ecosystem
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">The Present</h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                  Today, GDG on Campus RMKEC is a vibrant, multi-disciplinary technical community with over <strong>653 hackathon participants</strong>, <strong>114 project submissions</strong>, <strong>40+ certified Google Cloud completers</strong>, and <strong>15+ AI pitch concepts</strong>. Our technical wings are actively developing real-world solutions including the <strong>Real-Time College Bus Tracking System</strong>, <strong>College Navigation Console</strong>, and <strong>AI Placement Preparation platform</strong>.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                    HackNEXA 653+ Participants
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                    257 Registered Teams
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                    40+ Cloud Completers
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                    5 Technical Wings
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/90">
                    14+ Innovation Projects
                  </span>
                </div>
              </div>
            </div>

            {/* The Future Horizons */}
            <div className="relative pl-10 sm:pl-16 group">
              {/* Connecting Node on the Line */}
              <div
                className="absolute left-4 sm:left-7 top-8 -translate-x-1/2 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border-2 border-[#FBBC05] transition-transform duration-300 group-hover:scale-125 z-10"
                style={{ boxShadow: '0 0 14px #FBBC0580' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
              </div>

              <div className="rounded-3xl border border-white/15 bg-[#121216]/80 p-7 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-black border border-white/10 text-[#FBBC05]">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#FBBC05] font-semibold">
                      Upcoming Horizons
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">The Future Roadmap</h2>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-6">
                  Expanding our reach, open-source engineering, and ecosystem impact across RMK Group of Institutions:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {futureRoadmap.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-black/60 border border-white/10"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#FBBC05] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-white/90 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <GlowButton href="/join" shape="pill" size="md">
                    Shape the Future with Us →
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
