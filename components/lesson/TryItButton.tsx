"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import styles from './try-it-button.module.css';
import { executeProgram } from '@/emulator/interpreter/executor';
import type { Stmt } from '@/emulator/interpreter/types';

interface TryItButtonProps {
  code?: string;
  onCodeChange?: (code: string) => void;
  autoLoad?: boolean;
}

interface TerminalLine {
  text: string;
  type: 'output' | 'input' | 'error' | 'info';
}

const MAX_OUTPUT_LINES = 50;

export function TryItButton({
  code: initialCode = '10 PRINT "HELLO WORLD"\n20 GOTO 10',
  onCodeChange,
  autoLoad = true,
}: TryItButtonProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inputBuffer, setInputBuffer] = useState('');
  const [inputPromise, setInputPromise] = useState<Promise<string> | null>(null);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll output
  useState(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  });

  // Resolve INPUT
  const pendingInputRef = useRef<((val: string) => void) | null>(null);

  const runCode = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setIsPaused(false);
    setOutput([]);

    try {
      // Parse the BASIC code into lines
      const lines = new Map<number, Stmt[]>();
      const codeLines = code.split('\n');
      let lineNum = 0;

      for (const rawLine of codeLines) {
        const trimmed = rawLine.trim();
        if (!trimmed) continue;

        const match = trimmed.match(/^(\d+)\s+(.*)/i);
        if (!match) continue;

        const num = parseInt(match[1]);
        const body = match[2].toUpperCase();

        // Create a simple statement
        let stmts: Stmt[] = [];

        if (body.startsWith('PRINT')) {
          // Extract PRINT arguments
          const content = body.substring(5).trim();
          args: (kind: 'separator' | 'expr' | 'tab', ch: string | number | null, expr?: any) => {
            if (content === '"' || content.startsWith('PRINT')) {
              const printStart = body.indexOf('PRINT');
              const afterPrint = body.substring(printStart + 5).trim();

              // Simple PRINT argument parser
              const args: any[] = [];
              let pos = 0;
              while (pos < afterPrint.length) {
                // Skip semicolons (separator)
                if (afterPrint[pos] === ';') {
                  args.push({ kind: 'separator', ch: ';' });
                  pos++;
                  continue;
                }
                // Skip colons (line separators)
                if (afterPrint[pos] === ':') {
                  break;
                }
                // Handle SPC/TAB
                if (afterPrint.substring(pos).startsWith('SPC(') || afterPrint.substring(pos).startsWith('TAB(')) {
                  const fnName = afterPrint.substring(pos).startsWith('SPC(') ? 'SPC' : 'TAB';
                  const parenStart = afterPrint.indexOf('(', pos);
                  const parenEnd = afterPrint.indexOf(')', parenStart);
                  if (parenEnd > parenStart) {
                    const val = afterPrint.substring(parenStart + 1, parenEnd);
                    args.push({ kind: 'tab', expr: { kind: 'number', value: parseInt(val) || 0 } } );
                    pos = parenEnd + 1;
                    continue;
                  }
                }
                // Handle string literals
                if (afterPrint[pos] === '"') {
                  const endQuote = afterPrint.indexOf('"', pos + 1);
                  if (endQuote > pos) {
                    const strContent = afterPrint.substring(pos + 1, endQuote);
                    args.push({ kind: 'expr', expr: { kind: 'string', value: strContent } });
                    pos = endQuote + 1;
                    continue;
                  }
                }
                pos++;
              }

              lineNum = num;
              stmts = [{
                kind: 'print',
                args: args.length > 0 ? args : [] as any,
              }];
            } else {
              lineNum = num;
              stmts = [{ kind: 'unknown', text: body }];
            }
          }
        } else if (body.startsWith('GOTO')) {
          const target = parseInt(body.substring(4).trim()) || num + 10;
          lineNum = num;
          stmts = [{ kind: 'goto', lineNumber: target }];
        } else if (body.startsWith('GOSUB')) {
          const target = parseInt(body.substring(5).trim()) || num + 10;
          lineNum = num;
          stmts = [{ kind: 'gosub', lineNumber: target }];
        } else if (body.startsWith('REM')) {
          lineNum = num;
          stmts = [{ kind: 'rem' }];
        } else if (body.startsWith('END') || body.startsWith('STOP')) {
          lineNum = num;
          stmts = [{ kind: 'stop' }];
        } else if (body.startsWith('INPUT')) {
          lineNum = num;
          stmts = [{ kind: 'input', prompt: { kind: 'string', value: 'OK?' }, targets: [] as any }];
        } else if (body.startsWith('LET')) {
          lineNum = num;
          stmts = [{ kind: 'unknown', text: body }];
        } else if (body.startsWith('FOR')) {
          lineNum = num;
          stmts = [{ kind: 'unknown', text: body }];
        } else if (body.startsWith('NEXT')) {
          lineNum = num;
          stmts = [{ kind: 'unknown', text: body }];
        } else if (body.startsWith('DIM')) {
          lineNum = num;
          stmts = [{ kind: 'dim', declarations: [] as any }];
        } else if (body.startsWith('DATA')) {
          lineNum = num;
          stmts = [{ kind: 'data', values: [] as any }];
        } else if (body.startsWith('READ')) {
          lineNum = num;
          stmts = [{ kind: 'read', targets: [] as any }];
        } else if (body.startsWith('IF')) {
          lineNum = num;
          stmts = [{ kind: 'if', condition: { kind: 'number', value: 0 } as any, thenBranch: [] as any }];
        } else if (body.startsWith('FOR')) {
          lineNum = num;
          stmts = [{ kind: 'unknown', text: body }];
        } else if (body.startsWith('RETURN')) {
          lineNum = num;
          stmts = [{ kind: 'return' }];
        } else if (body.startsWith('GOTO')) {
          lineNum = num;
          stmts = [{ kind: 'goto', lineNumber: num + 10 }];
        } else if (body.startsWith('IF')) {
          lineNum = num;
          stmts = [{ kind: 'if', condition: { kind: 'number', value: 0 }, thenBranch: [] as any, elseBranch: [] as any }];
        } else {
          lineNum = num;
          stmts = [{ kind: 'unknown', text: body }];
        }

        lines.set(num, stmts);
      }

      const outputLines: TerminalLine[] = [];

      // Execute
      const result = await executeProgram({
        lines,
        onPrint: (line: string) => {
          outputLines.push({ text: line, type: 'output' });
        },
        onError: (msg: string) => {
          outputLines.push({ text: `>> ERROR: ${msg}`, type: 'error' });
        },
        onInput: async (prompt: string) => {
          // Signal that we need input
          setIsPaused(true);
          setInputBuffer('');
          // Wait for user to type and press Enter
          return new Promise<string>((resolve) => {
            pendingInputRef.current = resolve;
          });
        },
        startLine: 1,
      });

      // result is string[] from executeProgram
      if (result.length > 0) {
        outputLines.push(...result.map((o: string) => ({ text: o, type: 'output' as const })));
      }

      setOutput(outputLines);
    } catch (err: any) {
      setOutput(prev => [
        ...prev,
        { text: `>> ERROR: ${err.message || String(err)}`, type: 'error' },
      ]);
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning]);

  const handleInputSubmit = useCallback(() => {
    if (inputBuffer && pendingInputRef.current) {
      pendingInputRef.current(inputBuffer);
      pendingInputRef.current = null;
      setInputBuffer('');
      setIsPaused(false);
    }
  }, [inputBuffer]);

  const handleCopy = useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [code]);

  return (
    <div className={styles.container}>
      {/* Try It Button / Load Button */}
      <div className={styles.badgeRow}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>🖥️</span>
          <span className={styles.badgeLabel}>TRY IT IN EMULATOR</span>
        </div>

        <button
          className={`${styles.runButton} ${isRunning ? styles.running : ''}`}
          onClick={() => !isRunning && runCode()}
          disabled={isRunning}
          style={{ cursor: isRunning ? 'not-allowed' : 'pointer' }}
        >
          {isRunning ? '⏳ Running...' : '▶ Run'}
        </button>

        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? '✓' : '\uD83D\uDCCB'}
        </button>
      </div>

      {/* Code Editor Area */}
      <div className={styles.codeArea}>
        <pre className={styles.codePre}>
          <code>
            {code.split('\n').map((line, i) => (
              <span key={i}>
                {line || <span className={styles.emptyLine}>{'\u00B7'}</span>}
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>

      {/* C64 Terminal Output */}
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.terminalTitle}>C64 BASIC — OUTPUT</span>
          <span className={styles.terminalStatus}>
            {isRunning ? 'RUNNING' : isPaused ? 'INPUT NEEDED' : 'READY'}
          </span>
        </div>

        <div ref={outputRef} className={styles.terminalBody}>
          {output.length === 0 ? (
            <div className={styles.noOutput}>Press <span className={styles.key}>▶</span> to run</div>
          ) : (
            output.map((line, i) => {
              const isError = line.type === 'error';
              const isInput = line.type === 'input';
              const isInfo = line.type === 'info';
              return (
                <div
                  key={i}
                  className={`${styles.line} ${isError ? styles.errorLine : ''} ${isInfo ? styles.infoLine : ''}`}
                >
                  {isError && <span className={styles.errorPrefix}>&gt;&gt; ERROR:</span>}
                  <span className={styles.lineText}>{line.text}</span>
                </div>
              );
            })
          )}

          {/* INPUT prompt */}
          {isPaused && (
            <div className={styles.inputRow}>
              <span className={styles.cursor}>_</span>
              <span className={styles.inputPrompt}>INPUT &gt;&gt;</span>
              <input
                ref={inputRef}
                className={styles.inputField}
                type="text"
                value={inputBuffer}
                onChange={e => setInputBuffer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInputSubmit()}
                placeholder="Type your response here..."
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* C64 Frame decoration */}
      <div className={styles.frame}>
        <div className={styles.frameTopLeft}>┌</div>
        <div className={styles.frameTopRight}>┐</div>
        <div className={styles.frameBottomLeft}>└</div>
        <div className={styles.frameBottomRight}>┘</div>
      </div>
    </div>
  );
}

export default TryItButton;