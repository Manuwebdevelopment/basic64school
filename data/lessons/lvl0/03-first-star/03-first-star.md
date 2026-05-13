# Lesson Cap — First Star: Your First C64 Game!

## Metadata

| Field | Value |
|-----|-----|
| **Level** | 0 |
| **Lesson Number** | Cap |
| **Estimated Time** | ~35 min |
| **Prerequisites** | Lesson 0.1 (Welcome to the C64), Lesson 0.2 (PRINT & CHR$), POKE basics, screen memory addresses |
| **Concepts** | Variables for coordinates, screen memory address calculation, POKE to screen memory, CHR$() special characters, combining tools into a mini "game" |

## Theory

Welcome to the final lesson of Level 0! This is where everything comes together. So far you've learned to make the C64 talk (PRINT), translate numbers into characters (CHR$()), write directly into memory (POKE), and change the screen's colors. Now you are going to combine all of those tools into your very first "game" — a program that lets you pick any spot on the screen and place a glowing star there.

Think of the C64 screen like a giant grid of mailboxes. There are 40 mailboxes across and 25 mailboxes down — that's 1,000 mailboxes total, numbered from left to right, top to bottom. Each mailbox holds one character. When you POKE a character code into a mailbox, that character appears on the screen at that exact spot. **This is how every text-based game worked on the C64!**

Here's the clever part: each mailbox has a real memory address. Mailbox 0 is at address 1024, mailbox 1 is at 1025, and so on. To find the address of any mailbox, you use this formula:

    1024 + (row × 40) + column

That's it! If you want the star at row 5, column 20, the address is 1024 + (5 × 40) + 20 = **1264**. And you place the star by POKEing the character code for the star symbol into address 1264.

But first, you need a blank canvas. You clear the screen with `PRINT CHR$(147)`, just like erasing a whiteboard before drawing on it. Then you pick your coordinates using **variables** — named storage spots for numbers. Variables are like little labeled boxes that hold onto their value until the end of the program.

Let's build it, step by step.

### Key Takeaway

> **Variables store your coordinates, the screen memory formula `1024 + row × 40 + column` finds the right mailbox, and POKE writes a character into that mailbox — turning your program into a tiny star-placement game!**

### The Screen Memory Map

The C64 uses the memory addresses **1024 through 2023** (1,000 total) as the text screen. Each position maps like this:

| Position | Row | Column | Screen Memory Address |
|-----|--|-----|---|-----|
| Top-left corner | 0 | 0 | 1024 |
| Top-right corner | 0 | 39 | 1063 |
| Middle of screen | 12 | 20 | 1544 |
| Bottom-left corner | 24 | 0 | 1984 |
| Bottom-right corner | 24 | 39 | 2023 |

The pattern is simple: every row has 40 positions, so to find a row you multiply by 40 and add to the base address 1024.

### Using Variables to Pick Coordinates

A variable is a named container for a number. You create one simply by using it in an assignment:

    X = 20
    Y = 10

