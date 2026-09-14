import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, GeneratedItem } from './types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      geminiKey: '',
      telegramToken: '',
      telegramChatId: '',
      audioFiles: [],
      queue: [],
      previewItemId: null,
      contentTopic: 'Lofi chill',
      isGenerating: false,
      renderProgress: 0,
      renderStatus: 'Idle',

      setGeminiKey: (key) => set({ geminiKey: key }),
      setTelegramToken: (token) => set({ telegramToken: token }),
      setTelegramChatId: (id) => set({ telegramChatId: id }),
      addAudioFiles: (files) => set((state) => ({ audioFiles: [...state.audioFiles, ...files] })),
      removeAudioFile: (index) =>
        set((state) => ({
          audioFiles: state.audioFiles.filter((_, i) => i !== index),
        })),
      clearAudioFiles: () => set({ audioFiles: [] }),
      setQueue: (items) => set({ queue: items, previewItemId: items.length > 0 ? items[0].id : null }),
      updateQueueItem: (id, item) =>
        set((state) => ({
          queue: state.queue.map((q) => (q.id === id ? { ...q, ...item } : q)),
        })),
      removeQueueItem: (id) =>
        set((state) => {
          const newQueue = state.queue.filter((q) => q.id !== id);
          return {
            queue: newQueue,
            previewItemId: state.previewItemId === id ? (newQueue[0]?.id || null) : state.previewItemId,
          };
        }),
      clearQueue: () => set({ queue: [], previewItemId: null }),
      setPreviewItemId: (id) => set({ previewItemId: id }),
      setContentTopic: (topic) => set({ contentTopic: topic }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setRenderProgress: (progress, status) => set({ renderProgress: progress, renderStatus: status }),
    }),
    {
      name: 'vibeclips-storage',
      partialize: (state) => ({
        geminiKey: state.geminiKey,
        telegramToken: state.telegramToken,
        telegramChatId: state.telegramChatId,
      }), // only persist keys, not files or queues
    }
  )
);
