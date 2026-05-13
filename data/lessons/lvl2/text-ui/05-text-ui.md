# Lesson 2.5 — Text UI Patterns: Building Interfaces with PETSCII

## Metadata

| Field | Value |
|-----|--|
| **Level** | 2 |
| **Lesson Number** | 5 |
| **Estimated Time** | ~30 min |
| **Prerequisites** | Lessons 2.1–2.4 (Memory Map, POKE Screen, Color RAM, PETSCI Codes) |
| **Concepts** | Text UI, menu layouts, input forms, decorative headers, status bars, combining all Level 2 techniques |

## Theory

You have learned all the **tools** of Level 2:
- **Screen RAM** at $0400 (where characters live)
- **POKE** to write characters and shapes to the screen
- **Color RAM** at $0680 (what color each character is)
- **PETSCI codes** 128-255 (symbols, arrows, box lines, hearts, blocks)

Now you will learn to **combine** them into **real user interfaces** — the kind you see in classic C64 games and programs!

> **Text UI** means: the interface is made entirely of text characters and colors (no graphics mode). Every button, frame, and display is built with screen memory and PETSCI characters.

### Classic C64 Text UI Pattern: "Header + Frame + Content"

Classic C64 programs use three sections:
1. **Header** — a decorative title bar with box lines or symbols
2. **Frame** — a bordered area for the main content
3. **Content** — the text, numbers, and choices inside the frame

### Making a Menu

Menus use three elements:
- **Arrows** (← ↑ → ↓) to point to the selected option
- **Numbers** (1., 2., 3.) to label each choice
- **Box lines** (─ ─ ─ ┐ ┴ ┴ ┴) to frame the entire menu

### Building a Status Bar

A status bar sits at the bottom of the screen and shows important info (score, lives, turn number). You build it by:
1. **Filling the row** with a box line character (─ or ▬) for the background
2. **POKEing text** on top using the correct Screen RAM address
3. **Coloring with Color RAM** to make the status bar pop

### Positioning Characters Precisely

Every screen position can be calculated:
- Row 0, Col 0 = memory $0400 (decimal 1024)
- Row R, Col C = $0400 + R × 40 + C

```
Screen position = 1024 + (Row * 40) + Col
```

For example, row 12, column 20:
`1024 + (12 × 40) + 20 = 1024 + 480 + 20 = 1524`

## C64 BASIC Examples

### Example 1: A Complete Menu System

```
10 POKE 147
20 REM --- Header ---
30 POKE 1024, 128: POKE 1025, 124: POKE 1026, 117 ' █║I
40 FOR I = 1 TO 77: POKE 1024+I, 196: NEXT I
50 POKE 1024+78, 196: POKE 1024+79, 196
60 PRINT
70 REM --- Frame ---
80 FOR I = 0 TO 28 STEP 2
90   POKE 1024 + 4 * 40 + I, 196
100  POKE 1024 - I * 40, 196: POKE 1024 + I, 196
110 NEXT I
120 FOR I = 0 TO 28
130   POKE 1024 + 4 * 40 + I * 40, 196
140   POKE 1024 + 4 * 40 + I * 40 + 78, 196
150 NEXT I
160 PRINT
170 REM --- Menu Options ---
180 PRINT "  1. START GAME"
190 PRINT "  2. HIGH SCORES"
200 PRINT "  3. CREDITS"
210 PRINT "  4. QUIT"
220 PRINT
230 REM --- Footer ---
240 FOR I = 0 TO 78: POKE 1024 + 14 * 40 + I, CHR$(128): NEXT I
250 END
```

### Example 2: Status Bar at Bottom of Screen

```
10 POKE 147
20 REM --- Status Bar ---
30 FOR I = 0 TO 39
40   POKE 1024 + I, 176
50   POKE 1664 + I, 8
60 NEXT I
70 POKE 1024 + 0, 32: POKE 1024 + 1, 32: POKE 1024 + 2, 32: POKE 1024 + 3, 32
80 PRINT "SCORE: 999999"
90 PRINT "LIVES:  3"
100 PRINT "LVL:    7"
110 PRINT "TIME:   59"
120 END
```

