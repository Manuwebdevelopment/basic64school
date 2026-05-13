# Lesson 1.7 — Strings: Working with Text

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 7 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | Arrays / DIM (Lesson 6), Variables & Types (Lesson 1) |
| **Concepts** | LEFT$, RIGHT$, MID$, LEN$, string concatenation, converting strings to numbers, string comparison |

## Theory

So far, we've treated strings (text values) like boxes where you just store and display them. But what if you want to **manipulate** the text — cut a word in half, copy the first three letters, count how many characters there are, or check if two strings are equal?

That is exactly what the **string functions** of C64 BASIC let you do. Each function takes a string and returns a new string (or number) based on what you want.

### String Variables

In C64 BASIC, a string variable name ends with `$`:

```
NAME$ = "MARIO"
ANS$ = "YES"
```

### LEN$ — Counting Characters

The **LEN()** function counts how many characters are in a string:

```
10 A$ = "HELLO"
20 PRINT LEN(A$)    ' prints 5
```

| Function | What It Does |
|------|---|
| `LEN(A$)` | Returns the number of characters in A$ |

### LEFT$ — Grab Characters from the Start

**LEFT$(A$, N)** returns the first N characters of string A$:

```
10 A$ = "MARIO BROS."
20 PRINT LEFT$(A$, 5)    ' prints "MARIO"
```

| Function | What It Does |
|------|---|
| `LEFT$(A$, N)` | Takes the first N characters from the left side |

### RIGHT$ — Grab Characters from the End

**RIGHT$(A$, N)** returns the last N characters of string A$:

```
10 A$ = "MARIO BROS."
20 PRINT RIGHT$(A$, 4)    ' prints "ROS."
```

| Function | What It Does |
|------|---|
| `RIGHT$(A$, N)` | Takes the last N characters from the right side |

### MID$ — Grab Characters from the Middle

**MID$(A$, START, N)** returns N characters starting at position START (1-based — the first character is position 1!):

```
10 A$ = "MARIO BROS."
20 PRINT MID$(A$, 7, 4)    ' prints "BROS"
```

| Function | What It Does |
|------|---|
| `MID$(A$, START, N)` | Gets N characters starting at position START |

### String Concatenation — Gluing Strings Together

Use `+` to **join** two strings:

```
10 FIRST$ = "SAM"
20 LAST$ = "FUSS"
30 NAME$ = FIRST$ + " " + LAST$
40 PRINT NAME$    ' prints "SAM FUSS"
```

### Converting Between Strings and Numbers

To convert a number to a string, use **STR$()**:

```
10 X = 42
20 S$ = STR$(X)    ' S$ = "42"
30 PRINT S$ + " points"    ' prints "42 points"
```

To convert a string to a number, use **VAL()**:

```
10 A$ = "100"
20 B$ = "50"
30 PRINT VAL(A$) + VAL(B$)    ' prints 150
```

### String Comparison

You can compare strings using `=`, `<>`, `<`, `>`. C64 compares text **alphabetically** (PETSCII order). Remember: uppercase letters come before lowercase in PETSCII, so "Z" < "a":

```
10 A$ = "APPLE"
20 B$ = "BANANA"
30 IF A$ < B$ THEN PRINT "A comes first"
```

## C64 BASIC Examples

### Example 1: Display the Length of Your Name

```
10 PRINT "=== STRING LENGTH CHECKER ==="
20 PRINT
30 INPUT "What is your name? "; NAME$
40 PRINT
50 PRINT "Your name is"; LEN(NAME$); " characters long!"
60 PRINT "Here is your name backwards:"
70 FOR I = LEN(NAME$) TO 1 STEP -1
80   PRINT MID$(NAME$, I, 1);
90 NEXT I
100 PRINT
```

**Sample output:**
```
=== STRING LENGTH CHECKER ===

What is your name? MARIO

Your name is 5 characters long!
Here is your name backwards:
OIRAM
```

| Code | Description |
|------|---|
| `LEN(NAME$)` | Count the characters in NAME$ |
| `FOR I = LEN(NAME$) TO 1` | Loop backward through every position |
| `MID$(NAME$, I, 1)` | Extract one character at position I |
| `PRINT ...;` | Print each character on the same line |

