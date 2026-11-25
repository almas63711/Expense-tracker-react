import { useState } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/storage.js'

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  function handleTypeChange(newType) {
    setType(newType)
    setCategory('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!amount || !category || !description || !date) return

    onAdd({
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date
    })

    setAmount('')
    setCategory('')
    setDescription('')
    setDate('')
  }

  return (
    <section className="card">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div className="type-section">
          <label>Transaction Type</label>
          <div className="type-buttons">
            <button
              type="button"
              className={`type-btn ${type === 'expense' ? 'active' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-btn ${type === 'income' ? 'active' : ''}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">{type === 'expense' ? 'Category' : 'Income Source'}</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Example: Lunch"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary-btn">
          Add {type === 'expense' ? 'Expense' : 'Income'}
        </button>
      </form>
    </section>
  )
}
