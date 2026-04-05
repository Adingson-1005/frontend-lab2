import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user')

  useEffect(() => {
    // Clear browser history for protected routes when user logs out
    if (!user) {
      window.history.pushState(null, null, '/login')
      window.addEventListener('popstate', () => {
        window.history.pushState(null, null, '/login')
      })
    }
  }, [user])

  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute