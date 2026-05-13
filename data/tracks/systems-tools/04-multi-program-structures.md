# 04 — Multi-Program Menu System

## Metadata
- **Track:** Systems & Tools
- **Lesson Number:** 4
- **Estimated Time:** ~35 min
- **Prerequisites:** Lessons systems/01-03
- **Concepts:** Menu design, nested menus, save states, multi-program architecture, program flow control

## Theory

The C64 has no operating system — just a BASIC interpreter. To build a tool like a game or an editor suite, you need a way to organize multiple programs into one. On the C64, this is done using GOSUB, GOTO, and memory addresses ($DEAD for BASIC program start).

### The Menu System Pattern

```
MAIN MENU:
  1. Text Editor
  2. Sprite Designer
  3. File Manager
  4. Exit

SUB-MENU (when "1" is pressed):
  1. New Document
  2. Open Document
  3. Save Document
  4. Back to Menu
```

### Save States

Use variables to save the current state:
- CURRENT_PROGRAM (1 = editor, 2 = sprite, etc.)
- CURRENT_SUB_MENU (for nested menus)
- CURRENT_FILE (for file-based programs)

## Key Takeaway

> Use GOSUB for sub-menus, GOTO for returning to the main loop, and variables to track the current program and sub-menu state.

## C64 BASIC Examples

### Main Menu

| Code | Description |
|------|------|
| `1000 PRINT "=== BASIC64 TOOLKIT ==="` | Main menu title |
| `1010 PRINT "  1. Text Editor"` | Menu option 1 |
| `1015 PRINT "  2. Sprite Designer"` | Menu option 2 |
| `1020 PRINT "  3. Exit"` | Exit option |
| `1030 GET K$` | Wait for user to press a key |
| `1040 IF K$="1" THEN GOSUB 2000` | Open Text Editor |
| `1050 IF K$="2" THEN GOSUB 3000` | Open Sprite Designer |
| `1055 IF K$="3" THEN END` | Exit |
| `1060 GOTO 1000` | Loop back to main menu |

### Sub-Menu (Sprite Designer)

| Code | Description |
|------|------|
| `3000 PRINT "=== SPRITE DESIGNER ==="` | Sub-menu title |
| `3010 PRINT "  1. New Sprite"` | Sub-menu option 1 |
| `3015 PRINT "  2. Load Sprite"` | Sub-menu option 2 |
| `3020 PRINT "  3. Back"` | Sub-menu option 3 |
| `3030 GET K$` | Wait for selection |
| `3040 IF K$="1" THEN GOSUB 3100` | Open new sprite canvas |
| `3045 IF K$="3" THEN RETURN` | Back to main menu |
| `3050 GOTO 3000` | Loop |

## Exercise

1. **Step 1:** Build the main menu
   - Display options 1 = Editor, 2 = Sprite Designer, 3 = Exit
   - Pressing 1 jumps to the editor, 2 to the sprite designer
   - Expected output: A working main menu with navigation

2. **Step 2:** Add the sub-menus
   - For the editor: New, Open, Save
   - For the sprite: New, Load, Back
   - Expected output: Nested menus that work correctly

3. **Step 3:** Add save states
   - Use variables to track which program you're in and which file
   - Expected output: Full multi-tool suite with state persistence

## Practice Challenge

> **Challenge:** Build a full C64 BASIC toolkit: a main menu that opens sub-menus for a text editor and a sprite designer. Each program saves state and returns to the main menu correctly.
> **Hint:** Use GOSUB to enter sub-menus and RETURN to leave them. Track state with CURRENT_TOOL and CURRENT_FILE_NAME variables.

## Quiz

1. **What is GOSUB used for in a menu system?**
   a) Looping back to the start
   b) Jumping to a sub-menu and returning
   c) Printing text
   d) Declaring variables
   **Answer:** b
   **Explanation:** GOSUB jumps to a labeled sub-menu, and RETURN brings you back.

2. **What should the main menu do after the user exits a sub-tool?**
   a) Close the program
   b) Loop back to display the options again
   c) Jump to a different program
   d) Nothing — it stays on the sub-menu screen
   **Answer:** b
   **Explanation:** A menu should always return to the main menu loop after the user exits a sub-window.

3. **What variables are needed to track program state?**
   a) Current program/tool and current file
   b) Score and lives
   c) Border and background colors
   d) Nothing — menus are stateless
   **Answer:** a
   **Explanation:** You need to track which program the user is in and what file they're editing.

## Summary

- Use GOSUB for sub-menus and RETURN to exit
- MAIN MENU loops on GOTO 1000
- Track state with CURRENT_TOOL and CURRENT_FILE variables
- Every tool should return to the main menu cleanly

## What's Next?

Congratulations! You've completed the entire Systems & Tools Track. You now know how to build C64 BASIC tools: text editors, sprite designers, file managers, and multi-program systems.
