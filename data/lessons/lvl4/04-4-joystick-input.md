# Lesson 4.4 — Joystick Input

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 4 |
| **Lesson Number** | 4 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lesson 4.1 (SID Basics), Level 2 (POKE, Memory Map, bitwise operations) |
| **Concepts** | Joystick port, $DE00-$DE01, bitwise operations, digital input, fire button |

## Theory

The C64 has a **joystick port** on the front left side — it looks like a little slot where you plug in your game controller. Inside the port are **4 direction buttons (up, down, left, right)** and **1 fire button**.

The joystick port connects to two memory addresses:
- **$DE00 (56832)** — Joystick 1
- **$DE01 (56833)** — Joystick 2

When you look at the C64's joystick, it works like a grid of 6 switches inside the chip. Here is how the port works:

### How Joystick Reading Works

The port has 6 pins that can be **high** (1) when released and **low** (0) when pressed. To read a joystick, you use the C64's **CIA chip** (which manages the ports). The CIA automatically handles the reading for you — you just look at specific bits in $DE00!

| Bit | Pin | Joystick Direction |
|-----|-----|------|
| Bit 0 | 4 | UP |
| Bit 1 | 3 | DOWN |
| Bit 2 | 2 | LEFT |
| Bit 3 | 1 | RIGHT |
| Bit 4 | 0 | FIRE (button) |

When a button is **pressed**, the bit reads as 0. When released, it reads as 1. This is called **"active low"** — the opposite of what you might expect!

### Key Takeaway

> **To read Joystick 1, peek $DE00 (56832) and check specific bits: Bit 0=UP, Bit 1=DOWN, Bit 2=LEFT, Bit 3=RIGHT, Bit 4=FIRE. A bit of 0 means pressed!**

## C64 BASIC Examples

### Example 1: Check if the fire button is pressed

```
10 PRINT "Press the fire button!"
20 J=PEEK(56832):REM Read Joystick 1
30 IF (J AND 16)<>0 THEN 20:REM Bit 4 = 0 when pressed
40 PRINT "FIRE! You pressed the button!"
```

| Code | Description |
|------|------|
| `PEEK(56832)` | Read Joystick 1 port ($DE00) |
| `(J AND 16)` | Check Bit 4 — value 16 is $10 in hex |
| `IF (J AND 16)<>0 THEN 20` | If bit 4 is NOT 0, the fire button is NOT pressed — wait |
| `PRINT "FIRE!..."` | Print this message when the button IS pressed |

### Example 2: Read all joystick directions

```
 5 PRINT "Joystick Detector! Move your joystick."
10 J=PEEK(56832)
20 IF (J AND 1)<>0 THEN PRINT "UP"
30 IF (J AND 2)<>0 THEN PRINT "DOWN"
40 IF (J AND 4)<>0 THEN PRINT "LEFT"
50 IF (J AND 8)<>0 THEN PRINT "RIGHT"
60 IF (J AND 16)<>0 THEN PRINT "FIRE"
70 GOTO 10
```

| Code | Description |
|------|------|
| `J=PEEK(56832)` | Read Joystick 1 into variable J |
| `(J AND 1)` | Check Bit 0 (1 = $01) for UP |
| `(J AND 2)` | Check Bit 1 (2 = $02) for DOWN |
| `(J AND 4)` | Check Bit 2 (4 = $04) for LEFT |
| `(J AND 8)` | Check Bit 3 (8 = $08) for RIGHT |
| `(J AND 16)` | Check Bit 4 (16 = $10) for FIRE |

### Example 3: Use joystick to move a character on screen

```
10 POKE 54296,0:CLS
20 X=0:Y=40:GOSUB 200
30 PRINT "Move the 'A' with your joystick! RUN/STOP+RUN to quit."
40 J=PEEK(56832)
50 IF (J AND 8)=0 AND X<39 THEN X=X+1:GOSUB 200
60 IF (J AND 4)=0 AND X>0 THEN X=X-1:GOSUB 200
70 IF (J AND 1)=0 AND Y>0 THEN Y=Y-1:GOSUB 200
80 IF (J AND 2)=0 AND Y<39 THEN Y=Y+1:GOSUB 200
90 GOTO 40
200 POKE 1024+Y*40+X,65:RETURN
```

| Code | Description |
|------|------|
| `POKE 54296,0` | Set video to text mode first |
| `X=0,Y=40` | Starting position (column 0, row 40 — just above the border) |
| `IF (J AND 8)=0` | "IF RIGHT (Bit 3) IS 0 (pressed) then move right" |
| `GOSUB 200` | Redraw the character at its new position |
| `POKE 1024+Y*40+X,65` | POKE 'A' (PETSCII 65) into the correct screen location |

## Exercise

1. **Type Example 1 and run it. Hold down the fire button. What message appears?**
   - Expected output: "FIRE! You pressed the button!" prints once you press the fire button.

2. **Type Example 2 and run it. Move your joystick in all directions. Which messages appear?**
   - Expected output: UP, DOWN, LEFT, RIGHT, or FIRE appear depending on which direction/btn you push.

3. **Type Example 3 and run it. Try moving the 'A' with your joystick.**
   - Expected output: The letter 'A' follows your joystick movements across the screen.

## Practice Challenge

```
> **Challenge:** Extend Example 3 to display the joystick's state as numbers on screen. Show a status line like "UP:1 DOWN:0 LEFT:0 RIGHT:1 FIRE:0" that updates every frame as you move the joystick.
> **Hint:** Create variables for each direction: `UP=(J AND 1)<>0`, `DOWN=(J AND 2)<>0`, etc., then PRINT them all in a status line.
```

## Quiz

1. **Which two memory addresses store joystick data?**
   a) $D400 and $D401
   b) $DE00 and $DE01
   c) $D000 and $D001
   d) $DD00 and $DD01
   **Answer:** b
   **Explanation:** $DE00 (56832) holds Joystick 1 data and $DE01 (56833) holds Joystick 2 data.

2. **When you POKE a bit in the joystick port and read it back, what does a value of 0 for a direction bit mean?**
   a) The button is released (not pressed)
   b) The button is pressed (active low)
   c) The joystick is faulty
   d) The C64 is not powered on
   **Answer:** b
   **Explanation:** Joystick ports use "active low" logic — a bit value of 0 means the button is pressed, and 1 means it is released.

3. **Which bit of $DE00 corresponds to the fire button?**
   a) Bit 0
   b) Bit 1
   c) Bit 3
   d) Bit 4
   **Answer:** d
   **Explanation:** Bit 4 (value 16 / $10) in $DE00 is the fire button. Bits 0-3 are UP, DOWN, LEFT, RIGHT respectively.

## Summary

- Joystick port registers are at **$DE00** (Joystick 1) and **$DE01** (Joystick 2).
- Each joystick has 5 buttons: UP, DOWN, LEFT, RIGHT, and FIRE.
- Buttons read as **0 when pressed** and **1 when released** (active low logic).
- Use `AND` masks to check each button individually: `AND 1`=UP, `AND 2`=DOWN, `AND 4`=LEFT, `AND 8`=RIGHT, `AND 16`=FIRE.
- Joysticks are perfect for **real-time game control** — no need to press RETURN!

## What's Next?

You can now move your joystick to control game characters! But your games need something even more — **timed loops** to keep everything moving smoothly. Without proper timing, your sprite will fly across the screen way too fast, and your music will sound choppy.

In the next lesson, you will learn how to use the C64's **hardware timer** ($D30E-$D30F) to build a proper **game loop** with consistent frame rates — the key to making smooth, professional-looking games!

See you in Lesson 4.5 — Timing and FPS! ⏱️
