# Lesson 3.4 — Moving Sprites with INPUT

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 3 |
| **Lesson Number** | 4 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lessons 3.1–3.3 (Sprites, Defining, Positioning) |
| **Concepts** | SPRITE command with variables, input detection, collision detection, HMOVE/VMOVE |

## Theory

Time for the biggest step in this lesson: **making your sprite move when you press keys!**

Up until now, your sprites have been like statues — they sit exactly where you put them. Now you will add **control**. The secret is to use **variables** in the SPRITE command:

```
SPRITE 0,X,Y
```

You have used this before. The key insight is that X and Y can be **variables**, not just numbers. So when you change the variable, your sprite moves!

But how does the C64 know which key you pressed? With the **INPUT** command!

INPUT does two things:
1. Shows a cursor on the screen and waits for you to type.
2. Stores what you type into a variable.

If you type **"R"**, the variable holds the letter R.
If you type **`5`**, the variable holds the number **5**.

The power comes from **IF...THEN...GOTO**:
- `IF` a player presses **R**, change X to X+1
- `IF` a player presses **L**, change X to X-1
- Repeat forever with **GOTO**

## C64 BASIC Examples

### Example 1: Move sprite right with a variable

```
10 DIM D(48): FOR I=0 TO 47: D(I)=15: NEXT
20 X=32: Y=32
30 SCREEN 0
40 PRINT "Move me right! Press S"
50 SPRITE 0,X,Y
60 INPUT "Which way (L,R,U,D): ",KEY$
70 IF KEY$="R" THEN X=X+1: GOTO 50
80 IF KEY$="L" THEN X=X-1: GOTO 50
90 IF KEY$="U" THEN Y=Y-1: GOTO 50
100 IF KEY$="D" THEN Y=Y+1: GOTO 50
```

### Example 2: Loop with INPUT

```
10 DIM D(48): FOR I=0 TO 47: D(I)=255: NEXT
20 X=100: Y=100
30 POKE 16,16: GOTO 50
40 SCREEN 0
50 SPRITE 0,X,Y
60 PRINT "Type 'right' or 'left':"
70 INPUT ">",KEY$
80 IF KEY$="right" THEN X=X+2: GOTO 50
90 IF KEY$="left" THEN X=X-2: GOTO 50
100 PRINT "Sprite moved to X="+STR$(X)
```

### Example 3: Full direction control

```
10 DIM D(48): FOR I=0 TO 47: D(I)=12: NEXT
20 X=200: Y=128
30 POKE 16,16: SCREEN 0
40 PRINT "Move your sprite! Press L,R,U,D"
50 PRINT "X=";X; " Y=";Y
60 SPRITE 0,X,Y
70 INPUT ">",DIR$
80 IF DIR$="L" AND X>0 THEN X=X-3: GOTO 50
90 IF DIR$="R" AND X<383 THEN X=X+3: GOTO 50
100 IF DIR$="U" AND Y>0 THEN Y=Y-3: GOTO 50
105 IF DIR$="D" AND Y<255 THEN Y=Y+3: GOTO 50
110 GOTO 40
```

| Code | Description |
|------|------|
| `80` | Left: only if X>0 (not off screen) |
| `90` | Right: only if X<383 (stay on screen) |
| `100` | Up: only if Y>0 |
| `105` | Down: only if Y<255 |
| `110` | Loop back to wait for next input |

### Example 4: Speed control

```
10 DIM D(48): FOR I=0 TO 47: D(I)=3: NEXT
20 X=38: Y=38
30 POKE 16,16
40 PRINT "Speed: L=slow, R=fast, U=up, D=down"
50 SPRITE 0,X,Y
60 INPUT ">",KEY$
70 IF KEY$="L" THEN X=X+1: GOTO 50
80 IF KEY$="R" THEN X=X+5: GOTO 50
90 IF KEY$="U" THEN Y=Y-2: GOTO 50
100 IF KEY$="D" THEN Y=Y+2: GOTO 50
```

| Code | Description |
|------|------|
| `70` | Left = speed 1 (slow) |
| `80` | Right = speed 5 (fast) |
| `90-100` | Up/Down = speed 2 (medium) |

## Exercise

1. Type Example 3 above. Press RUN. Type "R" — your sprite should jump 3 pixels right. Type "L" — it should go left.
2. Modify the step values. Make up/down faster by changing `Y-2` and `Y+2` to `Y-5` and `Y+5`.
3. Add a boundary check: when X reaches 383, stop at the edge. When Y reaches 255, stop at the bottom.

## Challenge

> **Practice Challenge:** Can you move your sprite diagonally? Modify Example 3 to accept two-key inputs (e.g., press "R" then press "D") so your sprite can go up-right or down-left.
> **Hint:** Use two INPUT statements in sequence.

## Quiz

1. **Which command shows a cursor and waits for you to type?**
   a) PRINT
   b) INPUT
   c) POKE
   d) READ
   **Answer:** b

2. **What does `IF DIR$="R" AND X<383 THEN X=X+3` do?**
   a) Moves the sprite right only if it is not off-screen
   b) Moves the sprite left
   c) Clears the screen
   d) Stops the program
   **Answer:** a

3. **Why use a loop (GOTO back to the start)?**
   a) To make the program crash
   b) To keep checking for keyboard input
   c) To draw a new sprite
   d) To change the screen color
   **Answer:** b

## Summary

- Use **SPRITE n,X,Y** with variable X and Y values.
- Use **INPUT** to read keyboard commands.
- Change X to move left/right, change Y to move up/down.
- Add **boundary checks** to keep your sprite on screen.

## What is Next?

You have learned to type "R" to move right. But that is slow — every time you must type a full word. In the next lesson you will discover **HMOVE** (horizontal move) and **VMOVE** (vertical move) — special commands that let sprites move smoothly with a single keystroke. No more typing words — just tap!

See you in Lesson 3.5!
