# 03 — Disk File I/O System

## Metadata
- **Track:** Systems & Tools
- **Lesson Number:** 3
- **Estimated Time:** ~35 min
- **Prerequisites:** Lessons systems/01 (Text Editor), systems/02 (Sprite Editor)
- **Concepts:** C64 BASIC file I/O, OPEN/GET/PRINT#/CLOSE, saving/loading programs, data persistence

## Theory

C64 BASIC has a built-in file system for disk storage. Understanding it is essential for any C64 programmer — it's how you share programs, save high scores, and load external data.

### The C64 File System

The C64 uses three commands for files:
1. **OPEN** — Open a disk file by unit number
2. **PRINT #** — Write to the current file handle
3. **GET #** — Read from the current file handle
4. **CLOSE** — Close the file and free the handle

### File Format

C64 disk files are sequential (one after the other) and use text format. Each line in a file is terminated by a carriage return (CHR$(13)).

### Practical Uses

| Use Case | How |
|------|------|
| Save a high score | OPEN, PRINT#, CLOSE |
| Load a save game | OPEN, GET#, CLOSE |
| Export a sprite | OPEN, PRINT# (DATA line) |
| Load a level map | OPEN, GET# |
| Backup text editor content | OPEN, PRINT# |

## Key Takeaway

> Every C64 file operation starts with OPEN, uses PRINT # or GET # to read/write, and ends with CLOSE. Always handle errors with ON ERR.

## C64 BASIC Examples

### Save a High Score

| Code | Description |
|------|------|
| `10 OPEN 1,8,2,"HISCORE,S,W"` | Open file 1 for Write on device 8 |
| `20 PRINT #1,"HIGH SCORE:";SCORE` | Write the score |
| `30 PRINT #1,"DATE:";DATE$` | Write the date |
| `40 CLOSE 1` | Close the file |

### Load Text File

| Code | Description |
|------|------|
| `10 OPEN 1,8,2,"EDITOR,S,R"` | Open for Read on device 8 |
| `20 GET #1,A$:IF A$="" THEN GOTO 40` | Read until line ends |
| `30 TEXT$(LN)=TEXT$(LN)+A$:LN=LN+1` | Append to text buffer |
| `40 IF EOF(1) THEN CLOSE 1:GOTO 50` | End of file? Close and exit. |
| `50 PRINT "TEXT LOADED":FOR I=1 TO LN:PRINT TEXT$(I):NEXT` | Display all lines |

### Load Sprite Data

| Code | Description |
|------|------|
| `10 OPEN 1,8,2,"MYSPRITE,S,R"`  | Open saved sprite |
| `20 FOR ROW=0 TO 7` | 8 rows of sprite data |
| `30 GET #1,H$:IF LEN(H$) < 2 THEN ROW=ROW-1:NEXT` | Read until end of line |
| `40 POKE $4000+ROW,VAL("&H"+MID$(H$,2,2))` | Convert hex string to value |
| `50 NEXT:NEXT` | End loop |

## Exercise

1. **Step 1:** Build a save file function
   - CREATE a file using OPEN for write
   - Write text content using PRINT #
   - Close the file
   - Expected output: Your text appears in a saved file on disk

2. **Step 2:** Build a load file function
   - OPEN the saved file for read
   - USE GET # to read content line by line
   - Expected output: Your saved text reappears in the editor

3. **Step 3:** Build a sprite save/load system
   - Save each sprite row as a hex DATA line
   - Load it back and verify the sprite looks the same
   - Expected output: Full round-trip save/load of a sprite image

## Practice Challenge

> **Challenge:** Build a small file management system: SAVE (write text/sprite to disk), LOAD (read from disk), and DELETE (using BASIC's SYS to call the CBM file management system). Include error handling with ON ERROR GOTO.
> **Hint:** Use OPEN with unit 15 (device 15 is the C64's command channel). Use SYS(65203) to format and SYS(65208) to remove files.

## Quiz

1. **What does OPEN 1,8,2,"HISCORE,S,W" mean?**
   a) Open handle 1 on device 8, secondary address 2, file name "HISCORE", mode S, type W (write)
   b) Open handle 2 on device 1, secondary address 8
   c) Open a file called 'W' on device 8
   d) Write a sprite to the screen
   **Answer:** a
   **Explanation:** Handle=1, device=8 (disk), secondary address=2, filename="HISCORE", mode=S (sequential), type=W (write).

2. **How do you write to a file in C64 BASIC?**
   a) OPEN
   b) PRINT #
   c) GET #
   d) READ
   **Answer:** b
   **Explanation:** PRINT # writes to a file handle. GET # reads from it.

3. **Why should you always CLOSE files?**
   a) To display an error if something went wrong
   b) To free the handle and save the data properly to disk
   c) Because OPEN consumes too much memory
   d) To reset the keyboard
   **Answer:** b
   **Explanation:** CLOSE flushes the buffer to disk and frees the handle for another use.

## Summary

- OPEN creates/displays a file handle for reading or writing
- PRINT # writes to files, GET # reads from them
- CLOSE flushes buffers and frees the handle
- Use ON ERROR GOTO to handle disk I/O errors gracefully

## What's Next?

With file I/O mastered, let's build a multi-program menu system that ties everything together.
