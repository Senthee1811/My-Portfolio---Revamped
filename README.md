# Sentheepan Ellankovan ("Senthee") — Personal Portfolio

A production-grade personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP**, faithfully reproducing the 3-column interaction model, iOS App Store aesthetic, and motion system of [jmancheta.cloud](https://www.jmancheta.cloud).

---

## Features

- **3-Column Independent Desktop Scroller**: Profile, Work, and Proof columns scroll independently with native velocity; the document body remains fixed on desktop and seamlessly stacks on mobile screens.
- **iOS "hello" Splash Screen**: Tri-lingual welcome message cycling through `hello` → `வணக்கம்` (Tamil) → `ආයුබෝවන්` (Sinhala) with clip-path wipe animation.
- **Figma Multiplayer Guided Tour**: Interactive cursor with live typing speech bubbles navigating through 10 key portfolio sections.
- **App Store Project Detail Pages**: Complete with category strips, device preview mockups, problem statements, and technical deep dives.
- **Simulated Telegram Showcase**: Live interactive simulation of the CSE Market Intelligence & Alert Bot inside a custom CSS iPhone frame.
- **Quick Blog Showcase**: Real screenshots captured from the live deployment (`https://quick-blog-flame.vercel.app`) and optimized to WebP.
- **Circular Theme Reveal**: Smooth dark/light mode toggle with circular reveal transition via the View Transitions API.
- **GitHub Contribution Matrix**: Server-rendered and cached via GitHub GraphQL API with 1-hour ISR revalidation.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Generation)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Tailwind CSS, CSS Variables for theming
- **Animation**: GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`, `TextPlugin`, `Flip`, `ScrollToPlugin`)
- **Carousel**: `embla-carousel-react`
- **Icons**: `lucide-react` & Custom SVGs
- **Headless Testing & Capture**: Playwright, Sharp

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## Environment Variables (Optional)

Create a `.env.local` file in the project root:

```env
# Optional: Personal Access Token for GitHub Contributions GraphQL API
GITHUB_TOKEN=your_github_token
```

---

## Deliverables & Documentation

- [TODO.md](file:///D:/portfolio-new/TODO.md): Pending external URLs and credentials.
- [FIDELITY.md](file:///D:/portfolio-new/FIDELITY.md): Verification report comparing against the reference design tokens and layout geometry.
- [PortfolioInfos.md](file:///D:/portfolio-new/docs/PortfolioInfos.md): Single source of truth for identity and experience data.
