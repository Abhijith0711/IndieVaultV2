// File: frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { Link } from "react-router-dom"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDevelopers: 0,
    totalGames: 0,
    totalRevenue: 0
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token")
      
      // Fetch all necessary data
      const [usersRes, devsRes, gamesRes] = await Promise.all([
        fetch(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/admin/developers`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/games`)
      ])

      const users = await usersRes.json()
      const devs = await devsRes.json()
      const games = await gamesRes.json()

      setStats({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalDevelopers: Array.isArray(devs) ? devs.length : 0,
        totalGames: Array.isArray(games) ? games.length : 0,
        totalRevenue: 0 // You can calculate this based on your order data
      })
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: "👥", color: "#a259ff", link: "/admin/users" },
    { title: "Total Developers", value: stats.totalDevelopers, icon: "👨‍💻", color: "#ff6b9d", link: "/admin/users" },
    { title: "Total Games", value: stats.totalGames, icon: "🎮", color: "#ffa500", link: "/admin/games" },
    { title: "Total Revenue", value: `$${stats.totalRevenue}`, icon: "💰", color: "#00d4aa", link: "#" }
  ]

  if (loading) {
    return (
      <div style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p style={{ fontSize: '1.5rem', color: '#a259ff' }}>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          ⚡ Admin Dashboard
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
          Manage and monitor your platform
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s',
              textDecoration: 'none',
              display: 'block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`
              e.currentTarget.style.borderColor = stat.color
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '3rem' }}>{stat.icon}</span>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: stat.color
              }}>
                {typeof stat.value === 'number' ? stat.value : stat.value}
              </div>
            </div>
            <h3 style={{ 
              fontSize: '1rem', 
              color: 'rgba(255, 255, 255, 0.7)', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              {stat.title}
            </h3>
            <p style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: 'white',
              margin: 0
            }}>
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1.5rem'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { label: 'Manage Users', icon: '👥', link: '/admin/users', color: '#a259ff' },
            { label: 'Manage Games', icon: '🎮', link: '/admin/games', color: '#ff6b9d' },
            { label: 'View Reports', icon: '📊', link: '#', color: '#ffa500' },
            { label: 'Settings', icon: '⚙️', link: '#', color: '#00d4aa' }
          ].map((action, index) => (
            <Link
              key={index}
              to={action.link}
              style={{
                background: `${action.color}15`,
                border: `2px solid ${action.color}40`,
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${action.color}25`
                e.currentTarget.style.borderColor = action.color
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${action.color}15`
                e.currentTarget.style.borderColor = `${action.color}40`
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>{action.icon}</span>
              <span style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: 'white' 
              }}>
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1.5rem'
        }}>
          Platform Status
        </h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
            <span>🟢 Platform Status</span>
            <span style={{ color: '#00d4aa', fontWeight: '600' }}>Operational</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
            <span>📈 Active Sessions</span>
            <span style={{ fontWeight: '600' }}>24</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
            <span>💾 Database</span>
            <span style={{ color: '#00d4aa', fontWeight: '600' }}>Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}