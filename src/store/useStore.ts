import { create } from 'zustand'

interface StoreState {
    balance: number
    increaseBalance: (amount: number) => void
    decreaseBalance: (amount: number) => void
}

export const useStore = create<StoreState>((set) => ({
    balance: 0,
    increaseBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
    decreaseBalance: (amount) => set((state) => ({ balance: state.balance - amount })),
}))
