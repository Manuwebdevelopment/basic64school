# Level 2 — Screen & PETSCII: Your C64 Canvas

## Metadata

| Field | Value |
|--|--|
| **Level** | 2 |
| **Estimated Time** | ~2 hours total |
| **Prerequisites** | Level 1 (Variables, FOR/NEXT, IF/THEN, Strings) |

## Introduction

Welcome to Level 2 — where your C64 program comes alive with **color and graphics**! 🎨

Up until now, your programs have written text line by line — neat, but limited. In Level 2, you'll flip the script. Instead of asking the C64 to draw letters for you, you'll reach directly into memory and **draw every character yourself**. You'll learn what Screen RAM and Color RAM are, how to POKE characters and colors to any position on the 40×25 grid, and discover the hidden PETSCII graphics characters — box drawings, arrows, hearts, stars, and block figures that turn your screen into a canvas.

By the end of this level, you'll be able to build complete text-based menus, status bars, and even a full game with a dungeon map, colored rooms, and animated borders. These are the same techniques used by C64 game programmers in the 1980s.

## What You Will Learn

| Lesson | Topic | What You Will Build |
|-----|-----|--|
| 2.1 | Memory Map Intro | Understand Screen RAM ($0400), Color RAM ($0680), and the VIC-II chip |
| 2.2 | POKE the Screen | Write characters directly to any screen position — like pixel art, but one character at a time |
| 2.3 | Color RAM | Paint every character with any of 16 colors — borders, backdrops, and per-character coloring |
| 2.4 | PETSCII Codes | Master the full PETSCII character set: upper/lower case, box drawing, arrows, hearts, stars, and blocks |
| 2.5 | Text UI Patterns | Build menus, status bars, progress bars, selection highlights, and blinking cursors |
| 2.6 | Capstone — Screen Master | Combine everything into a complete dungeon text-adventure game! |

## The C64 Memory Map: Your Screen's Hidden Address

Before we start drawing, let's peek behind the curtain. Here is the part of C64 memory that controls **everything you see on screen**:

```
┌─────────────────────────────────────────────────┐
│       C64 SCREEN MEMORY MAP (Simplified)        │
├─────────────────────────────────────────────────┤
│                                                  │
│   $A000 ───────────────  Character ROM           │
│                     PETSCII font data (128       │
│                  character × 8-byte patterns)    │
│                                                  │
│   $C000 ───────────────  BASIC ROM               │
│                      (BASIC interpreter)         │
│                                                  │
│   $E000 ───────────────  Kernal ROM              │
│                   (Operating system)             │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │  $0400 ────  Screen RAM                  │   │
│   │  1000 bytes  40 cols × 25 rows           │   │
│   │              Each byte = 1 character code  │   │
│   └──────────────────────────────────────────┘   │
│                                                  │
│   $0680 ───────────────  Color RAM               │
│                      640 bytes (one per screen    │
│                         char position + extras)    │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │  $D020 ────  VIC-II Registers            │   │
│   │  53280     Border color (1 color)         │   │
│   │  53281     Backdrop color                 │   │
│   └──────────────────────────────────────────┘   │
│                                                  │
│   0–38,911         Total C64 RAM                │
│                                                  │
└─────────────────────────────────────────────────┘
```

### How the Pieces Fit Together

```
You write to memory:                VIC-II reads:
┌─────────────┐    POKE     ┌───────────────┐
│ Screen RAM  │ ─────────→ │ Character ROM  │
│ ($0400)     │  char code │ ($A000)        │
│ "A" = 65    │ ─────────→ │ draws pixel    │
└─────────────┘             │    pattern     │
                            └────────────────┘
┌─────────────┐    POKE     ┌───────────────┐
│ Color RAM   │ ─────────→ │ color lookup   │
│ ($0680)     │  color #   │      → TV      │
│ yellow = 7  │ ─────────→ │                │
└─────────────┘             └────────────────┘
```

