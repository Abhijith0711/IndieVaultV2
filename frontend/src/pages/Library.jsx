// import { useEffect, useState } from "react"
// import { API_URL } from "../config"
// import GameCard from "../components/GameCard.jsx"

// export default function Library() {
//   const [library, setLibrary] = useState([])
//   const token = localStorage.getItem("token")

//   useEffect(() => {
//     if (!token) return
//     fetch(`${API_URL}/users/library`, {
//       headers: { "Authorization": token }
//     })
//       .then(res => res.json())
//       .then(data => setLibrary(data))
//       .catch(err => console.error(err))
//   }, [token])

//   return (
//     <div>
//       <h1>Your Library</h1>
//       <p style={{ marginBottom: '1rem', color: '#aaa' }}>
//         Games you own - {library.length} {library.length === 1 ? 'game' : 'games'}
//       </p>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
//         {library.length > 0 ? (
//           library.map(game => <GameCard key={game._id} game={game} />)
//         ) : (
//           <p>No purchased games yet.</p>
//         )}
//       </div>
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"

export default function Library() {
  const [library, setLibrary] = useState([])
  const [sortBy, setSortBy] = useState('recent')
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) return
    fetch(`${API_URL}/users/library`, {
      headers: { "Authorization": token }
    })
      .then(res => res.json())
      .then(data => setLibrary(data))
      .catch(err => console.error(err))
  }, [token])

  const sortedLibrary = [...library].sort((a, b) => {
    if (sortBy === 'recent') return 0
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div>
      {/* Header */}
      <div style={{
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '900',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📚 Your Library
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              {library.length} {library.length === 1 ? 'game' : 'games'} owned
            </p>
          </div>

          {/* Sort Options */}
          {library.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Sort by:
              </span>
              {['recent', 'title', 'rating'].map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '10px',
                    border: sortBy === option
                      ? '2px solid #4CAF50'
                      : '2px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: sortBy === option
                      ? 'rgba(76, 175, 80, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: sortBy === option ? '#4CAF50' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {library.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {sortedLibrary.map(game => (
            <Link
              key={game._id}
              to={`/game/${game._id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{
                position: 'relative',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(76, 175, 80, 0.4)'
                e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              }}
              >
                {/* Owned Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 2,
                  padding: '0.5rem 0.9rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <span style={{ fontSize: '1rem' }}>✓</span>
                  OWNED
                </div>

                {/* Image */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={game.media?.images[0] || 'https://via.placeholder.com/400x300'}
                    alt={game.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(13, 13, 15, 0.9) 0%, transparent 100%)'
                  }} />

                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(76, 175, 80, 0.9)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    boxShadow: '0 8px 20px rgba(76, 175, 80, 0.5)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0'}
                  >
                    ▶
                  </div>

                  {/* Rating Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(13, 13, 15, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span style={{ color: '#FFD700', fontSize: '1rem' }}>⭐</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white' }}>
                      {game.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    color: 'white',
                    lineHeight: '1.3'
                  }}>
                    {game.title}
                  </h2>

                  {/* Genre */}
                  {game.genre && (
                    <div style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(76, 175, 80, 0.15)',
                      border: '1px solid rgba(76, 175, 80, 0.3)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#4CAF50',
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase'
                    }}>
                      {game.genre}
                    </div>
                  )}

                  {/* Description Preview */}
                  {game.description && (
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.5',
                      marginBottom: '1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {game.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <span>💬</span>
                      <span>{game.reviewsCount} reviews</span>
                    </div>

                    <div style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(76, 175, 80, 0.15)',
                      border: '1px solid rgba(76, 175, 80, 0.3)',
                      color: '#4CAF50',
                      fontSize: '0.85rem',
                      fontWeight: '700'
                    }}>
                      PLAY NOW
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
            📚
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'white'
          }}>
            Your library is empty
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem'
          }}>
            Purchase games to start building your collection
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.4)'
            }}
          >
            Browse Games
          </Link>
        </div>
      )}
    </div>
  )
}