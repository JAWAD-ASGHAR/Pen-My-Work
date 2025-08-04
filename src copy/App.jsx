import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import HandwrittenTextGenerator from './components/HandwrittenTextGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <h1 className="text-center py-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl font-light">
          Handwritten Text Generator
        </h1>
        <HandwrittenTextGenerator />
      </div>
    </div>
  );
}

export default App; 