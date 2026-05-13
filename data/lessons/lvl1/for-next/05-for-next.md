# Lesson 1.5 — FOR / NEXT: Repeat with Loops

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 5 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | IF / THEN / GOTO (Lesson 4) |
| **Concepts** | FOR/NEXT loops, STEP values, EXIT, nested loops, counting patterns |

## Theory

Imagine you need to print the line "HELLO" 100 times. Would you type it 100 times? Of course not! You would use a **loop** — a command that repeats a block of code over and over.

The C64's loop is called **FOR / NEXT**. Think of it like a metronome in music: you set it to count from one number to another, and it clicks away, letting you do something on every tick.

### How FOR / NEXT Works

The simplest loop looks like this:

```
10 FOR I = 1 TO 5
20 PRINT I
30 NEXT I
```

Here is what happens:
1. The computer sets `I` to 1
2. Does everything between `FOR` and `NEXT` (prints 1)
3. Goes back to `FOR`, adds 1 to `I` (so `I` becomes 2)
4. Checks: "Is `I` still <= 5?" Yes! Go back to step 2
5. When `I` becomes 6, the loop stops and the program continues

**The loop variable (`I` in this case) is called the counter.** It is the secret heartbeat of the loop — it keeps track of which "lap" the program is on.

### STEP: Skipping Numbers in Your Loop

What if you want to count by 2s instead of 1s? Use **STEP**:

```
10 FOR I = 0 TO 10 STEP 2
20 PRINT I
30 NEXT I
```

Output: `0 2 4 6 8 10`

The STEP value changes how much the counter increments each time. STEP can be positive (counting up) or negative (counting down).

### EXIT: Breaking Out Early

Sometimes you want to stop a loop before it finishes. Use **EXIT** to jump out:

```
10 FOR I = 1 TO 10
20   PRINT I
30   IF I = 3 THEN GOTO 50
40 NEXT I
50 PRINT "Stopped at"; I
```

Output: `1 2 3 Stopped at 3`

We use the IF / GOTO trick to EXIT when a condition is met, because C64 BASIC does not have a standalone `EXIT FOR` statement.

### Nested FOR / NEXT: Loops Inside Loops

You can even put a loop inside a loop! This is called a **nested loop**. Think of it like days of the week (inner loop) and how many times each week repeats (outer loop).

```
10 FOR I = 1 TO 3
20   FOR J = 1 TO 2
30     PRINT "I="; I; " J="; J
40   NEXT J
50 NEXT I
```

Output:
```
I=1 J=1
I=1 J=2
I=2 J=1
I=2 J=2
I=3 J=1
I=3 J=2
```

**Key Rule:** The inner loop (J) completes all its iterations before the outer loop (I) moves to the next value. Always use different variable names for each loop!

## C64 BASIC Examples

### Example 1: Counting from 1 to 5

Type the code below and run it!

```
10 FOR I = 1 TO 5
20 PRINT I
30 NEXT I
```

**Output:**
```
1
2
3
4
5
```

| Code | Description |
|------|-------------|
| `FOR I = 1 TO 5` | Start loop with I at 1, run until I reaches 5 |
| `PRINT I` | Print the current value of the counter I |
| `NEXT I` | Go back to FOR — add 1 to I automatically |

### Example 2: Counting Down with STEP

```
10 FOR I = 10 TO 1 STEP -2
20 PRINT I
30 NEXT I
```

**Output:**
```
10
8
6
4
2
```

| Code | Description |
|------|-------------|
| `FOR I = 10 TO 1 STEP -2` | Start at 10, go down to 1, subtract 2 each time |
| `PRINT I` | Print the current value |
| `NEXT I` | Subtract 2 (because of STEP -2) |

### Example 3: Drawing Dots Across the Screen

```
10 PRINT CHR$(147)
20 PRINT "DRAWING DOTS...": PRINT
30 FOR I = 1 TO 5
40   PRINT "● ";
50 NEXT I
60 PRINT
70 FOR I = 1 TO 5
80   PRINT "* ";
90 NEXT I
```

**Output:**
```
DRAWING DOTS...

● ● ● ● ● 
* * * * * 
```

| Code | Description |
|------|-------------|
| `CHR$(147)` | Clear the screen |
| `"● ";` | Print with semicolon to stay on the same line |
| `FOR I = 1 TO 5: NEXT I` | Repeat 5 times, printing one icon per loop |

### Example 4: Countdown Timer with EXIT

```
10 PRINT "LAUNCH IN...": PRINT
20 FOR I = 5 TO 1 STEP -1
30   PRINT I; "..."
40   FOR T = 1 TO 200: NEXT T
50   IF I = 3 THEN GOTO 70
60 NEXT I
70 PRINT "BLAST OFF!"
80 END
```

**Output:**
```
LAUNCH IN...
5...
4...
BLAST OFF!
```

| Code | Description |
|------|-------------|
| `FOR I = 5 TO 1 STEP -1` | Countdown from 5 to 1 |
| `FOR T = 1 TO 200: NEXT T` | Fake delay — the "pause" between numbers |
| `IF I = 3 THEN GOTO 70` | If we hit the number 3, skip the rest |

