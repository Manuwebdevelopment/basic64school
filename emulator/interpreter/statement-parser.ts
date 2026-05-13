// === C64 BASIC Statement Parser ===

import { tokenize } from './tokenizer';
import type { Stmt, PrintArg, Expr, VarTarget, DataValue } from './types';
import type { Token, TokenType } from './tokenizer';
import { parseExpression } from './parser';

class LineParser {
  private tokens: Token[];
  private p = 0;

  constructor(code: string) { this.tokens = tokenize(code); }

  private cur(): Token { return this.tokens[this.p] || { type: 'EOF' as const, value: '' }; }
  private peek(n = 0): Token { return this.tokens[this.p + n] || { type: 'EOF' as const, value: '' }; }
  private is(t: TokenType): boolean { return this.cur().type === t; }
  private v(val: string): boolean {
    const c = this.cur();
    return c.type !== 'EOF' && c.value.toUpperCase() === val.toUpperCase();
  }
  private isKW(val: string): boolean {
    return this.cur().type === 'KEYWORD' || this.v(val);
  }
  private eType(t: TokenType): void {
    if (!this.is(t)) { this.p++; return; }
    this.p++;
  }
  private eVal(val: string): boolean {
    if (!this.v(val)) return false;
    this.p++;
    return true;
  }

  /** Parse all statements in a BASIC line (separated by :) */
  parseAll(): Stmt[] {
    if (this.tokens[0]?.type === 'EOF') return [];
    const stmts: Stmt[] = [];
    while (this.p < this.tokens.length && this.cur().type !== 'LINE_NUMBER') {
      const s = this.parseStmt();
      if (s) stmts.push(s);
    }
    return stmts;
  }

  private parseStmt(): Stmt | null {
    if (this.p >= this.tokens.length) return null;
    const cur = this.cur();

    // REM
    if (this.v('REM')) { this.eVal('REM'); return { kind: 'rem' }; }

    // DATA
    if (this.v('DATA')) { return this.parseData(); }

    // PRINT
    if (this.v('PRINT')) { return this.parsePrint(); }

    // GOTO
    if (this.v('GOTO')) { this.eVal('GOTO');
      const { expr, endPos } = parseExpression(this.tokens, this.p);
      this.p = endPos;
      return (expr.kind === 'number') ? { kind: 'goto', lineNumber: expr.value } : { kind: 'unknown', text: 'bad GOTO' }; }

    // GOSUB
    if (this.v('GOSUB')) { this.eVal('GOSUB');
      const { expr, endPos } = parseExpression(this.tokens, this.p);
      this.p = endPos;
      return (expr.kind === 'number') ? { kind: 'gosub', lineNumber: expr.value } : { kind: 'unknown', text: 'bad GOSUB' }; }

    // FOR var=value
    if (this.isKW('FOR') || this.v('FOR')) { return this.parseFor(); }

    // IF condition
    if (this.v('IF')) { return this.parseIf(); }

    // NEXT
    if (this.v('NEXT')) { this.eVal('NEXT');
      if (this.is('IDENTIFIER')) this.p++;
      return { kind: 'unknown', text: 'NEXT' }; }

    // RETURN
    if (this.v('RETURN')) { this.eVal('RETURN'); return { kind: 'return' }; }

    // READ
    if (this.v('READ')) { return this.parseRead(); }

    // RESTORE
    if (this.v('RESTORE')) { return this.parseRestore(); }

    // INPUT
    if (this.v('INPUT')) { return this.parseInput(); }

    // DIM
    if (this.v('DIM')) { return this.parseDim(); }

    // LET or implicit let
    if (this.v('LET')) { this.eVal('LET');
      if (this.is('IDENTIFIER') && this.peek(1).value === '=') {
        const name = this.cur().value; this.p++; // skip var
        this.eType('OPERATOR'); // skip =
        const { expr, endPos } = parseExpression(this.tokens, this.p);
        this.p = endPos;
        return { kind: 'let', target: { kind: 'scalar', name, isString: name.includes('$') }, expr };
      }
      return { kind: 'unknown', text: 'LET' };
    }

    // END / STOP
    if (this.v('END') || this.v('STOP')) { this.eVal('END'); return { kind: 'stop' }; }

    // CLEAR
    if (this.v('CLEAR')) { this.eVal('CLEAR'); return { kind: 'clear' }; }

    // NEW
    if (this.v('NEW')) { this.eVal('NEW'); return { kind: 'new' }; }

    // Implicit LET: var = ...
    if (this.is('IDENTIFIER') && this.peek(1).value === '=') {
      const name = this.cur().value; this.p++;
      this.eType('OPERATOR'); // skip =
      const { expr, endPos } = parseExpression(this.tokens, this.p);
      this.p = endPos;
      return { kind: 'let', target: { kind: 'scalar', name, isString: name.includes('$') }, expr };
    }

    // Unknown
    return { kind: 'unknown', text: 'unknown stmt' };
  }

