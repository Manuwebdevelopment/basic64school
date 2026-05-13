"use client";
// components/design/SpriteGrid.tsx
import React, { useState, useRef, useCallback } from 'react';

const SPRITE_WIDTH = 8;
const SPRITE_HEIGHT = 21;
const CELL_SIZE = 20;

const SpriteGrid: React.FC = () => {
  const initialData = Array(SPRITE_HEIGHT).fill(0).map(() => Array(SPRITE_WIDTH).fill(0));
  const [grid, setGrid] = useState<boolean[][]>(initialData);
  const isDrawing = useRef(false);

  const handleCellMouseDown = useCallback((row: number, col: number) => {
    isDrawing.current = true;
    setGrid(prev => {
      const newGrid = prev.map(r => [...r]);
      newGrid[row][col] = true;
      return newGrid;
    });
  }, []);

  const handleCellMouseEnter = useCallback((row: number, col: number) => {
    if (!isDrawing.current) return;
    setGrid(prev => {
      const newGrid = prev.map(r => [...r]);
      newGrid[row][col] = true;
      return newGrid;
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  return (
    <div className="c64-card">
      <h3 className="c64-header">Sprite Editor: 8x21 Canvas</h3>
      <div
        className="sprite-grid-container"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: 'crosshair' }}
      >
        {grid.map((rowArr, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {rowArr.map((isPixel, colIndex) => (
              <div
                key={colIndex}
                className="sprite-cell"
                style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
              >
                {isPixel ? (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#888' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#1a1a1a' }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        *Click and drag to draw pixels on the sprite grid.
      </p>
    </div>
  );
};

export default SpriteGrid;
