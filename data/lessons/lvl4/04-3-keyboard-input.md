# Lesson 4.3 — Keyboard Input

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 4 |
| **Lesson Number** | 3 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Level 1 (IF/THEN/GOTO, FOR/NEXT), Level 2 (POKE, Memory Map) |
| **Concepts** | GET, KEY, keyboard scanning, $38, keyboard matrix, character codes |

## Theory

So far, we have been making sounds and writing messages — but the computer can also **read what you type**! The C64 has a built-in keyboard scanning system that checks which keys are pressed, about **60 times per second**.

There are **two main ways** to get keyboard input in C64 BASIC:

### Method 1: GET (Simple input)

The `GET` command waits for you to press a key and returns its character. It is the easiest way!

```
10 PRINT "Press any key!"
20 GET K$:IF K$="" THEN 20
30 PRINT "You pressed: ";K$
```

### Method 2: POKE($38,0) — Keyboard Scanning

The C64 uses a **keyboard matrix** — a grid of rows and columns. When you press a key, it closes a connection at a specific row/column intersection. The C64 scans this grid by writing row patterns to address **$38** (decimal 56) and reading the result from **$D010**.

| Address | Decimal | Purpose |
|---------|-----|----|
| $38 | 56 | Write row pattern (which row to activate) |
| $D010 | 53264 | Read key state in that row |

The keyboard is arranged in rows of 8 keys. To check if a key is pressed:
1. POKE the row pattern into address $38
2. Read address $D010 and check if any bit matches

**Bit masks for reading:**
| Bit | Hex Value | Decimal |
|-----|-----|----|
| Bit 0 | $01 | 1 |
| Bit 1 | $02 | 2 |
| Bit 2 | $04 | 4 |
| Bit 3 | $08 | 8 |
| Bit 4 | $10 | 16 |
| Bit 5 | $20 | 32 |
| Bit 6 | $40 | 64 |
| Bit 7 | $80 | 128 |

### Key Takeaway

> **Use GET for simple input. Use POKE($38,0) to read $D010 for game-style keyboard scanning!**

## C64 BASIC Examples

### Example 1: Simple GET input

```
10 PRINT "Type a letter and press RETURN:"
20 GET K$:IF K$="" THEN 20
30 PRINT "You typed: ";K$
40 PRINT "Its PETSCII code is: ";ASC(K$)
50 GOTO 10
```

| Code | Description |
|------|------|
| `GET K$` | Wait for one keypress — stores it in variable K$ |
| `IF K$="" THEN 20` | If nothing pressed yet, try again |
| `ASC(K$)` | Convert the character to its numeric PETSCII code |
| `GOTO 10` | Repeat forever (press RUN/STOP+RUN to quit) |

### Example 2: Keyboard scanning (detect specific keys)

```
10 PRINT "Arrow keys! Press Q to quit."
20 POKE 56,1:K=PEEK(53264)
30 IF (K AND 16)<>0 THEN PRINT "RIGHT"
40 IF (K AND 32)<>0 THEN PRINT "DOWN"
50 IF (K AND 64)<>0 THEN PRINT "LEFT"
60 IF (K AND 128)<>0 THEN PRINT "UP"
70 IF PEEK(56)$="Q" THEN 100
80 GOTO 20
100 PRINT "Goodbye!"
110 END
```

| Code | Description |
|------|------|
| `POKE 56,1` | Activate row 1 of the keyboard matrix (row 0) |
| `PEEK(53264)` | Read which keys are pressed in that row |
| `(K AND 16)` | Check if Bit 4 is set (RIGHT arrow in row 0) |
| `(K AND 128)` | Check if Bit 7 is set (UP arrow in row 0) |

### Example 3: Detect arrow keys with all rows

```
10 PRINT "Arrow keys detector! Press RUN/STOP+RUN to quit."
20 FOR R=0 TO 4
30   POKE 56,2^R:K=PEEK(53264)
40   IF (K AND 4)<>0 THEN PRINT "RIGHT"
50   IF (K AND 8)<>0 THEN PRINT "LEFT"
60   IF (R=2 AND (K AND 16)<>0) THEN PRINT "DOWN"
70   IF (R=3 AND (K AND 1)<>0) THEN PRINT "UP"
80 NEXT R
90 GOTO 20
```

| Code | Description |
|------|------|
| `FOR R=0 TO 4` | Check 5 different row patterns |
| `POKE 56,2^R` | Activate one row at a time (1, 2, 4, 8, 16) |
| `PEEK(53264)` | Read the result — each bit tells you which key |
| `IF (K AND pattern)<>0` | "IF this bit is 1, the key is pressed" |

## Exercise

1. **Type Example 1. Run it. Press the 'A' key. What number does it print?**
   - Expected output: You typed: A, Its PETSCII code is: 194

2. **Type Example 2. Run it. Press arrow keys. What messages appear?**
   - Expected output: RIGHT, DOWN, LEFT, or UP appears depending on which arrow you press.

3. **Modify Example 2 to also detect if you press the space bar (Space key). Hint: Space is usually in a different row.**
   - Expected output: "SPACE" prints when you hold down the space bar.

## Practice Challenge

> **Challenge:** Write a game-style input program that displays which arrow key is pressed using on-screen text boxes. Each arrow key should fill a box with a color: press RIGHT to color the right box with color 4 (cyan), press LEFT to color the left box with color 14 (yellow).
> **Hint:** POKE the text screen memory ($0400/1024) and the color RAM ($D800/55296). Use row 0 of the keyboard for right and row for left detection.

## Quiz

1. **Which BASIC command waits for a single keypress?**
   a) INPUT
   b) GET
   c) KEY
   d) SCAN
   **Answer:** b
   **Explanation:** GET waits for exactly one keypress without requiring you to press RETURN.

2. **What is the keyboard matrix scanning address?**
   a) $38 (write) and $D010 (read)
   b) $40 (write) and $D011 (read)
   c) $30 (write) and $D008 (read)
   d) $38 (write) and $D020 (read)
   **Answer:** a
   **Explanation:** Write a row pattern to $38 (56), then read the result from $D010 (53264). Each bit represents a key in that row.

3. **If you POKE 56,1 and PEEK 53264 returns 21 (decimal), which keys are pressed?**
   a) Bit 1 and Bit 4 (since 21 = 16+4+1)
   b) Only the space bar
   c) The SHIFT key
   d) All keys in row 0
   **Answer:** a
   **Explanation:** 21 in binary is 00010101, so Bits 0, 2, and 4 are set. The key is 21=16+4+1, meaning Bits 0 and 4 (and 2) are pressed.

## Summary

- **GET** is the simplest way to read one keypress in BASIC.
- **Keyboard scanning** uses `POKE 56,row` and `PEEK(53264)` to check the keyboard matrix.
- The keyboard is a **grid of rows and columns** — each press closes one connection.
- **Bitwise AND** checks if a specific key is pressed (e.g., `AND 16` checks Bit 4).
- You can scan multiple rows to detect **all keys** on the keyboard.
- The C64 scans the keyboard about **60 times per second** automatically.

## What's Next?

Your keyboard works great, but what about a **joystick**? Every C64 gamer had one plugged into the port on the front! In the next lesson, you will learn how to **read a joystick** and use its 5 buttons to control your games.

See you in Lesson 4.4 — Joystick Input! 🕹️
