# Lesson 1.3 — INPUT & PRINT

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 3 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Expressions (Lesson 2) |
| **Concepts** | INPUT command, DISPLAY strings, commas vs. semicolons, PRINT formatting |

## Theory

So far, all the numbers and text in our programs have been hardcoded inside the program. Now the player can **interact** with the program! Two commands make this possible:

### PRINT — Show Things on Screen

The **PRINT** command sends text or numbers to the C64 screen.

**Strings** — text inside quotes:
```
PRINT "Hello, World!"
```

**Variables** — prints their VALUE:
```
PRINT SCORE
```

**Multiple things** — use commas or semicolons:
```
PRINT A; ", "; B            ' prints on the same line
PRINT A, B                  ' jumps to the next screen column (tab stop)
```

### INPUT — Get Keyboard Input

The **INPUT** command waits for the player to type something and press ENTER:

```
INPUT "Enter your name: "; NAME$
INPUT X                     ' no prompt, just a blinking cursor
```

The first form shows a **prompt** message. The player types something, presses Enter, and the value goes into the variable.

### Screen Tabs: Commas vs. Semicolons

| Separator | Effect |
|-|--|
| Semicolon `;` | Stays on the same line, right next to the previous text |
| Comma `,` | Jumps to the next **tab stop** (every 10 characters) |

Think of commas as "skip to the next column of 10" and semicolons as "stay here."

### Important C64 Screen Detail
- The screen is **40 columns wide x 25 rows**
- PRINT automatically starts a **new line** after each command
- **TAB** starts a new line (or moves to the next column if you use semicolons)
- **CHR$(147)** is the code to **clear the screen**

## C64 BASIC Examples

### Example 1: Welcome Message

```
10 PRINT "================================"
20 PRINT "         WELCOME TO MY GAME"
30 PRINT "================================"
40 PRINT
50 PRINT "Type your name:"
60 INPUT NAME$
70 PRINT
80 PRINT "Hello, ";NAME$; "!"
90 PRINT "Let's play together!"
```

- Expected output:
```
================================
         WELCOME TO MY GAME
================================

Type your name: [cursor blinks here]
Hello, [whatever you typed]!
Let's play together!
```

### Example 2: Using Commas for Alignment

```
10 PRINT "NAME";TAB(15);"SCORE";TAB(30);"RANK"
20 PRINT "-----";TAB(15);"-----";TAB(30;"-----"
30 PRINT "ALICE";COMMA(15);"100";TAB(30);"GOLD"
40 PRINT "BOB";TAB(15);"75";TAB(30);"SILVER"
```

This prints columns aligned in neat lines!

### Example 3: Simple Calculator with INPUT

```
10 PRINT "SIMPLE CALCULATOR"
20 INPUT "First number: "; A
30 INPUT "Second number: "; B
40 PRINT
50 PRINT A;"+";B;"=";A+B
60 PRINT A;"-";B;"=";A-B
70 PRINT A;"*";B;"=";A*B
80 PRINT A;"/";B;"=";A/B
90 INPUT "Again? (Y/N)"; ANSWER$
100 IF ANSWER$="Y" THEN GOTO 10
110 PRINT "Goodbye!"
```

### Step-by-step walkthrough:
1. The program asks for two numbers
2. The program does all four operations
3. The player can choose to play again or leave

## Exercise

### Step 1: A Greeting Program

Write a program that greets the player by name:

```
10 PRINT "Hi there!"
20 INPUT "What is your name? "; NAME$
30 PRINT "Oh, ";NAME$;", welcome!"
```

- Expected output:
```
Hi there!
What is your name? [type your name]
Oh, [your name], welcome!
```

### Step 2: The Name + Age Game

Write a program that stores a name and an age:

```
10 INPUT "Enter name: "; NAME$
20 INPUT "Enter age: "; AGE
30 PRINT "So, ";NAME$; " is ";AGE;" years old."
```

- Expected output:
```
Enter name: [type name]
Enter age: [type age]
```

### Step 3: Two-Step Input

```
10 PRINT "Enter your favorite number: "
20 INPUT FAV
30 PRINT "Now enter a bigger number: "
40 INPUT HIGHER
50 PRINT "Got it!"; FAV; " and "; HIGHER
60 INPUT "Are you happy? (Y/N)"; ANS$
70 IF ANS$ = "Y" THEN PRINT "Great!"
80 END
```

- Expected output:
```
Enter your favorite number: [type]
Now enter a bigger number: [type]
Got it! [first] and [second]
Are you happy? (Y/N) [type Y or N]
Great! (if Y)
```

## Practice Challenge

> **Challenge:** Create a **"Temperature Converter"**. Ask the player to enter a temperature in degrees **Celsius**, then **print** the equivalent in Fahrenheit.
>
> The formula is: `F = C * 9 / 5 + 32`
>
> **Hints:**
> - Use `INPUT` to get the Celsius temperature
> - Use `PRINT` to **show** the result
> - Store the converted value in a variable

**Sample solution:**
```
10 PRINT "=== TEMPERATURE CONVERTER ==="
20 INPUT "Celsius: "; C
30 F = C * 9 / 5 + 32
40 PRINT C;"°C = ";INT(F);"°F"
```

**Output:**
```
=== TEMPERATURE CONVERTER ===
Celsius: 0
0°C = 32°F
```

## Quiz

**1. What does `PRINT "Hello"; "World"` do?**
a) Prints two lines: Hello and World
b) Prints "HelloWorld" on one line
c) Prints an error
d) Waits for input

**Answer:** b

**Explanation:** Semicolons `;` keep everything on the same line. The text is glued together without a space between them.

**2. What does `INPUT NAME$` do?**
a) Prints "NAME$" on screen
b) Waits for the player to type something and press Enter
c) Clears the screen
d) Reads a number from memory

**Answer:** b

**Explanation:** `INPUT` waits for the player to type text (or a number) and press Enter. The value goes into the variable.

**3. If you put a comma between items in PRINT, what happens?**
a) Nothing — the comma is ignored
b) The text wraps to the next line
c) It skips to the next tab stop (every 10 columns)
d) It adds a space

**Answer:** c

**Explanation:** Commas in `PRINT` act as tab stops. The cursor jumps to the next column (every 10 characters on the C64 screen).

**4. What does `PRINT` do when called with no arguments?**
a) Prints a blank space
b) Prints a newline (moves to the next row)
c) Stops the program
d) Prints "0"

**Answer:** b

**Explanation:** A bare `PRINT` command with no arguments simply starts a new line — it's like pressing Enter.

## Summary

- **PRINT** sends text and numbers to the C64 screen
- **INPUT** waits for player typing and stores it in a variable
- **Semicolons** (`;`) keep everything on the **same line**
- **Commas** (`,`) jump to the next tab stop (every 10 columns)
- A bare `PRINT` starts a **new line** (like pressing Enter)
- The C64 screen is **40 columns x 25 rows**
- Use **strings** in quotes and **numeric variables** without quotes

## What's Next?

You can display text and get input. Now let's make your program **make decisions**! In the next lesson, you'll learn how to use **IF / THEN / GOTO** to branch your program — giving your C64 the power to choose its own path. See you in **Lesson 4: IF / THEN / GOTO**! 🎯