Now the C64 remembers that X is 20 and Y is 10. You can use them anywhere — in POKE, in PRINT, in arithmetic. When you write `POKE 1024+Y*40+X, 42`, the C64 figures out the full address first (1024 + 10×40 + 20 = 1444), then writes the number 42 (the asterisk, which we'll use as our star symbol) into that memory location.

The magic of variables is flexibility: change `X = 20` to `X = 35` and the star moves! Change nothing else, and the rest of your program still works perfectly.

## C64 BASIC Examples

### Example 1: Place a star in the middle of the screen

```
10 PRINT CHR$(147)
20 X = 20
30 Y = 12
40 POKE 1024+Y*40+X, 42
50 PRINT "STAR PLACED!"
60 PRINT CHR$(147)
```

**How to run:** Type these lines one by one, then press RUN. You should see a star `*` appear right in the center of your screen.

|| Code | Description |
|------|-------|
| Line 10 | Clear the screen first — start with a blank canvas |
| Line 20 | Store 20 in variable X (horizontal position, center-ish) |
| Line 30 | Store 12 in variable Y (vertical position, center-ish) |
| Line 40 | **The star!** POKE asterisk (42) at address = 1024 + Y×40 + X |
| Line 50 | Confirmation message |
| Line 60 | Clear screen when done (optional) |

**What's happening in line 40?** The C64 calculates the address:
1. Start with 1024 (the screen memory base)
2. Add Y × 40 = 12 × 40 = 480 (jump 12 rows down)
3. Add X = 20 (move 20 columns right)
4. Result: 1524 — and POKE writes the asterisk there, making it visible on screen!

### Example 2: Move the star around

```
10 PRINT CHR$(147)
20 X = 5
30 Y = 5
40 POKE 1024+Y*40+X, 42
50 PRINT "First star"
60 POKE 1024+Y*40+X, 32
70 X = 35
80 Y = 19
90 POKE 1024+Y*40+X, 42
100 PRINT "Second star"
110 PRINT CHR$(147)
```

**Try it:** Run this program. Two stars will appear — one near the top-left, one near the bottom-right. The first star disappears from its old spot because line 60 POKEs a space (32) over it.

|| Code | Description |
|------|-------|
| Line 20 | X starts at 5 (far left) |
| Line 30 | Y starts at 5 (near the top) |
| Line 60 | **Erase** the first star — POKE 32 (space character) over it |
| Line 70 | Move X to 35 (far right) |
| Line 80 | Move Y to 19 (near the bottom) |
| Line 90 | **Place** the second star at the new spot |

This is the core game mechanic: **erase the old position, move, place the new position**. Classic game loop in just a few lines!

### Example 3: Stars in a row — a little star pattern

```
10 PRINT CHR$(147)
20 FOR K = 0 TO 39 STEP 5
30 X = K
40 Y = 12
50 POKE 1024+Y*40+X, 42
60 NEXT K
70 PRINT "STAR ROW!"
80 PRINT CHR$(147)
```

**Try it:** Run this and watch as 8 stars appear in a neat horizontal line across the center of the screen! The FOR loop (which you'll meet in detail in Level 1) does the repeated work for you.

|| Code | Description |
|------|-------|
| Line 20 | Loop variable K goes from 0 to 39, jumping by 5 each time |
| Line 30 | Put K's current value into X (column position) |
| Line 50 | Place a star at each X position on row 12 |
| Line 60 | Back to the top of the loop — repeat 8 times |

### Example 4: A cross (X) made of stars

```
10 PRINT CHR$(147)
15 POKE 53281, 14
20 REM --- Main diagonal (top-left to bottom-right) ---
30 FOR K = 0 TO 7
40 X = 16+K
50 Y = 8+K
60 POKE 1024+Y*40+X, 42
70 NEXT K
90 REM --- Diagonal (top-right to bottom-left) ---
100 FOR K = 0 TO 7
110 X = 24-K
120 Y = 8+K
130 POKE 1024+Y*40+X, 42
140 NEXT K
150 PRINT "X PATTERN!"
160 PRINT CHR$(147)
```

This draws two crossing diagonal lines — an X pattern — centered on row 8. The first loop goes from (16,8) to (23,15), and the second goes from (24,8) to (17,15). Together they form a big X.

|| Code | Description |
|------|-------|
| Lines 30-70 | First diagonal — X and Y increase together, moving down-right |
| Lines 100-140 | Second diagonal — X decreases while Y increases, moving down-left |
| Each POKE | Places a `*` at the calculated screen address |

### Key Takeaway Box

> **Every character you see on the C64 screen lives at a specific memory address. To place a character at row R, column C, POKE its code into `1024 + R×40 + C`. Variables let you store these coordinates so you can draw anywhere, anytime!**

## Exercise

1. **Type Example 1 above. Run it. What do you see?**
   - Expected output: A single asterisk (`*`) star appears roughly in the center of the screen.

2. **Change the star position: in Example 1, set X = 38 and Y = 23, then run again. Where does the star appear?**
   - Expected output: The star appears near the bottom-right corner of the screen.

3. **In Example 3, change `STEP 5` to `STEP 10`. Run it. How many stars appear now?**
   - Expected output: Four stars (at columns 0, 10, 20, and 30). STEP controls the gap between stars.

4. **In Example 1, add this line before the POKE: `25 POKE 53280, 9`. This changes the background to light green. Run it. What does the screen look like?**
   - Expected output: The background turns light green and the star appears on top of it.

5. **Combine Examples 1 and 2: write a program that places two stars at different positions without clearing one. Use different variables like X1, Y1, X2, Y2.**
   - Expected output: Two stars appear at two different locations on the screen simultaneously.

## Practice Challenge

> **Challenge:** Create a "star field" — a screen full of randomly scattered stars. You don't need RANDOM for this lesson (that comes in Level 1), so pick 10 coordinates by hand and place stars at each one!
>
> **Hints:**
> - Row Y can be 0–24 (there are 25 rows)
> - Column X can be 0–39 (there are 40 columns)
> - Clear the screen first with `PRINT CHR$(147)`
> - Start each star at the top of the screen, then move it
> - Use a different X and Y for each star — don't reuse coordinates
> - Make your background purple (`POKE 53280, 5`) and your border blue (`POKE 53281, 1`) for a cool night-sky effect
>
> **Start with this skeleton:**
> ```
> 10 PRINT CHR$(147)
> 15 POKE 53280, 5    ' Night-sky purple background
> 20 POKE 53281, 1    ' White border
> 30 X = 3: Y = 2: POKE 1024+Y*40+X, 42
> 40 X = 25: Y = 14: POKE 1024+Y*40+X, 42
> 50 X = 37: Y = 8: POKE 1024+Y*40+X, 42
> ```
> Add 7 more stars of your own choosing! Space them out across the screen like a real starfield.

## Quiz

1. **What is the screen memory base address on the C64?**
   a) 0
   b) 53280
   c) 1024
   d) 2023
   **Answer:** c
   **Explanation:** The C64 text screen starts at memory address 1024. Characters are written here using POKE.

