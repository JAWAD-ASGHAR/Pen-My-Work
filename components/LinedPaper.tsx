import React from 'react';

interface LinedPaperProps {
  text: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  paperRef?: React.RefObject<HTMLDivElement>;
}

const LinedPaper: React.FC<LinedPaperProps> = ({ 
  text, 
  textColor, 
  fontFamily, 
  fontSize, 
  paperRef 
}) => {
  // Constants for 30 lines distributed evenly
  const totalLines = 30;
  const availableHeight = 762; // A4 height (842px) - top/bottom padding (80px)
  const lineHeightPx = availableHeight / totalLines; // Distribute lines evenly
  const leftPadding = 5; // px, just past the red margin line

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
              transparent ${lineHeightPx - 1}px,
              #000000 ${lineHeightPx - 1}px,
              #000000 ${lineHeightPx}px
            ),
            linear-gradient(
              90deg,
              transparent 0px,
              transparent 49px,
              #ff0000 49px,
              #ff0000 50px,
              transparent 50px
            ),
            #ffffff
          `,
          backgroundSize: `100% ${lineHeightPx}px, 100% ${lineHeightPx}px, 100% 100%`,
          padding: '40px 50px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          minHeight: '842px',
          maxHeight: '842px',
          minWidth: '595px',
          maxWidth: '595px',
        }}
      >
        <div
          className="relative z-10"
          style={{
            fontSize: fontSize,
            lineHeight: `${lineHeightPx}px`,
            color: textColor,
            paddingLeft: `${leftPadding}px`,
            width: '100%',
            height: '762px', // A4 height (842px) - top/bottom padding (80px)
            position: 'relative',
            top: '5px',
            fontFamily: fontFamily,
            whiteSpace: 'pre-line',
            boxSizing: 'border-box',
            pointerEvents: 'none',
            userSelect: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Render each wrapped line absolutely aligned to the line grid */}
          {wrappedLines.slice(0, totalLines).map((line, idx) => (
            <span
              key={idx}
              style={{
                display: 'block',
                position: 'relative',
                top: `${idx * lineHeightPx}px`,
                left: 0,
                right: 0,
                width: '100%',
                height: `${lineHeightPx}px`,
                paddingLeft: `${leftPadding}px`,
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
              }}
            >
              {line === '' ? '\u00A0' : line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinedPaper; 