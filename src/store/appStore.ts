import { create } from 'zustand'
import { UserSettings, PromptHistory, GeneratedImage, GeneratedVideo } from '../types'
import { DEFAULT_SETTINGS } from '../utils/constants'

interface AppStore {
  // Settings
  settings: UserSettings
  updateSettings: (settings: Partial<UserSettings>) => void

  // History
  promptHistory: PromptHistory[]
  addPromptToHistory: (prompt: PromptHistory) => void
  removeFromHistory: (id: string) => void
  toggleFavorite: (id: string) => void

  // Gallery
  generatedImages: GeneratedImage[]
  generatedVideos: GeneratedVideo[]
  addGeneratedImage: (image: GeneratedImage) => void
  addGeneratedVideo: (video: GeneratedVideo) => void
  removeGeneratedImage: (id: string) => void
  removeGeneratedVideo: (id: string) => void
}

export const useAppStore = create<AppStore>((set) => ({
  // Settings
  settings: DEFAULT_SETTINGS as UserSettings,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  // History
  promptHistory: [],
  addPromptToHistory: (prompt) =>
    set((state) => ({
      promptHistory: [prompt, ...state.promptHistory].slice(0, 100),
    })),
  removeFromHistory: (id) =>
    set((state) => ({
      promptHistory: state.promptHistory.filter((p) => p.id !== id),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      promptHistory: state.promptHistory.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    })),

  // Gallery
  generatedImages: [],
  generatedVideos: [],
  addGeneratedImage: (image) =>
    set((state) => ({
      generatedImages: [image, ...state.generatedImages],
    })),
  addGeneratedVideo: (video) =>
    set((state) => ({
      generatedVideos: [video, ...state.generatedVideos],
    })),
  removeGeneratedImage: (id) =>
    set((state) => ({
      generatedImages: state.generatedImages.filter((img) => img.id !== id),
    })),
  removeGeneratedVideo: (id) =>
    set((state) => ({
      generatedVideos: state.generatedVideos.filter((vid) => vid.id !== id),
    })),
}))