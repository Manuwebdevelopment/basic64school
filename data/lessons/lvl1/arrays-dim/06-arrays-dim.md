# Lesson 1.6 — Arrays (DIM): Storing Many Values at Once

## Metadata

| Field | Value |
|-----|--|
| **Level** | 1 |
| **Lesson Number** | 6 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | FOR / NEXT loops (Lesson 5), Variables & Types (Lesson 1) |
| **Concepts** | DIM statement, array indexing (0-based), 2D arrays, storing lists and tables |

## Theory

You already know how to store one value in one variable:

```
SCORE = 100
```

But what if you need to store **100 scores**? You would not want to create 100 different variables like `SCORE1`, `SCORE2`, `SCORE3`... That would be a nightmare! The answer is **Arrays** — a single variable that holds many values, indexed by a number.

Think of an array like an **egg carton**. A regular carton holds 12 eggs in 12 slots. Each slot has a number (0 through 11), and you can put one egg in each slot. In C64 BASIC, the carton is your array, the slots are the **indices**, and the eggs are your **values**.

### Creating an Array with DIM

The **DIM** (short for "dimension") statement creates an array. You tell the C64 how many slots to make:

```
DIM SCORE(19)
```

This creates an array called `SCORE` with **20 slots** — numbered 0 through 19. Yes, arrays in C64 BASIC start at **index 0**, just like a real egg carton's first slot is number 0!

### Using Array Slots

| Code | What It Does |
|------|-----|
| `SCORE(0) = 50` | Put the value 50 in slot 0 |
| `SCORE(5) = 100` | Put the value 100 in slot 5 |
| `PRINT SCORE(3)` | Display whatever value is in slot 3 |
| `SCORE(9) = SCORE(0) + SCORE(5)` | Add slot 0 and slot 5, store the result in slot 9 |

### Filling an Array with a FOR Loop

The real power of arrays comes with loops. You can fill an entire array with just a few lines:

```
10 DIM N(9)
20 FOR I = 0 TO 9
30   PRINT "Enter number for slot"; I; ": ";
40   INPUT N(I)
50 NEXT I
```

Now you have 10 numbers stored in one variable! No more `N1`, `N2`... `N9`.

### 2D Arrays: Tables and Grids

Arrays can have more than one dimension. A **2D array** is like a spreadsheet — it has rows and columns:

```
GRID(2, 7)
```

This creates a grid with **3 rows** (0, 1, 2) and **8 columns** (0 through 7). Each cell is accessed by two indices: `GRID(row, col)`.

Use two FOR loops to fill a 2D array, one for rows and one for columns:

```
10 DIM GRID(2, 7)
20 FOR R = 0 TO 2
30   FOR C = 0 TO 7
40     GRID(R, C) = R * 10 + C
50   NEXT C
60 NEXT R
```

Now `GRID(0, 0)` = 0, `GRID(1, 3)` = 13, `GRID(2, 7)` = 27.

### When to Use Arrays vs. Single Variables

| Use Single Variables When... | Use Arrays When... |
|------------------------------|---------------------|
| You only have one or two values | You have a list or collection of values |
| The values are unrelated | The values are related (scores, positions, colors) |
| You need to change them independently | You need to process them all the same way (like in a loop) |

## C64 BASIC Examples

### Example 1: A Simple 1D Array — Storing 5 Scores

```
10 PRINT "=== HIGH SCORE TABLE ==="
20 PRINT
30 DIM SCORES(4)
40 FOR I = 0 TO 4
50   PRINT "Enter score for player"; I + 1; ": ";
60   INPUT SCORES(I)
70 NEXT I
80 PRINT
90 PRINT "--- Results ---"
100 FOR I = 0 TO 4
110   PRINT "Player "; I + 1; ": "; SCORES(I)
120 NEXT I
```

**Sample output:**
```
=== HIGH SCORE TABLE ===

Enter score for player 1: 500
Enter score for player 2: 750
Enter score for player 3: 300
Enter score for player 4: 900
Enter score for player 5: 600

--- Results ---
Player 1: 500
Player 2: 750
Player 3: 300
Player 4: 900
Player 5: 600
```

| Code | Description |
|------|-----|
| `DIM SCORES(4)` | Create an array with 5 slots (0 through 4) |
| `INPUT SCORES(I)` | Get input and store it in slot I |
| `SCORES(I)` | Access any slot using the loop counter as the index |

