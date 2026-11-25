export default function Header({ userName, onClearAll, onLogout }) {
  return (
    <header className="header">
      <div>
        <h1>Expense Tracker</h1>
        <p>Manage your money smarter</p>
      </div>

      <div className="header-actions">
        <span className="welcome-text">Hi, {userName}</span>

        <button className="danger-btn" onClick={onClearAll}>
          Clear All
        </button>

        <button className="danger-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
