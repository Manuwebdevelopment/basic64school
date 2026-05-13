// ===========================================================================
// memory.ts — C64 Memory Map & Controller
// 38KB memory with proper boundaries (zero page, stack, screen, BASIC RAM, ROM)
// ===========================================================================

export interface MemRegion {
  start: number;
  end: number;
  name: string;
  type: 'ram' | 'rom' | 'screen' | 'color' | 'reserved';
  writable: boolean;
}

export interface MemoryStats {
  size: number;
  regions: MemRegion[];
  peek(addr: number): number;
  poke(addr: number, value: number): boolean;
}

// C64 memory map regions
const REGIONS: MemRegion[] = [
  { start: 0x0000, end: 0x00FF, name: 'Zero Page', type: 'ram', writable: true },
  { start: 0x0100, end: 0x01FF, name: 'Stack', type: 'ram', writable: true },
  { start: 0x0200, end: 0x02FF, name: 'Kernel Vectors', type: 'reserved', writable: true },
  { start: 0x0300, end: 0x03FF, name: 'OS Buffers', type: 'reserved', writable: true },
  { start: 0x0400, end: 0x07FF, name: 'Screen Memory', type: 'screen', writable: true },
  { start: 0x0800, end: 0xBFFF, name: 'BASIC RAM', type: 'ram', writable: true },
  { start: 0xC000, end: 0xFFFF, name: 'ROM', type: 'rom', writable: false },
];

export class Memory {
  readonly data: Uint8Array;
  readonly size: number;
  readonly regions: MemRegion[];

  constructor(size: number = 0xC000) {
    this.size = size;
    this.regions = REGIONS;
    this.data = new Uint8Array(size);
    this.data.fill(0);

    // Fill ROM region with 0xFF (erased state) — in a real C64 this would be firmware
    for (let i = 0xC000; i < size; i++) {
      this.data[i] = 0xFF;
    }

    // Initialize screen memory to blanks (PETSCII 32 = space)
    for (let i = 0x0400; i < 0x0800; i++) {
      this.data[i] = 32;
    }
  }

  /** Read a byte from memory (PEEK semantics) */
  peek(addr: number): number {
    if (addr < 0x0000 || addr >= this.size) {
      return 0;
    }
    return this.data[addr];
  }

  /** Write a byte to memory (POKE semantics) — returns false if write is blocked */
  poke(addr: number, value: number): boolean {
    if (addr < 0x0000 || addr >= this.size) {
      return false;
    }

    value = value & 0xFF; // Mask to byte range

    // ROM and reserved regions: block writes (read-only)
    const region = this.getRegion(addr);
    if (!region || !region.writable) {
      return false;
    }

    this.data[addr] = value;
    return true;
  }

  /** Read a 16-bit word (little-endian) from memory */
  peekWord(addr: number): number {
    const lo = this.peek(addr);
    const hi = this.peek(addr + 1);
    return (hi << 8) | lo;
  }

  /** Write a 16-bit word (little-endian) to memory */
  pokeWord(addr: number, value: number): void {
    this.poke(addr, value & 0xFF);
    this.poke(addr + 1, (value >> 8) & 0xFF);
  }

  /** Read a string of bytes from memory (null-terminated or length-prefixed) */
  readString(addr: number): string {
    const bytes: number[] = [];
    while (addr < this.size && this.peek(addr) !== 0) {
      bytes.push(this.peek(addr));
      addr++;
    }
    return String.fromCharCode(...bytes);
  }

  /** Write a string to memory (null-terminated) */
  writeString(addr: number, str: string): number {
    const bytes = new Uint8Array(str.length + 1);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i) & 0xFF;
    }
    for (let i = 0; i <= str.length; i++) {
      this.poke(addr + i, bytes[i]);
    }
    return str.length + 1;
  }

  /** Write raw bytes to memory */
  writeBytes(addr: number, bytes: Uint8Array): number {
    let written = 0;
    for (let i = 0; i < bytes.length; i++) {
      if (!this.poke(addr + i, bytes[i])) break;
      written++;
    }
    return written;
  }

  /** Read raw bytes from memory */
  readBytes(addr: number, length: number): Uint8Array {
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = this.peek(addr + i);
    }
    return result;
  }

  /** Get the memory region for a given address */
  getRegion(addr: number): MemRegion | null {
    for (const region of this.regions) {
      if (addr >= region.start && addr <= region.end) {
        return region;
      }
    }
    return null;
  }

  /** Check if an address is in RAM */
  isRAM(addr: number): boolean {
    const region = this.getRegion(addr);
    return region ? region.type === 'ram' || region.type === 'screen' || region.type === 'color' : false;
  }

  /** Check if an address is in ROM */
  isROM(addr: number): boolean {
    return addr >= 0xC000;
  }

  /** Zero-fill all RAM (like RESET or NEW in BASIC) */
  clear(): void {
    this.data.fill(0);
    // Re-initialize ROM block
    for (let i = 0xC000; i < this.size; i++) {
      this.data[i] = 0xFF;
    }
    // Re-initialize screen memory
    for (let i = 0x0400; i < 0x0800; i++) {
      this.data[i] = 32;
    }
  }

  /** Dump a hex dump of a memory range */
  dump(start: number, end: number, cols: number = 16): string {
    const lines: string[] = [];
    end = Math.min(end, this.size);
    for (let addr = start; addr < end; addr += cols) {
      const hexParts: string[] = [];
      const asciiParts: string[] = [];
      for (let i = 0; i < cols; i++) {
        const offset = addr + i;
        if (offset >= end) break;
        const byte = this.peek(offset);
        hexParts.push(byte.toString(16).padStart(2, '0'));
        asciiParts.push(byte >= 32 && byte < 127 ? String.fromCharCode(byte) : '.');
      }
      const hexStr = hexParts.join(' ');
      const asciiStr = asciiParts.join('');
      lines.push(`${addr.toString(16).padStart(6, '0')}: ${hexStr.padEnd(cols * 3 - 1)} |${asciiStr}|`);
    }
    return lines.join('\n');
  }
}

export function createMemory(): Memory {
  return new Memory(0xC000);
}

/** Get the BASIC RAM pointer (low byte, high byte) — default C64 start */
export const BASIC_RAM_START: [number, number] = [0x00, 0x08];
export const BASIC_RAM_END: [number, number] = [0xFF, 0xBF];

/** Get screen memory range */
export const SCREEN_MEM_START: number = 0x0400;
export const SCREEN_MEM_END: number = 0x07FF;
export const SCREEN_WIDTH: number = 40;
export const SCREEN_HEIGHT: number = 25;

/** Get color RAM range — color RAM is at 0xD800 in the real C64, remapped in our model */
export const COLOR_RAM_START: number = 0xD800;
export const COLOR_RAM_END: number = 0xDBFF;

/** Get zero page range */
export const ZP_START: number = 0x0000;
export const ZP_END: number = 0x00FF;

/** Get stack range */
export const STACK_START: number = 0x0100;
export const STACK_END: number = 0x01FF;

/** Get screen memory from a linear address */
export function toScreenAddr(col: number, row: number): number {
  return SCREEN_MEM_START + row * SCREEN_WIDTH + col;
}

/** Get color RAM address from a linear address */
export function toColorAddr(col: number, row: number): number {
  return COLOR_RAM_START + row * SCREEN_WIDTH + col;
}