### Example 3: Decorative Title with Box Lines

```
10 POKE 147
20 PRINT "=== MY GAME ==="
30 FOR I = 0 TO 29
40   POKE 1024 + 16 + I, CHR$(196)
50 NEXT I
60 PRINT "   THE ADVENTURE"
70 PRINT "   OF PETSCI"
80 FOR I = 0 TO 30
90   POKE 1024 + 22 + I, CHR$(196)
100 NEXT I
110 PRINT "    = END ="
120 END
```

### Example 4: Interactive Text Form

```
10 PRINT "=== PLAYER SETUP ==="
20 PRINT
30 PRINT "Enter your name:"
40 INPUT "  Name: "; NAME$
50 PRINT "Enter your class:"
60 INPUT "  Class: "; CLASS$
70 PRINT
80 PRINT "Welcome"; NAME$; " the"; CLASS$; "!"
90 PRINT "Your quest begins..."
100 END
```

### Example 5: Full Text Dashboard

```
10 POKE 147
20 REM --- Dashboard Layout ---
30 REM Title
40 PRINT "= == DASH BOARD == ="
50 FOR I = 0 TO 38: POKE 1024+I+16, CHR$(196): NEXT I
60 PRINT
70 REM --- Stats Panel ---
80 PRINT "CHARACTER: MARIO"
90 PRINT "CLASS: WARRIOR"
100 PRINT "LEVEL: 15"
110 PRINT
120 PRINT "HP: 150/150"
130 PRINT "MP: 45/100"
140 PRINT "GOLD:  2500"
150 PRINT
160 PRINT "  [1] INVENTORY  "
170 PRINT "  [2] SPELLS     "
180 PRINT "  [3] STATUS     "
190 PRINT "  [4] QUIT       "
200 PRINT
210 FOR I = 0 TO 38: POKE 1024+36+I, CHR$(196): NEXT I
220 PRINT "= == END == ="
230 END
```

## Exercise

### Step 1: Build a Score Display

Create a score display with a colored background bar:

```
10 POKE 147
20 PRINT "= SCORE DISPLAY ="
30 FOR I = 0 TO 25: POKE 1024 + I + 4, CHR$(196): NEXT I
40 PRINT "Score: 4200"
50 FOR I = 0 TO 25: POKE 1024 + I + 12, CHR$(196): NEXT I
60 PRINT "= DONE = "
70 END
```

### Step 2: Draw a Box Around Your Name

```
10 POKE 147
20 PRINT "    MY NAME  "
30 FOR I = 0 TO 20: POKE 1024 + I + 24, CHR$(186): NEXT I
40 FOR I = 0 TO 40: POKE 1024 + I + 26, CHR$(186): PRINT CHR$(196): NEXT I
50 FOR I = 0 TO 20: POKE 1024 + I + 28, CHR$(186): NEXT I
60 PRINT "  YOUR NAME  "
70 FOR I = 0 TO 20: POKE 1024 + I + 30, CHR$(186): NEXT I
80 END
```

(Use PETSCI box characters: 196 = ─, 186 = │, 120 = ✓, 200 = ═)

### Step 3: Create a Full Menu System

Write a complete menu system with:
- Top decorative header (box lines)
- Title with frame
- 4 numbered options with arrows
- Bottom decorative footer (box lines)
- A "press any key to continue" prompt at the end

## Practice Challenge

> **Challenge:** Build a **C64-style Text Adventure Interface** with:
>
> 1. A decorative title bar using PETSCI box lines and symbols
> 2. A framed content area showing the room description
> 3. An input prompt inside the frame
> 4. A status bar at the bottom with score, lives, and turn number
> 5. A menu with numbered choices using arrow characters (← →) pointing to the selected option
> 6. Use `CHR$()` to put the decorations (hearts, stars, arrow characters) in the right spots
>
> **Hints:**
> - Use row 2 for the header, row 22 for the content, row 24 for the status bar
> - `FOR I = 0 TO 39: POKE 1024+I, 196: NEXT I` draws a horizontal line
> - The input prompt can use `INPUT` with a colored frame
> - Use `FOR I = 0 TO 25: POKE 1024+I, 32: POKE 1664+I, 12: NEXT I` for a green bar background

