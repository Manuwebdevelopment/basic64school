# Lesson 4.2 — Playing Melodies

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 4 |
| **Lesson Number** | 2 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Lesson 4.1 (SID Basics), Level 1 (FOR/NEXT, IF/THEN) |
| **Concepts** | Melodies, note frequencies, FOR/NEXT loops, arrays for notes |

## Theory

Now that you know how to make the SID chip beep, let us learn to play **real melodies**! A melody is just a list of frequencies played one after another, each for a certain amount of time.

On the C64, **frequency** determines the **pitch** of a note. Higher numbers = higher pitch. The SID chip understands frequency as a 16-bit number stored in two addresses: **$D400** (low byte) and **$D401** (high byte).

Here is how it works together:
- You POKE the high byte into $D401 and the low byte into $D400
- You set the gate (POKE 54280,1) to start the sound
- You wait a bit (a delay loop)
- You set the gate off (POKE 54280,0)

### Note Frequency Reference

| Note | Approx. Freq ($DEC) | Low Byte ($D400) | High Byte ($D401) |
|------|--------------------:|-------------------:|--------------------:|
| C4 (Middle C) | 261 | 261 | 0 |
| D4 | 294 | 294 | 0 |
| E4 | 330 | 330 | 0 |
| F4 | 349 | 349 | 0 |
| G4 | 392 | 392 | 0 |
| A4 (concert pitch) | 440 | 440 | 0 |
| B4 | 494 | 494 | 0 |
| C5 (an octave up) | 523 | 523 | 1 |
| Rest (silent) | 0 | 0 | 0 |

### Key Takeaway

> **A melody is just a series of POKEs — set frequency, open the gate, wait, close the gate — repeat!**

## C64 BASIC Examples

### Example 1: Play a single note (Twinkle Twinkle's opening!)

```
10 POKE 54296,10:POKE 54292,10
20 N=261:POKE 54272,N:POKE 54273,0
30 POKE 54280,1
40 FOR D=1 TO 500:NEXT D
50 POKE 54280,0
60 PRINT "Doh!"
```

| Code | Description |
|------|------|
| `N=261` | Middle C (C4) frequency |
| `POKE 54272,N` | POKE low byte (frequency into $D400) |
| `POKE 54273,0` | High byte is 0 (low notes only) |
| `POKE 54280,1` | Gate ON — play the note! |
| `FOR D=1 TO 500:NEXT D` | Wait — hold the note for half a beat |
| `POKE 54280,0` | Gate OFF — stop the note |

### Example 2: Play "Twinkle Twinkle Little Star"

```
 5 POKE 54296,10
10 DIM N(7)
20 DATA 261,294,330,349,392,440,494,523
30 N=0:GOSUB 100
40 N=0:GOSUB 100
50 N=4:GOSUB 100
60 N=4:GOSUB 100
70 N=5:GOSUB 100
80 N=5:GOSUB 100
90 GOTO 40
100 N=N
110 READ FREQ
120 POKE 54272,FREQ:POKE 54273,0
130 POKE 54280,1
140 FOR D=1 TO 400:NEXT D
150 POKE 54280,0
160 RETURN
```

| Code | Description |
|------|------|
| `DIM N(7)` | Create an array with 8 slots for our notes |
| `DATA 261,...` | Store note frequencies in memory |
| `GOSUB 100` | Play the current note (lines 100-160) |
| `100-160` | The play-note subroutine: read freq, play, wait, silence |

### Example 3: Play a melody WITH a loop (smarter!)

```
 5 POKE 54296,10
10 DIM F(8):REM We store 8 frequencies
20 DATA 261,294,330,349,392,440,494,523
30 FOR M=1 TO 8
40   READ F(M):REM Load each frequency into our array
50 NEXT M
60 I=1:GOSUB 100:REM Play first note
70 IF I=8 THEN I=1
80 GOTO 70
100 FREQ=F(I)
110 POKE 54272,FREQ:POKE 54273,0
120 POKE 54280,1
130 FOR D=1 TO 400:NEXT D
140 POKE 54280,0
150 I=I+1
160 RETURN
```

| Code | Description |
|------|------|
| `DIM F(8)` | Array to store 8 note frequencies |
| `FOR M=1 TO 8:READ F(M):NEXT M` | Read all frequencies from DATA into the array |
| `GOSUB 100` | Subroutine: set frequency, play gate, wait, silence |
| `IF I=8 THEN I=1` | Loop back to the beginning after the last note |

## Exercise

1. **Type Example 1 above. Play it on your C64. Listen to the C4 tone.**
   - Expected output: A single musical note plays for about a second, then stops.

2. **Change the frequency on line 20 (261) to 440. Run it. How does it sound different?**
   - Expected output: The note sounds higher — you are now playing A4 (440 Hz), the standard tuning note!

3. **Add more note calls (lines like 40-90) to play a simple 5-note sequence: C4, D4, E4, F4, G4.**
   - Expected output: C4 plays (261), D4 plays (294), E4 plays (330), F4 plays (349), and G4 plays (392) in sequence.

## Practice Challenge

> **Challenge:** Write a program that plays both notes (C4 and A4) and then repeats the whole melody. Use a loop that repeats 3 times! Put the melody notes in a DATA section and read them inside the loop.
> **Hint:** Store your frequencies (261 and 440) in DATA, then use `DIM F(2)` and a nested loop — outer for repeats, inner for reading each note.

## Quiz

1. **Which addresses does the SID use for frequency?**
   a) $D412 and $D414
   b) $D400 and $D401
   c) $D408 and $D409
   d) $D404 and $D405
   **Answer:** b
   **Explanation:** $D400 (low byte) and $D401 (high byte) together form the 16-bit frequency value for Voice 1.

2. **To play the note C4 (261 Hz), what POKE commands do you need?**
   a) POKE 54272,261:POKE 54273,0
   b) POKE 54272,0:POKE 54273,261
   c) POKE 54296,261
   d) POKE 54272,440
   **Answer:** a
   **Explanation:** 261 fits in the low byte ($D400), so POKE 54272,261. The high byte ($D401) must be 0 for small numbers.

3. **What is the role of the gate register ($D408)?**
   a) It controls the volume
   b) It selects the waveform
   c) It turns the sound ON or OFF
   d) It sets the pitch
   **Answer:** c
   **Explanation:** POKE 54280,1 turns the voice ON (gate open). POKE 54280,0 turns it OFF (gate closed).

## Summary

- **Frequency** determines pitch — store it in $D400 (low) and $D401 (high).
- **POKE 54280,1** opens the gate to play; **POKE 54280,0** closes it to stop.
- **Delay loops** (`FOR D=1 TO N:NEXT D`) control how long each note lasts.
- You can store note frequencies in **arrays** and **DATA** for efficient melody writing.
- **GOSUB/RETURN** lets you reuse a "play-note" subroutine for every note in your song.
- The SID supports real musical notes! Middle C = 261 Hz, A4 (concert pitch) = 440 Hz.

## What's Next?

You can now play melodies — beautiful work! 🎶 But melodies in games need to respond to what the player is doing. In the next lesson, you will learn how to **read the keyboard** so the C64 can react to your keypresses!

See you in Lesson 4.3 — Keyboard Input! ⌨️
