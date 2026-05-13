# Lesson 1.4 — IF / THEN / GOTO: Making Decisions

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 4 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | VARIABLES & TYPES (Lesson 1), EXPRESSIONS (Lesson 2), INPUT & PRINT (Lesson 3) |
| **Concepts** | Conditional branching, comparison operators, IF/THEN one-line, IF/THEN/ELSE blocks, GOTO jumps |

## THEORY

All the programs we've seen so far are like trains on a track: they do the **same thing** every time. IF / THEN / GOTO lets you make your C64 program **choose between different paths**.

Imagine your program is at a fork in the road. You can tell it:
- **IF** the player's score is high, **THEN** show a win message
- **IF** the player's guess is too low, **THEN** tell them to guess higher
- **IF** something happened, **GOTO** a different part of the program

This is called **conditional branching** — the computer checks a condition and jumps to different code depending on the result.

### IF / THEN — The One-Line Decision

The simplest form is a one-line decision:

```
10 IF SCORE > 100 THEN PRINT "YOU WIN!"
```

This says: "IF SCORE is greater than 100, THEN print 'YOU WIN!'. If not, skip the PRINT and go to the next line."

You can also use **GOTO** to jump to another line:

```
10 IF ANSWER$ = "YES" THEN GOTO 100
20 PRINT "OK."
100 PRINT "Great! Let's play."
```

### IF / THEN / ELSE — Two-Way Choices

For more complex choices, use IF with ELSE:

```
10 IF X > 10 THEN PRINT "Big"
20 ELSE PRINT "Small"
```

But here's a **C64 BASIC quirk**: ELSE doesn't work as a keyword on its own line in every C64. Instead, you must chain them with GOTO:

```
10 IF X > 10 THEN GOTO 30
20 PRINT "Small"
30 GOTO 50
40 PRINT "Big"
50 END
```

### Comparison Operators in C64 BASIC

| Operator | Meaning | Example | Result |
|-|---|---|---|
| = | Equal to | `5 = 5` | TRUE (1) |
| <> | Not equal to | `5 <> 3` | TRUE (1) |
| > | Greater than | `10 > 5` | TRUE (1) |
| < | Less than | `3 < 7` | TRUE (1) |
| >= | Greater than or equal | `5 >= 5` | TRUE (1) |
| <= | Less than or equal | `2 <= 3` | TRUE (1) |

### GOTO — Unconditional Jump

**GOTO** makes the program jump to a specific line number:

```
10 GOTO 30
20 PRINT "This line never runs!"
30 PRINT "Welcome to line 30!"
```

GOTO is like teleporting. The program stops at the GOTO line and instantly continues at the target line. Use it to build loops and branches.

## C64 BASIC EXAMPLES

### Example 1: Even or Odd

```
10 INPUT "Pick a number: "; N
20 IF N % 2 = 0 THEN PRINT "Even!"
30 IF N % 2 <> 0 THEN PRINT "Odd!"
40 END
```

Run it with 4: "Even!"
Run it with 7: "Odd!"

### Example 2: Number Guessing — Hinting Higher or Lower

```
10 LET SECRET = INT(RND(10) * 10) + 1
20 INPUT "Guess a number (1-10): "; GUESS
30 IF GUESS = SECRET THEN PRINT "Correct!" : GOTO 60
40 IF GUESS < SECRET THEN PRINT "Too low!": GOTO 20
50 PRINT "Too high!": GOTO 20
60 END
```

This program picks a random number between 1 and 10, then tells you if your guess was too high or too low — and lets you try again!

### Example 3: Three-Way Branch using IF / GOTO

```
10 INPUT "How old are you? "; AGE
20 IF AGE < 10 THEN GOTO 40
30 IF AGE < 20 THEN GOTO 50
40 PRINT "You're a kid!"
50 GOTO 70
60 GOTO 70
70 PRINT "You're a teen!"
80 END
```

### Step-by-step walkthrough:
- IF AGE is less than 10, jump to line 40: "You're a kid!"
- IF AGE is between 10 and 19, fall through to line 70: "You're a teen!"
- Otherwise, fall through after line 80

## EXERCISE

### STEP 1: Simple IF / THEN — Positive or Negative

