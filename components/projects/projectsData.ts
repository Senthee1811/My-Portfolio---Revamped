import {
  Sparkles,
  BookOpen,
  TrendingUp,
  BrainCircuit,
  Camera,
  Layers,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export type Project = {
  slug: string;
  title: string;
  image: string;
  tags: string[];
  platform?: string;
  href?: string;
  video?: string;
  description?: string;
  date?: string;
  icon?: LucideIcon;
  iconBg?: string;
  logo?: string;
  gallery?: string[];
  features?: string[];
  galleryVariant?: 'phone' | 'devices';
  mobileGallery?: string[];
  placeholderGallery?: number;
  sourceHref?: string;
  caseStudy?: CaseStudy;
  featured?: number;
  links?: { label: string; href: string }[];
  teamName?: string;
  team?: TeamMember[];
};

export type TeamMember = {
  name: string;
  github: string;
  role?: string;
  me?: boolean;
};

export type CaseStudy = {
  role?: string;
  timeline?: string;
  stack?: string[];
  problem?: string;
  numbers?: { value: string; label: string }[];
  highlights?: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'matchmystuff',
    title: 'MatchMyStuff',
    image: '/images/projects/matchmystuff/AuthPageSS.png',
    video: '/videos/projects/matchmystuff/demo.mp4',
    logo: '/images/projects/matchmystuff/icon.jpeg',
    tags: ['AI', 'Convex', 'Next.js'],
    icon: Sparkles,
    iconBg: '#3B82F6',
    featured: 1,
    description:
      'AI-powered lost-and-found platform that uses vector search to match lost-item reports with found-item listings, improving match accuracy and speed. Built in 24 hours at the Cursor Buildathon (3rd Place).',
    date: '2025',
    galleryVariant: 'devices',
    gallery: ['/images/projects/matchmystuff/AuthPageSS.png'],
    features: [
      'Semantic vector search indexing descriptions to automatically match lost reports against found listings',
      'Instant real-time reactive sync across all clients powered by Convex backend',
      'Automated notifications and claim verification flow',
      'Built and shipped in 24 hours under hackathon conditions, winning 3rd place in Convex Track',
    ],
    caseStudy: {
      role: 'Full-Stack & AI Architecture',
      timeline: '24 hours · 2025',
      stack: ['Next.js', 'OpenAI API', 'Convex', 'TypeScript', 'Tailwind CSS'],
      numbers: [
        { value: '3rd', label: 'Place, Convex Track' },
        { value: '24h', label: 'Buildathon ship time' },
        { value: 'Vector', label: 'Semantic search matching' },
      ],
      highlights: [
        {
          title: 'Semantic Vector Embeddings',
          body: 'Converts unstructured user lost-and-found descriptions into vector embeddings to find matches even when distinct keywords are used.',
        },
        {
          title: 'Zero-Latency Updates',
          body: 'Subscribed client state guarantees that newly reported found items alert searchers within milliseconds.',
        },
      ],
    },
  },
  {
    slug: 'quick-blog',
    title: 'Quick Blog',
    image: '/images/projects/quick-blog/01-home-desktop.webp',
    tags: ['Full-Stack', 'MERN', 'AI'],
    icon: BookOpen,
    iconBg: '#10B981',
    href: 'https://quick-blog-flame.vercel.app/',
    sourceHref: 'https://github.com/Senthee1811/QuickBlog',
    featured: 2,
    description:
      'Full-stack content management system featuring an AI writing assistant powered by Google Gemini that generates comprehensive long-form blog content from user titles with real-time editing.',
    date: '2025',
    galleryVariant: 'devices',
    gallery: [
      '/images/projects/quick-blog/01-home-desktop.webp',
      '/images/projects/quick-blog/02-home-full-desktop.webp',
      '/images/projects/quick-blog/03-post-desktop.webp',
    ],
    mobileGallery: [
      '/images/projects/quick-blog/08-home-mobile.webp',
      '/images/projects/quick-blog/09-post-mobile.webp',
    ],
    features: [
      'Gemini AI assistant generating structured article drafts with outlines, headings, and key points',
      'Responsive reading interface optimized for desktop, tablet, and mobile displays',
      'Secure Node.js & Express RESTful APIs with full CRUD operations and validation',
      'Flexible MongoDB schema supporting rich content, tags, categories, and author profiles',
    ],
    caseStudy: {
      role: 'Full-Stack Developer',
      timeline: '2025',
      stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Google Gemini API', 'Tailwind CSS'],
      numbers: [
        { value: 'MERN', label: 'Modern stack' },
        { value: 'Gemini', label: 'AI writing engine' },
        { value: '100%', label: 'Responsive views' },
      ],
      highlights: [
        {
          title: 'Integrated AI Generation',
          body: 'Leverages structured prompt pipelines with Google Gemini to produce contextual, draft-ready technical and editorial articles.',
        },
        {
          title: 'Robust RESTful API',
          body: 'Built with layered separation of concerns, comprehensive input sanitization, and scalable database indexing.',
        },
      ],
    },
  },
  {
    slug: 'cse-alert-bot',
    title: 'CSE Market Alert Bot',
    image: '/images/projects/cse/CSE.Dashboard.jpeg',
    tags: ['Python', 'AI', 'Automation'],
    icon: TrendingUp,
    iconBg: '#F59E0B',
    featured: 3,
    description:
      'Automated financial intelligence bot for the Colombo Stock Exchange aggregating daily price movements and volume breakouts, coupled with AI-synthesized market summaries via Gemini 2.5 Flash-Lite.',
    date: '2025',
    galleryVariant: 'devices',
    gallery: [
      '/images/projects/cse/CSE.Dashboard.jpeg',
      '/images/projects/cse/Gemini_Generated_Image_6nogsf6nogsf6nog.jpeg',
    ],
    features: [
      'Asynchronous financial scraping engine tracking equities, indices, and trade velocity on the Colombo Stock Exchange',
      'Gemini 2.5 Flash-Lite integration delivering succinct daily executive briefings and sector breakdowns',
      'Real-time threshold alerting over Telegram and Discord for unusual volume and price surges',
      'Persistent SQLite state storage for historical trending and duplicate alert suppression',
    ],
    caseStudy: {
      role: 'Python & AI Engineer',
      timeline: '2025',
      stack: ['Python', 'Gemini 2.5 Flash-Lite', 'Asyncio', 'Telegram Bot API', 'Discord API'],
      numbers: [
        { value: 'Real-Time', label: 'Breakout detection' },
        { value: 'Gemini', label: '2.5 Flash-Lite summaries' },
        { value: 'Async', label: 'Concurrent scraping' },
      ],
      highlights: [
        {
          title: 'Structured Financial Summarization',
          body: 'Directly converts raw CSE ticker feeds into digestible daily bullet points with market sentiment indicators.',
        },
        {
          title: 'Reliable Real-Time Dispatch',
          body: 'Async background workers monitor market sessions and push priority alerts instantly to traders.',
        },
      ],
    },
  },
  {
    slug: 'emotional-story-assistive-system',
    title: 'Emotional Story Assistive System',
    image: '/images/projects/emotional-story/hero.jpeg',
    tags: ['Research', 'PyTorch', 'Microservices'],
    icon: BrainCircuit,
    iconBg: '#8B5CF6',
    description:
      'Final-year IT research project: modular assistive platform designed for visually and hearing-impaired children featuring facial emotion detection, neural Coqui TTS expressive speech synthesis, and sign translation.',
    date: '2025 – 2026',
    galleryVariant: 'devices',
    gallery: ['/images/projects/emotional-story/hero.jpeg'],
    features: [
      'Neural emotional Text-to-Speech engine built with Coqui TTS and PyTorch fine-tuned to modulate prosody and cadence',
      'Facial expression recognition determining user engagement to adapt storytelling pacing dynamically',
      'Modular containerized microservices architecture communicating via high-throughput REST endpoints',
      'Stuttering audio analysis microservice providing immediate diagnostic cues and speech therapy exercises',
    ],
    caseStudy: {
      role: 'Lead ML & Microservices Engineer',
      timeline: '2025 – 2026',
      stack: ['Python', 'Coqui TTS', 'PyTorch', 'FastAPI', 'Flask', 'React.js', 'Docker'],
      numbers: [
        { value: 'SLIIT', label: 'Final-year research' },
        { value: '4', label: 'Containerized microservices' },
        { value: 'Neural', label: 'Prosody modulation' },
      ],
    },
  },
  {
    slug: 'studio-kfm',
    title: 'Studio KFM',
    image: '/images/projects/cse/CSE_Mock_Icon.jpeg',
    video: '/videos/projects/kfm/demo.mp4',
    tags: ['Full-Stack', 'Freelance', 'Express'],
    icon: Camera,
    iconBg: '#EC4899',
    href: 'https://studiokfm.com',
    description:
      'Production portfolio and content management website built for KFM Studio to manage multi-client photography, videography, and creative commercial showcases.',
    date: '2026',
    galleryVariant: 'devices',
    gallery: ['/images/projects/cse/CSE_Mock_Icon.jpeg'],
    features: [
      'Production client showcase portal displaying high-resolution media galleries and studio reels',
      'Secure administrative back-office with Express.js authentication and role-based permissions',
      'Centralized asset manager allowing studio team to publish and curate client deliverables',
    ],
    caseStudy: {
      role: 'Freelance Full-Stack Developer',
      timeline: 'Jan 2026 – Mar 2026',
      stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      numbers: [
        { value: 'Live', label: 'Production client site' },
        { value: 'Secure', label: 'Role-based CMS' },
      ],
    },
  },
  {
    slug: 'lms-saas',
    title: 'LMS-SAAS',
    image: '/images/projects/quick-blog/01-home-desktop.webp',
    tags: ['SaaS', 'Next.js', 'TypeScript'],
    icon: Layers,
    iconBg: '#06B6D4',
    href: 'https://github.com/Senthee1811/LMS-SAAS',
    sourceHref: 'https://github.com/Senthee1811/LMS-SAAS',
    description:
      'Scalable learning management system SaaS built with Next.js and TypeScript, featuring course structuring, progress monitoring, and interactive quizzes.',
    date: '2025',
    features: [
      'Course content authoring and chapter management',
      'Student progress tracking and analytics',
      'Type-safe architecture with Next.js App Router and TypeScript',
    ],
  },
  {
    slug: 'deepseek-clone',
    title: 'DeepSeek Clone',
    image: '/images/projects/cse/CSE.Dashboard.jpeg',
    tags: ['AI', 'JavaScript', 'React'],
    icon: Bot,
    iconBg: '#3B82F6',
    href: 'https://github.com/Senthee1811/deepseek-clone',
    sourceHref: 'https://github.com/Senthee1811/deepseek-clone',
    description:
      'Conversational AI web interface cloning DeepSeek with real-time response streaming, code block formatting, and session history.',
    date: '2025',
    features: [
      'Real-time streaming text generation interface',
      'Code syntax highlighting and markdown rendering',
      'Conversational state persistence',
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
