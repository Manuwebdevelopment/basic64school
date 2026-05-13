# Lesson 4.1 — What Is the SID Chip?

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 4 |
| **Lesson Number** | 1 |
| **Estimated Time** | ~20 min |
| **Prerequisites** | Level 1 (FOR/NEXT), Level 2 (POKE, Memory Map) |
| **Concepts** | SID chip, sound registers, frequency, volume, waveform, pulse width |

## Theory

Welcome, music makers! 🎵 The Commodore 64 is famous for its **sound** — its chiptunes were legendary! The secret is the **SID chip** (Sound Interface Device). It is a dedicated sound chip that can play 3 different notes at once. Think of it as a tiny music machine built right into your computer!

The SID chip has **30 memory addresses** starting at **$D400** (that is 54272 in decimal). Each address (called a *register*) controls a different part of the sound. You change the sound by using **POKE** to send values into those addresses.

The $D400 chip has three identical "voice channels" — each one is a little sound generator. Address $D400 controls Voice 1, $D440 controls Voice 2, and $D480 controls Voice 3. Let us start with Voice 1.

### Key Takeaway

> **The SID chip is the C64 sound chip. POKEing its registers from $D400 to $D41C lets you create tones, change volume, and pick waveforms!**

### SID Register Map (Voice 1)

| Address | Decimal | What It Controls |
|---------|---------|-------------------|
| $D400 | 54272 | Frequency low byte |
| $D401 | 54273 | Frequency high byte |
| $D402 | 54274 | Attack/Decay |
| $D403 | 54275 | Sustain/Release |
| $D404 | 54276 | Pulse width low byte |
| $D405 | 54277 | Pulse width high byte |
| $D406 | 54278 | Test register |
| $D407 | 54279 | Envelope generator |
| $D408 | 54280 | Gate register |
| $D409 | 54281 | Resonance |
| $D40A | 54282 | Ring modulator |
| $D40B | 54283 | Filter mode |
| $D40C | 54284 | Filter Cutoff |
| $D40D | 54285 | Filter Control |
| $D40E | 54286 | Voice 3 Mix |
| $D40F | 54287 | Filter Envelope |
| $D414 | 54292 | Volume ($D412) |

For Voice 1, the key registers you will use every day are:

- **$D400–$D401**: Frequency (how high or low the note is). Together they form a 16-bit number.
- **$D412**: Master volume (0 = silent, 15 = loudest).
- **$D418**: Voice 1 waveform (0-8 different wave shapes).
- **$D404–$D405**: Pulse width (only works with pulse waveforms).
- **$D40A**: Ring modulation (0 = off, any value = on).

## C64 BASIC Examples

### Example 1: Make the C64 beep!

```
10 POKE 54296,0
20 POKE 54272,0:POKE 54273,0
30 POKE 54274,0:POKE 54275,0
40 POKE 54280,1
50 FOR I=1 TO 255:POKE 54280,1:NEXT I
```

| Code | Description |
|------|------|
| `POKE 54296,0` | Set master volume to 0 (silent) first — prevents a loud pop |
| `POKE 54272,0:POKE 54273,0` | Set frequency to $0000 (0 Hz) — lowest possible tone |
| `POKE 54274,0:POKE 54275,0` | Attack=0, Decay=0 (no fade in/out) |
| `POKE 54280,1` | Gate bit ON — this starts the sound! |
| `FOR I=1 TO 255:NEXT I` | Hold the note for a moment (a delay loop) |

### Example 2: Change the volume

```
10 POKE 54296,0
20 POKE 54272,0:POKE 54273,0
30 POKE 54274,0:POKE 54275,0
40 FOR V=0 TO 15:POKE 54296,V:POKE 54280,1:FOR D=1 TO 200:NEXT D:NEXT V
```

| Code | Description |
|------|------|
| `POKE 54272,0:POKE 54273,0` | Set a steady low frequency |
| `POKE 54296,V` | Cycle volume from 0 (silent) to 15 (max volume) |
| `POKE 54280,1` | Turn the gate on each time |

