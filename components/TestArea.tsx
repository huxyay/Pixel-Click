import React, { useState, useRef, useEffect } from 'react';
import { CursorSet } from '../types';

interface TestAreaProps {
  cursors: CursorSet;
}

const TestArea: React.FC<TestAreaProps> = ({ cursors }) => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Helper to construct CSS cursor string
  const getCursorStyle = (uri: string | null, fallback: string = 'auto') => {
    return uri ? `url(${uri}) 0 0, ${fallback}` : fallback;
  };
  
  // For loading, we usually center the hotspot. 
  const getLoadingCursorStyle = (uri: string | null) => {
    return uri ? `url(${uri}) 64 64, wait` : 'wait';
  };

  // For typing, center horizontal, center vertical
  const getTypingCursorStyle = (uri: string | null) => {
    return uri ? `url(${uri}) 64 64, text` : 'text';
  };

  // Determine current effective cursor
  let currentCursor = 'auto';

  if (isLoadingState) {
    currentCursor = getLoadingCursorStyle(cursors.loading);
  } else if (isClicking && cursors.clicking) {
    currentCursor = getCursorStyle(cursors.clicking, 'pointer');
  } else if (isHoveringButton) {
    currentCursor = getCursorStyle(cursors.pointing, 'pointer');
  } else {
    currentCursor = getCursorStyle(cursors.normal, 'default');
  }

  const handleTestButtonClick = () => {
    setIsLoadingState(true);
    setTimeout(() => {
      setIsLoadingState(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#5c3a21] font-pixel">Test Zone</h3>
        <span className="text-xs font-bold text-[#5c3a21] bg-[#ffecb3] border-2 border-[#8b5a2b] px-2 py-1 rounded shadow-sm">
          Interactive Area
        </span>
      </div>

      <div 
        className="relative w-full h-[36rem] bg-[#fff8dc] border-4 border-[#8b5a2b] rounded-xl flex flex-col items-center justify-center overflow-hidden transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] gap-6"
        style={{ cursor: currentCursor }}
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
        onMouseLeave={() => {
          setIsClicking(false);
          setIsHoveringButton(false);
          setIsHoveringText(false);
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, #8b5a2b 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }} 
        />
        
        <div className="z-10 text-center w-full max-w-md px-4 flex flex-col items-center gap-6">
          <p className="text-[#8b5a2b] font-pixel text-xs tracking-widest">
            {isLoadingState ? "LOADING..." : "MOVE AROUND & CLICK!"}
          </p>
          
          <button
            className={`
              px-6 py-3 rounded-none font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transform transition-transform active:translate-y-1 active:shadow-none border-2 border-white
              ${isLoadingState ? 'bg-slate-400 cursor-wait' : 'bg-[#0ea5e9] hover:bg-[#0284c7]'}
            `}
            style={{ 
                cursor: isLoadingState ? getLoadingCursorStyle(cursors.loading) : getCursorStyle(cursors.pointing, 'pointer'),
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '12px'
            }}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            onClick={handleTestButtonClick}
            disabled={isLoadingState}
          >
            {isLoadingState ? 'SIMULATING LOAD...' : 'TEST LOADING'}
          </button>

          <input 
            type="text" 
            placeholder="Hover to Type..."
            className="w-full px-4 py-3 bg-white border-4 border-[#d4a373] text-[#5c3a21] font-pixel text-sm focus:outline-none focus:border-[#8b5a2b] shadow-inner placeholder-[#d4a373]"
            style={{
               cursor: isLoadingState ? getLoadingCursorStyle(cursors.loading) : getTypingCursorStyle(cursors.typing)
            }}
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          />
        </div>
      </div>
      <p className="text-xs text-[#8b5a2b] text-center italic">
        Note: The actual cursor rendering depends on your browser. 
      </p>
    </div>
  );
};

export default TestArea;