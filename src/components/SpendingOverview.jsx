function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

const TRACKED_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other']

export default function SpendingOverview({ transactions }) {
  const expenseTotal = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totals = TRACKED_CATEGORIES.reduce((acc, cat) => {
    if (cat === 'Other') {
      // Everything not in the first three tracked categories rolls into "Other"
      acc[cat] = transactions
        .filter((t) => t.type === 'expense' && !TRACKED_CATEGORIES.slice(0, 3).includes(t.category))
        .reduce((sum, t) => sum + t.amount, 0)
    } else {
      acc[cat] = transactions
        .filter((t) => t.type === 'expense' && t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0)
    }
    return acc
  }, {})

  return (
    <section className="card">
      <h2>Spending Overview</h2>

      {TRACKED_CATEGORIES.map((cat) => {
        const value = totals[cat]
        const percent = expenseTotal > 0 ? (value / expenseTotal) * 100 : 0

        return (
          <div className="spending-item" key={cat}>
            <div className="spending-header">
              <span>{cat}</span>
              <span>{formatCurrency(value)}</span>
            </div>
            <div className="bar-container">
              <div className="spending-bar" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )
      })}
    </section>
  )
}
