export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  iconName: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'Workshop' | 'Hackathon' | 'Speaker Session' | 'Bootcamp' | 'Community Build';
  status: 'Upcoming' | 'Past' | 'Ongoing';
  date: string;
  time: string;
  location: string;
  virtual?: boolean;
  registrationUrl?: string;
  speakers?: Array<{
    name: string;
    role: string;
    company: string;
    avatarUrl?: string;
  }>;
  capacity?: number;
  tags: string[];
  featured?: boolean;
  bannerImage?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  domain: 'AI/ML' | 'Web' | 'Mobile' | 'Cloud' | 'Open Source';
  stars?: number;
  forks?: number;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  author: {
    name: string;
    avatarUrl?: string;
  };
  featured?: boolean;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: 'Lead' | 'Technical' | 'Design' | 'Management' | 'Alumni' | 'Faculty';
  subDomain?: string;
  bio: string;
  avatarUrl: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Membership' | 'Events' | 'Tracks';
}

export interface TrackDomain {
  id: string;
  title: string;
  icon: string;
  color: string; // Tailwind color or hex
  glowColor: string;
  description: string;
  skills: string[];
  leadName: string;
  leadRole: string;
  projectsCount: number;
}
