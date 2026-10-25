# MASTER PROMPT — Build Senthee's Portfolio (jmancheta.cloud-style)

> Paste everything below the line into Claude Code / Cursor / your AI builder.
> Attach: `PortfolioInfos.md`, the CV PDF, and 6 reference screenshots (see §1).

---

## 0. ROLE & GOAL

You are a senior front-end engineer and motion designer. Build a production-grade personal portfolio for **Sentheepan Ellankovan ("Senthee")** that reproduces the **layout, structure, interaction model and visual aesthetic** of the reference site **https://www.jmancheta.cloud** (open-source repo referenced on the site: `github.com/jm-commitz/jmfolio`) as closely as possible, with **Senthee's own content**.

Fidelity rules:
- Match the reference's **geometry** (column widths, paddings, radii, type scale, spacing rhythm), **section order**, **component shapes**, **motion timing and easing**, and **light/dark theming** to within ±2px / ±50ms wherever it can be measured.
- Do **not** copy the reference's personal content: no "Jaymark Ancheta" text, no photos, GIFs, icons, case-study copy, project names or certificate files. Use only the content in `PortfolioInfos.md`. Structure and aesthetic are replicated; content and assets are Senthee's.
- Do not invent facts or metrics. Anything missing in `PortfolioInfos.md` stays a visible `TODO` in a `TODO.md` report at the end. Never fabricate URLs.
- Do not ask me questions; use the defaults here and list open items at the end.

## 1. INPUTS & REFERENCE CAPTURE (do this first)

1. Read `PortfolioInfos.md` fully — it is the only content source.
2. I will attach screenshots of the reference: home (desktop 1440×900, light + dark), home (mobile 390×844, light + dark), one project page (desktop), splash screen. If any are missing, capture them yourself with Playwright (script below).
3. **Extract real design tokens from the reference** instead of guessing. Create `scripts/extract-reference-styles.ts`:

