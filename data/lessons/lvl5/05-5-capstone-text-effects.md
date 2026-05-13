# Lesson 5.5 — Capstone: Text Effects Demo

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 5 |
| **Lesson Number** | 5 |
| **Estimated Time** | ~40 min |
| **Prerequisites** | Lessons 5.1-5.4 (READ/DATA, Multi-Screen, Sprite Animations, Arrays) |
| **Concepts** | Demo creation, scrolling credits, animated title, color cycling, sprite intro, combining concepts |

## Theory

Welcome to the big finish! In this lesson, you will combine **everything** you have learned in Level 5 — and beyond — to create a **full demo**: a polished program that showcases the Commodore 64's graphics and text capabilities.

A **demo** is a demonstration program designed to show off what a computer can do. Demo programmers in the 1980s were obsessed with making the most impressive visual effects possible within the C64's limitations. Your demo will include:

1. **Animated title screen** — a colorful title that cycles through rainbow colors
2. **Sprite intro animation** — a sprite that flies across the screen
3. **Scrolling credits** — text that rolls upward, like TV credits
4. **Screen transitions** — switching between multiple screens for dramatic effect

### The Structure of a Demo

Your demo will have **3 sections**:

- **Section 1: Splash** — A color-cycling title screen with an intro sprite fly-by
- **Section 2: Credits** — Scrolling text credits displayed on a different screen address
- **Section 3: Finale** — A combined screen with the sprite and credits together

### Key Takeaway

> **A demo combines all of your Level 5 skills — arrays, READ/DATA, sprites, multi-screen effects, and color cycling — into one impressive program that showcases the C64's full visual power!**

### Color Cycling Technique

The C64 has **16 colors** (0-15), each stored in a color RAM byte at **$0400 (1024)**. You can cycle through colors by sequentially POKEing new color values into the color RAM — the screen updates instantly!

For a rainbow effect, cycle color RAM values 1 through 13 (black and white are boring). Each color gets a small delay loop to make the cycling visible.

## C64 BASIC Examples

### The Full Demo Program

```
10 REM *** MY FIRST C64 DEMO ***
20 REM *** COMBINING SLOTS 5.1-5.4 ***
30 DIM TITLE$(8):DIM COLORS(13):DIM CRED(10):DIM SP(48)
40 POKEM 53280,15
50 POKE 53281,0
60 POKE 53248,1:POKE 53252,50:POKE 53256,100

70 REM --- TITLE DATA ---
80 FOR T=1 TO 8:READ TITLE$(T):NEXT T
100 FOR C=1 TO 13:READ COLORS(C):NEXT C
110 FOR CR=1 TO 10:READ CRED$(CR):NEXT CR
120 REM Title text and color data:
130 DATA "DEMO","MY","FIRST","C64","PROGRAM","BY","ME!","OK"
140 DATA 1,2,3,4,5,6,7,8,9,10,11,12,13
150 DATA "CREDIT","ONE:","","HELLO","WORLD","DEMO","IS","OVER","GOOD","BYE"
160 REM Sprite frame data (48 bytes):
170 FOR I=0 TO 47:READ SP(I+1):POKE 9216+I,SP(I+1):NEXT I
180 DATA 0,0,0,31,0,0,0,31,0,0,0,31,0,0,0,31
190 DATA 62,62,62,62,62,62,62,62,31,31,31,31
200 DATA 15,15,15,15,7,7,7,7,3,3,3,3
210 DATA 0,0,0,0,0,0,0,0,0,0,0,0
220 POKEM 53288,0:POKE 53289,36    ; Point sprite to $2400

230 REM === SECTION 1: TITLE SCREEN ===
240 FOR FRAME=1 TO 80
250   PRINT CHR$(147)
260   COLOR=FRAME MOD 13+1
270   BASE=2+INT(FRAME/10)
280   FOR Y=0 TO 24
290     COLOR_INDEX=(FRAME+Y*3) MOD 13+1
300     FOR X=0 TO 39:POKE 1024+Y*40+X,65:NEXT X
310   NEXT Y
320   COLOR_INDEX=FRAME MOD 13+1
330   PRINT "  ";
340   FOR L=1 TO LEN(TITLE$(INT(FRAME/10)+1))
350     PRINT TITLE$(INT(FRAME/10)+1);
360   NEXT L
370   POKE 53280,COLOR_INDEX
380   FOR D=1 TO 5:NEXT D
390 NEXT FRAME

400 POKE 53248,0   ; Hide sprite
410 REM === SECTION 2: SCROLLING CREDITS ON SCREEN 2 ===
420 SCREEN=20    ; Screen at $1400
430 FOR ROW=0 TO 22
440   PRINT CHR$(147)
450   FOR R=0 TO 24
460     FOR C=0 TO 39
470       SCREEN_ADDR=5120+R*40+C
480       POKE SCREEN_ADDR,32
490     NEXT C
500   NEXT R
510   CREDIT_ROW=(FRAME+ROW) MOD 10+1
520   CREDIT$=CRED$(CREDIT_ROW)
530   FOR C=1 TO LEN(CREDIT$)
540     POKE 5120+(ROW+CREDIT_ROW)*40+C-1,ASC(MID$(CREDIT$,C,1))
550   NEXT C
560   POKE 788,128:POKE 789,SCREEN
570   FOR D=1 TO 10:NEXT D
580 NEXT ROW

590 REM === SECTION 3: FINALE - SPRITE + CREDITS ===
600 FOR FRAME=1 TO 60
610   POKE 788,128:POKE 789,20   ; Display screen 2
620   POKE 53288,0:POKE 53289,36
630   POKE 53248,1
640   XPOS=50+INT(FRAME/3)
650   POKE 53252,XPOS:POKE 53256,100
660   COLOR_INDEX=FRAME MOD 13+1
670   COLOR_INDEX=FRAME+15
680   FOR D=1 TO 5:NEXT D
690 NEXT FRAME
700 PRINT CHR$(147)
710 PRINT "  *** DEMO COMPLETE ***"
720 PRINT "  Thanks for watching!"
730 PRINT "  Press RUN to restart."
740 STOP
```

