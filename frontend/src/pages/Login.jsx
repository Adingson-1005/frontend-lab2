import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    try {
      const res = await fetch('http://localhost/auth-api/login.php', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('user', data.email)
        navigate('/home')
      } else {
        setError(data.message)
      }
    } catch {
      setError('Could not connect to server.')
    }
  }

  return (
    <div className="parent-container">
      <div className="login-container">
        <h2>Login</h2>
        <h4>Welcome back</h4> <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label><br />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label><br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <br />
        <p type="button" style={{ fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => navigate('/register')}>Don't have an account? Click to Register</p>
      </div>
    </div>
  )
}

export default Login