```ts
import { chromium } from "playwright";
import fs from "node:fs";

const URL = "https://www.jmancheta.cloud/";
const browser = await chromium.launch();
const out: Record<string, unknown> = {};

for (const scheme of ["light", "dark"] as const) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(6000); // let splash + tour settle; press Escape / click "Skip" if present
  await page.keyboard.press("Escape");

  out[scheme] = await page.evaluate(() => {
    const pick = (el: Element | null) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName, cls: (el as HTMLElement).className?.toString().slice(0, 140),
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        color: s.color, bg: s.backgroundColor, border: s.border, radius: s.borderRadius,
        font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight,
        ls: s.letterSpacing, pad: s.padding, gap: s.gap, shadow: s.boxShadow,
      };
    };
    const q = (sel: string) => pick(document.querySelector(sel));
    return {
      body: q("body"), h1: q("h1"), h2: q("h2"), h3: q("h3"), p: q("p"),
      button: q("a[href*='github.com'], button"),
      img: q("img"), section: q("section"),
      // every element that scrolls on its own = the "columns"
      scrollers: [...document.querySelectorAll("*")]
        .filter((e) => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight; })
        .map(pick),
      cssVars: Object.fromEntries(
        [...document.styleSheets].flatMap((sh) => { try { return [...sh.cssRules]; } catch { return []; } })
          .filter((r): r is CSSStyleRule => (r as CSSStyleRule).selectorText === ":root" || (r as CSSStyleRule).selectorText === ".dark")
          .flatMap((r) => [...r.style].filter((p) => p.startsWith("--")).map((p) => [p, r.style.getPropertyValue(p).trim()]))
      ),
    };
  });

  await page.screenshot({ path: `reference/home-${scheme}-1440.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `reference/home-${scheme}-390.png`, fullPage: true });
  await ctx.close();
}
fs.mkdirSync("reference", { recursive: true });
fs.writeFileSync("reference/tokens.json", JSON.stringify(out, null, 2));
await browser.close();
```

   Run: `npm i -D playwright tsx && npx playwright install chromium && mkdir -p reference && npx tsx scripts/extract-reference-styles.ts`.
   Then generate `lib/design-tokens.ts` and the Tailwind theme **from `reference/tokens.json`** (colors, fonts, radii, shadows, column widths). Use the fallback values in §3 only where the extraction returns nothing.

## 2. TECH STACK (fixed)

- **Next.js** (latest stable, App Router, static generation by default) + **TypeScript** (`strict: true`)
- **Tailwind CSS** (v4, tokens via `@theme` / CSS variables; class-based dark mode via `next-themes`)
- **GSAP** (`gsap` + `@gsap/react` `useGSAP`) with **ScrollTrigger**, **TextPlugin**, **SplitText**, **Flip** — all included in the free package. **No Framer Motion.** Every animation is GSAP.
- `embla-carousel-react` for the Featured carousel (GSAP drives the entrance, Embla drives drag)
- `lucide-react` for UI icons; tech logos as local SVGs in `public/images/techstack/`
- Optional (feature-flagged, default OFF): Supabase realtime viewer count, Spotify now-playing
- GitHub contribution graph: GitHub GraphQL API from a server route, `revalidate = 3600`
- Deploy target: Vercel

```bash
npx create-next-app@latest senthee-portfolio --ts --tailwind --app --eslint --src-dir --import-alias "@/*"
npm i gsap @gsap/react next-themes embla-carousel-react lucide-react clsx
npm i -D playwright tsx
```

## 3. DESIGN SYSTEM (fallback defaults — override with `reference/tokens.json`)

Aesthetic: **iOS / Instagram / App Store**. Calm, high-polish, product-like; lots of white space; soft rounded cards; subtle borders instead of heavy shadows; an animated dot-grid behind everything.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#ffffff` | `#000000` |
| `--surface` | `#f5f5f7` | `#111113` |
| `--surface-2` | `#ededf0` | `#1c1c1f` |
| `--border` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.10)` |
| `--text` | `#0b0b0c` | `#f5f5f7` |
| `--muted` | `#6e6e73` | `#a1a1a6` |
| `--accent` | `#0a84ff` (iOS blue) | `#0a84ff` |
| `--success` (availability dot) | `#30d158` | `#30d158` |

- Font: system UI stack that renders as SF Pro on Apple devices, with `Inter` (via `next/font`) as the cross-platform fallback. Tight tracking on headings (`-0.02em`), tabular numerals for the clock and stats.
- Type scale: name 28–32/700, section title (`Experience`, `Projects`) 20/700, body 15/400, caption 12–13/500 muted.
- Radii: cards `20–24px`, buttons/pills `9999px`, app icons `22.37%` squircle, avatar circle with a 2px ring.
- Buttons: "Follow" = filled accent pill; "Message" = `--surface` pill with border; hover = 4% darken + 1px lift (GSAP `quickTo`).
- Motion defaults: `ease: "power3.out"`, entrance `0.6s`, stagger `0.06s`; hover `0.2s`. Everything respects `prefers-reduced-motion` (skip splash/tour/typing, show final state).

## 4. LAYOUT & STRUCTURE (match the reference)

**Desktop (≥1024px): a three-column app shell. The `<body>` never scrolls.** Each column is its own full-height scroller (`h-dvh overflow-y-auto overscroll-contain`) so the wheel only moves the column under the pointer. Hide scrollbars (thin, fades in on hover).

