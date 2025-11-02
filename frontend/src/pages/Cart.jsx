// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { API_URL } from "../config"
// import GameCard from "../components/GameCard.jsx"

// export default function Cart() {
//   const [cart, setCart] = useState([])
//   const [loading, setLoading] = useState(false)
//   const token = localStorage.getItem("token")
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchCart()
//   }, [token])

//   const fetchCart = () => {
//     if (!token) return
//     fetch(`${API_URL}/users/cart`, {
//       headers: { "Authorization": token }
//     })
//       .then(res => res.json())
//       .then(data => setCart(data))
//       .catch(err => console.error(err))
//   }

//   const removeFromCart = async (gameId) => {
//     try {
//       const res = await fetch(`${API_URL}/users/cart/${gameId}`, {
//         method: 'DELETE',
//         headers: { "Authorization": token }
//       })
//       if (res.ok) {
//         fetchCart() // Refresh cart
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const handlePurchase = async () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty!")
//       return
//     }

//     setLoading(true)
//     try {
//       const res = await fetch(`${API_URL}/users/purchase`, {
//         method: 'POST',
//         headers: { 
//           "Authorization": token,
//           "Content-Type": "application/json"
//         }
//       })
//       const data = await res.json()
//       if (res.ok) {
//         alert(`Purchase successful! Total: $${data.totalAmount.toFixed(2)}`)
//         navigate("/library")
//       } else {
//         alert(data.msg || "Purchase failed")
//       }
//     } catch (err) {
//       console.error(err)
//       alert("Purchase error")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const totalPrice = cart.reduce((sum, game) => sum + (game.price || 0), 0)

//   return (
//     <div>
//       <h1>Your Cart</h1>
      
//       {cart.length > 0 ? (
//         <>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
//             {cart.map(game => (
//               <div key={game._id} style={{ position: 'relative' }}>
//                 <GameCard game={game} />
//                 <button
//                   onClick={() => removeFromCart(game._id)}
//                   style={{
//                     position: 'absolute',
//                     top: '10px',
//                     right: '10px',
//                     backgroundColor: '#ff4444',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '50%',
//                     width: '30px',
//                     height: '30px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           <div style={{ 
//             backgroundColor: '#222', 
//             padding: '1.5rem', 
//             borderRadius: '12px',
//             maxWidth: '400px'
//           }}>
//             <h2>Total: ${totalPrice.toFixed(2)}</h2>
//             <button
//               onClick={handlePurchase}
//               disabled={loading}
//               style={{
//                 width: '100%',
//                 padding: '1rem',
//                 backgroundColor: loading ? '#666' : '#4CAF50',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 fontSize: '1.1rem',
//                 fontWeight: 'bold',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 marginTop: '1rem'
//               }}
//             >
//               {loading ? 'Processing...' : 'Purchase Now'}
//             </button>
//           </div>
//         </>
//       ) : (
//         <p>No games in your cart.</p>
//       )}
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { API_URL } from "../config"

export default function Cart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [token])

  const fetchCart = () => {
    if (!token) return
    fetch(`${API_URL}/users/cart`, {
      headers: { "Authorization": token }
    })
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error(err))
  }

  const removeFromCart = async (gameId) => {
    try {
      const res = await fetch(`${API_URL}/users/cart/${gameId}`, {
        method: 'DELETE',
        headers: { "Authorization": token }
      })
      if (res.ok) {
        fetchCart()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/users/purchase`, {
        method: 'POST',
        headers: { 
          "Authorization": token,
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (res.ok) {
        alert(`Purchase successful! Total: $${data.totalAmount.toFixed(2)}`)
        navigate("/library")
      } else {
        alert(data.msg || "Purchase failed")
      }
    } catch (err) {
      console.error(err)
      alert("Purchase error")
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = cart.reduce((sum, game) => sum + (game.price || 0), 0)

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '900',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🛒 Your Shopping Cart
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cart.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem'
        }}>
          {/* Cart Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {cart.map(game => (
              <div
                key={game._id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
              >
                {/* Game Image */}
                <Link to={`/game/${game._id}`} style={{ flexShrink: 0 }}>
                  <img
                    src={game.media?.images[0] || 'https://via.placeholder.com/150x100'}
                    alt={game.title}
                    style={{
                      width: '150px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </Link>

                {/* Game Info */}
                <div style={{ flex: 1 }}>
                  <Link 
                    to={`/game/${game._id}`}
                    style={{
                      fontSize: '1.3rem',
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
                  
                  {game.genre && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(162, 89, 255, 0.15)',
                      border: '1px solid rgba(162, 89, 255, 0.3)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#a259ff',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem'
                    }}>
                      {game.genre}
                    </span>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '0.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <span style={{ color: '#FFD700' }}>⭐</span>
                      <span style={{ 
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {game.rating.toFixed(1)}
                      </span>
                    </div>
                    {game.reviewsCount > 0 && (
                      <span style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}>
                        {game.reviewsCount} reviews
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginRight: '1rem'
                }}>
                  ${game.price}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(game._id)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(255, 68, 68, 0.2)',
                    color: '#ff4444',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ff4444'
                    e.target.style.color = 'white'
                    e.target.style.transform = 'scale(1.1) rotate(90deg)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.2)'
                    e.target.style.color = '#ff4444'
                    e.target.style.transform = 'scale(1) rotate(0deg)'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div style={{
            position: 'sticky',
            top: '2rem',
            height: 'fit-content'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Order Summary
              </h2>

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem 0',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: 'white'
                }}>
                  <span>Total</span>
                  <span style={{
                    background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: loading 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: loading ? 'none' : '0 10px 30px rgba(76, 175, 80, 0.4)',
                  marginBottom: '1rem'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.6)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.4)'
                  }
                }}
              >
                {loading ? '⏳ Processing...' : '💳 Complete Purchase'}
              </button>

              <p style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.5'
              }}>
                🔒 Secure checkout
                <br />
                Instant access after purchase
              </p>
            </div>
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
            🛒
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'white'
          }}>
            Your cart is empty
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem'
          }}>
            Discover amazing indie games and add them to your cart
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              textDecoration: 'none',
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
            Browse Games
          </Link>
        </div>
      )}

      {/* Responsive Layout */}
      <style>{`
        @media (max-width: 968px) {
          div[style*="gridTemplateColumns: '2fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}