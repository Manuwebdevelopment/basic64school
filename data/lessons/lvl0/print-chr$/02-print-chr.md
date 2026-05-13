# Lesson 0.2 — PRINT & CHR$(): Making Your C64 Say Anything

## Metadata

| Field | Value |
|-----|-----|
| **Level** | 0 |
| **Lesson Number** | 2 |
| **Estimated Time** | ~30 min |
| **Prerequisites** | Lesson 0.1 (Welcome) |
| **Concepts** | PRINT, CHR$, PETSCII character codes, screen clearing, special characters, border/background colors |

## Theory

Now that you know the C64 screen is 40 columns wide and can display lots of colorful messages, it's time to learn the two most important tools in a programmer's toolkit: **PRINT** and **CHR$()**.

### The PRINT Command — Your Computer's Voice

Think of PRINT like a voice box on a doll. When you tell the doll what to say, it repeats your words exactly. That's what PRINT does — it takes whatever you put between the quotes and displays it on the screen, character by character, from left to right.

```
PRINT "Hello, world!"
```

The C64 reads your words from left to right and prints each letter on the screen. When it runs out of things to say, it moves to the next line and waits for you to print something else.

### CHR$() — The Character Code Translator

Here's the secret: every character on the C64 screen is a number. The letter `A` isn't really an "A" — it's the number 65. A space is 32. And the screen-clearing character is 147.

**CHR$()** translates a number into its matching character. It's like a secret decoder ring:

| Number | CHR$(N) | What it looks like |
|--------|---------|-------------------|
| 65 | CHR$(65) | A |
| 32 | CHR$(32) | (a space) |
| 48 | CHR$(48) | 0 (the number zero!) |

When you type `CHR$(65)`, the C64 says "Oh! Number 65 is the letter A!" and prints it for you. You can use CHR$() to print any character you want — even ones that are tricky to type on a keyboard!

### Printing Special Characters

The C64 has lots of special characters that you can't type directly. These include arrows (◄▲►▼), boxes, smiley faces, and more. They all have their own number codes. Here are some you can use right away:

| PETSCII Code | Character | What it is |
|:------------:|:---------:|------------|
| 142 | ► | Right arrow |
| 143 | ▼ | Down arrow |
| 144 | ◄ | Left arrow |
| 145 | ▲ | Up arrow |
| 147 | (blank) | Clear the screen |
| 148 | ◄▼► | Multi-arrow symbol |
| 157 | ◘ | Circle |
| 159 | ○ | Ring |
| 175 | — | Line (horizontal bar) |

### Screen Clearing — The Art of Starting Fresh

You learned that `CHR$(147)` clears the screen. There's actually another way: use the `CLR` command!

```
PRINT "Before!":PRINT CHR$(147):PRINT "After!"
```

The colon `:` acts like a tiny ENTER key — it lets you press multiple commands on one line. The first `PRINT` shows a line, the second `PRINT CHR$(147)` clears the screen, and the third shows your second message.

### Border and Background Colors

The C64 has two color controls:

- **Border** at address 53281 (POKE 53281, R) — the thick frame around the screen
- **Background** at address 53280 (POKE 53280, R) — the color behind the text

Both use the same 0-15 color palette. The C64 has 1,048,576 unique colors (65,536 pairs of border + background). The border color is stored at 53281, and the background color at 53280 — but you can only *change* them one at a time with POKE.

---

### Key Takeaway

> **PRINT displays text, CHR$() converts numbers into characters (even special PETSCII symbols), and together they let you say *anything* your C64 can show — including clearing the screen and drawing with characters!**

## C64 BASIC Examples

### Example 1: Using CHR$() to print numbers-as-letters

```
10 PRINT "The letter A is:"; CHR$(65)
20 PRINT "The number 0 is:"; CHR$(48)
30 PRINT "A special arrow is:"; CHR$(142)
40 PRINT CHR$(9); CHR$(148); "HELLO"; CHR$(9); CHR$(147)
```

