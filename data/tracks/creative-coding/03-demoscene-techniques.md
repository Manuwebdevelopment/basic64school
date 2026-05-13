# 03 — Demoscene Techniques

## Metadata
- **Track:** Creative Coding
- **Lesson Number:** 3
- **Estimated Time:** ~35 min
- **Prerequisites:** Lessons creative/01 (Text Art), creative/02 (Generative Patterns)
- **Concepts:** Scrolling, color cycling, animated backgrounds, sprite-animated intro, demoscene effects

## Theory

The demoscene is a computer art subculture where creators push hardware to its limits to produce real-time audio-visual demos. The C64 demoscene was legendary in the late 1980s.

On the C64, "demoscene effects" are built using:
- **Screen scrolling** — Changing the screen base address each frame
- **Color cycling** — Shift through the 16-color palette in sequence
- **Sprite animation** — Change sprite data frames each cycle
- **Starfield** — Random dots that move down at different speeds (parallax)

### Scrolling the C64 Screen

The C64 can scroll text one character at a time using the screen base address:
- $03EC (decimal 1004): low byte of screen address
- $03ED (decimal 1005): high byte of screen address

### Color Cycling

The C64 has 16 colors. You can cycle them by changing $D020-$D024 (border and background) sequentially.

## Key Takeaway

> Scroll using screen base address $03EC/$03ED, cycle colors by stepping through POKE $D020-$D024, and animate sprites using READ/DATA sprite data blocks for frame-by-frame changes.

## C64 BASIC Examples

### Vertical Scrolling Text

| Code | Description |
|------|------|
| `POKE 1004, PEEK(1004) + 1` | Increment low byte (scroll one row down) |
| `IF PEEK(1004) = 0 THEN POKE 1005, PEEK(1005) + 1` | Carry over to high byte |
| `POKE 1024, 32` | Fill the emptied row with spaces |

### Color Cycling

| Code | Description |
|------|------|
| `COLS = 15:POKE $D020,PEEK(56001):POKE $D020,COLS` | Start cycling |
| `COLS = (COLS + 1) MOD 16` | Advance through all 16 colors |
| `POKE $D021, COLS:POKE $D022, (COLS+4) MOD 16:POKE $D023, (COLS+8) MOD 16` | Cycle borders and backgrounds |

### Animated Sprite Intro

| Code | Description |
|------|------|
| `FOR A=0 TO 8:READ S:POKE $4000+A,S:NEXT` | Load one sprite frame |
| `FOR I=1 TO 3:NEXT` | Delay for animation speed |
| `FOR A=0 TO 8:READ S:POKE $4000+A,S:NEXT` | Load next frame (overwrites) |

## Exercise

1. **Step 1:** Create a scrolling text effect
   - Use $03EC/$03ED to scroll the screen 1 row per frame
   - Expected output: Text streams up smoothly on screen

2. **Step 2:** Create color cycling
   - Cycle border and background colors through all 16
   - Expected output: Color waves across the screen

3. **Step 3:** Create a simple animated intro
   - Use sprite frames from READ/DATA
   - Expected output: An animated C64-style logo appears on boot

4. **Step 4:** Combine all effects into a demo
   - Scrolling text → color cycling → sprite animation → final message
   - Expected output: A complete demoscene-style intro sequence

## Practice Challenge

> **Challenge:** Build a full demoscene intro: scrolling credits text, a color-cycling background, animated sprite logo, and a final "C64 DEMO — 2026" message with sound.
> **Hint:** Use FOR loops to sequence the effects. Store credits text in DATA blocks. Use color cycling as a transition between effects.
>
> **Bonus:** Add a starfield background scrolling at different speeds (parallax) using sprite data as tiny dots.

## Quiz

1. **Which address controls C64 screen scrolling?**
   a) $D000
   b) $03EC/$03ED
   c) $D015
   d) $0400
   **Answer:** b
   **Explanation:** $03EC (low byte) and $03ED (high byte) are the screen base address pointers.

2. **How does color cycling work on the C64?**
   a) Changing $D020-$D024 through all 16 colors in sequence
   b) Using the sprite enable register
   c) Reading/writing screen memory
   d) It's not possible on the C64
   **Answer:** a
   **Explanation:** The C64 has 16 colors (0-15). POKE to $D020-$D024 cycles through them.

3. **What is a demoscene?**
   a) A science fair
   b) A computer art subculture creating real-time audio-visual demos
   c) A game developer's conference
   d) A hardware testing tool
   **Answer:** b
   **Explanation:** The demoscene is an art form where creators push computers to their limits for real-time audio-visual productions.

## Summary

- Use $03EC/$03ED to scroll the screen address
- Color cycling steps through all 16 palette colors
- Sprite data blocks define frames for animation
- Combining scrolling, colors, and sprites creates demoscene-style effects

## What's Next?

Even demoscene effects run slowly on a C64. Learn optimization techniques to make them run smoothly.
