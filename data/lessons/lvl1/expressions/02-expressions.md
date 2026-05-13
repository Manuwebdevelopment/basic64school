# Lesson 1.2 — Expressions

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 2 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Variables & types (Lesson 1) |
| **Concepts** | Arithmetic operators (+, -, *, /, %), operator precedence, parentheses, RND(10) |

## Theory

Now that you can store information in variables, it's time to **do something** with that information! **Expressions** are how you tell the computer to perform calculations.

Think of expressions like mathematical formulas: you give the computer some numbers (either stored in variables or typed directly) and tell it what to do with them. The computer does the calculations and gives you a result.

### C64 BASIC Arithmetic Operators

| Operator | Symbol | What It Does | Example | Result |
|-|--|-|--|-|
| Add | `+` | Adds two numbers | `5 + 3` | `8` |
| Subtract | `-` | Subtracts the second from the first | `10 - 4` | `6` |
| Multiply | `*` | Multiplies two numbers | `6 * 7` | `42` |
| Divide | `/` | Divides one number by another (integer) | `17 / 5` | `3` |
| Modulus | `%` | Gives the REMAINDER after division | `17 % 5` | `2` |
| Exponent | `^` | Raises a number to a power | `2 ^ 3` | `8` |

### The Secret of Order of Operations

Just like in real math, C64 BASIC has a strict **order of operations** — also called **operator precedence**. Here is the hierarchy (high-to-low):

1. Parentheses first
2. Exponentiation `^`
3. Multiplication `*`, Division `/`, Modulus `%`
4. Addition `+`, Subtraction `-`

So `5 + 3 * 2` equals **11**, not 16. Multiplication happens **before** addition (just like in school math!).

If you want to change the order, use **parentheses**:

- `5 + 3 * 2` = 11 (multiply first)
- `(5 + 3) * 2` = 16 (add first, then multiply)

### RND(10) — Picking a Random Number

C64 BASIC has a built-in function called **RND(10)** that picks a random whole number from **0 to 9**. Every time you call it, you get a (possibly different) number.

```
PRINT RND(10)       ' Prints a random number from 0 to 9
```

This is how classic C64 games generated random events — enemy attacks, treasure drops, and dice rolls!

#### Getting Larger RNG ranges

To get random numbers in a different range, use this pattern:

```
INT(RND(10) * N)
```

This gives you a random number from **0 to N − 1**:
- `INT(RND(10) * 6)` → random 0 to 5 (like a die!)
- `INT(RND(10) * 10)` → random 0 to 9 (full RND range)

#### Getting a Range That Starts at 1

To start at 1 instead of 0, **add 1**:

```
INT(RND(10) * 6) + 1   ' → random 1 to 6 (perfect for a die!)
```

## C64 BASIC Examples

### Example 1: A Simple Calculator

```
10 A = 10
20 B = 3
30 PRINT A; "+"; B; "=";A+B
40 PRINT A; "-"; B; "=";A-B
50 PRINT A; "*"; B; "=";A*B
60 PRINT A; "/"; B; "=";A/B
70 PRINT A; "%"; B; "=";A%B
```

**Output:**
```
10+3=13
10-3=7
10*3=30
10/3=3
10%3=7
```

### Example 2: Operator Precedence

```
10 PRINT "5+3*2="; 5+3*2
20 PRINT "(5+3)*2=";(5+3)*2
```

**Output:**
```
5+3*2=11
(5+3)*2=16
```

Notice: without parentheses, the multiplication happens first (11). With parentheses, the addition happens first (16).

### Example 3: Rolling Dice

```
10 PRINT "Rolling a die..."
20 LET D=INT(RND(10)*6)+1
30 PRINT "You rolled:";D
40 IF D=6 THEN PRINT "Nice! Six!"
50 IF D=1 THEN PRINT "Oh no! Snake eyes!"
```

**Sample output:**
```
Rolling a die...
You rolled:6
Nice! Six!
```

You'll get a different number each time you run it!

### Example 4: Modulus — Perfect for Even/Odd Checks

