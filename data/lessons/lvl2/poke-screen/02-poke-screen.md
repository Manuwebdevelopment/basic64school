# Lesson 2.2 — POKE the Screen: Writing Characters Directly

## Metadata

| Field | Value |
|-----|--|
| **Level** | 2 |
| **Lesson Number** | 2 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | Lesson 2.1 (Memory Map, Screen RAM, Color RAM) |
| **Concepts** | Screen RAM writing, character codes, graphics characters, clear screen, character patterns |

## Theory

Welcome to the fun part — **POKEing characters right onto the screen**! In the last lesson you learned that Screen RAM starts at $0400 (1024) and holds the character code for every position on your 40×25 screen. Now you will use that knowledge to **paint with characters** like a real C64 artist.

### The Character Code Table

The C64 uses **PETSCII** (PET Standard Code for Information Interchange) for its characters. Here is how the codes work:

| PETSCII Code | Character | Type | PETSCII Code | Character | Type |
|-----|-|-|-----|-|
| 0–31 | Special (control) | Control codes | 128–159 | Lower case (a–z) | Lower case letters |
| 32 | (space) | Normal | 160–255 | Graphics | PETSCII art characters |
| 33–64 | !"#$%&'()*+,-./ | Symbols | | | |
| 65–90 | A–Z | UPPER case letters | | | |
| 91–96 | [\]^_` | Symbols | | | |
| 97–127 | a–z | LOWER case letters | | | |

The most important range for drawing is **codes 32 through 255**. Code 32 is the blank space, 33–127 gives you symbols and letters, and 128–255 unlocks **graphics characters** (box drawing, arrows, hearts, stars, and more!).

### Character Codes 32–95: Symbols and Spaces

| Codes | What You Get |
|-|-|
| 32 | Blank space (the eraser!) |
| 33–47 | !"#$%&'()*+,-./ |
| 48–57 | Numbers 0–9 |
| 58–64 | :;<=>?@ |
| 65–90 | A–Z (UPPER case) |
| 91–95 | [\]^_ |

### Character Codes 96–127: Lower case letters and more

| Codes | What You Get |
|-|-|
| 96–100 | \` a b c d |
| 101–122 | e–z (lower case) |
| 123–127 | {|}~DEL |

### PETSCII Graphics Codes 128–255: Your Drawing Tools!

This is where the C64 gets magical. The graphics characters include:

| PETSCII Code | Character | What It Draws |
|-----|-|---|
| 142 | → | Right arrow |
| 144 | ← | Left arrow |
| 145 | ↑ | Up arrow |
| 146 | ↓ | Down arrow |
| 147 | (clear) | Clear screen command |
| 148 | ↕ | Up-down arrow |
| 149 | ↔ | Left-right arrow |
| 156–163 | ═ │ ║ ╒ ╓ ╔ ╕ | Box-drawing characters |
| 160–191 | Various characters | Block and double-lines |
| 176–255 | ░▒▓█║╣╚╗ ... | Full box-drawing and block art |

> **Pro tip:** To type a PETSCII graphics character on a real C64, hold **CTRL** and press the upper-case lock key, then type the character. On an emulator, use chr$() or poke it directly!

### Clearing the Screen: Two Methods

The C64 has two ways to clear the screen:

1. **CHR$(147)** — the standard way. PRINT CHR$(147) sends the "clear screen" command to the Kernal, which resets the cursor to the top-left and fills the screen with spaces (code 32).

2. **POKE to $0400** — the hacker way. You can write spaces (code 32) directly into screen RAM:
   ```
   10 FOR I=0 TO 1023:POKE 1024+I,32:NEXT I
   ```
   This is the "manual" approach — it works but is slower because you control every byte. For quick clearing, CHR$(147) is the way to go!

### Key Takeaway

> **Every position on the C64 screen is one POKE away — write character codes (32–255) into Screen RAM at $0400 + position to create any pattern, message, or drawing you can imagine!**

## C64 BASIC Examples

### Example 1: Draw a single character anywhere

```
10 PRINT "HERE COMES A STAR!": CHR$(147)
20 POKE 1024 + 385, 153
30 PRINT "Did you see it?"
40 PRINT "153 is the star character ★"
```

Address 1024 + 385 puts the star at approximately row 10, column 9 (the middle of the screen on most C64 displays). PETSCII code 153 is the star ★.

### Example 2: Draw a box using PETSCII characters

```
10 POKE 147
20 REM --- Draw a box 20x10 characters ---
30 FOR C = 0 TO 19
40 POKE 2024 + C, 205
50 POKE 2424 + C, 205
60 NEXT C
70 FOR R = 0 TO 9
80 POKE 2064 + R * 40, 186
90 POKE 2064 + R * 40 + 19, 186
100 NEXT R
110 REM --- Draw corners ---
120 POKE 2064, 201
130 POKE 2064 + 19, 187
140 POKE 2424, 200
150 POKE 2424 + 19, 188
160 PRINT "BOX DRAWN!"
```

This example draws a box on the screen. PETSCII codes 186, 205, 200, 201, 187, and 188 are the classic box-drawing characters (vertical line, horizontal line, top-left corner, top-right corner, bottom-left corner, bottom-right corner).

### Example 3: Write a message character by character

```
10 POKE 147
20 MSG = "HELLO C64!"
30 FOR I = 1 TO LEN(MSG)
40 POKE 1024 + 20 * I, ASC(MID$(MSG, I, 1))
50 NEXT I
60 PRINT CHR$(14)
70 GOTO 60
```

Here we use `ASC()` to get the character code of each letter and `MID$()` to pick out one character at a time. We write them starting at position 20*1 through 20*12, creating a message across the screen.

### Example 4: Draw a pattern of arrows

```
10 POKE 147
20 FOR R = 0 TO 24
30 FOR C = 0 TO 39
40 IF (R + C) MOD 3 = 0 THEN POKE 1024 + R * 40 + C, 142
50 IF (R + C) MOD 3 = 1 THEN POKE 1024 + R * 40 + C, 144
60 IF (R + C) MOD 3 = 2 THEN POKE 1024 + R * 40 + C, 145
70 NEXT C
80 NEXT R
90 PRINT "ARROW PATTERN COMPLETE!"
```

Each position on the screen gets a different arrow (→, ←, ↑) based on a repeating pattern created with the MOD operator.

### Example 5: Clear screen with POKE vs CHR$(147)

```
10 PRINT "METHOD 1 - CHR$(147):"; CHR$(147)
20 PRINT "CLEARED INSTANTLY!"
30 PRINT "Now let's do it the hacker way..."
40 FOR I = 0 TO 999
50 POKE 1024 + I, 32
60 NEXT I
70 PRINT "CLEARED WITH POKE! (took longer)"
```

Notice the difference: line 20 instantaneously clears the entire screen using the C64's built-in command. Lines 40–60 manually clear the screen by writing space (32) to every Screen RAM position — it works but takes longer!

## Exercise

1. **Type Example 1 and press RUN.** Watch the STAR (character 153) appear on the screen. Move the address on line 20 to change where the star appears.

2. **Type Example 4 and press RUN.** Watch the pattern of arrows fill the screen. Each arrow points based on the sum of its row and column position!

3. **Draw your name** — write your first name using PETSCII codes on the screen. Pick any row and start at any column. Use PETSCII codes for each letter of your name!

## Practice Challenge

> **Challenge:** Create a border around the entire screen using PETSCII box-drawing characters. Then fill the inside with a pattern of your choice (arrows, hearts, or blocks). Make it look like a C64 game title frame!
>
> **Hints:** 
> - Border: use PETSCII codes 201-203 for top corners, 186 for vertical sides, 205 for horizontal lines, 200/187/188 for bottom corners
> - Fill: use any character code 1-127 or 160-254 inside the border

## Quiz

1. **What PETSCII character code is used to clear the screen?**
   a) 32
   b) 0
   c) 147
   d) 1
   **Answer:** c
   **Explanation:** PETSCII code 147 is the clear screen command. When printed, it clears the display and returns the cursor to the top-left corner.

2. **Which PETSCI codes give you graphics characters like arrows and blocks?**
   a) 0–31
   b) 32–95
   c) 96–127
   d) 128–255
   **Answer:** d
   **Explanation:** PETSCII codes 128 through 255 are reserved for graphics characters including arrows, box-drawing lines, hearts, stars, and block patterns.

3. **What is the fastest way to clear the entire C64 screen?**
   a) POKE each character to 32 individually
   b) Print CHR$(147)
   c) Turn the monitor off
   d) Reboot the C64
   **Answer:** b
   **Explanation:** PRINT CHR$(147) sends a single command to the C64's Kernal, which instantly clears the screen and resets the cursor. POKEing each position works but is much slower.

4. **To draw a character at row 3, column 15 on the screen, which Screen RAM address do you use?**
   a) 1024 + 3*40 + 15 = 1189
   b) 1024 + 15 + 3 = 1042
   c) $0400 + 39 = $0427
   d) 1024 + 15*40 + 3 = 1627
   **Answer:** a
   **Explanation:** Row 3, column 15 = offset (3 × 40 + 15) = 135. So the Screen RAM address is $0400 + 135 = 1024 + 135 = 1159.

## Summary

- **Screen RAM at $0400** holds every character on the C64 screen.
- **PETSCI codes 33–127** give you symbols, uppercase, and lowercase letters.
- **PETSCII codes 128–255** unlock graphics characters (arrows, blocks, hearts, stars, box drawing).
- **CHR$(147)** is the fastest way to clear the screen.
- **POKE 1024 + offset** writes characters directly to any position on screen.
- **The formula is: screen RAM = $0400 + row × 40 + column.**

## What's Next?

You can now draw characters anywhere on the screen! But everything is still just... white-on-black. In the next lesson, you'll learn how to **add color** to every single character on the screen using Color RAM. Get ready to paint!

See you in Lesson 2.3 — Color RAM: Painting Every Character! 🎨
