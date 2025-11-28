import { create } from 'zustand'

interface Transaction {
    id: string
    amount: number
    description: string
    category: string
    date: string
}

interface StoreState {
    incomes: Transaction[]
    expenses: Transaction[]
    addIncome: (transaction: Omit<Transaction, 'id'>) => void
    addExpense: (transaction: Omit<Transaction, 'id'>) => void
    getTotalIncomes: () => number
    getTotalExpenses: () => number
    getBalance: () => number
}

export const useStore = create<StoreState>((set, get) => ({
    incomes: [],
    expenses: [],
    addIncome: (transaction) => set((state) => ({
        incomes: [...state.incomes, { ...transaction, id: Date.now().toString() }]
    })),
    addExpense: (transaction) => set((state) => ({
        expenses: [...state.expenses, { ...transaction, id: Date.now().toString() }]
    })),
    getTotalIncomes: () => {
        return get().incomes.reduce((sum, income) => sum + income.amount, 0)
    },
    getTotalExpenses: () => {
        return get().expenses.reduce((sum, expense) => sum + expense.amount, 0)
    },
    getBalance: () => {
        return get().getTotalIncomes() - get().getTotalExpenses()
    }
}))
