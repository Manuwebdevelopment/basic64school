// =======================================================
// viewport.ts — C64 Screen Viewport & Border Management
// Manages the visible portion of the virtual screen, scrolling, and border colors
// ==========================================================

export interface ViewportConfig {
  /** Screen color (background, not border) */
  bgColor: string;
  /** Border color */
  borderColor: string;
  /** Scroll X offset in character cells */
  scrollX: number;
  /** Scroll Y offset in character cells */
  scrollY: number;
  /** Screen region width in pixels */
  screenW: number;
  /** Screen region height in pixels */
  screenH: number;
  /** Viewport offset X (top-left corner of the view) */
  offsetX: number;
  /** Viewport offset Y */
  offsetY: number;
  /** Visible width in pixels (after scrolling) */
  visibleW: number;
  /** Visible height in pixels */
  visibleH: number;
}

export interface ColorData {
  border: number;
  bgColor: number;
  backgroundColor: number; // Alternate background color (for text modes with color RAM)
}

export type ViewportMode = 'ntsc' | 'pal' | 'custom';

export class VICIIViewport {
  /** Total screen width in pixels (including borders) */
  readonly totalWidth: number;
  /** Total screen height in pixels */
  readonly totalHeight: number;
  /** Screen region (playfield) width in pixels */
  readonly screenW: number;
  /** Screen region (playfield) height in pixels */
  readonly screenH: number;
  /** Border width (left/right) in pixels */
  readonly borderLeft: number;
  /** Border width (top/bottom) */
  readonly borderTop: number;

  // State
  private _scrollX: number = 0;
  private _scrollY: number = 0;
  private _borderColor: number = 15; // white default
  private _bgColor: number = 15;     // transparent (uses background color below)
  private _bgColorIdx: number = 0;   // background color index for screen area
  private _backgroundColor: number = 1; // white default for screen background

  // VIC-II registers (simplified model)
  private _reg01d0: number = 0; // $1D0 Border color
  private _reg01d1: number = 0; // $1D1 Screen background color  
  private _reg01d2: number = 0; // $1D2 Alternative background color
  private _reg10: number = 0;   // $10 Color RAM base (low byte)
  private _reg11: number = 0;   // $11 Color RAM base (high byte)
  private _reg1680: number = 0; // $1680 Color RAM base
  private _reg1d08: number = 0; // $1D08 Screen width

  private _mode: ViewportMode = 'ntsc';
  private _colorData: ColorData = { border: 15, bgColor: 15, backgroundColor: 1 };
  private _colorMap: Record<number, string> = {};
  private _config: ViewportConfig;

  constructor(
    totalWidth: number = 800,
    totalHeight: number = 600,
    borderSize: number = 40,
    bgColor: string = '#1a1c2c'
  ) {
    this.totalWidth = totalWidth;
    this.totalHeight = totalHeight;
    this.borderLeft = borderSize;
    this.borderTop = borderSize;
    this.screenW = totalWidth - 2 * borderSize;
    this.screenH = totalHeight - 2 * borderSize;

    this._config = {
      bgColor: bgColor,
      borderColor: '#706ecf',
      scrollX: 0,
      scrollY: 0,
      screenW: this.screenW,
      screenH: this.screenH,
      offsetX: borderSize,
      offsetY: borderSize,
      visibleW: this.screenW,
      visibleH: this.screenH,
    };
  }

  // ========== Register access (VIC-II register simulation) ==========

  pokeBorderColor(addr: number, value: number): void {
    // $1D0 = border color
    if (addr === 0x1D0) this._reg01d0 = value & 0x1F;
    this._borderColor = value & 0x1F;
    this._colorData.border = value & 0x1F;
    this._config.borderColor = this.getVIC2Color(this._borderColor);
    this._config.bgColor = this._config.borderColor; // border IS background in C64
  }

  pokeBGColor(addr: number, value: number): void {
    // $1D1 = background color
    if (addr === 0x1D1) this._reg01d1 = value & 0x1F;
    this._bgColor = value & 0x1F;
    this._colorData.bgColor = value & 0x1F;
  }

