import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../utils/auth.js'
import './Auth.css'

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const result = loginUser(email.trim().toLowerCase(), password)

    if (!result.success) {
      setError(result.message)
      return
    }

    onAuth(result.user)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue tracking your expenses</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="auth-error">{error}</p>

          <button type="submit">Login</button>
        </form>

        <p className="switch-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
