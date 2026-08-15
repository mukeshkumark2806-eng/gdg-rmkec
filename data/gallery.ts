export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Workshops' | 'DevFest' | 'Cloud Jams' | 'Campus Life';
  date: string;
  location: string;
  image: string;
  images?: string[];
  description: string;
  attendees: number;
  tags: string[];
  featured?: boolean;
}

export const galleryCategories = [
  'All',
  'Hackathons',
  'Workshops',
  'DevFest',
  'Cloud Jams',
  'Campus Life',
] as const;

export const galleryData: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'GenAI Hackathon & BuildSprint',
    category: 'Hackathons',
    date: 'February 2026',
    location: 'Main Auditorium, RMKEC',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '36-hour intense hackathon building generative AI applications using Gemini 1.5 Pro and Vertex AI APIs.',
    attendees: 240,
    tags: ['Gemini API', 'Hackathon', 'AI/ML', 'Prizes'],
    featured: true,
  },
  {
    id: 'gal-2',
    title: 'DevFest RMKEC Flagship Edition',
    category: 'DevFest',
    date: 'January 2026',
    location: 'Open Air Amphitheatre',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Annual gathering of student developers, industry mentors, and Google Developer Experts discussing Android 15 and Cloud architecture.',
    attendees: 520,
    tags: ['DevFest', 'Google Experts', 'Keynote', 'Swag'],
    featured: true,
  },
  {
    id: 'gal-3',
    title: 'Google Cloud Study Jam & Badges',
    category: 'Cloud Jams',
    date: 'November 2025',
    location: 'Cloud Computing Lab',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Hands-on practical Qwiklabs sessions where 180+ students earned official Google Cloud skill badges.',
    attendees: 185,
    tags: ['Qwiklabs', 'GCP', 'Certifications', 'Kubernetes'],
    featured: false,
  },
  {
    id: 'gal-4',
    title: 'Android Compose Masterclass',
    category: 'Workshops',
    date: 'October 2025',
    location: 'CSE Seminar Hall',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Deep dive into modern Android UI development with Jetpack Compose, Kotlin coroutines, and Material 3 design tokens.',
    attendees: 140,
    tags: ['Jetpack Compose', 'Kotlin', 'Android', 'Live Coding'],
    featured: false,
  },
  {
    id: 'gal-5',
    title: 'Open Source Hacktoberfest Sprint',
    category: 'Hackathons',
    date: 'October 2025',
    location: 'Innovation & Research Center',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Collaborative git pull-request party contributing to open-source developer tooling and RMK chapter projects.',
    attendees: 190,
    tags: ['Open Source', 'GitHub', 'Hacktoberfest', 'PRs'],
    featured: true,
  },
  {
    id: 'gal-6',
    title: 'Core Team Strategy & Icebreaker',
    category: 'Campus Life',
    date: 'September 2025',
    location: 'GDG Lounge RMKEC',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Chapter leads planning the yearly roadmap, event schedules, domain tracks, and community welcome orientation.',
    attendees: 45,
    tags: ['Core Team', 'Planning', 'Community', 'Orientation'],
    featured: false,
  },
  {
    id: 'gal-7',
    title: 'Flutter & Cross-Platform Jam',
    category: 'Workshops',
    date: 'August 2025',
    location: 'Tech Seminar Hall 2',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Live interactive workshop creating high-performance cross-platform Flutter applications with Firebase backends.',
    attendees: 160,
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    featured: false,
  },
  {
    id: 'gal-8',
    title: 'Solution Challenge Project Showcase',
    category: 'Hackathons',
    date: 'July 2025',
    location: 'Innovation Gallery RMKEC',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Final demo day where top student teams presented UN Sustainable Development Goal solutions built on Google stack.',
    attendees: 210,
    tags: ['Solution Challenge', 'UN SDGs', 'Demo Day', 'Pitching'],
    featured: true,
  },
  {
    id: 'gal-9',
    title: 'Campus Code & Coffee Meetup',
    category: 'Campus Life',
    date: 'June 2025',
    location: 'Campus Courtyard',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Casual networking evening sharing code snippets, internship interview prep tips, and tech trends over snacks.',
    attendees: 85,
    tags: ['Networking', 'Coffee', 'Internships', 'Peers'],
    featured: false,
  },
];
