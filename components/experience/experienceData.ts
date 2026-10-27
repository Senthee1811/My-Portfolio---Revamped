export type Experience = {
  period: string;
  company: string;
  role: string;
  current?: boolean;
  href?: string;
  shiny?: boolean;
};

export const experiences: Experience[] = [
  {
    period: 'Jan 2026 – April 2026',
    company: 'KFM Studio',
    role: 'Freelance Full-Stack Developer',
    current: true,
    href: 'https://studiokfm.com',
    shiny: true,
  },
  {
    period: 'Apr 2025 – Oct 2025',
    company: 'PRINTCARE PREMEDIA SERVICES LTD',
    role: 'Full-Stack Developer Intern',
  },
  {
    period: '2022 – 2026',
    company: 'SLIIT',
    role: 'BSc (Hons) in Information Technology',
  },
  {
    period: '2021',
    company: 'Hello World',
    role: 'Wrote my first line of code',
  },
];
