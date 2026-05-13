# 06-1: State Machines — The Heart of Every C64 Game

## Metadata
- **Level:** 6
- **Lesson Number:** 1
- **Estimated Time:** ~25 min
- **Prerequisites:** Lessons 3-1 through 5-5
- **Concepts:** Game states, program flow control, state variables, branching logic

## Theory

You have learned how to move sprites, make sounds, read input, and display text. Now let's build the *brain* of your game: the state machine.

A state machine is a programming pattern where your game is always in exactly one "state" (also called a "mode" or "stage"), and each state does its own thing. Think of it like this:

- **State: TITLE** — Show the title screen and wait for the player to press SPACE
- **State: PLAY** — Handle game logic: move sprites, check collisions, update score
- **State: GAME OVER** — Show the final score and wait for the player to restart

Each state has its own set of rules. The game only checks the rules for the *current* state. This is how every classic C64 game worked: Pitfall!, Saboteur, and Jet Set Willy all used state machines.

### Why State Machines Matter

Without states, your game is just one big mess of IF/THEN statements checking dozens of conditions. With states, each piece of code does exactly one thing well:

```
  If state = TITLE → show title screen
  If state = PLAY → update game
  If state = GAME OVER → show final score
  If state = SELECT → show level menu
```

## Key Takeaway

> State machines let you organize a game by separating what happens on each screen, making code readable and game logic predictable.

## C64 BASIC Examples

### Example 1: A Simple Title Screen State

| Code | Description |
|------|------|
| `STATE = 0` | Initialize the state variable (0 = title) |
| `10 IF STATE = 0 THEN GOTO 90` | If in title state, jump to title handler |
| `20 PRINT CHR$(147)` | Clear screen (PETSCII 147 = clear) |
| `30 PRINT "THE ADVENTURE"` | Title text centered on screen |
| `40 PRINT "OF BASIC HEROES"` | Second line of title |
| `50 PRINT CHR$(142); CHR$(143); CHR$(144)` | Print arrows using PETSCII codes 142-144 |
| `60 IF PEEK(197) <> 21 THEN GOTO 60` | Wait for SPACE key (ASCII 32 on C64 keyboard matrix) |
| `70 STATE = 1` | Change state to PLAY |
| `80 GOTO 10` | Restart the game loop |
| `90 PRINT : PRINT "PRESS SPACE"` | Display prompt |

### Example 2: Full State Machine with Three States

| Code | Description |
|------|------|
| `STATE = 0:SCORE = 0` | Initialize all game variables |
| `10 IF STATE = 0 THEN GOTO 100` | Title state handler |
| `20 IF STATE = 1 THEN GOTO 200` | Playing state handler |
| `30 IF STATE = 2 THEN GOTO 300` | Game over state handler |
| `40 GOTO 10` | Main loop — keep checking state |
| `100 POKE 53280,5:PRINT "GAME TITLE"` | Title: set border color and print title |
| `110 IF PEEK(197) = 32 THEN STATE = 1:GOTO 10` | If SPACE pressed, change to PLAY state |
| `200 PRINT "SCORE:"; SCORE` | Playing: display current score |
| `210 IF SCORE >= 100 THEN STATE = 2:GOTO 10` | If score reaches 100, change to GAME OVER |
| `300 PRINT "GAME OVER! SCORE:"; SCORE` | Game over: show final score |
| `310 PRINT "PRESS SPACE TO RESTART"` | Prompt to reset |
| `320 IF PEEK(197) = 32 THEN STATE = 0:GOTO 10` | If SPACE pressed, return to TITLE |

### Example 3: State Transition with Sound

| Code | Description |
|------|------|
| `POKE $D418,1:POKE $D414,1` | Set waveform to triangle, volume to max |
| `POKE $D400,0:POKE $D401,0` | Zero frequency means sound is off |
| `10 IF STATE <> PREV_STATE THEN GOSUB 500` | If state changed, play transition sound |
| `20 PREV_STATE = STATE` | Update previous state variable |
| `500 POKE $D400,100:POKE $D401,1` | Play a tone (frequency = 271) |
| `510 FOR X = 1 TO 10: NEXT` | Short delay to let sound play |
| `520 POKE $D400,0:POKE $D401,0` | Stop sound |
| `530 RETURN` | Return to caller |

## Exercise

1. **Step 1:** Create a title screen state
   - Set STATE to 0
   - Print "MY GAME" centered on screen
   - Print "PRESS SPACE TO START"
   - Use PEEK(197) to detect the space key
   - Expected output: Your title appears and waits for input

2. **Step 2:** Add a playing state
   - When SPACE is pressed, set STATE to 1
   - Print "GO!" and a score display
   - Expected output: Game starts showing score counter

3. **Step 3:** Add a game over state
   - When score reaches 10, set STATE to 2
   - Print "GAME OVER" and final score
   - Wait for SPACE then return to state 0
   - Expected output: Full title → play → game over → restart cycle

## Practice Challenge

> **Challenge:** Build a 4-state program: TITLE → LEVEL SELECT → PLAY → GAME OVER → TITLE (cycling). Each state should display different text and accept SPACE to advance to the next state.
> **Hint:** Use the state variable as an index. Increment it each time SPACE is pressed, and use IF checks to jump to the right state handler.
>
> **Bonus:** Add a sound tone each time the state changes.

## Quiz

1. **What is the main benefit of using state machines in games?**
   a) They make the game run faster
   b) They organize code by separating behavior by game state
   c) They allow more sprites on screen
   d) They reduce memory usage
   **Answer:** b
   **Explanation:** State machines separate logic for each game state (title, play, game over), making code cleaner and more manageable.

2. **In the example, what value represents the PLAY state?**
   a) 0
   b) 1
   c) 2
   d) -1
   **Answer:** b
   **Explanation:** STATE = 0 is TITLE, STATE = 1 is PLAY, STATE = 2 is GAME OVER.

3. **How do you detect the SPACE key on the C64?**
   a) INPUT A
   b) PEEK(197) = 32
   c) GET A
   d) POKE(197,32)
   **Answer:** b
   **Explanation:** The C64 keyboard is scanned via memory addresses starting at $0380 (decimal 896), but PEEK(197) reads keyboard matrix row 8, where SPACE is detected as value 32 for the space bar on the matrix.

## Summary

- State machines use a variable to track the current game state (title, play, game over)
- Each state has its own handler and rules
- The game loops continuously, checking the current state
- State changes happen based on player input (pressing SPACE) or conditions (score reached)

## What's Next?

Now that your game has a brain, let's give it a scoreboard — adding scoring systems that display and save your progress!
