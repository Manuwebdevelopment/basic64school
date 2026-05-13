# 02 — Generative Patterns

## Metadata
- **Track:** Creative Coding
- **Lesson Number:** 2
- **Estimated Time:** ~30 min
- **Prerequisites:** Lesson creative/01 (Text Art)
- **Concepts:** Random generation, fractals, probability-based art, RND(), seed-based patterns

## Theory

Generative art on the C64 uses random numbers to create art that is unique every time — but always looks good. The key trick is using random numbers as a tool, not as chaos.

### RND on the C64

- `RANDOMIZE` initializes the random seed
- `INT(RND(1) * N)` gives you a random integer from 0 to N-1
- Use fixed seeds (`RANDOMIZE 12345`) to reproduce the same pattern

### Types of Generated Art

| Type | Technique | Visual Result |
|------|------|-------------|
| Landscape | Random heightmap with smoothing | Mountain ranges, valleys |
| Kaleidoscope | Mirror a random pattern | Symmetrical mandalas |
| Starfield | Random dots with varying density | Cosmic scenes |
| Abstract | Random shapes, lines, and blocks | Expressive art |

## Key Takeaway

> Use RANDOMIZE for seeds, INT(RND(1)*N) for random coordinates, and constrain random values to color palettes for consistent results.

## C64 BASIC Examples

### Random Landscape Generator

| Code | Description |
|------|------|
| `RANDOMIZE:FOR A=0 TO 39:MAP(A)=INT(RND(1)*15)+10:NEXT` | Heightmap: random heights 10-24 |
| `FOR A=0 TO 39:FOR B=A TO 24:POKE 1024+B*40+A,196:NEXT:NEXT` | Draw vertical bars from heightmap |
| `FOR A=0 TO 39:POKE 1024+MAP(A)*40+A,32:NEXT` | Cut out shapes from bars |

### Starfield Generator

| Code | Description |
|------|------|
| `RANDOMIZE:FOR A=1 TO 200:POKE 1024+INT(RND(1)*40)+INT(RND(1)*25)*40,21:1045` | Place 200 stars randomly |
| `GOTO 1045` | Wait (short loop) |

### Kaleidoscope Generator

| Code | Description |
|------|------|
| `FOR X=0 TO 20:FOR Y=0 TO 12:IF INT(RND(1)*3)<2 THEN POKE 1024+X*40+Y,176` | Fill half of one quadrant |
| `NEXT:NEXT` | End fill |
| `FOR X=0 TO 20:FOR Y=0 TO 12:POKE 1024+(39-X)*40+Y,PEEK(1024+X*40+Y):POKE 984-X*40+Y,PEEK(1024+X*40+Y):POKE 1024+X*40+(25-Y),PEEK(1024+X*40+Y):NEXT:NEXT` | Mirror to all 4 quadrants |

## Exercise

1. **Step 1:** Generate a random landscape
   - Create a heightmap array where each column has a different height
   - Fill from the top of each column down to the height using the block character (176)
   - Expected output: A random mountain range appears on screen

2. **Step 2:** Generate a starfield
   - Use INT(RND(1)*40) and INT(RND(1)*25) for star placements
   - Use character 21 (dot) for small stars and 176 (block) for bright ones
   - Expected output: A full-screen starfield with varying brightness

3. **Step 3:** Create a kaleidoscope
   - Fill one quadrant randomly
   - Mirror the pattern to all 4 quadrants using PEEK
   - Expected output: A symmetrical mandala-style pattern

## Practice Challenge

> **Challenge:** Generate a fractal tree using recursive PRINT statements. Start from the bottom center of the screen, draw a trunk, then branch out with two smaller branches at each level.
> **Hint:** Use a recursive approach — define a function (GOSUB) that takes position, angle, and length as parameters. Draw the trunk, then call the same function recursively for each branch with a shorter length.
>
> **Bonus:** Animate the fractal by adding leaves as small dots that randomly appear on the branches.

## Quiz

1. **What does RANDOMIZE do on the C64?**
   a) Clears the screen
   b) Initializes the random seed generator
   c) Generates random art
   d) Loads a new program
   **Answer:** b
   **Explanation:** RANDOMIZE (no parameter uses timer seed) initializes the RND() function's starting point.

2. **The correct formula for random integers 0 to N-1 is:**
   a) INT(RND(1) * N)
   b) RND(N)
   c) INT(RND(N-1))
   d) RND(1) + INT(N)
   **Answer:** a
   **Explanation:** INT(RND(1) * N) gives integers from 0 up to N-1 on the C64.

3. **Which technique is best for creating consistent yet varied patterns?**
   a) RANDOMIZE with no parameter every frame
   b) A fixed seed (RANDOMIZE 12345) with procedural rules
   c) No randomness at all
   d) Random border colors
   **Answer:** b
   **Explanation:** Fixed seeds + procedural rules create reproducible, consistent art that can be revisited.

## Summary

- RND() generates random numbers; RANDOMIZE sets the seed
- Constraints (colors, ranges) prevent chaotic results
- Mirroring turns simple random patterns into complex symmetrical art
- Fixed seeds let you save and share your unique pattern

## What's Next?

Now that you create static generative art, learn to animate it — scrolling graphics, color cycling, and demoscene-style effects!
