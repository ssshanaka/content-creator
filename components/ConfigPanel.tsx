"use client";

import React, { useState, useCallback } from "react";
import { useStore } from "@/lib/store";
import { 
  UploadCloud, 
  Settings, 
  Sparkles, 
  Music, 
  Loader2, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  X, 
  Trash2, 
  ChevronDown, 
  Send 
} from "lucide-react";
import { generateBatchContent } from "@/lib/gemini";
import { generateCanvasCode } from "@/lib/geminiVisuals";

const GENRE_PRESETS = [
  "Lofi chill",
  "Synthwave",
  "Dark ambient",
  "Cyberpunk",
  "Rap / Hip Hop",
  "Indie rock",
];

export function ConfigPanel() {
  const {
    geminiKey,
    setGeminiKey,
    telegramToken,
    setTelegramToken,
    telegramChatId,
    setTelegramChatId,
    contentTopic,
    setContentTopic,
    audioFiles,
    addAudioFiles,
    removeAudioFile,
    clearAudioFiles,
    setQueue,
  } = useStore();

  const [isGeneratingQuotes, setIsGeneratingQuotes] = useState(false);
  const [generationProgress, setGenerationProgress] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showTelegramSettings, setShowTelegramSettings] = useState(
    Boolean(telegramToken || telegramChatId)
  );

  const handleGenerateQuotes = async () => {
    if (!geminiKey) return alert("Please enter a Gemini API Key to generate content.");
    setIsGeneratingQuotes(true);
    setGenerationProgress("Synthesizing 20 concepts with Gemini...");
    try {
      const songNames = audioFiles.map((f) => f.name.replace(/\.[^/.]+$/, ""));
      const items = await generateBatchContent(geminiKey, contentTopic, songNames);
      setQueue(items);

      // Sequentially generate canvas procedural code for each item
      for (let i = 0; i < items.length; i++) {
        setGenerationProgress(`Rendering canvas code (${i + 1}/${items.length})...`);
        const code = await generateCanvasCode(geminiKey, items[i]);

        items[i].canvasCode = code;
        useStore.getState().updateQueueItem(items[i].id, { canvasCode: code });

        // Delay to spread requests and respect rate limits
        if (i < items.length - 1) {
          await new Promise((r) => setTimeout(r, 6000));
        }
      }

      setGenerationProgress("");
    } catch (e) {
      alert("Error generating concepts: " + String(e));
      setGenerationProgress("");
    } finally {
      setIsGeneratingQuotes(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("audio/")
      );
      if (files.length > 0) {
        addAudioFiles(files);
      }
    },
    [addAudioFiles]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="bg-neutral-900/70 border border-neutral-800 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Settings className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Studio Setup</h2>
            <p className="text-[11px] text-neutral-400">Step 1 • AI model & audio setup</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full border border-neutral-700/60 uppercase">
          Config
        </span>
      </div>

      {/* Gemini API Key */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
            Gemini API Key
            {geminiKey ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            ) : (
              <span className="text-[10px] text-amber-400/90 font-medium">(Required)</span>
            )}
          </label>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            Get free key
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            className="w-full bg-neutral-950 border border-neutral-800 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-neutral-100 placeholder:text-neutral-600 transition-colors font-mono"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIzaSy..."
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors p-1"
            aria-label={showApiKey ? "Hide API key" : "Show API key"}
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content Topic / Genre */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-neutral-300">
          Visual Vibe & Genre
        </label>
        <div className="flex flex-wrap gap-1.5">
          {GENRE_PRESETS.map((genre) => {
            const isSelected = contentTopic === genre;
            return (
              <button
                key={genre}
                type="button"
                onClick={() => setContentTopic(genre)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-neutral-950 border-white font-medium shadow-sm"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          className="bg-neutral-950 border border-neutral-800 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 transition-colors mt-1"
          value={contentTopic}
          onChange={(e) => setContentTopic(e.target.value)}
          placeholder="Or type custom theme: e.g. Rainy neon Tokyo, melancholic piano..."
        />
      </div>

      {/* Audio Sources */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-neutral-400" />
            Audio Tracks ({audioFiles.length})
          </label>
          {audioFiles.length > 0 && (
            <button
              type="button"
              onClick={clearAudioFiles}
              className="text-[11px] text-neutral-500 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("audio-upload")?.click()}
          className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? "border-blue-500 bg-blue-500/10 text-blue-300"
              : "border-neutral-800 hover:border-neutral-700 bg-neutral-950/60 text-neutral-400"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center mb-2.5 border border-neutral-800 text-neutral-300">
            <UploadCloud className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-neutral-200">
            Drag & drop audio files here or browse
          </span>
          <span className="text-[11px] text-neutral-500 mt-0.5">
            MP3, WAV, AAC (up to 50MB each)
          </span>
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
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {audioFiles.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="text-xs text-neutral-300 bg-neutral-950 border border-neutral-800/80 px-3 py-2 rounded-lg flex items-center justify-between group hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-2 truncate mr-2">
                  <span className="text-[10px] font-mono text-neutral-500">#{i + 1}</span>
                  <span className="truncate text-neutral-200">{file.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAudioFile(i);
                    }}
                    className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Telegram Accordion */}
      <div className="border-t border-neutral-800 pt-3">
        <button
          type="button"
          onClick={() => setShowTelegramSettings(!showTelegramSettings)}
          className="flex items-center justify-between w-full text-xs font-semibold text-neutral-400 hover:text-neutral-200 transition-colors py-1 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-neutral-500" />
            <span>Optional: Telegram Phone Bridge</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${
              showTelegramSettings ? "rotate-180" : ""
            }`}
          />
        </button>

        {showTelegramSettings && (
          <div className="flex flex-col gap-3 mt-3 pt-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-neutral-400">
                Telegram Bot Token
              </label>
              <input
                type="password"
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                placeholder="123456:ABC-DEF..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-neutral-400">
                Telegram Chat ID
              </label>
              <input
                type="text"
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                placeholder="-1001234567890"
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Generate Button */}
      <button
        type="button"
        onClick={handleGenerateQuotes}
        disabled={isGeneratingQuotes}
        className="w-full flex items-center justify-center gap-2.5 bg-white text-neutral-950 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-white/10 transition-all text-sm tracking-tight cursor-pointer"
      >
        {isGeneratingQuotes ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
            <span>{generationProgress || "Generating Visuals..."}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span>Generate 20 Video Concepts</span>
          </>
        )}
      </button>
    </div>
  );
}
