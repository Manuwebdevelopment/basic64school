# Lesson 0.1 — Welcome to the C64!

## Metadata

| Field | Value |
|-----|-----|
| **Level** | 0 |
| **Lesson Number** | 1 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | None — this is your very first lesson! |
| **Concepts** | C64 history, screen basics, PRINT, CHR$(147) for clearing, POKE basics |

## Theory

Hi there, future 8-bit programmer! Welcome to **Basic64School** — your friendly, browser-based adventure into Commodore 64 programming! 🎮

The Commodore 64 is a legendary computer from 1982. It sold over **17 million copies** and is still beloved today. At its heart is a simple but powerful BASIC interpreter — the same language that first taught millions of kids how to program. That's you now!

### What the C64 Screen Looks Like

When you turn on a C64, you see a **text screen** that is:

- **40 columns wide** × **25 rows tall** — like a tiny sheet of lined paper
- **8 colors** for text and **16 colors** for border and background
- **37,914 bytes of RAM** to store your programs (that's 37,914 characters of your imagination!)

The C64 uses a character set called **PETSCII** (Programmers' Extended Standard Code for Information Interchange). Every letter, number, and symbol you see on the screen lives in memory as a number. For example, the letter `A` is number 65. The space character is number 32. And clearing the screen? That's number 147!

### What You Will Learn in This Lesson

In this first lesson, you will:

- Meet the C64 and learn about its legendary screen
- Type your first command: `PRINT` — the command that makes the C64 talk!
- Discover `CHR$(147)`, the magic spell for clearing the screen
- Peek at `POKE`, the secret power that writes directly into the C64's memory

You'll learn that programming is nothing scary — it's just a bunch of little commands you type in, and the computer does exactly what you tell it. That's it!

### Key Takeaway

> **The C64 screen is a 40×25 text grid, and every character has a secret number behind it. Your first programming superpower is `PRINT` — the command that makes the C64 talk to you!**

## C64 BASIC Examples

### Example 1: Your very first command — PRINT

Type this line at the `READY>` prompt and press ENTER:

```
10 PRINT "HELLO C64!"
```

You should see this on your screen:

```
HELLO C64!
READY
>
```

| Code | Description |
|------|-------------|
| `PRINT "HELLO C64!"` | Tells the C64 to display the text between the quotes |
| The `10` | Line number — BASIC needs numbered lines, even one-line programs! |

### Example 2: PRINT is your friend

Try these lines one at a time:

```
10 PRINT "MY NAME IS"
20 PRINT "C64!"
30 PRINT "I CAN SAY ANYTHING!"
```

Now run the program by typing `RUN` and pressing ENTER. You'll see:

```
MY NAME IS
C64!
I CAN SAY ANYTHING!
READY
>
```

| Code | Description |
|------|-------------|
| `PRINT "MY NAME IS"` | Prints the first line of text |
| `PRINT "C64!"` | Prints the second line — always starts a new line! |
| `PRINT "I CAN SAY ANYTHING!"` | Prints the third line |

### Example 3: Clearing the screen — the magic of CHR$(147)

On the C64, you can't just say "clear the screen." Instead, you print a special character: code 147, which *means* "clear."

```
10 PRINT "BEFORE CLEAR"
20 PRINT CHR$(147)
30 PRINT "AFTER CLEAR!"
```

Run it (type `RUN` and press ENTER) and watch what happens! The first line appears, the screen wipes clean, then the last line prints at the top.

| Code | Description |
|------|-------------|
| `CHR$(147)` | CHR$ converts a number to its character. 147 = clear screen |
| `PRINT CHR$(147)` | Sending that clear-character to the PRINT command wipes the screen |

### Example 4: Your first peek at POKE

POKE is how you write directly into the C64's memory. Think of POKE as writing a note and shoving it into a specific mailbox — you tell the C64 *where* (address) and *what* (value).

The C64 has a color border around the screen. Its color is stored in memory at address **53281**. Try this:

```
10 POKE 53281,5
20 PRINT "Border changed!"
```

Run it and watch the border change color! Address 53281 controls the **border color**, and 5 is purple on the C64's palette.

| Code | Description |
|------|-------------|
| `POKE 53281,5` | Write the number 5 into memory address 53281 (border color register) |
| `PRINT "Border changed!"` | Confirm the change worked |

The C64's full color palette has numbers 0 through 15:

| Color Code | Color |
|------------|-------|
| 0 | Black |
| 1 | White |
| 2 | Primary red |
| 3 | Primary yellow |
| 4 | Primary green |
| 5 | Primary blue |
| 6 | Magenta |
| 7 | Red |
| 8 | Yellow |
| 9 | Green |
| 10 | Cyan |
| 11 | Blue |
| 12 | Light red |
| 13 | Light green |
| 14 | Light blue |
| 15 | Light gray |

## Exercise

1. **Type `10 PRINT "HELLO FROM THE FUTURE!"` and press RUN. What appears on your screen?**
   - Expected output: `HELLO FROM THE FUTURE!` followed by `READY >`

2. **Type the following three lines, then run it. How many lines of text do you see?**
   ```
   10 PRINT "ONE"
   20 PRINT "TWO"
   30 PRINT "THREE"
   ```
   - Expected output: Three separate lines — `ONE`, `TWO`, `THREE`

3. **Type the screen-clearing example from Example 3 above. Run it. Notice how the screen goes blank between the two messages. That's CHR$(147) doing its magic!**
   - Expected output: `BEFORE CLEAR` appears, screen clears, then `AFTER CLEAR!` appears at the top

4. **Change the border color! Type `10 POKE 53281,15` and run it. Your border should turn very light gray. Now try 10 POKE 53281,3 for yellow, and 10 POKE 53281,6 for magenta.**
   - Expected output: Border color changes each time you change the number in the POKE

## Practice Challenge

> **Challenge:** Create a "personalized welcome card" program. It should print your name (or anything you want), clear the screen, and then print a fun message with a colorful border. Bonus: change the background color too!
>
> **Hint:** 
> - `POKE 53280,R` changes the **background color** (R = color code)
> - `POKE 53281,R` changes the **border color**
> - Put your program together with five lines like this:
> ```
> 10 PRINT "=== WELCOME ==="
> 15 PRINT "[Your name]"
> 20 PRINT CHR$(147)
> 30 PRINT "HELLO, FUTURE PROGRAMMER!"
> 35 PRINT "LET"S BEGIN THE ADVENTURE!"
> ```
> Run it and celebrate your first creation!

## Quiz

1. **How wide is the C64 text screen in columns?**
   a) 20
   b) 40
   c) 80
   d) 25
   **Answer:** b
   **Explanation:** The C64 screen is exactly 40 columns wide and 25 rows tall — that's 1,000 character positions total!

