"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { 
  ListVideo, 
  Play, 
  Palette, 
  Video, 
  Trash2, 
  Sparkles, 
  Loader2, 
  Music, 
  Check, 
  SlidersHorizontal 
} from "lucide-react";
import { generateSingleItem } from "@/lib/gemini";
import { generateCanvasCode } from "@/lib/geminiVisuals";

export function QueueManager() {
  const { 
    queue, 
    updateQueueItem, 
    removeQueueItem, 
    clearQueue, 
    previewItemId, 
    setPreviewItemId, 
    audioFiles, 
    geminiKey, 
    contentTopic 
  } = useStore();

  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  const handleRegenerate = async (item: (typeof queue)[0]) => {
    if (!geminiKey) {
      return alert("Please enter your Gemini API Key in Studio Setup.");
    }
    setRegeneratingId(item.id);
    try {
      const songNames = audioFiles.map((f) => f.name.replace(/\.[^/.]+$/, ""));
      const newItemMeta = await generateSingleItem(
        geminiKey,
        item.theme || contentTopic,
        item.cameraMovement || "static",
        songNames
      );

      newItemMeta.id = item.id;
      newItemMeta.isEditingSettings = item.isEditingSettings;

      const newCode = await generateCanvasCode(geminiKey, newItemMeta);
      newItemMeta.canvasCode = newCode;

      updateQueueItem(item.id, newItemMeta);
    } catch (e) {
      console.error("Failed to regenerate video", e);
      alert("Failed to regenerate video concept.");
    } finally {
      setRegeneratingId(null);
    }
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 sm:p-4 shadow-sm flex flex-col h-full min-h-0 max-h-full overflow-hidden gap-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-100">
          <ListVideo className="w-4 h-4 text-neutral-400" />
          <h2>Queue Manager</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 bg-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-700">
            {queue.length} items
          </span>
          {queue.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Clear all items from the queue?")) {
                  clearQueue();
                }
              }}
              className="text-[11px] text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer rounded hover:bg-neutral-800"
              title="Clear queue"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Queue Items List */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-3 custom-scrollbar">
        {queue.length === 0 ? (
          <div className="text-center text-neutral-500 py-16 flex flex-col items-center justify-center h-full border-2 border-dashed border-neutral-800/80 rounded-xl bg-neutral-950/50">
            <ListVideo className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-semibold text-neutral-300 text-sm">Queue is empty</p>
            <p className="text-xs mt-1 text-neutral-500">Add content to generate items.</p>
          </div>
        ) : (
          queue.map((item, index) => {
            const isPreviewing = item.id === previewItemId;
            const isRegenerating = regeneratingId === item.id;
            const assignedAudio =
              audioFiles.length > 0
                ? audioFiles[index % audioFiles.length]?.name.replace(/\.[^/.]+$/, "")
                : null;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all flex flex-col gap-3.5 group ${
                  isPreviewing
                    ? "bg-neutral-950 border-blue-500/60 ring-1 ring-blue-500/20 shadow-lg"
                    : "bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                {/* Item Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    {assignedAudio && (
                      <span className="flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800/60 truncate max-w-[170px]">
                        <Music className="w-3 h-3 text-neutral-500 shrink-0" />
                        <span className="truncate">{assignedAudio}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {isPreviewing && (
                      <span className="flex items-center gap-1 text-[10px] text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full mr-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Live in Preview
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeQueueItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                      title="Remove concept"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quote Textarea */}
                <div className="flex flex-col gap-1">
                  <textarea
                    className="bg-neutral-900/90 border border-neutral-800 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 rounded-lg resize-none text-xs p-2.5 text-neutral-100 focus:outline-none transition-colors w-full font-sans leading-relaxed"
                    rows={2}
                    value={item.quote}
                    onChange={(e) => updateQueueItem(item.id, { quote: e.target.value })}
                    placeholder="Enter on-screen quote..."
                  />
                </div>

                {/* Video Settings Drawer */}
                {item.isEditingSettings ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/60">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                        <Palette className="w-3 h-3 text-neutral-400" />
                        Visual Theme
                      </label>
                      <input
                        type="text"
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                        value={item.theme || ""}
                        onChange={(e) => updateQueueItem(item.id, { theme: e.target.value })}
                        placeholder="e.g. Cyberpunk rain"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                        <Video className="w-3 h-3 text-neutral-400" />
                        Camera Motion
                      </label>
                      <select
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                        value={item.cameraMovement || "static"}
                        onChange={(e) =>
                          updateQueueItem(item.id, {
                            cameraMovement: e.target.value as (typeof item)["cameraMovement"],
                          })
                        }
                      >
                        <option value="zoom_in">Zoom In</option>
                        <option value="pan_up">Pan Up</option>
                        <option value="drift_right">Drift Right</option>
                        <option value="static">Static</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateQueueItem(item.id, { isEditingSettings: true })}
                    className="flex items-center justify-center gap-1.5 text-[11px] font-medium bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-300 py-1.5 rounded-lg border border-neutral-800/60 transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    Customize theme & camera motion
                  </button>
                )}

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                  <span className="text-[10px] font-mono text-neutral-500">
                    ID: {item.id.slice(0, 8)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRegenerate(item)}
                      disabled={isRegenerating}
                      className="flex items-center gap-1.5 text-xs font-medium bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-neutral-300 px-3 py-1.5 rounded-lg transition-colors border border-neutral-800 cursor-pointer"
                    >
                      {isRegenerating ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-neutral-400" />
                          <span>Regenerating...</span>
                        </>
                      ) : (
                        <span>Regen Video</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewItemId(item.id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        isPreviewing
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {isPreviewing ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Previewing</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
