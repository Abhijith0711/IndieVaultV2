// File: frontend/src/pages/ManageUsers.jsx
import { useState, useEffect } from "react"
import { API_URL } from "../config"

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("users")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      
      const [usersRes, devsRes] = await Promise.all([
        fetch(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/admin/developers`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      const usersData = await usersRes.json()
      const devsData = await devsRes.json()

      setUsers(Array.isArray(usersData) ? usersData : [])
      setDevelopers(Array.isArray(devsData) ? devsData : [])
    } catch (err) {
      console.error("Error fetching data:", err)
      alert("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/admin/${type}s/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        alert(`${type} deleted successfully`)
        fetchData() // Refresh data
      } else {
        alert("Failed to delete")
      }
    } catch (err) {
      console.error("Error deleting:", err)
      alert("Error deleting " + type)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p style={{ fontSize: '1.5rem', color: '#a259ff' }}>Loading...</p>
      </div>
    )
  }

  const currentData = selectedTab === "users" ? users : developers

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          👥 Manage Users
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
          View and manage all platform users
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setSelectedTab("users")}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: `2px solid ${selectedTab === "users" ? '#a259ff' : 'rgba(255, 255, 255, 0.1)'}`,
            background: selectedTab === "users" ? 'rgba(162, 89, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: selectedTab === "users" ? '#a259ff' : 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          👤 Users ({users.length})
        </button>
        <button
          onClick={() => setSelectedTab("developers")}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: `2px solid ${selectedTab === "developers" ? '#a259ff' : 'rgba(255, 255, 255, 0.1)'}`,
            background: selectedTab === "developers" ? 'rgba(162, 89, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: selectedTab === "developers" ? '#a259ff' : 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          👨‍💻 Developers ({developers.length})
        </button>
      </div>

      {/* Table */}
      {currentData.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255, 255, 255, 0.5)' }}>
            No {selectedTab} found
          </p>
        </div>
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                background: 'rgba(162, 89, 255, 0.1)',
                borderBottom: '2px solid rgba(162, 89, 255, 0.3)'
              }}>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: '#a259ff', fontWeight: '700' }}>
                  Name
                </th>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: '#a259ff', fontWeight: '700' }}>
                  Email
                </th>
                {selectedTab === "developers" && (
                  <th style={{ padding: '1.5rem', textAlign: 'left', color: '#a259ff', fontWeight: '700' }}>
                    Games
                  </th>
                )}
                <th style={{ padding: '1.5rem', textAlign: 'left', color: '#a259ff', fontWeight: '700' }}>
                  Joined
                </th>
                <th style={{ padding: '1.5rem', textAlign: 'center', color: '#a259ff', fontWeight: '700' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr 
                  key={item._id}
                  style={{
                    borderBottom: index !== currentData.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1.5rem', color: 'white', fontWeight: '500' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    {item.email}
                  </td>
                  {selectedTab === "developers" && (
                    <td style={{ padding: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {item.games?.length || 0} games
                    </td>
                  )}
                  <td style={{ padding: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(item._id, selectedTab === "users" ? "user" : "developer")}
                      style={{
                        padding: '0.6rem 1.5rem',
                        borderRadius: '8px',
                        border: '2px solid #ff4444',
                        background: 'rgba(255, 68, 68, 0.1)',
                        color: '#ff4444',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#ff4444'
                        e.target.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 68, 68, 0.1)'
                        e.target.style.color = '#ff4444'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}