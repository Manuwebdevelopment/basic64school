# Lesson 2.3 — Color RAM: Painting Every Character

## Metadata

| Field | Value |
|-----|-|------|
| **Level** | 2 |
| **Lesson Number** | 3 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | Lessons 2.1 (Memory Map), 2.2 (POKE the Screen) |
| **Concepts** | Color RAM ($0680), 16 colors, border color ($D020), backdrop color ($D021), VIC-II registers |

## Theory

Welcome to the rainbow! 🌈 In the last lesson you learned how to write characters to the screen — the *what* (which letters and shapes) and the *where* (which Screen RAM position). Now you'll learn how to make those characters **colorful** using **Color RAM**.

### Where Color Lives

Just like Screen RAM lives at **$0400**, Color RAM lives at **$0680** (which is $0400 + $280, or 1664 in decimal). Remember this golden rule from Lesson 2.1:

> **Character N in Screen RAM has its color at Color RAM + N.**

They are always neighbors. If character "A" (code 65) lives at $0400, its color lives at $0680. If character "B" at $0401, its color at $0681. Always offset by exactly $280 (640 bytes).

### The 16 Colors of the C64

The C64 has exactly **16 colors**, numbered 0 through 15. Here is the full palette:

| Number | Color Name  | Hex Code | Appears On |
|-----|-|-|-|
| 0 | BLACK | $00 | Screen background |
| 1 | WHITE | $FF | Screen foreground |
| 2 | PRIMARY RED | $04 | Screen foreground |
| 3 | PRIMARY CYAN | $08 | Screen foreground |
| 4 | PRIMARY PURPLE | $0C | Screen foreground |
| 5 | PRIMARY GREEN | $10 | Screen foreground |
| 6 | PRIMARY BLUE | $14 | Screen foreground |
| 7 | PRIMARY YELLOW | $18 | Screen foreground |
| 8 | ORANGE | $20 | Screen foreground |
| 9 | ROSE | $24 | Screen foreground |
| 10 | VIOLET | $28 | Screen foreground |
| 11 | BLUE-GREEN | $2C | Screen foreground |
| 12 | GREEN | $30 | Screen foreground |
| 13 | BLUE-PURPLE | $34 | Screen foreground |
| 14 | GREY | $38 | Screen foreground |
| 15 | LIGHT GREY | $3C | Screen foreground |

> **Important:** In Color RAM, each byte stores a VALUE from 0 to 15. The VIC-II chip maps each value to a physical color. On a real C64 these colors look like the classic retro palette. On emulators, they try to match as closely as possible.

### Border and Backdrop: Two More Colors

The C64 gives you **two extra colors** — one for the border around the screen and one for the background behind your text:

| Register | Hex Address | Decimal Address | Purpose |
|-----|-|-|-|
| Border Color | $D020 | 53280 | The color of the frame around your screen |
| Backdrop Color | $D021 | 53281 | The color behind all the text |

By default, the border is black (0) and the backdrop is black (0). But YOU can change both with POKE!

```
10 POKE $D020, 7   ' Set border color to yellow
20 POKE $D021, 11  ' Set backdrop color to blue-green
30 PRINT "Look at those colors!"
```

**Difference between Border and Backdrop:**
- **Border** is the colored frame OUTSIDE your screen. It's the area between your screen and the edge of the TV.
- **Backdrop** is the color visible *where no characters are drawn*. On a standard C64 screen, the text characters "erase" the backdrop with spaces (code 32), so you mostly only see the backdrop where characters happen to be code 32 (spaces).

### How Color and Text Work Together

Each of the 640 color bytes in Color RAM corresponds to one screen position. The layout is:

```
Screen Position 0 (row 1, col 1):
  Screen RAM at $0400 → character code (e.g., 65 = "A")
  Color RAM at $0680 → color code (e.g., 7 = yellow)

Screen Position 1 (row 1, col 2):
  Screen RAM at $0401 → character code
  Color RAM at $0681 → color code

... (keeps going for all 1000 screen positions) ...

Screen Position 999 (row 25, col 40):
  Screen RAM at $07E7 → character code
  Color RAM at $09E7 → color code
```

### Key Takeaway

> **Color RAM at $0680 holds 640 colors (one per screen position + extras), the border is set at $D020, the backdrop at $D021, and together they let you paint every character on the C64 screen with any of 16 colors!**

## C64 BASIC Examples

### Example 1: Paint the entire screen with rainbow colors

```
10 POKE 147
20 PRINT "THE RAINBOW SCREEN"
30 FOR I = 0 TO 15
40 PRINT "Color "; I; " = ";
50 NEXT I
60 FOR I = 0 TO 15
70 POKE $D020, I
80 POKE $D021, I
90 PRINT " "; I; " ";
100 NEXT I
110 POKE $D020, 0
120 POKE $D021, 0
```

Line 70 cycles through setting the border color (at $D020) to each value 0-15. Watch the border change color! The backdrop at $D021 follows suit. We reset both to black (0) at the end.

### Example 2: Color each letter of a word differently

```
10 POKE 147
20 PRINT "RAINBOW WORD"
30 WORD$ = "BASIC"
40 FOR I = 1 TO LEN(WORD$)
50   C = (I + 6) MOD 16
60   POKE 1024 + 20 * I, ASC(MID$(WORD$, I, 1))
70   POKE 1664 + 20 * I, C
80 NEXT I
```

