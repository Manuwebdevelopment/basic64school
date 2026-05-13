/**
 * Lesson Renderer - Converts markdown lesson content to styled HTML
 * Uses custom C64 BASIC syntax highlighting and render C64-specific elements
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Lesson } from '../../types/lesson';

// C64 BASIC keywords for syntax highlighting
const C64_KEYWORDS = [
  'PRINT', 'LET', 'GOTO', 'FOR', 'NEXT', 'GOSUB', 'RETURN', 
  'IF', 'THEN', 'ELSE', 'ENDIF', 'DIM', 'REM', 'RUN', 'LIST', 
  'CLEAR', 'NEW', 'READ', 'DATA', 'POKE', 'PEEK', 'INKEY$',
  'INPUT', 'ON', 'END', 'STOP', 'RESTORE',
  'OPEN', 'CLOSE', 'GET$', 'PUT$', 'DEF', 'FN', 'CALL',
  'USING', 'DEFDBL', 'DEFSNG', 'DEFINT', 'DEFLNG'
];

const C64_FUNCTIONS = [
  'INT', 'STR$', 'LEFT$', 'RIGHT$', 'MID$', 'LEN', 'UCASE$',
  'LCASE$', 'VAL', 'SQR', 'ABS', 'SGN', 'COS', 'SIN', 'TAN',
  'ATN', 'EXP', 'LOG', 'FIX', 'Sgn', 'Int', 'Str$', 'LTrim$',
  'RTrim$', 'Trim$', 'Space$', 'TAB', 'CHR$', 'ASC', 'PEEK',
  'POKE', 'POS', 'FRE', 'LOF'
] as const;

const C64_OPERATORS = [
  '+', '-', '*', '/','<', '>', '<=', '>=', '='
] as const;

/**
 * Custom C64 BASIC code tokenizer
 * Parses BASIC code and generates tokens with proper styling
 */
