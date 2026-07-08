# Pixel Art RPG Portfolio — Next.js Handoff

Retro pixel-art / RPG-game portfolio for **Karima Ed Dahhak** (cybersecurity engineering student @ UEMF).
This package is a faithful Next.js refactor of the approved HTML design prototype (Pixel Portfolio.dc.html).

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export -> ./out (deploy to any static host)
```

## Tech stack

- **Framework:** Next.js 14+ (App Router), static export (`output: "export"`)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + CSS variables for theming (`--bg/--ink/--card/--sub/--dot`)
- **Animation:** CSS sprite-sheet keyframes (`steps()`) for the character; requestAnimationFrame game loop for overworld movement; Framer Motion only for page fade-ins
- **Fonts:** Press Start 2P + Inter via `next/font/google` (self-hosted at build, zero layout shift)
- **State:** React Context (`app/providers.tsx`) — language, dark mode, SFX mute; persisted to localStorage (`kd_lang`, `kd_dark`, `kd_mute`, `kd_intro`)
- **i18n:** `lib/translations.ts` — full EN/FR dictionary, no hardcoded copy in components; instant switch, no reload
- **Dark mode:** `[data-theme="dark"]` attribute on `<html>` flips CSS variables (Tailwind `darkMode: selector`)
- **Sound:** Web Audio API oscillators (8-bit beeps), no audio assets, no library
- **Character animation:** CSS `background-position` sprite sheet (9×12 grid of 128px frames; rows 0-3 walk, 4-7 slash, 8-11 idle)

## Behaviors ported from the prototype

- First-visit LOADING screen (skippable, confetti burst, remembered via `kd_intro`; "REPLAY INTRO" in navigate menu resets it)
- Overworld: WASD/arrow movement, click-to-walk (empty ground = walk + idle; folder = walk → fade → brief loading → route)
- Walk-over-folder navigation with hitboxes slightly larger than the sprite
- K = attack animation · Konami code (↑↑↓↓←→←→BA) = fanfare + pixel confetti
- Contact: character reacts to social-icon hover (turns right + speech bubble per network) and click (attack + "SEE YOU THERE!")
- About: RPG typewriter effect on CURRENT QUEST
- Quest Log hub → six self-contained section pages with BACK buttons

## File tree

```
app/
├─ page.tsx                Overworld (character + 3 folders + game loop)
├─ layout.tsx              Fonts, metadata, <Providers>
├─ loading.tsx             Route-transition loading bar
├─ providers.tsx           Language/theme/SFX context
├─ about/page.tsx          Player profile card
├─ contact/page.tsx        Character + socials
├─ portfolio/
│  ├─ page.tsx             Quest Log menu
│  ├─ projects/page.tsx
│  ├─ internships/page.tsx
│  ├─ ctf/page.tsx
│  ├─ hackathons/page.tsx
│  ├─ certificates/page.tsx
│  └─ htb/page.tsx
└─ components/
   ├─ Character.tsx        Sprite sheet renderer (anim/dir/scale props)
   ├─ SpeechBubble.tsx     Pixel bubble + triangle pointer
   ├─ PixelButton.tsx      Base button/link (pill, active, small variants)
   ├─ BackButton.tsx
   ├─ NavigateButton.tsx   Purple dropdown
   ├─ DarkModeToggle.tsx   (+ SfxToggle export)
   ├─ LanguageSwitcher.tsx FR/EN segmented pill
   ├─ TopBar.tsx           Composes the three top-right controls
   ├─ LoadingScreen.tsx    Progress bar (full intro or brief transition)
   ├─ Folder.tsx           Pixel folder PNG + label
   ├─ Tag.tsx
   ├─ ProjectCard.tsx
   ├─ CtfCard.tsx
   ├─ HackathonCard.tsx
   ├─ InternshipCard.tsx   Expandable PROJECTS section
   ├─ CertificateCard.tsx  (+ locked placeholder state)
   ├─ HtbLabCard.tsx
   ├─ SocialIcon.tsx
   ├─ SectionPage.tsx      Shared inner-page scaffold
   └─ PageShell.tsx        Nav + toggles + fade-in
lib/
├─ translations.ts         EN/FR dictionary + external links
└─ utils.ts                cn(), useTypewriter()
types/index.ts             Shared interfaces
styles/globals.css         Theme vars, sprite keyframes, cursor
public/
├─ sprites/character.png   9×12 sprite sheet (128px frames)
├─ folders/                Pixel folder PNGs (blue/pink/unsat-blue)
├─ images/                 Logos, photos, certificates, icons, cursor
├─ CV_ED_DAHHAK_KARIMA_.pdf
└─ Kerberoasting writeup.pdf
```

## Notes / TODO for the developer

- Project screenshots: `ProjectCard`/`InternshipCard` show a "NO IMAGE" placeholder until you pass an `image` prop — drop files in `public/images/` and wire them in the page files.
- HTB labs: `app/portfolio/htb/page.tsx` renders locked placeholders; add real `{ machine, difficulty, tags, writeup }` objects.
- Hackathon Instagram/LinkedIn post URLs: add link buttons in `HackathonCard` when available.
- `next/image` is intentionally NOT used for pixel art (resampling would blur it); plain `<img>` + `image-rendering: pixelated`.
- This code was generated as a design handoff and has not been run through `next build` — expect at most minor type/lint fixes.
