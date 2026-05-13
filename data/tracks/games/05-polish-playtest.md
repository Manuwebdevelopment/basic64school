# 05 — Polish & Playtest

## Metadata
- **Track:** Games
- **Lesson Number:** 5
- **Estimated Time:** ~35 min
- **Prerequisites:** Lessons games/01 through games/04
- **Concepts:** SFX for game events, transitions, difficulty tuning, playtesting, bug detection, user experience design

## Theory

Your game works. Now make it feel professional. Polish is the difference between "works" and "fun to play consistently."

### SFX for Game Events

| Event | Sound Design |
|------|------|
| Item collected | Quick high-frequency sweep up ($D400 200-400) |
| Enemy hit | Low frequency sweep down ($D400 200-50) |
| Level complete | Three ascending tones (261, 329, 392 — C4, E4, G4) |
| Game over | Single low sustained tone ($D400=50, $D413=255 for decay) |
| Menu navigation | Click sound (very short, mid-frequency) |

### Transition Effects

| Transition | Technique |
|------ |------ |
| Level change | Screen wipe (POKE column-by-column with color fill) |
| Title to game | Fade out (gradually change POKE $D016 brightness) |
| Game over | Screen flicker (rapidly toggle border color), then freeze |

### Playtesting Strategy

Before publishing, test your game in this order:
1. **Functional testing** — Does every button work? Do menus open correctly?
2. **Edge case testing** — What if the player wins on frame 1? What if they die on frame 1?
3. **Difficulty tuning** — Playtest 3 times, each time adjusting one difficulty parameter
4. **UI clarity** -- Can a new player understand the game without instructions?

## Key Takeaway

> Polish = sound design + transitions + difficulty tuning + playtesting. Test your game on fresh eyes — they'll find bugs you never saw.

## C64 BASIC Examples

### Sound Effects

| Code | Description |
|------|------|
| `500 POKE $D416,80:POKE $D400,261:POKE $D412,15` | Start tone at C4 |
| `510 FOR I=1 TO 30:NEXT` | Hold duration |
| `515 POKE $D400,392:NEXT` | Change to G4 (ascending) |
| `520 POKE $D400,0:POKE $D412,0` | Stop |
| `530 RETURN` | Return |

### Screen Wipe Transition

| Code | Description |
|------|------|
| `300 FOR A=1024 TO 2022:POKE A,147:NEXT` | Clear screen left to right |
| `310 FOR I=0 TO 39: FOR J=0 TO 24:POKE 1024+J*40+I,147:NEXT` | Wipe effect |
| `320 RETURN` | Return |

## Exercise

1. **Step 1:** Add SFX to your game
   - Item collected sound (ascending sweep)
   - Game over sound (low tone)
   - Expected output: Your game has audio feedback

2. **Step 2:** Add transition effects
   - Screen wipe between levels
   - Border flash on item collection
   - Expected output: Visual and audio transitions feel satisfying

3. **Step 3:** Tune the difficulty
   - Playtest your game. If it's too easy — increase enemy count. If too hard — decrease speed.
   - Expected output: An enjoyable, challenging game

## Practice Challenge

> **Challenge:** Add to your game: 5 distinct SFX (collect, damage, level complete, game over, menu), a screen wipe transition between levels, and difficulty tuning based on a 3-playtest simulation. Document any changes made based on playtesting.
> **Hint:** Use a lookup table of frequencies in DATA for menu clicks (200, 250, 300 Hz) and one SFX subroutine that takes a frequency parameter.

## Quiz

1. **How many distinct SFX should a complete C64 game have?**
   a) 1 (the same one for everything)
   b) 3
   c) 5 or more for different events
   d) None — C64 sound is optional
   **Answer:** c
   **Explanation:** Each game event should have its own distinct sound for clear feedback.

2. **What is the most important step in difficulty tuning?**
   a) Making the game as hard as possible
   b) Playtesting 3 times and adjusting one parameter each time
   c) Removing all enemies
   d) Adding more characters
   **Answer:** b
   **Explanation:** Iterative playtesting is the proven approach for finding the right difficulty curve.

3. **Why use screen wipe transitions?**
   a) To make the game run faster
   b) To give the player a visual break between game states
   c) To reduce memory usage
   d) Because it's required by the C64
   **Answer:** b
   **Explanation:** Transitions give a visual pause between states, improving the game's polish and feel.

## Summary

- Sound effects for every game event (collect, damage, level complete, game over, menu)
- Screen transitions (wipe, flash) between states
- Difficulty tuning via iterative playtesting
- Test on fresh eyes — they catch bugs you miss

## What's Next?

You've completed the entire Games Track. You now know how to design, build, pack, and polish a complete C64 game from start to finish!
