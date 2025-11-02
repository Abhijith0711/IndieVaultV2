// import { useEffect, useState } from "react"
// import { API_URL } from "../config"
// import GameCard from "../components/GameCard.jsx"

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState([])
//   const token = localStorage.getItem("token")

//   useEffect(() => {
//     fetchWishlist()
//   }, [token])

//   const fetchWishlist = () => {
//     if (!token) return
//     fetch(`${API_URL}/users/wishlist`, {
//       headers: { "Authorization": token }
//     })
//       .then(res => res.json())
//       .then(data => setWishlist(data))
//       .catch(err => console.error(err))
//   }

//   const removeFromWishlist = async (gameId) => {
//     try {
//       const res = await fetch(`${API_URL}/users/wishlist/${gameId}`, {
//         method: 'DELETE',
//         headers: { "Authorization": token }
//       })
//       if (res.ok) {
//         fetchWishlist() // Refresh wishlist
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   return (
//     <div>
//       <h1>Your Wishlist</h1>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
//         {wishlist.length > 0 ? (
//           wishlist.map(game => (
//             <div key={game._id} style={{ position: 'relative' }}>
//               <GameCard game={game} />
//               <button
//                 onClick={() => removeFromWishlist(game._id)}
//                 style={{
//                   position: 'absolute',
//                   top: '10px',
//                   right: '10px',
//                   backgroundColor: '#ff4444',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '50%',
//                   width: '30px',
//                   height: '30px',
//                   cursor: 'pointer',
//                   fontWeight: 'bold'
//                 }}
//               >
//                 ×
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No games in your wishlist.</p>
//         )}
//       </div>
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../config"

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchWishlist()
  }, [token])

  const fetchWishlist = () => {
    if (!token) return
    fetch(`${API_URL}/users/wishlist`, {
      headers: { "Authorization": token }
    })
      .then(res => res.json())
      .then(data => setWishlist(data))
      .catch(err => console.error(err))
  }

  const removeFromWishlist = async (gameId) => {
    try {
      const res = await fetch(`${API_URL}/users/wishlist/${gameId}`, {
        method: 'DELETE',
        headers: { "Authorization": token }
      })
      if (res.ok) {
        fetchWishlist()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '900',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #a259ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ♥ Your Wishlist
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          {wishlist.length} {wishlist.length === 1 ? 'game' : 'games'} you're interested in
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {wishlist.map(game => (
            <div
              key={game._id}
              style={{
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
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 107, 157, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(game._id)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 2,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(255, 107, 157, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(255, 107, 157, 0.5)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.15) rotate(10deg)'
                  e.target.textContent = '💔'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) rotate(0deg)'
                  e.target.textContent = '♥'
                }}
              >
                ♥
              </button>

              <Link to={`/game/${game._id}`} style={{ textDecoration: 'none' }}>
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
                      backgroundColor: 'rgba(255, 107, 157, 0.15)',
                      border: '1px solid rgba(255, 107, 157, 0.3)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#ff6b9d',
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

                  {/* Price and Reviews */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: '900',
                      background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      ${game.price}
                    </div>

                    {game.reviewsCount > 0 && (
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}>
                        💬 {game.reviewsCount}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
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
            💔
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'white'
          }}>
            Your wishlist is empty
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem'
          }}>
            Start adding games you love to your wishlist
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff6b9d 0%, #a259ff 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(255, 107, 157, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 15px 40px rgba(255, 107, 157, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.4)'
            }}
          >
            Discover Games
          </Link>
        </div>
      )}
    </div>
  )
}