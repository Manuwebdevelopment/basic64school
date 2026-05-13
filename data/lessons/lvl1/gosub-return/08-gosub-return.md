# Lesson 1.8 — GOSUB / RETURN: Modularizing Your Code

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 8 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | Lessons 1.1–1.7 (all previous Level 1 lessons) |
| **Concepts** | GOSUB, RETURN, subroutines, code organization, parameter passing via variables, avoiding COPY-PASTE bugs |

## Theory

You have reached the final BASIC building block for Level 1! Until now, every time you wanted to do something twice, you had to either **copy your code** or **write a loop**. But loops only work when the code is repeated the same way every time.

What if you want to **run the same piece of code from many places**, or **run a block of code once then come back to where you were**? That is exactly what **GOSUB** and **RETURN** are for.

> **Think of GOSUB like a subroutine in programming today:** you "go to" a piece of code, it does its job, then "returns" to exactly where it left off.

### How GOSUB / RETURN Work

1. Your program reaches a line like `GOSUB 1000`
2. **Immediately**, BASIC **jumps** to line 1000 and starts running from there
3. Somewhere in that block, you write `RETURN` — BASIC **jumps back** to the line right after the GOSUB
4. Program continues from where it left off

```
10 PRINT "Hello before GOSUB"
20 GOSUB 1000
30 PRINT "Back from GOSUB!"
40 END
1000 REM --- Subroutine starts ---
1010 PRINT "I am inside the subroutine!"
1020 PRINT "I can do lots of work here."
1030 PRINT "Now I return..."
1040 RETURN
1050 REM --- Subroutine ends ---
```

### Why Use GOSUB?

The #1 problem with long BASIC programs is **repetition**. Want to print a banner three times? Without GOSUB you repeat the same 5-10 lines three times. With GOSUB, you write it once in a subroutine, then call it.

Other reasons:
- Makes long programs **readable** — each subroutine is a named block of work
- Makes **fixing bugs** easier — fix the bug in one place, not three
- Makes **adding features** easier — change it in one place

### Passing Parameters

There is no formal parameter system in BASIC like you'd find in Python or C. Instead, **you use shared variables**:

```
10 INPUT "How many stars?", N
20 GOSUB 1000
30 INPUT "How many hearts?", M
40 GOSUB 1000
999 END
1000 REM --- Draw N objects ---
1010 FOR I = 1 TO N
1020   PRINT "* ";
1030 NEXT I
1040 PRINT
1050 RETURN
```

Here, the variable `I` is used inside the subroutine but `N` is set before the call. The subroutine uses the same variable that `N` happened to have at the time of the call.

### Scoping — Variables Are Shared!

In C64 BASIC, all variables are **global** — there is no concept of "local" variables. Anything you change inside a subroutine **stays changed** after RETURN. This means you need to be careful:

```
10 LET X = 42
20 GOSUB 100
30 PRINT X   ' Prints 99, not 42!
40 PRINT "Done"
50 END
100 LET X = 99
110 RETURN
```

> **Tip:** Save any variable the subroutine might overwrite using a different name!

```
10 LET X = 42
20 LET SAVE_X = X
30 GOSUB 100
40 LET X = SAVE_X   ' Restore it
50 PRINT X   ' Now prints 42
60 END
100 LET X = 99
110 RETURN
```

### Multiple GOSUBs in the Same Program

Each subroutine is a normal block of BASIC code. You can call it from anywhere in your program:

```
10 PRINT "Starting menu..."
20 INPUT "Choice:", C
30 IF C = 1 THEN GOSUB 100
40 IF C = 2 THEN GOSUB 200
50 IF C = 3 THEN GOSUB 300
60 PRINT "Menu done."
70 END
100 REM --- Menu option 1 ---
110 PRINT "You chose option 1!"
120 RETURN
200 REM --- Menu option 2 ---
210 PRINT "You chose option 2!"
220 RETURN
300 REM --- Menu option 3 ---
310 PRINT "Goodbye!"
320 END
```

## C64 BASIC Examples

### Example 1: A Menu System Using GOSUB

```
10 PRINT "=== BASIC MENU ==="
20 PRINT "1. Play Game"
30 PRINT "2. High Scores"
40 PRINT "3. Exit"
50 INPUT "Choice: "; C$
60 IF C$ = "1" THEN GOSUB 100
70 IF C$ = "2" THEN GOSUB 200
80 IF C$ = "3" THEN PRINT "Goodbye!": END
90 PRINT: GOTO 10
100 REM --- Play Game ---
110 PRINT "Starting game..."
120 FOR I = 1 TO 5
130   PRINT "[Gameplay...]";
140   FOR T = 1 TO 20: NEXT T
150 NEXT I
160 PRINT "Game over!"
170 RETURN
200 REM --- High Scores ---
210 PRINT "=== HIGH SCORES ==="
220 PRINT "1. MARIO     999"
230 PRINT "2. LUIGI     850"
240 PRINT "3. PEACH     720"
250 RETURN
```

### Example 2: Drawing a Box Repeatedly

```
10 PRINT "=== DRAWING BOXES ==="
20 FOR ROW = 1 TO 15 STEP 4
30   LET ROW_S = ROW
40   GOSUB 100
50 NEXT ROW
60 PRINT "All boxes drawn!"
70 END
100 REM --- Draw box at position ROW_S ---
110 FOR I = 1 TO 40
120   POKE 1024 + ROW_S + I, 205
130 NEXT I
140 FOR I = 1 TO 3
150   FOR J = 1 TO 40
160     POKE 1024 + ROW_S + 1 + I * 40 + J, 32
170   NEXT J
180 NEXT I
190 RETURN
```

