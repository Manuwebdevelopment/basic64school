// ============================================================
// screen.ts — VIC-II Screen Rendering (40x25 char mode)
// Renders the C64 screen from character and color tables
// ============================================================

export interface ScreenConfig {
  charWidth?: number;
  charHeight?: number;
  charSpacing?: number;
  borderSize?: number;
  bgColor?: string;
  fgColor?: string;
  width?: number;
  height?: number;
}

export interface CharacterCell {
  charCode: number;
  color: number;
}

export class VICIIScreen {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: ScreenConfig;
  private charWidth: number;
  private charHeight: number;
  private charSpacing: number;
  private borderSize: number;
  private bgColor: string;
  private fgColor: string;
  private charTable: Map<number, HTMLCanvasElement>;
  private _width: number;
  private _height: number;

  constructor(config: ScreenConfig = {}) {
    this.config = config;
    this.charWidth = config.charWidth || 8;
    this.charHeight = config.charHeight || 8;
    this.charSpacing = config.charSpacing || 0;
    this.borderSize = config.borderSize || 4;
    this.bgColor = config.bgColor || '#1a1c2c';
    this.fgColor = config.fgColor || '#706ecf';
    this.charTable = new Map();
    this._width = config.width || 800;
    this._height = config.height || 600;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  getConfig(): ScreenConfig {
    return this.config;
  }

  /**
   * Render the screen from character codes and color indices.
   * @param charTable Array of PETSCII character codes (40x25 = 1000 elements)
   * @param colorTable Array of color indices (40x25 = 1000 elements)
   * @param canvas Optional canvas to render to (uses internal if not provided)
   * @param ctx Optional ctx to use (uses internal canvas context if not provided)
   */
  render(
    charTable: string | string[] | number[],
    colorTable: number[],
    canvas?: HTMLCanvasElement,
    ctx?: CanvasRenderingContext2D
  ): HTMLCanvasElement {
    const targetCanvas = canvas || this.canvas;
    const targetCtx = ctx || this.ctx;

    // Update internal canvas if needed
    if (!canvas) {
      this.canvas = targetCanvas;
      this.ctx = targetCtx || targetCanvas.getContext('2d')!;
    }

    targetCtx.fillStyle = this.bgColor;
    targetCtx.fillRect(0, 0, targetCanvas.width, targetCanvas.height);

    // Convert charTable to number array if string
    let codes: number[];
    if (typeof charTable === 'string') {
      codes = [];
      for (let i = 0; i < charTable.length; i++) {
        codes.push(charTable.charCodeAt(i));
      }
    } else if (Array.isArray(charTable)) {
      codes = charTable.map(v => typeof v === 'string' ? v.charCodeAt(0) : v);
    } else {
      codes = charTable;
    }

    const cols = 40;
    const rows = 25;
    const screenX = this.borderSize;
    const screenY = this.borderSize;
    const screenW = targetCanvas.width - 2 * this.borderSize;
    const screenH = targetCanvas.height - 2 * this.borderSize;
    const cellW = Math.floor(screenW / cols);
    const cellH = Math.floor(screenH / rows);

    // Update internal config
    this.charWidth = cellW;
    this.charHeight = cellH;

    // Set background color from border region
    targetCtx.fillStyle = this.bgColor;
    targetCtx.fillRect(0, 0, targetCanvas.width, targetCanvas.height);

    // Draw screen area background
    targetCtx.fillStyle = this.getVIC2Color(0); // color 0 = screen background
    targetCtx.fillRect(screenX, screenY, screenW, screenH);

    // Pre-render character bitmaps to the character table cache
    for (let code = 0; code < 256; code++) {
      if (!this.charTable.has(code)) {
        this.charTable.set(code, this.renderCharToCanvas(code));
      }
    }

    // Render each character cell
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        const code = codes[idx] || 32;
        const colorIdx = colorTable.length > 0 ? colorTable[idx] || 0 : 15;

        const charCanvas = this.charTable.get(code);
        if (!charCanvas) continue;

        const x = screenX + col * cellW;
        const y = screenY + row * cellH;

        // Apply color tint to the character
        const color = this.getVIC2Color(colorIdx);
        targetCtx.fillStyle = color;
        targetCtx.font = `${cellH - 1}px monospace`;
        targetCtx.textBaseline = 'top';
        targetCtx.fillText(String.fromCharCode(code), x, y + 1);
      }
    }

