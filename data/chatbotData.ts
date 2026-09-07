export interface ChatbotTopic {
  id: string;
  title: string;
  category: 'Events' | 'Membership' | 'Wings' | 'Projects' | 'Team' | 'General' | 'Contact';
  promptSuggestions: string[];
  keywords: string[];
  answer: string;
  actionUrl?: string;
  actionLabel?: string;
}

export const CHATBOT_TOPICS: ChatbotTopic[] = [
  // 1. HackNEXA'26
  {
    id: 'hacknexa',
    title: "HackNEXA'26 Flagship Hackathon",
    category: 'Events',
    promptSuggestions: [
      "Tell me about HackNEXA'26",
      "HackNEXA hackathon details",
      "Who can participate in HackNEXA?",
    ],
    keywords: [
      'hacknexa',
      'hackathon',
      'techsprint',
      'competition',
      'contest',
      '650',
      '250',
      'swag',
      'swags',
      'prize',
      'mentor',
      'jury',
      'evaluation',
    ],
    answer:
      "HackNEXA'26 is the flagship hackathon organized under the TechSprint Campaign by GDG on Campus RMKEC. It unites 650+ Hackathon Teams Participated across RMK Group of Institutions, with 250+ teams advancing to live prototype evaluations. Top 3 winning teams receive exclusive GDG India swags, certificates, and expert mentorship.",
    actionUrl: '/events',
    actionLabel: 'View Hackathon Details →',
  },

  // 2. How to Join & Membership
  {
    id: 'join-membership',
    title: 'How to Join GDG RMKEC',
    category: 'Membership',
    promptSuggestions: [
      'How do I join GDG RMKEC?',
      'Is membership free?',
      'Can 1st or 2nd year students apply?',
    ],
    keywords: [
      'join',
      'membership',
      'fee',
      'cost',
      'free',
      'apply',
      'recruitment',
      'form',
      'register',
      'eligibility',
      'year',
      'freshman',
      'sophomore',
      'department',
      'branch',
    ],
    answer:
      "Joining GDG on Campus RMKEC is 100% free! It is open to all enrolled students at R.M.K. Engineering College across all departments (CSE, IT, AI-DS, ECE, Cyber Security, etc.) and all academic years. Fill out the quick recruitment application on our Join page to express your interest.",
    actionUrl: '/join',
    actionLabel: 'Apply on Join Page →',
  },

  // 3. Technical Wings & Focus Tracks
  {
    id: 'technical-wings',
    title: '5 Specialized Technical Wings',
    category: 'Wings',
    promptSuggestions: [
      'What are the technical wings?',
      'Tell me about AI/ML wing',
      'Which wing should I join?',
    ],
    keywords: [
      'wing',
      'wings',
      'technical wing',
      'domain',
      'track',
      'ai',
      'ml',
      'gemini',
      'electronics',
      'iot',
      'backend',
      'cloud',
      'devops',
      'cybersecurity',
      'security',
      'ui',
      'ux',
      'design',
    ],
    answer:
      "GDG on Campus RMKEC operates 5 specialized Technical Wings:\n\n1. AI + Electronics Wing: IoT, embedded edge compute, and smart hardware.\n2. AI/ML & Gemini Wing: Large Language Models, Generative AI, and autonomous agent workflows.\n3. Backend & Cloud Wing: Scalable microservices, REST APIs, and Google Cloud infrastructure.\n4. Cybersecurity Wing: Threat intelligence, secure development, and ethical hacking.\n5. UI/UX Wing: Product design, responsive wireframes, design systems, and user accessibility.",
    actionUrl: '/join',
    actionLabel: 'Explore Wings & Apply →',
  },

  // 4. Campus Projects
  {
    id: 'projects',
    title: 'Student-Led Campus Projects',
    category: 'Projects',
    promptSuggestions: [
      'What projects is GDG building?',
      'Tell me about the College Bus Tracker',
      'Open source projects',
    ],
    keywords: [
      'project',
      'projects',
      'bus',
      'tracker',
      'tracking',
      'bus tracker',
      'scheduling',
      'agent',
      'dashboard',
      'cockpit',
      'open source',
      'github',
      'telemetry',
    ],
    answer:
      "Our Technical Wings engineer real-world software and IoT tools for the RMKEC campus:\n\n• Real-Time College Bus Tracking System: Real-time GPS bus tracking, route telemetry, and ETA updates for students and commuters.\n• Autonomous Student Scheduling Agent: Agentic AI tool optimizing exam preparation and project sprints.\n• GDG Digital HQ & Administrative Console: Central cockpit managing hackathon registrations, scoring, and telemetry.",
    actionUrl: '/projects',
    actionLabel: 'Browse Projects →',
  },

  // 5. Google Cloud Study Jam
  {
    id: 'cloud-jam',
    title: 'Google Cloud Campaign & Study Jam',
    category: 'Events',
    promptSuggestions: [
      'Tell me about Google Cloud Study Jam',
      'How to earn Google Cloud swags & certificates?',
    ],
    keywords: [
      'cloud',
      'google cloud',
      'study jam',
      'qwiklabs',
      'arcade',
      'completers',
      'certificate',
      'badges',
      'swag',
      'credits',
      '40',
      '100',
    ],
    answer:
      "Our official Google Cloud Study Jam saw 100+ active learners and 40+ certified milestone completers at RMKEC! Participants completed hands-on lab pathways, mastered Google Cloud compute/storage/AI pipelines, and were felicitated with official Google developer swags and certificates.",
    actionUrl: '/journey',
    actionLabel: 'View Milestones on Journey →',
  },

  // 6. Agentic AI & A.C.E Events
  {
    id: 'upcoming-events',
    title: 'Agentic AI Workshop & A.C.E',
    category: 'Events',
    promptSuggestions: [
      'What is Agentic AI Study Jam?',
      'What is A.C.E – AI Collage Day?',
    ],
    keywords: [
      'agentic',
      'agentic ai',
      'ace',
      'collage',
      'workshop',
      'bootcamp',
      'schedule',
      'date',
      'upcoming',
      'sessions',
    ],
    answer:
      "We have exciting upcoming initiatives scheduled:\n\n• Agentic AI Study Jam: Deep dive into autonomous AI agents, multi-agent frameworks, and workflow automation curated by the Event Management & AI/ML teams.\n• A.C.E (AI Collage Day): Creative-tech event where participants pitch futuristic project concepts through AI-generated architectural collages.\n\nExact dates and venue schedules will be published soon on our Events calendar.",
    actionUrl: '/events',
    actionLabel: 'Check Events Calendar →',
  },

  // 7. Core Team & Leadership
  {
    id: 'team-leadership',
    title: 'Meet Our Family & Chapter Leads',
    category: 'Team',
    promptSuggestions: [
      'Who is the Chapter Lead?',
      'Who is the Faculty Coordinator?',
      'How many members in the team?',
    ],
    keywords: [
      'team',
      'lead',
      'leads',
      'chapter lead',
      'faculty',
      'coordinator',
      'advisor',
      'darwin',
      'vishal',
      'members',
      'family',
      'organizers',
      'hr',
      'pr',
      'design',
    ],
    answer:
      "GDG on Campus RMKEC is guided by Faculty Coordinator Dr. Darwin and Chapter Lead Vishal Rajesh Kumar Jayalakshmi. The chapter is powered by 45 core student organizers across 5 operational wings: Technical Team, HR Team, Design Team, PR Team, and Event Management.",
    actionUrl: '/family',
    actionLabel: 'Meet the Full Team →',
  },

  // 8. Event Album & Community Memories
  {
    id: 'album-memories',
    title: 'Event Album & Photo Gallery',
    category: 'General',
    promptSuggestions: [
      'Where can I see event photos?',
      'View community memories',
    ],
    keywords: [
      'album',
      'photos',
      'photo',
      'gallery',
      'images',
      'memories',
      'moments',
      'pictures',
      'event photos',
    ],
    answer:
      "Browse our visual chronicle on the Event Album page! We have documented moments from HackNEXA kickoff ceremonies, Google Cloud felicitations, tech workshops, and student community gatherings.",
    actionUrl: '/album',
    actionLabel: 'Open Event Album →',
  },

  // 9. Contact & Socials
  {
    id: 'contact-socials',
    title: 'Contact Information & Social Links',
    category: 'Contact',
    promptSuggestions: [
      'How to contact GDG RMKEC?',
      'What are your social media links?',
      'Official community portal link',
    ],
    keywords: [
      'contact',
      'email',
      'mail',
      'reach',
      'socials',
      'social',
      'discord',
      'linkedin',
      'instagram',
      'github',
      'twitter',
      'x',
      'youtube',
      'portal',
      'community page',
    ],
    answer:
      "You can connect with us directly:\n\n• Email: gdg@rmkec.ac.in\n• Official Community Portal: gdg.community.dev/rmk-engineering-college/\n• Active channels: LinkedIn, GitHub, Discord, Instagram, and Twitter (X).\n\nDrop a message on our Contact page or send us an email anytime!",
    actionUrl: '/contact',
    actionLabel: 'Go to Contact Page →',
  },

  // 10. Location & Campus
  {
    id: 'location',
    title: 'Campus Location & Venue',
    category: 'General',
    promptSuggestions: [
      'Where is GDG RMKEC located?',
      'What is the campus address?',
    ],
    keywords: [
      'location',
      'address',
      'where',
      'venue',
      'campus',
      'college',
      'rmkec',
      'kavaraipettai',
      'chennai',
      'tamil nadu',
    ],
    answer:
      "Our chapter is based at R.M.K. Engineering College, RSM Nagar, Kavaraipettai, Tiruvallur District, Tamil Nadu 601206. In-person workshops and hackathon rounds take place across the central campus seminar halls and computer labs.",
    actionUrl: '/about',
    actionLabel: 'About Chapter & Venue →',
  },
];

