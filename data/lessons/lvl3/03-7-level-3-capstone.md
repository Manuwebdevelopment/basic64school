# 03-7: Level 3 Capstone — Sprite Battle Arena

## Metadata
- **Level:** 3
- **Lesson Number:** 7
- **Estimated Time:** ~45 min
- **Prerequisites:** All Level 3 lessons (3-1 through 3-6)
- **Concepts:** Multi-sprite management, collision detection, game loop synthesis, scoring, polish

## Theory

This lesson brings together every concept from Levels 3-6: multi-sprite management, player input, timing loops, collision detection, scoring, and SFX. You'll build a complete mini-game.

### The Sprite Battle Arena

Your game will have:
1. A player sprite (controlled by arrow keys)
2. Three enemy sprites (moving randomly)
3. Bonus items (appearing and disappearing)
4. A scoring system and a health counter
5. A win/loss condition with game-over screen

### Game Architecture

| Component | What It Does |
|------|------|
| Sprite Engine | Manages 6 sprites simultaneously |
| Movement Loop | Reads arrow keys, updates player position |
| Enemy AI | Each enemy picks a direction every 10 frames |
| Collision Checker | Checks player-vs-enemy, player-vs-bonus |
| Scoring Module | Tracks hits, collects, and health |
| Game Loop | Ties everything into a unified frame cycle |

### The Frame Timing Pattern

```
FOR FRAME = 1 TO 60
  READ PLAYER INPUT
  UPDATE ALL SPRITES
  CHECK ALL COLLISIONS
  UPDATE SCORE DISPLAY
NEXT FRAME
```

This is the "one game = one loop" pattern that powers all C64 BASIC games. Every game you've coded follows this template.

## Key Takeaway

> A complete game is a single loop containing: read input → update sprites → check collisions → update display. This pattern works for every C64 BASIC game.

## C64 BASIC Examples

### Multi-Sprite Setup

| Code | Description |
|------|------|
| `FOR SPR=0 TO 5:POKE 53272+SPR,1:NEXT` | Enable 6 sprites at once |
| `POKE 53276,2` | Double-height for player sprite |
| `FOR SPR=0 TO 5:READ DX:POKE $4000+SPR*8,DX:NEXT` | Load sprite data for all 6 |
| `DATA DX=68,126,255,255,255,255,126,68` | Sprite player data (heart) |
| `DATA DX=255,0,170,0,85,0,127,32` | Sprite enemy data (ghost) |

### Main Game Loop

| Code | Description |
|------|------|
| `100 PRINT "SPRITE BATTLE — PRESS ANY KEY"` | Title screen |
| `110 GET K$:IF K="" GOTO 110` | Wait for start |
| `200 PX=160:PY=100:SCORE=0:LIVES=3` | Init game variables |
| `300 FOR FRAME=1 TO 60` | Frame counter (game loop) |
| `310 GET A`: IF A=68 THEN PX=PX+10` | Right arrow input |
| `320 FOR EN=0 TO 2: EX(EN)=EX(EN)+DIR(EN):IF EX(EN)>380 THEN DIR(EN)=-1` | Enemy movement |
| `330 IF ABS(PX-EX(EN))<20 AND ABS(PY-EY(EN))<20 THEN LIVES=LIVES-1:GOTO 900` | Collision check |
| `900 IF LIVES<=0 THEN PRINT "GAME OVER!":GOTO 1000` | Game over check |
| `1000 NEXT` | Next game loop iteration |

## Exercise

1. **Step 1:** Build the arena (sprites + background)
   - Draw a border and place the player sprite in the center
   - Expected output: Your arena area appears with player sprite in position

2. **Step 2:** Add enemy movement and scoring
   - Three enemies that move randomly every 10 frames
   - Score updates when player touches an enemy vs. when they collide
   - Expected output: Enemies roam, score changes on interaction

3. **Step 3:** Add the full game loop
   - Wrap everything in a 60-frame loop
   - Add a "Game Over" with current score and a "New game" button
   - Expected output: A playable, complete Sprite Battle Arena game you can play from start to finish!

## Practice Challenge

> **Challenge:** Extend your arena game with: a scrolling border, a level counter, different enemy types (fast/small, big/slow), power-ups, and a high score screen.
> **Hint:** Add a `LEVEL` variable that increments when all enemies are defeated, then load a new arena layout. Store high scores in a DATA block.

## Quiz

1. **What is the game loop pattern?**
   a) A single loop containing: read input → update sprites → check collisions → update display
   b) A loop that only reads keyboard input
   c) A loop that only moves sprites
   d) A loop that only displays scores
   **Answer:** a
   **Explanation:** The game loop contains all game logic.

2. **How many sprites can the C64 display simultaneously?**
   a) 4
   b) 8
   c) 16
   d) 6 playable/sprite-enabled
   **Answer:** d
   **Explanation:** The C64 has 8 sprites but only 6 can be playable/enabled simultaneously (2 are used for border/background).

3. **Why use a frame counter (FOR FRAME=1 TO 60)?**
   a) To limit the game to 1 minute
   b) To provide a consistent cycle for timing, input, and rendering
   c) Because C64 hardware requires 60Hz timing
   d) a and c
   **Answer:** d
   **Explanation:** Frame counters control game logic timing (b) and match the C64's 60Hz video refresh (c).

## Summary

- The game loop combines input, sprite updates, collisions, and display
- Multi-sprite management requires careful POKE to sprite control registers
- Every feature you've learned fits into the "loop" pattern
- The capstone combines everything into a playable mini-game

## What's Next?

Level 3 complete! Move on to Level 4: Sound, Input & Timing to add audio and richer control to your games.