### Example 2: Finding the Highest Score

```
10 DIM SCORES(9)
20 FOR I = 0 TO 9
30   PRINT "Enter score"; I + 1; ": ";
40   INPUT SCORES(I)
50 NEXT I
60 HIGH = SCORES(0)
70 FOR I = 1 TO 9
80   IF SCORES(I) > HIGH THEN HIGH = SCORES(I)
90 NEXT I
100 PRINT "Highest score:"; HIGH
```

**Key idea:** Start by assuming the first value is the highest. Compare every other value to it. If you find a bigger one, replace the winner!

| Code | Description |
|------|-----|
| `HIGH = SCORES(0)` | Start with the first score as the highest |
| `IF SCORES(I) > HIGH` | Compare each score to the current high |
| `HIGH = SCORES(I)` | Update the high score if current one is bigger |

### Example 3: A 2D Array — A Color Palette Table

```
10 PRINT "COLOR PALETTE"
20 DIM PALETTE(3, 7)
30 FOR R = 0 TO 3
40   FOR C = 0 TO 7
50     PALETTE(R, C) = R * 8 + C
60   NEXT C
70 NEXT R
80 FOR R = 0 TO 3
90   LINE$ = ""
100  FOR C = 0 TO 7
110    LINE$ = LINE$ + STR$(PALETTE(R, C)) + " "
120  NEXT C
130  PRINT LINE$
140 NEXT R
```

**Output:**
```
COLOR PALETTE
0 1 2 3 4 5 6 7 
8 9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
```

| Code | Description |
|------|-----|
| `DIM PALETTE(3, 7)` | Create a 4-row by 8-column grid |
| `PALETTE(R, C)` | Access a cell using row and column |
| `STR$(PALETTE(R, C))` | Convert the number to a string for printing |

### Example 4: A Toggle Board — 0 and 1 Array

```
10 PRINT CHR$(147)
20 DIM BOARD(2, 2)
30 FOR R = 0 TO 2
40   FOR C = 0 TO 2
50     BOARD(R, C) = 0
60   NEXT C
70 NEXT R
80 ' Fill in some cells with 1
90 BOARD(0, 0) = 1: BOARD(1, 1) = 1: BOARD(2, 2) = 1
100 PRINT "Board status:"
110 FOR R = 0 TO 2
120   LINE$ = ""
130   FOR C = 0 TO 2
140     IF BOARD(R, C) = 1 THEN LINE$ = LINE$ + "X "
150     ELSE LINE$ = LINE$ + ". "
160   NEXT C
170   PRINT LINE$
180 NEXT R
```

**Output:**
```
Board status:
X . .
. X .
. . X
```

| Code | Description |
|------|-----|
| `DIM BOARD(2, 2)` | 3x3 board (indices 0, 1, 2 for each) |
| `BOARD(R, C) = 0` | Initialize all cells to 0 (empty) |
| `BOARD(0, 0) = 1` | Set a single cell to 1 (marked) |
| `IF BOARD(R, C) = 1` | Use the array value to decide what to print |

## Exercise

### Step 1: Create and Fill an Array

```
10 DIM A(4)
20 FOR I = 0 TO 4
30   A(I) = I * 10
40 NEXT I
50 FOR I = 0 TO 4
60   PRINT "A("; I; ") ="; A(I)
70 NEXT I
```

- **Expected output:**
```
A(0) = 0
A(1) = 10
A(2) = 20
A(3) = 30
A(4) = 40
```

### Step 2: Print Array in One Line

Modify the previous program to print all values on one line:

```
10 DIM A(9)
20 FOR I = 0 TO 9
30   A(I) = I + 1
40 NEXT I
50 FOR I = 0 TO 9
60   PRINT A(I);
70 NEXT I
```

- **Expected output:** `1 2 3 4 5 6 7 8 9 10`

### Step 3: Store and Find the Lowest Value

```
10 DIM NUMS(4)
20 ' Fill array
30 FOR I = 0 TO 4
40   NUMS(I) = INT(RND(10) * 20)
50 NEXT I
60 ' Find lowest
70 LOW = NUMS(0)
80 FOR I = 1 TO 4
90   IF NUMS(I) < LOW THEN LOW = NUMS(I)
100 NEXT I
110 PRINT "Lowest value:"; LOW
```

### Step 4: A 2D Addition Table

Print a 5x5 multiplication-style addition table:

