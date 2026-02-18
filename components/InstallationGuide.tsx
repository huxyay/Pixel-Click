import React, { useState } from 'react';

const InstallationGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'windows' | 'mac'>('windows');

  return (
    <div className="bg-[#ffecb3] border-4 border-[#8b5a2b] rounded-xl p-6 shadow-md mt-8">
      <h3 className="text-xl font-bold mb-4 text-[#5c3a21] font-pixel">How to Install</h3>
      
      <div className="flex space-x-4 mb-4 border-b-2 border-[#d4a373]">
        <button
          onClick={() => setActiveTab('windows')}
          className={`pb-2 px-4 font-bold font-pixel text-xs transition-colors ${
            activeTab === 'windows' 
              ? 'text-[#d946ef] border-b-4 border-[#d946ef]' 
              : 'text-[#8b5a2b] hover:text-[#5c3a21]'
          }`}
        >
          Windows
        </button>
        <button
          onClick={() => setActiveTab('mac')}
          className={`pb-2 px-4 font-bold font-pixel text-xs transition-colors ${
            activeTab === 'mac' 
              ? 'text-[#d946ef] border-b-4 border-[#d946ef]' 
              : 'text-[#8b5a2b] hover:text-[#5c3a21]'
          }`}
        >
          Mac
        </button>
      </div>

      <div className="text-[#5c3a21] space-y-3 text-sm leading-relaxed font-medium">
        {activeTab === 'windows' ? (
          <ol className="list-decimal pl-5 space-y-2 marker:text-[#8b5a2b] marker:font-bold">
            <li>Download all your cursor images (.png).</li>
            <li>Convert them to <strong>.cur</strong> or <strong>.ani</strong> files. (You can use online converters like convertio.co).</li>
            <li>Go to <strong>Settings</strong> &gt; <strong>Personalization</strong> &gt; <strong>Themes</strong> &gt; <strong>Mouse Cursor</strong>.</li>
            <li>Click on the cursor type you want to change (e.g., "Normal Select").</li>
            <li>Click <strong>Browse...</strong> and select your converted .cur file.</li>
            <li>Click <strong>Apply</strong> and enjoy!</li>
          </ol>
        ) : (
          <ol className="list-decimal pl-5 space-y-2 marker:text-[#8b5a2b] marker:font-bold">
            <li>Mac does not natively support custom image cursors easily without third-party tools.</li>
            <li>We recommend downloading a free app like <strong>Mousecape</strong> (open source).</li>
            <li>Open Mousecape and create a new "Cape".</li>
            <li>Drag your downloaded .png files into the cape slots for each cursor type (Arrow, Pointing, Wait).</li>
            <li>Adjust the "Hot Spot" (usually top-left for arrows, center for loading).</li>
            <li>Right-click your Cape and select <strong>Apply</strong>.</li>
          </ol>
        )}
      </div>
    </div>
  );
};

export default InstallationGuide;