2. **What does CHR$(147) do on the C64?**
   a) Prints the character '147'
   b) Clears the screen
   c) Plays a sound
   d) Changes the border color
   **Answer:** b
   **Explanation:** In PETSCII, character code 147 means "clear screen." When you PRINT it, the C64 wipes everything and starts fresh at the top-left corner.

3. **Which command makes text appear on the C64 screen?**
   a) POKE
   b) GOTO
   c) PRINT
   d) DATA
   **Answer:** c
   **Explanation:** PRINT is the command that outputs text. You give it something in quotes (like a message) or a CHR$(code) expression, and it displays it on screen.

4. **What does POKE 53281,6 do?**
   a) Clears the text screen
   b) Changes the border color to magenta
   c) Prints color code 6 to the screen
   d) Moves the cursor to column 6
   **Answer:** b
   **Explanation:** Address 53281 controls the border color. Color code 6 is magenta on the C64 palette.

## Summary

- The C64 screen is **40 columns × 25 rows** with PETSCII character codes
- **PRINT** is your first command — it displays text on screen
- **CHR$(147)** is the screen-clearing character — it's number 147 in PETSCII
- **POKE** writes values directly into memory addresses (like changing colors)
- The C64 has **37,914 bytes of RAM** and **16 colors** available
- Every character you see on the C64 screen is stored as a secret number in memory!

## What's Next?

In the next lesson, we'll dive deep into the **PRINT command and CHR$() function** — the two tools every C64 programmer uses first. You'll learn how to print special PETSCII characters (arrows, boxes, smiley faces!), manipulate text to create cool effects, and discover why CHR$() is basically a universal translator between numbers and characters.

Get ready to make your C64 draw with words! 🖨️

See you in Lesson 0.2 — PRINT & CHR$!
