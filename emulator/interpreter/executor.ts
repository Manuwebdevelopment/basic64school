// === C64 BASIC Statement Executor ===
// Runs parsed statements step-by-step.

import type {
  Stmt,
  PrintArg,
  ExecutionContext,
  ProgramLine,
  Expr,
  VarTarget,
  DataValue,
} from './types';
import { toC64Str, c64StringCompare } from './expr-eval';
import { ExprEval } from './expr-eval';

// ─── Execute the entire program ─────────────────────────────────

export interface ExecOptions {
  lines: Map<number, Stmt[]>;
  onPrint?: (line: string) => void;
  onInput?: (prompt: string) => Promise<string>;
  onError?: (detail?: string) => void;
  startLine?: number;
  maxLines?: number;
}

interface InputPending {
  resolve: (s: string) => void;
}

export async function executeProgram(opts: ExecOptions): Promise<string[]> {
  const onPrint = opts.onPrint ?? (() => {});
  const onInput = opts.onInput ?? ((prompt: string) => Promise.resolve(''));
  const onError = opts.onError ?? (() => {});
  const startLine = opts.startLine ?? 1;

  let lines = opts.lines;

  // Find lowest line > 0
  let firstLine = -1;
  for (const k of lines.keys()) {
    if (k > 0 && (firstLine < 0 || k < firstLine)) firstLine = k;
  }
  if (firstLine < 0) firstLine = startLine;

  let lineNum = firstLine;
  let inputPending: InputPending | null = null;
  let loopCount = 0;
  const maxLines = opts.maxLines ?? 10000;

  const ctx: ExecutionContext = {
    variables: new Map(),
    arrays: new Map(),
    data: [],
    dataPos: 0,
    stack: [],
    output: [],
  };

  const ee = new ExprEval(ctx.variables, ctx.arrays);

  while (loopCount < maxLines) {
    loopCount++;

    // Wait for user input if paused
    if (inputPending) {
      const response = await onInput(lineNum.toString());
      inputPending.resolve(response);
      inputPending = null;
    }

    const stmts = lines.get(lineNum);
    if (!stmts) {
      lineNum++;
      continue;
    }

    for (let i = 0; i < stmts.length; i++) {
      const j = await executeStmt(stmts[i], lineNum, (line) => {
        onPrint(line);
        ctx.output.push(line);
      }, (msg) => {
        onError(msg);
        return null;
      }, ee, ctx, (prompt: string): Promise<string> => {
        return new Promise<string>((resolve) => {
          if (inputPending) {
            inputPending.resolve(prompt);
          }
          inputPending = { resolve };
        });
      }, lines);

      if (j === null) {
        // halt
        return ctx.output;
      }
      if (typeof j === 'number') {
        lineNum = j;
        break; // re-evaluate same line (for GOTO)
      }
      // 0 = continue to next stmt on this line
    }
    if (inputPending) {
      // Already waiting for input in the above loop, skip lineNum++
      // The outer loop handles it
    } else {
      lineNum++;
    }
  }

  onError('LOOOP DETECTED — MAX LINES REACHED');
  return ctx.output;
}

// ─── Execute one statement ─────────────────────────────────