- **Column 1 — Profile (Instagram-header style):** avatar + live status ring · name · role · tagline · `Follow` (→ GitHub) and `Message` (→ WhatsApp) buttons · **Story highlights** row (`About`, `Stack`, `Now`, `Contact`) · **Experience** list (with "Now" badge, `See all (n)`) · **Achievements** cards · **Availability card** ("Open to freelance projects", live **Colombo time** clock, "Usually replies within a day", `Download CV` + WhatsApp buttons).
- **Column 2 — Work:** **Featured `1/n`** carousel (award/achievement cards + featured projects) · **Projects** header with count and filter chips (`All`, `Web`, `AI`, `Backend`…) · project cards (icon, name, tag chips, 3-line description) · `View more (n)`.
- **Column 3 — Proof:** **GitHub** contributions graph (`N contributions in the last year`) · **Tools & Technologies** (total count, grouped: Languages, Frontend, Backend & Data, DevOps & Tools, AI — logo + label chips).
- **Fixed bottom bar:** "Hide quick actions" toggle + a quick-actions pill (Download CV · GitHub · LinkedIn · Email). (Spotify "Play my playlist" is present in the reference; build it only if `NEXT_PUBLIC_SPOTIFY=on`.)
- **Mobile (<1024px):** single column in the same order (profile → highlights → experience → achievements → availability → featured → projects → GitHub → tools); the page itself scrolls; bottom quick-actions bar stays.

Exact column widths, gaps and paddings come from `reference/tokens.json` → `scrollers[].rect`. Fallback: `grid-cols-[minmax(320px,1fr)_minmax(420px,1.3fr)_minmax(320px,1fr)]`, `gap-0` with 1px vertical dividers.

**Background:** full-viewport dot grid on a canvas behind all columns (see §6.3).

## 5. CONTENT MAP (from `PortfolioInfos.md`)

- Name/role/tagline/avatar → §1 of the info file. Avatar from `https://github.com/Senthee1811.png?size=352` via `next/image` (add `avatars.githubusercontent.com` + `github.com` to `images.remotePatterns`).
- Highlights: `About` (bio), `Stack` (grouped skills), `Now` ("Open to junior software engineering roles and freelance work · building AI-integrated full-stack apps"), `Contact` (email, LinkedIn, GitHub). Cover images: generate simple branded gradient tiles — do not reuse the reference images.
- Experience: Print Care (Apr–Oct 2025), KFM Studio (Jan–Mar 2026).
- Achievements: Convex Track 3rd place (Cursor 24-Hour Buildathon), AWS Academy certification.
- Featured: MatchMyStuff, Emotional Story Assistive System, CSE Bot, Quick Blog (+ the buildathon award card).
- Projects: all projects in §4 of the info file, `Quick Blog` and `CSE Bot` flagged as having media.
- Tools: exactly the groups in §5 of the info file; show count badge.
- Typed data lives in `src/data/*.ts` (`profile.ts`, `experience.ts`, `projects.ts`, `tools.ts`) — components never hard-code content.

`projects.ts` type:

```ts
export type Project = {
  slug: string; name: string; subtitle: string; tags: string[];
  summary: string; problem: string; whatsIncluded: string[];
  underTheHood: { title: string; body: string }[];
  stats?: { value: string; label: string }[];      // ONLY facts from the CV
  info: { category: string; platform: string; year: string; role: string; stack: string[] };
  links: { github?: string; live?: string };
  icon: string; screenshots?: string[];            // /images/projects/<slug>/1.png ...
  showcase?: "telegram-sim" | "screenshots";
  status?: "Live" | "Open" | "Soon";
};
```

## 6. ANIMATION SPEC (GSAP — replicate the reference's feel)

Register once in `src/lib/gsap.ts`: `gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText, Flip, useGSAP)`; call `ScrollTrigger.config({ ignoreMobileResize: true })`.

**Critical — nested scrollers:** because each desktop column scrolls independently, every ScrollTrigger must pass `scroller: columnEl` (desktop) or `window` (mobile). Build a `ScrollerContext` + `useScroller()` hook that returns the active scroller; call `ScrollTrigger.refresh()` after fonts/images load and on breakpoint change. Never use `ScrollSmoother` here.