|| Code | Description |
|------|-------|
| `DIM COLORS(13)` | Array for color cycle values |
| `DIM CRED(10)` | Array for credit text lines |
| `POKE 788,128:POKE 789,20` | Switch display to screen at $1400 |
| `POKE 9216+I,SP(I+1)` | Load sprite frame into graphics buffer |
| `FRAME MOD 13+1` | Cycle through 13 rainbow colors |
| `COLOR_INDEX=(FRAME+Y*3) MOD 13+1` | Color-cycling per row for a wave effect |

## Exercise

1. **Type the full demo program and press RUN. Watch all three sections play in sequence.**
   - Expected output: (1) Rainbow-cycling title with sprite, (2) Scrolling credits on hidden screen, (3) Final screen with sprite and credits together.

2. **Change the sprite position (lines 64-65) to make it fly from left to right across the screen.**
   - Expected output: Sprite flies across from the left side to the right side.

3. **Add 3 more credit lines to the DATA statement (line 150) at the bottom of the credit list.**
   - Expected output: Three additional credits appear in the scroll.

## Practice Challenge

> **Challenge:** Enhance the demo by adding a **second sprite** (sprite 1) with a different frame. Use a second sprite data pointer, load data from a different DATA block, and make it follow the first sprite at a offset position. This requires two sprite buffer regions (e.g., $2400 and $2800) and separate sprite 1 enable/register sets.
> **Hint:** Enable sprite 1 with POKE 53249,1, set its position at $D008+$D009 (53304-53305 = 53260-53261), point its data with $D01C+$D01D (53276-53277), and load frame data into $2800 (decimal 10240).

## Quiz

1. **Where does the demo's color-cycling loop use the color data from?**
   a) Screen memory at $0400
   b) The COLORS array loaded from DATA
   c) The SID chip registers
   d) Sprite data pointer
   **Answer:** b
   **Explanation:** Colors cycle through the COLORS array populated from DATA lines.

2. **What address range holds the sprite graphics buffer?**
   a) $0400-$07E7
   b) $D400-$D41C
   c) $2400-$25FF
   d) $1400-$17E7
   **Answer:** c
   **Explanation:** The sprite graphics buffer at $2400 (decimal 9216) holds sprite data — each frame is 48 bytes.

3. **Which approach creates the multi-screen scrolling credits effect?**
   a) Printing to a different screen address by POKEing $0314-$0315
   b) Using the SID chip to draw scrolling text
   c) Moving the sprite across the screen
   d) Changing the border color rapidly
   **Answer:** a
   **Explanation:** By POKEing the screen base address at $0314-$0315, you can switch between multiple screens and use each for scrolling text.

4. **What is the capstone lesson's main purpose?**
   a) To teach new BASIC commands
   b) To combine all Level 5 concepts into one demo program
   c) To review Level 1 syntax
   d) To introduce the SID chip further
   **Answer:** b
   **Explanation:** The capstone combines arrays, READ/DATA, sprites, multi-screen effects, and color cycling into a single demo.

## Summary

- **Demo programs** combine multiple techniques to create impressive visual effects.
- **Color cycling** is done by POEKing color RAM ($0400+).
- **Multi-screen scrolling** uses $0314-$0315 to switch screen addresses.
- **Sprites** animate by swapping frames in $2400+.
- **Arrays** store game data (credits, colors, positions).
- **READ/DATA** efficiently loads all your demo data.
- **POKE/PEEK** control every visual aspect on the C64.

## What's Next?

Congratulations! You have completed Level 5 — Data Structures & Effects! You now know how to organize game data, animate sprites, scroll text, and build demo effects. In **Level 6: Game Loop & Polish**, you will learn about the **game loop pattern** that ties everything together — timing, user input handling, collision detection, and creating a complete game from start to finish!

See you in Level 6: Game Loop & Polish! 🕹️
