# Lesson 5.2 — Multi-Screen Effects: Beyond 25 Rows

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 5 |
| **Lesson Number** | 2 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | Level 2 (POKE, Memory Map), Level 5.1 (READ/DATA) |
| **Concepts** | Screen base address, multi-screen, SYS calls, scrolling text, demo effects |

## Theory

The C64's text screen normally shows **25 rows by 40 columns**. But here is a fun secret: the C64 actually has **2 full screens** worth of character memory! If you change the screen base address, you can make the display jump to a completely different part of memory. This means you can have **two full screens** hiding in your program, and switch between them in an instant.

This is what retro "demo" programmers used to create **scrolling text, flashing backgrounds, and transition effects**. By rapidly switching screen addresses, you can build animations that would take hundreds of lines of normal BASIC.

The C64 stores the character display at memory address **$0400** (decimal 1024). This is where the letters and symbols you see on screen are stored. But there is another full screen's worth of memory at **$1400** (decimal 5120) — and more beyond! By changing a special **system variable**, you can tell the C64 to display from a different starting address.

The system variable that controls the screen base address lives at **$0314–$0315** (decimal 788–789). This is a 16-bit (two-byte) number. The low byte is at $0314 and the high byte at $0315. To switch screens, you **POKE** new values into these two addresses.

Think of it like a TV remote: normally the TV shows channel 1 ($0400), but POKEing a new address makes it jump to channel 2 ($1400) or any other channel you set!

### Key Takeaway

> **By POKEing the screen base address at $0314–$0315, you can instantly switch between multiple screens hidden in memory, creating scrolling text and demo-style effects!**

### How Screen Memory Works

The C64 screen display is stored at:
- **$0400 (1024)** — "Screen 1" (the normal screen, 1000 bytes)
- **$1400 (5120)** — "Screen 2" (a hidden screen, 1000 bytes)
- **$1800 (6144)** — "Screen 3" (another hidden one)
- And more!

Each screen is 1000 bytes (25 rows × 40 columns). When you change the base address, ALL the text on screen changes instantly.

## C64 BASIC Examples

### Example 1: Switching between two screens

```
10 PRINT "This is Screen 1!"
20 PRINT "Look at these colors!"
30 PRINT CHR$(20); "Press RETURN to switch"
40 GET K$: IF K$="" THEN 40
50 POKE 788,0:POKE 789,20   ; Switch to $1400
60 PRINT CHR$(147)           ; Clear screen at new address
70 PRINT "Hello from Screen 2!"
80 PRINT "You jumped to a new screen!"
90 PRINT CHR$(20); "Press RETURN to go back"
100 GET K$: IF K$="" THEN 100
110 POKE 788,0:POKE 789,4    ; Back to $0400
120 PRINT CHR$(147)
130 PRINT "Back to Screen 1!"
```

|| Code | Description |
|------|-------|
| `POKE 788,0:POKE 789,20` | Set screen base to $1400 (0 + 20×256) |
| `POKE 788,0:POKE 789,4` | Set screen base back to $0400 (0 + 4×256) |
| `PRINT CHR$(147)` | Clear screen — but at the NEW screen address! |

### Example 2: Scrolling text effect

```
10 DIM TEXT$(10)
20 FOR I=1 TO 10
30   READ TEXT$(I)
40 NEXT I
50 FOR ROW=0 TO 22
60   PRINT CHR$(147)
70   FOR R=0 TO 24
80     POKE 5120+R*40,32
90   NEXT R
100  FOR C=0 TO 39:POKE 4096+C,32:NEXT C
110  SR=ROW MOD 10+1
120  POKE 5120+SR*40-1,84
130  NEXT C
130  IF ROW=1 THEN POKE 5120,72:POKE 5121,69:POKE 5122,76:POKE 5123,76
140  POKE 788,0:POKE 789,20
150  FOR D=1 TO 10:NEXT D
160 NEXT ROW
170 DATA "SCROLLING","TEXT","EFFECTS","LOOK","COOL","RIGHT","?","YES!","THE","C64"
```

