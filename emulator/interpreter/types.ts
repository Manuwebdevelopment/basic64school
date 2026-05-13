// === Type definitions for the C64 BASIC interpreter ===

export interface DataValue {
  kind: 'string' | 'number';
  val: string | number;
}

// Expression types
export type Expr =
  | { kind: 'number'; value: number }
  | { kind: 'string'; value: string }
  | { kind: 'variable'; name: string; isString: boolean }
  | { kind: 'array'; name: string; isString: boolean; index: Expr }
  | { kind: 'function'; name: string; args: Expr[] }
  | { kind: 'binaryOp'; op: string; left: Expr; right: Expr }
  | { kind: 'unaryOp'; op: string; operand: Expr }
  | { kind: 'paren'; expr: Expr }
  | { kind: 'undefined' };

// Variable target
export type VarTarget =
  | { kind: 'scalar'; name: string; isString: boolean }
  | { kind: 'index'; name: string; isString: boolean; index: Expr };

// Statement types
export type PrintArg = Expr | { kind: 'separator'; ch: ';' | ',' } | { kind: 'tab'; expr: Expr };

export type Stmt =
  | { kind: 'print'; args: PrintArg[] }
  | { kind: 'goto'; lineNumber: number }
  | { kind: 'gosub'; lineNumber: number }
  | { kind: 'return' }
  | { kind: 'for'; varName: string; startExpr: Expr; endExpr: Expr; stepExpr: Expr }
  | { kind: 'if'; condition: Expr; thenBranch: Stmt[]; elseBranch?: Stmt[] }
  | { kind: 'let'; target: VarTarget; expr: Expr }
  | { kind: 'rem' }
  | { kind: 'dim'; declarations: Array<{ name: string; size: number }> }
  | { kind: 'data'; values: DataValue[] }
  | { kind: 'read'; targets: VarTarget[] }
  | { kind: 'restore'; lineNumber?: number }
  | { kind: 'input'; prompt?: Expr; targets: VarTarget[] }
  | { kind: 'stop' }
  | { kind: 'clear' }
  | { kind: 'new' }
  | { kind: 'unknown'; text: string };

// Program line
export interface ProgramLine {
  lineNumber: number;
  stmts: Stmt[];
}

// Result of execution
export interface ExecutionContext {
  variables: Map<string, number | string>;
  arrays: Map<string, Map<number, number | string>>;
  data: DataValue[];
  dataPos: number;
  stack: number[]; // subroutine call stack
  output: string[];
}

export interface InterpreterState {
  lines: Map<number, Stmt[]>; // lineNumber -> statements
}
