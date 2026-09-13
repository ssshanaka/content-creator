"use client";

import React, { useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { MonitorPlay } from 'lucide-react';
import { CanvasRenderer } from '@/lib/canvas/renderer';

export function CanvasPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { queue, previewItemId, audioFiles } = useStore();
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const index = queue.findIndex(q => q.id === previewItemId);
    const previewItem = index !== -1 ? queue[index] : undefined;
    
    if (!previewItem) {
      // Draw idle state
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#525252';
      ctx.font = 'bold 48px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Select an item to preview', canvas.width / 2, canvas.height / 2);
      return;
    }

    let artistName: string | undefined = undefined;
    let songName: string | undefined = undefined;
    let audio: HTMLAudioElement | null = null;
    let objectUrl: string | null = null;

    if (audioFiles.length > 0) {
      const file = audioFiles[index % audioFiles.length];
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      if (baseName.includes(' - ')) {
        const parts = baseName.split(' - ');
        artistName = parts[0].trim();
        songName = parts.slice(1).join(' - ').trim();
      } else {
        songName = baseName;
      }
      
      objectUrl = URL.createObjectURL(file);
      audio = new Audio(objectUrl);
      audio.loop = true;
      audio.play().catch(e => console.warn('Audio playback prevented by browser policy:', e));
    }

    try {
      const renderer = new CanvasRenderer(canvas);
      startTimeRef.current = performance.now();

      const renderLoop = (timestamp: number) => {
        const timeMs = timestamp - startTimeRef.current;
        renderer.renderFrame(previewItem, timeMs, artistName, songName);
        animationRef.current = requestAnimationFrame(renderLoop);
      };

      animationRef.current = requestAnimationFrame(renderLoop);
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audio) {
        audio.pause();
        audio.src = '';
      }
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [previewItemId, queue, audioFiles]);

  return (
    <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-neutral-100">
        <MonitorPlay className="w-5 h-5 text-neutral-400" />
        <h2>Live Preview</h2>
      </div>
      <div className="relative w-full rounded-xl overflow-hidden border-2 border-neutral-800 bg-black shadow-inner">
        <canvas
          ref={canvasRef}
          width={1080}
          height={1920}
          className="w-full h-auto aspect-[9/16] object-contain"
        />
        
        {/* Safe zone overlay */}
        <div className="absolute inset-0 pointer-events-none border border-neutral-700/30 m-4 rounded" />
      </div>
    </div>
  );
}
