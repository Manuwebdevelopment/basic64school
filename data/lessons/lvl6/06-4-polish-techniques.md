# 06-4: Polish Techniques — Making Your Game Feel Alive

## Metadata
- **Level:** 6
- **Lesson Number:** 4
- **Estimated Time:** ~30 min
- **Prerequisites:** Lessons 6-1 through 6-3
- **Concepts:** Screen shake, color flash, particle effects, sound effects, screen management, visual feedback

## Theory

A game with correct mechanics but no polish feels flat. The C64's VIC-II chip enables several visual effects that make games feel satisfying — even in BASIC.

### Screen Shake

Create the illusion of impact by briefly nudging sprites off their position:
- Save the original position
- Offset by ±1 pixels for several frames
- Restore the position

### Flicker and Flash

| Effect | Technique |
|--------|-----------|
| Screen flash | Rapidly change POKE $D020 (border) between white and normal |
| Object flash | Rapidly show/hide sprite via sprite enable register $D015 |
| Text highlight | Use PETSCII reverse-video characters (158 = reverse block) |

### Particle Effects (Pseudo)

Since you can't create individual pixels as objects, use character "particles":
- Create a character array that acts as a pool of small particles
- Each frame, move each "particle" position and draw it as a small character (dots, Xs, +s)
- When they reach the bottom (Y = 24), recycle them

### Sound for Feedback

| Moment | Sound |
|--------|--------|
| Score up | Quick ascending tone (frequency sweep up) |
| Score down | Descending tone |
| Game over | Low long tone |
| Level complete | Three-note ascending sequence |

## Key Takeaway

> Polish = screen shake + color flash + particles + sound feedback. Each adds one layer of "juice" making the game feel alive.

## C64 BASIC Examples

### Example 1: Screen Shake Effect

| Code | Description |
|------|------|
| `FOR I = 1 TO 8` | Shake for 8 frames |
| ` POKE 2000,PX + (I MOD 3 - 1)` | Offset X position by -1, 0, or 1 |
| ` FOR J = 1 TO 2: NEXT` | Delay so human eye sees it |
| ` NEXT` | End shake |

### Example 2: Color Flash (Screen Flash)

| Code | Description |
|------|------|
| `FOR I = 1 TO 4` | Flash 4 times |
| ` POKE $D020,15` | Show white border |
| ` FOR J = 1 TO 2: NEXT` | Short delay |
| ` POKE $D020,0` | Show black border |
| ` FOR J = 1 TO 2: NEXT` | Short delay |
| ` NEXT` | End flash loop |

### Example 3: Simple Sound Feedback

| Code | Description |
|------|------|
| `500 POKE $D416,80:POKE $D400,200:POKE $D412,2` | Start tone at vol 2 |
| `510 FOR I=1 TO 5:NEXT` | Hold for 5 frames |
| `520 POKE $D400,0:POKE $D412,0` | Turn tone off |
| `530 RETURN` | Return |

## Exercise

1. **Step 1:** Add screen shake when a collision happens
   - Save sprite X position, offset for 8 frames, restore
   - Expected output: Sprite jolts briefly on impact

2. **Step 2:** Add color flash effect
   - Flash border white 4 times then back to initial color
   - Expected output: Quick white flash visual cue

3. **Step 3:** Add sound feedback for scoring and losing
   - Short ascending tone when scoring up
   - Descending tone on losing
   - Use POKE to play tones for 3-6 frames each

## Practice Challenge

> **Challenge:** Build a "combo system" — if the player scores 5 times quickly, the game plays a special sound sequence and shows a multi-colored border flash (cycle through 5 colors over 10 frames). Each miss breaks the combo.
> **Hint:** Track COMBO_COUNT as a variable. Only increment when scoring. Reset when not scoring.

## Quiz

1. **Screen shake is achieved by:**
   a) Changing the game state variable
   b) Briefly offsetting sprite positions and restoring
   c) Changing the border color
   d) Increasing the frame rate
   **Answer:** b
   **Explanation:** Move sprite positions ±1 pixel for several frames, then restore to the original position.

2. **To flash the screen white on the C64, you use:**
   a) POKE $D020,15
   b) PRINT "white"
   c) POKE 53296,255
   d) GOSUB 42
   **Answer:** a
   **Explanation:** Address $D020 (53280) controls the border color. 15 = white in C64's 16-color palette.

3. **The best way to add feedback for scoring is:**
   a) Just update the score variable
   b) Change color + play sound + flash
   c) Add a text message only
   d) Nothing, score speaks for itself
   **Answer:** b
   **Explanation:** Multi-sensory feedback (color change + sound) makes scoring feel much more satisfying.

## Summary

- Screen shake offsets sprite positions temporarily
- Color flashing changes the border color rapidly
- Sound feedback uses POKE to the SID registers
- Combining visual + audio feedback makes the game feel alive

## What's Next?

Now you have states, scores, difficulty scaling, and polish. Time to combine it all in a complete game!