### 6.1 iOS-style splash ("hello")
Full-screen overlay, centered handwritten-style greeting that cycles **hello → வணக்கம் → ආයුබෝවන්** (like the iOS setup screen). Each word: clip-path wipe left→right (`inset(0 100% 0 0)` → `inset(0)`, 0.9s, `power2.inOut`) with a 4px→0 blur, hold 0.35s, cross-fade to the next. After the last word: scale to 1.08 + fade out (0.5s) and reveal the app shell; then hand off to the tour (§6.2). Plays once per session (`sessionStorage`, wrapped in try/catch). Reduced motion → skip.

### 6.2 Figma-style guided cursor tour
A fake multiplayer cursor (arrow + name tag "Senthee") flies between **~10 stops**: avatar → highlights → experience → achievements → availability → featured → projects → GitHub → tools → quick actions. For each stop: `gsap.to(cursor, { x, y, duration: 0.9, ease: "power3.inOut" })` toward the target's `getBoundingClientRect()` centre, scroll the owning column into view first (`gsap.to(column, { scrollTo })` or `scrollIntoView`), pulse a 2px accent outline on the target, then a **speech bubble types its message letter by letter** (`gsap` timeline stepping a `{ i }` counter; bubble width = measured width of typed text + next 2 chars so it always grows just ahead of the caret). Bubble flips left/right and the cursor mirrors when near viewport edges. Controls: `Skip tour` always visible; `Esc` closes; completion stored in `localStorage` (`try/catch`). Auto-starts after the splash on first visit; re-launchable from the quick-actions bar.

### 6.3 Dot-grid canvas background
Draw the static grid once to an offscreen canvas; animate only ~6% of dots (alpha/scale "breathing") at **30 fps** via `gsap.ticker.fps(30)` scoped callback; pause on `visibilitychange: hidden`; stop entirely under reduced motion; re-draw on resize (debounced) and theme change.

### 6.4 Theme switch — circular reveal
Toggle button in the profile header. Use the **View Transitions API**: `document.startViewTransition()`; animate `::view-transition-new(root)` with `clip-path: circle(0 at <button x,y>)` → `circle(<max radius>)` via `element.animate` (0.6s, `ease-in-out`). Fallback: instant switch (no API or reduced motion).

### 6.5 Scroll-triggered entrances
For each card/section: `gsap.from(el, { y: 24, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: el, scroller, start: "top 88%", once: true } })`. Section titles use `SplitText` (words) with a 0.04s stagger. Stat numbers count up (`gsap.to(obj, { val, snap: { val: 1 }, onUpdate })`). Project cards: hover lifts 2px and the icon scales 1.04 (`quickTo`).

### 6.6 Story highlights viewer (Instagram-style)
Click a highlight → full-height story overlay: top segmented progress bars (GSAP `width` tweens, 5s each, auto-advance), tap left/right edges to go back/forward, hold to pause, swipe down / Esc to close. Opening animation uses `Flip` from the highlight circle to the viewer.

### 6.7 Featured carousel
Embla for drag/snap; GSAP animates the active slide (`scale 1`, others `0.96`, `opacity .7`) and the `1/n` counter; autoplay 5s paused on hover/drag.

## 7. PROJECT PAGES — App Store style (`/projects/[slug]`, SSG via `generateStaticParams`)

Top bar: `← Projects` (back to `/#projects`). Then, in this order:
1. **Header:** large squircle icon · title · subtitle · pill button (`Open` for live, `GitHub` otherwise) · share.
2. **Info strip:** horizontal App-Store-style cells — `Category · Platform · Year · Built · Developer` + up to 3 **Stat** cells (only real facts).
3. **Preview:** horizontal snap-scroll gallery of screenshots (or the Telegram simulation, §9), caption `Web · Desktop & Mobile`.
4. **CTA card:** "Want a project like this?" → contact.
5. **What's Included** (bullets) · **The Problem** · **By the Numbers** (only if real stats exist) · **Under the Hood** (numbered highlights) · **Information** table (Developer, Category, Platform, Timeline, Role, Source link, Website link, Stack chips).
6. **More Projects** list with `Open` / `Soon` badges.