This colors each letter of "BASIC" with a different color from the palette. Color value is calculated from (row + column) mod 16 to cycle through all 16 colors.

### Example 3: A full colored box with gradient

```
10 POKE 147
20 REM --- Draw a box with different colored sides ---
30 REM --- Top border (red) ---
40 FOR C = 0 TO 39
50   POKE 1024 + C, 205
60   POKE 1664 + C, 2
70 NEXT C
80 REM --- Bottom border (yellow) ---
90 FOR C = 0 TO 39
100  POKE 1024 + 24 * 40 + C, 205
110  POKE 1664 + 24 * 40 + C, 7
120 NEXT C
130 REM --- Left border (green) ---
140 FOR R = 0 TO 24
150  POKE 1024 + R * 40, 186
160  POKE 1664 + R * 40, 5
170 NEXT R
180 REM --- Right border (cyan) ---
190 FOR R = 0 TO 24
200  POKE 1024 + R * 40 + 39, 186
210  POKE 1664 + R * 40 + 39, 3
220 NEXT R
230 PRINT
240 PRINT "COLORFUL BOX!"
```

Each side of the box gets its own color. The top is red (2), bottom is yellow (7), left is green (5), and right is cyan (3).

### Example 4: Change border and backdrop colors

```
10 REM --- Set up a dramatic color scheme ---
20 POKE $D020, 12   ' Green border
30 POKE $D021, 0    ' Black backdrop behind text
40 PRINT
50 PRINT "Green border, black backdrop!"
60 PRINT "Change them by editing lines 20-30"
```

This creates a classic green-bordered look. The border at $D020 gets set to green (12), and the backdrop behind the text stays black (0).

### Example 5: A color cycling animation

```
10 FOR HUE = 0 TO 15
20  POKE $D020, HUE
30  FOR R = 1 TO 10: NEXT
40 NEXT HUE
50 PRINT "CYCLE COMPLETE!"
```

Watch the border color cycle through all 16 colors! The delay on line 30 (10 loops of nothing) lets your eyes see each color before it changes. Press RUN/STOP + RUN to see it repeat or add a GOTO at the end.

## Exercise

1. **Type Example 3 and press RUN.** Watch your colorful box appear on screen. Each side has a different border color!

2. **Try Example 4** — then change the border color (line 20) and backdrop color (line 30) to different values (0-15) and see how the overall appearance changes.

3. **Draw your own color experiment** — pick a character code and color it with all 16 color values one by one. Write to the same screen position but change the color each time.

## Practice Challenge

> **Challenge:** Create a 1-column-wide rainbow stripe at column 1 of the screen (all 25 rows). Each row gets a different color (0-15, cycling). Then set the border to match the first row and the backdrop to match the last row.
>
> **Hints:**
> - Row R's color = R MOD 16
> - The color address = $0680 + R * 40 + 1
> - Start with: FOR R = 0 TO 24: POKE $0401, 176: POKE $0680 + R * 40 + 1, R%16: NEXT R

## Quiz

1. **What is the hexadecimal address of the C64 border color register?**
   a) $0680
   b) $D020
   c) $D021
   d) $0400
   **Answer:** b
   **Explanation:** $D020 (53280 decimal) is the border color register. $D021 (53281) is the backdrop color register.

2. **If Screen RAM at $0400 holds the character 'A' (code 65), where is its color stored?**
   a) $0401
   b) $0680
   c) $D020
   d) $A000
   **Answer:** b
   **Explanation:** Color RAM is always $280 (640 bytes) after Screen RAM. So $0400 + $280 = $0680.

3. **How many different colors can the C64 display on the screen itself?**
   a) 8
   b) 12
   c) 16
   d) 32
   **Answer:** c
   **Explanation:** The C64 supports exactly 16 colors (0 through 15) for both the screen and the border/backdrop.

4. **What does the backdrop color ($D021) control?**
   a) The color of the physical case of the C64
   b) The color behind characters where blanks appear  
   c) The color of the border around the screen
   d) The color of the SID sound chip
   **Answer:** b
   **Explanation:** The backdrop color is the background color behind the text. Where characters appear, the backdrop is hidden under the character graphic. At blank positions (code 32), you see the backdrop color.

## Summary

- **Color RAM at $0680** holds 640 color bytes, one for each screen character position (1000 positions) plus 640 color bytes.
- **16 colors** are available on the C64, numbered 0 (black) through 15 (white).
- **Border color** is set by POKE $D020 — it controls the frame around the screen.
- **Backdrop color** is set by POKE $D021 — it's what you see behind blank characters.
- **Each character N** at Screen RAM + N has its color at Color RAM + N.
- **You can paint every pixel of text** by pairing Screen RAM writes with Color RAM writes.

## What's Next?

Now you can write ANY character and color it ANY way. But you're limited to the default character set — uppercase letters and basic symbols. In the next lesson, you'll discover the **secret world of PETSCII** — the full character map of the C64, including lower case letters, box-drawing lines, hearts, arrows, stars, and more!

See you in Lesson 2.4 — The Secrets of PETSCII! 📦