2. **If X = 10 and Y = 6, what is the screen memory address for that position?**
   a) 1060
   b) 1264
   c) 1024 + 60 + 10 = 1094
   d) 1024 × 6 + 10 = 6154
   **Answer:** c
   **Explanation:** The formula is 1024 + (Y × 40) + X. So: 1024 + (6 × 40) + 10 = 1024 + 240 + 10 = 1274.

3. **To clear a star from the screen, what POKE command would you use?**
   a) `POKE address, 0`
   b) `POKE address, 32`
   c) `POKE address, 147`
   d) `POKE address, 255`
   **Answer:** b
   **Explanation:** POKEing a space (character code 32) overwrites whatever was there, effectively erasing the star with a blank character.

4. **Why are variables (like X and Y) useful in this program?**
   a) They make the program run faster
   b) They let you change the star position by editing one number
   c) They clear the screen automatically
   d) They add color to the text
   **Answer:** b
   **Explanation:** Variables store values you can change between POKEs. Instead of rewriting the full address formula each time, you just change `X = 20` to `X = 35` and the rest of the code still works.

5. **The C64 screen is 40 columns wide. What happens if you POKE into address 1024 + 40×40?**
   a) It wraps to the top of the next screen
   b) It goes past the screen memory area — not valid for the text screen
   c) It prints a star anyway
   d) It causes a crash
   **Answer:** b
   **Explanation:** Screen memory is 1024–2023 (40 × 25 = 1000 cells). Address 1024 + 1600 = 2624 is way past the text screen area, so nothing appears on the display. Valid Y values are 0–24.

## Summary

- **Variables** (like `X = 20`) store numbers you can reuse — perfect for coordinates!
- The C64 screen memory starts at address **1024**, with **1,000 character cells** (40 columns × 25 rows).
- To place a character at row Y, column X: `POKE 1024 + Y*40 + X, character_code`
- **Asterisk (code 42)** is a great star symbol for your game.
- **Space (code 32)** erases a character by overwriting it with a blank.
- **CLEAR the screen** with `PRINT CHR$(147)` before drawing a new scene.
- **Color the border** with `POKE 53281, R` and the **background** with `POKE 53280, R` for atmosphere.
- Every C64 game uses these same building blocks to draw characters, move them around, and create interactive experiences!
- **The secret sauce is simplicity:** variables + address math + POKE = game graphics!

## What's Next?

Fantastic work! You just built your first mini-game — one where you place stars anywhere on the screen using coordinates and POKE. You combined variables, address math, PRINT, CHR$(), and screen memory into one program. This is genuinely how classic games like *Pac-Man* and *Zelda* drew their characters — with POKE commands!

But right now you're manually picking every star's position. Imagine being able to **scramble** the coordinates automatically — so every time you run the program, the stars appear in a new random pattern! That's what you'll learn next: **RANDOM and the RND function**, which turns your star placement into a fully unpredictable starfield.

You'll also discover how to read keyboard input so your star follows the arrow keys — turning a still image into a real player-controlled game.

Get ready for Level 1 — where the real programming action begins! 🌟

See you in Lesson 1.0 — Random Stars & Keyboard Magic! 🎮✨