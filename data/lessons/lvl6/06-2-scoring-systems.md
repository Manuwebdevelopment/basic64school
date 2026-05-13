# 06-2: Scoring Systems — Tracking Your Progress

## Metadata
- **Level:** 6
- **Lesson Number:** 2
- **Estimated Time:** ~25 min
- **Prerequisites:** Lessons 6-1 through 5-5
- **Concepts:** Variables for scoring, score display, screen refresh, high score saving, dynamic screen color

## Theory

Now your game has states. Every great game also has a way to track how well you're doing. On the C64, scoring means managing variables (INTEGER values for numbers) and displaying them on screen using PRINT statements or POKE commands to write characters directly.

The C64 screen holds 1000 characters (40 × 25). When you change a variable, you have to redraw the score area each frame. This is because the screen is just character memory and doesn't update automatically.

### Screen Color and State Feedback

You can change the game's mood by modifying colors:
- Border color at $D800 (53280 dec — POKE $D800, color)
- Background color at $D801 (53281 dec — POKE $D801, color)
- These create visual state transitions without needing to jump to new text

### Saving a Score

To save a high score, use C64 BASIC's file system:
- OPEN creates/displays a file
- PRINT # writes to it
- CLOSE frees the resource

## Key Takeaway

> Score tracking uses variables for values, PRINT for display, and OPEN/PRINT#/CLOSE for saving progress between sessions.

## C64 BASIC Examples

### Example 1: Displaying a Dynamic Score

| Code | Description |
|------|------|
| `SCORE = 0:LIVES = 3:STATE = 1:POKE 1024,32` | Initialize all variables |
| `10 PRINT CHR$(147)` | Clear screen each frame |
| `15 POKE 53280,8:POKE 53281,0` | Set border=yellow, bg=dark blue |
| `20 PRINT AT 1,1:PRINT "SCORE:";SCORE` | Print score at top-left row 1, col 1 |
| `25 PRINT "LIVES:";LIVES` | Print lives on next line |
| `30 IF SCORE >= 50 THEN PRINT "GREAT!":GOSUB 100` | If score ≥ 50, add special message |
| `40 GOTO 10` | Main game loop |
| `100 PRINT CHR$(142);CHR$(143);CHR$(144)` | Display arrow characters for emphasis |
| `110 RETURN` | Return from sub |

### Example 2: Score Change with Visual Feedback

| Code | Description |
|------|------|
| `10 PRINT CHR$(147):PRINT "SCORE:";SCORE` | Show score |
| `15 POKE 53280,14:L=PEEK(53272):IF L > 0 THEN GOSUB 20` | On sprite collision, flash border |
| `20 POKE 53280,1:L = L - 1:IF L > 0 THEN GOTO 20` | Flash border for L frames |
| `25 RETURN` | Return |
| `30 PRINT "SCORE:";SCORE + 10` | Print updated score |
| `35 SCORE = SCORE + 10` | Actually update variable |

### Example 3: Saving High Score to Disk

| Code | Description |
|------|------|
| `SCORE = 12` | Your score from the game |
| `10 OPEN 1,8,2,"HISCORE,S,W"` | Open file for writing (device 8 = 1541 disk) |
| `20 PRINT #1,"HIGH SCORE:";SCORE` | Write score to the file |
| `30 CLOSE 1` | Close the file |
| `40 PRINT "SAVE COMPLETE."` | Confirm save |

## Exercise

1. **Step 1:** Create a score variable and display it each frame
   - Set SCORE = 10
   - Print "SCORE:" followed by SCORE every loop iteration
   - Expected output: "SCORE: 10" appears and stays

2. **Step 2:** Add a scoring mechanism
   - Every 60 frames, add 10 to SCORE and flash the border red
   - Use a frame counter variable that increments each loop
   - Expected output: Score updates and border flashes periodically

3. **Step 3:** Add a lives counter
   - Start with LIVES = 5, subtract 1 when score decreases
   - When LIVES = 0, set STATE = 2 (game over) and print "OUT OF LIVES"
   - Expected output: Full score/lives system with loss detection

## Practice Challenge

> **Challenge:** Enhance the game with a scoring system that shows points earned from collecting items. Display the score in the title border using both POKE (border color changes for state) and regular PRINT commands. Add a high score variable that saves when SCORE exceeds a previous maximum.
> **Hint:** Initialize HISCORE = 0 before the game loop. After SCORE updates, check "IF SCORE > HISCORE THEN GOSUB 500". Use the sub to print "NEW HIGH SCORE!" and save it.
>
> **Bonus:** Add a countdown timer that subtracts points if time runs out.

## Quiz

1. **On the C64, how often must the score be redrawn?**
   a) Once at game start
   b) Every loop iteration (every frame)
   c) Only when score changes
   d) At the end of the game only
   **Answer:** b
   **Explanation:** Since the screen is character memory, you must redraw it every frame by clearing (PRINT CHR$(147)) then printing all content again.

2. **Which memory address holds the border color?**
   a) 53281
   b) 53280
   c) 53248
   d) 56320
   **Answer:** b
   **Explanation:** Address 53280 ($D000) is the border color register. 53281 ($D001) is the background color.

3. **To save data to disk, which BASIC commands are used?**
   a) OPEN, PRINT#, CLOSE
   b) LOAD, SAVE, CLOSE
   c) OPEN, WRITE, FINISH
   d) READ, WRITE, CLOSE
   **Answer:** a
   **Explanation:** C64 BASIC uses OPEN (to create a file handle), PRINT # (to write to the file), and CLOSE (to free it) for disk operations.

## Summary

- Use variables to store and update score values
- The screen must be redrawn every frame (PRINT CHR$(147), then PRINT the score)
- Border/background colors (POKE at $D020/$D021) create visual feedback
- Score can be saved using OPEN, PRINT #, and CLOSE for disk storage

## What's Next?

Score tracking means nothing without a way to increase difficulty — let's make your game get progressively harder!
