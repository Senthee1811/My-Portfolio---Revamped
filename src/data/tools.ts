export interface ToolCategory {
  name: string;
  count: number;
  tools: {
    name: string;
    description?: string;
    level?: string;
    icon?: string;
  }[];
}

export const toolCategories: ToolCategory[] = [
  {
    name: "Languages",
    count: 8,
    tools: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "C" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    name: "Frontend",
    count: 4,
    tools: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Vue.js" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    name: "Backend & Data",
    count: 8,
    tools: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Supabase" },
      { name: "Convex" },
      { name: "RESTful APIs" },
      { name: "Microservices" },
    ],
  },
  {
    name: "DevOps & Cloud",
    count: 6,
    tools: [
      { name: "Docker" },
      { name: "AWS (Certified)" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "CI/CD" },
      { name: "Vercel" },
    ],
  },
  {
    name: "AI & Machine Learning",
    count: 6,
    tools: [
      { name: "Gemini API" },
      { name: "GPT-4 / OpenAI" },
      { name: "DeepSeek" },
      { name: "Claude" },
      { name: "Coqui TTS" },
      { name: "PyTorch" },
    ],
  },
];

export const totalToolsCount = toolCategories.reduce(
  (acc, cat) => acc + cat.tools.length,
  0
);
