# 04 — Level Design

## Metadata
- **Track:** Games
- **Lesson Number:** 4
- **Estimated Time:** ~35 min
- **Prerequisites:** Lessons games/01, games/02, games/03
- **Concepts:** Multi-level games, data-driven level loading, map parsing, level progression

## Theory

A game with one level is a demo. A game with multiple levels is a real game. On the C64, levels are typically stored as DATA blocks — each level is a grid of tile IDs that get parsed into screen memory.

### Level Structure

Each level needs:
1. A map (tile IDs in a grid)
2. Start position for the player
3. End position (win condition coordinates)
4. Enemy and item placement
5. Difficulty parameters (enemy speed, bonus count)

### The Level Loader

The level loader reads DATA and builds the map in a loop:

```
L = LEVEL
1000 READ TILE: IF TILE = -1 THEN EXIT
1010 POKE 1024 + ROW * 40 + COL, TILE + 32
1020 COL = COL + 1: IF COL >= 40 THEN COL = 0: ROW = ROW + 1
1030 GOTO 1000
```

### Level Progression

When all bonuses are collected:
- Save the current level as "complete"
- Show a "LEVEL COMPLETE" message
- Increment LEVEL and call the level loader to draw the new map

## Key Takeaway

> Each level is a DATA block of tile IDs. A single loader subroutine can render any level from any DATA block.

## C64 BASIC Examples

### Level Data Encoding

| Code | Description |
|------|------|
| `LEVEL_1 DATA 1,1,1,1,1,1,1,1` | Border walls |
| `1,0,2,0,0,2,0,1` | Floor with 2 bonus items |
| `1,0,0,0,1,0,0,1` | Hallway with wall obstacle |
| `LEVEL_2 DATA 1,1,1,1,1,1,1,1` | Level 2 border |
| `1,0,0,2,0,0,0,1` | Different layout |

### Level Loader

| Code | Description |
|------|------|
| `1000 READ TILE: IF TILE = -1 THEN RETURN` | End marker |
| `1010 POKE 1024+ROW*40+COL, TILE+32` | Write to screen |
| `1020 COL = COL+1: IF COL=40 THEN COL=0: ROW=ROW+1` | Advance position |
| `1030 GOTO 1000` | Continue loading |

## Exercise

1. **Step 1:** Create a single level loader
   - Use a DATA block with tile IDs (0=floor, 1=wall, 2=bonus)
   - Render the level to screen memory
   - Expected output: Your level appears in full

2. **Step 2:** Add level 2
   - New DATA block with a different layout
   - A "LEVEL SELECT" screen that chooses which DATA to load
   - Expected output: You can switch between two levels

3. **Step 3:** Add progression logic
   - Collect all items → level completes → load next level
   - Show "LEVEL COMPLETE" message between levels
   - Expected output: A multi-level game experience

## Practice Challenge

> **Challenge:** Build a 3-level game with a title screen, level loader, and progression system. Level 3 should be the hardest. Include a level select screen and a "final level" victory message.
> **Hint:** Store levels as DATA blocks with an LVL_START index. Use a FOR loop to load each level when LEVEL variable increments.
>
> **Bonus:** Add a save/load system using PRINT # and GET to persist the current level.

## Quiz

1. **Why store levels as DATA instead of writing them out in code?**
   a) DATA is faster to execute
   b) DATA is compact, reusable, and easy to edit
   c) DATA uses less CPU
   d) DATA is required by the C64
   **Answer:** b
   **Explanation:** DATA blocks are compact data storage that can be reused by a single loader subroutine.

2. **What marks the end of a level in DATA?**
   a) A blank line
   b) The value -1
   c) GOTO 0
   d) A semicolon
   **Answer:** b
   **Explanation:** Using -1 as a sentinel value is a common pattern — the loader checks for it to know when to stop.

3. **How do you display a new level after the previous one completes?**
   a) Change the border color only
   b) Print "LEVEL COMPLETE", increment LEVEL, call the loader for the new DATA
   c) Nothing changes
   d) Reset the game to start
   **Answer:** b
   **Explanation:** Show a message, increment the level variable, and call the loader with the new DATA block.

## Summary

- Levels are data-driven: tile maps stored in DATA blocks
- A single loader subroutine renders any level
- Progression: collect items → complete level → load next level
- Multi-level games need a level select screen and clear UI

## What's Next?

You have the core game mechanics. Now add SFX, transitions, difficulty tuning, and playtesting strategies to turn it into a polished game.
