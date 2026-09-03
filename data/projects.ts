import { ProjectItem } from '@/types';

export const projectsData: ProjectItem[] = [
  // 1. Bus Tracking
  {
    id: 'proj-bus-tracking',
    title: 'Bus Tracking System',
    slug: 'bus-tracking',
    tagline: 'Real-time GPS IoT tracking and route visibility for students, faculty, and RMKEC administration.',
    description:
      'A mission-critical transportation monitoring platform engineered by the GDG on Campus RMKEC Tech Wings. Tackling campus transit uncertainties, it equips college buses with real-time GPS telemetry hardware that streams coordinates over low-latency WebSockets directly to student mobile devices and campus kiosks. Features automated route arrival ETAs, delay notifications, bus occupancy indicators, and a centralized administrative control console for the RMKEC Transport Office.',
    domain: 'Campus Solutions',
    status: 'Ongoing Development',
    stars: 180,
    forks: 42,
    techStack: [
      'GPS IoT Hardware',
      'Next.js 15',
      'WebSockets',
      'Node.js Backend',
      'Google Maps API',
      'Tailwind CSS',
      'Docker',
    ],
    author: { name: 'GDG RMKEC Tech & Backend Wings' },
    featured: true,
    impact: 'Serving 4,000+ campus commuters with real-time transit visibility across 35+ college routes.',
    objectives: [
      {
        title: 'Real-time location visibility',
        desc: 'Live GPS telemetry streaming bus locations directly to student mobile phones and campus kiosks.',
      },
      {
        title: 'Improved travel planning',
        desc: 'Accurate ETA calculations and route visualizations to eliminate waiting times during peak college hours.',
      },
      {
        title: 'Better transportation management',
        desc: 'Centralized administrator dashboard for the transport department to oversee fleet operations and routes.',
      },
      {
        title: 'Enhanced commuter convenience',
        desc: 'Automated delay alerts, pickup point notifications, and unified access for students and faculty.',
      },
    ],
    features: [
      'Sub-second GPS telemetry updates over secure WebSocket channels',
      'Interactive route visualization with Google Maps JavaScript API integration',
      'Geofencing alerts when buses approach campus entry gates or student pickup points',
      'Admin fleet monitor showing speed, route deviations, and driver rosters',
      'Lightweight Progressive Web App (PWA) accessible across all devices',
    ],
    contributors: [
      {
        name: 'Sanjay Subramanian S',
        role: 'Project Lead & Cloud Architecture',
        team: 'Technical Team',
        avatarUrl: '/images/family/Sanjay Subramanian.S .JPG',
        bio: 'Overseeing backend services, cloud deployment, and real-time WebSocket telemetry.',
      },
      {
        name: 'SANDHEEP A',
        role: 'IoT Firmware & Microcontroller Lead',
        team: 'Technical Team',
        bio: 'Calibrating GPS modules, onboard microcontrollers, and vehicular telemetry sensors.',
      },
      {
        name: 'Thirumurugan V',
        role: 'Frontend & Interactive Map Systems',
        team: 'Technical Team',
        bio: 'Engineering live route render components, dynamic ETA calculations, and mobile UI.',
      },
      {
        name: 'SABARISH R',
        role: 'Backend APIs & Database Infrastructure',
        team: 'Technical Team',
        bio: 'Developing high-throughput transit database schemas, fleet routes, and alert notifications.',
      },
    ],
  },

  // 2. College Navigation Console
  {
    id: 'proj-college-nav',
    title: 'College Navigation Console',
    slug: 'college-navigation-console',
    tagline: 'Interactive indoor and outdoor campus navigation console guiding students, visitors, and new joiners across RMKEC.',
    description:
      'An interactive campus wayfinding and navigation console designed specifically for the expansive RMK Engineering College grounds. Enables students, faculty, freshers, and event visitors to search, locate, and navigate to classrooms, research laboratories, seminar halls, administrative departments, and campus amenities. Features turn-by-turn indoor routing, floor-by-floor maps, and accessibility-friendly pathways.',
    domain: 'Campus Solutions',
    status: 'Active Development',
    stars: 142,
    forks: 31,
    techStack: [
      'React 19',
      'Next.js 15',
      'SVG Pathfinding',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'IndexedDB',
    ],
    author: { name: 'Campus Wayfinding Team' },
    featured: true,
    impact: 'Helps 1,500+ freshers and 1,200+ event visitors seamlessly navigate across 6 campus blocks and 80+ labs.',
    objectives: [
      {
        title: 'Instant Waypoint Search',
        desc: 'Quickly find any lecture hall, faculty department, or facility by room number or name.',
      },
      {
        title: 'Indoor & Outdoor Routing',
        desc: 'Turn-by-turn routing calculating optimal walking paths between academic blocks and amenities.',
      },
      {
        title: 'Event Mode Wayfinding',
        desc: 'Special mode during DevFest and HackNEXA highlighting live presentation stages and food courts.',
      },
      {
        title: 'Accessible Mobility Routes',
        desc: 'Identifies ramps, lifts, and barrier-free routes for disabled students and heavy equipment movement.',
      },
    ],
    features: [
      'Interactive vector-based 2.5D campus map with smooth zoom, pan, and rotation',
      'Floor-by-floor switcher for multi-storey academic complexes and research blocks',
      'QR code location markers mounted across campus for instant point-to-point guidance',
      'Search autocomplete indexing faculty cabins, laboratories, canteens, and sports facilities',
      'Offline caching ensuring smooth map usage in weak-signal basement auditoriums',
    ],
    contributors: [
      {
        name: 'SADHANA K',
        role: 'Project Lead & Navigation Architecture',
        team: 'Technical Team',
        bio: 'Overseeing indoor/outdoor pathfinding algorithms and campus waypoint graph models.',
      },
      {
        name: 'Jayashree ES',
        role: 'Frontend & Interactive Map UI',
        team: 'Technical Team',
        bio: 'Engineering interactive SVG campus canvas, touch gestures, and turn-by-turn guidance.',
      },
      {
        name: 'A YOHITH SRI AADITHYA',
        role: 'Search & Waypoint Discovery Lead',
        team: 'Technical Team',
        bio: 'Indexing 80+ campus laboratories, lecture halls, and faculty rooms for instant search.',
      },
      {
        name: 'M MOHITH CHANDAR',
        role: 'Spatial Data & Blueprint Mapping',
        team: 'Technical Team',
        bio: 'Digitizing RMKEC academic block blueprints and coordinates into accessible vector layers.',
      },
      {
        name: 'Karthigeyan',
        role: 'Backend Infrastructure & Offline Sync',
        team: 'Technical Team',
        bio: 'Developing local cache synchronization and sub-second room lookup APIs.',
      },
      {
        name: 'Vishnu D',
        role: 'Mobile Experience & Accessibility',
        team: 'Technical Team',
        bio: 'Optimizing barrier-free accessible pathways and mobile ergonomics for event attendees.',
      },
    ],
  },

  // 3. AI Placement Preparation
  {
    id: 'proj-ai-placement',
    title: 'AI Placement Preparation',
    slug: 'ai-placement-preparation',
    tagline: 'Intelligent AI mock interviewer, resume analyzer, and personalized DSA prep coach for campus placements.',
    description:
      'A full-fledged campus recruitment preparation ecosystem built to empower RMKEC engineering students for tier-1 company placements. Leverages Google Gemini 2.5 multimodal models to simulate realistic technical and HR mock interviews with real-time speech feedback, automated code evaluation, ATS resume scoring tailored to target job descriptions, and custom DSA practice tracks.',
    domain: 'AI/ML',
    status: 'Active Development',
    stars: 210,
    forks: 58,
    techStack: [
      'Gemini 2.5 Flash',
      'Python FastAPI',
      'LangChain',
      'Next.js 15',
      'Web Audio API',
      'Monaco Code Editor',
      'ChromaDB',
    ],
    author: { name: 'AI/ML Placement Cell Team' },
    featured: true,
    impact: 'Helping 800+ pre-final & final year students practice interviews with AI feedback before company visits.',
    objectives: [
      {
        title: 'Realistic Mock Interviews',
        desc: 'Adaptive conversational AI interviews matching company-specific difficulty and expectations.',
      },
      {
        title: 'ATS Resume Scoring',
        desc: 'Instant scoring with actionable bullet rewrite suggestions aligned with target job profiles.',
      },
      {
        title: 'Adaptive DSA Coaching',
        desc: 'Smart problem recommendations focusing on weak algorithmic patterns and edge cases.',
      },
      {
        title: 'Real-Time Speech & Delivery Feedback',
        desc: 'Analyzes pacing, filler words, technical articulation, and confidence score.',
      },
    ],
    features: [
      'Voice-enabled conversational interview simulator with Google Gemini 2.5 multimodal reasoning',
      'In-browser Monaco code editor with real-time code evaluation and syntax linting',
      'Company-specific interview tracks (Google, Microsoft, Amazon, Zoho, Cognizant, TCS)',
      'PDF resume parser evaluating impact metrics, tech keyword density, and formatting rules',
      'Comprehensive performance scorecard with strengths, improvement areas, and model answers',
    ],
    contributors: [
      {
        name: 'SARVESH S B',
        role: 'Project Lead & AI/ML Architecture',
        team: 'Technical Team',
        bio: 'Architecting Gemini 2.5 multimodal mock interview prompts, evaluation loops, and scoring rubrics.',
      },
      {
        name: 'S GARVITHA',
        role: 'Code Evaluation & Resume Analytics Lead',
        team: 'Technical Team',
        bio: 'Developing real-time code execution sandboxes, ATS resume scoring parser, and DSA roadmaps.',
      },
    ],
  },

  // 4. GDG Website
  {
    id: 'proj-gdg-website',
    title: 'GDG Website',
    slug: 'gdg-website',
    tagline: 'Next-generation chapter portal featuring interactive animations, event albums, team walls, and project showcases.',
    description:
      'The official digital headquarters of Google Developer Group on Campus RMKEC. Engineered with modern web standards, Google Material Design 3 guidelines, and high-performance physics-based micro-interactions. Serves as the central hub for chapter events, registrations, photo albums, project directories, family team walls, and student recruitment.',
    domain: 'Web',
    status: 'Active Production',
    stars: 176,
    forks: 48,
    techStack: [
      'Next.js 16 (Turbopack)',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'GSAP',
      'Lenis Smooth Scroll',
    ],
    author: { name: 'GDG RMKEC Core & Tech Team' },
    featured: true,
    impact: 'Over 10,000+ page views serving as the primary digital front for GDG on Campus RMKEC.',
    objectives: [
      {
        title: 'Brand Identity',
        desc: 'Embody Google Developer Groups standards with bespoke four-color tokens and glow shaders.',
      },
      {
        title: 'Event & Photo Archive',
        desc: 'High-definition Event Album showcasing HackNEXA, Cloud Jams, and workshop photography.',
      },
      {
        title: 'Team Transparency',
        desc: 'Showcasing all 40+ student leads, faculty advisors, and wing members on the Family Wall.',
      },
      {
        title: 'Zero-Lag Performance',
        desc: 'Instantaneous page transitions powered by React 19 and Next.js Turbopack compilation.',
      },
    ],
    features: [
      'Interactive Event Album with category filtering, full-screen lightbox, and keyboard navigation',
      'Unified Family Carousel showcasing all faculty, core leads, and student team wings',
      'Interactive Projects Explorer with contributor modals and architectural deep-dives',
      'Physics-based glow buttons with mouse spotlight tracking and dark/light mode switching',
      'Accessible recruitment application form with validation and team preferences',
    ],
    contributors: [
      {
        name: 'K Mukesh Kumar',
        role: 'Project Lead & Platform Architecture',
        team: 'HR / Core Team',
        avatarUrl: '/images/family/K Mukesh Kumar.jpg',
        bio: 'Leading digital headquarters architecture, chapter branding compliance, and member engagement features.',
      },
      {
        name: 'M Bala Viswanatan',
        role: 'Frontend Engineer & UI Micro-interactions',
        team: 'Technical Team',
        bio: 'Crafting responsive layouts, physics-based glow button interactions, and event album views.',
      },
    ],
  },

  // 5. Dashboard
  {
    id: 'proj-dashboard',
    title: 'Dashboard',
    slug: 'dashboard',
    tagline: 'Centralized administrative cockpit for event registrations, attendance tracking, member analytics, and project telemetry.',
    description:
      'An all-in-one administrative and analytics dashboard engineered for GDG on Campus RMKEC leadership, faculty advisors, and event organizers. Unifies real-time event check-in counts, HackNEXA judging scorecards, member engagement KPIs, certificate issuance pipelines, and live bus tracking telemetry into a single secure, role-based control interface.',
    domain: 'Campus Solutions',
    status: 'Ongoing Development',
    stars: 128,
    forks: 29,
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Recharts',
      'Supabase Realtime',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    author: { name: 'GDG RMKEC Technical Wings' },
    featured: true,
    impact: 'Managing 650+ hackathon teams, 1,200+ event check-ins, and 40+ student organizers in one place.',
    objectives: [
      {
        title: 'Real-Time Operations Monitor',
        desc: 'Live telemetry displaying venue occupancy, check-in velocity, and gate congestion.',
      },
      {
        title: 'Unified Hackathon Administration',
        desc: 'Monitor submission deadlines, assign jury panels, and track live scorecards.',
      },
      {
        title: 'Member & Wing KPIs',
        desc: 'Track chapter member attendance, task completions, and active project contributors.',
      },
      {
        title: 'Automated Certificate Issuance',
        desc: 'One-click verification and email dispatch of official digital certificates.',
      },
    ],
    features: [
      'Live metric cards with WebSocket-streamed counts and velocity sparklines',
      'Role-based access control (RBAC) separating Chapter Leads, Judges, and Organizers',
      'Interactive charts illustrating attendee demographics, domains, and department participation',
      'Direct sync with the Bus Tracking IoT fleet telemetry and campus arrival timestamps',
      'CSV/PDF export for administrative and faculty accreditation reporting',
    ],
    contributors: [
      {
        name: 'Prithwin V P',
        role: 'Technical Lead & Platform Architecture',
        team: 'Technical Team',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: 'Architecting telemetry pipelines, component architecture, and administrative consoles.',
      },
      {
        name: 'Ganthimathi V',
        role: 'Frontend Dashboard & State Management',
        team: 'Technical Team',
        avatarUrl: '/images/family/Ganthimathi V.jpg',
        bio: 'Developing real-time metric cards, event attendance velocity, and interactive filters.',
      },
      {
        name: 'SHAKTHI PRIYAN R D',
        role: 'UI Analytics & Visualizations',
        team: 'Technical Team',
        avatarUrl: '/images/family/SHAKTHI PRIYAN R D.jpg',
        bio: 'Building responsive telemetry widgets, live charts, and dark theme dashboard styling.',
      },
      {
        name: 'Sanjay Subramanian S',
        role: 'Backend Microservices & Realtime Sync',
        team: 'Technical Team',
        avatarUrl: '/images/family/Sanjay Subramanian.S .JPG',
        bio: 'Deploying containerized backend microservices and WebSocket pub/sub streams.',
      },
      {
        name: 'Krithika Kameshwari S',
        role: 'Mobile Responsive Testing & QA',
        team: 'Technical Team',
        avatarUrl: '/images/family/Krithika Kameshwari S .jpeg',
        bio: 'Ensuring seamless dashboard access for organizers on tablets and handheld devices.',
      },
      {
        name: 'Priyavarshini A',
        role: 'Access Control & Admin Forms',
        team: 'Technical Team',
        avatarUrl: '/images/family/Priyavarshini A.jpg',
        bio: 'Designing role-based access control (RBAC) screens and jury scoring consoles.',
      },
      {
        name: 'Bhargava A',
        role: 'Database Schema & Security',
        team: 'Technical Team',
        avatarUrl: '/images/family/Bhargava A.png',
        bio: 'Optimizing PostgreSQL database queries, JWT authentication, and event audit logs.',
      },
      {
        name: 'Arun Kumar K S',
        role: 'Automation & Report Pipelines',
        team: 'Technical Team',
        avatarUrl: '/images/family/Arun Kumar K S.jpeg',
        bio: 'Building automated certificate generation triggers and CSV/PDF export pipelines.',
      },
    ],
  },
];
