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
      selectedTheme: 'mist_rain',
      isGenerating: false,
      renderProgress: 0,
      renderStatus: 'Idle',

      setGeminiKey: (key) => set({ geminiKey: key }),
      setTelegramToken: (token) => set({ telegramToken: token }),
      setTelegramChatId: (id) => set({ telegramChatId: id }),
      addAudioFiles: (files) => set((state) => ({ audioFiles: [...state.audioFiles, ...files] })),
      setQueue: (items) => set({ queue: items }),
      updateQueueItem: (id, item) =>
        set((state) => ({
          queue: state.queue.map((q) => (q.id === id ? { ...q, ...item } : q)),
        })),
      setSelectedTheme: (theme) => set({ selectedTheme: theme }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setRenderProgress: (progress, status) => set({ renderProgress: progress, renderStatus: status }),
    }),
    {
      name: 'lofi-storage',
      partialize: (state) => ({
        geminiKey: state.geminiKey,
        telegramToken: state.telegramToken,
        telegramChatId: state.telegramChatId,
      }), // only persist keys, not files or queues
    }
  )
);
