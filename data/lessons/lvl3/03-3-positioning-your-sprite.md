# Lesson 3.3 — Positioning Your Sprite

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 3 |
| **Lesson Number** | 3 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lesson 3.2 (Defining Your Sprite) |
| **Concepts** | X-coordinate, Y-coordinate, SPRITE command, memory addresses 2000-2010, 2112-2119 |

## Theory

You have a sprite with data. It is visible but stuck in the upper-left corner of your screen. Time to give it **freedom**!

The C64 stores sprite positions in two sets of memory addresses:

- **Horizontal (X) position:** addresses **2000 to 2007** (sprite 0 is at 2000, sprite 1 at 2001, etc.)
- **Vertical (Y) position:** addresses **2112 to 2119** (sprite 0 Y is at 2112, sprite 1 Y is at 2113, etc.)

But you will rarely POKE directly. Instead, use the **SPRITE** command:

```
SPRITE number,x,y
```

- **number** = 0 to 7 (which sprite)
- **x** = horizontal pixel position (0-383)
- **y** = vertical pixel position (0-255)

That means a sprite with position (0,0) sits at the top-left corner. A sprite at (300,200) sits near the bottom-right.

### Key Takeaway

> **Use `SPRITE 0,x,y` to place your sprite anywhere on the — X values go from 0 (left) to 383 (right), and Y values go from 0 (top) to 255 (bottom).**

### The Screen Coordinate Grid

Imagine your screen is a graph. The C64 screen has two coordinate systems:

1. **Pixel coordinates** (used by SPRITE command) — X from 0-383, Y from 0-255
2. **Character coordinates** (used by the text screen) — row 0-24, column 0-39

Sprites use the pixel system. This means you can position a sprite **between** characters — it can hover halfway between two text columns!

## C64 BASIC Examples

### Example 1: Position your sprite in the center

```
10 DIM D(48): FOR I=0 TO 47: D(I)=0: NEXT
20 D(0)=15: D(1)=15: D(2)=15: D(3)=15: D(4)=15: D(5)=15
30 D(6)=15: D(7)=15: D(8)=15: D(9)=15: D(10)=15: D(11)=15
40 D(12)=15: D(13)=15: D(14)=15: D(15)=15: D(16)=15: D(17)=15
50 D(18)=15: D(19)=15: D(20)=15: D(21)=15: D(22)=15: D(23)=15
60 D(24)=15: D(25)=15: D(26]=15: D(27)=15: D(28)=15: D(29]=15
70 D(30)=15: D(31)=15: D(32)=15: D(33)=15: D(34)=15: D(35]=15
80 D(36)=15: D(37)=15: D(38}=15: D(39)=15: D(40)=15: D(41]=15
90 D(42)=15: D(43)=15: D(44)=15: D(45}=15: D(46)=0: D(47)=0
100 POKE 16,16
110 SPRITE 0,100,200
120 PRINT "Sprite at X=100, Y=200"
```

| Code | Description |
|------|-------------|
| `10-90` | Clear sprite data and draw a filled box (15 = 4-pixel-wide column) |
| `100` | Enable sprites |
| `110` | Place sprite at X=100, Y=200 (about 3/4 down the screen) |
| `120` | Confirm position |

### Example 2: Position each of 8 sprites differently

```
10 POKE 16,16
20 SPRITE 0,50,50
30 SPRITE 1,100,50
40 SPRITE 2,150,50
50 SPRITE 3,200,50
60 SPRITE 4,250,50
70 SPRITE 5,300,50
80 SPRITE 6,350,50
90 SPRITE 7,175,150
100 PRINT "8 sprites placed!"
```

| Code | Description |
|------|-------------|
| `10` | Enable all sprites at once |
| `20-80` | Place each sprite in a horizontal row, plus one in the center |
| `100` | Confirmation |

### Example 3: Experiment with edge positions

```
10 POKE 16,16
20 SPRITE 0,0,0
30 PRINT "Sprite 0 at top-left (0,0)"
40 SPRITE 0,383,255
50 PRINT "Sprite 0 moved to bottom-right (383,255)"
60 SPRITE 0,190,127
70 PRINT "Sprite 0 moved to center-ish (190,127)"
```

| Code | Description |
|------|-------------|
| `20` | Top-left corner — sprite peeks off screen |
| `40` | Bottom-right corner — sprite may be just visible or off screen |
| `60` | Rough center of the screen |

## Exercise

1. **Type Example 1 above. Press RUN. A small box sprite should appear about 3/4 down the screen.**
   - Expected output: "Sprite at X=100, Y=200" and a box sprite visible near the bottom of your screen.

2. **Type Example 2 above. Press RUN. You should see 8 tiny sprites in a row across the top, with one in the center.**
   - Expected output: "8 sprites placed!" and 8 visible sprite dots.

3. **Change the Y value in Example 1 from 200 to 10, then to 250. Run each time. Where do your sprites appear?**
   - Expected output: Sprite appears at the top when Y=10, and near the bottom when Y=250.

## Practice Challenge

> **Challenge:** Create a program that places all 8 sprites in a circle pattern around the center of the screen. You will need to calculate X and Y values around a circle. Start with these rough coordinates: top-center (190,30), bottom-center (190,220), far-left (20,127), far-right (360,127), and fill in the remaining 4 with your best guesses.
> **Hint:** Add 70 to X for the right side and subtract 70 for the left side. The center is approximately (190,127).

## Quiz

1. **What is the X coordinate range for sprites?**
   a) 0-39
   b) 0-63
   c) 0-199
   d) 0-383
   **Answer:** d
   **Explanation:** The X coordinate goes from 0 (far left) to 383 (far right). This is a 384-pixel wide range.

2. **Which command positions a sprite?**
   a) LOCATE
   b) SPRITE
   c) MOVE
   d) POKE X,Y
   **Answer:** b
   **Explanation:** The SPRITE command uses `SPRITE number,x,y` to set position. There is no LOCATE command in C64 BASIC.

3. **Where is Y coordinate address 2112?**
   a) Sprite 0 Y position
   b) Sprite 1 Y position
   c) Sprite data start
   d) Screen RAM start
   **Answer:** a
   **Explanation:** Address 2112 holds sprite 0's Y position. Each sprite's Y address is 2112+n for sprite n.

## Summary

- Use **SPRITE number,x,y** to position any sprite (0-7).
- **X ranges from 0 (left) to 383 (right)** — horizontal pixel position.
- **Y ranges from 0 (top) to 255 (bottom)** — vertical pixel position.
- Screen RAM starts at 3840, Y-coordinates are stored at 2112-2119.
- X-coordinates are stored at 2000-2007 for sprites 0-7.
- With positions set, your sprite can go anywhere!

## What is Next?

Positioning is great, but it is static — your sprite sits wherever you put it. In the next lesson, you will learn to **move** your sprite using the keyboard. You will discover how to check which key is pressed, increase or decrease the X value, and create a sprite that responds to your commands!

Ready to make that sprite move? See you in Lesson 3.4!
