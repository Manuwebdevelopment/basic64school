# Lesson 2.1 — Welcome to the Memory Map: Where the Screen Lives

## Metadata

| Field | Value |
|-----|--|------|
| **Level** | 2 |
| **Lesson Number** | 1 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Level 1 (FOR/NEXT, Variables, Input/Output) |
| **Concepts** | Memory map, Screen RAM ($0400), Color RAM ($0680), VIC-II, total RAM (38,914 bytes) |

## Theory

Imagine your Commodore 64 is like a giant, magical desk. On this desk there are drawers, folders, and sticky notes, each with a special address — a number where the C64 knows where to look for its things. Every byte of RAM in the C64 has a unique address, like a house number on a street. Your screen is no exception!

The C64 has **38,912 bytes** (plus 38 bytes of zero-page memory) of RAM — that's a lot of room! But for now, we only care about two very special areas on this desk:

### Screen RAM: $0400 — Your Drawing Canvas

Every character you see on the C64 screen is stored in a hidden area of memory starting at address **$0400** (hexadecimal) or **1024** (decimal). Why $0400? Because the VIC-II chip — the C64's graphics processor — reserved this spot just for your text screen.

| Memory Address | Decimal | Size | Purpose |
|-----|----|----|-----|
| $0400 | 1024 | 1000 bytes | 40 columns × 25 rows of character codes |
| (continues) | | 24 bytes | PETSCII graphics line row |

That means your screen — all 40 characters across and 25 rows down — lives at $0400. If you put a "A" in position 5, the C64 stores the character code 65 at address $0400 + 4 (remember: we start counting at 0!).

### Color RAM: $0680 — Your Painting Palette

Right after Screen RAM lives the **Color RAM**, which starts at **$0680** (hex) = **1664** (decimal). We get this number by adding **$280** (hex) = **640** (decimal) to $0400.

Why 640 (or $280)? Because each of the 1000 characters on screen would get 1 byte of color each, plus the C64 reserves some extra space. The exact math is: 1000 screen chars + 640 color bytes = the C64's design.

**The golden rule:** Each character at `Screen RAM + N` has its color at `Color RAM + N`. They are best friends — neighbors sitting next to each other!

| Character Position on Screen | Screen RAM Address | Color RAM Address |
|-----|-----|-----|
| Row 1, Column 1 (top-left) | $0400 | $0680 |
| Row 1, Column 2 | $0401 | $0681 |
| ... | ... | ... |
| Row 3, Column 5 | $0484 | $0704 |
| Row 25, Column 40 (bottom-right) | $07E7 ($0400 + 999) | $09E7 ($0680 + 999) |

### The VIC-II Chip — The Artist Behind the Curtain

The **VIC-II** (Video Interface Chip) is the C64's graphics hero. It's a tiny chip (chip number 4 on the motherboard) that:

1. Reads character codes from Screen RAM at $0400
2. Reads colors from Color RAM at $0680
3. Converts them into pixel patterns using the character generator ROM
4. Sends the pixels to your TV or monitor

Think of the VIC-II as a painter in a gallery. Screen RAM is its paint palette (which colors it uses for each character), and the VIC-II decides what actually appears on your TV screen.

### What About the Other 38,912 Bytes?

The C64's memory map is organized in blocks of 16 KB (16,384 bytes each). Here's the big picture:

| Address Range | Size | Used By |
|-----|-----|-----|
| $0000–$07FF ($0–2047) | 2KB | Zero Page (super fast, used by BASIC) |
| $0800–$1FFF ($2048–8191) | 8KB | BASIC Program Storage |
| $2000–$9FFF ($8192–40959) | 32KB | User RAM (your program space!) |
| $A000–$BFFF ($40960–49151) | 8KB | Character Generator ROM (PETSCII fonts) |
| $C000–$DFFF ($49152–57343) | 8KB | BASIC ROM (BASIC interpreter lives here) |
| $E000–$F7FF ($57344–63487) | 6KB | Kernal ROM (operating system) |
| $F800–$FFFF ($63488–65535) | 2KB | I/O Area (VIC-II registers, SID, etc.) |

The magic is that the character generator ROM starts at $A000. When the VIC-II sees character code 65 (the letter "A"), it looks up the "A" pattern in the $A000 block to know how to draw it.

### Key Takeaway

> **Screen RAM at $0400 holds every character code on your screen, and Color RAM at $0680 holds the color for each character. The VIC-II chip reads both and paints what you see. Every character position has a Screen RAM neighbor AND a Color RAM neighbor!**

## C64 BASIC Examples

### Example 1: Peek at where your cursor lives

```
10 PRINT "YOUR SCREEN MAP:"; CHR$(147)
20 PRINT "Screen RAM Starts At: "; HEX$
25 PRINT "  Address $0400 = "; 1024; " in decimal"
30 PRINT "Color RAM Starts At: $0680 = ", 1664; " in decimal"
40 PRINT "Difference: $0680 - $0400 = ", 640; " bytes"
50 PRINT "Total C64 RAM: 38,912 bytes"
60 PRINT
70 PRINT "Try POKEing a character at $0400!"
```

In this example, we're showing where screen RAM and color RAM live using simple print statements. The addresses are the foundation of everything we'll do next.

### Example 2: Writing directly to Screen RAM