  pokeBackgroundColor(addr: number, value: number): void {
    // $1D2 = alternate background color
    if (addr === 0x1D2) this._reg01d2 = value & 0x1F;
    this._backgroundColor = value & 0x1F;
    this._colorData.backgroundColor = value & 0x1F;
  }

  pokeColorRAMBase(addr: number, value: number): void {
    // $1680, $1D08 = color RAM base address
    if ((addr & 0xFFF0) === 0x1680) this._reg1680 = value & 0x0F;
    if ((addr & 0xFFF0) === 0x1D08) {
      this._reg1d08 = value & 0x0F;
      // Full address = ((reg1680 & 0x0F) << 8) | ((reg1D08 & 0x0F) << 12) | 0xD800
    }
  }

  pokeScroll(addr: number, value: number): void {
    // Scroll register simulation
    if (addr === 0x0298 || addr === 0x02A0) {
      this._scrollX = (value & 0xFF);
      this._config.scrollX = value & 0x0F;
    }
    if (addr === 0x0299 || addr === 0x02A1) {
      this._scrollY = (value & 0x07);
      this._config.scrollY = value & 0x07;
    }
    this._config.scrollX = this._scrollX;
    this._config.scrollY = this._scrollY;
  }

  getColorRAMBase(): number {
    // $D800 + (colorRAMBase0 << 8) + (colorRAMBase1 << 12)
    return COLOR_RAM_START | ((this._reg1680 & 0x0F) << 8) | ((this._reg1d08 & 0x0F) << 12);
  }

  // ========== Scroll control ==========

  setScrollX(x: number): void {
    this._scrollX = x & 0xFF;
    this._config.scrollX = x & 0xFF;
  }

  setScrollY(y: number): void {
    this._scrollY = y & 0xFF;
    this._config.scrollY = y & 0x07; // Horizontal scroll is bits 0-2 of $1D08 high byte
  }

  getScrollX(): number {
    return this._scrollX;
  }

  getScrollY(): number {
    return this._config.scrollY;
  }

  // ========== Color management ==========

  getBorderColor(): number {
    return this._borderColor;
  }

  getBGColor(): number {
    return this._bgColor;
  }

  getBackgroundColor(): number {
    return this._backgroundColor;
  }

  setBorderColor(color: number): void {
    this._borderColor = color;
    this._colorData.border = color;
    this._config.borderColor = this.getVIC2Color(color);
    this._config.bgColor = this._config.borderColor;
  }

  setBGColor(color: number): void {
    this._bgColor = color;
    this._colorData.bgColor = color;
  }

  setBackgroundColor(color: number): void {
    this._backgroundColor = color;
    this._colorData.backgroundColor = color;
  }

