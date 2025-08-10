import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import InputSection from './InputSection';
import PreviewSection from './PreviewSection';
import DownloadSection from './DownloadSection';
import { downloadImage, copyToClipboard } from '../utils/downloadUtils';

const HandwrittenTextGenerator = () => {
  const [text, setText] = useState('Your handwritten text will appear here...');
  const [textColor, setTextColor] = useState('#2c3e50');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const paperRef = useRef(null);

  const generateImage = async () => {
    if (!paperRef.current) return;

    setIsGenerating(true);
    try {
      const imageData = await toPng(paperRef.current, {
        backgroundColor: '#ffffff',
        quality: 1.0,
        width: 595,
        height: 842
      });
      setGeneratedImage(imageData);
      
      // Scroll to download section
      document.getElementById('downloadSection')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (fileName, format) => {
    if (!generatedImage) return;

    const result = downloadImage(generatedImage, fileName, format);
    if (result.success) {
      console.log(`Image downloaded as: ${result.fileName}`);
    } else {
      alert(`Download failed: ${result.error}`);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedImage) return;

    const result = await copyToClipboard(generatedImage);
    if (result.success) {
      alert('Image copied to clipboard!');
    } else {
      alert(`Failed to copy to clipboard: ${result.error}`);
    }
  };

  useEffect(() => {
    // Set sample text on component mount
    setText(`Dear Diary,

Today was an amazing day! I learned so much about creating beautiful handwritten text with technology. The possibilities are endless when we combine creativity with code.

I can't wait to see what tomorrow brings!

Best regards,
Me`);
  }, []);

  return (
    <div>
      <InputSection
        text={text}
        setText={setText}
        textColor={textColor}
        setTextColor={setTextColor}
        onGenerate={generateImage}
        isGenerating={isGenerating}
      />
      
      <PreviewSection
        text={text}
        textColor={textColor}
        paperRef={paperRef}
      />
      
      {generatedImage && (
        <DownloadSection
          generatedImage={generatedImage}
          onDownload={handleDownload}
          onCopyToClipboard={handleCopyToClipboard}
        />
      )}
    </div>
  );
};

export default HandwrittenTextGenerator; 