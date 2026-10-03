import { StatItem } from '@/types';

export const statsData: StatItem[] = [
  {
    id: 'hackathon-participants',
    label: 'HackNEXA Participants',
    value: 653,
    suffix: '+',
    description: 'Across RMK Group of Institutions',
    iconName: 'Users',
  },
  {
    id: 'hackathon-teams',
    label: 'Registered Hackathon Teams',
    value: 257,
    suffix: '',
    description: '114 Submissions & 55 On-site Teams',
    iconName: 'Trophy',
  },
  {
    id: 'study-jam',
    label: 'Study Jam & Workshop Learners',
    value: 100,
    suffix: '+',
    description: 'Agentic AI & Google Cloud Jams',
    iconName: 'BookOpen',
  },
  {
    id: 'cloud-completers',
    label: 'Google Cloud Completers',
    value: 40,
    suffix: '+',
    description: 'Certified pathway achievers',
    iconName: 'Cloud',
  },
  {
    id: 'campus-projects',
    label: 'Innovation Projects & Pitches',
    value: 15,
    suffix: '+',
    description: 'A.C.E Day & Campus Solutions',
    iconName: 'Code2',
  },
];
