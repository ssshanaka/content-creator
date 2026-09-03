"use client";

import React, { useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { MonitorPlay } from 'lucide-react';

export function CanvasPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { queue } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid pattern for "dummy" look
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    for(let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for(let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Text
    ctx.fillStyle = '#525252';
    ctx.font = 'bold 48px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (queue.length > 0) {
      ctx.fillText('Preview Available', canvas.width / 2, canvas.height / 2 - 30);
      ctx.font = '32px system-ui, sans-serif';
      ctx.fillStyle = '#404040';
      ctx.fillText(`Item ID: ${queue[0].id.substring(0, 8)}`, canvas.width / 2, canvas.height / 2 + 30);
    } else {
      ctx.fillText('No Items in Queue', canvas.width / 2, canvas.height / 2);
    }
  }, [queue]);

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
