import { useState } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/storage.js'

function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

const ALL_CATEGORIES = ['All', ...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export default function TransactionList({ transactions, onDelete }) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="card">
      <div className="transaction-header">
        <h2>Transactions</h2>

        <div className="transaction-controls">
          <input
            type="text"
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="transaction-list">
        {filtered.length === 0 ? (
          <p className="empty-message">No transactions yet.</p>
        ) : (
          filtered
            .slice()
            .reverse()
            .map((t) => (
              <div className="transaction-item" key={t.id}>
                <div>
                  <strong>{t.description}</strong>
                  <p>
                    {t.category} • {t.date}
                  </p>
                </div>

                <div className="transaction-right">
                  <span className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                  </span>

                  <button className="delete-btn" onClick={() => onDelete(t.id)}>
                    ✕
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </section>
  )
}
