# Basic64 School — Learn Commodore 64 BASIC

An interactive browser-based learning platform for Commodore 64 BASIC programming, built with Next.js and a built-in C64 emulator.

## Features

- **71 Lessons** across 7 levels (Welcome → Game Dev)
- **Interactive Emulator** — write and run real C64 BASIC code in your browser
- **Try-It Exercises** — code along with inline emulator demos
- **CRT Retro Styling** — authentic C64 color palette, scanlines, pixel fonts
- **Multiple Tracks** — Games, Creative Coding, Systems & Tools

## Running Locally

```bash
cd nextjs-app
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
nextjs-app/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Sidebar
│   ├── page.tsx            # Home page
│   ├── globals.css         # C64 retro theme
│   ├── lessons/[slug]/     # Lesson pages (71 dynamic routes)
│   ├── syllabus/           # Curriculum overview
│   ├── game/               # Game demos
│   └── about/              # About page
├── components/
│   ├── design/             # C64Logo, SpriteGrid
│   ├── icons/              # Inline SVG icon components
│   ├── lesson/             # Lesson renderer, exercise, navigation
│   ├── navigation/         # Sidebar
│   ├── ui/                 # Button, Modal, Toast, ProgressBar, Badge
│   └── emulator/           # C64 emulator core components
├── emulator/lib/           # C64 emulator core (memory, PETSCII, VIC-II, SID, BASIC parser)
├── lib/                    # Lesson index, curriculum
├── types/                  # TypeScript interfaces
├── data/lessons/           # 71 Markdown lesson files
└── public/                 # Static assets (C64 logo, fonts, icons)
```

## C64 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#726CC0` | Main body |
| Screen White | `#E3DAF0` | Text on screen |
| Light Gray | `#D6CDE4` | Screen background |
| Purple | `#562841` | Borders |
| Dark Gray | `#383838` | Dark elements |
| Light Blue | `#A8A8FE` | Highlights |

## Learning Tracks

### 🎮 Game Development Track
Classes 3-6: Sprites, sound, state machines, scoring, full game capstone.

### 🎨 Creative Coding Track
Classes 0-2, 5: Memory exploration, PETSCII art, text effects, demoscene patterns.

### 🛠️ Systems & Tools Track
Classes 0-4: POKE/PEEK, color RAM, SID sound engine, joystick input, timing.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + global C64 theme
- **Fonts**: Press Start 2P (headers), VT323 (body/code)
- **Emulator**: Custom C64 emulator (memory, VIC-II, SID, PETSCII, BASIC parser)
- **Content**: Markdown lessons with frontmatter, rendered with Unified/Remark/Rehype

## License

MIT © 2026 Basic64 School
