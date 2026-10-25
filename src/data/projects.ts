export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  tags: string[];
  summary: string;
  problem: string;
  whatsIncluded: string[];
  underTheHood: { title: string; body: string }[];
  stats?: { value: string; label: string }[];
  info: {
    category: string;
    platform: string;
    year: string;
    role: string;
    stack: string[];
  };
  links: {
    github?: string;
    live?: string;
  };
  icon: string;
  screenshots?: string[];
  videoUrl?: string;
  showcase?: "telegram-sim" | "screenshots" | "video";
  status?: "Live" | "Open" | "Soon";
  isFeatured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "quick-blog",
    name: "Quick Blog",
    subtitle: "AI-Assisted Content Management System",
    tags: ["MERN", "React", "Node.js", "MongoDB", "Gemini AI"],
    summary:
      "Full-stack CMS with an AI writing assistant powered by Google Gemini that generates long-form blog content from a title, complete with image uploads and tag taxonomies.",
    problem:
      "Content creators spend hours drafting articles and formatting posts across disparate tools. Quick Blog streamlines ideation and publishing into a single responsive dashboard.",
    whatsIncluded: [
      "AI blog post generation using Gemini API",
      "Dynamic tagging and category management",
      "Full CRUD REST API with Express and MongoDB",
      "Responsive reader experience across mobile and desktop",
    ],
    underTheHood: [
      {
        title: "Gemini AI Pipeline",
        body: "Prompt-engineered integration with Gemini to produce structured markdown drafts, titles, and summaries from a single prompt.",
      },
      {
        title: "RESTful Service Layer",
        body: "Node.js and Express backend with input sanitization, error middleware, and optimized MongoDB index queries.",
      },
      {
        title: "Component Architecture",
        body: "Modular React client with stateful forms, responsive layout grids, and fast client-side navigation.",
      },
    ],
    info: {
      category: "Content Management",
      platform: "Web · Desktop & Mobile",
      year: "2025",
      role: "Full-Stack Engineer",
      stack: ["React", "Express.js", "Node.js", "MongoDB", "Gemini API"],
    },
    links: {
      github: "https://github.com/Senthee1811/QuickBlog",
      live: "https://quick-blog-flame.vercel.app",
    },
    icon: "FileText",
    showcase: "screenshots",
    screenshots: [
      "/images/projects/quick-blog/01-home-desktop.webp",
      "/images/projects/quick-blog/02-home-full-desktop.webp",
      "/images/projects/quick-blog/03-post-desktop.webp",
      "/images/projects/quick-blog/08-home-mobile.webp",
      "/images/projects/quick-blog/09-post-mobile.webp",
    ],
    status: "Live",
    isFeatured: true,
  },
  {
    slug: "cse-alert-bot",
    name: "CSE Market Intelligence Bot",
    subtitle: "Automated CSE Stock Analytics & Breakout Alerts",
    tags: ["Python", "Gemini 2.5", "Asyncio", "Telegram Bot API"],
    summary:
      "Automated Colombo Stock Exchange intelligence bot that monitors daily trade volumes, index fluctuations (ASPI, S&P SL20), and sends AI summaries and breakout alerts.",
    problem:
      "Investors in Sri Lanka lack affordable real-time terminal tools for the Colombo Stock Exchange to catch high-volume breakouts and index turning points.",
    whatsIncluded: [
      "Real-time CSE trade statistics scraping & processing",
      "Automated daily market recap via Gemini 2.5 Flash-Lite",
      "Volume spike & price breakout alerting engine",
      "Interactive Telegram commands (/today, /mute, /stocks)",
    ],
    underTheHood: [
      {
        title: "Asynchronous Polling Engine",
        body: "Built with Python asyncio to handle concurrent market data ingestion and Telegram webhook dispatches without blocking.",
      },
      {
        title: "Structured LLM Summarization",
        body: "Feeds raw closing trade stats to Gemini 2.5 Flash-Lite using structured JSON prompts to synthesize bullet-point recaps in under 2 seconds.",
      },
      {
        title: "Threshold State Machine",
        body: "Maintains rolling price/volume averages to fire alerts only when volume exceeds 3x historical averages with >5% price delta.",
      },
    ],
    info: {
      category: "FinTech & AI Agent",
      platform: "Telegram / Cloud Worker",
      year: "2026",
      role: "Backend & AI Developer",
      stack: ["Python", "Asyncio", "Gemini 2.5 Flash-Lite", "Telegram Bot API"],
    },
    links: {
      github: "https://github.com/Senthee1811",
    },
    icon: "TrendingUp",
    showcase: "telegram-sim",
    status: "Live",
    isFeatured: true,
  },
  {
    slug: "match-my-stuff",
    name: "MatchMyStuff",
    subtitle: "AI-Powered Lost & Found Platform",
    tags: ["Next.js", "OpenAI API", "Convex", "Vector Search"],
    summary:
      "AI-powered lost-and-found platform that uses vector embeddings to match lost-item reports with found listings in real time. Winner of 3rd place in the Convex Track at Cursor 24-Hour Buildathon.",
    problem:
      "Traditional lost-and-found systems rely on exact keyword matches, which fail when people describe identical items with different terms.",
    whatsIncluded: [
      "Vector embeddings with semantic cosine matching",
      "Real-time reactive database synchronization via Convex",
      "Lost & found intake wizard with image attachments",
      "Built, tested, and shipped in 24 hours",
    ],
    underTheHood: [
      {
        title: "Vector Similarity Matching",
        body: "Converts report descriptions into OpenAI embeddings and performs nearest-neighbor vector search in Convex.",
      },
      {
        title: "Zero-Latency Reactive Sync",
        body: "Utilizes Convex subscription queries so newly submitted found items instantly pop into potential match lists without page refresh.",
      },
    ],
    stats: [
      { value: "3rd", label: "Place (Convex Track)" },
      { value: "24h", label: "Hackathon Build" },
    ],
    info: {
      category: "Full-Stack Web & AI",
      platform: "Web · Mobile Responsive",
      year: "2025",
      role: "Sole Creator",
      stack: ["Next.js", "Convex", "OpenAI API", "Tailwind CSS"],
    },
    links: {
      github: "https://github.com/Senthee1811",
    },
    icon: "Compass",
    showcase: "video",
    videoUrl: "/videos/projects/matchmystuff/demo.mp4",
    status: "Open",
    isFeatured: true,
  },
  {
    slug: "emotional-story-assistive-system",
    name: "Emotional Story Assistive System",
    subtitle: "Assistive Platform for Sensory-Impaired Children",
    tags: ["Python", "PyTorch", "Coqui TTS", "FastAPI", "React", "Docker"],
    summary:
      "Final-year research platform built as modular microservices: emotion detection for story recommendation, an emotional neural TTS engine, sign language translation, and stutter remedial exercises.",
    problem:
      "Children with hearing, vision, or speech challenges frequently experience exclusion from conventional digital storytelling media due to monotone audio and non-adaptive interfaces.",
    whatsIncluded: [
      "Fine-tuned neural acoustic models for expressive emotional speech",
      "Computer-vision facial emotion recognition pipeline",
      "Sign-language visual interpretation microservice",
      "Containerized microservices orchestration with Docker",
    ],
    underTheHood: [
      {
        title: "Expressive Neural TTS",
        body: "Engineered with Coqui TTS and PyTorch, fine-tuning neural acoustic weights to modulate pitch, cadence, and expressive prosody according to story emotional context.",
      },
      {
        title: "Microservice Architecture",
        body: "FastAPI REST and asynchronous audio worker pipelines, decoupled for independent scaling and low latency, fully containerized in Docker.",
      },
    ],
    info: {
      category: "Research / Assistive AI",
      platform: "Web & Microservices",
      year: "2025",
      role: "Lead ML & Backend Engineer",
      stack: ["Python", "PyTorch", "Coqui TTS", "FastAPI", "Docker", "React"],
    },
    links: {
      github: "https://github.com/Senthee1811",
    },
    icon: "HeartPulse",
    showcase: "screenshots",
    status: "Open",
    isFeatured: true,
  },
  {
    slug: "studio-kfm",
    name: "Studio KFM",
    subtitle: "Creative Studio Portfolio & Client CMS",
    tags: ["React", "Express.js", "MongoDB", "Node.js"],
    summary:
      "Production portfolio and custom CMS built for KFM Studio, allowing management and showcase of multimedia client projects from a unified control panel.",
    problem:
      "The client needed an artistic showcase coupled with an easy CMS to upload media and categorize commercial productions without developer intervention.",
    whatsIncluded: [
      "Custom media portfolio showcase",
      "Admin CMS with authenticated client-project management",
      "Express REST backend with MongoDB storage",
      "Mobile-optimized high-resolution playback",
    ],
    underTheHood: [
      {
        title: "Secure Content API",
        body: "Built with Express.js incorporating JWT authentication, role guards, and MongoDB schema validations.",
      },
    ],
    info: {
      category: "Commercial Web App",
      platform: "Web · Responsive",
      year: "2026",
      role: "Freelance Full-Stack Developer",
      stack: ["React", "Express.js", "Node.js", "MongoDB", "Tailwind CSS"],
    },
    links: {
      live: "https://studiokfm.com",
    },
    icon: "Camera",
    showcase: "video",
    videoUrl: "/videos/projects/kfm/demo.mp4",
    status: "Live",
    isFeatured: false,
  },
  {
    slug: "lms-saas",
    name: "LMS-SAAS",
    subtitle: "Learning Management SaaS Platform",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "Modern cloud learning management platform with course creation, user progress tracking, and video lectures built on Next.js App Router.",
    problem:
      "Educational institutions require structured course hosting with intuitive progress tracking and modern design.",
    whatsIncluded: [
      "Course catalog and syllabus builder",
      "Interactive video lessons",
      "Student enrollment & progress tracking",
    ],
    underTheHood: [
      {
        title: "Next.js App Router Architecture",
        body: "Leverages React Server Components for fast load times and optimized video streaming player components.",
      },
    ],
    info: {
      category: "EdTech SaaS",
      platform: "Web",
      year: "2025",
      role: "Creator",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    links: {
      github: "https://github.com/Senthee1811/LMS-SAAS",
    },
    icon: "GraduationCap",
    status: "Open",
    isFeatured: false,
  },
  {
    slug: "deepseek-clone",
    name: "DeepSeek Clone",
    subtitle: "Conversational AI Interface",
    tags: ["JavaScript", "React", "AI APIs"],
    summary:
      "Clean conversational AI web application replicating DeepSeek's chat interface, streaming responses, and markdown code highlight rendering.",
    problem:
      "Users need a responsive, clean interface for prompt engineering and rapid AI interaction.",
    whatsIncluded: ["Streaming text generation", "Code syntax highlighting", "Conversation memory sidebar"],
    underTheHood: [
      {
        title: "Streaming Parser",
        body: "Client-side stream buffer handling chunked markdown tokens with instant typing animation.",
      },
    ],
    info: {
      category: "AI Chat Interface",
      platform: "Web",
      year: "2025",
      role: "Developer",
      stack: ["React", "JavaScript", "Tailwind CSS"],
    },
    links: {
      github: "https://github.com/Senthee1811/deepseek-clone",
    },
    icon: "Bot",
    status: "Open",
    isFeatured: false,
  },
  {
    slug: "travel-ui-ux",
    name: "Travel UI/UX",
    subtitle: "Immersive Travel Experience Platform",
    tags: ["TypeScript", "Next.js", "Tailwind CSS"],
    summary:
      "Pixel-perfect travel booking and destination discovery application interface with smooth interactive filters and rich card layouts.",
    problem:
      "Travelers need inspiring, visually rich discovery portals with clear itineraries and pricing.",
    whatsIncluded: ["Destination exploration cards", "Booking filter controls", "Responsive mobile layouts"],
    underTheHood: [
      {
        title: "Tailwind UI System",
        body: "Curated typography and custom aesthetic cards with fluid transitions.",
      },
    ],
    info: {
      category: "UI/UX & Frontend",
      platform: "Web",
      year: "2024",
      role: "Frontend Engineer",
      stack: ["TypeScript", "Next.js", "Tailwind CSS"],
    },
    links: {
      github: "https://github.com/Senthee1811/Travel-UI-UX",
    },
    icon: "Plane",
    status: "Open",
    isFeatured: false,
  },
  {
    slug: "ecommerce-web",
    name: "E-Commerce Web",
    subtitle: "Modern Responsive Online Storefront",
    tags: ["HTML5", "CSS3", "JavaScript"],
    summary:
      "Clean, responsive front-end online storefront featuring product catalogs, shopping cart logic, and interactive checkout mockups.",
    problem:
      "Demonstrates fundamental DOM manipulation, responsive CSS grids, and vanilla JS state management.",
    whatsIncluded: ["Product filter and search", "Dynamic cart calculations", "Responsive navigation"],
    underTheHood: [
      {
        title: "Vanilla Architecture",
        body: "High-performance zero-dependency JavaScript for cart state and responsive CSS media queries.",
      },
    ],
    info: {
      category: "E-Commerce",
      platform: "Web",
      year: "2024",
      role: "Frontend Developer",
      stack: ["HTML5", "CSS3", "JavaScript"],
    },
    links: {
      github: "https://github.com/Senthee1811/ECommerceWeb-HtmlCSSJS-",
    },
    icon: "ShoppingBag",
    status: "Open",
    isFeatured: false,
  },
];
