# Lesson 3.1 — What Is a Sprite?

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 3 |
| **Lesson Number** | 1 |
| **Estimated Time** | ~15 min |
| **Prerequisites** | Level 0 (Welcome & Basics), Level 2 (POKE the Screen) |
| **Concepts** | Sprites, SPRITE command, memory address 16, memory address 20 |

## Theory

Welcome to the world of the C64's **sprites**! A sprite is like a tiny sticker that floats on top of your screen. Unlike the blocks of PETSCII text we used in Level 2, sprites can move anywhere, look like anything, and they're made of **pixels**.

Think of your computer screen like a blackboard. So far we've been writing on the blackboard with chalk — neat, but stuck in place. A sprite is like a little cut-out picture you can slide around on top of that blackboard without marking it. That's how classic C64 games like *Beloq*, *Shadow of the Beast*, and even *Pac-Man* did their characters.

Here is what makes sprites special on the C64:

- **8 sprites exist** — numbered 0 through 7. Yes, only 8! Each one is 21 pixels wide by 83 pixels tall.
- **Sprites float above the screen** — they are drawn on top of your text screen, so you can have a character running over letters and numbers.
- **They can change colors** — each sprite has its own color (set to color 1 by default).
- **They move anywhere, instantly** — no flicker, no erasing. The C64 hardware does the work for you!

### Key Takeaway

> **A sprite on the C64 is a tiny pixel sticker that can float and move anywhere on screen — and you control 8 of them!**

### Why Should You Care About Sprites?

Every classic platformer — think *Super Mario Bros.* or *Sonic* — uses sprites! Without sprites, those characters would just be colored text boxes. Spriles turned the C64 from a typewriter into a game machine.

### What You Will Learn in This Level

| Lesson | Topic |
|--------|-------|
| 3.1 | What is a sprite? |
| 3.2 | Defining what your sprite looks like |
| 3.3 | Positioning your sprite on screen |
| 3.4 | Moving your sprite with the keyboard |
| 3.5 | Smooth movement with H-MOVE |
| 3.6 | When to use a sprite vs. POKE the screen |
| 3.7 | Capstone: Build a sprite chase game! |

## C64 BASIC Examples

### Example 1: Turn on your sprites

```
10 PRINT "Hello! Let us make a sprite!"
20 POKE 16,16
30 PRINT "Sprites are now ON!"
```

| Code | Description |
|------|-------------|
| `10 PRINT "Hello..."` | Welcome message to remind us what we are doing |
| `20 POKE 16,16` | Address 16 is the **sprite enable** flag. POKE 16 turns it ON |
| `30 PRINT "Sprites..."` | Confirm the change |

### Example 2: Enable sprites and the X-MOS (extra memory)

```
10 POKE 16,16
20 POKE 20,0
30 PRINT "Sprite 0 is enabled!"
```

| Code | Description |
|------|-------------|
| `10 POKE 16,16` | Turn sprites ON (address 16) |
| `20 POKE 20,0` | Set sprite multiply to normal (no extra memory needed for now) |
| `30 PRINT "Sprite..."` | Confirmation |

### Example 3: Try turning sprites off and on again

```
10 POKE 16,16
20 PRINT "Sprites ON"
30 POKE 16,0
40 PRINT "Sprites OFF"
50 GOTO 10
```

| Code | Description |
|------|-------------|
| `10 POKE 16,16` | Enable sprites |
| `20 PRINT "Sprites ON"` | Text confirmation |
| `30 POKE 16,0` | Disable sprites |
| `40 PRINT "Sprites OFF"` | Text confirmation |
| `50 GOTO 10` | Loop forever — press **RUN/STOP + RUN** to stop |

## Exercise

1. **Type Example 1 above in your C64 emulator. Press RUN. You should see "Hello! Let us make a sprite!" followed by "Sprites are now ON!"**
   - Expected output: Two lines of text, confirming sprites are enabled.
  
2. **Type Example 2 above. Press RUN. Nothing dramatic happens yet (we have not defined what our sprite looks like), but the command POKE 16,16 is the key to unlocking sprites.**
   - Expected output: "Sprite 0 is enabled!" printed to the screen.

3. **Type Example 3 above. Run it. Watch the messages flip back and forth. Press RUN/STOP + RUN to stop it.**
   - Expected output: "Sprites ON" and "Sprites OFF" flashing on the screen.

## Practice Challenge

> **Challenge:** Write a 3-line program that checks whether your sprites can be toggled. Use POKE 16 to turn them on, then POKE 16,0 to turn them off, then POKE 16,16 to turn them back on. Add a PRINT message after each poke so you can tell the difference.
> **Hint:** You only need three POKE commands and three PRINT commands!

## Quiz

1. **How many sprites does the C64 support?**
   a) 4
   b) 8
   c) 16
   d) 32
   **Answer:** b
   **Explanation:** The C64 has exactly 8 sprite registers (numbered 0-7). This is a hardware limitation of the VIC-II chip.

2. **Which memory address controls whether sprites are visible?**
   a) 2000
   b) 3840
   c) 16
   d) 4080
   **Answer:** c
   **Explanation:** Address 16 is the sprite enable flag. POKE 16,16 turns sprites on; POKE 16,0 turns them off.

3. **What does POKE 20,0 do?**
   a) Turns off all sprites
   b) Sets the screen color
   c) Sets sprite multiply to normal (no extra RAM needed)
   d) Enables the keyboard
   **Answer:** c
   **Explanation:** Address 20 controls sprite multiply. POKE 20,0 sets it to the default/normal mode.

## Summary

- Sprites are pixel-based images that float on top of the C64 screen.
- The C64 supports 8 sprites (0-7), each 21x83 pixels.
- **POKE 16,16** turns sprites on; **POKE 16,0** turns them off.
- Address 20 controls sprite multiply (we leave it at 0 for now).
- Sprites are the foundation for game characters, enemies, and projectiles.

## What is Next?

You have turned sprites ON. But right now, you cannot see anything — because sprites need **data**. Your sprite is like a blank canvas, and in the next lesson you will learn to **draw** on that canvas by defining the sprite's pixel pattern. Learn about **4080** (the sprite data address) and see how a single line of POKE commands can turn an invisible sprite into a recognizable shape!

See you in Lesson 3.2!
