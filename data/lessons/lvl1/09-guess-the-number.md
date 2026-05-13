# Lesson 1.9 — Capstone: Guess the Number Game

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 9 |
| **Estimated Time** | ~30 min |
| **Prerequisites** | All Level 1 lessons (Variables, Expressions, INPUT, IF/THEN, FOR/NEXT, Arrays, Strings, GOSUB) |
| **Concepts** | Combining all Level 1 concepts into a complete game, RND function, IF/THEN logic loops, user input handling, game flow |

## Theory

This is the **final challenge** of Level 1 — a complete game! You will combine EVERY concept from Levels 1.1 through 1.8 into one program: a **number guessing game**.

The computer picks a random number (1–100). You guess it. After each guess, the computer tells you if you need to go **higher** or **lower**. The game ends when you guess correctly.

> **Concept:** This lesson teaches you to combine multiple BASIC structures into a working program — the real test of what you've learned.

### New Tool: RND() — Random Numbers

C64 BASIC has a built-in **RND** function that generates pseudo-random numbers:

- `RND(1)` → returns a value between 0 and just under 1
- `INT(RND(1) * N) + 1` → returns a number from 1 to N

```
10 LET SECRET = INT(RND(1) * 100) + 1
20 PRINT "I picked a number from 1 to 100!"
30 PRINT "(Hint: it's "; SECRET; ")  -- don't look!"
```

### Game Loop Structure

Every game follows a pattern:

```
10 INITIALIZATION (set up variables)
20 GAME LOOP:
30   SHOW STATE (display current info)
40   GET INPUT (player's guess)
50   CHECK WIN/LOSE (was guess correct?)
60   GIVE FEEDBACK (higher/lower)
70   LOOP BACK TO 20 if not finished
80 END
```

## C64 BASIC Examples

### Example 1: Full Guess the Number Game

```
10 REM === GUESS THE NUMBER ===
20 POKE 147
30 PRINT "=== GUESS THE NUMBER ==="
40 PRINT
50 LET SECRET = INT(RND(1) * 100) + 1
60 LET GUESSES = 0
70 PRINT "I'm thinking of a number from 1 to 100."
80 PRINT "Can you guess it?"
90 PRINT
100 REM --- Main game loop ---
110 INPUT "Your guess: "; GUESS
120 LET GUESSES = GUESSES + 1
130 IF GUESS = SECRET THEN GOTO 200
140 IF GUESS < SECRET THEN PRINT "Too LOW!  Try again.": GOTO 100
150 PRINT "Too HIGH!  Try again.": GOTO 100
200 REM --- You won! ---
210 PRINT
220 PRINT "You got it in"; GUESSES; "guess(es)!"
230 IF GUESSES <= 7 THEN PRINT "Amazing!"
240 IF GUESSES > 7 THEN PRINT "Maybe try thinking smaller next time!"
250 PRINT
260 PRINT "Play again?"
270 INPUT "Type Y for yes: "; PLAY$
280 IF LEFT$(PLAY$, 1) = "Y" OR LEFT$(PLAY$, 1) = "y" THEN GOTO 20
290 PRINT "Thanks for playing!"
300 END
```

### Example 2: Guess the Number with Feedback Messages

```
10 REM === GUESS THE NUMBER (ENHANCED) ===
20 POKE 147
30 LET SECRET = INT(RND(1) * 100) + 1
40 LET GUESSES = 0
50 LET LOW = 1
60 LET HIGH = 100
70 PRINT "=== GUESS THE NUMBER ==="
80 PRINT "Guess the number 1-100."
90 PRINT
100 INPUT "Guess: "; GUESS
110 LET GUESSES = GUESSES + 1
120 IF GUESS = SECRET THEN GOTO 200
130 IF GUESS < LOW THEN LET LOW = GUESS + 1
140 IF GUESS > HIGH THEN LET HIGH = GUESS - 1
150 PRINT "Too "; IF GUESS < SECRET THEN PRINT "LOW!  Range:"; LOW; "-"; HIGH
160 PRINT "Too "; IF GUESS > SECRET THEN PRINT "HIGH!  Range:"; LOW; "-"; HIGH
170 GOTO 100
200 PRINT
210 PRINT "Correct! You got it in"; GUESSES; "guesses!"
220 PRINT "Your range narrowed from 1-100 to:"; LOW; "-"; HIGH
230 END
```

### Example 3: Using GOSUB for Game Structure

```
10 POKE 147
20 GOSUB 100
30 GOSUB 200
40 END
100 REM --- ShowIntro ---
110 PRINT "=== GUESS THE NUMBER ==="
120 PRINT "I'm thinking of a number 1-100."
130 RETURN
200 REM --- PlayGame ---
210 LET SECRET = INT(RND(1) * 100) + 1
220 LET GUESSES = 0
230 GOSUB 300
240 PRINT "You won in"; GUESSES; "guesses!"
250 RETURN
300 REM --- MainLoop ---
310 INPUT "Guess: "; G
320 LET GUESSES = GUESSES + 1
330 IF G = SECRET THEN RETURN
340 IF G < SECRET THEN PRINT "Too LOW!": GOTO 310
350 PRINT "Too HIGH!": GOTO 310
```

## Exercise

### Step 1: Set Up the Variables

```
10 POKE 147
20 LET SECRET = INT(RND(1) * 100) + 1
30 LET GUESSES = 0
40 PRINT "=== GUESS THE NUMBER ==="
50 PRINT
```

### Step 2: Add the Guessing Loop

