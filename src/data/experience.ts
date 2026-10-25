export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: "Internship" | "Freelance" | "Full-time";
  bullets: string[];
  skills: string[];
  link?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  badge: string;
  description: string;
  credentialUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "kfm-studio",
    role: "Freelance Full-Stack Developer",
    company: "KFM Studio",
    location: "Colombo / Remote",
    period: "Jan 2026 – Mar 2026",
    isCurrent: false,
    type: "Freelance",
    bullets: [
      "Designed and engineered studiokfm.com, a portfolio and content management system enabling the studio to showcase media and manage multi-client content.",
      "Built secure RESTful backend APIs with Express.js, implementing JWT authentication, role authorization, and database CRUD pipelines.",
      "Collaborated directly with creative stakeholders to gather requirements, iterate on UI deliverables, and ensure high production uptime.",
    ],
    skills: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    link: "https://studiokfm.com",
  },
  {
    id: "print-care",
    role: "Full-Stack Developer Intern",
    company: "Print Care",
    location: "Colombo, Sri Lanka",
    period: "Apr 2025 – Oct 2025",
    isCurrent: false,
    type: "Internship",
    bullets: [
      "Engineered and optimized RESTful endpoints for the Candela E-Learning Platform, improving data reliability and reducing response latency by 30–40%.",
      "Co-architected and deployed the Candela Usage Monitoring System, providing real-time telemetry on user engagement and platform health.",
      "Built responsive, component-driven interfaces using Vue.js and Tailwind CSS, increasing modularity and speeding feature rollout.",
    ],
    skills: ["Vue.js", "REST APIs", "Node.js", "Tailwind CSS", "Analytics"],
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "convex-hackathon",
    title: "3rd Place — Convex Track",
    subtitle: "Cursor 24-Hour Buildathon",
    date: "2025",
    badge: "Hackathon Award",
    description: "Designed, built and shipped MatchMyStuff (AI vector search lost-and-found system) in 24 hours using Next.js and Convex.",
  },
  {
    id: "aws-certification",
    title: "AWS Academy Cloud Web App Builder",
    subtitle: "AWS Training & Certification",
    date: "2025",
    badge: "Certification",
    description: "Certified proficiency in cloud web architecture, serverless pipelines, and AWS scalable service deployments.",
  },
];

export const educations: EducationItem[] = [
  {
    institution: "SLIIT (Sri Lanka Institute of Information Technology)",
    degree: "BSc (Hons) in Information Technology",
    period: "2022 – 2026",
    location: "Colombo, Sri Lanka",
    details: "Specialized in Full-Stack Development & Software Quality Assurance. Coursework: Data Structures & Algorithms, OOP (Java/C++), DBMS, Web Architectures.",
  },
  {
    institution: "Jaffna Hindu College",
    degree: "GCE Advanced Level (Physical Science)",
    period: "2017 – 2021",
    location: "Jaffna, Sri Lanka",
    details: "Vice President, Interact Club — led executive team and coordinated school community initiatives.",
  },
];
