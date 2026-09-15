"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { DownloadCloud, PlayCircle, Send, Loader2, Film, CheckCircle2 } from "lucide-react";
import { encodeVideo } from "@/lib/video/encoder";
import { processAudio } from "@/lib/video/audioProcessor";
import { exportToZip } from "@/lib/export/zipService";
import { postToTelegram } from "@/lib/export/telegramBridge";
import { CanvasRenderer } from "@/lib/canvas/renderer";

export function ExportActions() {
  const {
    isGenerating,
    setIsGenerating,
    renderProgress,
    renderStatus,
    queue,
    audioFiles,
    telegramToken,
    telegramChatId,
  } = useStore();

  const handleExport = async (type: "zip" | "telegram") => {
    setIsGenerating(true);
    useStore.getState().setRenderProgress(0, "Initializing Engine...");

    try {
      const generatedVideos: { blob: Blob; filename: string }[] = [];
      let captionsText = "";

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        useStore
          .getState()
          .setRenderProgress(
            Math.round((i / queue.length) * 100),
            `Rendering video ${i + 1} of ${queue.length}...`
          );

        let audioBuffer;
        let artistName: string | undefined = undefined;
        let songName: string | undefined = undefined;
        // Generate duration between 5 and 20 seconds
        const randomDuration = Math.floor(Math.random() * 16) + 5;

        // Cycle through audio files if any
        if (audioFiles.length > 0) {
          const file = audioFiles[i % audioFiles.length];
          audioBuffer = await processAudio(file, randomDuration, 1);
          // Parse artist and song name
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          if (baseName.includes(" - ")) {
            const parts = baseName.split(" - ");
            artistName = parts[0].trim();
            songName = parts.slice(1).join(" - ").trim();
          } else {
            songName = baseName;
          }
        }

        const rendererCanvas = document.createElement("canvas");
        const renderer = new CanvasRenderer(rendererCanvas);

        const blob = await encodeVideo({
          canvas: rendererCanvas,
          canvasWidth: 1080,
          canvasHeight: 1920,
          fps: 30,
          durationSeconds: randomDuration,
          audioBuffer,
          renderFrame: (_ctx, timeMs) => {
            renderer.renderFrame(item, timeMs, artistName, songName);
          },
        });

        const filename = `video_${i + 1}.mp4`;
        generatedVideos.push({ blob, filename });
        captionsText += `\n\n--- ${filename} ---\n${item.caption}\n${item.hashtags.join(" ")}`;

        if (type === "telegram") {
          if (!telegramToken || !telegramChatId) {
            console.warn("Telegram tokens missing, skipping telegram upload.");
          } else {
            useStore
              .getState()
              .setRenderProgress(
                Math.round(((i + 0.5) / queue.length) * 100),
                `Sending video ${i + 1} to Telegram...`
              );
            await postToTelegram({
              botToken: telegramToken,
              chatId: telegramChatId,
              videoBlob: blob,
              caption: item.caption + "\n" + item.hashtags.join(" "),
            });
          }
        }
      }

      useStore.getState().setRenderProgress(100, "Packaging files...");

      if (type === "zip") {
        await exportToZip({
          videos: generatedVideos,
          captions: captionsText,
          zipFilename: "vibeclips_batch_export.zip",
        });
      }

      useStore.getState().setRenderProgress(100, "Completed successfully!");
    } catch (e) {
      console.error(e);
      alert("Error during export: " + String(e));
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        useStore.getState().setRenderProgress(0, "Idle");
      }, 2500);
    }
  };

  const hasQueue = queue.length > 0;

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 sm:p-3.5 shadow-sm shrink-0 flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-100">
          <PlayCircle className="w-4 h-4 text-neutral-400" />
          <h2>Export Engine</h2>
        </div>
        <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
          1080×1920
        </span>
      </div>

      {/* Specs & Status */}
      <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-lg p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400">Batch Status:</span>
          {hasQueue ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {queue.length} {queue.length === 1 ? "video" : "videos"} ready
            </span>
          ) : (
            <span className="text-neutral-500">Queue is empty</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 pt-1 border-t border-neutral-800/60 text-[9px] text-neutral-400">
          <span className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
            1080×1920 (9:16)
          </span>
          <span className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
            H.264 MP4
          </span>
          <span className="bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 text-emerald-400/90">
            Zero Watermark
          </span>
        </div>
      </div>

      {/* Rendering Progress Display */}
      {isGenerating && (
        <div className="flex flex-col gap-2 bg-neutral-950 border border-blue-500/30 p-3 rounded-lg shadow-inner">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-medium text-neutral-200 truncate">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400 shrink-0" />
              <span className="truncate">{renderStatus}</span>
            </span>
            <span className="font-mono text-blue-400 font-bold text-xs">{renderProgress}%</span>
          </div>
          <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden border border-neutral-800">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${renderProgress}%` }}
            />
          </div>
          <span className="text-[9px] text-neutral-500 text-center">
            Rendering natively on GPU • Keep tab open
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleExport("zip")}
          disabled={!hasQueue || isGenerating}
          className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white px-2.5 py-2 rounded-lg transition-all text-xs font-semibold shadow hover:shadow-blue-500/20 cursor-pointer disabled:cursor-not-allowed"
        >
          <DownloadCloud className="w-3.5 h-3.5" />
          Render & ZIP
        </button>

        <button
          type="button"
          onClick={() => handleExport("telegram")}
          disabled={!hasQueue || isGenerating}
          className="w-full flex items-center justify-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-950 text-neutral-200 px-2.5 py-2 rounded-lg transition-colors text-xs font-medium border border-neutral-800 hover:border-neutral-700 cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          Telegram
        </button>
      </div>
    </div>
  );
}
