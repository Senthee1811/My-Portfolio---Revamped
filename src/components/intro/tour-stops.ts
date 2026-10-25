export interface TourStop {
  id: string;
  targetId: string;
  title: string;
  message: string;
}

export const tourStops: TourStop[] = [
  {
    id: "avatar",
    targetId: "profile-avatar",
    title: "Senthee",
    message: "Hi, I'm Senthee! Full-stack engineer & AI developer based in Colombo.",
  },
  {
    id: "highlights",
    targetId: "story-highlights",
    title: "Highlights",
    message: "Browse Instagram-style stories covering my background, stack, and active focus.",
  },
  {
    id: "experience",
    targetId: "experience-section",
    title: "Experience",
    message: "My industry experience at Print Care and production freelance work with KFM Studio.",
  },
  {
    id: "achievements",
    targetId: "achievements-section",
    title: "Honors",
    message: "Cursor 24h Buildathon 3rd place winner and AWS Academy Cloud certification.",
  },
  {
    id: "availability",
    targetId: "availability-card",
    title: "Availability",
    message: "Live Colombo time clock & direct WhatsApp channel for engineering inquiries.",
  },
  {
    id: "featured",
    targetId: "featured-carousel-section",
    title: "Featured Works",
    message: "Interactive carousel highlighting top projects and hackathon builds.",
  },
  {
    id: "projects",
    targetId: "projects-section",
    title: "Project Catalog",
    message: "Filter and explore full-stack apps, AI microservices, and live demos.",
  },
  {
    id: "github",
    targetId: "github-graph-section",
    title: "Contributions",
    message: "Verified commit history and daily active open-source activity.",
  },
  {
    id: "tools",
    targetId: "tools-section",
    title: "Tool Stack",
    message: "Grouped breakdown of my 32+ languages, frameworks, AI APIs, and DevOps tools.",
  },
  {
    id: "actions",
    targetId: "quick-actions-bar",
    title: "Quick Actions",
    message: "Download my CV, visit my GitHub & LinkedIn, or reach out anytime!",
  },
];
