function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

export default function SummaryCards({ income, expense }) {
  const balance = income - expense

  return (
    <section className="summary">
      <div className="summary-card">
        <h3>Total Balance</h3>
        <p>{formatCurrency(balance)}</p>
      </div>

      <div className="summary-card">
        <h3>Total Income</h3>
        <p>{formatCurrency(income)}</p>
      </div>

      <div className="summary-card">
        <h3>Total Expenses</h3>
        <p>{formatCurrency(expense)}</p>
      </div>
    </section>
  )
}
