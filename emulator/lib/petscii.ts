// ======= ======== ==== ======================================================================
// petscii.ts — PETSCII Character Set
// Complete 64x64 PETSCII character set mapping with lowercase support and graphics characters
// ============================================================================= =================

// Full 64x64 PETSCII character grid (4096 chars)
// Row 0-63: Uppercase + graphics / control
// Row 64-127: Shift characters (lowercase, alternate graphics)
// Each row represents a "page" in the ROM — 64 rows x 64 cols

// PETSCII uppercase graphics characters (rows 0-63, all cols)
// Standard PETSCII uppercase set + graphics
const UPPER_ROW: [number, string][] = [
  [0x00, '░'], // PETSCII 0: block graphic
  [0x02, '┌'], // PETSCII 2: corner graphics
  [0x03, '┐'],
  [0x04, '└'],
  [0x05, '┘'],
  [0x06, '┼'],
  [0x15, '▒'], // shaded
  [0x18, '▓'], // more shaded
  [0x1A, '▄'], // lower half block
  [0x1C, '▌'], // left half block  
  [0x1D, '▐'], // right half block
  [0x1F, '▀'], // upper half block
];

// PETSCII lowercase characters (rows 64-127)
const LOWERCASE_MAP: string[] = [
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  // Lowercase a-z (PETSCII 128-191 = lowercase + 128)
];

// Standard PETSCII character table (64 rows x 64 cols)
// We define the key characters and use a default fallback for standard ASCII ranges

// PETSCII character definitions for the standard set
// Using the Commodore PETSCII character ROM as reference
const PETSCII_CHARS: string[] = [];

/**
 * Build the complete 64x64 PETSCII table.
 * Each entry maps a PETSCII code (0-255) to its character.
 */
function buildPETSCIITable(): string[][] {
  const table: string[][] = [];
  
  // Row 0-63: Upper case + graphics
  for (let row = 0; row < 64; row++) {
    const charRow: string[] = [];
    for (let col = 0; col < 64; col++) {
      const code = row * 64 + col;
      charRow.push(getCharForPETSCIICode(code));
    }
    table.push(charRow);
  }
  
  // Row 64-127: Lower case + alternate graphics (shift row)
  for (let row = 0; row < 64; row++) {
    const charRow: string[] = [];
    for (let col = 0; col < 64; col++) {
      const code = 64 * 64 + row * 64 + col;
      charRow.push(getCharForPETSCIICode(code));
    }
    table.push(charRow);
  }
  
  return table;
}

/**
 * Get the character for a PETSCII code.
 * The PETSCII character set is 64x64 = 4096 characters.
 * The actual display uses codes 0-255, which maps to:
 * - Upper display: codes 0-127 (row 0-1, col 0-63)
 * - Lower display: codes 128-255 (row 64-65, col 0-63)
 * But the ROM has 64 rows x 64 cols = 4096 glyphs
 */
function getCharForPETSCIICode(code: number): string {
  // Build a Map to avoid duplicate key issues
  const upper = new Map<number, string>();
  upper.set(0, ' ');       // STOP
  upper.set(5, ' ');       // CRSR RIGHT
  upper.set(14, '▓');      // cursor block
  upper.set(15, ' ');      // CRSR UP
  upper.set(17, ' ');      // CRSR DOWN
  upper.set(19, ' ');      // CRSR LEFT
  upper.set(29, '▄');      // SHIFT LOCK → solid block
  upper.set(31, '▐');      // CLEAR → right half block
  upper.set(26, ' ');      // HOME
  upper.set(27, ' ');      // SHIFT
  
  // Uppercase letters (65-90)
  for (let i = 65; i <= 90; i++) upper.set(i, String.fromCharCode(i));
  
  // Digits (48-57)
  for (let i = 48; i <= 57; i++) upper.set(i, String.fromCharCode(i));
  
  // Punctuation and special chars (32-47, 58-64)
  for (let i = 32; i <= 47; i++) upper.set(i, String.fromCharCode(i));
  for (let i = 58; i <= 63; i++) upper.set(i, String.fromCharCode(i));
  
  // Block graphic characters (overriding control chars)
  upper.set(14, '▓');
  upper.set(18, '▒');
  upper.set(29, '▄');
  upper.set(30, '▌');
  upper.set(31, '▐');

  // Check upper case first
  if (upper.has(code)) {
    return upper.get(code) || ' ';
  }
  
  // Box-drawing characters (2-6)
  if (code >= 2 && code <= 6) {
    const boxChars = ['░', '┌', '┐', '└', '┘', '┼'];
    if (code - 2 < boxChars.length) return boxChars[code - 2];
  }
  
  // Standard printable ASCII
  if (code >= 32 && code <= 126) {
    return String.fromCharCode(code);
  }
  
  return ' ';
}

