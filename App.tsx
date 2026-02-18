import React, { useState } from 'react';
import { MousePointer2, Sparkles, AlertTriangle } from 'lucide-react';
import { generateCursorSet } from './services/geminiService.ts';
import { CursorSet } from './types.ts';
import { PROFANITY_LIST } from './constants.ts';
import CursorDisplay from './components/CursorDisplay.tsx';
import TestArea from './components/TestArea.tsx';
import InstallationGuide from './components/InstallationGuide.tsx';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  
  const [cursors, setCursors] = useState<CursorSet>({
    normal: null,
    pointing: null,
    loading: null,
    clicking: null,
    typing: null
  });

  const checkProfanity = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return PROFANITY_LIST.some(word => lowerText.includes(word));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
    
    if (checkProfanity(value)) {
      setWarning("Please keep the language clean! Inappropriate words detected.");
    } else {
      setWarning(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (warning) return;

    setIsGenerating(true);
    setError(null);
    
    // Reset cursors for a fresh loading state visual
    setCursors({
      normal: null,
      pointing: null,
      loading: null,
      clicking: null,
      typing: null
    });

    try {
      const results = await generateCursorSet(prompt);
      
      const newCursors: CursorSet = {
        normal: null,
        pointing: null,
        loading: null,
        clicking: null,
        typing: null
      };

      results.forEach(res => {
        newCursors[res.type as keyof CursorSet] = res.base64;
      });

      setCursors(newCursors);
    } catch (err) {
      console.error(err);
      setError("Failed to generate cursors. Please check your API key in index.html and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#8b5a2b] rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transform -rotate-2 border-2 border-[#5c3a21]">
              <MousePointer2 className="text-[#ffdca4] w-10 h-10" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#5c3a21] tracking-tight font-pixel mb-4 drop-shadow-sm">
            Pixel Click
          </h1>
          <div className="inline-block bg-[#ffecb3] px-6 py-2 rounded-full border-2 border-[#d4a373]">
            <p className="text-sm sm:text-base text-[#8b5a2b] font-bold">
              Customize your own pixel cursors for your desktop!
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-[#ffecb3] rounded-xl shadow-[6px_6px_0px_0px_rgba(139,90,43,0.3)] border-4 border-[#8b5a2b] p-8 mb-10 relative">
          {/* Decorative corner screws/dots */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#d4a373] rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#d4a373] rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#d4a373] rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#d4a373] rounded-full"></div>

          <div className="flex flex-col gap-4">
            <label htmlFor="prompt" className="block text-sm font-bold text-[#5c3a21] font-pixel uppercase tracking-wider">
              What kind of cursor do you want?
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={handleInputChange}
                placeholder="eg., pink donut, grumpy cat..."
                className="flex-1 block w-full rounded-lg bg-[#fff8dc] text-[#3e2723] placeholder-[#bcaaa4] border-4 border-[#d4a373] p-4 font-pixel text-sm focus:outline-none focus:border-[#8b5a2b] shadow-inner"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !!warning || !prompt.trim()}
                className="bg-[#8b5a2b] text-[#ffdca4] px-8 py-4 rounded-lg font-bold font-pixel text-sm hover:bg-[#5c3a21] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_#5c3a21] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-[#5c3a21]"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="animate-spin" size={18} /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> GENERATE
                  </>
                )}
              </button>
            </div>
            {warning && (
              <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-md border-2 border-red-200 mt-2">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold">{warning}</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-md border-2 border-red-200 mt-2">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Display Section */}
        <CursorDisplay cursors={cursors} isGenerating={isGenerating} />
        
        {/* Test Area */}
        <TestArea cursors={cursors} />
        
        {/* Installation Guide */}
        <InstallationGuide />

      </div>
    </div>
  );
};

export default App;