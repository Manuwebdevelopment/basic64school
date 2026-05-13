# 3-6: Sprites vs. POKE the Screen

## Metadata
- **Level:** 3
- **Lesson Number:** 6
- **Estimated Time:** ~20 min
- **Prerequisites:** Lessons 3-1 through 3-5
- **Concepts:** Sprite limitations, direct screen memory writing, performance comparison, when to use each approach

## Theory

Now you know how sprites work. But the C64 offers another way to display graphics: directly POKEing screen memory. In this lesson, we'll compare these two approaches and learn when to use each.

### Sprites: Fast but Limited

Sprites are the C64's dedicated shape system:
- The VIC-II chip handles sprite rendering automatically — your program doesn't draw pixel by pixel
- Sprites are hardware-accelerated — movement is instant
- **But** you can only have 8 sprites at once (sprite 0-7)
- Sprites are always 21 pixels wide and 8 pixels tall
- Sprites cannot be placed off-screen (they clip at the edge)
- Sprites can overlap — one sprite covering another is handled automatically
- Sprites cannot be scrolled — they move with the screen

### Screen POKE: Flexible but Slow

Writing directly to screen RAM (addresses 1024-2047):
- You can change any character at any screen position (40 columns × 25 rows = 1000 characters)
- You have complete creative freedom — no size or position limits
- **But** you must update every frame yourself (no hardware help)
- Large redraws are slow — the CPU is busy copying data
- No automatic overlapping — if you draw two rows close together, they just touch
- You can scroll characters by changing the screen address in $03EC-$03ED

### When to Use Each Approach

| Use Sprites When... | Use Screen POKE When... |
|---------------------|-------------------------|
| Objects need to move fast | Creating a static background |
| You need collision detection | Building menus or text layouts |
| You want smooth animation | Drawing maps or grids |
| Making a character or ball | Writing titles or menus |
| Building a game | Creating art displays |

### Pro Tip: Mix Both!

The best C64 programs use sprites AND screen POKE together:
- Background built with screen POKE (buildings, ground, sky)
- Characters and bullets built with sprites
- This gives you the best of both worlds

## Key Takeaway

> Use sprites for things that move fast, use screen POKE for backgrounds and static graphics. The greatest C64 games use both together.

## C64 BASIC Examples

### Example 1: Create a Background with POKE

This builds a simple game background with a floor and sky.

| Code | Description |
|------|------|
| `POKE 53280,0:POKE 53281,0` | Set border (1) and background (0) colors |
| `FOR A=1024 TO 1399` | Loop through top 7 rows (sky area) |
| `  POKE A,32` | Fill with spaces for clear sky |
| `NEXT` | End loop |
| `FOR A=1400 TO 1599` | Loop through next 5 rows (trees) |
| `  POKE A,147` | Fill with spaces again |
| `NEXT` | End loop |
| `FOR A=1600 TO 2039` | Loop through middle area (green ground) |
| `  POKE A,23` | Fill with green characters - use POKE to write PETSCII code to screen memory |
| `NEXT` | End loop |

### Example 2: Create a Floor Pattern

| Code | Description |
|------|------|
| `POKE 1920,185:POKE 1921,186` | First line of floor pattern |
| `POKE 1922,185:POKE 1923,186` | Second line with alternating pattern |
| `FOR A=2064 TO 2099` | Loop to last row of floor |
| `  POKE A,185` | Fill with the floor character |
| `NEXT` | End loop |

### Example 3: Sprite + Screen Combo — Ball on Ground

| Code | Description |
|------|------|
| `FOR A=1600 TO 1999:POKE A,196:NEXT` | Draw floor line (PETSCII character 196 = horizontal bar) |
| `PRINT CHR$(147)` | Clear screen |
| `POKE 2020,255:POKE 2021,255:POKE 2022,255` | Draw sprite on screen (for verification) |
| `POKE 2000,100:POKE 2060,100` | Set X positions for sprites 0 and 4 |
| `POKE 2040,132:POKE 2112,100` | Set Y position (row 5) |
| `PRINT "Sprite 0 moves over the floor!"` | Confirm visual |
| `POKE 53270,1:POKE 53271,16` | Enable sprites 0 and 1 (bit 4 = $10) |
| `PRINT "Now the sprite is visible!"` | Confirm sprite is active |
| `FOR A=0 TO 7:POKE 53278+A,0:NEXT` | Clear sprite multicolor and X expansion |
| `PRINT "Sprite 1 multicolor enabled"` | Enable multicolor mode |

Note: You can combine a sprite character over a screen POKE background by setting appropriate sprite positions (X positions 2000-2010 for sprite x-coordinates).

## Exercise

1. **Step 1:** Draw a colored background
   - Set screen memory 1024-1439 to spaces (32)
   - Then set 1840-1999 to a different character (33)
   - Expected output: Two-tone background in the emulator
   - Your C64 screen shows the top half and bottom half differently

2. **Step 2:** Draw a floor pattern using the POKE method
   - Use character 185 (horizontal bar) repeated across rows 47-50
   - Expected output: Solid horizontal lines representing the ground
   - Verify the lines are evenly spaced

3. **Step 3:** Add a sprite on top of your floor
   - Enable a sprite using the SPRITE command
   - Position it at row 5 (Y = 100), column 20 (X = 100)
   - Expected output: You see your sprite floating over the floor
   - The sprite should display above the floor pattern

## Practice Challenge

> **Challenge:** Build a simple game scene — a character sprite over a two-color floor and sky background. Include a title row at the top of the screen using screen POKE characters.
> **Hint:** Use character 185 for the floor, character 219 for the title bar ($D9), and a simple sprite shape for your character.
>
> **Bonus:** Make the sprite walk along the floor by changing its X position in a loop with DELAY between each movement.

## Quiz

1. **How many sprites can the C64 display at once?**
   a) 4
   b) 8
   c) 16
   d) Unlimited
   **Answer:** b
   **Explanation:** The C64's VIC-II chip supports exactly 8 sprites.

2. **Which is faster for movement: sprites or screen POKE?**
   a) Screen POKE because it's simpler
   b) Sprites because they are hardware-accelerated
   c) Both are equally fast
   d) It depends on the screen resolution
   **Answer:** b
   **Explanation:** Sprites are hardware-accelerated by the VIC-II chip, so moving them is instant. Screen POKE requires the CPU to rewrite every frame.

3. **Which should you NOT use a sprite for?**
   a) A player character
   b) A bouncing ball
   c) A large static background image
   d) Missile/Projectiles
   **Answer:** c
   **Explanation:** Large static backgrounds are better built with screen POKE because sprites are limited to 8 and are designed for moving objects.

## Summary

- Sprites are hardware-accelerated but limited to 8
- Screen POKE gives full creative freedom but is slow
- Combine both: screen POKE for the background, sprites for moving elements
- This is how most classic C64 games were built

## What's Next?

In the next lesson (the capstone), you'll combine everything you've learned to build a full sprite chase mini-game!