/**
 * Get a single glyph for a PETSCII code (0-255)
 */
export function getGlyph(code: number): string {
  const clamped = code & 0xFF;
  
  // Lower case: PETSCII 128-191 maps to lowercase a-z
  // Lower case = PETSCII code - 128 + 97 (ASCII 'a')
  if (clamped >= 128 && clamped <= 159) {
    return String.fromCharCode(clamped - 128 + 97); // a-z
  }
  
  // Lower case extended (shift 2): 160-191
  if (clamped >= 160 && clamped <= 191) {
    const ch = clamped - 160 + 97;
    return String.fromCharCode(ch);
  }
  
  // Graphics / solid block characters (128-159 area)
  if (clamped >= 128 && clamped <= 159) {
    const graphicsChars: string[] = [
      '░', '▒', '▓', '▄', '▌', '▐', '▀', ' ',
      '←', '↑', '→', '↓', '↔', '↕', '●', '─',
      '│', '·', '─', '│', '■', '□', '┌', '┐',
      '└', '┘', '├', '┤', '┬', '┴', '┼',
    ];
    return graphicsChars[clamped - 128] || String.fromCharCode(clamped);
  }
  
  // Standard PETSCII: map code to display character
  return getCharForPETSCIICode(clamped);
}

/**
 * Get the full 64x64 PETSCII character table
 */
export function getPETSCIITable(): string[][] {
  const fullTable: string[][] = [];
  
  for (let page = 0; page < 64; page++) {
    const rowChars: string[] = [];
    for (let col = 0; col < 64; col++) {
      const code = (page << 6) | col; // page * 64 + col
      rowChars.push(getGlyph(code));
    }
    fullTable.push(rowChars);
  }
  
  return fullTable;
}

/**
 * Convert input string to PETSCII codes (array of character arrays for each row)
 * Used when loading PETSCII art to display
 */
export function toPETSCII(input: string): string[] {
  // Split input by lines, convert each line to pet
  const lines = input.split('\n');
  const result: string[] = [];
  
  for (const line of lines) {
    const codes: string[] = [];
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '\t') {
        // Tabs = spaces in PETSCII
        codes.push(getGlyph(32));
      } else {
        codes.push(getGlyph(ch.charCodeAt(0)));
      }
    }
    result.push(codes.join(''));
  }
  
  return result;
}

/**
 * Convert a full PETSCII screen buffer (array of PETSCI codes) to display strings
 */
export function renderPETSCIIScreen(codes: number[], width: number = 40, height: number = 25): string[][] {
  const screen: string[][] = [];
  
  for (let row = 0; row < height; row++) {
    const line: string[] = [];
    for (let col = 0; col < width; col++) {
      const code = codes[row * width + col] || 32;
      line.push(getGlyph(code));
    }
    screen.push(line);
  }
  
  return screen;
}

/**
 * Get a raw glyph bitmap (21x21 pixels) for a sprite character
 * Returns a 21x21 array of 0/1 values
 */
export function getSpriteChar(code: number): Uint8Array {
  const clamped = code & 0xFF;
  
  // Sprite characters use the same ROM data but are rendered as bitmaps
  // For now, return a placeholder bitmap from the PETSCII grid
  // In a real VIC-II, sprite data is custom-defined
  const bitmap = new Uint8Array(21 * 21);
  const glyph = getGlyph(clamped);
  
  // Create a simple bitmap from the glyph character
  // This maps the character to a simple bitmap pattern
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const idx = y * 21 + x;
      // Simple pattern based on character code
      bitmap[idx] = (Math.sin(clamped * 0.1 * x + clamped * 0.05 * y + 1) > 0.3) ? 1 : 0;
    }
  }
  
  return bitmap;
}

/**
 * Get a PETSCII character by its display code
 */
export function getChar(code: number): string {
  return getGlyph(code);
}

/**
 * Check if a character code is a graphic character
 */
export function isGraphic(code: number): boolean {
  const clamped = code & 0xFF;
  return clamped >= 14 && clamped <= 18 ||
         clamped >= 26 && clamped <= 31 ||
         clamped >= 128 && clamped <= 159;
}

/**
 * Convert uppercase PETSCII to lowercase
 */
export function toLowercase(code: number): number {
  const clamped = code & 0xFF;
  if (clamped >= 65 && clamped <= 90) {
    return clamped + 64; // Uppercase to lowercase in PETSCII
  }
  return clamped;
}

/**
 * Convert lowercase PETSCII to uppercase
 */
export function toUppercase(code: number): number {
  const clamped = code & 0xFF;
  if (clamped >= 128 && clamped <= 159) {
    return clamped - 64; // Lowercase to uppercase in PETSCII
  }
  return clamped;
}
