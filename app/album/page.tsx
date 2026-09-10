'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  FolderOpen,
  Grid,
  Images,
  ArrowRight,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

export type EventCategory =
  | 'Google Cloud Campaign'
  | "HackNEXA'26 Hackathon"
  | 'Agentic AI Study Jam'
  | 'A.C.E - AI Collage Day';

export interface AlbumPhoto {
  id: string;
  title: string;
  event: EventCategory;
  category: EventCategory;
  year: '2026' | '2025';
  date: string;
  location: string;
  image: string;
  caption: string;
  attendees?: string;
  tags: string[];
}

export interface EventAlbum {
  id: string;
  name: EventCategory;
  tagline: string;
  year: '2026' | '2025';
  date: string;
  location: string;
  color: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  coverImage: string;
  attendees: string;
  description: string;
}

const eventAlbums: EventAlbum[] = [
  {
    id: 'cloud-campaign',
    name: 'Google Cloud Campaign',
    tagline: 'Cloud Skills Boost & Certifications',
    year: '2025',
    date: 'October 2025',
    location: 'Main Auditorium & Computer Centre 3, RMKEC',
    color: '#4285F4',
    badgeBorder: 'border-[#4285F4]/40',
    badgeBg: 'bg-[#4285F4]/15',
    badgeText: 'text-blue-300',
    coverImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=75',
    attendees: '100+ Learners & 40+ Completers',
    description:
      'Hands-on Kubernetes labs, cloud infrastructure quests, and felicitation of 40+ certified pathway completers with official Google Cloud swags and T-shirts.',
  },
  {
    id: 'hacknexa-26',
    name: "HackNEXA'26 Hackathon",
    tagline: '24-Hour Flagship Hackathon',
    year: '2026',
    date: 'February 2026',
    location: 'Main Auditorium & Central Computing Lab, RMKEC',
    color: '#EA4335',
    badgeBorder: 'border-[#EA4335]/40',
    badgeBg: 'bg-[#EA4335]/15',
    badgeText: 'text-red-300',
    coverImage:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=75',
    attendees: '650+ Teams & 250+ Finalists',
    description:
      'Flagship 24-hour hackathon bringing together 650+ teams across RMK Group of Institutions to prototype real-world AI, Cloud, and IoT innovations.',
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI Study Jam',
    tagline: 'Autonomous Agents & Prompt Engineering',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    color: '#34A853',
    badgeBorder: 'border-[#34A853]/40',
    badgeBg: 'bg-[#34A853]/15',
    badgeText: 'text-emerald-300',
    coverImage: '/images/agentic-ai/agentic-ai-poster.jpg',
    attendees: '120+ Builders & Mentors',
    description:
      'Hands-on study jam on Agentic AI, Prompt Engineering frameworks (Co-STAR, ROSES, APE, Tree of Thoughts), tool calling, and live workflow development with student builders.',
  },
  {
    id: 'ace-collage',
    name: 'A.C.E - AI Collage Day',
    tagline: 'AI Collage Exchange & Project Pitching',
    year: '2026',
    date: 'April 2026',
    location: 'Google Meet (Online Session)',
    color: '#FBBC05',
    badgeBorder: 'border-[#FBBC05]/40',
    badgeBg: 'bg-[#FBBC05]/15',
    badgeText: 'text-amber-300',
    coverImage: '/images/ace-day/ace-poster.png',
    attendees: '10 Presenters & 30+ Participants',
    description:
      'AI Collage Exchange event where students conceptualized real-world solutions across healthcare, civic governance, traffic, and education through AI-generated visual collages.',
  },
];

