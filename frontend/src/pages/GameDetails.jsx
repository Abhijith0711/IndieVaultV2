// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { API_URL } from "../config"
// import RatingStars from "../components/RatingStars"

// export default function GameDetails() {
//   const { gameId } = useParams()
//   const [game, setGame] = useState(null)
//   const [inWishlist, setInWishlist] = useState(false)
//   const [inCart, setInCart] = useState(false)
//   const [inLibrary, setInLibrary] = useState(false)
//   const [userRating, setUserRating] = useState(0)
//   const [userRole, setUserRole] = useState(null)
//   const token = localStorage.getItem("token")

//   useEffect(() => {
//     fetchGame()
    
//     // Get user role from token
//     if (token) {
//       try {
//         const payload = token.split('.')[1]
//         const decoded = JSON.parse(atob(payload))
//         setUserRole(decoded.role)
        
//         // Only check collections for regular users
//         if (decoded.role === 'user') {
//           checkUserCollections()
//         }
//       } catch (err) {
//         console.error("Error decoding token:", err)
//       }
//     }
//   }, [gameId, token])

//   const fetchGame = () => {
//     fetch(`${API_URL}/games/${gameId}`, {
//       headers: token ? { "Authorization": token } : {}
//     })
//       .then(res => res.json())
//       .then(data => setGame(data))
//       .catch(err => console.error(err))
//   }

//   const checkUserCollections = async () => {
//     try {
//       // Check wishlist
//       const wishlistRes = await fetch(`${API_URL}/users/wishlist`, {
//         headers: { "Authorization": token }
//       })
//       const wishlist = await wishlistRes.json()
//       setInWishlist(wishlist.some(g => g._id === gameId))

//       // Check cart
//       const cartRes = await fetch(`${API_URL}/users/cart`, {
//         headers: { "Authorization": token }
//       })
//       const cart = await cartRes.json()
//       setInCart(cart.some(g => g._id === gameId))