```
10 INPUT "Choose a number:";N
20 IF N%2=0 THEN PRINT "Odd!": GOTO 40
30 PRINT "Even!"
40 PRINT "Done."
```

If you type 7:
```
Choose a number:7
Odd!
Done.
```

If you type 8:
```
Choose a number:8
Even!
Done.
```

## Exercise

### Step 1: Try Arithmetic

Type this program in your C64 emulator:

```
10 A = 15
20 B = 4
30 PRINT "Results:"
40 PRINT A; "+" ; B;"=";A+B
50 PRINT A; "-" ; B;"=";A-B
60 PRINT A; "*" ; B;"=";A*B
70 PRINT A; "/" ; B;"=";A/B
80 PRINT A; "%" ; B;"=";A%B
```

- Expected output:
```
Results:
15+4=19
15-4=11
15*4=60
15/4=3
15%4=7
```

### Step 2: Experiment with Parentheses

Type Example 2 and run it. Now try these:

- `PRINT 12 + 8 * 2` — What do you get? (Answer: 28)
- `PRINT (12 + 8) * 2` — What do you get? (Answer: 40)

### Step 3: Roll 5 Dice

Type this program to roll a die 5 times:

```
10 FOR I = 1 TO 5
20 LET D = INT(RND(10) * 6) + 1
30 PRINT "Roll"; I; ":"; D
40 NEXT I
```

- Expected output (numbers will vary):
```
Roll 1: 4
Roll 2: 6
Roll 3: 1
Roll 4: 3
Roll 5: 5
```

## Practice Challenge

> **Challenge:** Write a program that simulates rolling TWO dice, adds the total, and tells the player if the total is high (>= 9), medium (4-8), or low (<= 3). Use random numbers for both dice and IF / THEN for the comparison.

**Hints:**
- Roll two dice: `D1 = INT(RND(10) * 6) + 1` and `D2 = INT(RND(10) * 6) + 1`
- Add them: `T = D1 + D2`
- Use IF/THEN/ELSE to check the ranges

## Quiz

**1. What is the result of `10 + 2 * 3`?**
a) 36
b) 16
c) 24
d) 10

**Answer:** b

**Explanation:** Multiplication happens before addition. `2*3 = 6`, then `10+6=16`.

**2. How do you make parentheses change the order of operations? `10 + 2 * 3`?**
a) Use brackets []
b) `(10 + 2) * 3`
c) You can't — parentheses don't work in C64 BASIC
d) `10 + 2 * (3)`

**Answer:** b

**Explanation:** Parentheses `( )` force the enclosed calculation to happen first: `(10 + 2) = 12`, then `12 * 3 = 36`.

**3. What range does `INT(RND(10) * 6) + 1` produce?**
a) 0-5
b) 1-6
c) 0-6
d) 1-5

**Answer:** b

**Explanation:** `RND(10) * 6` produces 0-5 (as integers), then adding 1 gives 1-6. This is like rolling a die!

**4. If `N = 13`, what is `N % 3`?**
a) 1
b) 4
c) 0
d) 9

**Answer:** a

**Explanation:** 13 divided by 3 equals 4 with a remainder of 1. The `%` operator gives you the remainder.

## Summary

- C64 BASIC supports **+**, **-**, **\***, **/**, **%**, and the **^** (exponent) operators
- **Operator precedence**: parentheses → exponentiation → multiply/divide/modulus → add/subtract
- **Parentheses** `( )` let you change the order — the computer always calculates inside parentheses first
- **RND(10)** picks a random number from 0 to 9
- To get a range of **A to B**: `INT(RND(10) * (B - A + 1)) + A`
- Integer division (`/`) drops the decimal part
- The modulus operator (%) gives you the **remainder** after division

## What's Next?

You know how to do math. But how do you **show results** on screen and **get input** from the player? In the next lesson, you'll learn about **INPUT and PRINT** — the commands that let your C64 program talk to the player. See you in **Lesson 3: INPUT & PRINT**! 📟