  // ========== VIC-II color palette ==========

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
      '#7a4478', //  9: magenta
      '#e0a070', // 10: light red
      '#50b8a6', // 11: light cyan
      '#7084c6', // 12: light blue
      '#c4a44c', // 13: light red
      '#c6c6c6', // 14: gray
      '#000000', // 15: transparent
    ];
    return colors[index & 0x0F] || '#000000';
  }

  setVIC2Color(index: number, hex: string): void {
    this._colorMap[index] = hex;
  }

  getVIC2ColorCustom(index: number): string {
    return this._colorMap[index] || this.getVIC2Color(index);
  }

  // ========== Viewport management ==========

  getViewport(): ViewportConfig {
    return { ...this._config };
  }

  getVisibleRegion(): { x: number; y: number; w: number; h: number } {
    return {
      x: this._config.offsetX,
      y: this._config.offsetY,
      w: this._config.visibleW,
      h: this._config.visibleH,
    };
  }

  /**
   * Calculate the visible character cell from screen coordinates.
   * Accounts for scrolling.
   */
  coordToCell(screenX: number, screenY: number): { col: number; row: number } | null {
    const localX = screenX - this._config.offsetX;
    const localY = screenY - this._config.offsetY;
    if (localX < 0 || localY < 0 || localX >= this.screenW || localY >= this.screenH) {
      return null;
    }
    const charW = Math.floor(this.screenW / 40);
    const charH = Math.floor(this.screenH / 25);
    const col = Math.floor(localX / charW);
    const row = Math.floor(localY / charH);
    if (col < 0 || col >= 40 || row < 0 || row >= 25) return null;
    return { col, row };
  }

  /**
   * Calculate the screen pixel from a character cell coordinate.
   */
  cellToCoord(col: number, row: number): { x: number; y: number } {
    const charW = Math.floor(this.screenW / 40);
    const charH = Math.floor(this.screenH / 25);
    return {
      x: this._config.offsetX + col * charW,
      y: this._config.offsetY + row * charH,
    };
  }

  /**
   * Set viewport dimensions.
   */
  setSize(width: number, height: number, borderSize: number = 40): void {
    this.totalWidth = width;
    this.totalHeight = height;
    this.borderLeft = borderSize;
    this.borderTop = borderSize;
    this.screenW = width - 2 * borderSize;
    this.screenH = height - 2 * borderSize;
    this._config.screenW = this.screenW;
    this._config.screenH = this.screenH;
    this._config.visibleW = this.screenW;
    this._config.visibleH = this.screenH;
  }

  /**
   * Set the screen display mode (NTSC, PAL, custom).
   */
  setMode(mode: ViewportMode): void {
    this._mode = mode;
    switch (mode) {
      case 'ntsc':
        this._config.scrollX = this._scrollX & 0xFF;
        this._config.scrollY = this._scrollY & 0x07;
        break;
      case 'pal':
        // PAL has slightly different timings
        this._config.scrollX = this._scrollX & 0xFF;
        this._config.scrollY = this._scrollY & 0x07;
        break;
      case 'custom':
        break;
    }
  }

  getMode(): ViewportMode {
    return this._mode;
  }

  /**
   * Get the border color hex string.
   */
  getBorderColorHex(): string {
    return this.getVIC2Color(this._borderColor);
  }

  /**
   * Get the screen background color hex string.
   */
  getBGColorHex(): string {
    return this.getVIC2Color(this._bgColor);
  }

  /**
   * Get the screen area background color hex string.
   */
  getBackgroundColorHex(): string {
    return this._config.bgColor;
  }

  /**
   * Set border color using RGB.
   */
  setBorderColorRGB(r: number, g: number, b: number): void {
    const index = [r, g, b].reduce((acc, val) => acc * 256 + val, 0) % 16;
    this.setBorderColor(index);
  }

  /**
   * Reset all colors to default.
   */
  resetColors(): void {
    this.setBorderColor(15);
    this.setBGColor(1);
    this.setBackgroundColor(0);
  }

  /**
   * Get viewport state as a serializable object.
   */
  getState(): {
    scrollX: number; scrollY: number;
    borderColor: number; bgColor: number; backgroundColor: number;
    mode: ViewportMode;
    screenW: number; screenH: number;
  } {
    return {
      scrollX: this._scrollX,
      scrollY: this._scrollY,
      borderColor: this._borderColor,
      bgColor: this._bgColor,
      backgroundColor: this._backgroundColor,
      mode: this._mode,
      screenW: this.screenW,
      screenH: this.screenH,
    };
  }

  /**
   * Restore viewport state from a serializable object.
   */
  setState(state: ReturnType<typeof this.getState>): void {
    this._scrollX = state.scrollX;
    this._scrollY = state.scrollY;
    this._borderColor = state.borderColor;
    this._bgColor = state.bgColor;
    this._backgroundColor = state.backgroundColor;
    this._mode = state.mode;
    this._config.borderColor = this.getVIC2Color(this._borderColor);
    this._config.bgColor = this._config.borderColor;
  }
}

/** Color RAM start address */
export const COLOR_RAM_START = 0xD800;
/** Character ROM start address */
export const CHAR_ROM_START = 0x0000;
/** Character ROM end address */
export const CHAR_ROM_END = 0x1FFF;
