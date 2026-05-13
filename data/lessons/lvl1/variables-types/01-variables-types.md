# Lesson 1.1 — Variables & Types

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 1 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Level 0 — Welcome & Basics |
| **Concepts** | Variables, variable types, assignment, variable naming, INT function |

## Theory

Imagine you are playing your very first computer game. The game needs to **remember**:
- Your health (maybe 100)
- Your name (maybe "SALLY")
- How many lives you have lost (maybe 0)

How does a computer remember anything? The answer is **variables** — think of a variable like a labeled box in which you can put a value. You choose the label (the name), and the box holds the data.

In BASIC, there are two kinds of boxes:
1. **Number boxes** — hold whole numbers (like 5, 255, -3, 123485)
2. **String boxes** — hold text (like "HELLO", "SALLY", "YES")

### How to Tell Them Apart

In BASIC, a variable name ending in **$** is a **string** (text) variable. Everything else without the `$` is a **number** variable.

```
SCORE   — a number variable (holds 100, 200, etc.)
LIVES$  — a string variable (holds your name)
X       — a number variable
A$      — a string variable
```

### Assignment = The Magic Arrows

The **=** sign is used for **assignment** in BASIC. It takes the value on the right and stores it in the variable on the left.

```
SCORE = 100
LIVES$ = "SALLY"
```

Think of it like this: the arrow = points to the LEFT. The value goes into the variable on the left.

### Variable Naming Rules

C64 BASIC has simple rules for naming variables:

- Names can be **1 or 2 characters** long (C64 only!)
- They must begin with a **letter** (A-Z)
- The rest can be letters or numbers (A-Z, 0–9)
- **$** goes at the **END** for strings (NAME$, not $NAME)
- No spaces, special characters, or starting with a number

### INT vs. REAL Numbers

Numbers in C64 BASIC are stored as **real** (decimal) numbers. You can have:
- `5`, `5.5`, `100`, `3.14`
- The **INT()** function gives you the whole number part: `INT(3.9)` returns `3`

C64 BASIC only handles **integers** (whole numbers). There is no REAL vs. INTEGER typing — BASIC decides automatically when you assign a value.

## C64 BASIC Examples

### Example 1: Making Variables

Type Example 1 above. Run it! Now try changing the values and run it again.

```
10 SCORE = 50
20 LIVES = 3
30 NAME$ = "HERO"
40 PRINT "Name: "; NAME$
50 PRINT "Score: "; SCORE
60 PRINT "Lives: "; LIVES
```

You should see:
```
Name: HERO
Score: 50
Lives: 3
```

### Example 2: Changing Variable Values

Type Example 2 above. Run it! Watch how the values change.

```
10 X = 5
20 PRINT "X is"; X
30 X = 10
40 PRINT "X is now"; X
50 X = X + 1          ' This reads the old X, adds 1, then saves it
60 PRINT "X is"; X
```

You should see:
```
X is 5
X is now 10
X is 11
```

### Example 3: String vs. Number Variables

Type Example 3 above. Run it! Notice that NAME$ has quotes and SCORE does not.

```
10 NAME$ = "SAM"
20 SCORE = 999
30 PRINT NAME$; " scored "; SCORE; " points!"
```

You should see:
```
SAM scored 999 points!
```

| Code | Description |
|------|-------------|
| `SCORE = 999` | Number variable gets a number — no quotes needed! |
| `NAME$ = "SAM"` | String variable gets text — quotes are part of the syntax! |
| `PRINT NAME$; " scored "; SCORE` | Use $; to glue parts together with semicolons (prints on same line) |

## Exercise

### Step 1: Create Variables

Type the following in your C64 emulator.

10 PRINT "My Character"
20 NAME$ = "BILBO"
30 HEALTH = 100
40 SCORE = 805
50 PRINT "Character: "; NAME$
60 PRINT "Health: "; HEALTH
70 PRINT "Score: "; SCORE

- Expected output:
```
My Character
Character: BILBO
Health: 100
Score: 805
```

### Step 2: Change and Re-run

1 Type the following program to watch a value change.

10 X = 5: PRINT "Start: "; X
20 X = X + 3: PRINT "End: "; X

- Expected output:
```
Start: 5
End: 8
```

2. The `X = X + 3` line may seem strange. Read X, add 3, save the result back into X.

### Step 3: Create a String

Write a program that uses a string variable.

10 NAME$ = "C64"
20 GREET$ = "HELLO"
30 PRINT GREET$; ","; NAME$; " WELCOME"

- Expected output:
```
HELLO,C64 WELCOME
```

## Practice Challenge

Build a **"Character Profile Card"**. Create a program that stores character information and prints it:

1. Create variables: `NAME$`, `CLASS$`, `LEVEL`, and `HP`
2. Assign them values of your choice
3. Print a profile card with all four values

**Hints:**
- Use `PRINT` with semicolons `;` to keep everything on one line
- Remember `HP` and `LEVEL` are numbers (no quotes), while `NAME$` and `CLASS$` are strings (need quotes)

**Sample solution:**
```
10 NAME$ = "ZARA"
20 CLASS$ = "MAGE"
30 LEVEL = 25
40 HP = 99
50 PRINT "*** "; NAME$; " - Level "; LEVEL
60 PRINT "Class: "; CLASS$; " | HP: "; HP
```

## Quiz

**1. Which of these is a STRING variable name in C64 BASIC?**
a) `A5`
b) `NAME`
c) `NAME$`
d) `NAME1`

**Answer:** c

**Explanation:** String variables must end with the `$` character. `NAME$` is the only string variable here.

**2. What happens when you execute `A = 10` and then execute `A = 5`?**

a) A now holds both 10 and 5
b) A's old value (10) is replaced; A now holds 5
c) An error because you can't change a variable's value
d) The program crashes

**Answer:** b

**Explanation:** Variables hold exactly ONE value at a time. When you assign a new value, the old one is replaced.

**3. Why does this program fail?**

```
10 5NAME$ = "HELLO"
20 PRINT 5NAME$
```

a) PRINT doesn't accept string variables
b) Variable names cannot start with a number
c) The $ sign is in the wrong place
d) 5NAME$ is actually valid in C64 BASIC

**Answer:** b

**Explanation:** Variable names in C64 BASIC must begin with a letter, never a digit.

**4. What does `INT(7.9)` return?**

a) 8
b) 7.9
c) 7
d) an error

**Answer:** c

**Explanation:** INT() returns the integer part (whole number) of a value, rounding toward zero. `INT(7.9) = 7`.

## Summary

- Variables are **labeled boxes** that store values in your program
- String variables end with **$** (like `NAME$`); numeric variables do not (like `SCORE`)
- The **=** sign **assigns** the right-side value to the left-side variable
- Variable names must **start with a letter** (A-Z) and be 1-2 characters long
- C64 BASIC only handles **integers**; **INT()** extracts the whole number part
- A variable can hold **only one value** at a time — assigning a new value overwrites the old one

## What's Next?

Now that you can store information in variables, how do you **do math** with that information? In the next lesson, you'll learn about **Expressions** — how to add, subtract, multiply, divide, and generate random numbers. See you in **Lesson 2: Expressions**! ✨
