# 04 — Performance Optimization

## Metadata
- **Track:** Creative Coding
- **Lesson Number:** 4
- **Estimated Time:** ~30 min
- **Prerequisites:** Lessons creative/02 and creative/03
- **Concepts:** Loop unrolling, precomputed lookup tables, sprite tricks, character set modification, screen RAM optimization

## Theory

The C64's 6502 processor runs at 1-2 MHz. Every C64 BASIC instruction takes between 2-10 microseconds. A simple PRINT statement can take 500+ microseconds. This means a loop that iterates 1000 times to draw characters takes over half a second!

### Optimization Techniques

| Technique | Speedup | When to Use |
|------|------|------|
| Loop unrolling | 5-10x | Small fixed iterations |
| Lookup tables | 3-5x | Repeated calculations |
| Screen RAM optimization | 2x | Bulk drawing |
| Character set modification | Instant | Changing all characters to art glyphs |
| Sprite animation (instead of POKE) | 100x | Moving objects |

### Loop Unrolling

Instead of:
```
FOR I = 0 TO 39:POKE 1024+I,176:NEXT
```

Unroll the loop:
```
FOR I=0 TO 39:POKE 1024+I,176:NEXT
```
(This is the same, but the idea is: for very small loops, write each POKE individually instead of looping.)

### Lookup Tables

Instead of computing `INT(RND(1) * 100)` repeatedly, precompute the table:

```
DATA 5,12,3,45,67,8,92,34,56,1
```

Then READ the values as needed — this takes 10 microseconds vs. 200+ microseconds for the RND calculation.

## Key Takeaway

> Use lookup tables for repeated calculations, precompute random values, and replace screen POKE with sprites for moving objects to get 10-100x speedups.

## C64 BASIC Examples

### Unrolled Loop

| Code | Description |
|------|------|
| `POKE 1024,176:POKE 1025,176:POKE 1026,176...` | Unrolled 40 POKEs (one per screen column) |
| `POKE 1064,176:POKE 1065,176...` | Line 2, same approach |

### Precomputed Random Values

| Code | Description |
|------|------|
| `DATA 10,45,89,23,67,...` | 100 precomputed random values |
| `FOR I=0 TO 39:READ R:POKE 1024+I*RND(1),176:NEXT` | Use precomputed values (faster than RND each iteration) |

## Exercise

1. **Step 1:** Unroll a simple drawing loop
   - Replace a screen-drawing FOR/ NEXT with individual POKE calls
   - Measure the speed difference (use a timer loop to compare)
   - Expected output: Draw completes instantaneously

2. **Step 2:** Create a lookup table
   - Precompute the first 50 values of INT(RND(1)*100)
   - Use READ to pull values instead of calling RND repeatedly
   - Expected output: Drawing speed increases significantly

3. **Step 3:** Optimize a scrolling effect
   - Use screen address pointers ($03EC/$03ED) instead of moving each character individually
   - Replace sprite POKE loops with READ/DATA sprite frame cycling
   - Expected output: Smooth scrolling at 30+ frames per second (or as close as the C64 can get)

## Practice Challenge

> **Challenge:** Build a scrolling starfield that runs at the maximum possible frame rate on the C64. Precompute all star positions in DATA. Use screen pointers for scrolling. Replace all character POKEs with sprites where possible.
> **Hint:** Precompute at least 200 star positions. Use READ to load all stars before entering the game loop. Scroll the screen address ($03EC/$03ED) instead of moving individual characters.

## Quiz

1. **Why does loop unrolling speed things up?**
   a) The C64 has infinite memory
   b) Each FOR/NEXT cycle has overhead (initialization, comparison, incrementing)
   c) The 6502 processor is faster for long loops
   d) POKE works faster than FOR/NEXT
   **Answer:** b
   **Explanation:** Every FOR/NEXT iteration costs CPU for setup, comparison, and increment. Unrolling eliminates that overhead.

2. **Which technique gives the biggest speedup for moving objects?**
   a) POKE each frame
   b) Screen address scrolling
   c) Sprites (hardware accelerated)
   d) Reading DATA each frame
   **Answer:** c
   **Explanation:** Sprites are drawn by the VIC-II chip, not the CPU. They cost near-zero CPU.

3. **Precomputed lookup tables are best for:**
   a) One-time calculations
   b) Repeated calculations that don't change
   c) Screen drawing
   d) Sprite movement
   **Answer:** b
   **Explanation:** If a value is used many times and doesn't change, compute it once, store in DATA, then READ it as needed.

## Summary

- Loop unrolling eliminates FOR/NEXT overhead for small fixed loops
- Precompute values (random numbers, coordinates) in DATA blocks
- Use screen pointers ($03EC/$03ED) for scrolling instead of character-by-character movement
- Sprites (hardware-accelerated) are 100x faster than POKE for moving objects
- Every optimization buys more frame rate for your demo

## What's Next?

You've completed the Creative Coding Track. You now know how to create art, animations, and demoscene effects that run as fast as the C64 allows!
