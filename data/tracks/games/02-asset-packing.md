# 02 — Asset Packing

## Metadata
- **Track:** Games
- **Lesson Number:** 2
- **Estimated Time:** ~30 min
- **Prerequisites:** Lesson games/01
- **Concepts:** DATA blocks, sprite encoding, compressed sprite data, tile maps, memory efficiency

## Theory

The C64 only has 38KB of RAM for everything: the OS, screen memory, and your game code. Every byte counts. "Asset packing" means encoding game data (sprite graphics, maps, tile sets) as tightly as possible in READ/DATA lines.

### Compressed Sprite Encoding

Instead of 48 individual POKE commands for each sprite row, use a single DATA line with hex bytes:

```
DATA $FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF
```

Then use a subroutine to read these bytes and POKE them into sprite memory $4000-$41FF:

```
1000 READ DX: IF DX=-1 THEN RETURN
1010 POKE $4000+I, DX: I = I + 1
1020 GOTO 1000
```

### Tile Maps

For larger game maps, encode the level as a grid of tile IDs:

```
DATA 1,1,1,1,1,1
DATA 1,0,0,0,0,1
DATA 1,0,2,2,0,1
DATA 1,0,0,0,0,1
DATA 1,1,1,1,1,1
```

Tile 1 = wall, Tile 0 = floor, Tile 2 = bonus item.

## Key Takeaway

> Use DATA blocks to encode every sprite, map, and tile set as hex bytes. One LINE of DATA can replace dozens of code lines.

## C64 BASIC Examples

### Sprite Data Encoding

| Code | Description |
|------|------|
| `DATA 68,126,255,255,255,255,126,68` | Heart shape (4 bits per pixel, 8 rows) |
| `DATA 255,0,170,0,85,0,127,32` | Ghost shape |
| `SUBROUTINE: READ SP_DATA(I): POKE $4000+I, SP_DATA(I): NEXT` | Load sprite from DATA |

### Tile Map Encoding

| Code | Description |
|------|------|
| `DATA 1,1,1,1,1,1,1,1` | Row 0: all walls (border) |
| `DATA 1,0,0,0,0,0,0,1` | Row 1: walls on sides, floor in between |
| `DATA 1,0,2,2,2,0,0,1` | Row 2: bonus items in the middle |
| `1000 READ TILE: IF TILE = -1 THEN GOTO 2000` | Load tiles one at a time |
| `1010 POKE 1024+A, TILE + 32: NEXT` | Write to screen memory (+32 because C64 screen uses offset) |

## Exercise

1. **Step 1:** Encode a sprite as DATA
   - Use hex values to encode a simple 8x64 pixel character
   - Use a READ loop to load it into screen memory
   - Expected output: Your character appears on screen

2. **Step 2:** Encode a 5x5 level map
   - Tiles: 0=floor, 1=wall, 2=bonus
   - Expected output: A visible map when rendered

3. **Step 3:** Add multiple sprite types
   - Player, enemy, and item sprite data in one DATA block
   - Expected output: All three appear in the game

## Practice Challenge

> **Challenge:** Create a tile-based map with a hero sprite, 3 enemy locations, and 5 bonus items — all packed into DATA blocks under 10 lines. Load the map from DATA and render it to screen memory.
> **Hint:** Use tile 123 ($7B) for floor, tile 219 ($DB) for wall, tile 196 ($C4) for borders.

## Quiz

1. **Why use DATA blocks for sprites instead of POKE?**
   a) DATA executes faster
   b) DATA encodes a sprite in one line instead of 48
   c) DATA uses less RAM than POKE
   d) DATA is required on the C64
   **Answer:** b
   **Explanation:** One DATA line with 8 hex bytes replaces 48 individual POKE commands.

2. **Tile maps let you:**
   a) Draw individual pixels
   b) Build complex maps with a few bytes per tile
   c) Change the border color
   d) Play music
   **Answer:** b
   **Explanation:** Tile maps use ID numbers to reference pre-defined tiles, making large maps compact.

3. **What does POKE to screen memory do?**
   a) It changes the border color
   b) It writes a character to a specific screen position
   c) It loads a new program
   d) Nothing — screen memory is read-only
   **Answer:** b
   **Explanation:** Screen memory (1024-2047) controls what characters appear where on-screen.

## Summary

- DATA blocks encode sprites, maps, and tile sets efficiently
- Sprite encoding: 8 hex bytes per character row
- Tile maps: grid of tile IDs rendered to screen memory
- Packed assets save both code lines and precious RAM

## What's Next?

Now that your assets fit, learn to detect when the player's sprite collides with enemies or bonuses reliably.
