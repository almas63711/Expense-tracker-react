import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { getCurrentUser } from './utils/auth.js'

// Blocks access to a route unless someone is logged in
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const [user, setUser] = useState(getCurrentUser())

  // Keep state in sync if login/logout happens in another tab
  useEffect(() => {
    const handleStorage = () => setUser(getCurrentUser())
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login onAuth={setUser} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup onAuth={setUser} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} onLogout={() => setUser(null)} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
