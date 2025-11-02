// File: frontend/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [userRole, setUserRole] = useState(null)
  const [username, setUsername] = useState("")

  // Get user info from localStorage
  useEffect(() => {
    if (token) {
      try {
        // Get role from localStorage (set during login)
        const storedRole = localStorage.getItem("userRole")
        const storedUsername = localStorage.getItem("username")
        
        setUserRole(storedRole)
        setUsername(storedUsername || "User")
        
        console.log("User info:", { username: storedUsername, role: storedRole })
      } catch (err) {
        console.error("Error getting user info:", err)
      }
    } else {
      setUserRole(null)
      setUsername("")
    }
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userRole")
    setUserRole(null)
    setUsername("")
    navigate("/login")
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Indie Vault</Link>
      <div className={styles.links}>
        {token ? (
          <>
            {/* Display username */}
            <span className={styles.username}>
              {userRole === 'developer' ? '👨‍💻' : '👤'} {username}
            </span>
            
            <Link to="/">Home</Link>
            
            {/* User-only links */}
            {userRole === 'user' && (
              <>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/library">Library</Link>
              </>
            )}
            
            {/* Developer-only links */}
            {userRole === 'developer' && (
              <>
                <Link to="/developer/dashboard">My Games</Link>
                <Link to="/upload">Upload Game</Link>
              </>
            )}
            
            {/* Admin link - for future use */}
            {userRole === 'admin' && (
              <Link to="/admin/dashboard">Admin</Link>
            )}
            
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}