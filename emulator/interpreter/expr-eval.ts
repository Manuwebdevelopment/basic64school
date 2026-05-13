// === C64 BASIC Executor Engine ===

import { tokenize } from './tokenizer';
import type {
  Expr,
  VarTarget,
  Stmt,
  DataValue,
  ExecutionContext,
  ProgramLine,
} from './types';
import { parseExpression, targetName } from './parser';

// ====== C64 STRING COMPARISON

export function c64StringCompare(a: string, b: string): number {
  const ua = a.toUpperCase();
  const ub = b.toUpperCase();
  return ua < ub ? -1 : ua > ub ? 1 : 0;
}

export function c64StringEquals(a: string, b: string): boolean {
  return c64StringCompare(a, b) === 0;
}

// ====== MATH HELPERS

export function c64Abs(n: number): number { return Math.abs(n); }
export function c64Int(n: number): number { return Math.floor(n); }
export function c64Sgn(n: number): number {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}
export function c64Sqr(n: number): number { return n >= 0 ? Math.sqrt(n) : NaN; }
export function c64Sin(deg: number): number { return Math.sin(deg * Math.PI / 180); }
export function c64Cos(deg: number): number { return Math.cos(deg * Math.PI / 180); }
export function c64Tan(deg: number): number { return Math.tan(deg * Math.PI / 180); }
export function c64Atn(n: number): number { return Math.atan(n); }
export function c64Log(n: number): number { return n > 0 ? Math.log10(n) : NaN; }
export function c64Exp(n: number): number { return Math.exp(n); }
export function c64Fix(n: number): number { return n < 0 ? Math.ceil(n) : Math.floor(n); }

export function c64And(a: number, b: number): number { return (Math.trunc(a) & Math.trunc(b)) | 0; }
export function c64Or(a: number, b: number): number { return (Math.trunc(a) | Math.trunc(b)) | 0; }
export function c64Xor(a: number, b: number): number { return (Math.trunc(a) ^ Math.trunc(b)) | 0; }
export function c64Not(a: number): number { return ~Math.trunc(a); }
export function c64Bool(n: number | boolean): number { return n ? -1 : 0; }

// ====== MEMORY (PEEK/POKE)

const MEMORY = new Uint8Array(65536);

export function memoryPeek(addr: number): number { return MEMORY[addr & 0xFFFF]; }
export function memoryPoke(addr: number, val: number): void { MEMORY[addr & 0xFFFF] = val & 0xFF; }

// ====== NUMBER <-> STRING

export function toC64Str(n: number): string {
  if (Math.abs(n) >= 1e14) return n.toExponential(0);
  if (n === Math.floor(n)) return String(Math.trunc(n));
  let s = n.toFixed(6).replace(/0+$/, '');
  return s;
}