```
10 DIM TBL(4, 4)
20 FOR R = 0 TO 4
30   FOR C = 0 TO 4
40     TBL(R, C) = R + C
50   NEXT C
60 NEXT R
70 FOR R = 0 TO 4
80   LINE$ = ""
90   FOR C = 0 TO 4
100    LINE$ = LINE$ + STR$(TBL(R, C)) + " "
110  NEXT C
120  PRINT LINE$
130 NEXT R
```

## Practice Challenge

> **Challenge:** Build a **"Number Tracker"** that stores up to 20 numbers a player enters. Then:
>
> 1. Ask the player how many numbers they want to enter (1 to 20)
> 2. Fill the array with their input
> 3. Print all values back on one line
> 4. Print the total (sum) of all values
> 5. Print how many values are greater than 10
>
> **Hints:**
> - Use `INPUT N` to get the size (1 to 20)
> - Use `DIM` to create the array
> - Use a second loop after inputting to calculate the total
> - Use a third loop to count values > 10

**Sample solution:**
```
10 PRINT "--- NUMBER TRACKER ---"
20 PRINT
30 INPUT "How many numbers (1-20)? "; N
40 DIM NUMS(19)
50 PRINT
60 FOR I = 0 TO N - 1
70   PRINT "Number"; I + 1; ": ";
80   INPUT NUMS(I)
90 NEXT I
100 PRINT
110 PRINT "Input:";
120 FOR I = 0 TO N - 1
130   PRINT NUMS(I);
140 NEXT I
150 PRINT
160 TOTAL = 0
170 FOR I = 0 TO N - 1
180   TOTAL = TOTAL + NUMS(I)
190 NEXT I
200 PRINT "Total:"; TOTAL
210 GREATER = 0
220 FOR I = 0 TO N - 1
230   IF NUMS(I) > 10 THEN GREATER = GREATER + 1
240 NEXT I
250 PRINT "Count > 10:"; GREATER
```

## Quiz

**1. How many slots does `DIM LIST(9)` create?**
a) 9 slots (0 through 8)
b) 10 slots (0 through 9)
c) 9 slots (1 through 9)
d) 11 slots (0 through 10)

**Answer:** b
**Explanation:** In C64 BASIC, `DIM LIST(9)` creates indices from 0 to 9, which is 10 total slots. The number inside the parentheses is the last index, and indexing always starts at 0.

**2. What does this print?**
```
10 DIM A(2)
20 A(0) = 10
30 A(1) = 20
40 A(2) = 30
50 PRINT A(1)
```
a) 10
b) 20
c) 30
d) An error

**Answer:** b
**Explanation:** `A(1)` is the second slot (index 1), which was set to 20 in line 30.

**3. How do you access the third row, fifth column of `DIM GRID(5, 9)`?**
a) `GRID(3, 5)`
b) `GRID(2, 4)`
c) `GRID(3, 4)`
d) `GRID(2, 5)`

**Answer:** b
**Explanation:** Row 3 is index 2 (because we start at 0), and column 5 is index 4. So it is `GRID(2, 4)`.

**4. Why would you use an ARRAY instead of separate variables?**
a) Arrays are faster to type
b) Arrays let you use loops to process many values at once
c) Arrays use less memory
d) Arrays can store both numbers and strings in the same slot

**Answer:** b
**Explanation:** The main advantage of arrays is that you can iterate through all elements using a loop. Instead of writing `PRINT S(0); S(1); S(2...` you can use one `FOR I = 0 TO N: PRINT S(I): NEXT I`.

## Summary

- **DIM** creates arrays: `DIM NAME(size)` makes `size + 1` slots indexed 0 through `size`
- Array elements are accessed with parentheses: `NAME(index)`
- **Arrays start at index 0** — the first slot is `NAME(0)`
- **2D arrays** (grids) use two indices: `NAME(row, col)`
- Combine arrays with **FOR loops** to fill, read, and process data efficiently
- Arrays let you store lists of related values: high scores, sprite positions, color palettes, and more
- You can **find the highest, lowest, and average** of array values using loops and comparisons

## What's Next?

Arrays are great for numbers, but most programs also need to **work with text** — not just display it, but analyze it character by character. In the next lesson, you'll learn **STRING functions**: LEFT$, RIGHT$, MID$, LEN$, and how to cut, paste, and compare text in C64 BASIC. See you in **Lesson 7: Strings**! ✂️
