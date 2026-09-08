"use client";

import React, { useCallback } from 'react';
import { useStore } from '@/lib/store';
import { UploadCloud, Settings } from 'lucide-react';
import { VisualTheme } from '@/lib/types';
import { generateBatchContent } from '@/lib/gemini';
import { generateCanvasCode } from '@/lib/geminiVisuals';
import { Loader2 } from 'lucide-react';

export function ConfigPanel() {
  const {
    geminiKey,
    setGeminiKey,
    telegramToken,
    setTelegramToken,
    telegramChatId,
    setTelegramChatId,
    selectedTheme,
    setSelectedTheme,
    audioFiles,
    addAudioFiles,
    setQueue,
  } = useStore();
  const [isGeneratingQuotes, setIsGeneratingQuotes] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState('');

  const handleGenerateQuotes = async () => {
    if (!geminiKey) return alert("Please enter a Gemini API Key");
    setIsGeneratingQuotes(true);
    setGenerationProgress('Generating 20 quotes...');
    try {
      const items = await generateBatchContent(geminiKey, selectedTheme);
      setQueue(items);

      // Now generate the visual code for each quote sequentially to avoid rate limits
      for (let i = 0; i < items.length; i++) {
        setGenerationProgress(`Writing visuals ${i + 1}/${items.length}...`);
        const code = await generateCanvasCode(geminiKey, items[i]);
        
        // Update item in the queue
        items[i].canvasCode = code;
        useStore.getState().updateQueueItem(items[i].id, { canvasCode: code });
        
        // Delay to spread across 2 minutes (approx 6 seconds per call)
        if (i < items.length - 1) {
          await new Promise(r => setTimeout(r, 6000));
        }
      }
      
      setGenerationProgress('');
    } catch (e) {
      alert("Error generating quotes: " + String(e));
      setGenerationProgress('');
    } finally {
      setIsGeneratingQuotes(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('audio/'));
      if (files.length > 0) {
        addAudioFiles(files);
      }
    },
    [addAudioFiles]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const themes: VisualTheme[] = ['mist_rain', 'analog_grain', 'starfield_drift', 'aurora_wave'];

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-neutral-100">
        <Settings className="w-5 h-5 text-neutral-400" />
        <h2>Configuration</h2>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-neutral-400">Gemini API Key</label>
        <input
          type="password"
          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors"
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          placeholder="AIza..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-neutral-400">Telegram Bot Token</label>
        <input
          type="password"
          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors"
          value={telegramToken}
          onChange={(e) => setTelegramToken(e.target.value)}
          placeholder="123456:ABC-DEF..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-neutral-400">Telegram Chat ID</label>
        <input
          type="text"
          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors"
          value={telegramChatId}
          onChange={(e) => setTelegramChatId(e.target.value)}
          placeholder="-1001234567890"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-neutral-400">Default Theme</label>
        <select
          className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value as VisualTheme)}
        >
          {themes.map(t => (
            <option key={t} value={t}>{t.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        <label className="text-xs font-medium text-neutral-400">Audio Sources</label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('audio-upload')?.click()}
          className="border-2 border-dashed border-neutral-700/50 hover:border-neutral-500 bg-neutral-950/50 rounded-lg p-6 flex flex-col items-center justify-center text-neutral-400 transition-colors cursor-pointer"
        >
          <UploadCloud className="w-8 h-8 mb-3 text-neutral-500" />
          <span className="text-sm text-center font-medium">Drag & drop or click</span>
          <span className="text-xs text-center mt-1 opacity-60">MP3, WAV up to 50MB</span>
          <input 
            type="file" 
            id="audio-upload" 
            accept="audio/*" 
            multiple 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files) {
                addAudioFiles(Array.from(e.target.files));
              }
            }}
          />
        </div>
        {audioFiles.length > 0 && (
          <div className="mt-2 flex flex-col gap-1 max-h-32 overflow-y-auto">
            {audioFiles.map((file, i) => (
              <div key={i} className="text-xs text-neutral-300 bg-neutral-800/50 px-2 py-1.5 rounded flex items-center justify-between">
                <span className="truncate">{file.name}</span>
                <span className="opacity-50 text-[10px]">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleGenerateQuotes}
        disabled={isGeneratingQuotes}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 disabled:opacity-50 px-4 py-3 rounded-lg transition-colors font-medium shadow-sm"
      >
        {isGeneratingQuotes ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {isGeneratingQuotes ? (generationProgress || 'Generating...') : 'Generate 20 Quotes'}
      </button>
    </div>
  );
}
