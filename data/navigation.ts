import { NavItem } from '@/types';

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Journey', href: '/journey' },
  { label: 'Events', href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Community', href: '/community' },
  { label: 'Family', href: '/family' },
  { label: 'Join Us', href: '/join' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  explore: [
    { label: 'About Chapter', href: '/about' },
    { label: 'Timeline & History', href: '/journey' },
    { label: 'Events & Workshops', href: '/events' },
    { label: 'Student Projects', href: '/projects' },
  ],
  community: [
    { label: 'Domain Tracks', href: '/community' },
    { label: 'Core Team & Alumni', href: '/family' },
    { label: 'Join GDG RMKEC', href: '/join' },
    { label: 'Contact Us', href: '/contact' },
  ],
  resources: [
    { label: 'Google Developer Platform', href: 'https://developers.google.com/', external: true },
    { label: 'Google Community Portal', href: 'https://gdg.community.dev/', external: true },
    { label: 'GDSC Guidelines', href: 'https://developers.google.com/community/gdsc', external: true },
    { label: 'Code of Conduct', href: 'https://developers.google.com/community-guidelines', external: true },
  ],
};