export function fromC64Num(s: string): number {
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

// ====== EXPRESSION EVALUATOR

export class ExprEval {
  private variables: Map<string, number | string>;
  private arrays: Map<string, Map<number, number | string>>;

  constructor(
    variables: Map<string, number | string>,
    arrays: Map<string, Map<number, number | string>>,
  ) {
    this.variables = variables;
    this.arrays = arrays;
  }

  async eval(expr: Expr): Promise<number | string> {
    switch (expr.kind) {
      case 'number': return expr.value;
      case 'string': return expr.value;
      case 'variable': return this.evalVar(expr);
      case 'array': return this.evalArr(expr);
      case 'function': return this.evalFn(expr);
      case 'binaryOp': return this.evalBinOp(expr);
      case 'unaryOp': return this.evalUnOp(expr);
      case 'paren': return this.eval(expr.expr);
      default: return 0;
    }
  }

  async evalNumber(expr: Expr): Promise<number> {
    return this.toNum(await this.eval(expr));
  }

  async evalString(expr: Expr): Promise<string> {
    return String(await this.eval(expr));
  }

  private async evalVar(expr: Expr): Promise<number | string> {
    if (expr.kind !== 'variable' && expr.kind !== 'array') return 0;
    const name = expr.name[0].toUpperCase();
    const entry = this.variables.get(name);
    return entry !== undefined ? entry : (expr.isString ? '' : 0);
  }

  private async evalArr(expr: Expr): Promise<number | string> {
    if (expr.kind !== 'array') return 0;
    const name = expr.name[0].toUpperCase();
    const idx = Math.trunc(await this.evalNumber(expr.index));
    if (!this.arrays.has(name)) this.arrays.set(name, new Map());
    const arr = this.arrays.get(name)!;
    return arr.get(idx) ?? (expr.isString ? '' : 0);
  }

  private async evalFn(expr: Expr): Promise<number | string> {
    if (expr.kind !== 'function') return 0;
    const fn = expr.name;
    const args = expr.args;
    const a0 = await this.eval(args[0] || { kind: 'number', value: 0 });
    const a1 = await this.eval(args[1] || { kind: 'number', value: 0 });
    const a2 = await this.eval(args[2] || { kind: 'number', value: 0 });
    const n0 = this.toNum(a0);
    const n1 = this.toNum(a1);
    const n2 = this.toNum(a2);
    const s0 = String(a0);

    // Math
    if (fn === 'ABS') return c64Abs(n0);
    if (fn === 'INT') return c64Int(n0);
    if (fn === 'SGN') return c64Sgn(n0);
    if (fn === 'SQR') return n0 >= 0 ? c64Sqr(n0) : NaN;
    if (fn === 'RND') return n0 === 0 ? Math.random() : Math.floor(Math.random() * n0) + 1;
    if (fn === 'COS') return c64Cos(Math.trunc(n0));
    if (fn === 'SIN') return c64Sin(Math.trunc(n0));
    if (fn === 'TAN') return c64Tan(Math.trunc(n0));
    if (fn === 'ATN') return c64Atn(n0);
    if (fn === 'LOG') return n0 > 0 ? c64Log(n0) : NaN;
    if (fn === 'EXP') return c64Exp(n0);
    if (fn === 'FIX') return c64Fix(n0);
    if (fn === 'POW' || fn === 'POW2') return Math.pow(n0, n1);

    // String
    if (fn === 'LEN') return s0.length;
    if (fn === 'LEFT$') return s0.substring(0, Math.trunc(n1));
    if (fn === 'RIGHT$') return s0.substring(Math.max(0, s0.length - Math.trunc(n1)));
    if (fn === 'MID$') {
      const start = Math.max(1, Math.trunc(n0));
      const len = args.length > 2 ? Math.trunc(n2) : s0.length - start + 1;
      return s0.substring(start - 1, start - 1 + len);
    }
    if (fn === 'ASC') return s0.charCodeAt(0) || 0;
    if (fn === 'CHR$') return String.fromCharCode(Math.trunc(n0) & 0xFF);
    if (fn === 'VAL') return fromC64Num(s0);
    if (fn === 'STR$') return toC64Str(n0);
    if (fn === 'SPACE$') return ' '.repeat(Math.max(0, Math.trunc(n0)) & 0xFF);
    if (fn === 'STRING$') {
      const n = Math.max(0, Math.trunc(n0)) & 0xFF;
      const c = String.fromCharCode(Math.trunc(n1) & 0xFF);
      return c.repeat(n);
    }
    if (fn === 'LTRIM$') return s0.trimStart();
    if (fn === 'RTRIM$') return s0.trimEnd();
    if (fn === 'TRIM$') return s0.trim();

    // PEEK/POKE
    if (fn === 'PEEK' || fn === 'PEEKBYTE') return memoryPeek(Math.trunc(n0));
    if (fn === 'POKE' || fn === 'POK') {
      memoryPoke(Math.trunc(n0), Math.trunc(n1));
      return 0;
    }

    return 0;
  }

  /** Evaluate binary operator: return number or string */
  private async evalBinOp(expr: Expr): Promise<number | string> {
    if (expr.kind !== 'binaryOp') return 0;
    const left = await this.eval(expr.left);
    const right = await this.eval(expr.right);
    const op = expr.op;

    // String comparison
    if (['=', '<>', '<', '>', '<=', '>='].includes(op)) {
      const ls = String(left);
      const rs = String(right);
      const cmp = c64StringCompare(ls, rs);
      if (op === '=') return c64Bool(cmp === 0);
      if (op === '<>') return c64Bool(cmp !== 0);
      if (op === '<') return c64Bool(cmp < 0);
      if (op === '>') return c64Bool(cmp > 0);
      if (op === '<=') return c64Bool(cmp <= 0);
      if (op === '>=') return c64Bool(cmp >= 0);
    }

    // String concatenation
    if (op === '&') {
      return String(left) + String(right);
    }

    // Numeric
    const ln = this.toNum(left);
    const rn = this.toNum(right);

    if (op === 'AND') return c64And(ln, rn);
    if (op === 'OR') return c64Or(ln, rn);
    if (op === 'XOR') return c64Xor(ln, rn);
    if (op === '+') return ln + rn;
    if (op === '-') return ln - rn;
    if (op === '*') return ln * rn;
    if (op === '/') {
      if (rn === 0) throw new Error('DIVISION BY ZERO');
      return ln / rn;
    }
    if (op === '\\') return rn !== 0 ? Math.trunc(ln / rn) : 0;
    if (op === '^') return Math.pow(ln, rn);

    return 0;
  }

  private async evalUnOp(expr: Expr): Promise<number> {
    if (expr.kind !== 'unaryOp') return 0;
    const val = await this.evalNumber(expr.operand);
    if (expr.op === 'NOT') return c64Not(val);
    if (expr.op === '-') return -val;
    return val;
  }

  public toNum(v: number | string): number {
    if (typeof v === 'number') return v;
    const m = String(v).match(/^-?\d+(\.\d+)?/);
    return m ? parseFloat(m[1]) : 0;
  }
}