### Example 5: Box of Stars Pattern

```
10 PRINT CHR$(147)
20 FOR R = 1 TO 5
30   FOR C = 1 TO 5
40     PRINT "*";
50   NEXT C
60   PRINT
70 NEXT R
```

**Output:**
```
*****
*****
*****
*****
*****
```

| Code | Description |
|------|-------------|
| `FOR R = 1 TO 5` | Outer loop — each row of the box |
| `FOR C = 1 TO 5` | Inner loop — each column inside the current row |
| `PRINT "*";` | Print one star without a newline |
| `PRINT` | Move to the next line after finishing a row |

## Exercise

### Step 1: Count to 10

Type and run this program:

```
10 FOR N = 1 TO 10
20 PRINT N;
30 NEXT N
```

- **Expected output:** `1 2 3 4 5 6 7 8 9 10` (all on one line, separated by spaces)

### Step 2: Count by Fives

Modify the loop to count by 5s up to 50:

```
10 FOR N = 5 TO 50 STEP 5
20 PRINT N;
30 NEXT N
```

- **Expected output:** `5 10 15 20 25 30 35 40 45 50`

### Step 3: Sum of Numbers 1 to 10

Use a variable to add up all numbers from 1 to 10:

```
10 SUM = 0
20 FOR I = 1 TO 10
30   SUM = SUM + I
40 NEXT I
50 PRINT "The sum is:"; SUM
```

- **Expected output:**
```
The sum is: 55
```

### Step 4: Multiplication Table

Print the multiplication table for 7:

```
10 FOR I = 1 TO 10
20 PRINT "7 x"; I; "="; 7 * I
30 NEXT I
```

- **Expected output:**
```
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
...
7 x 10 = 70
```

## Practice Challenge

> **Challenge:** Print a right-angled triangle of stars, where the size depends on a variable. Make a 5-row triangle:
>
> ```
> *
> **
> ***
> ****
> *****
> ```
>
> **Hints:**
> - Use an outer loop for the rows (`FOR R = 1 TO 5`)
> - Use an inner loop for the stars in each row (`FOR C = 1 TO R`)
> - Use `PRINT "*";` to print stars on the same line
> - Use `PRINT` (with no arguments) to move to the next line after the inner loop

**Sample solution:**
```
10 FOR R = 1 TO 5
20   FOR C = 1 TO R
30     PRINT "*";
40   NEXT C
50   PRINT
60 NEXT R
```

## Quiz

**1. What does the following code print?**
```
10 FOR I = 1 TO 3
20 PRINT I
30 NEXT I
```
a) 1 2 3
b) 1, 2, 3 (on separate lines)
c) Error message
d) Nothing at all

**Answer:** b
**Explanation:** Each `PRINT` without a semicolon starts a new line. So it prints 1, then 2 on the next line, then 3 on the next line.

**2. What does `FOR X = 10 TO 0 STEP -2` do?**
a) Counts from 10 down to 0 in steps of 2
b) Counts from 10 down to 0 in steps of 1
c) Counts from 0 to 10
d) Loops forever — this is a bug!

**Answer:** a
**Explanation:** The STEP value of -2 means subtract 2 each time: 10, 8, 6, 4, 2, 0. The loop stops when the counter goes past the target (0 in this case).

**3. In a nested loop, which loop finishes first?**
a) The outer loop
b) The inner loop
c) Both finish at the same time
d) It depends on the STEP values

**Answer:** b
**Explanation:** The inner loop completes ALL its iterations for each single step of the outer loop. Only after the inner loop finishes does the outer loop move to the next value.

**4. What does the following print?**
```
10 FOR I = 2 TO 8 STEP 3
20 PRINT I;
30 NEXT I
```
a) 2 5 8
b) 2 3 4 5 6 7 8
c) 2 5 8 11
d) Error

**Answer:** a
**Explanation:** Starting at 2, adding 3 each time: 2, then 2+3=5, then 5+3=8. Next would be 11, but 11 > 8, so it stops.

## Summary

- **FOR / NEXT** creates a loop that repeats code a fixed number of times
- The counter variable starts at the first number and increments until it reaches (or passes) the target
- **STEP** changes how much the counter changes each iteration (positive for counting up, negative for counting down)
- **Nested loops** let you repeat actions inside repeating actions — use different variable names for each loop
- Loops are your shortcut for doing the same thing many times without writing the same code over and over
- On the C64, `PRINT` on its own starts a new line; `PRINT "";` keeps things on the same line
- The loop variable is automatically managed by BASIC — you just read it, you do not set it inside the loop body

## What's Next?

You can now repeat actions automatically! But what if you need to remember **many** values at once — like 100 scores from a high-score table, or the positions of 20 enemies on the screen? Variables can only hold ONE value each. The answer is **Arrays** — lets you store a whole collection of values under one name. See you in **Lesson 6: Arrays (DIM)**! 📦
