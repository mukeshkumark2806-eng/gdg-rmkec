import type React from 'react';

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
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

export interface ProjectContributor {
  name: string;
  role: string;
  team: string;
  avatarUrl?: string;
  bio?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  domain: 'AI/ML' | 'Web' | 'Mobile' | 'Cloud' | 'Open Source' | 'Campus Solutions' | 'UI/UX';
  status?: string;
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
  contributors?: ProjectContributor[];
  features?: string[];
  objectives?: Array<{ title: string; desc: string }>;
  impact?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  teamCategory:
    | 'Faculty Coordinator'
    | 'Core Leads'
    | 'Technical Team'
    | 'HR Team'
    | 'Design Team'
    | 'PR Team'
    | 'Event Management'
    | string;
  subDomain?: string;
  bio?: string;
  avatarUrl: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    email?: string;
  };
  featured?: boolean;
}


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

export interface WingOption {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  skills: string[];
  projectsSample: string;
}

export interface IntakeFAQ {
  q: string;
  a: string;
}

