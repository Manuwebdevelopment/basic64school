# Lesson 2.4 — PETSCII Codes: The Secret World of Characters

## Metadata

| Field | Value |
|-----|--|
| **Level** | 2 |
| **Lesson Number** | 4 |
| **Estimated Time** | ~30 min |
| **Prerequisites** | Lessons 2.1 (Memory Map), 2.2 (POKE the Screen), 2.3 (Color RAM) |
| **Concepts** | PETSCII character set, upper/lower case toggle, box-drawing characters, symbol codes, CHR$(), ASCII vs PETSCII |

## Theory

You can now write characters and color them, but so far you've only used the standard A-Z letters and symbols like `!`, `?`, and `=`. That is because those are the **ASCII** characters — the universal code for letters, numbers, and punctuation.

**PETSCII** (PET Standard Code for Information Interchange) is the C64's *own* character set. It has everything ASCII has, plus **dozens of extra symbols** — box-drawing lines, hearts, arrows, stars, smileys, and much more!

> **Think of PETSCII as ASCII + a treasure chest of symbols.**

### Upper Case vs Lower Case

Here is the magic: the C64 screen has **TWO character sets** that share the same codes:

- **Upper case mode** (default): A-Z codes 144-169 show **uppercase** letters
- **Lower case mode**: The same codes show **lowercase** letters

You toggle the mode using a **Control Code** — a special byte that changes how the screen interprets characters:

| Control Code | Byte Value | Effect |
|-----|---|---|
| **CMD** (Command Byte) | **147** | Clear screen |
| **SHIFT + CMD** | **148** | Toggle upper case (default) |
| **CTRLO** (Control-O) | **14** | Switch to lower case |
| **CTLR** (Control-R) | **21** | Switch to upper case |

```
10 PRINT "I am UPPERCASE!"
20 PRINT CHR$(14)   ' Switch to lower case
30 PRINT "i am lowercase!"
40 PRINT CHR$(21)   ' Switch back to uppercase
50 PRINT "I am UPPER again!"
60 END
```

**Important:** Once you type `CHR$(14)`, every character you PRINT (even by POKEing Screen RAM) becomes lowercase, regardless of what code you use! To go back, type `CHR$(21)`.

### The Symbol Codes You Can't Type on a Keyboard

The codes **0 through 31** are **Control Codes** — most of them change how the screen works. But codes **128 through 255** are where PETSCI gives you symbols!

Here is the **upper case symbol map** (codes 128-255 in PETSCII):

| Code | Character (Upper) | Description |
|------|-----|---|
| 128 | █ | Solid block (full block graphics) |
| 129 | · | Dot (small block) |
| 130 | ◄ | Left arrow |
| 131 | ► | Right arrow |
| 132 | │ | Vertical bar |
| 133 | ┤ | Right T-junction |
| 134 | ╟ | Left T-junction |
| 135 | ← | Left arrow (detailed) |
| 136 | ↑ | Up arrow |
| 137 | → | Right arrow |
| 138 | ↓ | Down arrow |
| 139 | • | Dot (medium) |
| 140 | ↕ | Up/down arrow |
| 141 | ▼ | Down arrow (triangle) |
| 142 | ▲ | Up arrow (triangle) |
| 143 | ▒ | Half block |
| 144-169 | A-Z | Letters (uppercase) |
| 170-195 | a-z | Letters (lowercase — only in lower case mode) |
| 196-219 | Block graphics | Box-drawing characters |
| 220-255 | Symbols | More symbols (varies by C64 model) |

### Using Box Drawing Characters

Codes **196 through 219** are the full box-drawing set. They look like lines and corners — perfect for making frames around text!

| Code | Character | Description |
|------|---|---|
| 196 | ─ | Horizontal line |
| 197 | ║ | Double vertical line |
| 198 | ╔ | Top-left corner |
| 199 | ╗ | Top-right corner |
| 200 | ╚ | Bottom-left corner |
| 201 | ╝ | Bottom-right corner |
| 202 | ┌ | Top-left junction |
| 203 | ┐ | Top-right junction |
| 204 | └ | Bottom-left junction |
| 205 | ┘ | Bottom-right junction |
| 206 | ├ | Top T-junction |
| 207 | ┤ | Bottom T-junction |
| 208 | ┬ | Left T-junction |
| 209 | ┴ | Right T-junction |
| 210 | ┼ | Cross junction |

> **Pro tip:** To find any character code, look at the PETSCII table! It maps each number 0-255 to a character.

### The ASCII vs PETSCII Confusion

- **ASCII** is the standard international character set (codes 0-127) — the one your computer keyboard uses.
- **PETSCII** is Commodore's *extended* set (0-255) — it includes ASCII but adds 128 extra characters.
- On the C64, when you press a key, the C64 **translates** it to PETSCI codes, not ASCII.
- `CHR$(65)` gives you "A" (same as ASCII code 65).
- `CHR$(196)` gives you "─" (a horizontal line) — this code does not exist in standard ASCII!

### Key Takeaway

