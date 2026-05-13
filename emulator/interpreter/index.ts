// === C64 BASIC Interpreter — Barrel Export ===

export type {
  Expr,
  Stmt,
  VarTarget,
  DataValue,
  PrintArg,
  ProgramLine,
  ExecutionContext,
} from './types';

export { tokenize } from './tokenizer';
export { parseExpression, targetName } from './parser';
export { executeProgram } from './executor';

// Re-export expr-eval helpers (needed by consumers)
export {
  c64StringCompare,
  c64StringEquals,
  c64Abs,
  c64Int,
  c64Sgn,
  c64Sqr,
  c64Sin,
  c64Cos,
  c64Tan,
  c64Atn,
  c64Log,
  c64Exp,
  c64Fix,
  c64And,
  c64Or,
  c64Xor,
  c64Not,
  c64Bool,
  memoryPeek,
  memoryPoke,
  toC64Str,
  fromC64Num,
  ExprEval,
} from './expr-eval';

// NOTE: parseLine is available via statement-parser if needed