export const QUICK_PROMPTS = [
  "🏆 Tell me about HackNEXA'26",
  '🚀 How do I join GDG RMKEC?',
  '💻 What are the Technical Wings?',
  '🚌 Bus Tracking Project info',
  '👥 Who leads the chapter?',
  '📩 Contact & Social links',
];

/**
 * Normalizes text by lowercasing and removing punctuation.
 */
function cleanQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intelligent keyword matching engine.
 * Calculates score based on keyword match, prompt suggestion match, and word overlaps.
 */
export function findChatbotAnswer(query: string): ChatbotTopic | null {
  const cleaned = cleanQuery(query);
  if (!cleaned) return null;

  const words = cleaned.split(' ').filter((w) => w.length > 1);

  let bestMatch: ChatbotTopic | null = null;
  let highestScore = 0;

  for (const topic of CHATBOT_TOPICS) {
    let score = 0;

    // Check exact title or prompt suggestion match
    for (const prompt of topic.promptSuggestions) {
      const cleanPrompt = cleanQuery(prompt);
      if (cleanPrompt.includes(cleaned) || cleaned.includes(cleanPrompt)) {
        score += 15;
      }
    }

    // Check keywords
    for (const kw of topic.keywords) {
      if (cleaned.includes(kw)) {
        score += 6;
      }
      for (const w of words) {
        if (w === kw) {
          score += 4;
        } else if (kw.includes(w) && w.length >= 4) {
          score += 2;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  // Minimum threshold required for confidence
  return highestScore >= 4 ? bestMatch : null;
}
