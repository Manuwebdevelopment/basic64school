# Lesson 3.5 — H-MOVE Sprites

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 3 |
| **Lesson Number** | 5 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lessons 3.1–3.4 (Sprites, Defining, Positioning, Moving) |
| **Concepts** | HMOVE/VMOVE, sprite movement registers, sprite multiply, collision detection |

## Theory

Type "RIGHT" every time you want to move one pixel? That is tedious! The C64 has a special feature to make sprite movement **smoother and faster**.

**HMOVE** (horizontal move) and **VMOVE** (vertical move) are built-in C64 commands that shift sprite positions by a set amount each frame. When combined with **HSCROLL/VSCROLL**, they create the smooth, continuous animations seen in professional C64 games.

### Sprite Registers

Each sprite has **movement registers** that tell the hardware how many pixels to shift:

| Register Address | Purpose |
|------|-----|
| **53272-53279** | HMOVE control (sprite H move amounts) |
| **53280-53287** | VMOVE control (sprites V move amounts) |
| **53274** | HMOVE control register (set to 255 to activate all) |

When you **POKE 255, 255** into these registers, all active sprites move by their set amounts.

### Key Takeaway

> **HMOVE and VMOVE shift sprites automatically each frame. Set them once, then just keep telling the VIC-II chip to move. No more typing!**

### How HMOVE/VMOVE Work

1. **Set the initial position** with `SPRITE n,X,Y`.
2. **Set the movement amount** in the HMOVE registers.
3. **Execute HMOVE** to apply the movement.
4. **Loop:** update your X/Y variable, then repeat.

This cycle is the heart of every sprite game on the C64!

### Why Do We Need HMOVE?

Without HMOVE:
- You manually change X every time (slow, requires constant code).
- You risk screen tearing.
- Sprites might flicker.

With HMOVE:
- **One command** (`HMOVE`) shifts all active sprites.
- **Zero flicker** (the VIC-II handles the drawing).
- **Smooth animation** (hardware-level, not software).

## C64 BASIC Examples

### Example 1: Simple HMOVE right

```
10 POKE 16,16
20 SPRITE 0,50,32
30 PRINT "Sprite starts at X=50"
40 HMOVE
50 SPRITE 0,X+1,Y
60 PRINT "Sprite moved right! New X=";X+1
70 INPUT "Move again? (Y/N)",ANS$
80 IF ANS$="Y" THEN GOTO 40
90 PRINT "Goodbye!"
```

### Example 2: Continuous HMOVE loop

```
10 POKE 16,16
20 SPRITE 0,0,32
30 FOR I=0 TO 383
40     SPRITE 0,I,32
50     HMOVE
60 NEXT
70 PRINT "Sprite crossed the screen!"
```

### Example 3: VMOVE example

```
10 POKE 16,16
20 SPRITE 0,100,0
30 FOR I=0 TO 255
40     SPRITE 0,100,I
50     VMOVE
60 NEXT
70 PRINT "Sprite fell down the screen!"
```

### Example 4: HMOVE + VMOVE together

```
10 POKE 16,16
20 SPRITE 0,100,100
30 PRINT "Sprite at (100,100)"
40 SPRITE 0,120,90
50 HMOVE
60 VMOVE
70 PRINT "Sprite moved to (120,90)!"
```

### Example 5: Using sprite multiply for size

```
10 POKE 16,16
20 POKE 20,0
30 SPRITE 0,100,100
40 PRINT "Sprite multiply = 0 (normal size)"
50 POKE 20,240
60 SPRITE 0,100,100
70 PRINT "Sprite multiply = 240 (scaled)"
```

## Exercise

1. **Try Example 2 (continuous HMOVE).** Watch the sprite fly across the screen from left to right!
2. **Modify Example 3** to make the sprite fall faster by changing line 40 to `SPRITE 0,100,I+10`.
3. **Combine HMOVE and VMOVE** like Example 4. Move your sprite diagonally.

## Challenge

> Practice Challenge: Create a sprite that moves in a square pattern. Move right 100 pixels, down 100, left 100, up 100, then repeat forever. Use HMOVE and VMOVE for the animation.
> Hint: Use four FOR loops and update SPRITE coordinates each time. End with `GOTO` back to the top.

## Quiz

1. **What does HMOVE do?**
   a) Hides the sprite
   b) Moves the sprite horizontally
   c) Changes the sprite's color
   d) Deletes the sprite
   **Answer:** b

2. **Which POKE activates sprite movement registers?**
   a) POKE 20
   b) POKE 255, 255
   c) POKE 16,16
   d) POKE 4080
   **Answer:** b

3. **What does POKE 20,240 do?**
   a) Turns off sprites
   b) Changes screen color
   c) Enables sprite scaling (multiply)
   d) Moves all sprites right
   **Answer:** c

## Summary

- **HMOVE** and **VMOVE** shift sprites by hardware commands.
- Movement registers are at addresses 53272-53279 (HMOVE) and 53280-53287 (VMOVE).
- Combine with **SPRITE n,X,Y** and a loop for smooth animation.
- **POKE 20,240** enables sprite multiplication (scaling).
- HMOVE/VMOVE is the secret behind C64 game smoothness!

## What is Next?

You now know how to create, position, and move sprites. But every C64 has a limit: **only 8 sprites at once**. Sometimes you do not need a sprite at all — you can just **POKE the screen**. In the next lesson, you will learn the trade-off: **when should you use a sprite, and when should you just POKE screen RAM?**

See you in Lesson 3.6!