### Example 2: FIRST NAME, LAST NAME Splitter

```
10 PRINT "=== NAME SPLITTER ==="
20 INPUT "Enter full name: "; FULL$
30 SP = 0
40 FOR I = 1 TO LEN(FULL$)
50   CH$ = MID$(FULL$, I, 1)
60   IF CH$ = " " THEN SP = I
70 NEXT I
80 FIRST$ = LEFT$(FULL$, SP - 1)
90 LAST$ = RIGHT$(FULL$, LEN(FULL$) - SP)
100 PRINT "First:"; FIRST$
110 PRINT "Last:"; LAST$
```

**Sample output:**
```
=== NAME SPLITTER ===
Enter full name: MARIO BROS.
First: MARIO
Last: BROS.
```

| Code | Description |
|------|---|
| `FOR I = 1 TO LEN(FULL$)` | Check every character of the string |
| `IF CH$ = " "` | Look for a space to split the name |
| `LEFT$` and `RIGHT$` | Cut the name into two pieces |

### Example 3: Password Checker with String Functions

```
10 PRINT "=== SECRET DOOR ==="
20 LET CORRECT$ = "OPEN"
30 INPUT "Enter the magic word: "; GUESS$
40 IF LEFT$(GUESS$, 4) = "OPEN" THEN PRINT "Door opens!"
50 IF LEN(GUESS$) = 0 THEN PRINT "You entered nothing!"
60 IF GUESS$ = CORRECT$ THEN PRINT "It matches exactly!"
70 IF GUESS$ <> CORRECT$ THEN PRINT "Wrong! Try 'OPEN'."
```

**Sample output for typing "OPEN":**
```
=== SECRET DOOR ===
Enter the magic word: OPEN
It matches exactly!
```

| Code | Description |
|------|---|
| `LEFT$(GUESS$, 4)` | Check just the first 4 letters (ignore trailing spaces) |
| `LEN(GUESS$) = 0` | Check if the string is completely empty |
| `GUESS$ = CORRECT$` | Exact string match |
| `GUESS$ <> CORRECT$` | Not equal — different text |

### Example 4: Building a Text String Piece by Piece

```
10 PRINT "Welcome to"; STR$(INT(RND(10) * 100) + 1); "! Let us build your story."
20 W1$ = "Once"
30 W2$ = "upon"
40 W3$ = "a"
50 W4$ = "time"
60 STORY$ = W1$ + " " + W2$ + " " + W3$ + " " + W4$ + "."
70 PRINT STORY$
80 PRINT STR$(LEN(STORY$)); " characters in your story!"
```

**Output:**
```
Welcome to 42! Let us build your story.
Once upon a time.
17 characters in your story!
```

| Code | Description |
|------|---|
| `STR$(number)` | Convert a number to its string representation |
| `W1$ + " " + W2$` | Glue words together with spaces between them |
| `STR$(LEN(STORY$))` | Show the length as part of a message |

## Exercise

### Step 1: String Length and Backward Name

```
10 INPUT "Type your name: "; N$
20 L = LEN(N$)
30 PRINT "Length:"; L
40 PRINT "Backwards: ";
50 FOR I = L TO 1 STEP -1
60   PRINT MID$(N$, I, 1);
70 NEXT I
```

- **Expected output (for name "C64"):**
```
Type your name: C64
Length: 3
Backwards: 46C
```

### Step 2: Take a Surname

```
10 INPUT "Enter first and last name: "; N$
20 SPACEPOS = 0
30 FOR I = 1 TO LEN(N$)
40   IF MID$(N$, I, 1) = " " THEN SPACEPOS = I
50 NEXT I
60 SURNAME$ = RIGHT$(N$, LEN(N$) - SPACEPOS)
70 PRINT "Your surname is:"; SURNAME$
```

- **Expected output (for "ALICE SMITH"):**
```
Enter first and last name: ALICE SMITH
Your surname is: SMITH
```

### Step 3: Number to String Converter

