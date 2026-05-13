// === C64 BASIC Expr Parser (recursive descent) ===

import type { Expr, Stmt, VarTarget } from './types.js';
import type { Token, TokenType } from './tokenizer.js';
import { parseExpression as parseExpr } from './parser.js';

// --- Expression parsers ---

type ExprParserType = any;

/** Parse OR, AND, comparison, concat, add/sub, mul/div, power, unary, primary */
class ExprParser {
  private tokens: Token[];
  p = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private cur(): Token {
    return this.tokens[this.p] || { type: 'EOF', value: '' };
  }

  private is(t: TokenType): boolean {
    return this.cur().type === t;
  }

  private v(val: string): boolean {
    const c = this.cur();
    return c.type !== 'EOF' && c.value.toUpperCase() === val.toUpperCase();
  }

  /** OR */
  or(): Expr {
    let l = this.and();
    while (this.v('OR')) {
      this.p++;
      l = { kind: 'binaryOp', op: 'OR', left: l, right: this.and() };
    }
    return l;
  }

  /** AND */
  and(): Expr {
    let l = this.cmp();
    while (this.v('AND')) {
      this.p++;
      l = { kind: 'binaryOp', op: 'AND', left: l, right: this.cmp() };
    }
    return l;
  }

  /** Comparison: = <> < <= > >= */
  cmp(): Expr {
    let l = this.concat();
    while (true) {
      const v = this.cur().value;
      if (v === '=' || v === '<>' || v === '<=' || v === '==' || v === '>' || v === '>=') {
        this.p++;
        l = { kind: 'binaryOp', op: v === '==' ? '=' : v, left: l, right: this.concat() };
      } else {
        break;
      }
    }
    return l;
  }

  /** Concat (&) */
  concat(): Expr {
    let l = this.add();
    while (this.v('&')) {
      this.p++;
      l = { kind: 'binaryOp', op: '&', left: l, right: this.add() };
    }
    return l;
  }

  /** Add/Sub */
  add(): Expr {
    let l = this.mul();
    while (this.cur().value === '+' || this.cur().value === '-') {
      const op = this.cur().value;
      this.p++;
      l = { kind: 'binaryOp', op, left: l, right: this.mul() };
    }
    return l;
  }

  /** Mul/Div (integer division) */
  mul(): Expr {
    let l = this.pow();
    while (this.cur().value === '*' || this.cur().value === '/' || this.cur().value === '\\') {
      const op = this.cur().value;
      this.p++;
      l = { kind: 'binaryOp', op, left: l, right: this.pow() };
    }
    return l;
  }

  /** Power (^) */
  pow(): Expr {
    let l = this.unary();
    if (this.v('^')) {
      this.p++;
      l = { kind: 'binaryOp', op: '^', left: l, right: this.pow() };
    }
    return l;
  }

  /** Unary: NOT, - */
  unary(): Expr {
    if (this.v('NOT')) {
      this.p++;
      const operand = this.pow();
      return { kind: 'unaryOp', op: 'NOT', operand };
    }
    if (this.cur().value === '-') {
      this.p++;
      const operand = this.pow();
      return { kind: 'unaryOp', op: '-', operand };
    }
    return this.primary();
  }

  /** Primary: number, string, variable, function, array, paren */
  primary(): Expr {
    const cur = this.cur();

    if (cur.type === 'NUMBER') {
      const v = parseFloat(cur.value);
      this.p++;
      return { kind: 'number', value: v };
    }

    if (cur.type === 'STRING') {
      const v = cur.value;
      this.p++;
      return { kind: 'string', value: v };
    }

    if (cur.type === 'IDENTIFIER' || cur.type === 'KEYWORD') {
      const name = cur.value;
      this.p++;

      // Function call
      if (this.is('LPAREN')) {
        this.p++;
        const args: Expr[] = [];
        if (!this.is('RPAREN')) {
          args.push(this.or());
          while (this.is('COMMA')) {
            this.p++;
            args.push(this.or());
          }
        }
        if (this.is('RPAREN')) {
          this.p++;
        }
        return { kind: 'function', name, args };
      }

      // Array
      if (this.is('LPAREN')) {
        this.p++;
        const index = this.or();
        if (this.is('RPAREN')) {
          this.p++;
        }
        return { kind: 'array', name, isString: name.includes('$'), index };
      }

      // Just a variable
      return { kind: 'variable', name, isString: name.includes('$') };
    }

    if (this.is('LPAREN')) {
      this.p++;
      const e = this.or();
      if (this.is('RPAREN')) {
        this.p++;
      }
      return { kind: 'paren', expr: e };
    }

    // Can't parse
    this.p++;
    return { kind: 'undefined' };
  }

  /** Top-level parse */
  parse(): Expr {
    return this.or();
  }
}

/** Parse an expression from a token stream, starting at position p */
export function parseExpression(tokens: Token[], p = 0): { expr: Expr; endPos: number } {
  const parser = new ExprParser(tokens);
  parser.p = p;
  const expr = parser.parse();
  return { expr, endPos: parser.p };
}

/** Get the variable name (first char) */
export function targetName(t: { name: string }): string {
  return t.name.charAt(0).toUpperCase();
}

export { ExprParser };