# 01 — Game Prototypes

## Metadata
- **Track:** Games
- **Lesson Number:** 1
- **Estimated Time:** ~30 min
- **Prerequisites:** Level 0-2, Level 6 (state machines)
- **Concepts:** Minimal viable game, core loop, prototype-driven development

## Theory

The goal of this lesson is to build the *smallest possible complete game* — one you can play from start to finish in under 10 lines of C64 BASIC. This "prototype-first" approach is how professional game developers work: build the core loop first, then add features.

### What Is a Core Loop?

The core loop is the repeated cycle of gameplay:
1. Player does something
2. Game responds
3. Game checks if the player won or lost
4. Repeat

For a C64 game, your core loop might be:
```
PRINT "Press SPACE to move"
INPUT → move sprite → check if caught the target
IF caught → WIN, GOTO 10
```

That's 4 steps. Every C64 game on the market was built inside this loop.

### Three Quick Prototypes

Each builds on the first:

| Prototype | What You Learn |
|------|------|
| 1. Catch the star | Sprite + input + win condition |
| 2. Avoid the ghost | Sprite + movement + lose condition |
| 3. Score collection | Sprite + input + scoring + win |

## Key Takeaway

> Build the smallest playable game first. If your game isn't fun with one sprite and two numbers, adding more will not help.

## C64 BASIC Examples

### Prototype 1: Catch the Star (4 lines of core logic)

| Code | Description |
|------|------|
| `PX=100:PY=200:TX=200:TY=250` | Player X/Y + Target X/Y |
| `10 PRINT CHR$(147):PRINT "MOVE TO STAR"` | Clear & instruction |
| `20 GET A: IF A=68 THEN PX=PX+10` | Right arrow → move right |
| `30 IF PX=TX AND PY=TY THEN PRINT "WIN!": END` | Win on overlap |

### Prototype 2: Avoid the Ghost

| Code | Description |
|------|------|
| `GX=150` | Ghost X position |
| `10 PRINT CHR$(147)` | Clear screen |
| `20 GX=GX+1:IF GX>380 THEN GX=0` | Ghost moves right, wraps |
| `30 IF ABS(PX-GX)<10 AND ABS(PY-8)=0 THEN PRINT "LOST!": END` | Collision |

### Prototype 3: Score Collection

| Code | Description |
|------|------|
| `SCORE=0:FOR I=0 TO 7:POKE 1024+I,255:NEXT` | Draw 8 bonus items on screen |
| `10 GET A` | Read input |
| `20 POKE 53270,1` | Enable sprites for player |
| `30 FOR I=0 TO 9:IF ABS(PX-I*40)<10 AND ABS(PY-PEEK(1030+I))<10 THEN SCORE=SCORE+1:NEXT` | Check overlaps |

## Exercise

1. **Step 1:** Build the catch-the-star prototype
   - One sprite you control, one target that appears randomly
   - Win when you reach the target
   - Expected output: Simple, complete win/loss loop

2. **Step 2:** Make the target move each time you catch it
   - Randomize the new position with RND(380) for X, RND(24) for Y
   - Expected output: Progressive challenge — harder to catch as it teleports

3. **Step 3:** Add a timer and lose condition
   - Add "IF TIME <= 0 THEN PRINT 'TIME UP!'": END
   - Expected output: Full game with win and two loss conditions

## Practice Challenge

> **Challenge:** Build a "catch the falling stars" game in under 15 lines of core logic. Stars fall from the top, you move a basket (sprite) left/right to catch them. +10 for each star caught. 3 lives. If 3 stars miss you, game over.
> **Hint:** Use X=INT(RND(1)*7) to randomize drop positions and PEEK/POKE for screen management.
>
> **Bonus:** Add a level system where each level doubles the star drop speed.

## Quiz

1. **Why start with a minimal prototype?**
   a) To make the game run faster
   b) To prove the core loop is fun before adding content
   c) Because C64 BASIC is too slow for complex games
   d) Because you have limited memory
   **Answer:** b
   **Explanation:** If the core loop is boring, no amount of polish or content will save it.

2. **What is the core loop?**
   a) The title screen
   b) The repeated cycle of player action → game response → condition check
   c) The game over screen
   d) The file saving system
   **Answer:** b
   **Explanation:** The core loop is the fundamental gameplay cycle.

3. **What must a win condition do?**
   a) Print "WIN!" and end the game
   b) Change the border color
   c) Both a and b
   d) Nothing — wins don't need detection
   **Answer:** a
   **Explanation:** A win must stop gameplay and display the result.

## Summary

- Prototypes prove the core loop works
- Start with the smallest possible playable game
- Add features only after the core loop is established and fun

## What's Next?

Now that you have a working prototype, learn to pack your game's art (sprites, maps, tile sets) efficiently as DATA blocks to save memory.
