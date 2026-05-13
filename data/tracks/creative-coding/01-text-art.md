# 01 — Text Art

## Metadata
- **Track:** Creative Coding
- **Lesson Number:** 1
- **Estimated Time:** ~30 min
- **Prerequisites:** Level 2 (Screen memory, PETSCII codes)
- **Concepts:** PETSCII characters as pixels, symmetry, character palettes, ASCII art on the C64

## Theory

The C64 screen has 1000 characters (40 × 25). Each character is a tiny "pixel" in a lower-resolution art medium. By choosing the right character code, you can create landscapes, portraits, and geometric patterns.

### The C64 Character Palette

The standard PETSCII charset has some characters that work great for art:

| Character | Code | Art Use | Visual |
|------|------|------|-----|
| Space | 32 | Negative space (background) | ░ |
| Block | 176 | Full cell (dark fill) | █ |
| Horizontal Bar | 196 | Lines | ─ |
| Vertical Bar | 179 | Lines | │ |
| Corner (UR-DL) | 191 | Corners | ┐ |
| Corner (UL-DR) | 193 | Corners | ┌ |
| Box | 177 | Dots | · |
| Diagonal (UL-DR) | 198 | Angle | ╱ |
| Diagonal (UR-DL) | 192 | Angle | ╲ |
| Quarter Block UL | 178 | Shading | ▌ |
| Quarter Block UR | 208 | Shading | ▐ |

### Symmetry Techniques

Symmetry dramatically increases the impact of your art:
1. **Horizontal symmetry** — Left half mirrors the right. Use POKE to write both sides.
2. **Vertical symmetry** — Top half mirrors the bottom
3. **Radial symmetry** — Rotate elements around the center

## Key Takeaway

> Use characters as low-resolution pixels. Symmetry doubles your creative range in half the code.

## C64 BASIC Examples

### Landscape with Symmetry

| Code | Description |
|------|------|
| `FOR X=0 TO 39:POKE 1024+X,176:NEXT` | Fill screen with blocks |
| `FOR X=20 DOWNTO 0:POKE 1024+39-X,32:NEXT` | Cut symmetric holes from right |
| `FOR X=10 TO 30:POKE 1104+X-10,196:NEXT` | Draw horizon line (PETSCII 196) |
| `POKE 1024+18,177:POKE 1024+22,177` | Place dots symmetrically |
| `POKE 1064+10,213:POKE 1064+30,213` | Place mountains corners symmetrically |

### Portrait Silhouette

| Code | Description |
|------|------|
| `FOR A=0 TO 39:POKE 1024+A,A:POKE 1064+A,39-A:NEXT` | Diagonal shading |
| `FOR A=0 TO 24:POKE 1064+A*40+20,179:NEXT` | Face outline (vertical bar) |
| `POKE 1104+20,21:POKE 1105+20,96` | Eyes (PETSCII codes 21 and 96) |
| `POKE 1144+15,198:POKE 1144+25,192` | Mouth corners (diagonal characters) |

## Exercise

1. **Step 1:** Draw a symmetric mountain landscape
   - Use the block character (176) for the mountain
   - Horizontal bars (196) for the base
   - Expected output: Your landscape appears on screen symmetrically

2. **Step 2:** Create a geometric pattern
   - Use quarter-block characters (92, 196, 218) for a decorative pattern
   - Expected output: A repeating geometric design across the screen

3. **Step 3:** Add shading to your landscape
   - Use characters 92, 176, 177, 219 to create gradient shading
   - Expected output: Your landscape has depth with darker/ lighter areas

## Practice Challenge

> **Challenge:** Create a full screen PETSCII artwork of a C64-themed scene — a retro computer, a starry night sky, or a pixel-art portrait — using only characters 93, 176, 177, 178, 192, 196, 198, 199, 200, 201, 207, 208, 209, 210, 211, 213, 216, and 219.
> **Hint:** Use the block character (176) for dark fill, spaces (32) for light areas, and diagonals (198, 192) for edges. Shading uses 176→177→178 progression.

## Quiz

1. **How many "pixels" (characters) are on a C64 screen?**
   a) 250
   b) 500
   c) 1000
   d) 2048
   **Answer:** c
   **Explanation:** The C64 screen is 40 columns × 25 rows = 1000 characters.

2. **Which character is best for creating corners?**
   a) Code 176 (block)
   b) Codes 191, 192, 193, 194 (diagonal corners)
   c) Code 32 (space)
   d) Code 9
   **Answer:** b
   **Explanation:** PETSCII codes 191-194 are corner characters designed for box drawing.

3. **Symmetry doubles your creative range because:**
   a) The C64 runs faster
   b) You only design one half and mirror it
   c) You get twice the characters
   d) You only need half the code
   **Answer:** b
   **Explanation:** Design one half of the art and mirror it with POKE to the opposite side.

## Summary

- Every character on the C64 screen is a "pixel" you can choose
- PETSCII corner characters (191-194) are essential for box art
- Symmetry halves the work while doubling the visual impact
- Shading uses character code progression (176→177→178)

## What's Next?

Now that you can draw with characters, learn to create art automatically with random numbers — generative patterns and fractals!