  private parsePrint(): Stmt {
    this.eVal('PRINT');
    const args: PrintArg[] = [];
    while (this.p < this.tokens.length && !this.v(':') && this.cur().type !== 'LINE_NUMBER') {
      // TAB/SPC call
      if (this.v('TAB') || this.v('SPC')) {
        const fn = this.cur().value; this.p++;
        if (this.is('LPAREN')) { this.eType('LPAREN'); }
        const { expr, endPos } = parseExpression(this.tokens, this.p);
        this.p = endPos;
        if (this.is('RPAREN')) { this.eType('RPAREN'); }
        args.push({ kind: 'tab', expr });
        continue;
      }

      // Comma separator
      if (this.v(',')) { this.eVal(','); args.push({ kind: 'separator', ch: ',' }); continue; }

      // Semicolon separator
      if (this.v(';')) { this.eVal(';'); args.push({ kind: 'separator', ch: ';' }); continue; }

      // Expression
      const { expr, endPos } = parseExpression(this.tokens, this.p);
      if (expr.kind !== 'undefined' && endPos > this.p) {
        args.push(expr);
        this.p = endPos;
      } else {
        this.p++;
      }
    }
    return { kind: 'print', args };
  }

  private parseFor(): Stmt {
    this.eVal('FOR');
    const name = this.cur().value; this.p++;
    this.eType('OPERATOR'); // skip =
    const { expr: start, endPos: p1 } = parseExpression(this.tokens, this.p);
    this.p = p1;
    this.eVal('TO');
    const { expr: end, endPos: p2 } = parseExpression(this.tokens, this.p);
    this.p = p2;
    let step: Expr = { kind: 'number', value: 1 };
    if (this.v('STEP')) {
      this.eVal('STEP');
      const { expr, endPos } = parseExpression(this.tokens, this.p);
      this.p = endPos;
      step = expr;
    }
    return { kind: 'for', varName: name, startExpr: start, endExpr: end, stepExpr: step };
  }

  private parseIf(): Stmt {
    this.eVal('IF');
    const { expr: condition, endPos } = parseExpression(this.tokens, this.p);
    this.p = endPos;
    let thenBranch: Stmt[] = [];
    let elseBranch: Stmt[] | undefined;
    if (!this.v('THEN')) {
      return { kind: 'if', condition, thenBranch: [], elseBranch };
    }
    this.eVal('THEN');
    return { kind: 'if', condition, thenBranch, elseBranch };
  }

  private parseData(): Stmt {
    this.eVal('DATA');
    const values: DataValue[] = [];
    while (this.p < this.tokens.length && this.cur().type !== 'LINE_NUMBER' && !this.v('REM')) {
      if (this.is('STRING')) {
        values.push({ kind: 'string', val: this.cur().value }); this.p++;
      } else if (this.is('NUMBER')) {
        values.push({ kind: 'number', val: parseFloat(this.cur().value) }); this.p++;
      } else if (this.v(',')) {
        this.eVal(',');
      } else {
        this.p++;
      }
    }
    return { kind: 'data', values };
  }

  private parseDim(): Stmt {
    this.eVal('DIM');
    const declarations: Array<{ name: string; size: number }> = [];
    while (this.p < this.tokens.length) {
      if (this.is('IDENTIFIER')) {
        const name = this.cur().value;
        this.p++;
        let size = 10;
        if (this.is('LPAREN')) {
          this.eType('LPAREN');
          const { expr, endPos } = parseExpression(this.tokens, this.p);
          this.p = endPos;
          if (expr.kind === 'number') size = Math.floor(expr.value);
          if (this.is('RPAREN')) { this.eType('RPAREN'); }
        }
        declarations.push({ name, size });
      }
      if (this.is('COMMA')) { this.eType('COMMA'); continue; }
      break;
    }
    return { kind: 'dim', declarations };
  }

  private parseRead(): Stmt {
    this.eVal('READ');
    const targets: VarTarget[] = [];
    while (this.is('IDENTIFIER')) {
      targets.push(this.parseTarget());
      if (this.is('COMMA')) { this.eType('COMMA'); } else break;
    }
    return { kind: 'read', targets };
  }

  private parseInput(): Stmt {
    this.eVal('INPUT');
    let prompt: Expr | undefined;
    const targets: VarTarget[] = [];

    // Check for prompt (string literal)
    if (this.is('STRING')) {
      const { expr, endPos } = parseExpression(this.tokens, this.p);
      this.p = endPos;
      prompt = expr;
      if (this.v(';')) { this.eVal(';'); }
    }

    // Skip comma after prompt
    if (this.v(',')) { this.eVal(','); }

    // Parse target variables
    while (this.is('IDENTIFIER')) {
      targets.push(this.parseTarget());
      if (this.is('COMMA')) { this.eType('COMMA'); continue; }
      break;
    }

    return { kind: 'input', prompt, targets };
  }

  private parseRestore(): Stmt {
    this.eVal('RESTORE');
    let lineNumber: number | undefined;
    if (this.is('NUMBER')) {
      lineNumber = parseInt(this.cur().value);
      this.p++;
    }
    return { kind: 'restore', lineNumber };
  }

  private parseTarget(): VarTarget {
    const name = this.cur().value;
    this.p++;
    if (this.is('LPAREN')) {
      this.eType('LPAREN');
      const { expr: index, endPos } = parseExpression(this.tokens, this.p);
      this.p = endPos;
      if (this.is('RPAREN')) this.eType('RPAREN');
      return { kind: 'index', name, isString: name.includes('$'), index };
    }
    return { kind: 'scalar', name, isString: name.includes('$') };
  }
}

/** Parse a BASIC line into statements */
export function parseLine(code: string): Stmt[] {
  const parser = new LineParser(code);
  return parser.parseAll();
}

export { LineParser };
