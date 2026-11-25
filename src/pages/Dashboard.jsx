import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import SummaryCards from '../components/SummaryCards.jsx'
import TransactionForm from '../components/TransactionForm.jsx'
import BudgetSection from '../components/BudgetSection.jsx'
import SpendingOverview from '../components/SpendingOverview.jsx'
import TransactionList from '../components/TransactionList.jsx'
import { getTransactions, saveTransactions, getBudget, saveBudget } from '../utils/storage.js'
import { logoutUser } from '../utils/auth.js'
import '../App.css'

export default function Dashboard({ user, onLogout }) {
  const [transactions, setTransactions] = useState([])
  const [budget, setBudget] = useState(0)

  // Load this user's saved data on mount
  useEffect(() => {
    setTransactions(getTransactions(user.id))
    setBudget(getBudget(user.id))
  }, [user.id])

  function addTransaction(transaction) {
    const updated = [...transactions, transaction]
    setTransactions(updated)
    saveTransactions(user.id, updated)
  }

  function deleteTransaction(id) {
    const updated = transactions.filter((t) => t.id !== id)
    setTransactions(updated)
    saveTransactions(user.id, updated)
  }

  function clearAll() {
    if (!window.confirm('Clear all transactions? This cannot be undone.')) return
    setTransactions([])
    saveTransactions(user.id, [])
  }

  function setMonthlyBudget(amount) {
    setBudget(amount)
    saveBudget(user.id, amount)
  }

  function handleLogout() {
    logoutUser()
    onLogout()
  }

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <>
      <Header userName={user.name} onClearAll={clearAll} onLogout={handleLogout} />

      <main className="container">
        <SummaryCards income={income} expense={expense} />

        <TransactionForm onAdd={addTransaction} />

        <BudgetSection budget={budget} spent={expense} onSetBudget={setMonthlyBudget} />

        <SpendingOverview transactions={transactions} />

        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </main>
    </>
  )
}