function createC64Tokenizer(): { tokenize(code: string): string } {
  function tokenize(code: string): string {
    const lines = code.split('\n');
    let html = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Empty lines - just continue
      if (!line) {
        html += '<br>';
        continue;
      }
      
      // Comment lines (start with *)
      if (line.startsWith('*')) {
        html += `<div class="c64-line c64-comment">${line}</div><br><span style="color:var(--c64-gray)">^</span><br>\n`;
        continue;
      }
      
      // Regular code lines
      html += `<div class="c64-line">`;
      
      // Parse line with regex tokens
      let remaining = line;
      let lineHtml = '';
      
      while (remaining.length > 0) {
        // Skip leading whitespace
        if (/^\s/.test(remaining)) {
          remaining = remaining.substring(1);
          continue;
        }
        
        // String literal
        if (remaining.startsWith('"')) {
          const endQuote = remaining.indexOf('"', 1);
          if (endQuote !== -1) {
            lineHtml += `<span class="token-string">${remaining.substring(1, endQuote)}</span>`;
            remaining = remaining.substring(endQuote + 1);
            continue;
          }
        }
        
        // Identifier or keyword
        const wordMatch = remaining.match(/^([A-Z][A-Z0-9]*)/);
        if (wordMatch) {
          const word = wordMatch[1];
          remaining = remaining.substring(word.length);
          const nextChar = remaining.charAt(0);
          
          if (C64_KEYWORDS.includes(word as any)) {
            lineHtml += `<span class="token-keyword">${word}</span>`;
          } else if (C64_FUNCTIONS.includes(word as any)) {
            lineHtml += `<span class="token-function">${word}</span>`;
            // Check for parenthesis after function
            if (nextChar === '(') {
              lineHtml += '</span>';
              lineHtml += `<span class="token-operator">(</span>`;
              remaining = remaining.substring(1);
              continue;
            }
            continue;
          } else {
            // Variable (could be A-Z, A$-Z$)
            lineHtml += `<span class="token-variable">${word}</span>`;
            continue;
          }
        }
        
        // Number (including negative)
        const numberMatch = remaining.match(/^(-?[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)(?=\s*[+\-*/=<>:,()]|$)/);
        if (numberMatch) {
          const num = numberMatch[1];
          remaining = remaining.substring(num.length);
          const nextChar = remaining.charAt(0);
          
          // Check for operator after number
          if (/[(,+]/.test(nextChar && nextChar.charAt(0))) {
            remaining = remaining.substring(1);
            lineHtml += `<span class="token-operator">${nextChar}</span>`;
            continue;
          }
          
          lineHtml += `<span class="token-number">${num}</span>`;
          continue;
        }
        
        // Operators
        const ops = ['+', '-', '*', '/', '<', '>', '=', ':', ',',]
        
        const opMatch = remaining.match(/^([+\-*/=<>:,()])/);
        if (opMatch) {
          const op = opMatch[1];
          remaining = remaining.substring(op.length);
          lineHtml += `<span class="token-operator">${op}</span>`;
          continue;
        }
        
        // Default token (shouldn't happen in valid BASIC)
        lineHtml += remaining.charAt(0);
        remaining = remaining.substring(1);
      }
      
      // If empty, just add a break
      if (!lineHtml) {
        html += '</div><br>';
      } else {
        html += lineHtml + '</div><br>';
      }
    }
    
    return html.trim();
  }
  
  return { tokenize };
}

// Create singleton tokenizer
const C64Tokenizer = createC64Tokenizer();

/**
 * Parse a markdown lesson and extract its structured content
 */
export function parseLesson(content: string, filePath?: string): Lesson {
  // Extract metadata from frontmatter
  const frontmatterMatch = content.match(/^## Metadata[^]*?###/s);
  
  const defaultMetadata: Omit<Lesson, 'id' | 'body'> = {
    filePath: '',
    level: 0,
    lessonNumber: '0',
    title: 'Lesson',
    estimatedTime: '30 min',
    prerequisites: 'None',
    concepts: 'Basic concepts',
  };
  
  if (frontmatterMatch) {
    const lines = frontmatterMatch[0].split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.includes('|')) continue;
      
      const pipeIdx = trimmed.indexOf('|');
      const key = trimmed.substring(1, pipeIdx).replace(/\*\*/g, '').trim();
      const value = trimmed.substring(pipeIdx + 2).replace('*', '').trim();
      
      if (key.includes('Level')) {
        defaultMetadata.level = parseInt(value, 10);
      } else if (key.includes('Lesson Number')) {
        defaultMetadata.lessonNumber = value;
      } else if (key.includes('Estimated Time')) {
        defaultMetadata.estimatedTime = value;
      } else if (key.includes('Prerequisites')) {
        defaultMetadata.prerequisites = value;
      } else if (key.includes('Concepts')) {
        defaultMetadata.concepts = value;
      }
    }
  }
  
  // Extract title
  const titleMatch = content.match(/^#\s+(.+)/);
  defaultMetadata.title = titleMatch ? titleMatch[1] : defaultMetadata.title;
  
  // Extract main content (everything after '## Theory' and before '## Summary')
  const theoryIdx = content.indexOf('## Theory');
  const summaryIdx = content.indexOf('## Summary');
  
  let contentBody = '';
  
  if (theoryIdx !== -1 && summaryIdx !== -1) {
    contentBody = content.substring(theoryIdx, summaryIdx);
  } else if (theoryIdx !== -1) {
    contentBody = content.substring(theoryIdx);
  } else {
    contentBody = content.replace(/^## Metadata[^]*?###/s, '').trim();
  }
  
  return {
    id: filePath || defaultMetadata.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    level: defaultMetadata.level,
    lessonNumber: defaultMetadata.lessonNumber,
    title: defaultMetadata.title,
    estimatedTime: defaultMetadata.estimatedTime,
    prerequisites: defaultMetadata.prerequisites,
    concepts: defaultMetadata.concepts,
    body: contentBody,
    filePath: filePath || '',
  };
}

/**
 * Render C64 lesson content with proper syntax highlighting
 */
export function renderLessonContent(body: string): string {
  let processed = body;
  
  // Process code blocks with highlighting
  const codeBlockPattern = /```[ \t]*([a-z]*)\n([\s\S]*?)```/gi;
  processed = processed.replace(codeBlockPattern, (match, syntax, code) => {
    let highlighted = '';
    for (const word of code.split(/\s+/)) {
      if (!word) continue;
      if (/^[A-Z][A-Z0-9]*$/.test(word)) {
        highlighted += `<span class="token-keyword">${word}</span> `;
      } else if (/^[A-Z][A-Z0-9]*\$?$/.test(word)) {
        highlighted += `<span class="token-variable">${word}</span> `;
      } else {
        highlighted += word + ' ';
      }
    }
    
    return `<pre class="c64-code-pre"><code>${highlighted.trim()}</code></pre>
<div class="c64-code-wrapper">
  <pre class="c64-code-pre"><code>${highlighted.trim()}</code></pre>
</div>`;
  });
  
  // Process concept callouts (>)
  processed = processed.replace(/>>(\s+)?([^<|]+)\|/g, (match, space, title) => {
    const icon = title.toUpperCase() === 'NOTE' ? '📝' : (title.toUpperCase() === 'WARNING' ? '⚠️ ' : '💡');
    return icon;
  });
  
  // Process warning/FYI blocks
  processed = processed.replace(/\>\>(?:\s+)FYI(?:(?!<).)*</g, (match) => {
    return `
<div class="c64-callout c64-callout-fyi">
  <div class="c64-callout-title">📌 FYI</div>
  <div class="c64-callout-content">${match}</div>
</div>`;
  });
  
  return processed;
}

// C64Tokenizer is defined above as a const (created via createC64Tokenizer())
// Re-export it for consumers of this module
// (local definition, no separate file needed)

export default {
  parseLesson,
  renderLessonContent,
} as const;
