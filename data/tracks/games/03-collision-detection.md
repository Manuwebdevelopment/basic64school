# 03 — Collision Detection

## Metadata
- **Track:** Games
- **Lesson Number:** 3
- **Estimated Time:** ~30 min
- **Prerequisites:** Lessons games/01, games/02
- **Concepts:** AABB collision, sprite overlap detection, tile-based hit detection, distance-based checks

## Theory

Collision detection determines when two things on screen are "touching." This is the core mechanic of almost every game: did your sprite hit the wall? Did you collect the item? Did the enemy get you?

### Three Collision Methods

| Method | When to Use | C64 Example |
|------|------|------|
| AABB (box overlap) | Rectangle overlap between sprites | ABS(px - ex)<16 AND ABS(py - ey)<8 |
| Tile-based | Checking if player is on a map tile | MAP[px/8][py] = WALL_ID |
| Distance-based | Circular/distance checks | SQR((px-ex)^2 + (py-ey)^2) < RADIUS |

### AABB Collision

Most C64 games use AABB (Axis-Aligned Bounding Box) collision — compare the four edges of two rectangles:

```
Left1 < Right2 AND Right1 > Left2 AND Top1 < Bottom2 AND Bottom1 > Top2
```

On the C64 with the character grid, this simplifies: check if two sprites share overlapping X and Y coordinates.

## Key Takeaway

> Use coordinate comparison (ABS and IF/THEN) to check if two sprites overlap — if X-coordinates overlap AND Y-coordinates overlap, it's a collision.

## C64 BASIC Examples

### Box Collision Between Two Sprites

| Code | Description |
|------|------|
| `IF ABS(PX-EX) < 16 AND ABS(PY-EY) < 8 THEN GOSUB 500` | Hit enemy sub |
| `IF ABS(PX-BX) < 16 AND ABS(PY-BY) < 8 THEN GOSUB 600` | Hit bonus sub |

### Tile-Based Collision (Grid)

| Code | Description |
|------|------|
| `MAPX = INT(PX / 8): MAPY = INT(PY / 8)` | Grid column and row |
| `1003 READ TILE: IF TILE = -1 THEN RETURN` | Get tile at current map position |
| `1004 IF MAP(MAPX,MAPY) = 1 THEN PRINT "YOU HIT A WALL!"` | Check if it's a wall |

### Distance-Based Collision (Simplified)

| Code | Description |
|------|------|
| `DIST = ABS(PX-ENX) + ABS(PY-ENY)` | Manhattan distance (no sqrt needed!) |
| `IF DIST < 20 THEN PRINT "TOO CLOSE!"` | If within 20 pixels, collision |

## Exercise

1. **Step 1:** AABB collision between two sprites
   - Player sprite at PX,PY and enemy at EX,EY
   - Use ABS(PX-EX)<16 AND ABS(PY-EY)<8 to detect
   - Expected output: Message prints when they overlap

2. **Step 2:** Tile-based wall collision
   - Read the map tile at the player's grid position
   - If tile = 1 (wall), don't allow movement
   - Expected output: Player cannot walk through walls

3. **Step 3:** Bonus item collection detection
   - Check if player overlaps each bonus item
   - If yes, mark it as collected and add to score
   - Expected output: Items disappear from screen and score goes up

## Practice Challenge

> **Challenge:** Create a small arena with 5 walls (tiles) and 3 enemies. Detect when the player touches any wall or enemy. If touching a wall, push the player back. If touching an enemy, lose 1 life.
> **Hint:** For pushback: IF tile IS WALL THEN move player one step back.

## Quiz

1. **What does AABB collision check?**
   a) The distance between two points
   b) Whether two rectangles overlap
   c) The color of each pixel
   d) The number of sprites on screen
   **Answer:** b
   **Explanation:** AABB compares the edges of two axis-aligned rectangles to see if they overlap.

2. **Which is the fastest collision check on the C64?**
   a) Square root of (dx² + dy²)
   b) ABS(px-ex) + ABS(py-ey) < threshold
   c) String comparison
   d) GOSUB to a subroutine
   **Answer:** b
   **Explanation:** Simple subtraction + absolute value is faster than SQR on the C64's 6502 processor.

3. **What does a tile-based collision check?**
   a) The color of a pixel
   b) Whether the player's grid position maps to a wall tile
   c) The sprite data
   d) The border color
   **Answer:** b
   **Explanation:** Tile-based collision checks the grid cell the player occupies against a map array.

## Summary

- AABB collision compares X and Y overlaps between two rectangles
- Tile-based collision checks the player's grid cell against wall tiles
- Distance-based collision uses Manhattan distance (simplified for C64)
- Collision detection is the foundation of all interactive games

## What's Next?

With collision and assets packed, learn to design and load multiple game levels using DATA-driven maps.