const albumPhotos: AlbumPhoto[] = [
  // 1. Google Cloud Campaign (October 2025)
  {
    id: 'alb-cloud-1',
    title: 'Principal Felicitations & Official T-Shirt Distribution',
    event: 'Google Cloud Campaign',
    category: 'Google Cloud Campaign',
    year: '2025',
    date: 'October 2025',
    location: 'Main Auditorium, RMKEC',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=75',
    caption:
      'College Principal and Faculty Advisors felicitating 40+ certified pathway completers with official Google Cloud T-shirt rewards and milestone swag bags.',
    attendees: '40+ Completers',
    tags: ['Google Cloud', 'Principal Felicitations', 'Milestone Completers', 'T-Shirts'],
  },
  {
    id: 'alb-cloud-2',
    title: 'Hands-on Cloud Infrastructure & Kubernetes Lab Jam',
    event: 'Google Cloud Campaign',
    category: 'Google Cloud Campaign',
    year: '2025',
    date: 'October 2025',
    location: 'Computer Centre 3, RMKEC',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Over 100+ enthusiastic student developers navigating Google Cloud Skills Boost quests, deploying GKE clusters and IAM policies in lab workstations.',
    attendees: '100+ Learners',
    tags: ['GCP Badges', 'Cloud Skills Boost', 'Kubernetes', 'Hands-on Labs'],
  },
  {
    id: 'alb-cloud-3',
    title: 'Peer Mentorship & Skill Badge Completion Sprint',
    event: 'Google Cloud Campaign',
    category: 'Google Cloud Campaign',
    year: '2025',
    date: 'October 2025',
    location: 'Cloud Computing Lab, RMKEC',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Senior technical leads and Cloud Facilitators conducting peer code walkthroughs and troubleshooting console deployment errors with first-time learners.',
    attendees: 'Cloud Facilitators',
    tags: ['Peer Mentorship', 'Skill Badges', 'DevOps', 'Study Jam'],
  },
  {
    id: 'alb-cloud-4',
    title: 'Cloud Arcade Swag Celebration & Leaderboard Highlights',
    event: 'Google Cloud Campaign',
    category: 'Google Cloud Campaign',
    year: '2025',
    date: 'October 2025',
    location: 'Seminar Hall, RMKEC',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Celebrating top arcade leaderboard scorers with Google Cloud branded backpacks, bottles, stickers, and official completion certificates.',
    attendees: 'Top Scorers',
    tags: ['Cloud Arcade', 'Swag Celebration', 'Leaderboard', 'GCP Community'],
  },

  // 2. HackNEXA'26 Hackathon (February 2026)
  {
    id: 'alb-hacknexa-1',
    title: "HackNEXA'26 Grand Opening Ceremony & Keynote",
    event: "HackNEXA'26 Hackathon",
    category: "HackNEXA'26 Hackathon",
    year: '2026',
    date: 'February 2026',
    location: 'Main Auditorium, RMKEC',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Kickoff ceremony of HackNEXA’26 bringing together 650+ participating teams across RMK Group of Institutions to solve real-world challenges.',
    attendees: '650+ Teams',
    tags: ['HackNEXA', 'TechSprint', 'Opening Ceremony', 'Keynote'],
  },
  {
    id: 'alb-hacknexa-2',
    title: 'Overnight Prototyping & Sprint Jam',
    event: "HackNEXA'26 Hackathon",
    category: "HackNEXA'26 Hackathon",
    year: '2026',
    date: 'February 2026',
    location: 'Central Computing Lab, RMKEC',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Student builder teams collaborating through the night on software MVPs, hardware IoT circuits, and AI agent architectures.',
    attendees: '250+ Finalists',
    tags: ['Hackathon', 'Coding Sprint', 'Innovation', 'Mentorship'],
  },
  {
    id: 'alb-hacknexa-3',
    title: 'Jury Evaluation & Live Demos',
    event: "HackNEXA'26 Hackathon",
    category: "HackNEXA'26 Hackathon",
    year: '2026',
    date: 'February 2026',
    location: 'Auditorium Seminar Hall, RMKEC',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Finalist teams pitching working prototypes in front of GDG India mentors and faculty evaluators on the HackNEXA portal.',
    attendees: '250+ Evaluated',
    tags: ['Jury Review', 'Live Demos', 'Pitchathon'],
  },
  {
    id: 'alb-hacknexa-4',
    title: 'HackNEXA Winners & Swags Felicitation',
    event: "HackNEXA'26 Hackathon",
    category: "HackNEXA'26 Hackathon",
    year: '2026',
    date: 'February 2026',
    location: 'Main Stage, RMKEC',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=75',
    caption:
      'Celebrating top 3 champion teams awarded exclusive GDG India swags, certificates, and incubator mentorship.',
    attendees: 'Champions',
    tags: ['GDG India Swags', 'Awards', 'Felicitation', 'Winners'],
  },

  // 3. Agentic AI Study Jam (January 2026)
  {
    id: 'alb-agentic-poster',
    title: 'Official Event Poster — Agentic AI Study Jam',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-poster.jpg',
    caption:
      'Official event poster for the Agentic AI Study Jam organized by GDG on Campus RMKEC, spotlighting prompt engineering, autonomous agents, and hands-on building.',
    attendees: 'GDG RMKEC Community',
    tags: ['Official Poster', 'Agentic AI', 'GDG RMKEC', 'Study Jam'],
  },
  {
    id: 'alb-agentic-hall-gathering',
    title: 'Tech Seminar Hall Gathering & Welcome',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-hall-gathering.jpg',
    caption:
      'Students assembling at the Tech Seminar Hall as the Agentic AI Study Jam kicks off with an introduction to next-generation AI workflows.',
    attendees: '120+ Participants',
    tags: ['Auditorium', 'Welcome', 'Community', 'Kickoff'],
  },
  {
    id: 'alb-agentic-keynote',
    title: 'Opening Keynote: Welcoming Student AI Builders',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Main Stage, RMKEC',
    image: '/images/agentic-ai/agentic-ai-keynote.jpg',
    caption:
      'Lead organizer introducing the vision of Agentic AI, autonomous agent design, and the roadmap for practical skills covered throughout the study jam.',
    attendees: '120+ Students',
    tags: ['Keynote', 'Agentic AI', 'GDG RMKEC', 'Welcome Session'],
  },
  {
    id: 'alb-agentic-icebreaker',
    title: 'Interactive Icebreaker: "Which is AI...?"',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-icebreaker.jpg',
    caption:
      'Kicking off the Agentic AI Study Jam with an interactive AI vs Human perception challenge, warming up students to generative concepts and agent reasoning.',
    attendees: '120+ Participants',
    tags: ['Icebreaker', 'Gamified Learning', 'GenAI', 'Interactive'],
  },
  {
    id: 'alb-agentic-audience',
    title: 'Audience Brainstorming & Interactive Discussions',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-audience-interaction.jpg',
    caption:
      'Engaging discussions across the hall as attendees brainstorm real-world use cases for intelligent agents in campus administration and developer workflows.',
    attendees: 'Audience Discussion',
    tags: ['Interactive', 'Q&A', 'Brainstorming', 'Student Ideas'],
  },
  {
    id: 'alb-agentic-podium-perspective',
    title: 'Speaker View & Full Hall Engagement',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall Podium, RMKEC',
    image: '/images/agentic-ai/agentic-ai-podium-perspective.jpg',
    caption:
      'A dynamic view from the speaker podium addressing a packed auditorium of enthusiastic engineers eager to master autonomous agents.',
    attendees: 'Packed Auditorium',
    tags: ['Podium View', 'Speaker Session', 'Auditorium', 'Engagement'],
  },
  {
    id: 'alb-agentic-prompting',
    title: 'Prompting Techniques & Frameworks Masterclass',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall Podium, RMKEC',
    image: '/images/agentic-ai/agentic-ai-prompting-masterclass.jpg',
    caption:
      'In-depth breakdown of essential prompt engineering frameworks: Chain-of-Thought (CoT), Tree of Thoughts (ToT), Co-STAR, ROSES, and APE for deterministic agent behavior.',
    attendees: '120+ Learners',
    tags: ['Prompt Engineering', 'Co-STAR Framework', 'Tree of Thoughts', 'Chain of Thought'],
  },
  {
    id: 'alb-agentic-prompt-frameworks',
    title: 'Prompt Engineering Frameworks: CoT, ToT & Co-STAR',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-prompt-frameworks.jpg',
    caption:
      'Deep dive into structured system prompting, illustrating how reasoning scaffolds transform basic LLM responses into reliable autonomous agents.',
    attendees: 'Technical Presentation',
    tags: ['System Prompts', 'Co-STAR', 'Chain-of-Thought', 'AI Scaffolding'],
  },
  {
    id: 'alb-agentic-interactive-prompting',
    title: 'Live Prompt Optimization Guidelines',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-interactive-prompting.jpg',
    caption:
      'Demonstrating live prompt refinements on screen, guiding students through context setting, output constraints, and few-shot formatting.',
    attendees: 'Interactive Masterclass',
    tags: ['Live Demo', 'Prompt Guidelines', 'Few-Shot Learning', 'Interactive'],
  },
  {
    id: 'alb-agentic-interactive-challenge',
    title: 'Interactive Challenge: "Can You Make AI Lie?"',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-interactive-challenge.jpg',
    caption:
      'A gamified adversarial prompt injection challenge where participants test guardrails and explore model robustness against jailbreaks.',
    attendees: 'Student Contenders',
    tags: ['AI Safety', 'Guardrails', 'Prompt Injection', 'Challenge'],
  },
  {
    id: 'alb-agentic-agent-architecture',
    title: 'Autonomous Agent Architecture & Execution DAGs',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-agent-architecture.jpg',
    caption:
      'Architectural breakdown of personal assistant agents, highlighting perception, memory vectors, tool calling APIs, and execution loops.',
    attendees: 'System Design',
    tags: ['Agent Architecture', 'Tool Calling', 'Execution Loops', 'System Design'],
  },
  {
    id: 'alb-agentic-auditorium-demo',
    title: 'Auditorium-Wide Live Agent Deployment',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-auditorium-demo.jpg',
    caption:
      'Live demonstration of an autonomous multi-step agent coordinating web searches, data parsing, and summarization in front of the entire audience.',
    attendees: 'All Attendees',
    tags: ['Live Deployment', 'Autonomous Agents', 'Multi-Step Workflows', 'Auditorium'],
  },
  {
    id: 'alb-agentic-labs',
    title: 'Hands-on Prompt Engineering & AI Agent Lab',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-hands-on-labs.jpg',
    caption:
      'Students opening their laptops to build structured prompts, configure system instructions, and evaluate multi-turn agent responses in real time.',
    attendees: '80+ Laptops Active',
    tags: ['Hands-on Lab', 'Live Coding', 'Prompt Design', 'Workstations'],
  },
  {
    id: 'alb-agentic-prompt-experimentation',
    title: 'Active Hands-on Experimentation & Code Building',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-prompt-experimentation.jpg',
    caption:
      'Participants testing custom prompts, tweaking temperature and top-p sampling hyperparameters, and validating model responses in code sandboxes.',
    attendees: 'Student Developers',
    tags: ['Coding Lab', 'Hyperparameters', 'Sandboxes', 'Experimentation'],
  },
  {
    id: 'alb-agentic-mentorship',
    title: '1-on-1 Mentorship & Row-by-Row Guidance',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-mentorship.jpg',
    caption:
      'GDG RMKEC core leads and mentors circulating through every row, helping students troubleshoot API calls and fine-tune reasoning chains.',
    attendees: 'Core Mentors',
    tags: ['Mentorship', 'Peer Support', 'Troubleshooting', 'Hands-on Support'],
  },
  {
    id: 'alb-agentic-hall',
    title: 'Auditorium-Wide Live AI Hacking Session',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-hall-coding.jpg',
    caption:
      'A panoramic view of the seminar hall filled with student developers actively prototyping generative AI agents and pipeline integrations.',
    attendees: 'Full Hall Coding',
    tags: ['Auditorium View', 'Live Hacking', 'Community Build', 'GenAI'],
  },
  {
    id: 'alb-agentic-collaborative-lab',
    title: 'Collaborative Pair Programming & Prompt Debugging',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-collaborative-lab.jpg',
    caption:
      'Teams huddled over laptop screens comparing outputs, debugging edge cases, and building collective prompt libraries.',
    attendees: 'Pair Programmers',
    tags: ['Pair Programming', 'Prompt Debugging', 'Collaboration', 'Lab Work'],
  },
  {
    id: 'alb-agentic-peer-learning',
    title: 'Peer Collaboration & Workflow Architecture',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-peer-learning.jpg',
    caption:
      'Students collaborating side-by-side to construct multi-agent coordination pipelines and custom tool-calling integrations.',
    attendees: 'Developer Teams',
    tags: ['Peer Collaboration', 'Agent Architecture', 'Tool Calling', 'Student Teams'],
  },
  {
    id: 'alb-agentic-organizers-huddle',
    title: 'GDG Organizers Coordination Huddle',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-organizers-huddle.jpg',
    caption:
      'GDG on Campus core leads syncing on event timing, hands-on lab milestones, and audience interaction coordination.',
    attendees: 'Lead Organizers',
    tags: ['Event Operations', 'Core Team', 'Logistics', 'Leadership'],
  },
  {
    id: 'alb-agentic-organizers-cheer',
    title: 'Organizing Team Energy & Mid-Session Cheer',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-organizers-cheer.jpg',
    caption:
      'Core team members sharing a spirited thumbs-up as attendees enthusiastically complete their hands-on agent workflows.',
    attendees: 'Core Leads',
    tags: ['Team Spirit', 'Organizers', 'Community Pride', 'GDG RMKEC'],
  },
  {
    id: 'alb-agentic-hall-keynote-view',
    title: 'Full Hall Masterclass & Interactive Dialogue',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-hall-keynote-view.jpg',
    caption:
      'A comprehensive wide angle of the session in full swing, capturing the energy, focused attention, and community participation.',
    attendees: '120+ Builders',
    tags: ['Wide Angle', 'Masterclass', 'Full House', 'Active Learning'],
  },
  {
    id: 'alb-agentic-valedictory',
    title: 'Valedictory Address & "Thank You" Remarks',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Tech Seminar Hall, RMKEC',
    image: '/images/agentic-ai/agentic-ai-valedictory.jpg',
    caption:
      'Concluding remarks thanking the students, faculty, and GDG community for their vibrant enthusiasm and groundbreaking prototypes.',
    attendees: 'Valedictory Session',
    tags: ['Valedictory', 'Closing Remarks', 'Thank You', 'GDG Campus'],
  },
  {
    id: 'alb-agentic-team',
    title: 'GDG RMKEC Core Team & Faculty Advisor Celebration',
    event: 'Agentic AI Study Jam',
    category: 'Agentic AI Study Jam',
    year: '2026',
    date: 'January 2026',
    location: 'Main Stage, RMKEC',
    image: '/images/agentic-ai/agentic-ai-team-stage.jpg',
    caption:
      'The dedicated GDG on Campus RMKEC organizing team standing proudly on stage with faculty leadership at the successful conclusion of the Agentic AI Study Jam.',
    attendees: 'Core Organizing Team & Faculty',
    tags: ['Core Team', 'Faculty Advisor', 'Stage Celebration', 'GDG RMKEC'],
  },

  // 4. A.C.E - AI Collage Day (April 2026)
  {
    id: 'alb-ace-poster',
    title: 'A.C.E Day Official Poster — AI Collage Exchange',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-poster.png',
    caption:
      'Official announcement poster for A.C.E (AI Collage Exchange) Day inviting students to pitch innovative ideas through AI-generated visual collages.',
    attendees: 'All Batches',
    tags: ['A.C.E Day', 'Official Poster', 'AI Collage Exchange', 'Call for Pitches'],
  },
  {
    id: 'alb-ace-welcome',
    title: 'Welcome Address & Introduction to GDG on Campus',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (2:00 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-welcome-gdg.png',
    caption:
      'Opening session hosted by GDG Lead K.S. Siddharth and team, welcoming participants to the A.C.E Day presentation batches.',
    attendees: 'Siddharth, Niranjan & GDG Leads',
    tags: ['Welcome Address', 'GDG RMKEC', 'Opening Remarks', 'Virtual Meet'],
  },
  {
    id: 'alb-ace-what-is-gdg',
    title: 'What is GDG? Community Perks & Student Ecosystem',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (2:10 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-what-is-gdg.png',
    caption:
      'Niranjan Thirunavukkarasu presenting the mission, technical initiatives, and networking opportunities of Google Developer Group on Campus RMKEC.',
    attendees: 'Niranjan T (Presenter)',
    tags: ['What is GDG', 'Community Perks', 'Networking', 'Developer Ecosystem'],
  },
  {
    id: 'alb-ace-icebreaker',
    title: 'Interactive Icebreaker: "Which is AI...?" Challenge',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (2:30 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-icebreaker-quiz.png',
    caption:
      'Anston A Sampson hosting an engaging AI visual discrimination game, challenging participants to identify real vs AI-synthesized imagery.',
    attendees: 'Anston Sampson & Audience',
    tags: ['AI Icebreaker', 'Real vs AI', 'Interactive Quiz', 'Community Fun'],
  },
  {
    id: 'alb-ace-pitch-emergency',
    title: 'Project Pitch: Smart Emergency Corridor by Niveditha E',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:04 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-emergency-corridor.png',
    caption:
      'Niveditha E presenting an AI-generated collage depicting an automated smart emergency corridor clearing traffic for ambulances via IoT and RF beacons.',
    attendees: 'Niveditha E (Pitcher)',
    tags: ['Smart Emergency Corridor', 'IoT', 'AI Collage Pitch', 'Healthcare Mobility'],
  },
  {
    id: 'alb-ace-pitch-feelwell',
    title: 'Project Pitch: FeelWell Emotional Wellness by Anusree M',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:09 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-feelwell.png',
    caption:
      'Anusree M illustrating FeelWell, an AI and AR/VR powered mental health and stress relief platform with personalized immersive relaxation therapy.',
    attendees: 'Anusree M (Pitcher)',
    tags: ['FeelWell', 'Mental Wellness', 'AR/VR', 'AI Architecture'],
  },
  {
    id: 'alb-ace-pitch-dgts',
    title: 'Project Pitch: Digital Grievance Tracking System by Akash M',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:15 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-dgts.png',
    caption:
      'Akash M presenting DGTS, an AI/NLP-driven civic governance application streamlining public complaint filing, voice input in regional languages, and geotagged tracking.',
    attendees: 'Akash M (Pitcher)',
    tags: ['DGTS', 'Civic Tech', 'NLP', 'Smart Governance'],
  },
  {
    id: 'alb-ace-pitch-smart-roads',
    title: 'Project Pitch: Turning Roads into Power Sources by Sri Suddharshini A',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:19 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-smart-roads.png',
    caption:
      'Sri Suddharshini A showcasing renewable smart highway concepts that convert mechanical vehicle weight on speed breakers into stored electrical grid power.',
    attendees: 'Sri Suddharshini A (Pitcher)',
    tags: ['Clean Energy', 'Smart Roads', 'Piezoelectric Power', 'IoT Monitoring'],
  },
  {
    id: 'alb-ace-pitch-pivote',
    title: 'Project Pitch: PiVote 2.0 Biometric Voting by Kiruthika R',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:24 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-pivote.png',
    caption:
      'Kiruthika R pitching PiVote 2.0 for the Google Solution Challenge — a tamper-proof biometric fingerprint voting system with cloud verification and instant SMS confirmation.',
    attendees: 'Kiruthika R (Pitcher)',
    tags: ['PiVote 2.0', 'Google Solution Challenge', 'Biometrics', 'Cloud Security'],
  },
  {
    id: 'alb-ace-pitch-paralysed',
    title: 'Project Pitch: Health Monitor for Paralysed Patients by Lakshaya S',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:29 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-paralysed-care.png',
    caption:
      'Lakshaya S demonstrating an assistive smart glove prototype using orange flex sensors and Arduino Uno to translate micro hand gestures into caregiver alerts.',
    attendees: 'Lakshaya S (Pitcher)',
    tags: ['Assistive Tech', 'Arduino Uno', 'Flex Sensors', 'Healthcare Innovation'],
  },
  {
    id: 'alb-ace-pitch-disaster',
    title: 'Project Pitch: AI Disaster Response & Rescue by Sharmila J',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:34 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-disaster-response.png',
    caption:
      'Sharmila J presenting a real-time AI life-saving platform utilizing aerial drone computer vision, predictive threat analysis, and dynamic evacuation route planning.',
    attendees: 'Sharmila J (Pitcher)',
    tags: ['Disaster Management', 'Computer Vision', 'Drone Feeds', 'AI Decision Engine'],
  },
  {
    id: 'alb-ace-pitch-crisislens',
    title: 'Project Pitch: CrisisLens AI by Chilaka Deekshitha',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:40 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-crisislens.png',
    caption:
      'Chilaka Deekshitha presenting CrisisLens AI ("Turning Chaos into Clarity") — integrating automated CCTV hazard detection, incident clustering, and dispatch dashboards.',
    attendees: 'Chilaka Deekshitha (Pitcher)',
    tags: ['CrisisLens AI', 'Emergency Alert', 'Situation Analysis', 'Real-Time Rescue'],
  },
  {
    id: 'alb-ace-pitch-water-level',
    title: 'Project Pitch: Water Level Indicator System by Meena T',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:44 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-water-level.png',
    caption:
      'Meena T explaining an automated water reservoir level monitoring circuit using BC547 transistors, status LEDs, and buzzer alert systems.',
    attendees: 'Meena T (Pitcher)',
    tags: ['Water Level Indicator', 'BC547', 'Hardware Circuit', 'Resource Automation'],
  },
  {
    id: 'alb-ace-pitch-edureels',
    title: 'Project Pitch: EduReelS+ AI Learning by Kanagavalli R',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:49 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-pitch-edureels.png',
    caption:
      'Kanagavalli R pitching EduReelS+, an AI-curated short-video platform replacing mindless entertainment scrolling with personalized STEM and placement reels.',
    attendees: 'Kanagavalli R (Pitcher)',
    tags: ['EduReelS+', 'EdTech', 'AI Feed Optimization', 'Microlearning'],
  },
  {
    id: 'alb-ace-community-wrapup',
    title: 'Participant Engagement & Virtual Group Session',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (3:55 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-community-wrapup.png',
    caption:
      'Student participants, presenters, and GDG leads gathered on Google Meet during the closing remarks and interaction session.',
    attendees: 'All Participants & Leads',
    tags: ['Community Meet', 'Student Presenters', 'GDG Family', 'Interactive Session'],
  },
  {
    id: 'alb-ace-summary',
    title: 'Official Event Summary & Pitching Lineup Record',
    event: 'A.C.E - AI Collage Day',
    category: 'A.C.E - AI Collage Day',
    year: '2026',
    date: 'April 6, 2026 (4:00 PM)',
    location: 'Google Meet (Virtual)',
    image: '/images/ace-day/ace-event-summary.png',
    caption:
      'Official documentation of the A.C.E (AI Collage Exchange) Day agenda, speaker timeline, and 10 student project pitch lineup successfully concluding at 4:00 PM.',
    attendees: 'GDG Documentation Team',
    tags: ['Event Summary', 'Documentation', 'Timeline Record', 'Milestone Completion'],
  },
];

export default function AlbumPage() {
  // When an album is clicked, this modal opens showing all photos of that event
  const [activeModalAlbum, setActiveModalAlbum] = useState<EventCategory | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number>(0);
  const [modalViewMode, setModalViewMode] = useState<'slideshow' | 'grid'>('slideshow');

  // Fullscreen single-photo lightbox (used inside album modal)
  const [lightboxPhoto, setLightboxPhoto] = useState<AlbumPhoto | null>(null);

  // Photos belonging to the currently opened album in modal
  const activeAlbumPhotos = activeModalAlbum
    ? albumPhotos.filter((p) => p.category === activeModalAlbum)
    : [];

  const activeAlbumData = activeModalAlbum
    ? eventAlbums.find((a) => a.name === activeModalAlbum)
    : null;

  // Open an album
  const handleOpenAlbum = (albumName: EventCategory) => {
    setActiveModalAlbum(albumName);
    setModalPhotoIndex(0);
  };

  // Keyboard navigation for album modal slideshow & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhoto) {
        if (e.key === 'Escape') {
          setLightboxPhoto(null);
        }
        return;
      }

      if (activeModalAlbum && activeAlbumPhotos.length > 0) {
        if (e.key === 'Escape') {
          setActiveModalAlbum(null);
        } else if (e.key === 'ArrowRight') {
          setModalPhotoIndex((prev) => (prev < activeAlbumPhotos.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowLeft') {
          setModalPhotoIndex((prev) => (prev > 0 ? prev - 1 : activeAlbumPhotos.length - 1));
        }
      }
    };

    if (activeModalAlbum || lightboxPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalAlbum, activeAlbumPhotos.length, lightboxPhoto]);

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Google Cloud Campaign':
        return 'border-[#4285F4]/40 bg-[#4285F4]/20 text-blue-300';
      case "HackNEXA'26 Hackathon":
        return 'border-[#EA4335]/40 bg-[#EA4335]/20 text-red-300';
      case 'Agentic AI Study Jam':
        return 'border-[#34A853]/40 bg-[#34A853]/20 text-emerald-300';
      case 'A.C.E - AI Collage Day':
        return 'border-[#FBBC05]/40 bg-[#FBBC05]/20 text-amber-300';
      default:
        return 'border-[#4285F4]/40 bg-[#4285F4]/20 text-blue-300';
    }
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 pt-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EA4335] px-4 py-1.5 rounded-full border border-white/10 bg-[#121216]/60 backdrop-blur-md mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>Event Photography &amp; Archives</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Event Album
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            A visual chronicle of Google Cloud Campaign, HackNEXA&apos;26 Hackathon, Agentic AI Study Jam,
            and A.C.E - AI Collage Day at Google Developer Group on Campus RMKEC.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
              <span>4 Flagship Albums</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
              <span>{albumPhotos.length} Captured Photos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              <span>650+ Teams &amp; 1,000+ Learners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
              <span>40+ Cloud Completers</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4 ALBUMS IN A ROW (COMPACT SIZE)                            */}
        {/* ============================================================ */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-[#4285F4]" />
              <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Select an Event Album
              </h2>
              <span className="text-xs text-white/40 font-mono">(4 Flagship Events)</span>
            </div>
            <span className="text-xs text-white/50 font-mono hidden sm:inline-block">
              Click album to open all event photos
            </span>
          </div>

          {/* Responsive grid: 1 col on mobile, 2 cols on tablet, exactly 4 in a row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventAlbums.map((album) => {
              const eventPhotoCount = albumPhotos.filter((p) => p.category === album.name).length;
              const isSelected = activeModalAlbum === album.name;

              return (
                <div
                  key={album.id}
                  onClick={() => handleOpenAlbum(album.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOpenAlbum(album.name)}
                  aria-label={`Open ${album.name} album`}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-white/40 ring-2 ring-[#4285F4]/50 bg-[#15151c] shadow-[0_12px_28px_rgba(0,0,0,0.8)] -translate-y-1'
                      : 'border-white/12 bg-black/60 hover:border-white/30 hover:bg-[#121218] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {/* Compact Cover Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#121216]">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                        album.id === 'ace-collage' ? 'object-cover object-top' : 'object-cover'
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white">
                        {album.year}
                      </span>
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white/90 flex items-center gap-1">
                        <Images className="h-2.5 w-2.5 text-[#4285F4]" />
                        {eventPhotoCount} Photos
                      </span>
                    </div>

                    {/* Hover Prompt Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4285F4] text-white text-xs font-semibold shadow-lg">
                        <FolderOpen className="h-3.5 w-3.5" />
                        View All {eventPhotoCount} Photos
                      </span>
                    </div>
                  </div>

                  {/* Album Compact Meta Content */}
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${album.badgeBg} ${album.badgeBorder} ${album.badgeText}`}
                        >
                          {album.date}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-[#4285F4] font-semibold">
                            Active
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-[#4285F4] transition-colors line-clamp-1">
                        {album.name}
                      </h3>
                      <p className="text-[11px] text-white/65 mt-0.5 line-clamp-1">
                        {album.tagline}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="mt-3 pt-2.5 border-t border-white/08 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white/50 truncate max-w-[130px]">
                        {album.location.split(',')[0]}
                      </span>
                      <span className="text-[#4285F4] group-hover:text-white flex items-center gap-0.5 transition-colors font-semibold">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Join upcoming events CTA */}
        <div className="text-center p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#121216]/60 backdrop-blur-md">
          <h3 className="text-2xl font-bold text-white mb-2">Be Part of the Next Album</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mb-6">
            Attend HackNEXA’26, join our next Agentic AI jam, and shape the next chapter of memories.
          </p>
          <GlowButton href="/events" shape="pill" size="lg">
            Explore Upcoming Events →
          </GlowButton>
        </div>
      </div>

      {/* ============================================================ */}
      {/* EVENT ALBUM MODAL (SHOWS ALL PHOTOS OF THE CLICKED EVENT)   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModalAlbum && activeAlbumData && activeAlbumPhotos.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActiveModalAlbum(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalAlbum(null)}
              aria-label="Close album viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/75 border border-white/20 text-white/80 hover:text-white hover:bg-black transition-all cursor-pointer z-30 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-3xl border border-white/20 bg-[#121216] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Top Modal Navigation & Album Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${activeAlbumData.badgeBg} ${activeAlbumData.badgeBorder} ${activeAlbumData.badgeText}`}
                    >
                      {activeAlbumData.year}
                    </span>
                    <span className="font-mono text-xs text-white/60">
                      {activeAlbumData.date} • {activeAlbumData.location.split(',')[0]}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <FolderOpen
                      className="h-5 w-5 shrink-0"
                      style={{ color: activeAlbumData.color }}
                    />
                    <span>{activeAlbumData.name}</span>
                    <span className="text-xs font-mono text-white/50 font-normal">
                      ({activeAlbumPhotos.length} Photos)
                    </span>
                  </h2>
                </div>

                {/* View Mode Toggle: Slideshow vs Grid */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="p-1 rounded-full bg-white/08 border border-white/10 flex items-center">
                    <button
                      type="button"
                      onClick={() => setModalViewMode('slideshow')}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        modalViewMode === 'slideshow'
                          ? 'bg-[#4285F4] text-white font-semibold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Images className="h-3 w-3" />
                      Slideshow
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalViewMode('grid')}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        modalViewMode === 'grid'
                          ? 'bg-[#4285F4] text-white font-semibold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Grid className="h-3 w-3" />
                      Grid (All {activeAlbumPhotos.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                {modalViewMode === 'slideshow' ? (
                  /* Slideshow View: Large preview + details + thumbnail gallery strip */
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[280px] max-h-[50vh] border border-white/10 group">
                      <img
                        src={activeAlbumPhotos[modalPhotoIndex].image}
                        alt={activeAlbumPhotos[modalPhotoIndex].title}
                        className="max-h-[50vh] w-full object-contain"
                        decoding="async"
                      />

                      {/* Prev Photo Arrow */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalPhotoIndex((prev) =>
                            prev > 0 ? prev - 1 : activeAlbumPhotos.length - 1
                          );
                        }}
                        aria-label="Previous photo in this album"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:scale-110 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {/* Next Photo Arrow */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalPhotoIndex((prev) =>
                            prev < activeAlbumPhotos.length - 1 ? prev + 1 : 0
                          );
                        }}
                        aria-label="Next photo in this album"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:scale-110 transition-all cursor-pointer"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Expand Button */}
                      <button
                        type="button"
                        onClick={() => setLightboxPhoto(activeAlbumPhotos[modalPhotoIndex])}
                        aria-label="View photo in fullscreen"
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-3 right-3 font-mono text-[11px] px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white">
                        Photo {modalPhotoIndex + 1} of {activeAlbumPhotos.length}
                      </div>
                    </div>

                    {/* Active Photo Info Card */}
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                        {activeAlbumPhotos[modalPhotoIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-3">
                        {activeAlbumPhotos[modalPhotoIndex].caption}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mb-3 pt-2 border-t border-white/10">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#EA4335]" />
                          {activeAlbumPhotos[modalPhotoIndex].location}
                        </span>
                        {activeAlbumPhotos[modalPhotoIndex].attendees && (
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-[#34A853]" />
                            {activeAlbumPhotos[modalPhotoIndex].attendees}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {activeAlbumPhotos[modalPhotoIndex].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/06 border border-white/08 text-[10px] font-mono text-white/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* All Photos of This Event: Interactive Thumbnail Strip */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-white/60 font-semibold">
                          All Photos in this Album ({activeAlbumPhotos.length}):
                        </span>
                        <span className="text-[11px] font-mono text-white/40">
                          Click any thumbnail to preview
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {activeAlbumPhotos.map((photo, idx) => (
                          <div
                            key={photo.id}
                            onClick={() => setModalPhotoIndex(idx)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setModalPhotoIndex(idx)}
                            className={`relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border transition-all ${
                              modalPhotoIndex === idx
                                ? 'border-[#4285F4] ring-2 ring-[#4285F4]/60 scale-[1.02]'
                                : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                            }`}
                          >
                            <img
                              src={photo.image}
                              alt={photo.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <span className="absolute bottom-1 left-1.5 right-1.5 font-mono text-[9px] text-white truncate">
                              {photo.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Grid View: All photos of this event displayed simultaneously */
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {activeAlbumPhotos.map((photo, idx) => (
                        <div
                          key={photo.id}
                          onClick={() => {
                            setModalPhotoIndex(idx);
                            setModalViewMode('slideshow');
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setModalPhotoIndex(idx);
                              setModalViewMode('slideshow');
                            }
                          }}
                          className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/50 hover:border-white/40 transition-all cursor-pointer flex flex-col justify-between"
                        >
                          <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
                            <img
                              src={photo.image}
                              alt={photo.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute top-2 right-2 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/70 border border-white/15 text-white">
                              #{idx + 1}
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="text-xs font-bold text-white group-hover:text-[#4285F4] transition-colors line-clamp-1 mb-1">
                              {photo.title}
                            </h4>
                            <p className="text-[11px] text-white/60 line-clamp-2 leading-snug">
                              {photo.caption}
                            </p>
                            <div className="mt-2.5 pt-2 border-t border-white/08 flex items-center justify-between text-[10px] font-mono text-[#4285F4]">
                              <span>Click to enlarge</span>
                              <Maximize2 className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Switcher: Quick jump to another album */}
              <div className="p-3 sm:p-4 border-t border-white/10 bg-black/50 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <span className="text-xs font-mono text-white/50">Browse other albums:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {eventAlbums.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleOpenAlbum(a.name)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        activeModalAlbum === a.name
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/60 hover:text-white hover:bg-white/08'
                      }`}
                    >
                      {a.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* SINGLE PHOTO FULLSCREEN LIGHTBOX                             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setLightboxPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-5 right-5 p-2.5 rounded-full bg-black/75 border border-white/20 text-white/80 hover:text-white hover:bg-black transition-all cursor-pointer z-20"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl border border-white/20 bg-[#121216] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Photo Area */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={lightboxPhoto.image}
                  alt={lightboxPhoto.title}
                  decoding="async"
                  className="max-h-[65vh] md:max-h-[85vh] w-full object-contain"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between overflow-y-auto bg-[#121216]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                      {lightboxPhoto.year}
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border ${getCategoryBadgeStyle(
                        lightboxPhoto.category
                      )}`}
                    >
                      {lightboxPhoto.category}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-[#4285F4] font-semibold block mb-1">
                    {lightboxPhoto.event}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {lightboxPhoto.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    {lightboxPhoto.caption}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-white/70 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#FBBC05]" />
                      <span>{lightboxPhoto.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#EA4335]" />
                      <span>{lightboxPhoto.location}</span>
                    </div>
                    {lightboxPhoto.attendees && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#34A853]" />
                        <span>Participation: {lightboxPhoto.attendees}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {lightboxPhoto.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/06 border border-white/08 text-[10px] font-mono text-white/60"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>GDG on Campus RMKEC Archive</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxPhoto(null);
                      handleOpenAlbum(lightboxPhoto.category);
                    }}
                    className="text-[#4285F4] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    View entire album <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
