import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const DownloadSection = ({ generatedImage, onDownload }) => {
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [fileName, setFileName] = useState('handwritten-text');

  const convertImageFormat = (imageData, format) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const mimeType = `image/${format}`;
        const quality = format === 'jpg' ? 0.9 : 1.0;
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image format'));
          }
        }, mimeType, quality);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      let blob;
      
      if (downloadFormat === 'png') {
        // For PNG, use the original image data
        const response = await fetch(generatedImage);
        blob = await response.blob();
      } else {
        // Convert to other formats
        blob = await convertImageFormat(generatedImage, downloadFormat);
      }
      
      // Create filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const finalFileName = `${fileName}-${timestamp}.${downloadFormat}`;
      
      // Download the file
      saveAs(blob, finalFileName);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert('Image copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard. Please try downloading instead.');
    }
  };

  return (
    <div id="downloadSection" className="p-8 border-t border-gray-200 bg-gray-50">
      <h3 className="mb-6 text-xl font-semibold text-gray-800">Generated Image:</h3>
      
      <div className="flex justify-center mb-6">
        <img
          src={generatedImage}
          alt="Generated handwritten text"
          className="max-w-full rounded-lg shadow-lg"
        />
      </div>
      
      <div className="space-y-4">
        {/* Download Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Name:
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="handwritten-text"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format:
            </label>
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleCopyToClipboard}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
        
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white border-none py-4 px-8 rounded-lg text-lg font-bold cursor-pointer transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default DownloadSection;