Every character on the screen is controlled by two pieces of memory working together:

1. **Screen RAM ($0400)** — tells the VIC-II *which character code* to display at each position (like choosing a letter tile)
2. **Color RAM ($0680)** — tells the VIC-II *what color* to paint that character (like choosing a paint color)

The VIC-II chip is the C64's graphics processor. It reads both memories simultaneously every frame and paints the result on your TV or monitor — all in a fraction of a millisecond. You just POKE the data, the VIC-II does the drawing.

### Screen Position Formula

To write to any character on the screen, use this formula:

```
Screen RAM address = 1024 + (row × 40) + column
Color RAM address = 1664 + (row × 40) + column
```

Where:
- **row** goes from 0 (top) to 24 (bottom)
- **column** goes from 0 (left) to 39 (right)
- **row × 40** converts the row number into a horizontal offset
- **Screen RAM starts at 1024** ($0400 in hex)
- **Color RAM starts at 1664** ($0680 in hex)

**Example:** Row 5, column 10 → `POKE 1024 + 5×40 + 10, <char code>` and `POKE 1664 + 5×40 + 10, <color code>`

The VIC-II chip reads Screen RAM and Color RAM together like this:

```
Row 0 (top row, 40 characters):
  Position 0 : Screen RAM $0400 + Color RAM $0680
  Position 1 : Screen RAM $0401 + Color RAM $0681
  Position 2 : Screen RAM $0402 + Color RAM $0682
  ... (40 positions total)

Row 1:
  Position 0 : Screen RAM $0428 + Color RAM $06A8
  Position 1 : Screen RAM $0429 + Color RAM $06A9
  ... (40 positions total)

... (25 rows total)

Row 24 (bottom row, 40 characters):
  Position 39 (bottom-right corner):
    Screen RAM $07E7 + Color RAM $09E7
```

## What You Will Be Able To Do After This Level

After completing Level 2, you'll be able to:

- **Write any character to any screen position** — no more waiting for PRINT to scroll text down
- **Paint every character a different color** — each character gets its own color byte
- **Draw boxes, arrows, hearts, stars, and block characters** — the full PETSCII graphics toolkit
- **Build user interfaces** — menus, progress bars, status bars, selection highlights
- **Create a complete text-based game** — combining screen drawing, coloring, PETSCII art, and game logic
- **Understand how the C64 produces what you see on screen** — the full memory-to-TV pipeline

## Level 2 at a Glance

- **Memory Map Intro** → Where Screen RAM and Color RAM live in C64 memory, and how the VIC-II chip reads them
- **POKE the Screen** → Writing character codes directly to Screen RAM — the hacker way to draw on screen
- **Color RAM** → Painting every character with 16 colors, plus border and backdrop colors
- **PETSCII Codes** → The C64's character set: upper/lower case, box drawing, arrows, hearts, stars, and blocks
- **Text UI Patterns** → Building real user interfaces — menus, progress bars, status bars, and cursors
- **Capstone — Screen Master** → A complete dungeon text-adventure combining all concepts from this level

## C64 BASIC Rules for This Level

- All C64 BASIC commands use **uppercase** (as they were typed on the original C64)
- Line numbers are multiples of **10** for easy editing
- The `=` sign is used for **both assignment and comparison**
- String variables end with `$` (like `NAME$`)
- Numeric variables have no suffix (called `SCORE`)
- `CHR$(147)` clears the C64 screen
- `POKE address, value` writes a value to a memory address
- The screen is **40 characters wide × 25 rows tall** = 1000 character positions
- Each character position has a paired color byte in the next memory zone

## Let's Begin!

You are about to learn the secret techniques that turned the C64 from a typewriter into a game machine. Every C64 game, demo, and piece of PETSCII art you've ever seen was built using the concepts in this level. 

Grab your favorite C64 emulator, and let's start! 🖥️

See you in **Lesson 2.1 — Welcome to the Memory Map**! 🗺️