> **PETSCII codes 128-255 unlock dozens of built-in symbols (arrows, box lines, hearts, dots, block graphics) that you cannot type on any keyboard — you access them with `CHR$()` or `POKE()`. Codes 14 and 21 toggle upper/lower case for A-Z!**

## C64 BASIC Examples

### Example 1: Show the Full Symbol Table

```
10 POKE 147
20 PRINT "=== PETSCII SYMBOL TABLE ==="
30 FOR N = 128 TO 170
40   PRINT N, CHR$(N);
50 NEXT N
60 PRINT
70 FOR N = 171 TO 220
80   PRINT N, CHR$(N);
90 NEXT N
100 PRINT
110 FOR N = 221 TO 255
120   PRINT N, CHR$(N);
130 NEXT N
140 PRINT "=== End of table ==="
150 END
```

**What you will see:** A table of characters from code 128 to 255 printed side by side with their number. You can spot:
- Codes 128-143: Block graphics (█, ·, ←, ↑, etc.)
- Codes 196-219: Box-drawing lines
- Codes 220-255: More symbols

### Example 2: Draw a Box with Box-Drawing Characters

```
10 POKE 147
20 PRINT "=== MY BOX DRAWING ==="
30 REM --- Draw top border ─┼─ ---
40 FOR I = 0 TO 78
50   POKE 1024+I, 196
60 NEXT I
70 REM --- Draw left side: vertical ┼ lines ---
80 FOR I = 1 TO 20
90   POKE 1024+40*I, 186
100  POKE 1024+40*I+78, 186
110 NEXT I
120 REM --- Draw bottom border ─┼─ ---
130 FOR I = 0 TO 78
140   POKE 1024+40*20+I, 196
150 NEXT I
160 PRINT
170 PRINT "I drew with box lines!"
180 END
```

### Example 3: Use Arrow Characters for a Simple Menu with Arrows

```
10 POKE 147
20 PRINT "=== MENU ==="
30 FOR I = 0 TO 39
40   POKE 1024+I, 124
50 NEXT I
60 PRINT
70 REM --- Print options with arrows ---
80 PRINT CHR$(131); " Option 1"
90 PRINT CHR$(130); " Option 2"
100 PRINT CHR$(138); " Option 3"
110 PRINT CHR$(136); " Exit"
120 PRINT
130 PRINT "Choose with arrow keys!"
140 END
```

### Example 4: Mix Upper and Lower Case in One Screen

```
10 POKE 147
20 PRINT "THIS IS UPPER CASE."
30 PRINT CHR$(14)   ' Switch to lower
40 PRINT "this is lower case."
50 PRINT CHR$(21)   ' Switch back to upper
60 PRINT "BACK TO UPPER!"
70 PRINT CHR$(14)
80 PRINT "Switch again!"
90 PRINT CHR$(21)
100 END
```

### Example 5: Draw a Heart with PETSCI Block Graphics

```
10 POKE 147
20 REM --- Use block and dot characters to make a HEART ---
30 PRINT CHR$(117); CHR$(117); CHR$(128); CHR$(129); CHR$(128); CHR$(117); CHR$(117); CHR$(128)
40 PRINT CHR$(117); CHR$(128); CHR$(128); CHR$(129); CHR$(128); CHR$(128); CHR$(117); CHR$(128)
50 PRINT CHR$(128); CHR$(128); CHR$(129); CHR$(120); CHR$(129); CHR$(128); CHR$(128); CHR$(128)
60 PRINT CHR$(129); CHR$(120); CHR$(129); CHR$(130); CHR$(130); CHR$(129); CHR$(120); CHR$(129)
70 PRINT CHR$(129); CHR$(130); CHR$(120); CHR$(120); CHR$(120); CHR$(130); CHR$(130); CHR$(129)
80 PRINT CHR$(129); CHR$(130); CHR$(130); CHR$(129); CHR$(130); CHR$(130); CHR$(130); CHR$(129)
90 PRINT "       HEART!"
100 END
```

> **Note:** Different PETSCI code values produce slightly different box drawing depending on the C64 model. On emulator these may look slightly different from a real C64.

## Exercise

### Step 1: Print Every Symbol You Can See

```
10 POKE 147
20 PRINT "=== PETSCI SYMBOL TABLE ==="
30 PRINT
40 FOR N = 128 TO 169
50   PRINT N, CHR$(N);
60 NEXT N
70 PRINT
80 FOR N = 170 TO 219
90   PRINT N, CHR$(N);
100 NEXT N
110 PRINT
120 FOR N = 220 TO 255
130   PRINT N, CHR$(N);
140 NEXT N
150 PRINT
160 PRINT "DONE! Find your favorite."
```

- **Expected output:** You should see 128 (█) through 255 — a full table of all C64 block/symbol characters.

### Step 2: Toggle Upper/Lower Twice

