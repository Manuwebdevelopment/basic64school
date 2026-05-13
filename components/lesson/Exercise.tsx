"use client";

import { useState, useCallback } from 'react';
import styles from './exercise.module.css';
import type { Stmt } from '@/emulator/interpreter/types';

export interface ExerciseStep {
  id: number;
  description: string;
  instruction: string;
  expectedOutput: string;
  userInput?: string;
  isComplete: boolean;
  isSubmitted: boolean;
  isRunning?: boolean;
  feedback?: string;
}

interface ExerciseProps {
  steps: ExerciseStep[];
  title: string;
  showAnswer?: boolean;
  onSubmit?: (stepData: ExerciseStep) => void;
}

// Simple BASIC runner to capture output
async function runBASIC(code: string): Promise<{ output: string[]; error: string | null }> {
  const output: string[] = [];

  if (!code || !code.trim()) {
    return { output: ['(empty program)'], error: null };
  }

  // Parse BASIC lines & execute PRINT statements
  const lines = new Map<number, Stmt[]>();
  const codeLines = code.split('\n');

  for (const rawLine of codeLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(\d+)\s+(.*)/i);
    if (!match) continue;

    const num = parseInt(match[1]);
    const body = match[2].toUpperCase();

    if (body.startsWith('PRINT')) {
      const afterPrint = body.substring(5).trim();
      if (afterPrint.startsWith('"')) {
        const endQuote = afterPrint.indexOf('"', 1);
        if (endQuote > 0) {
          output.push(afterPrint.substring(1, endQuote));
          continue;
        }
      } else if (afterPrint === '') {
        output.push('(blank)');
      } else {
        output.push(afterPrint);
      }
    } else if (body.startsWith('REM') || body.startsWith('END') || body.startsWith('STOP') || body.startsWith('GOTO')) {
      // No-op for output
    } else if (num > 0) {
      output.push(`(line ${num}: action)`);
    }

    lines.set(num, [{ kind: 'unknown', text: body }]);
  }

  return {
    output: output.length > 0 ? output : ['(program ran — no output from PRINT)'],
    error: null,
  };
}

// Compare actual output vs expected
function resultsMatch(actual: string[], expected: string): boolean {
  const actualNorm = actual
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const expectedNorm = expected
    .trim()
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  if (actualNorm.length === 0) return false;

  const actualStr = actualNorm.join('\n').toLowerCase();
  const expectedStr = expectedNorm.join('\n').toLowerCase();

  // Check if expected string is contained in actual output
  if (actualStr === expectedStr) return true;
  if (actualStr.includes(expectedStr)) return true;
  if (expectedStr.includes(actualStr)) return true;

  // Check line by line
  for (const exp of expectedNorm) {
    let found = false;
    for (const act of actualNorm) {
      if (act === exp || act.toLowerCase() === exp.toLowerCase() || act.includes(exp) || exp.includes(act)) {
        found = true;
        break;
      }
    }
    if (!found) return false;
  }

  return expectedNorm.length > 0;
}

