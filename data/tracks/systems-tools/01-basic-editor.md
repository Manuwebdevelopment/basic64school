# 01 — Basic Text Editor

## Metadata
- **Track:** Systems & Tools
- **Lesson Number:** 1
- **Estimated Time:** ~35 min
- **Prerequisites:** Level 1 (Arrays, DIM), Level 5 (Data structures)
- **Concepts:** Text editing in BASIC, GET input, character arrays, cursor management, screen rendering

## Theory

Building a text editor on the C64 is one of the most practical C64 BASIC projects you can do. It teaches arrays, keyboard input, cursor positioning, and screen rendering — and it's something you can actually use.

### The Editor Model

A C64 text editor needs:
1. A text buffer (an array of strings, one per line)
2. A cursor (X and Y position)
3. Screen rendering (draw the buffer to the screen each frame)
4. Keyboard handling (GET for typing, special keys for cursor, delete, etc.)

### Text Storage

Use a fixed-size array (40 lines of 80 characters each):

```
DIM TEXT$(40,80)
```

But since C64 BASIC doesn't support 2D arrays well, use 1D arrays:

```
DIM TEXT$(40)  ' 40 lines, up to 255 chars each
```

## Key Takeaway

> Store text in a DIM array, draw each line to the screen with a character-by-character POKE loop, and handle input with GET.

## C64 BASIC Examples

### Editor Screen Rendering

| Code | Description |
|------|------|
| `100 FOR Y=0 TO 24` | Render all 25 screen rows |
| `105 POKE 1024+Y*40,32` | Clear row (spaces) |
| `110 FOR X=0 TO 39:IF X>=LEN(TEXT$(Y+1)) THEN EXIT` | Stop at end of text |
| `115 POKE 1024+Y*40+X,ASC(MID$(TEXT$(Y+1),X+1,1))` | Write character to screen |
| `120 NEXT:NEXT` | End rendering loop |

### Editor Input Handling

| Code | Description |
|------|------|
| `20 GET K` | Get a keypress (ASCII value) |
| `30 IF K=32 THEN GOSUB 200` | Space → add character here |
| `35 IF K=8 THEN GOSUB 250` | Backspace → delete character |
| `40 IF K=13 THEN GOSUB 300` | ENTER → start new line |
| `50 IF K=162 THEN GOSUB 350` | LEFT arrow → move cursor left |

## Exercise

1. **Step 1:** Create a single-buffer text editor
   - DIM a $20$-line text buffer
   - Render the buffer to the screen
   - Expected output: Your text buffer appears on screen

2. **Step 2:** Add typing functionality
   - Use GET to capture keystrokes and append to the current line
   - Expected output: You can type text and see it appear on screen

3. **Step 3:** Add cursor movement
   - LEFT, RIGHT, UP, DOWN arrow keys move the cursor
   - Expected output: A visible text cursor that moves correctly

## Practice Challenge

> **Challenge:** Build a complete text editor: typing, cursor movement, backspace, delete line, save to file, and load from file. All within C64 BASIC.
> **Hint:** Use a menu system (Press 1 = Type, 2 = Save, 3 = Load) and store the cursor as two variables (CURX, CURY).

## Quiz

1. **How do you store text in a C64 editor?**
   a) In a single string
   b) In a DIM array (one line per element)
   c) In a POKE buffer only
   d) On the disk only
   **Answer:** b
   **Explanation:** Each array element represents one line of text, up to 255 characters.

2. **Which command captures keystrokes?**
   a) INPUT
   b) GET
   c) POKE
   d) READ
   **Answer:** b
   **Explanation:** GET reads a single keystroke into a variable (non-blocking).

3. **Why does the editor need to re-render every frame?**
   a) The C64 screen is volatile
   b) Screen memory is character memory that can change
   c) The keyboard clears it automatically
   d) To save memory
   **Answer:** b
   **Explanation:** The C64 screen is just character memory — you must redraw your text buffer on each frame.

## Summary

- Text goes in a DIM array (one line per element)
- Screen rendering uses POKE to draw character by character
- GET captures keystrokes for typing and editing
- A text editor is the most practical C64 BASIC project

## What's Next?

Now that you can edit text, let's build a tool to design sprites — a visual sprite editor running in BASIC!
