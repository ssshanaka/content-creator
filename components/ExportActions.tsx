"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { DownloadCloud, PlayCircle, Send, Loader2 } from 'lucide-react';
import { encodeVideo } from '@/lib/video/encoder';
import { processAudio } from '@/lib/video/audioProcessor';
import { exportToZip } from '@/lib/export/zipService';
import { postToTelegram } from '@/lib/export/telegramBridge';
import { CanvasRenderer } from '@/lib/canvas/renderer';

export function ExportActions() {
  const { isGenerating, setIsGenerating, renderProgress, renderStatus, queue, audioFiles, telegramToken, telegramChatId } = useStore();

  const handleExport = async (type: 'zip' | 'telegram') => {
    setIsGenerating(true);
    useStore.getState().setRenderProgress(0, 'Initializing Engine...');
    
    try {
      const generatedVideos: { blob: Blob; filename: string }[] = [];
      let captionsText = '';

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        useStore.getState().setRenderProgress(Math.round(((i) / queue.length) * 100), `Rendering ${i + 1}/${queue.length}...`);
        
        let audioBuffer;
        // Cycle through audio files if any
        if (audioFiles.length > 0) {
          const file = audioFiles[i % audioFiles.length];
          audioBuffer = await processAudio(file, 10, 1);
        }

        const renderer = new CanvasRenderer(document.createElement('canvas'));
        
        const blob = await encodeVideo({
          canvasWidth: 1080,
          canvasHeight: 1920,
          fps: 30,
          durationSeconds: 10,
          audioBuffer,
          renderFrame: (ctx, timeMs) => {
            renderer.renderFrame(item, timeMs);
          }
        });

        const filename = `video_${i + 1}.mp4`;
        generatedVideos.push({ blob, filename });
        captionsText += `\n\n--- ${filename} ---\n${item.caption}\n${item.hashtags.join(' ')}`;

        if (type === 'telegram') {
          if (!telegramToken || !telegramChatId) {
            console.warn("Telegram tokens missing, skipping telegram upload.");
          } else {
             useStore.getState().setRenderProgress(Math.round(((i + 0.5) / queue.length) * 100), `Sending ${i + 1} to Telegram...`);
             await postToTelegram({
               botToken: telegramToken,
               chatId: telegramChatId,
               videoBlob: blob,
               caption: item.caption + '\n' + item.hashtags.join(' ')
             });
          }
        }
      }

      useStore.getState().setRenderProgress(100, 'Finishing up...');

      if (type === 'zip') {
        await exportToZip({
          videos: generatedVideos,
          captions: captionsText,
          zipFilename: 'lofi_batch_export.zip'
        });
      }

      useStore.getState().setRenderProgress(100, 'Completed!');
    } catch (e) {
      console.error(e);
      alert("Error during export: " + String(e));
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        useStore.getState().setRenderProgress(0, 'Idle');
      }, 2000);
    }
  };

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 flex flex-col gap-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-2 text-neutral-100 flex items-center gap-2">
        <PlayCircle className="w-5 h-5 text-neutral-400" />
        Export Engine
      </h2>
      
      {isGenerating && (
        <div className="flex flex-col gap-2 mb-3 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
          <div className="flex justify-between text-xs font-medium text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              {renderStatus}
            </span>
            <span>{renderProgress}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${renderProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mt-1">
        <button
          onClick={() => handleExport('zip')}
          disabled={queue.length === 0 || isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white px-3 py-3 rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <DownloadCloud className="w-4 h-4" />
          Render & ZIP
        </button>

        <button
          onClick={() => handleExport('telegram')}
          disabled={queue.length === 0 || isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:hover:bg-neutral-800 text-neutral-200 px-3 py-3 rounded-lg transition-colors text-sm font-medium border border-neutral-700"
        >
          <Send className="w-4 h-4" />
          Telegram
        </button>
      </div>
    </div>
  );
}
