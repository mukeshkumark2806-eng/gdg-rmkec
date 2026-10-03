import React from 'react';
import { Cpu, Cloud, Shield, Palette } from 'lucide-react';
import type { WingOption, IntakeFAQ } from '@/types';


export const technicalWings: WingOption[] = [
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

export const availableSkillBadges: string[] = [
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

export const departments: string[] = [
  'Computer Science and Engineering (CSE)',
  'Electronics and Communication Engineering (ECE)',
  'Artificial Intelligence and Data Science (AIDS)',
  'Information Technology (IT)',
  'Electrical and Electronics Engineering (EEE)',
  'Mechanical Engineering (MECH)',
  'Other Department',
];

export const yearLevels: string[] = [
  '1st Year (Junior Apprentice)',
  '2nd Year (Core Associate)',
  '3rd Year (Lead Contributor)',
  '4th Year (Senior Mentor / Architect)',
];

export const intakeFaqs: IntakeFAQ[] = [
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