|| Code | Description |
|------|--|
| `POKE 788,0:POKE 789,20` | Display from $1400 (Screen 2) |
| `ROW MOD 10+1` | Cycle through 10 rows for scrolling |
| `120 NEXT C` | Move to next row each cycle |
| `FOR D=1 TO 10:NEXT D` | Delay so text is visible longer |

### Example 3: Cycling screen backgrounds

```
10 REM *** DEMO SCREEN CYCLER ***
20 DIM BG$(200)
30 FOR I=0 TO 199
40   BG$(I)=CHR$(144+I MOD 128)
50 NEXT I
60 FOR FRAME=0 TO 9
70   BASE=4+FRAME
80   POKE 788,128:POKE 789,BASE
90   FOR I=0 TO 199
100    POKE 5120+I,BG$(I)
110  NEXT I
120  FOR D=1 TO 30:NEXT D
130 NEXT FRAME
140 POKE 788,0:POKE 789,4
150 PRINT CHR$(147)
160 PRINT "DEMO COMPLETE!"
```

|| Code | Description |
|------|--|
| `BASE=4+FRAME` | Move screen base higher each frame |
| `POKE 788,128:POKE 789,BASE` | Set high byte 128 + low byte for new address |
| `FOR I=0 TO 199:NEXT I` | Fill pattern on the active screen |

## Exercise

1. **Type Example 1 and press RUN. Press RETURN to see each screen.**
   - Expected output: First screen shows "Screen 1" text, then "Screen 2" text after pressing RETURN.

2. **Add a third screen at $2400 (address $02C0), fill it with a pattern, and display it.**
   - Expected output: After the second press, see a new screen with your pattern.

3. **Modify Example 2 to scroll the text in BOTH directions (top-to-bottom, then bottom-to-top).**
   - Expected output: Text scrolls down the screen and then back up.

## Practice Challenge

> **Challenge:** Create a "breathing screen" effect. Use the screen base variable to make the display slowly pan up and down through memory, showing different characters as it goes. Use READ/DATA to define a pattern of characters that cycle through memory.
> **Hint:** Use POKE to build your pattern on screen 2 first, then POKE 788 and 789 to reveal it from different offsets to create the pan effect.

## Quiz

1. **Where does the C64 normally display its text screen?**
   a) $0000
   b) $0400
   c) $1000
   d) $8000
   **Answer:** b
   **Explanation:** The normal screen address is $0400 (1024 in decimal).

2. **What does the screen base address variable do?**
   a) It controls screen color
   b) It tells the C64 where to start drawing text in memory
   c) It sets the text font
   d) It stores the screen contents
   **Answer:** b
   **Explanation:** The screen base address points to where the C64 begins reading character data for display.

3. **How many bytes is one full C64 text screen?**
   a) 25
   b) 40
   c) 1024
   d) 1000
   **Answer:** d
   **Explanation:** 25 rows × 40 columns = 1000 bytes per screen row of memory.

4. **To switch the screen to $1400, which POKEs do you need?**
   a) POKE 788,0:POKE 790,20
   b) POKE 788,0:POKE 789,20
   c) POKE 788,20:POKE 789,0
   d) POKE 1024,20
   **Answer:** b
   **Explanation:** $0314=$1400 low byte = 0, $0315=$0014 high byte = 20. POKE 788,0:POKE 789,20.

## Summary

- The C64 has **multiple full screens** hidden in memory (1000 bytes each).
- **$0314-$0315 (788-789)** hold the screen base address as a 16-bit number.
- POKEing these values **instantly switches** the visible display.
- **$0400 (1024)** is the normal screen, **$1400 (5120)** is screen 2.
- This technique creates **scrolling text, transitions, and demo effects.**
- Rapidly switching addresses creates **smooth animation** that feels powerful.

## What's Next?

Now you can make the screen dance with multiple backgrounds! But what about making things move ON the screen? In the next lesson, you will learn how to use POKE to **define and animate sprite graphics** — creating walking, bouncing, and flipping characters that move across your screen!

See you in Lesson 5.3 — Sprite Animations! 👾
