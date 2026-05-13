# 02 — Sprite Editor

## Metadata
- **Track:** Systems & Tools
- **Lesson Number:** 2
- **Estimated Time:** ~35 min
- **Prerequisites:** Lessons systems/01 (Text Editor), Level 3 (Sprites & POKE)
- **Concepts:** Visual sprite design, keyboard input for pixel toggling, sprite preview, data export

## Theory

A sprite editor lets you draw sprite shapes pixel-by-pixel using the C64 screen. Each row of the editor represents one row of the sprite (8 rows for a C64 sprite). You toggle pixels on/off and preview the result.

### Editor Layout

| Area | Displayed |
|------|------|
| Left panel (cols 0-9) | Sprite preview (8 rows × 8 pixels) |
| Right panel (cols 10-24) | Row grid (8 rows you can paint) |
| Bottom (row 25) | Instructions and save/load prompts |

### Pixel Toggle Logic

When you press a key at row Y, column X in the right panel:
- If the pixel is on → toggle it off (write a space, $20$)
- If the pixel is off → toggle it on (write a block, $B0$)

## Key Takeaway

> Use the right panel as a drawing canvas: each cell is a pixel. Pressing a number toggles the pixel on/off, and the left panel shows the live preview.

## C64 BASIC Examples

### Editor Rendering

| Code | Description |
|------|------|
| `FOR ROW=0 TO 7` | Draw 8 sprite rows in the editor |
| ` POKE $400+ROW*40+10,32` | Clear editor column 10 |
| ` POKE $400+ROW*40+11+COL,PICKED_CHAR` | Write the pixel character |
| ` NEXT` | End row loop |

### Pixel Toggling

| Code | Description |
|------|------|
| `KEY = GET: IF KEY = "1" GOTO TOGGLE_OFF` | Key "1" toggles pixel off |
| `KEY = GET: IF KEY = "9" GOTO TOGGLE_ON` | Key "9" toggles pixel on |
| `1000 SPR_ROW = ROW: SPR_COL = (KEY - 49) + 1` | Map key to sprite column |
| `1010 IF SPR_DATA(SPR_ROW, SPR_COL) = 0 THEN SPR_DATA(SPR_ROW, SPR_COL) = 1` | Set pixel |
| `1020 IF SPR_DATA(SPR_ROW, SPR_COL) = 1 THEN SPR_DATA(SPR_ROW, SPR_COL) = 0` | Clear pixel |

## Exercise

1. **Step 1:** Create the editor canvas
   - Draw an 8-row grid on the right side of the screen
   - Each cell is a toggled character (use $B0 = on, $20 = off)
   - Expected output: Your editor canvas appears as a grid of 8 rows

2. **Step 2:** Add the sprite preview
   - Draw the sprite on the left side as a 8-row preview
   - When you toggle a cell in the grid, the preview updates
   - Expected output: Your changes appear in real-time in the preview panel

3. **Step 3:** Add the output feature
   - When the sprite is complete, display the sprite data in READ/DATA format
   - Expected output: Your drawn sprite is displayed as hex DATA for loading into a game

## Practice Challenge

> **Challenge:** Build a sprite editor that lets you: toggle pixels in an 8-column grid, preview the sprite in real-time, export the sprite as READ/DATA hex values, and save the sprite to a named file.
> **Hint:** Use a 2D array (via DIM) to store sprite data. Press "1" to clear and "9" to fill. Add a "SAVE SPRITE" button that outputs the DATA line.
>
> **Bonus:** Add a color preview (use border/bg colors for 3-sprite multicolor mode).

## Quiz

1. **How many characters wide and tall is a C64 sprite?**
   a) 8 × 8
   b) 21 × 8
   c) 8 × 64
   d) 21 × 64
   **Answer:** b
   **Explanation:** Each C64 sprite is 21 pixels wide and 8 pixels tall.

2. **The best way to edit a sprite is:**
   a) Manually POKE every byte
   b) A visual editor with keyboard controls toggling pixels
   c) A mouse-based editor
   d) Writing DATA blocks directly
   **Answer:** b
   **Explanation:** A visual editor with keyboard toggling is faster and more intuitive than manual DATA editing.

3. **What should the editor output?**
   a) A text file
   b) READ/DATA hex values for each sprite row
   c) A compiled program
   d) Nothing
   **Answer:** b
   **Explanation:** Sprite data from the editor should be in READ/DATA format so games can load it directly.

## Summary

- The editor uses a grid where each cell represents a sprite pixel
- The preview panel shows the live result of your edits
- Output should be hex DATA that can be loaded into a program

## What's Next?

Now that you can design sprites, let's build a file manager system for saving and loading your programs and data on the C64.
