//frontend/src/pages/DeveloperDashboard.jsx

import { useEffect, useState } from "react"
import { API_URL } from "../config"
import { Link } from "react-router-dom"

export default function DeveloperDashboard() {
  const [games, setGames] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchGames()
  }, [token])

  const fetchGames = () => {
    if (!token) return
    fetch(`${API_URL}/developers/mygames`, {
      headers: { "Authorization": token }
    })
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err))
  }

  const handleDelete = async (gameId, gameTitle) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${gameTitle}"?\n\nThis action cannot be undone.`)
    
    if (!confirmed) return

    try {
      const res = await fetch(`${API_URL}/games/${gameId}`, {
        method: 'DELETE',
        headers: { "Authorization": token }
      })
      
      const data = await res.json()
      
      if (res.ok) {
        alert("✅ Game deleted successfully!")
        fetchGames()
      } else if (res.status === 403 && data.purchasedCount) {
        alert(`❌ Cannot delete this game!\n\n${data.msg}\n\nUsers who purchased it still need access to their content.`)
      } else {
        alert(data.msg || "Failed to delete game")
      }
    } catch (err) {
      console.error(err)
      alert("Error deleting game")
    }
  }

  const totalReviews = games.reduce((sum, game) => sum + (game.reviewsCount || 0), 0)
  const avgRating = games.length > 0 
    ? (games.reduce((sum, game) => sum + game.rating, 0) / games.length).toFixed(1)
    : 0

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '900',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            👨‍💻 Developer Dashboard
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Manage your games and track performance
          </p>
        </div>
        
        <Link 
          to="/upload"
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
            color: 'white',
            borderRadius: '12px',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.1rem',
            transition: 'all 0.3s',
            boxShadow: '0 10px 30px rgba(162, 89, 255, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 15px 40px rgba(162, 89, 255, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 10px 30px rgba(162, 89, 255, 0.4)'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>+</span>
          Upload New Game
        </Link>
      </div>

      {/* Stats Grid */}
      {games.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Total Games */}
          <div style={{
            backgroundColor: 'rgba(162, 89, 255, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(162, 89, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              🎮
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#a259ff',
              marginBottom: '0.3rem'
            }}>
              {games.length}
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: '600'
            }}>
              Total Games
            </div>
          </div>

          {/* Average Rating */}
          <div style={{
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              ⭐
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#FFD700',
              marginBottom: '0.3rem'
            }}>
              {avgRating}
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: '600'
            }}>
              Avg Rating
            </div>
          </div>

          {/* Total Reviews */}
          <div style={{
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              💬
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#4CAF50',
              marginBottom: '0.3rem'
            }}>
              {totalReviews}
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: '600'
            }}>
              Total Reviews
            </div>
          </div>
        </div>
      )}

      {/* Games List */}
      {games.length > 0 ? (
        <div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Your Games
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {games.map(game => (
              <div 
                key={game._id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(162, 89, 255, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr auto',
                  gap: '2rem',
                  alignItems: 'center'
                }}>
                  {/* Game Image */}
                  {game.media?.images[0] && (
                    <Link to={`/game/${game._id}`}>
                      <img 
                        src={game.media.images[0]} 
                        alt={game.title}
                        style={{
                          width: '200px',
                          height: '130px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          transition: 'transform 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </Link>
                  )}

                  {/* Game Info */}
                  <div>
                    <Link
                      to={`/game/${game._id}`}
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '0.5rem',
                        display: 'block',
                        textDecoration: 'none',
                        transition: 'color 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#a259ff'}
                      onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                      {game.title}
                    </Link>
                    
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '1rem',
                      lineHeight: '1.5',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {game.description}
                    </p>

                    {/* Stats Row */}
                    <div style={{
                      display: 'flex',
                      gap: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>💰</span>
                        <span style={{
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          color: '#a259ff'
                        }}>
                          ${game.price}
                        </span>
                      </div>

                      {game.genre && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{ fontSize: '1.2rem' }}>🎯</span>
                          <span style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '600'
                          }}>
                            {game.genre}
                          </span>
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ color: '#FFD700', fontSize: '1.2rem' }}>⭐</span>
                        <span style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: 'white'
                        }}>
                          {game.rating.toFixed(1)}
                        </span>
                        <span style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.5)'
                        }}>
                          ({game.reviewsCount})
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>📅</span>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.9rem'
                        }}>
                          {new Date(game.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    minWidth: '150px'
                  }}>
                    <Link
                      to={`/game/${game._id}`}
                      style={{
                        padding: '0.75rem 1.25rem',
                        backgroundColor: 'rgba(162, 89, 255, 0.2)',
                        border: '2px solid rgba(162, 89, 255, 0.5)',
                        color: '#a259ff',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.3)'
                        e.target.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.2)'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      <span>👁️</span>
                      View
                    </Link>

                    {/* ✅ NEW EDIT BUTTON */}
                    <Link
                      to={`/edit-game/${game._id}`}
                      style={{
                        padding: '0.75rem 1.25rem',
                        backgroundColor: 'rgba(255, 165, 0, 0.2)',
                        border: '2px solid rgba(255, 165, 0, 0.5)',
                        color: '#ffa500',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 165, 0, 0.3)'
                        e.target.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 165, 0, 0.2)'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      <span>✏️</span>
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(game._id, game.title)}
                      style={{
                        padding: '0.75rem 1.25rem',
                        backgroundColor: 'rgba(255, 68, 68, 0.2)',
                        border: '2px solid rgba(255, 68, 68, 0.5)',
                        color: '#ff4444',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.3)'
                        e.target.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.2)'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '20px',
          padding: '4rem 2rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            opacity: 0.5
          }}>
            🎮
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'white'
          }}>
            No games yet
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem'
          }}>
            Upload your first game to start your developer journey
          </p>
          <Link 
            to="/upload"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(162, 89, 255, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 15px 40px rgba(162, 89, 255, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 10px 30px rgba(162, 89, 255, 0.4)'
            }}
          >
            Upload Your First Game
          </Link>
        </div>
      )}

      {/* Responsive Layout */}
      <style>{`
        @media (max-width: 968px) {
          div[style*="gridTemplateColumns: '200px 1fr auto'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}