export function Exercise({
  steps: initialSteps,
  title,
  showAnswer = false,
  onSubmit,
}: ExerciseProps) {
  const [steps, setSteps] = useState(initialSteps);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleChange = useCallback((index: number, value: string) => {
    setSteps(prev => {
      const newSteps = [...prev];
      newSteps[index] = { ...newSteps[index], userInput: value };
      return newSteps;
    });
  }, []);

  const handleSubmitStep = useCallback(async (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step || !step.userInput?.trim() || step.isSubmitted) return;

    // Mark as running
    setSteps(prev => {
      const newSteps = [...prev];
      newSteps[stepIndex] = {
        ...newSteps[stepIndex],
        isSubmitted: true,
        isRunning: true,
        feedback: undefined,
        isComplete: false,
      };
      return newSteps;
    });

    // Wait a tick for React to update
    await new Promise(r => setTimeout(r, 300));

    try {
      const result = await runBASIC(step.userInput);

      const outputStr = result.output.join('\n');
      const isCorrect = resultsMatch(result.output, step.expectedOutput);

      const stepData: ExerciseStep = {
        ...step,
        isSubmitted: true,
        isComplete: isCorrect,
        feedback: isCorrect
          ? '✅ Correct! The program produces the expected output.'
          : `❌ Expected: ${step.expectedOutput}\nGot: ${outputStr}`,
        isRunning: false,
      };

      setSteps(prev => {
        const newSteps = [...prev];
        newSteps[stepIndex] = stepData;
        return newSteps;
      });

      onSubmit?.(stepData);
    } catch (err: any) {
      setSteps(prev => {
        const newSteps = [...prev];
        newSteps[stepIndex] = {
          ...newSteps[stepIndex],
          isSubmitted: true,
          feedback: `Error: ${err.message || String(err)}`,
          isRunning: false,
        };
        return newSteps;
      });
    }
  }, [steps, onSubmit]);

  const handleShowAnswer = useCallback(() => {
    setShowAllAnswers(true);
  }, []);

  const handleReset = useCallback(() => {
    setShowAllAnswers(false);
    setSteps(prev =>
      prev.map(step => ({
        ...step,
        userInput: undefined,
        isSubmitted: false,
        isComplete: false,
        feedback: undefined,
        isRunning: undefined,
      }))
    );
  }, []);

  const completedCount = steps.filter(s => s.isComplete && s.isSubmitted).length;

  return (
    <div className="c64-exercise" style={{ fontFamily: '"C64", "Courier New", monospace' }}>
      <div className="c64-exercise-border">
        {/* Header */}
        <div className="c64-exercise-header">
          <div className="c64-exercise-title">{title}</div>
          <div className="c64-exercise-meta">
            Step {completedCount}/{steps.length} Complete
          </div>
        </div>

        {/* Frame */}
        <div className="c64-exercise-frame">
          <div className="c64-frame-corner top-left">┌</div>
          <div className="c64-frame-corner top-right">┐</div>
          <div className="c64-frame-corner bottom-left">└</div>
          <div className="c64-frame-corner bottom-right">┘</div>
          <div className="c64-frame-line top">────────</div>
          <div className="c64-frame-line bottom">────────</div>
          <div className="c64-frame-line left">│</div>
          <div className="c64-frame-line right">│</div>

          {/* Step Indicators */}
          <div className="c64-step-indicator">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`c64-step ${step.isComplete ? 'c64-step-complete' : ''} ${step.isSubmitted ? 'c64-step-submitted' : ''}`}
              >
                <div className="c64-step-number">{step.id}</div>
                {step.isComplete && (
                  <div className="c64-step-checkmark">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="c64-exercise-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`c64-exercise-step ${step.isComplete ? 'c64-step-completed' : ''}`}
            >
              <div className="c64-step-label">Step {step.id}</div>
              <div className="c64-step-content">
                <div className="c64-step-instruction">{step.instruction}</div>
                <div className="c64-step-description">{step.description}</div>

                {/* Input */}
                <div className="c64-input-container">
                  <textarea
                    className="c64-input-field"
                    placeholder="Type your C64 BASIC code here..."
                    value={step.userInput || ''}
                    onChange={e => handleChange(index, e.target.value)}
                    disabled={step.isSubmitted}
                    rows={3}
                    style={{
                      fontFamily: '"C64", monospace',
                      background: '#000',
                      color: '#FFB8D4',
                      border: '1px solid #FFB8D4',
                      padding: '8px',
                      fontSize: '14px',
                    }}
                  />

                  {!step.isSubmitted && (
                    <button
                      className="c64-submit-button"
                      onClick={() => handleSubmitStep(index)}
                      style={{
                        background: '#FFB8D4',
                        color: '#000',
                        border: 'none',
                        padding: '6px 16px',
                        fontFamily: '"C64", monospace',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '8px',
                      }}
                    >
                      Check Answer
                    </button>
                  )}

                  {step.isSubmitted && (
                    <div
                      className={`c64-feedback ${step.isComplete ? 'c64-feedback-correct' : 'c64-feedback-incorrect'}`}
                      style={{
                        marginTop: '8px',
                        padding: '8px',
                        fontFamily: '"C64", monospace',
                        fontSize: '14px',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {step.feedback}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="c64-exercise-actions">
          <button
            className="c64-button-answer"
            onClick={handleShowAnswer}
            disabled={showAllAnswers}
            style={{
              background: '#1a1a1a',
              color: '#FFB8D4',
              border: '1px solid #FFB8D4',
              padding: '6px 16px',
              fontFamily: '"C64", monospace',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '12px',
            }}
          >
            Show Answer
          </button>

          <button
            className="c64-button-reset"
            onClick={handleReset}
            style={{
              background: '#1a1a1a',
              color: '#FFB8D4',
              border: '1px solid #FFB8D4',
              padding: '6px 16px',
              fontFamily: '"C64", monospace',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Reset Exercise
          </button>
        </div>

        {/* Answers */}
        {showAllAnswers && (
          <div className="c64-answer-box">
            <div className="c64-answer-title" style={{ color: '#FFB8D4' }}>
              Expected Answers:
            </div>
            {steps.map((step, index) => (
              <div key={step.id} style={{ padding: '4px 0' }}>
                <span style={{ color: '#FFB8D4' }}>
                  Step {step.id}:
                </span>{' '}
                <code style={{ color: '#98DFCA', fontFamily: 'monospace' }}>
                  {step.expectedOutput}
                </code>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;