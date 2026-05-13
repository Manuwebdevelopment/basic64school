# Lesson 5.3 — Sprite Animations: Walking Characters

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 5 |
| **Lesson Number** | 3 |
| **Estimated Time** | ~30 min |
| **Prerequisites** | Level 3 (Sprites), Level 5.1 (READ/DATA), Level 5.2 (POKE, Memory) |
| **Concepts** | Sprite graphics, animation frames, sprite width, sprite registers, READ/DATA sprite loading |

## Theory

Sprites are the C64's special graphics feature: tiny movable pictures that appear on top of your text screen. Each sprite is **24 dots wide** and **21 dots tall** — small but powerful! Normally you define a sprite's picture once, and it stays that way forever.

But what if your character could **walk, jump, flip, or change expressions**? That is where **sprite animation** comes in! A sprite animation is simply a series of static sprite pictures (called *frames*) that you swap quickly to create the illusion of movement — just like a flip book!

### How Sprite Graphics Work

Sprite graphics are stored in a **graphics buffer** starting at **$2400** (decimal 9216). Each sprite frame takes **48 bytes** (24 columns × 2 bytes per row, since the C64 stores two horizontal rows of pixels per memory location). One frame = 48 bytes. To animate, you just overwrite the graphics buffer with the next frame's data!

Each sprite has its own set of **sprite control registers**:

| Register | Decimal | What It Controls |
|----------|---------|------------------|
| $D000 | 53248 | Enable Sprite 0 |
| $D001 | 53249 | Enable Sprite 1 |
| $D002 | 53250 | Enable Sprite 2 |
| $D003 | 53251 | Enable Sprite 3 |
| $D004-$D007 | 53252-53255 | Sprite 0-3 X position |
| $D008-$D00B | 53256-53259 | Sprite 0-3 Y position |
| $D010-$D013 | 53264-53267 | Sprite 0-3 X-size (double width) |
| $D014-$D017 | 53268-53271 | Sprite 0-3 Y-size (double height) |
| $D027 | 53287 | Sprite data pointer (byte 0-1) |
| $D030 | 53296 | Sprite data pointer (byte 2-3) |

The **sprite data pointer registers at $D018+$D019 (53288-53289)** tell the C64 where to find a sprite's graphic data. Each frame takes 768 bytes (24×32 for 8-bit sprites, but we use 48 bytes for 4-bit). We point to our frame data and swap frames rapidly.

### Key Takeaway

> **Sprite animation works by rapidly swapping sprite frame data in memory using POKE — each frame is 48 bytes, and changing the sprite pointer creates the illusion of movement!**

### Building a Walking Frame

Each sprite frame is 21 rows of pixels. Since the C64 sprite is 24 pixels wide, each row takes **3 bytes** (24 pixels / 8 pixels per byte = 3 bytes). So 21 rows × 3 bytes = 63 bytes. But we use the C64's 4-bit sprite mode which stores **2 rows per byte per column**, so each frame = **48 bytes**.

The simplest approach: define each frame as a sequence of 48 hexadecimal bytes (like `00 0F 18 18 ...`) and POKE them into the sprite graphics buffer. Use READ/DATA to load frames efficiently.

## C64 BASIC Examples

### Example 1: Setting up a sprite and its pointer

```
10 POKE 53247,0:POKE 53285,1     ; Set sprite width (double)
20 POKE 53248,1                    ; Enable sprite 0
30 POKE 53252,200:POKE 53256,100  ; X=200, Y=100 position
40 POKE 53288,0:POKE 53289,36      ; Point sprite data to $2400 (9216)
50 REM Now POKE frame data into $2400
60 FOR I=0 TO 47
70   READ B
80   POKE 9216+I,B
90 NEXT I
100 DATA 0,0,31,128,56,128,124,128,62,128,126,128,62,128
120 DATA 124,128,56,128,31,128,0,0,0,0,0,0,0,0,0,0
130 DATA 0,0,0,0,31,128,0,32,66,128,121,128,121,128
140 DATA 66,128,31,128,0,0,0,0,0,0,0,0,0,0,0,0
150 PRINT "Press RUN to see your sprite!"
```

|| Code | Description |
|------|-------|
| `POKE 53248,1` | Enable sprite 0 |
| `POKE 53252,200:POKE 53256,100` | Set position to X=200, Y=100 |
| `POKE 53288,0:POKE 53289,36` | Point sprite data pointer to $2400 (9216 decimal) |
| `POKE 9216+I,B` | Write each byte of the sprite frame to memory |

### Example 2: A walking animation with two frames

