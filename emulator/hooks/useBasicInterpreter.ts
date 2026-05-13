// === useBasicInterpreter Hook ===
// Wraps the C64 BASIC interpreter for React components

import { useState, useCallback, useRef } from 'react';
import type { Stmt } from '../interpreter/types';

export interface UseInterpreterReturn {
  /** Set of lines: lineNumber -> statements */
  lines: Map<number, Stmt[]>;
  /** Execution output buffer */
  output: string[];
  /** Current output (for rendering) */
  currentOutput: string;
  /** Whether code is currently executing */
  isRunning: boolean;
  /** Last error message (or null) */
  error: string | null;
  /** Whether execution paused for INPUT */
  inputNeeded: boolean | null;
  /** Execute the program */
  run: (code: string) => Promise<void>;
  /** Clear output */
  clearOutput: () => void;
  /** Handle INPUT response */
  respondInput: (answer: string) => Promise<void>;
  /** Get output as a formatted string */
  getOutputString: () => string;
}

interface ProgramLines {
  [key: number]: string;
}

/** Convert BASIC source code string to a map of lineNumber -> statements */
function parseSourceToStatements(code: string): Map<number, Stmt[]> {
  const result = new Map<number, Stmt[]>();

  for (const line of code.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Extract line number
    const match = trimmed.match(/^(\d+)\s+(.*)$/);
    if (!match) continue;

    const lineNum = parseInt(match[1]);
    const body = match[2].toUpperCase();

    result.set(lineNum, [{
      kind: 'unknown',
      text: body,
    }]);
  }

  return result;
}

/** Execute a program, capturing output and errors */
async function executeProgram(
  program: { [key: number]: string },
  opts?: {
    onPrint?: (line: string) => void;
    onError?: (msg: string) => void;
    onInput?: (prompt: string) => Promise<string>;
  },
): Promise<{
  success: boolean;
  output: string[];
  error?: string;
  halted: boolean;
  inputNeeded?: boolean;
}> {
  const onPrint = opts?.onPrint || ((line: string) => {});
  const onError = opts?.onError || ((msg: string) => {});
  const onInput = opts?.onInput || (async () => '');

  const output: string[] = [];
  let halted = false;
  let inputPaused = false;
  let pausedLine = 0;

  // Simple line-by-line execution (simplified for now)
  // A full implementation would parse tokens and evaluate expressions
  let currentLine = 0;
  let maxStmts = 10000;
  let stmts = 0;

  while (stmts < maxStmts) {
    stmts++;

    const lineStr = program[currentLine];
    if (!lineStr) continue;

    const trimmed = lineStr.toUpperCase().trim();
    if (!trimmed) {
      currentLine++;
      continue;
    }

    const match = trimmed.match(/^(\d+)\s+(.*)$/);
    if (!match) {
      currentLine++;
      continue;
    }

    const _lineNum = parseInt(match[1]);
    const body = match[2];

    if (body.startsWith('PRINT')) {
      // Simplified PRINT: extract content between quotes
      const content = extractPrintContent(body);
      output.push(content);
      onPrint(content);
    } else if (body.startsWith('GOTO')) {
      const target = parseInt(body.replace('GOTO', '').trim());
      currentLine = target;
      continue;
    } else if (body.startsWith('GOSUB')) {
      pausedLine = currentLine;
      const target = parseInt(body.replace('GOSUB', '').trim());
      currentLine = target;
      continue;
    } else if (body.startsWith('INPUT')) {
      // Pause for user input
      const prompt = extractPrompt(body);
      inputPaused = true;
      pausedLine = currentLine;

      const answer = await onInput(prompt + ' ');
      if (answer) {
        // Store answer in a variable (simplified: line input)
        output.push('[INPUT: ' + answer + ']');
      }
    } else if (body.startsWith('REM')) {
      // No-op
    } else if (body.startsWith('END') || body.startsWith('STOP')) {
      halted = true;
      break;
    } else if (body.startsWith('DATA')) {
      // Store data values for READ
    } else if (body.startsWith('READ')) {
      // Read from data
    } else {
      // Unknown statement
      onError('WARNING: UNKNOWN STATEMENT: ' + trimmed);
    }

    currentLine++;
  }

  if (stmts >= maxStmts) {
    output.push('[LOOP DETECTED]');
    halted = true;
  }

  return {
    success: true,
    output,
    halted,
    inputNeeded: inputPaused,
  };
}

