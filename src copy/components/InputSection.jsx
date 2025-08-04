import React from 'react';

const InputSection = ({
  text,
  setText,
  textColor,
  setTextColor,
  onGenerate,
  isGenerating
}) => {
  return (
    <div className="p-8 bg-gray-50">
      <div className="mb-6">
        <label htmlFor="textInput" className="block mb-2 font-bold text-gray-700">
          Enter your text:
        </label>
        <textarea
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full min-h-[120px] p-4 border-2 border-gray-300 rounded-lg text-base font-sans resize-y focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Text Color:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-10 border-none rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none py-4 px-8 rounded-lg text-lg font-bold cursor-pointer transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </button>
    </div>
  );
};

export default InputSection; 