```
10 N = 2024
20 S$ = STR$(N)
30 PRINT STR$(LEN(S$)); " digits in"; S$; ":";
40 FOR I = 1 TO LEN(S$)
50   PRINT MID$(S$, I, 1);
60 NEXT I
```

- **Expected output:**
```
4 digits in 2024: 2 0 2 4
```

### Step 4: Convert String Numbers and Add Them

```
10 A$ = "123"
20 B$ = "456"
30 TOTAL = VAL(A$) + VAL(B$)
40 PRINT A$; "+"; B$; "="; TOTAL
```

- **Expected output:**
```
123+456=579
```

## Practice Challenge

> **Challenge:** Build a **"Word Scrambler"** that:
>
> 1. Asks the player for a word (string)
> 2. Checks that the word is at least 3 characters long using LEN$
> 3. Rearranges the middle letters (keep the first and last the same)
> 4. Prints the scrambled version
>
> **Example:** If input is "HELLO":
> - First letter: H (keep)
> - Middle: ELL (scramble to something like LEL)
> - Last letter: O (keep)
> - Output: "HLELO"
>
> **Hints:**
> - Use `MID$` to get individual letters
> - Store the letters in a new string variable
> - Use `LEN` to determine which positions to process

**Sample solution:**
```
10 PRINT "=== WORD SCRAMBLER ==="
20 INPUT "Enter a word (3+ letters): "; WORD$
30 L = LEN(WORD$)
40 IF L < 3 THEN PRINT "Too short! Need 3+ letters.": GOTO 10
50 FIRST$ = MID$(WORD$, 1, 1)
60 LAST$ = MID$(WORD$, L, 1)
70 MIDPART$ = ""
80 FOR I = 2 TO L - 1
90   MIDPART$ = MIDPART$ + MID$(WORD$, L - I + 2, 1)
100 NEXT I
110 SCRAMBLED$ = FIRST$ + MIDPART$ + LAST$
120 PRINT "Original:"; WORD$
130 PRINT "Scrambled:"; SCRAMBLED$
```

## Quiz

**1. What does `LEFT$("COMMODORE", 7)` return?**
a) "COMMOD"
b) "COMMODO"
c) "COMMODOR"
d) "MODO"

**Answer:** b
**Explanation:** LEFT$ takes the first 7 characters: C-O-M-M-O-D-O. That is "COMMODO".

**2. What does `LEN("")` (an empty string) return?**
a) 1
b) 0
c) -1
d) An error

**Answer:** b
**Explanation:** An empty string has zero characters, so LEN returns 0.

**3. What does `MID$("ABCDEFG", 3, 4)` return?**
a) "ABCD"
b) "CDEF"
c) "DEFG"
d) "BCDE"

**Answer:** b
**Explanation:** MID$ is 1-indexed. Position 3 is 'C', and taking 4 characters gives C-D-E-F = "CDEF".

**4. What is the result of `"ABC" + "DEF"`?**
a) "ABCDEF"
b) Error — you cannot add strings
c) "ABC" (only the first string is kept)
d) "ABC DEF" (without quotes in between)

**Answer:** a
**Explanation:** The `+` operator concatenates (joins) strings. `"ABC" + "DEF"` gives `"ABCDEF"`.

## Summary

- **String variables** end with `$` (like `NAME$`)
- **LEN(S$)** returns the number of characters in a string
- **LEFT$(S$, N)** takes the first N characters
- **RIGHT$(S$, N)** takes the last N characters
- **MID$(S$, START, N)** takes N characters starting at position START
- **+** joins (concatenates) two strings together
- **STR$(number)** converts a number to a string
- **VAL(string)** converts a string of digits to a number
- Strings can be **compared** with `=`, `<>`, `<`, `>` (PETSCII alphabetical order)

## What's Next?

You can now work with text like a pro — cutting, counting, gluing, and comparing strings. But there is one more BASIC tool that will make your code much cleaner: **GOSUB / RETURN**. These lets you create reusable blocks of code (called subroutines) — like mini-programs inside your program. In the next lesson, you'll learn how to split your code into organized chunks. See you in **Lesson 8: GOSUB / RETURN**! 📞