    return targetCanvas;
  }

  /**
   * Render a single character code to an offscreen canvas bitmap.
   */
  private renderCharToCanvas(code: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = this.charWidth;
    canvas.height = this.charHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = `${this.charHeight - 1}px monospace`;
    ctx.textBaseline = 'top';
    ctx.fillText(String.fromCharCode(code), 0, 0);
    return canvas;
  }

  /**
   * Get the background character code at a screen address.
   * @param col Column (0-39)
   */
  setBackgroundChar(col: number, code: number): void {
    // Store in internal buffer
    this._screenCode = this._screenCode || new Uint8Array(1000);
    this._screenCode[this._currentRow! * 40 + col] = code & 0xFF;
  }

  /**
   * Set the background color at a screen position.
   * @param col Column (0-39)
   * @param color Color index (0-15)
   */
  setBackgroundColor(col: number, color: number): void {
    this._colorCode = this._colorCode || new Uint8Array(1000);
    this._colorCode[this._currentRow! * 40 + col] = color & 0x0F;
  }

  // Internal screen buffers (used when rendering from memory)
  private _screenCode: Uint8Array | null = null;
  private _colorCode: Uint8Array | null = null;
  private _currentRow: number = 0;

  /**
   * Render screen from memory addresses (character ROM + color RAM).
   * @param charMem Character table array (1000 bytes for 40x25)
   * @param colorMem Color table array (1000 bytes)
   * @param canvas Target canvas
   */
  renderFromMemory(
    charMem: Uint8Array | number[],
    colorMem: Uint8Array | number[],
    canvas?: HTMLCanvasElement
  ): HTMLCanvasElement {
    let colorArr: number[];
    if (Array.isArray(colorMem)) {
      colorArr = colorMem;
    } else {
      colorArr = Array.from(colorMem);
    }

    const result = this.render(Array.from(charMem), colorArr, canvas);

    // Cache the buffers for later use
    this._screenCode = new Uint8Array(charMem);
    this._colorCode = new Uint8Array(colorArr);

    return result;
  }

  /**
   * Get VIC-II color by index (standard C64 palette).
   */
  getVIC2Color(index: number): string {
    const colors: string[] = [
      '#000000', //  0: black
      '#ffffff', //  1: white
      '#50385c', //  2: dark red
      '#a8624c', //  3: purple
      '#488352', //  4: green
      '#189578', //  5: cyan
      '#1e377a', //  6: dark blue
      '#cc8f5a', //  7: yellow
      '#706ecf', //  8: orange
      '#7a4478', //  9: red
      '#e0a070', // 10: light green
      '#50b8a6', // 11: light cyan
      '#7084c6', // 12: light blue
      '#c4a44c', // 13: light red
      '#c6c6c6', // 14: light gray
      '#000000', // 15: transparent
    ];
    return colors[index & 0x0F] || '#000000';
  }

  /**
   * Set the screen background color (borders region).
   */
  setBackgroundColorRGB(r: number, g: number, b: number): void {
    const hex = `#${((r & 0xFF) << 16 | (g & 0xFF) << 8 | (b & 0xFF)).toString(16).padStart(6, '0')}`;
    this.bgColor = hex;
  }

  /**
   * Set the border color.
   */
  setBorderColor(r: number, g: number, b: number): void {
    const hex = `#${((r & 0xFF) << 16 | (g & 0xFF) << 8 | (b & 0xFF)).toString(16).padStart(6, '0')}`;
    this.bgColor = hex;
  }

  /**
   * Update the character at a specific screen position.
   */
  setCharAt(col: number, row: number, code: number): void {
    // This triggers a screen update; the render method handles it
  }

  /**
   * Clear the screen (fill with spaces).
   */
  clearScreen(charCode: number = 32, color: number = 1): void {
    this._screenCode = new Uint8Array(1000);
    this._colorCode = new Uint8Array(1000);
    this._screenCode.fill(charCode);
    this._colorCode.fill(color);
  }
}

// VIC-II 40x25 color values (standard C64 palette values in VIC-II format)
export const VIC2_COLORS: string[] = [
  '#000000', //  0 black
  '#ffffff', //  1 white
  '#50385c', //  2 red
  '#a8624c', //  3 purple
  '#488352', //  4 green
  '#189578', //  5 cyan
  '#1e377a', //  6 blue
  '#cc8f5a', //  7 yellow
  '#706ecf', //  8 orange
  '#7a4478', //  9 magenta
  '#e0a070', // 10 light red
  '#50b8a6', // 11 light gray
  '#7084c6', // 12 light blue
  '#c4a44c', // 13 pink
  '#c6c6c6', // 14 light gray
  '#000000', // 15 transparent
];

// Screen dimensions
export const SCREEN_COLS = 40;
export const SCREEN_ROWS = 25;
export const SCREEN_WIDTH_PX = 80;  // 40 chars * 2px dot matrix
export const SCREEN_HEIGHT_PX = 80; // 25 chars * 3px + padding
export const SCREEN_CHAR_W = 8;
export const SCREEN_CHAR_H = 8;
export const CHAR_ROM_START = 0x0000;
export const CHAR_ROM_END = 0x1FFF;
