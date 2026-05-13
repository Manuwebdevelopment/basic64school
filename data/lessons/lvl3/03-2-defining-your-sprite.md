# Lesson 3.2 — Defining Your Sprite

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 3 |
| **Lesson Number** | 2 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lesson 3.1 (What Is a Sprite?) |
| **Concepts** | Sprite data, memory addresses 4080-4127, POKE, 8x64 pixel grid, FOR/NEXT loops |

## Theory

Great news: you have enabled sprites with **POKE 16,16**. The bad news: you still see nothing! That is because **every sprite is empty** until you draw on it.

A C64 sprite is made of **8 rows** of pixels. Each row is **64 bits wide**. Think of it like 8 horizontal lines of 64 light-switches. Each switch is either ON (1 = pixel visible) or OFF (0 = transparent). 

- **1** = pixel shows (colored with the sprite's color)
- **0** = pixel is transparent (you see the screen behind it)

C64 BASIC lets you define these rows using **READ** and **DATA** statements, or by **POKE**-ing each row directly.

### The Sprite Data Memory Map

| Address Range | What It Stores |
|---------------|----------------|
| **4080-4127** | Sprite 0 pixel data (48 bytes = 8 rows x 6 bytes per row) |
| **4128-4175** | Sprite 1 pixel data |
| **4176-4223** | Sprite 2 pixel data |
| ... | ... |
| **4544-4591** | Sprite 7 pixel data |

Each row needs **6 bytes** (48 bits → the VIC-II chip uses 48 out of the 64 bits per row). The remaining bits are unused padding.

### Reading a Row

```
10 READ A,B,C,D,E,F
20 DATA 0,0,0,0,0,0
30 FOR I=0 TO 5
40     POKE 4080+I,PEEK(496)+10
50 NEXT
```

A simpler approach uses a FOR/NEXT loop with arrays:

```
10 DIM P(6)
20 FOR I=0 TO 7
30     READ A,B,C,D,E,F
40     P(0)=A: P(1)=B: P(2)=C: P(3)=D: P(4)=E: P(5)=F
50     FOR J=0 TO 5
60         POKE 4080+(I*6)+J, P(J)
70     NEXT
80 NEXT
90 DATA 0,0,0,0,0,0,48,48,48,48,0,0,60,60,60,60,60,60,60,60,60,60,60,60,60,0,48,48,48,48,0,0,0,0,0,0,0,0,0,0
```

Each pair of bits in a byte = one pixel column. So a byte value of `48` (binary `00110000`) means the 3rd and 4th pixel columns are ON.

### Key Takeaway

> **A sprite is 8 rows of pixel data. Each row is defined by 6 bytes stored starting at address 4080 (for sprite 0).**

### Drawing a Heart Shape!

Here is our first sprite — a heart! Each row uses 6 bytes. The value `255` (binary `11111111`) fills an entire row. Smaller values create gaps.

| Row | Bytes | Visual (1=pixel, 0=gap) |
|-----|-------|--------------------------|
| Top (row 7) | `15,127,127,127,127,15` | `══███╗` → `╔╩╦╗` shape |
| Middle-top (row 6) | `127,255,255,255,255,255` | Full row — widest point |
| Middle (row 5) | `255,255,255,255,255,255` | Full row |
| ... and so on | | |

## C64 BASIC Examples

### Example 1: Draw a vertical line sprite

```
10 DIM A(48)
20 FOR I=0 TO 47
30     READ A(I)
40 NEXT
50 FOR I=0 TO 47
60     POKE 4080+I,A(I)
70 NEXT
80 POKE 16,16: PRINT "Line sprite drawn!"
90 DATA 0,0,0,0,0,0,0,0,0,0,0,0,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,0,0,0,0
```

| Code | Description |
|------|-------------|
| `10 DIM A(48)` | Create an array to hold our 48 bytes of data |
| `20-40` | Read all 48 bytes from the DATA statement |
| `50-70` | POKE each byte into sprite 0's memory (4080+) |
| `80` | Turn on sprites and print confirmation |
| `90` | The data: three columns of 15s (binary `00001111`) in the middle, zeros on the edges |

### Example 2: Draw a simple box

```
10 FOR I=0 TO 47: A=0: POKE 4080+I,A: NEXT
20 FOR I=0 TO 4: POKE 4080+I,15: NEXT
30 FOR I=6 TO 9: POKE 4080+I,15: NEXT
40 FOR I=12 TO 45: POKE 4080+I,15: NEXT
50 FOR I=38 TO 41: POKE 4080+I,15: NEXT
60 FOR I=42 TO 47: POKE 4080+I,15: NEXT
70 POKE 16,16: PRINT "Box ready!"
```

| Code | Description |
|------|-------------|
| `10` | Clear everything: zero all 48 bytes |
| `20-60` | Draw the box outline row by row |
| `70` | Enable sprites |

### Example 3: Draw a simple smiley using READ/DATA (compact)

```
10 POKE 16,16
20 FOR I=0 TO 7
30     READ R0,R1,R2,R3,R4,R5
40     POKE 4080+(I*6),R0: POKE 4080+(I*6)+1,R1
50     POKE 4080+(I*6)+2,R2: POKE 4080+(I*6)+3,R3
60     POKE 4080+(I*6)+4,R4: POKE 4080+(I*6)+5,R5
70 NEXT
80 PRINT "Smiley sprite ready!"
90 DATA 0,0,0,0,0,0,0,255,0,192,0,0,0,255,0,0,0,0,0,255,0,0,0,0,0,255,0,0,0,0,0,255,0,192,0,0,0,255,0,0,0,0,0,0,0,0
```

| Code | Description |
|------|-------------|
| `10` | Enable sprites |
| `20-70` | Read each row's 6 bytes and POKE them into sprite data memory |
| `90` | Data: 8 rows forming a simple smiley face pattern |

## Exercise

1. **Type Example 1 (vertical line). Press RUN. If your screen shows "Line sprite drawn!", look above your text — you might see a tiny vertical line near the top of the screen!**
   - Expected output: "Line sprite drawn!" and a thin vertical line visible somewhere on screen.

2. **Type Example 2 (box). Press RUN. Look for a small box shape above your text.**
   - Expected output: "Box ready!" and a small rectangular sprite visible.

3. **Modify Example 3's DATA statement. Change a few zeros to 255 to make smiley eyes into X's. See how your sprite changes!**
   - Expected output: A modified smiley or blobby sprite, visible on screen.

## Practice Challenge

> **Challenge:** Use Example 2 as a starting point. Modify the code to draw an **L-shaped** sprite instead of a box. Change the row values until you see an L on screen.
> **Hint:** Try POKE-ing only the left column (`0,9,18,27,36,45`) and the bottom row (`42,43,44,45`) with value 15.

## Quiz

1. **How many bytes of data does each sprite need?**
   a) 8
   b) 16
   c) 48
   d) 64
   **Answer:** c
   **Explanation:** 8 rows × 6 bytes per row = 48 bytes of pixel data.

