# 06-3: Difficulty Escalation — Making Games Progressively Harder

## Metadata
- **Level:** 6
- **Lesson Number:** 3
- **Estimated Time:** ~25 min
- **Prerequisites:** Lessons 6-1 through 6-2
- **Concepts:** Adaptive difficulty, spawning logic, speed scaling, exponential vs. linear growth, plateau tuning

## Theory

A game with the same difficulty forever is boring. The best C64 games get harder as you play. This is called "difficulty scaling" or "progressive difficulty."

On the C64, scaling is controlled with variables and math. When certain conditions are met (score reached, level changed, time elapsed), update variables that make the game more challenging:

- Enemy speed increases
- Enemy count increases
- Spawn timer decreases
- Player health decreases (optional)

### Growth Types

| Growth Type | Formula | Feel |
|------|---------|------|
| Linear | difficulty = base + level * 2 | Steady, predictable |
| Exponential | difficulty = base * POWER(2, level) | Fast spiral, intense |
| Step | difficulty jumps at thresholds | Sudden spikes, "levels" |

## Key Takeaway

> Use the state variable together with variables controlling enemy speed, spawn rate, and count to create a difficulty that grows as the player improves.

## C64 BASIC Examples

### Example 1: Linear Difficulty Scaling

| Code | Description |
|------|------|
| `LEVEL = 1:ENEMY_SPEED = 2:ENEMY_COUNT = 1` | Initial game state |
| `10 IF SCORE >= LEVEL * 50 THEN GOSUB 100` | Check if next level reached |
| `20 GOTO 10` | Main loop |
| `100 LEVEL = LEVEL + 1` | Advance level |
| `110 ENEMY_SPEED = ENEMY_SPEED + 1` | Linear increase |
| `115 ENEMY_COUNT = ENEMY_COUNT + 1` | Add one more enemy |
| `120 PRINT "LEVEL ";LEVEL:PRINT CHR$(29)` | Display level up |
| `130 RETURN` | Return |

### Example 2: Exponential Difficulty

| Code | Description |
|------|------|
| `LEVEL = 0:ENEMY_SPEED = 2` | Start easy |
| `10 ENEMY_SPEED = 2 + 2 ^ LEVEL` | Exponential speed formula |
| `20 ENEMY_COUNT = 1 + LEVEL * 1` | Count grows linearly as balance |
| `30 IF SCORE >= (LEVEL + 1) * 100 THEN GOSUB 100` | Level threshold at 100 pts |
| `100 LEVEL = LEVEL + 1` | Level up |
| `110 PRINT "LEVEL ";LEVEL;": ENEMY SPEED:";ENEMY_SPEED` | Show current difficulty |

### Example 3: Step-Based Difficulty Spikes

| Code | Description |
|------|------|
| `SCORE = 0` | Player score |
| `10 IF SCORE > 100 AND SCORE < 110 THEN GOSUB 500` | First spike at score 100 |
| `20 IF SCORE > 500 AND SCORE < 510 THEN GOSUB 500` | Second spike at 500 |
| `500 BONUS = 1:IF BONUS = 0 THEN RETURN` | Enable spike |
| `510 POKE $D020,15:FOR X=1 TO 30:NEXT` | Flash red border during spike |
| `520 PRINT "WARNING: ENEMIES SPEEDING UP!"` | Warn the player |
| `530 RETURN` | Return |

## Exercise

1. **Step 1:** Create a linear scaling system
   - Start with ENEMY_SPEED = 2 and ENEMY_COUNT = 1
   - When SCORE reaches 100, increment LEVEL and increase both speed and count by 1
   - Expected output: Game gets steadily harder at each milestone

2. **Step 2:** Create an exponential scaling system
   - Use ENEMY_SPEED = 2 + 2^LEVEL
   - Expected output: Difficulty jumps rapidly — enemies become very fast by level 4+

3. **Step 3:** Combine linear + step scaling
   - Linear scaling on base speed
   - Bonus spikes from enemy count that jump at score thresholds
   - Expected output: Smooth growth with sudden enemy surges

## Practice Challenge

> **Challenge:** Implement a game with three difficulty phases: easy (0-100 points), medium (101-500), and hard (501+). Each phase has different ENEMY_SPEED, ENEMY_COUNT, and BORDER_COLOR. Add a screen flash at phase transitions.
> **Hint:** Use "IF SCORE >= 500 THEN PHASE = 3:GOSUB 600" where sub 600 sets color and speed, then "ELSE IF SCORE >= 100 THEN PHASE = 2..."

## Quiz

1. **Which formula gives the fastest difficulty curve?**
   a) enemy_speed = level + 2
   b) enemy_speed = 2 + level
   c) enemy_speed = 2 ^ level
   d) enemy_speed = level * 0
   **Answer:** c
   **Explanation:** Exponential growth (2^level) grows much faster than linear.

2. **Why use step-based scaling?**
   a) It is easier to code
   b) It gives sudden spikes that surprise the player
   c) It uses less memory
   d) It is the only method that works
   **Answer:** b
   **Explanation:** Step-based scaling creates sudden, unexpected increases in difficulty.

3. **What should change when difficulty increases?**
   a) Nothing, just the message
   b) Only the border color
   c) One or more gameplay variables (speed, count, timers)
   d) Only the music
   **Answer:** c
   **Explanation:** The actual gameplay must change to match the difficulty curve.

## Summary

- Linear scaling grows steadily, exponential grows fast, step-based grows in jumps
- Use IF/Scores thresholds to trigger level ups
- Always show the player what changed — print the new speed/count

## What's Next?

Difficulty is set. Now let's layer on the polish — shakes, flashes, particles, and effects that make the game feel alive!
