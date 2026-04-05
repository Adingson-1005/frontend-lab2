import { useNavigate } from 'react-router-dom'
import '../css/Home.css'

function Home() {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="parent-container">
      <div className="home-card">
        <div className="home-header">
          <h2>Welcome back</h2>
          <p className="home-subtitle">Your account is ready for action.</p>
        </div>
        <p className="welcome-text">
          Logged in as <span>{user}</span>
        </p>
        <button className="primary-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home