2. **What is the starting memory address for sprite 0's data?**
   a) 2000
   b) 3840
   c) 4080
   d) 496
   **Answer:** c
   **Explanation:** Sprite 0 starts at address 4080. Each sprite gets 48 bytes.

3. **What does a byte value of 0 mean for a sprite row?**
   a) The row is all white pixels
   b) The row is all transparent (invisible)
   c) The row causes an error
   d) The row toggles colors
   **Answer:** b
   **Explanation:** Value 0 means all bits are OFF, so every pixel in that row is transparent. The row itself exists but shows nothing.

## Summary

- Each sprite has 48 bytes of pixel data (8 rows of 6 bytes).
- Sprite 0's data starts at memory address **4080**.
- **POKE** each byte to draw the sprite; **READ/DATA** can load them in a loop.
- Binary values like `15 (`00001111`) and `255 (`11111111`) create different visual widths.
- **POKE 16,16** enables sprite drawing — but data must be loaded first!

## What is Next?

Now you have data to display, but your sprite has nowhere to go — it defaults to the upper-left corner of the screen. In the next lesson you will learn to **position** your sprite using **X and Y coordinates**. You will discover addresses **2000-2010** (for horizontal position) and **2112-2119** (for vertical position), and place your sprite exactly where you want it!

See you in Lesson 3.3!
