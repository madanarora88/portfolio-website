import { create } from 'zustand'

interface AskAIState {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useAskAIStore = create<AskAIState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}))
