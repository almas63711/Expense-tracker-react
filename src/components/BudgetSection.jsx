import { useState } from 'react'

function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

export default function BudgetSection({ budget, spent, onSetBudget }) {
  const [input, setInput] = useState('')

  const remaining = budget - spent
  const percent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0

  let message = ''
  let barColor = '#10B981'

  if (budget > 0) {
    if (spent > budget) {
      message = "You've exceeded your monthly budget."
      barColor = '#DC2626'
    } else if (percent >= 80) {
      message = "You're close to your monthly budget."
      barColor = '#F59E0B'
    } else {
      message = "You're within your monthly budget."
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!input) return
    onSetBudget(parseFloat(input))
    setInput('')
  }

  return (
    <section className="card">
      <h2>Monthly Budget</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget">Monthly Budget</label>
          <input
            type="number"
            id="budget"
            placeholder="Enter monthly budget"
            min="0"
            step="0.01"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary-btn">
          Set Budget
        </button>
      </form>

      <div className="budget-info">
        <div>
          <span>Budget</span>
          <strong>{formatCurrency(budget)}</strong>
        </div>
        <div>
          <span>Spent This Month</span>
          <strong>{formatCurrency(spent)}</strong>
        </div>
        <div>
          <span>Remaining</span>
          <strong>{formatCurrency(remaining)}</strong>
        </div>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${percent}%`, background: barColor }}
        />
      </div>

      <p>{message}</p>
    </section>
  )
}
