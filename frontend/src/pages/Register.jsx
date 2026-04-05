import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Register.css'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  function validatePassword(pw) {
    if (pw.length < 8) return 'Password must be at least 8 characters.'
    if (!/[A-Z]/.test(pw)) return 'Password must contain at least 1 uppercase letter.'
    if (!/[0-9]/.test(pw)) return 'Password must contain at least 1 number.'
    if (!/[!@#$%^&*]/.test(pw)) return 'Password must contain at least 1 symbol (!@#$%^&*).'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const validationError = validatePassword(password)
    if (validationError) {
      setError(validationError)
      return
    }

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)

    try {
      const res = await fetch('http://localhost/auth-api/register.php', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.message)
      }
    } catch {
      setError('Could not connect to server.')
    }
  }

  return (
    <div className="parent-container">
      <div className="register-container">
      <h2>Welcome to -----</h2>
      <h4>Create your account</h4> <br />
      {success ? (
        <div>
          <p className="success">Registration successful!</p>
          <Link to="/login">Go to Login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label><br />
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label><br />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label><br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      )}
      <br />
      <p
        onClick={() => navigate('/login')}
        style={{ fontSize: '0.9rem', cursor: 'pointer' }}
      >
        Have an account already? Click to Login
      </p>
    </div>
    </div>
  )
}

export default Register