//       // Check library
//       const libraryRes = await fetch(`${API_URL}/users/library`, {
//         headers: { "Authorization": token }
//       })
//       const library = await libraryRes.json()
//       setInLibrary(library.some(g => g._id === gameId))
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const addToWishlist = async () => {
//     try {
//       const res = await fetch(`${API_URL}/users/wishlist/${gameId}`, {
//         method: 'POST',
//         headers: { "Authorization": token }
//       })
//       if (res.ok) {
//         setInWishlist(true)
//         alert("Added to wishlist!")
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const addToCart = async () => {
//     try {
//       const res = await fetch(`${API_URL}/users/cart/${gameId}`, {
//         method: 'POST',
//         headers: { "Authorization": token }
//       })
//       if (res.ok) {
//         setInCart(true)
//         alert("Added to cart!")
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const handleRate = async (rating) => {
//     if (!inLibrary) {
//       alert("You must own this game to rate it!")
//       return
//     }

//     try {
//       const res = await fetch(`${API_URL}/games/${gameId}/rate`, {
//         method: 'POST',
//         headers: { 
//           "Authorization": token,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ rating })
//       })
//       if (res.ok) {
//         setUserRating(rating)
//         alert(`You rated this game ${rating} stars!`)
//         fetchGame() // Refresh game data to show updated rating
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   if (!game) return <p>Loading game...</p>

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//       {game.media?.images[0] && (
//         <img 
//           src={game.media.images[0]} 
//           alt={game.title} 
//           style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
//         />
//       )}
      
//       <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{game.title}</h1>
//       <p style={{ fontSize: '1.5rem', color: '#a259ff', marginBottom: '1rem' }}>
//         ${game.price}
//       </p>
      
//       <p style={{ marginBottom: '1rem' }}>{game.description}</p>
      
//       {game.genre && (
//         <p><strong>Genre:</strong> {game.genre}</p>
//       )}
      
//       {game.tags && game.tags.length > 0 && (
//         <p><strong>Tags:</strong> {game.tags.join(', ')}</p>
//       )}
      
//       <div style={{ marginBottom: '1.5rem' }}>
//         <p><strong>Average Rating:</strong> {game.rating.toFixed(1)} / 5.0 ({game.reviewsCount} reviews)</p>
//         <div style={{ display: 'flex', gap: '0.25rem' }}>
//           {[...Array(5)].map((_, i) => (
//             <span key={i} style={{ fontSize: '1.5rem', color: i < Math.round(game.rating) ? '#FFD700' : '#555' }}>
//               ★
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Rating Section - Only if user owns the game */}
//       {userRole === 'user' && inLibrary && (
//         <div style={{ 
//           backgroundColor: '#222', 
//           padding: '1rem', 
//           borderRadius: '8px', 
//           marginBottom: '1.5rem' 
//         }}>
//           <h3>Rate this game:</h3>
//           <RatingStars rating={userRating} onRate={handleRate} />
//           {userRating > 0 && (
//             <p style={{ color: '#4CAF50', marginTop: '0.5rem' }}>
//               You rated this game {userRating} stars!
//             </p>
//           )}
//         </div>
//       )}
      
//       {/* Only show purchase/wishlist/cart buttons for regular users */}
//       {userRole === 'user' && (
//         <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
//           {inLibrary ? (
//             <button 
//               style={{ 
//                 padding: '0.75rem 1.5rem', 
//                 backgroundColor: '#4CAF50', 
//                 color: 'white', 
//                 border: 'none', 
//                 borderRadius: '6px',
//                 cursor: 'not-allowed',
//                 fontWeight: 'bold'
//               }}
//               disabled
//             >
//               ✓ In Library
//             </button>
//           ) : (
//             <>
//               {!inCart ? (
//                 <button 
//                   onClick={addToCart}
//                   style={{ 
//                     padding: '0.75rem 1.5rem', 
//                     backgroundColor: '#a259ff', 
//                     color: 'white', 
//                     border: 'none', 
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   🛒 Add to Cart
//                 </button>
//               ) : (
//                 <button 
//                   style={{ 
//                     padding: '0.75rem 1.5rem', 
//                     backgroundColor: '#666', 
//                     color: 'white', 
//                     border: 'none', 
//                     borderRadius: '6px',
//                     cursor: 'not-allowed',
//                     fontWeight: 'bold'
//                   }}
//                   disabled
//                 >
//                   ✓ In Cart
//                 </button>
//               )}
              
//               {!inWishlist ? (
//                 <button 
//                   onClick={addToWishlist}
//                   style={{ 
//                     padding: '0.75rem 1.5rem', 
//                     backgroundColor: '#444', 
//                     color: 'white', 
//                     border: 'none', 
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   ♡ Add to Wishlist
//                 </button>
//               ) : (
//                 <button 
//                   style={{ 
//                     padding: '0.75rem 1.5rem', 
//                     backgroundColor: '#666', 
//                     color: 'white', 
//                     border: 'none', 
//                     borderRadius: '6px',
//                     cursor: 'not-allowed',
//                     fontWeight: 'bold'
//                   }}
//                   disabled
//                 >
//                   ♥ In Wishlist
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {userRole === 'user' && !inLibrary && (
//         <p style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.9rem' }}>
//           💡 Purchase this game to leave a rating!
//         </p>
//       )}

//       {userRole === 'developer' && (
//         <p style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.9rem' }}>
//           👨‍💻 Developer view - Users will see purchase options here
//         </p>
//       )}
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../config"
import RatingStars from "../components/RatingStars"

import GameChat from "../components/GameChat"

export default function GameDetails() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [inWishlist, setInWishlist] = useState(false)
  const [inCart, setInCart] = useState(false)
  const [inLibrary, setInLibrary] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userRole, setUserRole] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchGame()
    
    if (token) {
      try {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload))
        setUserRole(decoded.role)
        
        if (decoded.role === 'user') {
          checkUserCollections()
        }
      } catch (err) {
        console.error("Error decoding token:", err)
      }
    }
  }, [gameId, token])

  const fetchGame = () => {
    fetch(`${API_URL}/games/${gameId}`, {
      headers: token ? { "Authorization": token } : {}
    })
      .then(res => res.json())
      .then(data => setGame(data))
      .catch(err => console.error(err))
  }

  const checkUserCollections = async () => {
    try {
      const wishlistRes = await fetch(`${API_URL}/users/wishlist`, {
        headers: { "Authorization": token }
      })
      const wishlist = await wishlistRes.json()
      setInWishlist(wishlist.some(g => g._id === gameId))

      const cartRes = await fetch(`${API_URL}/users/cart`, {
        headers: { "Authorization": token }
      })
      const cart = await cartRes.json()
      setInCart(cart.some(g => g._id === gameId))

      const libraryRes = await fetch(`${API_URL}/users/library`, {
        headers: { "Authorization": token }
      })
      const library = await libraryRes.json()
      setInLibrary(library.some(g => g._id === gameId))
    } catch (err) {
      console.error(err)
    }
  }

  const addToWishlist = async () => {
    try {
      const res = await fetch(`${API_URL}/users/wishlist/${gameId}`, {
        method: 'POST',
        headers: { "Authorization": token }
      })
      if (res.ok) {
        setInWishlist(true)
        alert("Added to wishlist!")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addToCart = async () => {
    try {
      const res = await fetch(`${API_URL}/users/cart/${gameId}`, {
        method: 'POST',
        headers: { "Authorization": token }
      })
      if (res.ok) {
        setInCart(true)
        alert("Added to cart!")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleRate = async (rating) => {
    if (!inLibrary) {
      alert("You must own this game to rate it!")
      return
    }

    try {
      const res = await fetch(`${API_URL}/games/${gameId}/rate`, {
        method: 'POST',
        headers: { 
          "Authorization": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating })
      })
      if (res.ok) {
        setUserRating(rating)
        alert(`You rated this game ${rating} stars!`)
        fetchGame()
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!game) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.5)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(162, 89, 255, 0.2)',
          borderTop: '4px solid #a259ff',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Loading game...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Image Section */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '2rem',
        height: '500px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        {game.media?.images[0] && (
          <>
            <img 
              src={game.media.images[0]} 
              alt={game.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(to top, rgba(13, 13, 15, 0.95) 0%, transparent 100%)'
            }} />
          </>
        )}
        
        {/* Floating Info Card */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          right: '2rem',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '900',
            marginBottom: '1rem',
            color: 'white',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            lineHeight: '1.1'
          }}>
            {game.title}
          </h1>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
              fontSize: '2rem',
              fontWeight: '900',
              boxShadow: '0 10px 30px rgba(162, 89, 255, 0.5)'
            }}>
              ${game.price}
            </div>

            {game.genre && (
              <div style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {game.genre}
              </div>
            )}

            <div style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 215, 0, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⭐</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                {game.rating.toFixed(1)}
              </span>
              <span style={{ 
                fontSize: '0.9rem', 
                color: 'rgba(255, 255, 255, 0.6)' 
              }}>
                ({game.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Left Column - Description */}
        <div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'white'
            }}>
              About This Game
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              {game.description}
            </p>
          </div>

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'white'
              }}>
                Tags
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                {game.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(162, 89, 255, 0.15)',
                      border: '1px solid rgba(162, 89, 255, 0.3)',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: '#a259ff'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Actions */}
        <div>
          {/* Rating Section */}
          {userRole === 'user' && inLibrary && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'white'
              }}>
                Rate This Game
              </h3>
              <RatingStars rating={userRating} onRate={handleRate} />
              {userRating > 0 && (
                <p style={{
                  color: '#4CAF50',
                  marginTop: '1rem',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  ✓ You rated this {userRating} stars!
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {userRole === 'user' && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {inLibrary ? (
                  <button 
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      cursor: 'not-allowed',
                      boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    disabled
                  >
                    <span style={{ fontSize: '1.3rem' }}>✓</span>
                    In Your Library
                  </button>
                ) : (
                  <>
                    {!inCart ? (
                      <button 
                        onClick={addToCart}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
                          color: 'white',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 10px 30px rgba(162, 89, 255, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
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
                        <span style={{ fontSize: '1.3rem' }}>🛒</span>
                        Add to Cart
                      </button>
                    ) : (
                      <button 
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          cursor: 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                        disabled
                      >
                        <span style={{ fontSize: '1.3rem' }}>✓</span>
                        In Cart
                      </button>
                    )}
                    
                    {!inWishlist ? (
                      <button 
                        onClick={addToWishlist}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: 'white',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                          e.target.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                          e.target.style.transform = 'translateY(0)'
                        }}
                      >
                        <span style={{ fontSize: '1.3rem' }}>♡</span>
                        Add to Wishlist
                      </button>
                    ) : (
                      <button 
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          border: '2px solid rgba(255, 107, 157, 0.5)',
                          backgroundColor: 'rgba(255, 107, 157, 0.1)',
                          color: '#ff6b9d',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          cursor: 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                        disabled
                      >
                        <span style={{ fontSize: '1.3rem' }}>♥</span>
                        In Wishlist
                      </button>
                    )}
                  </>
                )}
              </div>

              {userRole === 'user' && !inLibrary && (
                <p style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(162, 89, 255, 0.1)',
                  border: '1px solid rgba(162, 89, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  💡 Purchase this game to leave a rating
                </p>
              )}
            </div>
          )}

          {userRole === 'developer' && (
            <div style={{
              backgroundColor: 'rgba(162, 89, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(162, 89, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>👨‍💻</span>
                Developer View
                <br />
                <span style={{ fontSize: '0.9rem' }}>
                  Users will see purchase options here
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Layout for Mobile */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '2fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
       
       <div style={{ marginTop: '3rem' }}>
          <GameChat gameId={gameId} gameName={game.title} />
       </div>
    </div>
  )
}