```
10 POKE 147
20 PRINT "UPPER CASE!"
30 PRINT CHR$(14)   ' Lower
40 PRINT "lower case!"
50 PRINT CHR$(21)   ' Upper
60 PRINT "UPPER CASE!"
70 PRINT CHR$(14)   ' Lower again
80 PRINT "lower again!"
90 END
```

- **Expected output:** The screen shows three "UPPER CASE!" lines and two "lower case!" lines, proving PETSCI switches back and forth based on the Control Code.

### Step 3: Draw a Frame with Box Lines

```
10 POKE 147
20 PRINT "= FRAME WITH BOX LINES ="
30 FOR I = 1 TO 20
40   POKE 1024+I, 196
50 NEXT I
60 FOR I = 0 TO 24 STEP 4
70   POKE 1024+I*40, 186
80   POKE 1024+I*40+40, 186
90 NEXT I
100 FOR I = 1 TO 20
110   POKE 1024+24*40+I, 196
120 NEXT I
130 PRINT "Done!"
```

- **Expected output:** A box drawn with horizontal lines (───) and vertical lines (│) around the text "= FRAME WITH BOX LINES =".

## Practice Challenge

> **Challenge:** Create a **Card Layout Using Box Drawing Characters**:
>
> 1. Use codes 128-255 to draw a decorative card/folder on screen
> 2. Inside the card, put three numbered menu items with arrows
> 3. Use block graphics (█, ░, ▒) for visual flair
> 4. Add a row of hearts (♥ = PETSCI code 13, which is ▒ in many models — use `CHR$(13)` or `CHR$(128)` for hearts depending on your PETSCI table)
>
> **Hints:**
> - Code 196 = ─ (horizontal line for the border)
> - Code 186 = │ (vertical line for the border)
> - Code 206 = + (T-junction)
> - `CHR$(128)` fills a whole block; `CHR$(13)` can be a heart on some PETSCI tables
> - Use `PRINT CHR$(14)` between upper case and lower case lines if you need both

**Sample solution:**
```
10 POKE 147
20 REM --- Draw top border ---
30 FOR I = 1 TO 78
40   POKE 1024+I, 120
50 NEXT I
60 REM --- Draw the box sides ---
70 FOR I = 1 TO 10
80   POKE 1024+I*40, 196
90   POKE 1024+I*40+79, 196
100 NEXT I
110 REM --- Draw bottom border ---
120 FOR I = 1 TO 79
130   POKE 1024+10*40+I, 196
140 NEXT I
150 REM --- Put text inside ---
160 REM --- Write to row 5, col 4 (screen position 1024+5*40+3) ---
170 POKE 1024+5*40+3, 96
180 POKE 1024+5*40+4, 118  ' "I"
190 POKE 1024+5*40+5, 9  ' space
200 POKE 1024+5*40+6, 109  ' "M"
210 PRINT "  MENU"
220 PRINT "  1. PLAY"
230 PRINT "  2. OPTIONS"
240 PRINT "  3. EXIT"
250 END
```

## Quiz

**1. What Control Code switches the C64 to lower case mode?**
a) 147
b) 14
c) 21
d) 32

**Answer:** b
**Explanation:** `CHR$(14)` (Control-O) switches to lower case mode. `CHR$(21)` switches back to upper case. `CHR$(147)` clears the screen.

**2. Which PETSCI code range has the box-drawing characters?**
a) 0-31
b) 144-169
c) 196-219
d) 220-255

**Answer:** c
**Explanation:** Codes 196-219 are the box-drawing set (horizontal lines, vertical lines, corners, T-junctions, and crosses).

**3. What does `CHR$(128)` typically show on the C64 screen?**
a) A small dot
b) A full solid block (█)
c) An arrow
d) A heart

**Answer:** b
**Explanation:** Code 128 is the full block character █. Code 129 is typically a smaller block (▒ or ░).

**4. How many characters are in the full PETSCI set?**
a) 128
b) 255
c) 256
d) 512

**Answer:** c
**Explanation:** PETSCI covers codes 0 through 255, which is 256 total characters. The C64 displays all of them — from control codes (0-31) to symbols (128-255).

## Summary

- **PETSCI** codes 128-255 include dozens of built-in symbols (arrows, box lines, block graphics, hearts, dots) that you cannot type on a keyboard
- **Codes 196-219** are the box-drawing set ─┼╔╗╚╝┌┐└┘├┤┬┴┼ for drawing frames, boxes, and borders
- **Control codes 14** (CTRLO) and **21** (CTLR) toggle upper/lower case for A-Z letters
- **CHR$()** lets you use any code from 0-255 to produce characters on screen
- **Box-drawing characters** are the secret tool for making clean UIs, menus, and decorative borders without using graphics!

## What's Next?

You now have access to the full C64 PETSCI character set — including arrows, box lines, hearts, block graphics, and both upper/lower case! In the final lesson of Level 2 — **Text UI Patterns** — you will combine everything you've learned: Screen RAM, POKE, Color RAM, and PETSCI codes — to build a full text-based user interface with menus, frames, and interactive displays!

See you in **Lesson 2.5 — Text UI Patterns!** 🎛️