**Sample solution:**
```
10 POKE 147
20 REM === HEADER ===
30 FOR I = 0 TO 37: POKE 1024 + I, CHR$(196): NEXT I
40 PRINT "  THE CAVE OF PETSCI  "
50 FOR I = 0 TO 37: POKE 1024 + I + 1, CHR$(196): NEXT I
60 PRINT
70 REM === ROOM DESCRIPTION ===
80 PRINT "You are in a dark cave."
90 PRINT "You see a chest (1) and a door (2)."
100 PRINT
110 PRINT "Choose your action:"
120 PRINT ""
130 PRINT "  ← [1] Open the chest"
140 PRINT "  [2] Go through the door"
150 PRINT "  [3] Inspect the walls"
160 PRINT
170 REM === INPUT ===
180 INPUT "Choice: "; ACTION
190 IF ACTION = 1 THEN PRINT "You found 100 gold!"
200 IF ACTION = 2 THEN PRINT "The door opens to a new room!"
210 IF ACTION = 3 THEN PRINT "The walls have PETSCI symbols!"
220 PRINT
230 REM === STATUS BAR ===
240 FOR I = 0 TO 37: POKE 1024 + I + 22, CHR$(196): NEXT I
250 PRINT "= SCORE: 0  LIVES: 3  TURN: 1 ="
260 END
```

## Quiz

**1. What is the advantage of using PETSCI box-drawing characters over simple text for UIs?**
a) They take less memory
b) They make borders and frames look professional and visually structured
c) They are faster to write
d) They can be played on a C64 emulator

**Answer:** b
**Explanation:** Box-drawing characters (─ │ ╔ ╗ ╚ ╝ ├ ┤) create clean, structured borders that make text UIs look like real game interfaces.

**2. What is the formula for Screen RAM position?**
a) `ScreenPos = 1024 + Col * 40 + Row`
b) `ScreenPos = 1024 + Row * 40 + Col`
c) `ScreenPos = 1024 + Row + Col`
d) `ScreenPos = 1024 + Row * 25 + Col`

**Answer:** b
**Explanation:** Row is more significant because each row is 40 characters wide. Position = 1024 + (Row × 40) + Col.

**3. Which PETSCI code is typically the horizontal line character (─)?**
a) 186
b) 128
c) 196
d) 96

**Answer:** c
**Explanation:** Code 196 = ─ (horizontal line). Code 186 = │ (vertical line). Code 128 = █ (full block).

**4. What is a "status bar" in a text UI?**
a) It's the list of game options
b) It's a row at the bottom showing score, lives, and other information
c) It's a line drawn above the title
d) It's the color RAM

**Answer:** b
**Explanation:** A status bar is a fixed row at the bottom of the screen displaying important game info (score, lives, level, time).

## Summary

- **Text UI** uses box lines (─ │ ╔ ╗ ╚ ╝), arrows (← → ↑ ↓), block graphics (█ ░ ▒), and color RAM to build complete interfaces
- **Positioning** is done with the formula `1024 + (Row × 40) + Col`
- **Menus** use numbers (1., 2., 3.), arrows (→), and frames (box lines) as classic C64 style
- **Status bars** show score, lives, turn number at the bottom of the screen
- **All Level 2 techniques** — Screen RAM, POKE, Color RAM, PETSCI codes — combine to create full text-based user interfaces!

## What's Next?

Congratulations! 🎉 You have completed **Level 2** — you now know how to POKE memory, color every character, use the full PETSCI character set, and build your own text-based user interfaces!

You have mastered all the building blocks of C64 BASIC and the C64's display system. Ready to apply them to real programs?

In **Level 3** you will use sprites — the C64's powerful character graphics — to create animated games. You will learn how to define your own sprite shapes, move them around the screen, and even make them interact!

See you in **Level 3 — Sprites & Movement!** 🎮
