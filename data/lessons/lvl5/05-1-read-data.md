# Lesson 5.1 — READ & DATA: Storing Tables in Your Program

## Metadata

| Field | Value |
|-------|-------|
| **Level** | 5 |
| **Lesson Number** | 1 |
| **Estimated Time** | ~25 min |
| **Prerequisites** | Level 1 (FOR/NEXT, Variables), Level 4 (POKE, Memory Map) |
| **Concepts** | READ, DATA, lookup tables, program memory, pointer advance |

## Theory

Imagine you want your C64 program to remember a list of things — like the names of 8-bit video game heroes, or scores for a high table, or even the colors of the rainbow. In modern computers, you would save that list in a file. But the C64 has a simpler, clever way: **DATA statements**.

**DATA** lets you hide a table of values right inside your BASIC program. These values sit quietly in the program's memory — they do not take up screen space, and they only appear when your program needs them.

The magic happens with the **READ** command. READ grabs the next value from your DATA lines and puts it into a variable. Every time READ runs, it moves forward to the next value — like a cursor advancing through a list. There is no "go back" command in BASIC, so if you need the data again, you just add another DATA line.

Think of it this way: your DATA lines are like a conveyor belt carrying items, and READ is a person who picks up the first item, then the next, and the next, always moving forward.

### Key Takeaway

> **DATA statements store static tables in your program, and READ pulls those values one at a time into variables — perfect for lookup tables of names, colors, or sprite graphics!**

### How DATA and READ Work Together

BASIC assigns a unique line number to every line of your program (each line must start with a number, like 10, 20, 30). DATA lines are just lines that start with the keyword `DATA` followed by comma-separated values. READ always grabs the next value in the sequence — the first READ gets the first group, the second READ gets the second group, and so on.

You can have as many DATA lines as you want, and you can sprinkle them anywhere in your program (between your command lines). BASIC stores them in the order they appear.

## C64 BASIC Examples

### Example 1: Reading a list of names

```
10 PRINT "===== 8-BIT HEROES ====="
20 FOR I=1 TO 5
30 READ NAME$
40 PRINT I; "." CHR$(147); NAME$
50 NEXT I
60 DATA "SONIC","MARIO","ZELDA","LINK","SAMUS"
100 END
```

|| Code | Description |
|------|-----------|
| `FOR I=1 TO 5` | Loop exactly 5 times — one for each hero name |
| `READ NAME$` | Grab the next value from DATA and put it in NAME$ |
| `PRINT I; "."; NAME$` | Print the number and the name separated by a dot |
| `DATA "SONIC","MARIO",...` | Store 5 names in a comma-separated list |

### Example 2: A color table — the rainbow palette

```
10 FOR I=1 TO 7
20 READ R
30 PRINT CHR$(147)
40 POKEM 53280,R
50 PRINT "Color "; I; " is nice!"
60 NEXT I
70 DATA 1,2,3,4,5,6,8
80 POKEM 53280,15
90 PRINT "All done!"
```

|| Code | Description |
|------|------|
| `POKEM 53280,R` | Set the screen border color using R from DATA |
| `DATA 1,2,3,4,5,6,8` | Color values: red, blue, green, cyan, purple, yellow, white |

### Example 3: Building a sprite palette lookup

```
10 DIM SP(3,7)
20 FOR R=0 TO 3
30   FOR C=1 TO 7
40     READ SP(R,C)
50   NEXT C
60 NEXT R
70 DATA 1,2,5,8,9,13,15
80 DATA 0,3,6,7,10,11,14
90 DATA 2,4,5,9,12,13,15
100 DATA 1,3,6,7,10,11,14
```

|| Code | Description |
|------|------|
| `DIM SP(3,7)` | Make a 4-row by 8-column table in memory |
| `FOR R=0 TO 3:NEXT R` | Loop through each row |
| `READ SP(R,C)` | Fill the array from DATA — like filling a spreadsheet! |

## Exercise

1. **Type Example 1 and press RUN. Watch the names appear one by one.**
   - Expected output: Five numbered hero names scroll down the screen.

2. **Add two more names to the DATA line (line 70 above), and change "5" to "7" in the FOR loop.**
   - Expected output: Seven hero names appear, with two new ones you chose.

3. **Create a program that reads four decimal numbers from DATA and prints their sum.**
   - Expected output: The total of the four numbers. Hint: use a SUM variable that starts at 0 and += each READ value.

## Practice Challenge

> **Challenge:** Create a "monster stat sheet" that uses DATA to store four monsters, each with a name and an attack power. For example: `DATA "DRAGON",50,"SLIME",5,"GOBLIN",20,"WIZARD",40`. Read the data and print a formatted table showing each monster's name and power level.
> **Hint:** Your loop runs 4 times. Inside, do two READs per loop iteration — one for the name and one for the power level.

## Quiz

1. **What does the DATA statement do?**
   a) Displays data on screen
   b) Stores static values inside the program
   c) Reads keyboard input
   d) Draws data tables
   **Answer:** b
   **Explanation:** DATA creates hidden tables of values stored in your program's memory.

2. **What happens every time READ runs?**
   a) It resets to the first value
   b) It picks a random value
   c) It advances to the next value in the DATA list
   d) It deletes the last value
   **Answer:** c
   **Explanation:** READ always grabs the next value in sequence — it never goes backward.

3. **Can you have multiple DATA lines in a program?**
   a) No, only one DATA line allowed
   b) Yes, but only if they are in the same column
   c) Yes, READ continues across all DATA lines in order
   d) Yes, but only for numbers, not strings
   **Answer:** c
   **Explanation:** You can have many DATA lines. READ simply moves through them one by one, regardless of line boundaries.

4. **In `DATA "A",5,"B",10`, what does the third READ return?**
   a) 5
   b) "B"
   c) 10
   d) "A"
   **Answer:** b
   **Explanation:** First READ = "A", second = 5, third = "B", fourth = 10.

## Summary

- **DATA** lets you store static tables of values inside your BASIC program.
- **READ** grabs the next value from the DATA list and stores it in a variable.
- Each READ advances the pointer — values are consumed in order.
- You can mix **strings and numbers** in DATA lines.
- Multiple **DATA lines** work together as one continuous list.
- DATA is perfect for **lookup tables**: names, colors, sprite graphics, and more!

## What's Next?

Now that you know how to hide data inside your program, what if you could show **more than the normal screen**? In the next lesson, you will learn how to switch screen addresses and create eye-popping **multi-screen scrolling effects** that go way beyond what's normally visible!

See you in Lesson 5.2 — Multi-Screen Effects! 🌀
