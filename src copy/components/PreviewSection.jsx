import React from 'react';

const PreviewSection = ({ text, textColor, paperRef }) => {
  // Constants for perfect line alignment
  const fontSize = 15; // px, matches the image and CSS
  const lineHeightPx = 20; // px, matches the line interval in the background
  const leftPadding = 10; // px, just past the red margin line in the image

  // Helper: Split text into paragraphs, then words, and wrap to fit the paper width
  const paperWidthPx = 595 - 2 * 50 - leftPadding; // total width - horizontal padding - left margin
  const font = `'Indie Flower', cursive`;

  // Canvas for measuring text width
  const measureCanvas = document.createElement('canvas');
  const ctx = measureCanvas.getContext('2d');
  ctx.font = `${fontSize}px ${font}`;

  function wrapText(text) {
    const paragraphs = text.split('\n');
    const wrappedLines = [];
    for (let para of paragraphs) {
      if (para.trim() === '') {
        wrappedLines.push('');
        continue;
      }
      const words = para.split(' ');
      let line = '';
      for (let i = 0; i < words.length; i++) {
        const testLine = line ? line + ' ' + words[i] : words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > paperWidthPx && line) {
          wrappedLines.push(line);
          line = words[i];
        } else {
          line = testLine;
        }
      }
      wrappedLines.push(line);
    }
    return wrappedLines;
  }

  const wrappedLines = wrapText(text);

  return (
    <div className="p-8 border-t border-gray-200">
      <h3 className="mb-6 text-xl font-semibold text-gray-800">Preview:</h3>
      <div className="flex justify-center mb-6">
        <div
          ref={paperRef}
          className="w-[595px] h-[842px] bg-white border border-gray-300 shadow-lg relative"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 19px,
                #000000 19px,
                #000000 20px
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
            backgroundSize: '100% 20px, 100% 20px, 100% 100%',
            padding: '40px 50px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div
            className="font-['Indie_Flower'] text-gray-800 relative z-10"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${lineHeightPx}px`,
              color: textColor,
              paddingLeft: `${leftPadding}px`,
              width: '100%',
              height: '100%',
              position: 'relative',
              top:'5px',
              fontFamily: "'Indie Flower', cursive",
              whiteSpace: 'pre-line',
              boxSizing: 'border-box',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {/* Render each wrapped line absolutely aligned to the line grid */}
            {wrappedLines.map((line, idx) => (
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
                  fontFamily: "'Indie Flower', cursive",
                  color: textColor,
                  fontSize: `${fontSize}px`,
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
    </div>
  );
};

export default PreviewSection; 