Entrance: header scales/fades in; gallery items stagger from the right; sections reveal with §6.5. Per-page metadata (`generateMetadata`) with OG image.

## 8. QUICK BLOG — REAL SCREENSHOTS (plugin: Playwright)

Create `scripts/capture-quickblog.ts` and run it to produce the project's gallery. Source URLs (from `PortfolioInfos.md`): live `https://quick-blog-server-theta.vercel.app`, repo `https://github.com/Senthee1811/QuickBlog`.

```ts
import { chromium, devices } from "playwright";
import fs from "node:fs";

const BASE = process.env.QB_URL ?? "https://quick-blog-server-theta.vercel.app";
const OUT = "public/images/projects/quick-blog";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// Desktop 2x
const d = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await d.newPage();
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/1.png` });                         // home / blog list

const firstPost = page.locator("a[href*='blog']").first();               // adjust selector after inspecting the live UI
if (await firstPost.count()) {
  await firstPost.click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/2.png` });                       // blog detail
}

// Mobile 3x
const m = await browser.newContext({ ...devices["iPhone 14"], deviceScaleFactor: 3 });
const mp = await m.newPage();
await mp.goto(BASE, { waitUntil: "networkidle" });
await mp.waitForTimeout(1200);
await mp.screenshot({ path: `${OUT}/3.png` });

await browser.close();
```

Run: `npx playwright install chromium && npx tsx scripts/capture-quickblog.ts`.
- Admin / AI-generator screens are behind login: run the script with `QB_EMAIL` / `QB_PASSWORD` env vars to sign in first (never commit credentials), or I will drop manual screenshots in as `4.png`, `5.png`.
- Optimize with `sharp` to 1920px wide WebP + PNG fallback; reference them from `projects.ts` (`screenshots: ["/images/projects/quick-blog/1.png", ...]`). If the live site is down, fall back to a GitHub OG image placeholder and add a TODO.
- Frame desktop shots in a minimal browser-chrome mockup and mobile shots in an iPhone frame (pure CSS), consistent with the App Store gallery.

## 9. CSE ALERT BOT — SIMULATED TELEGRAM SHOWCASE

The CSE bot has no public UI, so build `<TelegramSim />` as the project's Preview media and as a Featured-carousel card. It plays like a live demo of the real bot, inside a CSS iPhone frame (rounded 44px bezel, dynamic island, status bar).

**Visuals:** Telegram-style chat — header (back arrow, circular bot avatar, name `CSE Market Bot`, subtitle `bot`), subtle patterned chat background, incoming bubbles left (surface colour) / outgoing right (accent), timestamps, double-check ticks, rounded 18px bubbles with tail, Telegram-like message input bar. Dark/light follows the site theme.

**Scripted conversation** (data in `src/data/telegram-script.ts`, typed `{ from: "user"|"bot"; kind: "text"|"summary"|"alert"; delay: number; ... }[]`):
1. user: `/today` (typed into the input, then sent)
2. bot typing… → **Daily summary card:** header "📊 CSE Daily Summary", rows for **ASPI**, **S&P SL20**, turnover, advancers/decliners, top gainers/losers (3 each), then a 2-sentence **AI summary** (labelled "✨ Gemini 2.5 Flash-Lite") that types out word by word.
3. 3 s later, unprompted: **🚨 Breakout alert** card — ticker, % move, volume vs average, threshold that fired ("price ≥ +5% and volume ≥ 3× avg"), and inline buttons `View details` · `Mute 1h`.
4. user taps `Mute 1h` → bot confirms "🔕 Muted DEMO.N0000 alerts for 1 hour".
5. Loop with a `Replay` button.

**Data honesty:** all tickers/figures are **clearly fictional** (use `DEMO.N0000`, `SAMPLE.N0000`) and the sim shows a persistent small footer "Simulated demo · sample data". The index names (ASPI, S&P SL20) are real, the numbers are not. Do not present them as real market data.

**GSAP implementation:** one master timeline per run. Typing indicator = three dots with staggered `y` bounce (`repeat: -1`); each bubble enters with `{ y: 14, scale: 0.96, opacity: 0 } → 1` over 0.35s; the chat container auto-scrolls with `gsap.to(chat, { scrollTo: "max", duration: 0.4 })`; AI summary uses `TextPlugin`; tapping animates a 0.1s button press. Start via ScrollTrigger (`scroller`, `start: "top 70%"`, `once: false`, pause when out of view), `Replay` calls `tl.restart()`. Reduced motion → render the final conversation statically.

## 10. FILE STRUCTURE

```
src/
  app/ layout.tsx · page.tsx · projects/[slug]/page.tsx · opengraph-image.tsx · api/github/route.ts
  components/
    shell/ AppShell.tsx · Column.tsx · QuickActions.tsx · DotGrid.tsx · ThemeToggle.tsx
    profile/ ProfileHeader.tsx · Highlights.tsx · StoryViewer.tsx · ExperienceList.tsx · Achievements.tsx · AvailabilityCard.tsx · ColomboClock.tsx
    work/ FeaturedCarousel.tsx · ProjectList.tsx · ProjectCard.tsx
    proof/ GithubGraph.tsx · ToolsGrid.tsx
    intro/ Splash.tsx · TourCursor.tsx · TourBubble.tsx · tour-stops.ts
    project/ ProjectHeader.tsx · InfoStrip.tsx · Gallery.tsx · Sections.tsx · MoreProjects.tsx
    media/ PhoneFrame.tsx · BrowserFrame.tsx · TelegramSim.tsx
  data/ profile.ts · experience.ts · projects.ts · tools.ts · telegram-script.ts
  lib/ gsap.ts · scroller-context.tsx · design-tokens.ts · useReducedMotion.ts
public/ images/{projects,techstack,highlights} · cv/
scripts/ extract-reference-styles.ts · capture-quickblog.ts
reference/ (screenshots + tokens.json)
```

## 11. QUALITY BAR

- Lighthouse ≥ 95 (Perf/A11y/SEO/Best Practices) on the home page; homepage statically generated; live data only via client fetch / hourly-revalidated route.
- LCP element = avatar (`priority`); no layout shift from fonts/images (`next/font`, explicit sizes).
- Accessibility: all motion has a reduced-motion path; tour/story/modal are focus-trapped and keyboard-operable; visible focus rings; contrast ≥ 4.5:1 in both themes; icon buttons have `aria-label`.
- No console errors; no hydration warnings (guard `localStorage`, `Date`, `window` access to client effects).
- Clean commits per step; ESLint + `tsc --noEmit` pass.

## 12. FIDELITY LOOP (required before you say "done")

1. Run the app at 1440×900 and 390×844, light and dark. Screenshot with Playwright into `reference/mine-*.png`.
2. Compare against `reference/home-*.png` side by side: column widths, header height, avatar size, card radii, font sizes, spacing between sections, dot-grid density, button sizes. Fix every deviation > 2px.
3. Compare motion: splash length, tour cursor speed, bubble typing cadence, theme-reveal duration, entrance stagger.
4. Write `FIDELITY.md` listing: what matches, what intentionally differs (content/assets), and any element you could not measure.

## 13. DELIVERABLES

- The full Next.js project, runnable with `npm run dev`, deployable on Vercel.
- `public/images/projects/quick-blog/*` real screenshots from the Playwright run.
- `TODO.md` — every placeholder still needing my input (MatchMyStuff GitHub/live links, Final-Year-Project repo link, CSE bot repo link, certificate links, domain, CV PDF path).
- `FIDELITY.md` and a short `README.md` (setup, env vars: `GITHUB_TOKEN`, optional Spotify/Supabase flags).

Begin with §1, then scaffold, then build in this order: tokens → shell/columns → profile column → work column → proof column → splash/tour → project pages → Quick Blog screenshots → Telegram sim → polish & fidelity loop.
