import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Portfolio Architecture & Functionalities — Sentheepan Ellankovan</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 9pt;
        color: #71717a;
      }
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #18181b;
      line-height: 1.55;
      font-size: 10pt;
      background: #ffffff;
    }

    .header-banner {
      border-bottom: 2px solid #18181b;
      padding-bottom: 14px;
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-banner h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #09090b;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    .header-banner .subtitle {
      font-size: 10.5pt;
      color: #52525b;
      margin-top: 4px;
      font-weight: 500;
    }

    .header-meta {
      text-align: right;
      font-size: 8.5pt;
      color: #71717a;
      line-height: 1.35;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 7.5pt;
      font-weight: 600;
      background: #f4f4f5;
      color: #18181b;
      border: 1px solid #e4e4e7;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .badge-dark {
      background: #18181b;
      color: #ffffff;
      border-color: #18181b;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #09090b;
      letter-spacing: -0.01em;
      margin-top: 20px;
      margin-bottom: 10px;
      padding-bottom: 4px;
      border-bottom: 1px solid #e4e4e7;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    h3 {
      font-size: 11pt;
      font-weight: 600;
      color: #18181b;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    p {
      margin-bottom: 8px;
      color: #3f3f46;
    }

    ul, ol {
      margin-left: 18px;
      margin-bottom: 10px;
      color: #3f3f46;
    }

    li {
      margin-bottom: 4px;
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8.5pt;
      background: #f4f4f5;
      padding: 1px 5px;
      border-radius: 4px;
      border: 1px solid #e4e4e7;
      color: #09090b;
    }

    pre {
      background: #09090b;
      color: #f4f4f5;
      padding: 12px 14px;
      border-radius: 8px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
      font-size: 8pt;
      line-height: 1.45;
      margin: 10px 0;
      overflow-x: hidden;
      white-space: pre-wrap;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 16px 0;
      font-size: 8.5pt;
    }

    th {
      background: #f4f4f5;
      color: #18181b;
      font-weight: 600;
      text-align: left;
      padding: 7px 10px;
      border: 1px solid #e4e4e7;
    }

    td {
      padding: 7px 10px;
      border: 1px solid #e4e4e7;
      color: #3f3f46;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background: #fafafa;
    }

    .card {
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      padding: 12px 14px;
      margin: 10px 0;
      background: #fafafa;
    }

    .card-title {
      font-weight: 700;
      font-size: 9.5pt;
      color: #09090b;
      margin-bottom: 4px;
    }

    .page-break {
      page-break-before: always;
    }

    .highlight-box {
      border-left: 3px solid #18181b;
      background: #f4f4f5;
      padding: 10px 14px;
      border-radius: 0 6px 6px 0;
      margin: 12px 0;
      font-size: 9pt;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 10px 0;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: TITLE & EXECUTIVE SUMMARY -->
  <div class="header-banner">
    <div>
      <span class="badge badge-dark">Engineering Specification</span>
      <h1 style="margin-top: 6px;">Portfolio Architecture &amp; Functionalities</h1>
      <div class="subtitle">Sentheepan Ellankovan ("Senthee") Personal Platform</div>
    </div>
    <div class="header-meta">
      <div><strong>Version:</strong> 2.0 (Exact 1:1 Match)</div>
      <div><strong>Reference:</strong> jmancheta.cloud</div>
      <div><strong>Date:</strong> October 2026</div>
      <div><strong>Framework:</strong> Next.js 16 + Tailwind CSS v3</div>
    </div>
  </div>

  <h2>1. Overview &amp; Objective</h2>
  <p>
    This project is a high-fidelity, production-grade personal developer portfolio engineered as an <strong>exact, 1:1 pixel-perfect match</strong> to the layout, interactions, animations, and typography of <a href="https://www.jmancheta.cloud/">jmancheta.cloud</a> (source repo: <code>jm-commitz/jmfolio</code>), customized completely with <strong>Sentheepan Ellankovan's</strong> authentic background, projects, skill sets, and verified assets from <code>PortfolioInfos.md</code>.
  </p>

  <div class="highlight-box">
    <strong>Key Accomplishment:</strong> Resolved the Tailwind styling failure where uncompiled utility classes caused fullscreen unconstrained rendering. Migrated to the exact Tailwind v3 + PostCSS engine and App Router architecture, achieving zero TypeScript and build errors across all static pages.
  </div>

  <h2>2. Architectural Structure</h2>
  <p>
    The codebase follows a clean, modular structure where each domain is decoupled into self-contained components, data schemas, and utilities:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 28%;">Directory / Module</th>
        <th style="width: 32%;">Primary Purpose</th>
        <th style="width: 40%;">Key Components &amp; Files</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>app/</code></td>
        <td>Next.js App Router root layout, home page, and dynamic App Store routes</td>
        <td><code>layout.tsx</code>, <code>page.tsx</code>, <code>globals.css</code>, <code>projects/[slug]/page.tsx</code>, <code>icon.png</code>, <code>opengraph-image.png</code></td>
      </tr>
      <tr>
        <td><code>components/hero/</code></td>
        <td>Identity profile, live GitHub avatar, verified badge, and scroll header</td>
        <td><code>Hero.tsx</code>, <code>HeroAvatar.tsx</code>, <code>ProfileBar.tsx</code>, <code>profileLinks.ts</code>, <code>AchievementToast.tsx</code></td>
      </tr>
      <tr>
        <td><code>components/highlights/</code></td>
        <td>Instagram-style story bubbles with timed full-screen viewer</td>
        <td><code>Highlights.tsx</code>, <code>StoryViewer.tsx</code>, <code>highlightsData.ts</code></td>
      </tr>
      <tr>
        <td><code>components/experience/</code></td>
        <td>Interactive career and internship timeline with collapsible records</td>
        <td><code>Experience.tsx</code>, <code>experienceData.ts</code></td>
      </tr>
      <tr>
        <td><code>components/achievements/</code></td>
        <td>Award cards, hackathon victories, and official certifications</td>
        <td><code>Achievements.tsx</code>, <code>achievementsData.ts</code></td>
      </tr>
      <tr>
        <td><code>components/availability/</code></td>
        <td>Live Colombo time clock, working status, CV grab, and WhatsApp action</td>
        <td><code>AvailabilityCard.tsx</code></td>
      </tr>
      <tr>
        <td><code>components/featured/</code></td>
        <td>Embla 3D carousel spotlighting standout builds in device frames</td>
        <td><code>FeaturedProject.tsx</code>, <code>FeaturedCarousel.tsx</code></td>
      </tr>
      <tr>
        <td><code>components/projects/</code></td>
        <td>Filterable project directory with dynamic tag dropdown and rows</td>
        <td><code>ProjectsList.tsx</code>, <code>ProjectRow.tsx</code>, <code>CategoryDropdown.tsx</code>, <code>projectsData.ts</code></td>
      </tr>
      <tr>
        <td><code>components/projects/appstore/</code></td>
        <td>App Store-style case study details (MacBook / iPhone device frames)</td>
        <td><code>DeviceFrame.tsx</code>, <code>ProjectGallery.tsx</code>, <code>StickyAppBar.tsx</code>, <code>ExpandableText.tsx</code></td>
      </tr>
      <tr>
        <td><code>components/github/</code></td>
        <td>Live GitHub contributions heat-map grid with drag scroll</td>
        <td><code>GithubContributions.tsx</code>, <code>ContributionGraph.tsx</code></td>
      </tr>
      <tr>
        <td><code>components/tools/</code></td>
        <td>Grouped technical tool-stack with dual-tone SVGs for dark/light</td>
        <td><code>Tools.tsx</code>, <code>techData.ts</code></td>
      </tr>
      <tr>
        <td><code>components/tour/</code></td>
        <td>Autonomous virtual Figma cursor giving interactive speech bubble tour</td>
        <td><code>TourCursor.tsx</code>, <code>cursorParts.tsx</code></td>
      </tr>
      <tr>
        <td><code>components/spotify/</code></td>
        <td>Real-time music playback and playlist rail player</td>
        <td><code>SpotifyRail.tsx</code>, <code>NowPlaying.tsx</code>, <code>visitorPlayback.ts</code></td>
      </tr>
      <tr>
        <td><code>components/ui/</code></td>
        <td>Independent scroll columns, canvas dot background, and intro splash</td>
        <td><code>ScrollColumn.tsx</code>, <code>PageBackground.tsx</code>, <code>HelloSplash.tsx</code>, <code>CursorFollower.tsx</code></td>
      </tr>
      <tr>
        <td><code>lib/</code></td>
        <td>Integrations for GitHub GraphQL, Spotify Web API, and Supabase presence</td>
        <td><code>github.ts</code>, <code>spotify.ts</code>, <code>supabase.ts</code></td>
      </tr>
      <tr>
        <td><code>public/</code></td>
        <td>Static assets, WebP live screenshots, CV PDF, and tech stack vectors</td>
        <td><code>cv/Sentheepan_Ellankovan_CV.pdf</code>, <code>images/projects/quick-blog/</code></td>
      </tr>
    </tbody>
  </table>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <h2>3. The Tailwind CSS &amp; Visual Design Engine</h2>
  
  <h3>Root Cause of the Styling Anomaly</h3>
  <p>
    Earlier in the development process, Tailwind v4 packages (<code>@tailwindcss/postcss</code>) were active without theme tokens, while components relied on Tailwind v3 utility classes (e.g., <code>bg-card</code>, <code>text-muted-foreground</code>, <code>border-border</code>). This caused the PostCSS pipeline to silently bypass rules, rendering unconstrained raw HTML images.
  </p>

  <h3>Implementation of the Design System</h3>
  <p>
    The project was realigned with Tailwind CSS v3 (<code>tailwindcss ^3.4.19</code>, <code>postcss ^8.5.31</code>, <code>autoprefixer ^10.6.1</code>) and configured with:
  </p>
  <ul>
    <li><strong>CSS Variable Palette:</strong> <code>--background</code> (#0a0a0a dark / #ffffff light), <code>--card</code> (#101010 dark / #ffffff light), <code>--border</code> (#262626 dark / #e5e5e5 light), and custom muted tones for ultra-clean readability.</li>
    <li><strong>Adaptive Typography:</strong> DM Sans variable font loaded with fallback stacks and fine anti-aliasing.</li>
    <li><strong>Custom Border Radii:</strong> Proportional radius multipliers (<code>lg</code>, <code>xl</code>, <code>2xl</code>, <code>3xl</code>, <code>4xl</code>) matching modern iOS squircle aesthetics.</li>
    <li><strong>Dynamic Background Canvas:</strong> An ambient radial spotlight coupled with an HTML5 canvas dot-grid with subtle breathing opacity animations.</li>
  </ul>

  <h2>4. Core Interactive Functionalities</h2>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">1. Independent 3-Column Desktop Grid</div>
      <p style="font-size: 8.5pt;">
        Desktop displays (<code>lg:grid-cols-[1fr_1.5fr_1fr]</code>) provide three independent, non-chaining scrollers via <code>ScrollColumn.tsx</code>. Each column uses <code>overscroll-contain</code> and top scroll-masking to smoothly fade content as it exits the viewport.
      </p>
    </div>

    <div class="card">
      <div class="card-title">2. Sticky Glass ProfileBar</div>
      <p style="font-size: 8.5pt;">
        Once the hero scrolls past 8px, <code>ProfileBar.tsx</code> seamlessly transitions into view using Framer Motion springs and heavy <code>backdrop-blur-2xl</code>, giving immediate access to Follow, Message, and "Back to Top" triggers.
      </p>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">3. Instagram Story Highlights</div>
      <p style="font-size: 8.5pt;">
        <code>StoryViewer.tsx</code> features 4 circular highlights (About, Stack, Now, Contact). Clicking opens a full-screen mobile story viewer with touch swiping, timed progress bars, pause/resume handlers, and high-res visuals.
      </p>
    </div>

    <div class="card">
      <div class="card-title">4. Live Colombo Time &amp; Status</div>
      <p style="font-size: 8.5pt;">
        <code>AvailabilityCard.tsx</code> calculates live Asia/Colombo time (UTC+05:30) with dynamic contextual status greetings (e.g. "Morning, coffee in hand ☕", "Heads-down building 💻") alongside 1-click CV downloads.
      </p>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">5. App Store-Style Project Detail View</div>
      <p style="font-size: 8.5pt;">
        Dynamic routing at <code>/projects/[slug]</code> mimics the Apple App Store: rounded squircle app icons, developer byline, Action Pill ("OPEN"), metadata pill strip (Category, Platform, Year, Developer, Stats), and device frames.
      </p>
    </div>

    <div class="card">
      <div class="card-title">6. Live GitHub Activity Grid</div>
      <p style="font-size: 8.5pt;">
        <code>GithubContributions.tsx</code> fetches live contribution data for <code>@Senthee1811</code> (234 contributions last year), rendering a weekly calendar with interactive tooltips and smooth horizontal drag-scrolling.
      </p>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">7. Autonomous Tour Cursor</div>
      <p style="font-size: 8.5pt;">
        <code>TourCursor.tsx</code> renders a Figma-style cursor named "Senthee" that glides across key sections (Profile, CTAs, Highlights, Projects, GitHub, Spotify), typing personalized conversational bubbles.
      </p>
    </div>

    <div class="card">
      <div class="card-title">8. Circular Reveal Theme Switcher</div>
      <p style="font-size: 8.5pt;">
        <code>FloatingThemeToggle.tsx</code> uses the cutting-edge View Transitions API to create an expanding circular clip-path wipe originating from the toggle button, with hydration mismatch protection.
      </p>
    </div>
  </div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <h2>5. Projects Showcase Data Engine</h2>
  <p>
    All projects in <code>components/projects/projectsData.ts</code> are populated with Sentheepan's real work, live URLs, and assets:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 22%;">Project</th>
        <th style="width: 20%;">Tags &amp; Stack</th>
        <th style="width: 38%;">Description &amp; Highlights</th>
        <th style="width: 20%;">Links &amp; Artifacts</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>MatchMyStuff</strong><br /><span class="badge badge-dark">Featured</span></td>
        <td>Next.js, OpenAI API, Convex, TypeScript</td>
        <td>AI lost-and-found matching reports with vector search. Built in 24h at Cursor Buildathon (<strong>3rd Place, Convex Track</strong>).</td>
        <td>Device mockups, video demo, case study stats</td>
      </tr>
      <tr>
        <td><strong>Quick Blog</strong><br /><span class="badge badge-dark">Featured</span></td>
        <td>MERN Stack, Google Gemini AI, Tailwind</td>
        <td>Full-stack CMS with AI writer producing structured articles from user titles. Full CRUD and MongoDB schemas.</td>
        <td><a href="https://quick-blog-flame.vercel.app/">Live Web App</a><br />Real WebP screenshots (desktop + mobile)</td>
      </tr>
      <tr>
        <td><strong>CSE Market Alert Bot</strong><br /><span class="badge badge-dark">Featured</span></td>
        <td>Python, Gemini 2.5 Flash-Lite, Asyncio</td>
        <td>Colombo Stock Exchange intelligence bot aggregating trades and sending AI summaries &amp; breakout alerts over Telegram.</td>
        <td>Dashboard screenshots, alert workflow breakdown</td>
      </tr>
      <tr>
        <td><strong>Emotional Story Assistive System</strong></td>
        <td>Python, Coqui TTS, PyTorch, Docker</td>
        <td>SLIIT final-year research: emotion-adaptive storytelling for impaired children with neural prosody TTS and stutter remediation.</td>
        <td>Microservice architecture write-up</td>
      </tr>
      <tr>
        <td><strong>Studio KFM</strong></td>
        <td>React, Express, Node.js, MongoDB</td>
        <td>Freelance production client platform: photography &amp; video commercial portfolio with role-based content management.</td>
        <td><a href="https://studiokfm.com">studiokfm.com</a><br />Video walkthrough demo</td>
      </tr>
      <tr>
        <td><strong>LMS-SAAS &amp; DeepSeek Clone</strong></td>
        <td>Next.js, React, TypeScript</td>
        <td>Learning management SaaS and streaming conversational AI interface cloning DeepSeek.</td>
        <td>GitHub open-source repositories</td>
      </tr>
    </tbody>
  </table>

  <h2>6. Quality Assurance &amp; Verification</h2>
  <ul>
    <li><strong>Zero-Warning Production Compilation:</strong> <code>npm run build</code> successfully validates all TypeScript types, static generation parameters, and server routes in 2.2s.</li>
    <li><strong>Asset Optimization:</strong> Live Playwright captures from <code>https://quick-blog-flame.vercel.app/</code> converted to WebP formats, reducing bundle payload by &gt;70%.</li>
    <li><strong>Hydration Consistency:</strong> SSR and client-side attribute parity across View Transition toggles and locale timestamps.</li>
    <li><strong>Cross-Device Responsiveness:</strong> Smooth fallback from 3-column desktop layout to vertical mobile stream on iOS/Android viewports.</li>
  </ul>

  <div style="margin-top: 30px; padding-top: 12px; border-top: 1px solid #e4e4e7; font-size: 8.5pt; color: #71717a; display: flex; justify-content: space-between;">
    <span>Sentheepan Ellankovan Portfolio &copy; 2026</span>
    <span>Repository: github.com/Senthee1811/My-Portfolio---Revamped</span>
  </div>

</body>
</html>`;

async function generatePDF() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  
  const outputPath = path.resolve('d:/portfolio-new/docs/Portfolio_Architecture_and_Functionalities.pdf');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '14mm',
      left: '14mm',
      right: '14mm',
    },
  });

  console.log('PDF successfully generated at:', outputPath);
  await browser.close();
}

generatePDF().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