```
10 POKE 53247,0:POKE 53248,1
20 POKE 53252,200:POKE 53256,100
30 POKE 53288,0:POKE 53289,36      ; Point to $2400
40 GOSUB 200                       ; Load Frame 1
50 FOR FRAME=1 TO 2
60   GOSUB 200                        ; Load frame into graphics buffer
70   FOR D=1 TO 15:NEXT D             ; Wait between frames
80   GOSUB 300                        ; Load frame 2
90   FOR D=1 TO 15:NEXT D
100 NEXT FRAME
110 POKE 53248,0                     ; Hide sprite
120 PRINT CHR$(147):PRINT "Done!"
200 FOR I=0 TO 47:READ B:POKE 9216+I,B:NEXT I:return
300 FOR I=0 TO 47:READ B:POKE 9216+I,B:NEXT I:return
400 DATA 0,0,31,128,56,128,124,128,62,128,126,128,62,128,124,128
420 DATA 56,128,31,128,0,0,0,0,0,0,0,0,0,0,0,0
440 DATA 0,0,0,0,31,128,0,32,66,128,121,128,121,128,66,128
460 DATA 31,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0
480 DATA 0,0,62,128,60,128,56,128,124,128,56,128,60,128,62,128
500 DATA 0,0,0,0,0,0,0,0,0,0,0,56,128,124,128,62,128
520 DATA 62,128,124,128,56,128,30,128,130,256
```

### Example 3: READ/DATA for sprite frames (efficient!)

```
10 POKE 53247,0:POKE 53248,1
20 POKE 53252,200:POKE 53256,100
30 POKE 53288,0:POKE 53289,36
40 GOSUB 500                        ; Load animation from DATA
50 FOR FRAME=1 TO 3
60   GOSUB 600                       ; Load next frame
70   FOR D=1 TO 20:NEXT D
80 NEXT FRAME
500 FOR I=0 TO 47:READ B:POKE 9216+I,B:NEXT I:return
600 FOR I=48 TO 95:READ B:POKE 9216+I-48,B:NEXT I:return
700 DATA 0,0,31,128,56,128,124,128,62,128,126,128
710 DATA 62,128,124,128,56,128,31,128,0,0,0,0,0,0
720 DATA 0,0,0,0,31,128,0,32,66,128,121,128
730 DATA 121,128,66,128,31,128,0,0,0,0,0,0,0,0
740 DATA 0,0,62,128,60,128,56,128,124,128,56,128
750 DATA 60,128,62,128,0,0,0,0,0,0,0,0,0,0,0,0
760 DATA 0,0,0,0,31,128,0,32,66,128,121,128
770 DATA 121,128,66,128,31,128,0,0,0,0,0,0,0,0
```

|| Code | Description |
|------|-------|
| `GOSUB 500/600` | Load frame from DATA into sprite buffer |
| `FOR I=0 TO 47` | Frame 1: 48 bytes starting at $2400 |
| `FOR I=48 TO 95` | Frame 2: 48 bytes starting at $2400+48 |
| `POKE 9216+I-48,B` | Overlap frame data correctly in the buffer |

## Exercise

1. **Type Example 1 and press RUN to see your sprite sprite appear on screen!**
   - Expected output: A sprite graphic (a simple shape) appears at position X=200, Y=100.

2. **Change the sprite position (line 20) to move it to the center of the screen (X=160, Y=90).**
   - Expected output: The sprite moves closer to the center of the display.

3. **Type Example 3 and watch the sprite animate through its frames.**
   - Expected output: The sprite appears and animates through 3 frames of movement.

## Practice Challenge

> **Challenge:** Create a "walking person" animation with 4 frames that look like legs moving forward. Use POKE to draw each frame in a simple pixel art style: a body, head, and two legs that alternate positions. Use READ/DATA to store all 4 frames efficiently.
> **Hint:** Start each frame with a simple outline — use bytes like `11111000` (decimal 248) for filled rows and `00001000` (decimal 8) for thin lines representing legs.

## Quiz

1. **How many bytes does one sprite frame take?**
   a) 24
   b) 48
   c) 768
   d) 1024
   **Answer:** b
   **Explanation:** Each sprite frame is 48 bytes (24 pixels wide × 2 bytes per row in 4-bit mode).

2. **Which register enables sprite 0?**
   a) $D000 (53248)
   b) $D010 (53264)
   c) $D030 (53296)
   d) $D027 (53287)
   **Answer:** a
   **Explanation:** $D000 (decimal 53248) controls sprite 0's enable bit. Set it to 1 to show the sprite, 0 to hide it.

3. **Where does the sprite graphics buffer start?**
   a) $0400
   b) $0400
   c) $2400
   d) $D400
   **Answer:** c
   **Explanation:** The sprite graphics buffer lives at $2400 (9216 decimal) in memory.

## Summary

- **Sprites** are movable 24×21 dot pictures on the C64 screen.
- **Enable sprite 0** with POKE 53248,1.
- **Sprite position**: X at $D004+$D005 (53252-53253), Y at $D008+$D009 (53256-53257).
- **Sprite data pointer** at $D018+$D019 (53288-53289) tells where the graphic data starts.
- **One frame = 48 bytes** in the sprite buffer ($2400+).
- **Animation** is swapping frames rapidly — just like a flip book!
- **READ/DATA** makes it easy to load multiple frames efficiently.

## What's Next?

Sprites are great, but what about storing **lots of game data** — enemy positions, power-up locations, and level maps? In the next lesson, you will learn how to use **BASIC arrays (DIM)** to organize complex game information, just like a tiny game database!

See you in Lesson 5.4 — Table Data with Arrays! 📊