async function executeStmt(
  stmt: Stmt,
  lineNum: number,
  onPrint: (line: string) => void,
  onError: (msg: string) => void,
  ee: ExprEval,
  ctx: ExecutionContext,
  onInput: (prompt: string) => Promise<string>,
  lines: Map<number, Stmt[]>,
): Promise<number | 0 | null> {
  // 0 = continue, >0 = goto target, null = halt

  switch (stmt.kind) {
    case 'print': {
      const result = await execPrint(stmt.args, onInput, ee);
      onPrint(result);
      ctx.output.push(result);
      return 0;
    }

    case 'goto': {
      const target = stmt.lineNumber;
      if (!lines.has(target)) {
        onError(`LINE ${target} NOT FOUND`);
        return null;
      }
      return target;
    }

    case 'gosub': {
      ctx.stack.push(lineNum);
      const target = stmt.lineNumber;
      if (!lines.has(target)) {
        onError(`LINE ${target} NOT FOUND`);
        return null;
      }
      return target;
    }

    case 'return': {
      if (ctx.stack.length === 0) {
        onError('RETURN WITHOUT GOSUB');
        return null;
      }
      return ctx.stack.pop()!;
    }

    case 'stop': {
      onError('STOP');
      return null;
    }

    case 'rem':
      return 0;

    case 'let': {
      const val = await ee.eval(stmt.expr);
      ctx.variables.set(stmt.target.name[0].toUpperCase(), stmt.target.isString ? String(val) : ee.toNum(val));
      return 0;
    }

    case 'for': {
      // Parse FOR variables: NEXT will handle continuation
      // For now store loop info (simplification)
      const start = await ee.evalNumber(stmt.startExpr);
      if (ctx.variables.size < 100) {
        // Store loop vars
        ctx.variables.set(stmt.varName[0].toUpperCase() + 'LOOP', start);
      }
      return 0;
    }

    case 'if': {
      const cond = await ee.eval(stmt.condition);
      if (ee.toNum(cond) !== 0) {
        return await execBranch(stmt.thenBranch, lineNum, onPrint, onError, ee, ctx, onInput, lines);
      } else if (stmt.elseBranch) {
        return await execBranch(stmt.elseBranch, lineNum, onPrint, onError, ee, ctx, onInput, lines);
      }
      return 0;
    }

    case 'dim': {
      for (const decl of stmt.declarations) {
        ctx.arrays.set(decl.name[0].toUpperCase(), new Map());
      }
      return 0;
    }

    case 'data': {
      // Data is stored inline in the source — simplified here
      return 0;
    }

    case 'read': {
      for (const target of stmt.targets) {
        if (ctx.dataPos >= ctx.data.length) {
          onError('OUT OF DATA');
          return null;
        }
        const dv = ctx.data[ctx.dataPos];
        ctx.dataPos++;
        ctx.variables.set(target.name[0].toUpperCase(), dv.kind === 'string' ? dv.val : dv.val);
      }
      return 0;
    }

    case 'restore': {
      ctx.dataPos = stmt.lineNumber ?? 0;
      return 0;
    }

    case 'input': {
      const prompt = stmt.prompt ? String(await ee.eval(stmt.prompt)) : 'OK?';
      const response = await onInput(prompt + ' ');
      for (const target of stmt.targets ?? []) {
        ctx.variables.set(target.name[0].toUpperCase(), target.isString ? response : parseFloat(response));
      }
      // Pause for input — return the current line number to wait
      throw new Error('INPUT:PAUSE:' + lineNum);
    }

    case 'clear': {
      ctx.variables.clear();
      ctx.arrays.clear();
      ctx.data = [];
      ctx.dataPos = 0;
      ctx.stack = [];
      onError('CLEAR');
      return 0;
    }

    case 'new': {
      ctx.variables.clear();
      ctx.arrays.clear();
      ctx.data = [];
      ctx.dataPos = 0;
      ctx.stack = [];
      onError('NEW');
      return null;
    }

    case 'unknown': {
      onError('UNKNOWN: ' + stmt.text);
      return 0;
    }
  }
}

async function execBranch(
  branch: Stmt[],
  lineNum: number,
  onPrint: (line: string) => void,
  onError: (msg: string) => void,
  ee: ExprEval,
  ctx: ExecutionContext,
  onInput: (prompt: string) => Promise<string>,
  lines: Map<number, Stmt[]>,
): Promise<number | 0 | null> {
  for (const stmt of branch) {
    const result = await executeStmt(stmt, lineNum, onPrint, onError, ee, ctx, onInput, lines);
    if (result === null) return null;
    if (typeof result === 'number') return result;
  }
  return 0;
}

async function execPrint(args: PrintArg[], onInput: (prompt: string) => Promise<string>, ee: ExprEval): Promise<string> {
  let text = '';
  let col = 0;

  for (const arg of args) {
    if (arg.kind === 'separator') {
      if (arg.ch === ',') {
        const zone = Math.floor(col / 14);
        const target = (zone + 1) * 14;
        while (col < target && col < 40) {
          text += ' ';
          col++;
        }
      }
      continue;
    }

    if (arg.kind === 'tab') {
      const pos = await ee.evalNumber(arg.expr);
      col += Math.floor(pos);
      while (text.length < col) {
        text += ' ';
      }
      continue;
    }

    // It's an Expr
    const val = await ee.eval(arg);
    const s = typeof val === 'string' ? val : toC64Str(ee.toNum(val));
    text += s;
    col += s.length;
  }

  return text;
}