**Run this and watch:**

| Code | Description |
|------|--------------|
| `CHR$(65)` | Prints the letter A |
| `CHR$(48)` | Prints the number 0 |
| `CHR$(142)` | Prints a right-pointing arrow ► |
| `CHR$(9)` | A TAB character (indent) |
| `CHR$(147)` | Clears the screen |
| `;` at the end | Keeps printing on the SAME line (no new line) |

Notice the semicolons! In Example 4 (the last line), all the PRINTs stay on one line because of the semicolons. Without them, each one would jump to a new row.

### Example 2: Drawing with PETSCII characters

```
10 PRINT CHR$(16); CHR$(16); CHR$(16);
20 PRINT "=== HELLO ==="
30 PRINT "= BASIC64 ="; CHR$(16);
40 PRINT "=== C64 ==="
50 PRINT CHR$(16); CHR$(16); CHR$(16);
60 PRINT CHR$(16); "HAVE FUN!"; CHR$(16);
70 PRINT CHR$(17); CHR$(17); CHR$(17);
```

| Code | Description |
|------|--------------|
| `CHR$(16)` | Box corner (top-left) |
| `CHR$(17)` | Box corner (bottom-left) |
| `=`, `=` | Horizontal box lines |
| `;` | Don't go to a new line |

The characters 16 and 17 are box-drawing characters that let you create frames around your text — like a picture frame built from letters!

### Example 3: Print the full arrow set

```
10 PRINT "=== ARROW KEYBOARD ==="
20 PRINT "Up arrow:"; CHR$(145)
30 PRINT "Down arrow:"; CHR$(143)
40 PRINT "Left arrow:"; CHR$(144)
50 PRINT "Right arrow:"; CHR$(142)
60 PRINT "All together:"; CHR$(145); CHR$(143); CHR$(144); CHR$(142)
```

This prints all four arrow directions. Each arrow is a single character code!

### Example 4: Screen-clearing with style

```
10 PRINT "=== BEFORE CLEARING ==="
20 PRINT "Here is some text."
30 PRINT "It is on the screen."
40 PRINT CHR$(147)
50 PRINT "=== AFTER CLEARING ==="
60 PRINT "Everything is gone!"
70 PRINT "Except this line."
```

| Code | Description |
|------|-------------|
| Lines 10-30 | Print some text lines |
| Line 40 | Clear the entire screen |
| Lines 50-70 | New text on a clean screen |

Lines 1-3 appear first. When line 40 runs, everything disappears. Then lines 5-7 print at the very top.

### Example 5: Color the border and background

```
10 POKE 53280,5    ' Set background to blue
20 POKE 53281,14   ' Set border to light blue
30 PRINT CHR$(147) ' Clear screen
40 PRINT "LOOK AT MY COLORS!"
```

| Code | Description |
|------|-------------|
| `POKE 53280,5` | Background color blue |
| `POKE 53281,14` | Border color light blue |
| `CHR$(147)` | Clear the screen |
| `PRINT` | Display text on the colored background |

### Key Takeaway Box

> **PRINT** is how you get the C64 to talk. **CHR$()** is how you get it to say things that don't have buttons on the keyboard. **POKE** changes the color around the screen. You now have the three basic tools of C64 programming!

## Exercise

1. **Type Example 1 above. Run it. Notice how `CHR$(142)` prints a right arrow.**
   - Expected output: Four lines of text showing different character codes and their symbols, plus one line with all arrows together.

2. **Add a new line to Example 1: `55 PRINT "My favorite is"; CHR$(159)` and run again. What appears?**
   - Expected output: A new line showing a circle character (○). You've printed your first shape!

3. **Type Example 3 (arrows). Run it. Now try typing just `PRINT CHR$(148)` alone. What cool multi-arrow do you get?**
   - Expected output: A combined arrow symbol that looks like ◄▼►

4. **Type Example 5 (colors). Run it. Now modify it: change the border to 6 (magenta) and the background to 15 (light gray). Run again. What do you see?**
   - Expected output: Light gray background with a magenta border and your message printed on top.

