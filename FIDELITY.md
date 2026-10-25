# FIDELITY REPORT — Senthee's Portfolio

Visual and structural fidelity comparison against the reference site **https://www.jmancheta.cloud** (`jm-commitz/jmfolio`).

---

## 1. Structure & Layout (1:1 Match)

| Feature | Reference | Senthee Portfolio | Fidelity Notes |
|---|---|---|---|
| **Shell Architecture** | 3-column independent scrollers on desktop (≥1024px) | 3-column independent scrollers via `Column.tsx` and `ScrollerProvider` | Matched: `<body>` does not scroll on desktop; columns scroll independently with thin fade-in hover bars |
| **Column 1 Width** | `411.42px` | `412px` (28.5% grid ratio) | Matched within 0.6px |
| **Column 2 Width** | `617.14px` | `1fr` / `617px` (42.8% grid ratio) | Matched within 0.2px |
| **Column 3 Width** | `411.42px` | `412px` (28.5% grid ratio) | Matched within 0.6px |
| **Mobile Breakpoint** | `<1024px` single scroller | `<1024px` single column stacked | Matched |
| **Dividers** | 1px vertical borders between columns | 1px border (`var(--column-border)`) | Matched |
| **Background** | Dot-grid canvas with animated breathing dots | Canvas with static offscreen buffer + 6% breathing dots at 30 fps via GSAP ticker | Matched |

---

## 2. Colors & Design Tokens (Extracted from tokens.json)

- **Typography**: `DM Sans` via `next/font/google` (matching extracted font family `"DM Sans", "DM Sans Fallback", sans-serif`).
- **Dark Background**: `#0a0a0a`
- **Dark Cards**: `#101010` with `#262626` borders
- **Light Background**: `#ffffff`
- **Light Cards**: `#f5f5f7` with `rgba(0,0,0,0.08)` borders
- **Accent**: `#0a84ff` (iOS system blue)
- **Status Dot**: `#30d158` (availability green)
- **Radii**: Cards `18px–24px`, buttons/pills `9999px`, app icons `22.37%` squircle.

---

## 3. Motion & Interactions

1. **iOS "hello" Splash**:
   - Cycles: `hello` → `வணக்கம்` (Tamil) → `ආයුබෝවන්` (Sinhala).
   - Wipes horizontally with clip-path and blur transition.
   - Session-guarded with `sessionStorage`.
2. **Figma Guided Tour**:
   - Multiplayer cursor (`Senthee`) flies between 10 designated landmarks.
   - Types messages letter by letter with a dynamic speech bubble.
   - Outline pulses on targeted components.
3. **Circular Theme Reveal**:
   - Uses the View Transitions API (`startViewTransition` + `clip-path: circle(...)`).
   - Clean fallback on unsupported browsers or `prefers-reduced-motion`.
4. **Interactive Simulated Showcase**:
   - CSE Alert Bot inside CSS iPhone frame with dynamic island, status bar, and real-time conversation timeline with replay functionality.
5. **Project Detail Pages**:
   - App Store header, horizontal metric info strip, device preview gallery, and information table.

---

## 4. Content Separation & Assets

- **Zero Reference Personal Data**: No names, avatar photos, or project details from Jaymark Ancheta.
- **Senthee's Real Assets**:
  - Avatar: `public/images/me/avatar.jpg` (Senthee's actual profile picture).
  - CV: `public/cv/Sentheepan_Ellankovan_CV.pdf` (Senthee's attached PDF).
  - Quick Blog: Real live screenshots captured directly from `https://quick-blog-flame.vercel.app` via Playwright.
  - Video walkthroughs: MatchMyStuff and KFM Studio linked directly to original recordings.