/** Extract print content from PRINT statement */
function extractPrintContent(body: string): string {
  const printStart = body.indexOf('PRINT');
  const content = body.substring(printStart + 5).trim();

  if (!content) return '';

  // Check for string literal
  if (content.startsWith('"')) {
    const end = content.indexOf('"', 1);
    return end > 0 ? content.substring(1, end) : content.substring(1);
  }

  // Otherwise it's an expression — for now, just pass through
  return content;
}

/** Extract prompt from INPUT statement */
function extractPrompt(body: string): string {
  const inputStart = body.indexOf('INPUT');
  const content = body.substring(inputStart + 5).trim();

  if (!content) return 'OK?';

  if (content.startsWith('"')) {
    const end = content.indexOf('"', 1);
    return end > 0 ? content.substring(1, end) : content.substring(1);
  }

  return content;
}

/** Hook state interface */
export interface InterpreterState {
  output: string[];
  currentOutput: string;
  isRunning: boolean;
  error: string | null;
  inputNeeded: boolean | null;
  pausedLine: string | null;
}

/** React hook to wrap the BASIC interpreter */
export function useBasicInterpreter(): UseInterpreterReturn {
  const [state, setState] = useState<InterpreterState>({
    output: [],
    currentOutput: '',
    isRunning: false,
    error: null,
    inputNeeded: null,
    pausedLine: null,
  });

  const [pausedLineNum, setPausedLineNum] = useState<number | null>(null);
  const [pausedProgram, setPausedProgram] = useState<ProgramLines | null>(null);
  const onInputRef = useRef<((value: string | PromiseLike<string>) => void) | null>(null);

  /** Execute BASIC code */
  const run = useCallback(async (code: string) => {
    setState(prev => ({ ...prev, isRunning: true, error: null, output: [], currentOutput: '' }));

    // Parse code into program lines
    const program: ProgramLines = {};
    const lines = code.split('\n');
    for (const line of lines) {
      const match = line.trim().match(/^(\d+)\s+(.*)$/);
      if (match) {
        const num = parseInt(match[1]);
        program[num] = match[2].trim();
      }
    }

    if (Object.keys(program).length === 0) {
      setState(prev => ({
        ...prev,
        isRunning: false,
        error: 'No valid BASIC lines found',
      }));
      return;
    }

    // Capture output
    let capturedOutput: string[] = [];
    const handlePrint = (line: string) => {
      capturedOutput.push(line + '\n');
    };

    // Wait for user input function
    const waitForInput = (): Promise<string> => {
      return new Promise((resolve) => {
        onInputRef.current = resolve;
      });
    };

    try {
      const result = await executeProgram(program, {
        onPrint: handlePrint,
        onError: (msg: string) => {
          setState(prev => ({ ...prev, error: msg }));
        },
        onInput: waitForInput,
      });

      capturedOutput.push('[END]\n');

      setState(prev => ({
        ...prev,
        isRunning: false,
        error: result.error || null,
        output: capturedOutput,
        currentOutput: capturedOutput.join(''),
        inputNeeded: result.inputNeeded ? result.inputNeeded : null,
        pausedLine: result.inputNeeded ? String(pausedLineNum) : null,
      }));
    } catch (e: any) {
      setState(prev => ({
        ...prev,
        isRunning: false,
        error: e.message || 'Unknown error',
        output: capturedOutput,
        currentOutput: capturedOutput.join(''),
      }));
    }
  }, [pausedLineNum]);

  /** Clear output */
  const clearOutput = useCallback(() => {
    setState(prev => ({
      ...prev,
      output: [],
      currentOutput: '',
      error: null,
      inputNeeded: null,
      pausedLine: null,
    }));
  }, []);

  /** Respond to pause for input */
  const respondInput = useCallback(async (answer: string) => {
    // This would signal the wait for input
    setState(prev => ({
      ...prev,
      inputNeeded: false,
      error: null,
      output: [...prev.output, answer],
      currentOutput: prev.currentOutput + answer,
    }));
  }, []);

  /** Get output as formatted string */
  const getOutputString = useCallback((): string => {
    return state.currentOutput;
  }, [state.currentOutput]);

  return {
    lines: new Map(), // Simplified - full parsing done by executeProgram
    output: state.output,
    currentOutput: state.currentOutput,
    isRunning: state.isRunning,
    error: state.error,
    inputNeeded: state.inputNeeded,
    run,
    clearOutput,
    respondInput,
    getOutputString,
  };
}