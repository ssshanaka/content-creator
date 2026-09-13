export type VisualTheme = 'mist_rain' | 'analog_grain' | 'starfield_drift' | 'aurora_wave';

export interface GeneratedItem {
  id: string;
  quote: string;
  subtext: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    textGlow: string;
  };
  cameraMovement: 'zoom_in' | 'pan_up' | 'drift_right' | 'static';
  audioMood: string;
  caption: string;
  hashtags: string[];
  canvasCode?: string;
  isEditingSettings?: boolean;
}

export interface AppState {
  geminiKey: string;
  telegramToken: string;
  telegramChatId: string;
  audioFiles: File[];
  queue: GeneratedItem[];
  previewItemId: string | null;
  contentTopic: string;
  isGenerating: boolean;
  renderProgress: number;
  renderStatus: string;
  
  // Actions
  setGeminiKey: (key: string) => void;
  setTelegramToken: (token: string) => void;
  setTelegramChatId: (id: string) => void;
  addAudioFiles: (files: File[]) => void;
  setQueue: (items: GeneratedItem[]) => void;
  updateQueueItem: (id: string, item: Partial<GeneratedItem>) => void;
  setPreviewItemId: (id: string | null) => void;
  setContentTopic: (topic: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setRenderProgress: (progress: number, status: string) => void;
}
