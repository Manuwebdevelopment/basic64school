# Lesson 4.5 — Timing and FPS

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 4 |
| **Lesson Number** | 5 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lessons 4.1-4.4 (Sound, Melodies, Keyboard, Joystick), Level 1 (FOR/NEXT, IF/THEN) |
| **Concepts** | Timer registers, game loop, frame rates, DELAY, consistent timing |

## Theory

Have you ever played a game that went super fast on one computer and super slow on another? That happens when games don't have **proper timing**. Imagine your character running — if the game has no speed limit, it zooms across the screen in a blink!

The C64 has a **hardware timer** built into its VIC chip (the graphics chip). This timer counts every vertical blank — that is, the moment when the TV's electron beam resets at the end of each screen display. On NTSC systems (US), this happens about **60 times per second**. On PAL systems (Europe), about **50 times per second**.

### Why Does This Matter?

Think of a movie. Movies show 24 pictures per second (FPS = frames per second). If the pictures don't show at a steady rate, the actors look like they are running in fast-forward! Your C64 games need the same thing — **a steady frame rate**.

The C64's timer addresses:
| Address | Decimal | Purpose |
|---------|-----|---|
| $D30E | 54030 | Timer 2 low byte |
| $D30F | 54031 | Timer 2 high byte |

The timer runs backwards — it counts down from a starting value to 0. When it hits 0, the C64 triggers a **vertical blank interrupt** (VBI). We can use this to **count** or **delay** game events.

### Key Takeaway

> **A game loop with a timer gives your game a steady, smooth speed — just like a movie with a steady frame rate!**

## C64 BASIC Examples

### Example 1: Read the timer value

```
10 PRINT "Timer Reading Demo"
20 T=PEEK(54030)+(PEEK(54031)*256)
30 PRINT "Timer = ";T
40 GOTO 20
```

| Code | Description |
|------|------|
| `PEEK(54030)` | Read the low byte of Timer 2 |
| `PEEK(54031)*256` | Read the high byte and shift to tens of thousands place |
| `T=...` | Combine both bytes into the full 16-bit timer value |

### Example 2: Simple DELAY routine

```
10 PRINT "Count: ";
20 FOR COUNT=1 TO 60
30   PRINT COUNT" ";
40 NEXT COUNT
50 PRINT
60 PRINT "Done! Now a real timer delay..."
70 POKE 54030,0:POKE 54031,0:REM Reset timer
80 T1=PEEK(54030)+(PEEK(54031)*256)
90 T2=PEEK(54030)+(PEEK(54031)*256)
100 PRINT "Timer delta =";T2-T1
110 GOTO 10
```

| Code | Description |
|------|------|
| `POKE 54030,0:POKE 54031,0` | Reset timer to start counting from 0 |
| `T2-T1` | Calculate elapsed time in timer ticks |

### Example 3: A game loop with DELAY

```
10 CLS:POKE 54296,0
20 X=0:Y=40:DIR=0:FIRE=0
30 PRINT "=== SPACE SHADER ==="
40 GOSUB 300:REM Draw screen
50 GOSUB 200:REM Read joystick
60 GOSUB 100:REM Game logic
70 T=PEEK(54030)+(PEEK(54031)*256)
80 IF T<10 THEN 70:REM Wait for ~15ms
90 GOTO 40
100 REM --- Game Logic ---
110 IF FIRE<>0 AND FIRE<>7 THEN GOSUB 400
120 X=X+DIR:IF X>39 THEN X=39:IF X<0 THEN X=0
130 RETURN
200 REM --- Read Joystick ---
210 J=PEEK(56832)
220 DIR=0:FIRE=0
230 IF (J AND 4)=0 THEN DIR=1
240 IF (J AND 8)=0 THEN DIR=-1
250 IF (J AND 16)=0 THEN FIRE=1
260 RETURN
300 REM --- Draw Screen ---
310 CLS:POKE 1024+Y*40+X,65:Print "Player";
320 RETURN
400 REM --- Fire! ---
410 PRINT "*** FIRE! ***"
420 RETURN
```

