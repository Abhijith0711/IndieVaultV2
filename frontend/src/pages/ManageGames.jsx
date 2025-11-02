// File: frontend/src/pages/ManageGames.jsx
import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { Link } from "react-router-dom"

export default function ManageGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const res = await fetch(`${API_URL}/games`)
      const data = await res.json()
      setGames(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching games:", err)
      alert("Failed to fetch games")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/admin/games/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        alert("Game deleted successfully")
        fetchGames() // Refresh games
      } else {
        alert("Failed to delete game")
      }
    } catch (err) {
      console.error("Error deleting game:", err)
      alert("Error deleting game")
    }
  }

  const filteredGames = games.filter(game =>
    game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.developer?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p style={{ fontSize: '1.5rem', color: '#a259ff' }}>Loading games...</p>
      </div>
    )
  }

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
          🎮 Manage Games
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
          View and manage all games on the platform
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="🔍 Search games by title or developer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#a259ff'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
        />
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          padding: '1rem 2rem',
          background: 'rgba(162, 89, 255, 0.1)',
          border: '2px solid rgba(162, 89, 255, 0.3)',
          borderRadius: '12px'
        }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            Total Games
          </span>
          <p style={{ color: '#a259ff', fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>
            {games.length}
          </p>
        </div>
        <div style={{
          padding: '1rem 2rem',
          background: 'rgba(255, 107, 157, 0.1)',
          border: '2px solid rgba(255, 107, 157, 0.3)',
          borderRadius: '12px'
        }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            Filtered Results
          </span>
          <p style={{ color: '#ff6b9d', fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>
            {filteredGames.length}
          </p>
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255, 255, 255, 0.5)' }}>
            {searchTerm ? 'No games match your search' : 'No games found'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredGames.map(game => (
            <div
              key={game._id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(162, 89, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Game Image */}
              <div style={{
                width: '100%',
                height: '180px',
                background: game.coverImage 
                  ? `url(${game.coverImage}) center/cover` 
                  : 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
                position: 'relative'
              }}>
                {!game.coverImage && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3rem'
                  }}>
                    🎮
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '0.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {game.title}
                </h3>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    background: 'rgba(162, 89, 255, 0.2)',
                    color: '#a259ff',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {game.genre || 'N/A'}
                  </span>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    background: 'rgba(255, 107, 157, 0.2)',
                    color: '#ff6b9d',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    ${game.price || 0}
                  </span>
                </div>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  👨‍💻 {game.developer || 'Unknown'}
                </p>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {game.description || 'No description'}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link
                    to={`/game/${game._id}`}
                    style={{
                      flex: 1,
                      padding: '0.8rem',
                      borderRadius: '8px',
                      border: '2px solid #a259ff',
                      background: 'rgba(162, 89, 255, 0.1)',
                      color: '#a259ff',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#a259ff'
                      e.target.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(162, 89, 255, 0.1)'
                      e.target.style.color = '#a259ff'
                    }}
                  >
                    👁️ View
                  </Link>
                  <button
                    onClick={() => handleDelete(game._id, game.title)}
                    style={{
                      flex: 1,
                      padding: '0.8rem',
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}