// === C64 BASIC Tokenizer ===

export type TokenType =
  | 'LINE_NUMBER' | 'KEYWORD' | 'IDENTIFIER' | 'STRING' | 'NUMBER'
  | 'OPERATOR' | 'COMMA' | 'LPAREN' | 'RPAREN' | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
}

const KEYWORDS = new Set([
  'PRINT', 'LET', 'GOTO', 'GOSUB', 'RETURN', 'END', 'STOP', 'RUN', 'CLEAR', 'NEW',
  'FOR', 'NEXT', 'IF', 'THEN', 'ELSE', 'DIM', 'REM', 'DATA', 'READ', 'RESTORE',
  'INPUT', 'ON', 'FN', 'DEF', 'TO', 'STEP', 'AND', 'OR', 'NOT', 'XOR', 'MOD',
  'CONT', 'COLOR', 'BORDER',
  'ABS', 'SQR', 'RND', 'COS', 'SIN', 'TAN', 'ATN', 'LOG', 'EXP', 'FIX', 'INT',
  'LEN', 'LEFT$', 'RIGHT$', 'MID$', 'ASC', 'CHR$', 'VAL', 'STR$',
  'PEEK', 'POKE', 'SPACE$', 'STRING$', 'LTRIM$', 'RTRIM$', 'TRIM$',
  'TIME', 'TIMER', 'POS', 'FRE', 'LOF', 'SPC', 'TAB', 'USR', 'LINE',
]);

function isDigit(c: string) { return c >= '0' && c <= '9'; }
function isAlpha(c: string) { return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'); }
function isAlNum(c: string) { return isAlpha(c) || isDigit(c) || c === '_'; }

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    if (/\s/.test(code[i])) { i++; continue; }

    // String literal
    if (code[i] === '"') {
      let j = i + 1;
      let str = '';
      while (j < len) {
        if (code[j] === '"') {
          if (j + 1 < len && code[j + 1] === '"') { str += '"'; j += 2; continue; }
          break;
        }
        str += code[j];
        j++;
      }
      tokens.push({ type: 'STRING', value: str });
      i = j + 1;
      continue;
    }

    // Two-char operators
    if (i + 1 < len) {
      const two = code.substring(i, i + 2);
      if (two === '<>' || two === '<=' || two === '>=' || two === '==' || two === '||' || two === '&&') {
        const map: Record<string, string> = { '||': 'OR', '&&': 'AND' };
        tokens.push({ type: 'OPERATOR', value: map[two] || two });
        i += 2;
        continue;
      }
    }

    // Single-char operators
    if ('+-*/^=<>'.includes(code[i])) {
      tokens.push({ type: 'OPERATOR', value: code[i] });
      i++;
      continue;
    }

    if (code[i] === ',') { tokens.push({ type: 'COMMA', value: ',' }); i++; continue; }
    if (code[i] === '(') { tokens.push({ type: 'LPAREN', value: '(' }); i++; continue; }
    if (code[i] === ')') { tokens.push({ type: 'RPAREN', value: ')' }); i++; continue; }

    // Number
    if (isDigit(code[i]) && (i === 0 || !isAlNum(code[i - 1]))) {
      let j = i;
      while (j < len && isDigit(code[j])) j++;
      if (j < len && code[j] === '.') { j++; while (j < len && isDigit(code[j])) j++; }
      tokens.push({ type: 'NUMBER', value: code.substring(i, j) });
      i = j;
      continue;
    }

    // Identifier
    if (isAlpha(code[i]) || code[i] === '_') {
      let j = i;
      while (j < len && isAlNum(code[j])) j++;
      const word = code.substring(i, j).toUpperCase();
      if (KEYWORDS.has(word)) {
        // Only treat as keyword at statement boundaries
        const prev = tokens.length > 0 ? tokens[tokens.length - 1] : null;
        const boundary = !prev || prev.type === 'LINE_NUMBER' || prev.type === 'KEYWORD' ||
          prev.type === 'OPERATOR' || prev.type === 'LPAREN' || prev.type === 'COMMA' ||
          prev.type === 'RPAREN' || prev.type === 'STRING' || prev.type === 'NUMBER';
        if (boundary) {
          tokens.push({ type: 'KEYWORD', value: word });
        } else {
          tokens.push({ type: 'IDENTIFIER', value: word });
        }
      } else {
        tokens.push({ type: 'IDENTIFIER', value: word });
      }
      i = j;
      continue;
    }

    i++;
  }

  tokens.push({ type: 'EOF', value: '' });
  return tokens;
}
