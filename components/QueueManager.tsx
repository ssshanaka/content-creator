"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { ListVideo, Edit2, Play, Palette, Video } from 'lucide-react';
import { VisualTheme } from '@/lib/types';

export function QueueManager() {
  const { queue, updateQueueItem } = useStore();

  const themes: VisualTheme[] = ['mist_rain', 'analog_grain', 'starfield_drift', 'aurora_wave'];

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 flex flex-col gap-4 shadow-sm h-full max-h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-neutral-100">
          <ListVideo className="w-5 h-5 text-neutral-400" />
          <h2>Queue Manager</h2>
        </div>
        <span className="text-xs font-medium bg-neutral-800 border border-neutral-700 px-2.5 py-1 rounded-full text-neutral-300">
          {queue.length} items
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {queue.length === 0 ? (
          <div className="text-center text-neutral-500 py-16 flex flex-col items-center justify-center h-full border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-950/50">
            <ListVideo className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium">Queue is empty</p>
            <p className="text-sm mt-1 opacity-70">Add content to generate items.</p>
          </div>
        ) : (
          queue.map((item) => (
            <div key={item.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col gap-4 group hover:border-neutral-700 transition-colors">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold flex justify-between items-center">
                  Quote
                  <Edit2 className="w-3 h-3 opacity-50" />
                </label>
                <textarea
                  className="bg-neutral-900 border border-neutral-800 focus:border-blue-500 rounded-lg resize-none text-sm p-3 text-neutral-200 focus:outline-none transition-colors w-full"
                  rows={2}
                  value={item.quote}
                  onChange={(e) => updateQueueItem(item.id, { quote: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Palette className="w-3 h-3" />
                    Theme
                  </label>
                  <select
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 appearance-none"
                    value={item.theme}
                    onChange={(e) => updateQueueItem(item.id, { theme: e.target.value as VisualTheme })}
                  >
                    {themes.map(t => (
                      <option key={t} value={t}>{t.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Video className="w-3 h-3" />
                    Camera
                  </label>
                  <select
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 appearance-none"
                    value={item.cameraMovement}
                    onChange={(e) => updateQueueItem(item.id, { cameraMovement: e.target.value as any })}
                  >
                    <option value="zoom_in">Zoom In</option>
                    <option value="pan_up">Pan Up</option>
                    <option value="drift_right">Drift Right</option>
                    <option value="static">Static</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-1 border-t border-neutral-800 pt-3">
                <div className="text-xs font-mono text-neutral-600 bg-neutral-900 px-2 py-1 rounded">
                  {item.id.slice(0, 8)}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={async () => {
                      const geminiKey = useStore.getState().geminiKey;
                      if (!geminiKey) return alert("Please enter your Gemini API Key in Configuration.");
                      
                      const btn = document.getElementById(\`regen-\${item.id}\`);
                      if (btn) btn.innerHTML = '<span class="w-3.5 h-3.5 border-2 border-neutral-400 border-t-white rounded-full animate-spin"></span>';
                      
                      try {
                        const { generateCanvasCode } = await import('@/lib/geminiVisuals');
                        const newCode = await generateCanvasCode(geminiKey, item);
                        useStore.getState().updateQueueItem(item.id, { canvasCode: newCode });
                      } catch (e) {
                        console.error("Failed to regenerate", e);
                        alert("Failed to regenerate visual.");
                      } finally {
                        if (btn) btn.innerHTML = 'Regen Visual';
                      }
                    }}
                    id={\`regen-\${item.id}\`}
                    className="flex items-center gap-1.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg transition-colors border border-neutral-700"
                  >
                    Regen Visual
                  </button>
                  <button 
                    onClick={() => useStore.getState().setPreviewItemId(item.id)}
                    className="flex items-center gap-1.5 text-xs font-medium bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1.5 rounded-lg transition-colors border border-blue-900/50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