### Example 3: Try different waveforms

```
10 POKE 54296,5
20 POKE 54272,60:POKE 54273,1
30 POKE 54274,0:POKE 54275,0
40 POKE 54280,1
50 FOR W=0 TO 8
60   POKE 54248,W
70   FOR D=1 TO 500:NEXT D
80 NEXT W
```

| Code | Description |
|------|------|
| `POKE 54272,60:POKE 54273,1` | Set frequency to $013C (316 Hz) — a midtone |
| `POKE 54248,W` | Change waveform $D418 (0-8 — triangle, sawtooth, pulse, noise — your SID supports different waveforms!) |
| `FOR D=1 TO 500:NEXT D` | Hold each waveform for a beat |

### Example 4: Pulse width with pulse waveform

```
10 POKE 54296,10
20 POKE 54272,60:POKE 54273,1
30 POKE 54274,0:POKE 54275,0
40 POKE 54248,4
50 POKE 54280,1
60 FOR PW=0 TO 255:POKE 54276,PW:FOR D=1 TO 100:NEXT D:NEXT PW
```

| Code | Description |
|------|------|
| `POKE 54248,4` | Select pulse waveform (waveform 4) |
| `POKE 54276,PW` | Change pulse width from 0 to 255 — this changes the "tone color" |

## Exercise

1. **Type Example 1 and press RUN. Listen carefully to the tone.**
   - Expected output: A steady low beep / tone plays from the speaker.

2. **Change $D400 value (line 20) from 60 to 120 and RUN again. How does the pitch change?**
   - Expected output: A higher-pitched tone.

3. **Cycle through all waveforms (Example 3). For each one, write down which one you like best.**
   - Expected output: Each waveform produces a distinct sound — triangle is smooth, sawtooth is buzzy, pulse is hollow, noise is static-like.

## Practice Challenge

> **Challenge:** Write a program that plays a "volume sweep" — start at volume 0, go up to 15, then back to 0. Use a FOR/NEXT loop to count up and another to count down. Then do one more sweep.
> **Hint:** You need two nested loops — one counting 0→15 and another counting 15→0.

## Quiz

1. **What chip produces sound on the C64?**
   a) VIC-II
   b) SID
   c) MOS 6510
   d) CIA
   **Answer:** b
   **Explanation:** The SID (Sound Interface Device) chip generates all sound on the C64. The VIC-II handles graphics and the MOS 6510 is the CPU.

2. **Which address range is the SID?**
   a) $0400–$041C
   b) $D400–$D41C
   c) $D000–$D01C
   d) $E000–$E01C
   **Answer:** b
   **Explanation:** The SID chip occupies memory locations $D400 through $D41C (54272–54524 in decimal).

3. **Which register controls the volume?**
   a) $D400
   b) $D408
   c) $D412
   d) $D418
   **Answer:** c
   **Explanation:** $D412 (54290) is the master volume register. Values 0–15 control loudness.

4. **What does POKE 54280,1 do?**
   a) Sets the gate (ON) — starts the sound
   b) Sets the volume to 1
   c) Changes the waveform
   d) Resets the SID chip
   **Answer:** a
   **Explanation:** $D408 (54280) is the gate register. POKE 54280,1 turns the sound ON.

## Summary

- The **SID chip** ($D400–$D41C) creates all sound on the C64.
- **$D400–$D401** control the frequency (pitch) of a note.
- **$D412** controls the master volume (0–15).
- **$D418** selects the waveform (triangle, sawtooth, pulse, noise, etc.).
- **$D408** is the gate — POKE 54280,1 turns sound ON.
- **$D404–$D405** control pulse width for pulse waveforms.
- The SID can play 3 voices simultaneously!

## What's Next?

Now you know how to make a single beep. But a beep is not a song! In the next lesson, you will learn how to play **real melodies** by chaining different frequencies together. You will turn the C64 into a tiny piano!

See you in Lesson 4.2 — Playing Melodies! 🎹