| Code | Description |
|------|------|
| `GOSUB 100/200/300` | Game loop: logic → input → draw |
| `IF T<10 THEN 70` | DELAY — keep looping until ~10 timer ticks pass (~15ms) |
| `X=X+DIR` | Move player based on joystick direction |
| `GOTO 40` | The game loop repeats forever! |

## Exercise

1. **Type Example 1. Run it. Watch the timer count. How fast does it change?**
   - Expected output: The timer value increases each frame — it counts timer ticks very quickly.

2. **Modify Example 3's delay (line 80) from 10 to 30. Run it again. What happens to the movement speed?**
   - Expected output: The player moves slower because the delay is longer — the game waits more time between each frame update.

3. **Add a score counter. When you press FIRE, increase a SCORE variable and display it on screen.**
   - Expected output: Each time you press the fire button, the score increases and "Score: X" displays on screen.

## Practice Challenge

```
> **Challenge:** Build a mini game with a player (the letter 'P') that:
> 1. Moves with the joystick direction
> 2. Fires a projectile (a '*' character) when the FIRE button is pressed
> 3. The projectile moves upward until it hits the top of the screen
> 4. The game runs at a steady speed using the timer DELAY
> 5. A scoreboard at the top shows how many projectiles have been launched
> **Hint:** Store the projectile position as Y=POKE the projectile each frame until Y<0. Use line
```

## Quiz

1. **What is the C64's approximate frame rate on NTSC systems?**
   a) 30 frames per second
   b) 50 frames per second
   c) 60 frames per second
   d) 120 frames per second
   **Answer:** c
   **Explanation:** The NTSC (US/Japan) TV standard runs at approximately 60 Hz, meaning the C64 can display one full screen 60 times per second.

2. **Which addresses hold the timer value?**
   a) $D400-$D401
   b) $D30E-$D30F
   c) $DE00-$DE01
   d) $D011-$D012
   **Answer:** b
   **Explanation:** $D30E (54030) is the low byte and $D30F (54031) is the high byte of Timer 2.

3. **Why use PEEK(54030) + PEEK(54031)*256 instead of just PEEK(54030)?**
   a) Because the high byte is faster
   b) Because 54031 is a special address
   c) Because the full timer is a 16-bit value — you need both bytes
   d) Because BASIC ignores the low byte
   **Answer:** c
   **Explanation:** The timer is a 16-bit (2-byte) value. Low byte holds values 0-255 and high byte holds values 0-255 in the "higher" place. You combine them for the complete timer tick count.

4. **What is a game loop?**
   a) A loop that only runs once
   b) A repeating sequence of update input → process game logic → draw screen → wait for frame
   c) A loop that only reads the keyboard
   d) A loop that only plays music
   **Answer:** b
   **Explanation:** A game loop cycles: read input (keys/joystick), update game state (move sprites, check collisions), draw the screen, then wait for the next frame. This creates smooth, responsive games.

## Summary

- The **timer registers** are at **$D30E** (low byte) and **$D30F** (high byte).
- **Timer reads** return ticks — each tick is a small amount of time.
- Use a **delay loop** (`IF T<10 THEN GOTO T`) to **wait** between game updates.
- A **game loop** follows: read input → update game logic → draw screen → wait for frame.
- Steady timing = **smooth movement** = **professional-looking game**.
- Without timing, fast computers run games too fast and slow computers run them too slow — a DELAY fixes this!

## What's Next?

You now know:
- **Sound** (SID chip) — make music and sound effects
- **Input** (keyboard & joystick) — let the player control things
- **Timing** (timer registers & game loops) — keep everything running smooth

In **Level 5**, you will combine everything into **powerful games**! You will use **sprites** (from Level 3) **together** with sound, input, and timing to make a full, playable game. You will also learn about **high scores**, **game states**, **power-ups**, and **advanced effects**!

Get ready for Level 5 — Data Structures & Effects! 🎮

---

## What's Done

**Level 4 is COMPLETE with all 5 lessons written.**

## What's Coming

- **Level 5 — Data Structures & Effects**: Combining everything with high scores, power-ups, and game states
- **Games Track**: Full game projects
- **Creative Coding Track**: Procedural art and generative patterns
- **Systems & Tools Track**: Deep dives into BASIC internals
