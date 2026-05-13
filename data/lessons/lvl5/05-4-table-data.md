# Lesson 5.4 — Table Data with Arrays: Game Databases

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 5 |
| **Lesson Number** | 4 |
| **Estimated Time** | ~30 min |
| **Prerequisites** | Level 1 (Arrays/DIM, FOR/NEXT), Level 3 (Sprites), Level 5.1 (READ/DATA) |
| **Concepts** | DIM, multi-dimensional arrays (workarounds), screen memory arrays, level maps |

## Theory

Arrays are like **labeled filing cabinets** for your data. Instead of having random variables like `SCORE=100`, `LIVES=3`, `POS1=50`, `POS2=100`, you group them together: `SCORE(1)=100` and `SCORE(2)=LIVES`. This makes your program much easier to organize and scale up!

But arrays are not just for simple lists. On the C64, you can use them to:
- Store **enemy positions** for a whole game level
- Map out **power-up locations** on a screen grid
- Build **tile-based level maps** using memory
- Create **inventory tables** for your game items

### How DIM and Arrays Work

You create an array with the **DIM** statement:
```
DIM X(10)         ; Makes an array X with 11 elements (0-10)
DIM SCORE(50)     ; Array with 51 elements (0-50)
DIM MAP(10,20)    ; The C64 does NOT support this syntax! See workaround below.
```

Each array element is accessed like `X(3)` — the number in parentheses is the **index** or **subscript**. Think of it as "row 3" in a one-dimensional list, or "floor 3, room number" in a two-dimensional room!

> **Important:** The Commodore 64 BASIC does NOT support multi-dimensional arrays with parentheses like `X(3,5) = 10`. You need a workaround: use a single index that combines both dimensions. For a grid of 20 columns × 25 rows, use the formula: `index = column + row * 20`.

### The Screen Memory Workaround

The C64 screen lives at memory address **$0400 (1024)**. You can access screen characters using arrays by combining **POKE**, **PEEK**, and array storage. This is how you build a **level editor**: store your level as an array, then POKE it to screen memory.

### Key Takeaway

> **Arrays (created with DIM) organize game data like enemy positions and level maps. Without native multi-dimension support, use the formula `col + row * width` to simulate a 2D grid in a 1D array!**

### The Address Formula Explained

If you have a grid that is W columns wide, the element at position (row, col) is stored at:
```
index = col + row * W
```

For example, if your game map is 40 columns wide (standard screen width):
- Element at (0,0) = `0 + 0*40` = 0
- Element at (0,1) = `1 + 0*40` = 1
- Element at (0,2) = `2 + 0*40` = 2
- Element at (1,0) = `0 + 1*40` = 40
- Element at (2,3) = `3 + 2*40` = 83

This formula turns any 2D grid into a single number — perfect for BASIC's 1D array limitation!

## C64 BASIC Examples

### Creating an enemy position table

```
10 DIM ENEMY_X(20)     ; 20 enemies, X positions
20 DIM ENEMY_Y(20)     ; 20 enemies, Y positions
30 DIM ENEMY_TYPE(20)  ; 20 enemies, type
40 FOR I=1 TO 5
50   READ EX,EY,ET
60   ENEMY_X(I)=EX
70   ENEMY_Y(I)=EY
80   ENEMY_TYPE(I)=ET
90 NEXT I
100 FOR I=1 TO 5
110   PRINT "Enemy ";I;": at (";ENEMY_X(I);",";ENEMY_Y(I);") Type=";ENEMY_TYPE(I)
120 NEXT I
130 DATA 100,50,1,200,80,2,50,120,3,300,60,4,150,100,5
```

|| Code | Description |
|------|-------|
| `DIM ENEMY_X(20)` | Create three parallel arrays for enemy data |
| `ENEMY_X(I)=EX` | Store X position for enemy I |
| `FOR I=1 TO 5:NEXT I` | Loop through all 5 enemies |
| `READ EX,EY,ET` | Load 3 values from DATA per enemy per iteration |

### Building a tile level map (2D workaround)