```
10 PRINT "WRITING TO SCREEN RAM": CHR$(147)
20 POKE 1024, 65
30 PRINT
40 PRINT "Now look at the top-left corner!"
50 PRINT "You should see: A"
60 PRINT "That's because we POKE'd 65 ($0400)!"
```

Here we POKE the value 65 (the character "A") into address 1024 (which is $0400). The next time the screen refreshes, you should see an "A" appear at position (1,1) — the top-left corner!

### Example 3: Write a full row of characters

```
10 POKE 147
20 PRINT "DRAWING A ROW:"
30 FOR COL = 0 TO 39
40 POKE 1024 + COL, 65
50 NEXT COL
60 PRINT "Full row of 'A's!"
70 WAIT 64654, $80
80 WAIT 64654, 0
```

Line 30 loops the columns from 0 to 39 (that's all 40 columns in a row). For each column, we POKE the character code 65 ("A") into `1024 + COL`, which maps to $0400 through $0427. We see a full line of A's appear!

### Example 4: Color it!

```
10 POKE 147
20 FOR COL = 0 TO 39
30 POKE 1024 + COL, 65
40 POKE 1664 + COL, 7
50 NEXT COL
60 PRINT "A's on a YELLOW background!"
```

This pairs every "A" (code 65) at Screen RAM with a color (code 7 = yellow) at Color RAM. Now the row of "A"s has a matching color!

### Example 5: Visual memory layout

```
10 PRINT "  MEMORY MAP OVERVIEW:"; CHR$(147)
20 PRINT
30 PRINT "  $A000 = Character ROM (fonts)"
40 PRINT "  $C000 = BASIC ROM (interpreter)"
50 PRINT "  $E000 = Kernal ROM (os)"
60 PRINT "  $0400 = Screen RAM (characters)"
70 PRINT "  $0680 = Color RAM (palette)"
80 PRINT "  0-38911 = Total RAM in bytes"
```

This displays the memory map visually so you can remember the key addresses.

## Exercise

1. **Type Example 2 and press RUN.**
   - Expected output: An "A" appears at the very top-left corner of the screen. The "A" is the character code 65 at Screen RAM address $0400 (1024).

2. **Type Example 3 and press RUN.**
   - Expected output: A full row of 40 "A"s appears across the top of the screen. Each column position 0-39 got POKE 1024 + COL = $0400 + COL.

3. **Modify Example 4:** Change the color code from 7 to different numbers (0–15) and watch the colors change. Try: 1=blue, 2=red, 3=cyan, 4=purple, 5=green, 6=white, 9=orange.

## Practice Challenge

> **Challenge:** Create a 5-row tall stripe of the same letter "X" on the right-hand side of the screen (column 36, 37, or 38), and color it using at minimum 3 different colors. Think: you need to POKE 5 rows at the same column in Screen RAM, then POKE 5 corresponding colors in Color RAM.
>
> **Hint:** Use a nested loop. Outer loop for the 5 rows, inner loop for each character in the row. Remember: Row N is `1024 + N×40 + COL` in screen RAM!

## Quiz

1. **Where does Screen RAM start on the C64?**
   a) $2000
   b) $0400
   c) $A000
   d) $D020
   **Answer:** b
   **Explanation:** Screen RAM always starts at $0400 (1024 decimal). This is the first address where the VIC-II chip reads character codes from.

2. **How many bytes separate Screen RAM ($0400) from Color RAM ($0680)?**
   a) 256 bytes ($100)
   b) 512 bytes ($200)
   c) 640 bytes ($280)
   d) 1024 bytes ($400)
   **Answer:** c
   **Explanation:** $0680 - $0400 = $280 = 640 decimal bytes. This is the color RAM offset.

3. **What chip generates the actual pixel image from character codes?**
   a) SID chip
   b) CPU 6510
   c) VIC-II chip
   d) PLA chip
   **Answer:** c
   **Explanation:** The VIC-II chip reads screen RAM and color RAM, looks up character patterns in ROM, and sends the result to the TV monitor.

4. **If you want to change the color of the character at row 1, column 10, which Color RAM address do you POKE?**
   a) $0689
   b) $068A
   c) $040A
   d) $0690
   **Answer:** b
   **Explanation:** Row 1, column 10 is offset 9 in Screen RAM ($0400 + 9 = $0409). Its color is at $0680 + 9 = $0689 in hex, which is $068A.

## Summary

- **Screen RAM at $0400** stores every character code on the C64 screen (40 × 25 = 1000 characters).
- **Color RAM at $0680** stores the color for each character (640 bytes, offset $280 from Screen RAM).
- **Character N** on screen lives at Screen RAM + N and Color RAM + N — they are neighbors!
- **The VIC-II chip** does the work of turning character codes into pixel patterns on your screen.
- **Total RAM in the C64** is 38,912 bytes, organized across ROM, RAM, and I/O regions.
- **POKE** can write directly into Screen RAM and Color RAM to draw on the screen.

## What's Next?

Now you know where the screen lives in memory. But how do you actually **draw on it**? In the next lesson, you'll POKE characters directly into Screen RAM like a real hacker — creating patterns, writing messages, and learning the secret art of **pixel-perfect screen control**!

See you in Lesson 2.2 — POKE the Screen! ✏️
