'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Expense = {
  id: string;
  description: string;
  amount: number;
};

type ExpensesContextType = {
  expenses: Expense[];
  total: number;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => void;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const id = Date.now().toString();
    setExpenses((currentExpenses) => [{ ...expense, id }, ...currentExpenses]);
  }, []);

  const removeExpense = useCallback((id: string) => {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
  }, []);

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const value = useMemo(
    () => ({ expenses, addExpense, removeExpense, total }),
    [expenses, addExpense, removeExpense, total],
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }

  return context;
}
