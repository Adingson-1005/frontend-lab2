import { Link } from 'react-router-dom'
import '../css/Landing.css'

function Landing() {
  return (
    <div className="parent-container">
      <div className="landing-card">
        <span className="eyebrow">Welcome</span>
        <h1>Start your journey</h1>
        <p>Register or login to access your dashboard and manage your account securely.</p>
        <div className="button-group">
          <Link className="primary-btn" to="/register">Register</Link>
          <Link className="secondary-btn" to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing