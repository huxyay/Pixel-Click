import React from 'react';
import { CursorSet, CursorType } from '../types';
import { downloadCursor, downloadCursorSetZip } from '../utils/imageHelper';
import { Download, Loader2, Package } from 'lucide-react';

interface CursorDisplayProps {
  cursors: CursorSet;
  isGenerating: boolean;
}

const CursorCard: React.FC<{ 
  title: string; 
  type: CursorType; 
  base64: string | null; 
  isGenerating: boolean;
}> = ({ title, type, base64, isGenerating }) => {
  return (
    <div className="bg-[#ffecb3] p-3 rounded-xl border-4 border-[#8b5a2b] shadow-md flex flex-col items-center gap-2 transition-transform hover:scale-[1.02] hover:-rotate-1 w-full max-w-[170px]">
      <div className="w-full flex justify-between items-center border-b-2 border-[#d4a373] pb-1">
        <span className="text-xs font-bold text-[#8b5a2b] uppercase tracking-wider font-pixel truncate">{title}</span>
        {base64 && (
          <button 
            onClick={() => downloadCursor(base64, `cursor-${type}`)}
            className="text-[#8b5a2b] hover:text-[#5d3a1a] transition-colors"
            title="Download PNG"
          >
            <Download size={18} />
          </button>
        )}
      </div>
      
      {/* Container for the image */}
      <div className="w-full aspect-square bg-[#fff8e1] rounded-lg flex items-center justify-center border-2 border-[#d4a373] relative overflow-hidden group shadow-inner">
        {isGenerating ? (
          <Loader2 className="animate-spin text-[#8b5a2b]" size={40} />
        ) : base64 ? (
          <>
            <img 
              src={base64} 
              alt={title} 
              className="w-4/5 h-4/5 object-contain rendering-pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
          </>
        ) : (
          <span className="text-xs text-[#d4a373] font-pixel">Empty</span>
        )}
      </div>
      
      <p className="text-[10px] text-[#8b5a2b] text-center px-1 font-medium leading-tight h-6 flex items-center justify-center">
        {type === CursorType.NORMAL && "Default arrow"}
        {type === CursorType.POINTING && "Link select"}
        {type === CursorType.LOADING && "Wait/Busy"}
        {type === CursorType.CLICKING && "Active click"}
        {type === CursorType.TYPING && "Text select"}
      </p>
    </div>
  );
};

const CursorDisplay: React.FC<CursorDisplayProps> = ({ cursors, isGenerating }) => {
  const hasCursors = Object.values(cursors).some(c => c !== null);

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 justify-items-center w-full">
        <CursorCard 
          title="Arrow" 
          type={CursorType.NORMAL} 
          base64={cursors.normal} 
          isGenerating={isGenerating} 
        />
        <CursorCard 
          title="Pointer" 
          type={CursorType.POINTING} 
          base64={cursors.pointing} 
          isGenerating={isGenerating} 
        />
        <CursorCard 
          title="Busy" 
          type={CursorType.LOADING} 
          base64={cursors.loading} 
          isGenerating={isGenerating} 
        />
        <CursorCard 
          title="Click" 
          type={CursorType.CLICKING} 
          base64={cursors.clicking} 
          isGenerating={isGenerating} 
        />
        <CursorCard 
          title="Type" 
          type={CursorType.TYPING} 
          base64={cursors.typing} 
          isGenerating={isGenerating} 
        />
      </div>
      
      {hasCursors && !isGenerating && (
        <button
          onClick={() => downloadCursorSetZip(cursors)}
          className="flex items-center gap-2 bg-[#d4a373] hover:bg-[#8b5a2b] text-[#3e2723] hover:text-[#ffecb3] border-4 border-[#8b5a2b] px-6 py-3 rounded-lg font-bold font-pixel text-xs transition-all shadow-[4px_4px_0px_0px_#5c3a21] active:translate-y-1 active:shadow-none"
        >
          <Package size={18} />
          Download All (.ZIP)
        </button>
      )}
    </div>
  );
};

export default CursorDisplay;