5. **Create your own character drawing. Use box characters (16, 17) and lines (18, 19) to make a box that says "HELLO" inside. Use line number 10 as your starting line.**
   - Expected output: A box shape made from PETSCII characters with the word HELLO centered inside.

## Practice Challenge

> **Challenge:** Create a "character art card" — a colorful framed message that uses at least:
> - Box-drawing characters (top, bottom, and side frames)
> - At least 3 different special PETSCII characters
> - A border color changed with POKE
> - A screen clear at the beginning
>
> **Start with this skeleton:**
> ```
> 10 POKE 53281,6       ' Magenta border
> 20 PRINT CHR$(147)    ' Clear screen
> 30 PRINT "MY CHAR CARD"
> 40 PRINT CHR$(159) " " CHR$(158) " " CHR$(145)
> 50 PRINT " " CHR$(149) " BASIC64 " CHR$(149)
> 60 PRINT " " CHR$(158) " " CHR$(159)
> 70 PRINT "WOW! PETSCII ART!"
> ```
>
> **Your job:** Fill in the gaps! Choose your own colors, add more character art lines, and make it YOURS. The goal is to create one cool card that shows off the special characters you've learned.

## Quiz

1. **What does `CHR$(65)` display on screen?**
   a) 65
   b) The letter A
   c) A space
   d) Nothing
   **Answer:** b
   **Explanation:** In PETSCII, code 65 is the uppercase letter A. CHR$() translates numbers into their character equivalents.

2. **How do you clear the C64 screen?**
   a) `CLS`
   b) `PRINT CHR$(147)`
   c) `POKE 53281,0`
   d) `PRINT " "`
   **Answer:** b
   **Explanation:** PETSCII code 147 is the "clear screen" command. `PRINT CHR$(147)` sends that command to the screen.

3. **What does the semicolon (`;`) do at the end of a PRINT statement?**
   a) It ends the line
   b) It multiplies the text
   c) It keeps the next PRINT on the same line
   d) It prints a question mark
   **Answer:** c
   **Explanation:** A semicolon at the end of PRINT keeps the cursor on the same line. The next PRINT continues right after the last character instead of jumping to the next line.

4. **Which addresses control the C64 colors?**
   a) 53240 and 53241
   b) 53280 and 53281
   c) 54000 and 54001
   d) 50000 and 50001
   **Answer:** b
   **Explanation:** Address 53280 controls the background color and 53281 controls the border color. These are fixed VIC-II chip memory locations.

5. **What character does `CHR$(145)` print?**
   a) Right arrow
   b) Down arrow
   c) Up arrow
   d) Circle
   **Answer:** c
   **Explanation:** PETSCII code 145 is the UP arrow (▲). The four arrow codes are 142 (right), 143 (down), 144 (left), and 145 (up).

## Summary

- **PRINT** displays text and messages on the C64 screen
- **CHR$(code)** converts a number into its matching character — use it for special PETSCII symbols you can't type directly
- **CHR$(147)** clears the entire screen — press the computer's "erase all" button
- **Colon (:)** lets you put multiple commands on one line
- **Semicolon (;)** keeps output on the same line instead of jumping to a new one
- **POKE 53280, R** changes the background color (0-15)
- **POKE 53281, R** changes the border color (0-15)
- PETSCII characters 142-145 are the four arrow keys (►▼◄▲)
- The C64's 40×25 screen is your canvas — PRINT and CHR$() are your paintbrush!

## What's Next?

In Lesson 0.3 you're going to learn about **POKE and memory** — the real magic of the C64! You'll discover how the computer remembers everything inside its 38,914 bytes of RAM, and how you can write directly into memory to change text, graphics, and even make sounds. You'll start by poking characters into the screen memory (starting at address 1024) and making your own pixel art — no sprite tools needed.

Get ready to become a memory wizard! ✨🪄

See you in Lesson 0.3 — POKE and Memory POKING!