```
10 PRINT "POSITIVE OR NEGATIVE?"
20 INPUT "Enter a number: "; X
30 IF X > 0 THEN PRINT "Positive!"
40 IF X < 0 THEN PRINT "Negative!"
50 IF X = 0 THEN PRINT "Zero!"
```

- Expected output (try entering 5, -3, and 0):
```
POSITIVE OR NEGATIVE?
Enter a number: 5
Positive!
```

### STEP 2: Password Checker

```
10 PRINT "ENTER THE PASSWORD:"
20 INPUT PASS$
30 IF PASS$ = "OPEN42" THEN PRINT "ACCESS GRANTED!" : GOTO 60
40 PRINT "WRONG PASSWORD!"
50 GOTO 10
60 PRINT "Welcome to the secret area."
```

- Expected output:
```
ENTER THE PASSWORD:
WRONG PASSWORD!
ENTER THE PASSWORD: OPEN42
ACCESS GRANTED!
Welcome to the secret area.
```

### STEP 3: Grading Machine

```
10 INPUT "Enter score (0-100): "; S
20 IF S >= 90 THEN PRINT "Grade: A" : GOTO 60
30 IF S >= 80 THEN PRINT "Grade: B" : GOTO 60
40 IF S >= 70 THEN PRINT "Grade: C" : GOTO 60
50 PRINT "Grade: F"
60 END
```

- Expected output:
```
Enter score (0-100): 85
Grade: B
```

## PRACTICE CHALLENGE

> **Challenge:** Build a **"Rock, Paper, Scissors"** game where the player plays against the computer:
>
> 1. Generate a random computer choice (1=Rock, 2=Paper, 3=Scissors)
> 2. Ask the player for their choice
> 3. Compare the two choices and announce the winner
> 4. If it's a tie, ask to play again
>
> **Hints:**
> - Use `INPUT "Enter 1 for R, 2 for P, 3 for S: "; YOURS`
> - Use `INT(RND(10) * 3) + 1` for the computer's choice
> - Compare using multiple IF statements
>
> **Tie rules:** If both chose the same, it's a tie.
> **Win rules:** Rock beats Scissors, Scissors beats Paper, Paper beats Rock.

## QUIZ

**1. What does `IF X > 5` check?**
a) If X equals 5
b) If X is greater than 5
c) If X is less than 5
d) If X is equal to or greater than 5

**Answer:** b

**Explanation:** The `>` operator tests whether the left value is strictly greater than the right value.

**2. What happens if the condition in `IF X = 3 THEN PRINT "OK"` is FALSE?**
a) The program stops
b) An error is shown
c) The PRINT is skipped and execution continues to the next line
d) The program jumps to line 1

**Answer:** c

**Explanation:** When an IF condition is false, the computer skips the THEN clause and goes to the next line. Nothing bad happens.

**3. How many comparison operators does C64 BASIC have?**
a) 2
b) 4
c) 6
d) 10

**Answer:** c

**Explanation:** C64 has >, <, =, <>, >=, and <= — that's six comparison operators.

**4. What does GOTO 40 do?**
a) Adds 40 to the current line
b) Jumps to line 40
c) Deletes line 40
d) Prints line 40

**Answer:** b

**Explanation:** GOTO always jumps to the line number after it. GOTO 40 means "go to line 40."

## SUMMARY

- **IF / THEN** lets your program make one-line conditional decisions
- **GOTO** makes the program jump to any other line number
- **Comparison operators** =, <>, >, <, >=, <= let you test conditions
- **IF / THEN / ELSE** chains use IF with GOTO for multi-way branching in C64 BASIC
- When conditions are **true**, the THEN part runs; when false, it is skipped
- **GOTO** creates loops (like GOTO 10) by jumping back to earlier lines
- C64 uses **integers** — TRUE is 1, FALSE is 0

## What's Next?

You can now make your C64 check conditions and branch based on them. However, what if you need to **repeat** something many times without copying the lines over and over? That's what the next lesson is about: **FOR / NEXT loops** — C64's built-in repetition machine! See you in **Lesson 5: FOR / NEXT**! 🔄

<!-- Note: This file has intentional formatting errors for testing purposes -->