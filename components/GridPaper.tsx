import React from 'react';

interface GridPaperProps {
  text: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  paperRef?: React.RefObject<HTMLDivElement>;
}

const GridPaper: React.FC<GridPaperProps> = ({ 
  text, 
  textColor, 
  fontFamily, 
  fontSize, 
  paperRef 
}) => {
  // Constants for grid alignment
  const gridSize = 20; // px, grid cell size
  const lineHeightPx = gridSize; // px, matches grid line spacing
  const leftPadding = 50; // px, left margin
  const topPadding = 50; // px, top margin

  // Helper: Split text into paragraphs, then words, and wrap to fit the paper width
  const paperWidthPx = 595 - 2 * 50 - leftPadding; // total width - horizontal padding - left margin

  // Canvas for measuring text width
  const measureCanvas = document.createElement('canvas');
  const ctx = measureCanvas.getContext('2d');
  if (ctx) {
    ctx.font = `${fontSize} ${fontFamily}`;
  }

  function wrapText(text: string): string[] {
    const paragraphs = text.split('\n');
    const wrappedLines: string[] = [];
    
    for (const para of paragraphs) {
      if (para.trim() === '') {
        wrappedLines.push('');
        continue;
      }
      
      const words = para.split(' ');
      let line = '';
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line ? line + ' ' + words[i] : words[i];
        if (ctx) {
          const metrics = ctx.measureText(testLine);
          if (metrics.width > paperWidthPx && line) {
            wrappedLines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }
      }
      wrappedLines.push(line);
    }
    return wrappedLines;
  }

  const wrappedLines = wrapText(text);

  return (
    <div className="flex justify-center mb-6">
      <div
        ref={paperRef}
        className="w-[595px] h-[842px] bg-white border border-gray-300 shadow-lg relative"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent ${gridSize - 1}px,
              #e0e0e0 ${gridSize - 1}px,
              #e0e0e0 ${gridSize}px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent ${gridSize - 1}px,
              #e0e0e0 ${gridSize - 1}px,
              #e0e0e0 ${gridSize}px
            ),
            #ffffff
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          padding: '50px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          className="relative z-10"
          style={{
            fontSize: fontSize,
            lineHeight: `${lineHeightPx}px`,
            color: textColor,
            paddingLeft: `${leftPadding}px`,
            paddingTop: `${topPadding}px`,
            width: '100%',
            height: '100%',
            position: 'relative',
            fontFamily: fontFamily,
            whiteSpace: 'pre-line',
            boxSizing: 'border-box',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* Render each wrapped line aligned to grid */}
          {wrappedLines.map((line, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                top: `${idx * lineHeightPx}px`,
                fontFamily: fontFamily,
                color: textColor,
                fontSize: fontSize,
                lineHeight: `${lineHeightPx}px`,
                boxSizing: 'border-box',
                pointerEvents: 'none',
                userSelect: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'pre',
                height: `${lineHeightPx}px`,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {line === '' ? '\u00A0' : line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridPaper; 