import { saveAs } from 'file-saver';

export const downloadImage = (imageData, fileName = 'handwritten-text', format = 'png') => {
  try {
    // Convert base64 to blob
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const finalFileName = `${fileName}-${timestamp}.${format}`;
    
    // Download the file
    saveAs(blob, finalFileName);
    
    return { success: true, fileName: finalFileName };
  } catch (error) {
    console.error('Download failed:', error);
    return { success: false, error: error.message };
  }
};

export const copyToClipboard = async (imageData) => {
  try {
    const response = await fetch(imageData);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    return { success: true };
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    return { success: false, error: error.message };
  }
};

export const convertImageFormat = (imageData, format) => {
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
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          reject(new Error('Failed to convert image format'));
        }
      }, mimeType, quality);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageData;
  });
}; 