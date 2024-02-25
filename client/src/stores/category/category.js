import { create } from 'zustand'

export const useCategorySotre = create(set => ({
    category: 'all',
    setCategory: category => set({ category }),
}))
