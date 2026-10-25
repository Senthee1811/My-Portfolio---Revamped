export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  kind: 'award' | 'participation'; // picks the icon (trophy / medal)
  description: string;
  href?: string; // proof: the listing page or certificate
  hrefLabel?: string; // link text for `href`, e.g. "View certificate"
  projectSlug?: string; // the project it came from — links to its case study
  image: string; // Featured slide visual
  imageVariant?: 'browser' | 'paper'; // site screenshot in a MacBook, or a certificate sheet
  facts?: { value: string; label: string }[]; // up to 3 stats on the Featured slide
  featured?: number; // position in the Featured carousel; achievements come before projects
};

export const achievements: Achievement[] = [
  {
    id: 'cursor-buildathon-2025',
    title: '3rd Place — Convex Track',
    issuer: 'Cursor 24-Hour Buildathon',
    date: '2025',
    kind: 'award',
    description:
      'Won 3rd place in the Convex Track at the Cursor 24-Hour Buildathon by designing and building MatchMyStuff, an AI-powered lost-and-found platform with vector search.',
    projectSlug: 'matchmystuff',
    image: '/images/projects/matchmystuff/AuthPageSS.png',
    imageVariant: 'browser',
    facts: [
      { value: '3rd', label: 'Convex Track award' },
      { value: '24h', label: 'to architect and ship' },
      { value: 'Vector', label: 'semantic AI search' },
    ],
    featured: 1,
  },
  {
    id: 'aws-academy-builder',
    title: 'Cloud Web App Builder',
    issuer: 'AWS Academy',
    date: '2025',
    kind: 'participation',
    description:
      'Certified by AWS Academy in cloud web application architecture, deployment, compute, storage, and networking on Amazon Web Services.',
    hrefLabel: 'Credential verified',
    image: '/images/me/portfolio-hero.png',
    imageVariant: 'paper',
    facts: [
      { value: 'AWS', label: 'Academy certified' },
      { value: 'Cloud', label: 'application architecture' },
      { value: '2025', label: 'awarded' },
    ],
    featured: 2,
  },
  {
    id: 'pafolios-potd',
    title: 'Portfolio of the Day',
    issuer: 'Pafolios',
    date: '2026',
    kind: 'award',
    description:
      'Recognized as Portfolio of the Day in the Software Developer category on Pafolios for interactive multi-column engineering.',
    href: 'https://pafolios.com',
    hrefLabel: 'View on Pafolios',
    image: '/images/projects/matchmystuff/AuthPageSS.png',
    imageVariant: 'browser',
    facts: [
      { value: 'POTD', label: 'Portfolio of the Day' },
      { value: 'Dev', label: 'Software Developer category' },
    ],
    featured: 3,
  },
];
