export type Highlight = {
  id: 'about' | 'stack' | 'contact' | 'now';
  label: string;
  title: string;
  body: string;
  image?: string; // optional cover/story image
};

export const highlights: Highlight[] = [
  {
    id: 'about',
    label: 'About',
    title: 'About me',
    body: 'BSc (Hons) IT graduate from SLIIT with 9+ months full-stack experience building scalable, AI-integrated web applications with MERN, Next.js, and Python. Based in Colombo.',
    image: '/images/highlights/about.png',
  },
  {
    id: 'stack',
    label: 'Stack',
    title: 'My stack',
    body: 'MERN stack (MongoDB, Express, React, Node.js), Next.js, TypeScript, Python, Vue.js, Tailwind CSS — plus AI APIs (Gemini, OpenAI, Claude, DeepSeek) in production.',
    image: '/images/highlights/stacks.jpg',
  },
  {
    id: 'now',
    label: 'Now',
    title: "What I'm up to",
    body: 'Open to junior software engineering roles and freelance projects. Shipping high-performance web apps and intelligent automation.',
    image: '/images/highlights/now.jpg',
  },
  {
    id: 'contact',
    label: 'Contact',
    title: "Let's talk",
    body: "Open to freelance and full-time opportunities. Hit Message to connect on WhatsApp (+94 76 258 7540), or follow on GitHub @Senthee1811.",
    image: '/images/highlights/contact.jpg',
  },
];
