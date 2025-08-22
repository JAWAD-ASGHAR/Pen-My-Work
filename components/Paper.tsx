"use client"
import React, { useMemo, useState, useEffect } from 'react';

interface PaperProps {
  text: string;
  textColor: string;
  fontFamily: string;
  fontSize?: string;
  paperType: 'lined' | 'blank' | 'grid';
  paperRef?: React.RefObject<HTMLDivElement> | ((el: HTMLDivElement | null) => void);
}

const Paper: React.FC<PaperProps> = ({ 
  text, 
  textColor, 
  fontFamily, 
  fontSize = '24px', 
  paperType,
  paperRef
}) => {
  // A4 dimensions in pixels (595 x 842)
  const A4_WIDTH = 595;
  const A4_HEIGHT = 842;
  const A4_ASPECT_RATIO = A4_HEIGHT / A4_WIDTH; // ≈ 1.414

  // State for paper dimensions
  const [paperDimensions, setPaperDimensions] = useState({
    width: A4_WIDTH,
    height: A4_HEIGHT,
    scaleFactor: 1
  });

  // Calculate responsive paper dimensions after component mounts
  useEffect(() => {
    const calculateDimensions = () => {
      // Get available width with better responsive calculation for mobile
      const isMobile = window.innerWidth < 768;
      const containerPadding = isMobile ? 38 : 16; // More padding on mobile to prevent cutoff
      const availableWidth = Math.min(A4_WIDTH, window.innerWidth - containerPadding);
      
      // Safety check: ensure paper never exceeds viewport width
      const maxWidth = window.innerWidth - 16; // 16px minimum margin
      const paperWidth = Math.min(availableWidth, maxWidth);
      const paperHeight = paperWidth * A4_ASPECT_RATIO;
      
      // Calculate scale factor relative to original A4 size
      const scaleFactor = paperWidth / A4_WIDTH;
      
      setPaperDimensions({
        width: paperWidth,
        height: paperHeight,
        scaleFactor
      });
    };

    calculateDimensions();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  // Constants that scale proportionally
  const totalLines = 25;
  const availableHeight = paperDimensions.height - 80; // Account for top/bottom padding
  const lineHeightPx = availableHeight / totalLines;
  const textLineSpacing = lineHeightPx * 0.00001;
  const leftPadding = 5 * paperDimensions.scaleFactor;

  // Split text into lines
  const lines = text.split('\n');

  // Generate background pattern based on paper type
  const getBackgroundPattern = () => {
    switch (paperType) {
      case 'lined':
        return `
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
            transparent ${49 * paperDimensions.scaleFactor}px,
            #ff0000 ${49 * paperDimensions.scaleFactor}px,
            #ff0000 ${50 * paperDimensions.scaleFactor}px,
            transparent ${50 * paperDimensions.scaleFactor}px
          ),
          #ffffff
        `;
      case 'grid':
        return `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${lineHeightPx - 1}px,
            #e0e0e0 ${lineHeightPx - 1}px,
            #e0e0e0 ${lineHeightPx}px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent ${lineHeightPx - 1}px,
            #e0e0e0 ${lineHeightPx - 1}px,
            #e0e0e0 ${lineHeightPx}px
          ),
          #ffffff
        `;
      case 'blank':
      default:
        return '#ffffff';
    }
  };

  const getBackgroundSize = () => {
    switch (paperType) {
      case 'lined':
        return `100% ${lineHeightPx}px, 100% ${lineHeightPx}px, 100% 100%`;
      case 'grid':
        return `100% ${lineHeightPx}px, 100% ${lineHeightPx}px`;
      case 'blank':
      default:
        return '100% 100%';
    }
  };

  const getPadding = () => {
    const basePadding = {
      lined: { top: 35, right: 0, bottom: 0, left: 50 },
      blank: { top: 20, right: 20, bottom: 20, left: 20 },
      grid: { top: 35, right: 30, bottom: 30, left: 30 }
    };

    const padding = basePadding[paperType] || basePadding.lined;
    
    return `${padding.top * paperDimensions.scaleFactor}px ${padding.right * paperDimensions.scaleFactor}px ${padding.bottom * paperDimensions.scaleFactor}px ${padding.left * paperDimensions.scaleFactor}px`;
  };

  // Calculate proportional font size
  const proportionalFontSize = useMemo(() => {
    const baseFontSize = parseInt(fontSize);
    return `${baseFontSize * paperDimensions.scaleFactor}px`;
  }, [fontSize, paperDimensions.scaleFactor]);

  return (
    <div
      ref={paperRef}
      className="flex justify-center items-center w-full h-full"
      style={{
        width: '100%',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        className="bg-white border border-gray-300 shadow-lg relative"
        style={{
          background: getBackgroundPattern(),
          backgroundSize: getBackgroundSize(),
          padding: getPadding(),
          boxSizing: 'border-box',
          width: `${paperDimensions.width}px`,
          height: `${paperDimensions.height}px`,
          minHeight: '350px',
          maxHeight: `${A4_HEIGHT}px`,
        }}
      >
        <div
          className="relative z-10"
          style={{
            fontSize: proportionalFontSize,
            lineHeight: `${lineHeightPx}px`,
            color: textColor,
            width: '100%',
            height: `${paperDimensions.height}px`,
            position: 'relative',
            top: '0px',
            fontFamily: fontFamily,
            whiteSpace: 'pre-line',
            boxSizing: 'border-box',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* Render each line from charCount */}
          {lines.slice(0, totalLines).map((line, idx) => (
            <span
              key={idx}
              style={{
                display: 'block',
                position: 'relative',
                top: `${idx * textLineSpacing}px`,
                left: 0,
                right: 0,
                width: '100%',
                height: `${lineHeightPx}px`,
                paddingLeft: `${leftPadding}px`,
                fontFamily: fontFamily,
                color: textColor,
                fontSize: proportionalFontSize,
                lineHeight: `${lineHeightPx}px`,
                boxSizing: 'border-box',
                pointerEvents: 'none',
                userSelect: 'none',
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

export default Paper; 