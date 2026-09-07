import { StatItem } from '@/types';

export const statsData: StatItem[] = [
  {
    id: 'hackathon-teams',
    label: 'Hackathon Teams Participated',
    value: 650,
    suffix: '+',
    description: 'Across RMK Group of Institutions',
    iconName: 'Users2',
  },
  {
    id: 'eval-teams',
    label: 'Teams Reached Evaluations',
    value: 250,
    suffix: '+',
    description: 'Qualified for live jury rounds',
    iconName: 'Trophy',
  },
  {
    id: 'study-jam',
    label: 'Study Jam Participants',
    value: 100,
    suffix: '+',
    description: 'Hands-on technical learners',
    iconName: 'BookOpen',
  },
  {
    id: 'cloud-completers',
    label: 'Google Cloud Completers',
    value: 40,
    suffix: '+',
    description: 'Certified milestone achievers',
    iconName: 'Cloud',
  },
  {
    id: 'campus-projects',
    label: 'Student-Led Projects',
    value: 12,
    suffix: '+',
    description: 'Solving campus challenges',
    iconName: 'Code2',
  },
];