### Example 3: Clear Screen Subroutine (Avoids POKE 147 everywhere!)

```
10 PRINT "Screen 1"
20 GOSUB 500
30 PRINT "Hello!"
40 GOSUB 500
50 PRINT "Screen 2"
60 END
500 REM --- ClearScreen ---
510 POKE 147
520 RETURN
```

> **Why is this better?** If you later want to change how the screen clears (say, add a color wipe effect), you change it in ONE place (line 510) instead of every `POKE 147` in your entire program!

## Exercise

### Step 1: Simple Greeting Subroutine

Write a program that asks for a name, then prints a greeting three different ways using three different GOSUB calls.

```
10 INPUT "What is your name? "; NAME$
20 GOSUB 100
30 GOSUB 200
40 GOSUB 300
50 END
100 PRINT "Hello, "; NAME$; "!"
110 RETURN
200 PRINT "Good day, "; NAME$; "!"
210 RETURN
300 PRINT "Greetings, valued "; NAME$; "!"
310 RETURN
```

### Step 2: Score Calculator Subroutine

Write a score calculator. The subroutine gets the score via a shared variable, adds a bonus, and stores the result in another shared variable.

```
10 LET BASE = 100
20 LET BONUS = 50
30 GOSUB 1000
40 PRINT "Final score: "; TOTAL
50 END
1000 LET TOTAL = BASE + BONUS
1010 RETURN
```

### Step 3: Multi-step Program with GOSUBs

Write a number guessing game skeleton:
- GOSUB to a prompt subroutine
- GOSUB to a check subroutine
- GOSUB to a feedback subroutine

Each subroutine should be labeled with REM comments.

## Practice Challenge

> **Challenge:** Build a **Text Adventure Starter** using GOSUB:
>
> 1. Write a `GOSUB` that prints the intro text
> 2. Write a `GOSUB` that displays choices
> 3. Write a `GOSUB` that handles each choice (room movement)
> 4. Use a variable for the "current room"
> 5. Loop back to show choices until the player quits
>
> Example structure:
> ```
> 10 LET ROOM = 1
> 20 GOSUB 100
> 30 GOSUB 200
> 40 IF ROOM = 0 THEN PRINT "You left!": END
> 50 GOTO 20
> 100 REM --- ShowRoom ---
> 110 REM Print room description
> 120 RETURN
> 200 REM --- ShowChoices ---
> 210 REM Print choices
> 220 INPUT "Choice: "; C
> 230 REM Update ROOM based on C
> 240 RETURN
> ```

**Sample solution:**
```
10 LET ROOM = 1
20 GOSUB 100
30 GOSUB 200
40 IF ROOM = 0 THEN PRINT "Game over!": END
50 GOTO 20
100 REM --- ShowRoom ---
110 IF ROOM = 1 THEN PRINT "You are in a dark forest."
120 IF ROOM = 2 THEN PRINT "You are at a stone bridge."
130 IF ROOM = 3 THEN PRINT "You are at a treasure chest!"
140 RETURN
200 REM --- ShowChoices ---
210 PRINT "  1. Go north"
220 PRINT "  2. Go south"
230 PRINT "  3. Quit"
240 INPUT "Choose: "; C
250 IF C = 1 THEN ROOM = ROOM + 1
260 IF C = 2 THEN ROOM = ROOM - 1
270 IF C = 3 THEN ROOM = 0
280 RETURN
```

## Quiz

**1. What does `GOSUB 1000` do?**
a) Goes to line 1000 and stops
b) Goes to line 1000, runs until RETURN, then comes back
c) Goes to line 1000 and never comes back
d) Jumps to line 1000 only once

**Answer:** b
**Explanation:** GOSUB jumps to the target line, runs until it finds a RETURN statement, then jumps back to the line immediately after the GOSUB.

**2. What happens to variable X if the subroutine sets X = 99?**
a) It stays unchanged
b) It becomes 99 after RETURN
c) It causes an error
d) It resets to 0

**Answer:** b
**Explanation:** ALL variables in BASIC are global. Any variable changed inside a subroutine keeps its new value after RETURN.

**3. Can you put GOSUB inside another subroutine?**
a) No, only one level allowed
b) Yes, but BASIC doesn't support nesting
c) Yes, BASIC allows unlimited nesting of GOSUBs
d) No, it will crash the program

**Answer:** c
**Explanation:** C64 BASIC allows deep nesting of GOSUB calls. Each RETURN returns to the most recent GOSUB — like a stack.

**4. What is one advantage of using GOSUB over COPY-PASTE?**
a) GOSUB runs faster
b) GOSUB uses less memory
c) GOSUB is easier to maintain — fix once, not many times
d) GOSUB allows loops

**Answer:** c
**Explanation:** The main advantage is maintainability. Fix or modify the subroutine code once, and every call gets the update.

## Summary

- **GOSUB N** jumps to line N; **RETURN** jumps back to the next line
- Variables passed via **shared variables** — they are global, not local
- GOSUB makes code **dry** (Don't Repeat Yourself) — write once, use many times
- **Save variables** you need to preserve, since subroutines may overwrite them
- GOSUB is like a function in modern programming — the building block of structured code!

## What's Next?

You have now learned all nine BASIC building blocks! Congratulations for reaching the end of Level 1! 🎉

In the next level, you will apply everything you know to **work with the screen directly** — poking memory, painting pixels, and mastering the C64's unique character sets. Get ready for hands-on screen hacking!

See you in **Level 2 — Screen & PETSCII!** 🖥️