```
10 DIM WIDTH=40
20 DIM HEIGHT=25
30 DIM MAP(WIDTH*HEIGHT)
40 FOR ROW=0 TO HEIGHT-1
50   FOR COL=0 TO WIDTH-1
60     MAP(COL+ROW*WIDTH)=0
70   NEXT COL
80 NEXT ROW
90 REM Draw a "border" (column=0, col=39, row=0 or row=24) on a tile map
100 FOR COL=0 TO WIDTH-1
110   MAP(0+COL+0*WIDTH)=1   ; Top wall
120   MAP(COL+COL+WIDTH-1*WIDTH)=1  ; Bottom wall
130 NEXT COL
140 FOR ROW=0 TO HEIGHT
150   MAP(0+0+ROW*WIDTH)=1      ; Left wall
160   MAP(WIDTH-1+ROW*WIDTH)=1  ; Right wall
170 NEXT ROW
180 PRINT "Level map created!"
190 REM Show first row
200 FOR COL=0 TO WIDTH-1
210   PRINT CHR$(MAP(COL+ROW*WIDTH)+32);"
220 NEXT COL
```

### Saving and restoring a screen from an array

```
10 DIM SCREEN_MAP(1000)
20 REM Save current screen to array
30 FOR I=0 TO 999
40   SCREEN_MAP(I)=PEEK(1024+I)
50 NEXT I
60 REM Clear the screen
70 FOR I=1024 TO 2023:POKE I,32:NEXT I
80 PRINT "Screen cleared! Array backup complete."
90 REM Restore from array
100 FOR I=0 TO 999
110   POKE 1024+I,SCREEN_MAP(I)
120 NEXT I
130 PRINT "Screen restored from backup!"
```

|| Code | Description |
|------|-------|
| `PEEK(1024+I)` | Read screen character at position I
| `SCREEN_MAP(I)=PEEK(104)` | Store it in the array
| `POKE 1024+I,...` | Restore by writing back to screen memory
| `FOR I=0 TO 999:NEXT I` | Process all 1000 screen cells |

## Exercise

1. **Type Example 1 and press RUN. See your enemy data displayed.**
   - Expected output: Five enemies with X,Y positions and type numbers.

2. **Modify the enemy table to read from DATA using a FOR/NEXT loop instead of manual READ statements in a loop.**
   - Expected output: Same data, but loaded more efficiently with the loop using READ inside.

3. **Create a `DIM LEVEL$(1000)` array that stores the entire screen as strings (1 character per cell).**
   - Expected output: Your level map stored in a string array that you can then POKE back to screen memory.

## Practice Challenge

> **Challenge:** Build a **power-up map** for a 40-column × 25-row game. Store power-up locations using READ/DATA into a multi-dimensional table (using the COL+ROW*WIDTH workaround). Then create a program that displays these locations on the screen as special characters (e.g., "*" for power-ups, "." for empty spaces).
> **Hint:** Use a second array `POWERUP(50)` and calculate the 2D position using `col + row * 40`. Fill the empty cells with "." and the power-up cells with "*".

## Quiz

1. **What does the DIM statement do?**
   a) Draws a rectangle
   b) Creates an array with a specified number of elements
   c) Deletes a variable
   d) Sets the screen width
   **Answer:** b

2. **How do you simulate a 2D array in C64 BASIC?**
   a) Use X(3,5) syntax
   b) Use `index = col + row * width` formula
   c) It is not possible
   d) Use a multi-dimension array built-in
   **Answer:** b

3. **How many elements in DIM MAP(10,20)?**
   a) 10
   b) 20
   c) 200
   d) Invalid syntax
   **Answer:** d
   **Explanation:** C64 BASIC does NOT support multi-dimension array syntax with commas in parentheses.

4. **How would you access the element at row 3, column 5 in a 40-column grid?**
   a) MAP(3,5)
   b) MAP(125)
   c) MAP(145)
   d) MAP(165)
   **Answer:** c
   **Explanation:** `5 + 3 * 40 = 125`

## Summary

- **DIM** creates arrays to organize data (scores, positions, inventories).
- **DIM MAP(1000)** creates an array with 1001 elements (0–1000).
- C64 BASIC does **not** support multi-dimensional arrays with parentheses.
- Use the formula `index = col + row * width` to simulate 2D grids.
- **PEEK(1024+I)** reads screen memory; **POKE 1024+I,V** writes to it.
- Arrays are perfect for **level maps, enemy tables, and power-up locations**.
- Combining **DIM + READ/DATA + POKE** lets you build entire game levels from data tables!

## What's Next?

You have everything you need — arrays for data, sprites for graphics, multi-screen effects, and READ/DATA for efficient data loading. Now it is time to put **ALL of it together** in a grand final challenge: a full text effects demo with scrolling credits, animated titles, color cycling, and sprite animations!

See you in Lesson 5.5 — The Capstone: Text Effects Demo! 🚀