```
100 INPUT "Your guess: "; GUESS
110 LET GUESSES = GUESSES + 1
120 IF GUESS = SECRET THEN PRINT "YOU WON!": GOTO 200
130 IF GUESS < SECRET THEN PRINT "Too LOW!"
140 IF GUESS > SECRET THEN PRINT "Too HIGH!"
150 GOTO 100
```

### Step 3: Add Try-Again Option

```
200 PRINT "You got it in"; GUESSES; "guesses!"
210 INPUT "Play again? (Y/N): "; PLAY$
220 IF LEFT$(PLAY$, 1) = "Y" THEN GOTO 10
230 PRINT "Thanks for playing!"
240 END
```

### Step 4: Add Range Hints

```
130 IF GUESS < SECRET THEN PRINT "Too LOW!"; LOW$ = STR$(LOW); " - "; HI$ = STR$(HIGH)
140 IF GUESS > SECRET THEN PRINT "Too HIGH!"; LOW$ = STR$(LOW); " - "; HI$ = STR$(HIGH)
150 GOTO 100
```

(Add `LET LOW = 1` and `LET HIGH = 100` initialization.)

## Practice Challenge

> **Challenge:** Build an **Enhanced Guess the Number** game with these features:
>
> 1. Difficulty levels: easy (1-25, 5 guesses), medium (1-50, 7 guesses), hard (1-100, 10 guesses)
> 2. Score tracking: give points based on how few guesses you used
> 3. Best score: track your best game ever
> 4. Round counter: play 3 rounds per session
>
> **Hints:**
> - Use IF/THEN for difficulty selection
> - Use a FOR/NEXT loop for the guess limit
> - Track best score in a variable
> - Round counter: increment a variable, reset scores after 3 rounds

**Sample solution:**
```
10 POKE 147
20 LET BEST = 999
30 LET ROUND = 1
40 GOTO 100
100 REM --- Difficulty Selection ---
110 PRINT "=== GUESS THE NUMBER ==="
120 PRINT "Difficulty:"
130 PRINT "  1 - Easy (1-25)"
140 PRINT "  2 - Medium (1-50)"
150 PRINT "  3 - Hard (1-100)"
160 INPUT "Choice: "; DIFF
170 IF DIFF = 1 THEN MAX = 25: ATTEMPTS = 5
180 IF DIFF = 2 THEN MAX = 50: ATTEMPTS = 7
190 IF DIFF = 3 THEN MAX = 100: ATTEMPTS = 10
200 GOTO 250
250 REM --- Setup ---
260 LET SECRET = INT(RND(1) * MAX) + 1
270 LET GUESSES = 0
280 LET LOW = 1: LET HIGH = MAX
290 GOTO 350
300 REM --- Next Round ---
310 LET ROUND = ROUND + 1
320 IF ROUND > 3 THEN PRINT "=== FINAL SCORES ===": END
330 GOTO 100
350 REM --- Main Loop ---
360 PRINT "Round "; ROUND; " — guess 1-", MAX
370 INPUT "Guess: "; G
380 LET GUESSES = GUESSES + 1
390 IF G = SECRET THEN GOTO 450
400 LET GUESSES = GUESSES + 1
410 IF G < SECRET THEN PRINT "Too low! Range:"; LOW; "-"; HIGH
420 IF G > SECRET THEN PRINT "Too high! Range:"; LOW; "-"; HIGH
430 IF GUESSES >= ATTEMPTS THEN PRINT "Game over!": LET BEST = BEST: GOTO 300
440 GOTO 360
450 LET SCORE = ATTEMPTS - GUESSES + MAX
460 PRINT "Won in"; GUESSES; "guesses!"; ATTEMPTS - GUESSES + MAX; " points!"
470 IF GUESSES < BEST THEN LET BEST = GUESSES
480 GOTO 300
```

## Quiz

**1. What does `INT(RND(1) * 100) + 1` produce?**
a) A number from 0 to 99
b) A number from 1 to 100
c) A number from 0 to 100
d) A decimal number between 0 and 1

**Answer:** b
**Explanation:** `RND(1)` gives 0 to just under 1. Times 100 = 0 to just under 100. `INT()` makes it 0-99. Plus 1 = 1-100.

**2. Why is GOSUB useful in a game program?**
a) It makes the game run faster
b) It organizes code into named blocks for readability
c) It allows the game to run on multiple screens
d) It saves random numbers

**Answer:** b
**Explanation:** GOSUB lets you organize code into separate sections (intro, game loop, feedback) making it easier to read and modify.

**3. What happens to the game loop when GUESS = SECRET?**
a) The loop continues
b) The program exits via GOTO 200 without looping
c) An error occurs
d) The game restarts automatically

**Answer:** b
**Explanation:** When you guess correctly, line 130 jumps you to the win screen (line 200), skipping the loop back to line 100.

## Summary

- **RND(1)** generates random numbers — combine with INT for ranges
- **IF/THEN/ELSE** and **GOTO** create the game loop structure
- **GOSUB/RETURN** organizes the code into named sections
- **Variable tracking** (guesses, scores, rounds) powers all game logic
- **Input handling** with INPUT and string functions drives player interaction
- **Loops** (IF + GOTO or FOR/NEXT) keep the game going until done

## What's Next?

You've completed ALL of Level 1! You now know the complete set of BASIC building blocks. In **Level 2**, you'll apply these to manipulate the screen directly — POKE memory, paint with colors, and work with PETSCII character codes.

See you in **Level 2 — Screen & PETSCII!** 🖥️
