# 06-5: Capstone — A Complete C64 BASIC Game

## Metadata
- **Level:** 6
- **Lesson Number:** 5
- **Estimated Time:** ~60 min
- **Prerequisites:** All Level 6 lessons (6-1 through 6-4)
- **Concepts:** Final project, game architecture combining all learned skills, debugging, playtesting

## Theory

This is your final project: build a complete C64 BASIC game that uses every concept from Levels 0-6:
- State machine (title → play → game over → restart)
- Sprite movement and input control
- Sound and scoring
- Difficulty scaling
- Polish techniques (shake, flash, feedback)

### Game Design: "STAR CHASER"

A simple game where you control a star sprite, collecting bonus stars while avoiding enemies. The goal is to reach 100 points before time runs out.

#### Game Components

| Component | Technique |
|-----------|-----------|
| Player (star sprite) | Sprite, X/Y positions, keyboard movement |
| Enemies (ghost sprites) | Sprites, random X/Y movement, collision detection |
| Bonus stars | Sprites, moving Y from top to bottom |
| Score display | PRINT + screen POKE each frame |
| Lives | Variable, displayed on screen |
| Timer | Frame-counted variable, decremented every frame |
| Sound effects | POKE to SID registers for scoring and losing |
| Screen shake | Position offset on damage |
| Border flash | Border color change on scoring events |

## Key Takeaway

> A complete game combines all learned techniques into a single program with states, sprites, sound, scoring, difficulty, and polish.

## C64 BASIC Examples

### Full Game Structure

```
10 STATE = 0: SCORE = 0: LIVES = 3: TIME = 600: LEVEL = 1
20 PX = 2000: PY = 2112

! STATE MACHINE
30 IF STATE = 0 THEN GOTO 100   ! TITLE
40 IF STATE = 1 THEN GOSUB 200   ! PLAY
50 IF STATE = 2 THEN GOSUB 300   ! GAME OVER
60 GOTO 30

! TITLE HANDLER (states 100-150)
100 PRINT CHR$(147)
110 PRINT "STAR CHASER"
120 PRINT "COLLECT BONUS STARS - AVOID ENEMIES!"
130 PRINT "PRESS SPACE TO START"
140 IF PEEK(197)=32 THEN STATE=1:GOSUB 1000:GOTO 30
145 RETURN

! PLAY HANDLER (states 200-299)
200 TIME = TIME - 1
205 IF TIME <= 0 THEN STATE = 2: GOTO 300
210 INPUT KEY → MOVE PX/PY
215 PRINT "SCORE:";SCORE;"LIVES:";LIVES;"TIME:";TIME
220 IF COLLISION WITH ENEMY THEN GOSUB 500 (lose life, shake screen)
225 IF COLLISION WITH BONUS THEN SCORE = SCORE + 10
230 IF LEVEL >= 5 THEN STATE = 2: GOTO 300
235 FOR I=0 TO 7:GOSUB 1000: NEXT   ! Draw sprites

! GAME OVER HANDLER (states 300-399)
300 PRINT CHR$(147):PRINT "GAME OVER!"
310 PRINT "FINAL SCORE:";SCORE
320 PRINT "PRESS SPACE TO TRY AGAIN"
330 IF PEEK(197)=32 THEN GOTO 10   ! Restart

! COLLISION/LOSS HANDLER (state 500)
500 LIVES = LIVES - 1
505 FOR I=1 TO 8:POKE PX,PX+(I MOD 3-1):NEXT   ! Screen shake
510 IF LIVES = 0 THEN STATE = 2: GOTO 300
515 POKE border,color: GOSUB 1000   ! Flash border
520 RETURN
```

### Sprite Drawing Helper

| Code | Description |
|------|------|
| `1000 FOR S=0 TO 7:POKE $D015+S,1:NEXT` | Enable all 8 sprite channels |
| `1010 RETURN` | End helper |

### Difficulty Scaling in Capstone

| Code | Description |
|------|------|
| `IF LEVEL = 1 THEN ENEMY_SPEED = 1` | Level 1: slow (1 pixel per frame) |
| `IF LEVEL = 2 THEN ENEMY_SPEED = 2` | Level 2: moderate |
| `IF LEVEL >= 3 THEN ENEMY_SPEED = 3` | Level 3+: fast |
| `IF LEVEL = 4 THEN ENEMY_COUNT = 4` | More enemies at higher levels |
| `IF LEVEL = 5 THEN ENEMY_COUNT = 5` | Maximum enemies |

## Exercise

1. **Step 1:** Build the skeleton
   - Create the state machine with 3 states (0, 1, 2)
   - Draw the title screen (PRINT) with a "PRESS SPACE" prompt
   - Expected output: A working title → play transition

2. **Step 2:** Add the core gameplay
   - Player sprite + keyboard controls
   - Enemy movement toward the player
   - Bonus star falling from top
   - Collision detection using coordinate comparison
   - Expected output: Full playable loop

3. **Step 3:** Add scoring, lives, timer
   - +10 points per bonus collected
   - -1 life per enemy collision
   - Start at TIME=600, decrement each frame
   - Expected output: Full game with game over on score>=150

4. **Step 4:** Add difficulty and polish
   - Enemy speed and count scale with LEVEL
   - Border flash on scoring + shake on damage
   - Sound tone on scoring up and losing
   - Expected output: A complete, satisfying game

## Practice Challenge

> **Challenge:** Complete the STAR CHASER game with all features. Then add ONE of these bonus features:
> - A high score system that saves to disk
> - Power-ups that increase movement speed temporarily
> - A final level where enemies become invincible
> - Multiple screens (background levels) with scrolling
> - A sprite animation (walking cycle)
> **Hint:** Start with the skeleton (Step 1), test it works, then add one feature at a time. Don't try to write the whole game at once!

## Quiz

1. **State machine is essential because:**
   a) It makes the game run faster
   b) It separates game logic into distinct phases that are easier to manage
   c) It uses less memory than if/then
   d) It creates sprites automatically
   **Answer:** b
   **Explanation:** State machines organize game logic by separating title, play, and game-over logic into distinct handlers.

2. **Which technique makes scoring feel satisfying?**
   a) Updating the score variable only
   b) Border color flash + sound tone + score print
   c) Changing the border color once
   d) Nothing matters as long as the score is correct
   **Answer:** b
   **Explanation:** Combining sound, color, and visual feedback makes scoring feel impactful.

3. **For enemy scaling, what grows as the level increases?**
   a) Only the border color
   b) Enemy speed and/or count
   c) The title text
   d) Nothing changes
   **Answer:** b
   **Explanation:** Enemy speed and count should increase to match player skill progression.

## Summary

- Build the game skeleton first (states), then core mechanics, then scoring
- Difficulty scaling keeps the game interesting at higher levels
- Sound + visual feedback makes the game feel alive and satisfying
- Every great game uses every technique you've learned this level

## What's Next?

Congratulations! Level 6 is complete. You now know how to build a full C64 BASIC game from scratch. The next step is the tracks: Games, Creative Coding, and Systems & Tools — each with specialized lessons that take your skills further.
