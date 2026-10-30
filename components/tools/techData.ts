export type Tech = {
  name: string;
  icon: string;
  // Monochrome logos need to flip with the theme so they stay visible.
  // 'brand-hover' logos show monochrome (black in light mode, white in dark mode) and turn full brand color on hover.
  tone?: 'black' | 'white' | 'brand-hover';
};

export type TechGroup = { label: string; items: Tech[] };

const I = (file: string) => `/images/techstack/${file}`;

export const techGroups: TechGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript', icon: I('typescript.svg') },
      { name: 'JavaScript', icon: I('javascript-logo-svgrepo-com.svg') },
      { name: 'Python', icon: I('python.svg') },
      { name: 'HTML5', icon: I('html5.svg') },
      { name: 'CSS3', icon: I('css3.svg') },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: I('react.svg') },
      { name: 'Next.js', icon: I('nextjs2.svg'), tone: 'black' },
      { name: 'Tailwind CSS', icon: I('tailwindcss.svg'), tone: 'black' },
      { name: 'Framer Motion', icon: I('framer.svg'), tone: 'black' },
      { name: 'shadcn/ui', icon: I('shadcnui.svg'), tone: 'black' },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'Node.js', icon: I('nodejs.svg') },
      { name: 'MySQL', icon: I('mysql.svg') },
      { name: 'Supabase', icon: I('supabase.svg'), tone: 'black' },
      { name: 'Firebase', icon: I('firebase.svg'), tone: 'black' },
      { name: 'Nest.js', icon: I('nestjs.svg'), tone: 'brand-hover' },
    ],
  },
  {
    label: 'DevOps & Tools',
    items: [
      { name: 'Git', icon: I('git.svg') },
      { name: 'GitHub', icon: I('github.svg'), tone: 'black' },
      { name: 'Docker', icon: I('docker.svg') },
      { name: 'Vercel', icon: I('vercel.svg'), tone: 'black' },
      { name: 'Figma', icon: I('figma.svg') },
    ],
  },
  {
    label: 'AI & Automation',
    items: [
      { name: 'ChatGPT', icon: I('openai.svg'), tone: 'black' },
      { name: 'Claude', icon: I('claude.svg') },
      { name: 'Cursor', icon: I('cursor.svg'), tone: 'black' },
      { name: 'Copilot', icon: I('copilot.svg'), tone: 'black' },
    ],
  },
];

/** Flat list, for anything that just needs every tool. */
export const tech: Tech[] = techGroups.flatMap((g) => g.items);
