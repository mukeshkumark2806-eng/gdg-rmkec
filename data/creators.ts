export interface Creator {
  id: string;
  name: string;
  role: string;
  subRole?: string;
  department?: string;
  avatarUrl?: string;
  contributions: string[];
  socials: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    email?: string;
  };
}

export const websiteTechStack = [
  { name: 'Next.js 16', desc: 'App Router & Turbopack', color: '#4285F4' },
  { name: 'React 19', desc: 'Concurrent UI & Hooks', color: '#34A853' },
  { name: 'TypeScript', desc: 'Type-Safe Architecture', color: '#4285F4' },
  { name: 'Tailwind CSS', desc: 'Design System & Utility CSS', color: '#FBBC05' },
  { name: 'Framer Motion', desc: 'Physics Micro-animations', color: '#EA4335' },
  { name: 'Lucide Icons', desc: 'Modern Vector Iconography', color: '#4285F4' },
];

export const websiteCreators: Creator[] = [
  {
    id: 'creator-mukesh',
    name: 'K Mukesh Kumar',
    role: 'Lead Architect & Full Stack Lead',
    subRole: 'Core Team & Platform Engineering',
    department: 'RMK Engineering College',
    avatarUrl: '/images/family/K Mukesh Kumar.jpg',
    contributions: [
      'Architected core Next.js 16 full-stack structure, static prerendering, and Turbopack build pipelines',
      'Engineered interactive event albums, family team carousels, and the campus project directory',
      'Spearheaded design system compliance, Google Material styling, and mobile responsiveness',
    ],
    socials: {
      github: 'https://github.com',
      linkedin:
        'https://www.linkedin.com/company/google-developer-group-r-m-k-engineering-college/posts/?feedView=all',
    },
  },
  {
    id: 'creator-bala',
    name: 'M Bala Viswanatan',
    role: 'Frontend Engineer',
    subRole: 'UI Micro-interactions & Component Design',
    department: 'RMK Engineering College',
    contributions: [
      'Built reactive UI components, glow buttons, and dynamic modal interaction logic',
      'Engineered smooth carousel gesture scrolling, multi-category filters, and album previews',
      'Optimized client-side rendering performance and touch gestures across devices',
    ],
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
];
