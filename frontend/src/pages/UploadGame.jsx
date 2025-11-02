// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { API_URL } from "../config"

// export default function UploadGame() {
//   const [title, setTitle] = useState("")
//   const [price, setPrice] = useState("")
//   const [description, setDescription] = useState("")
//   const [genre, setGenre] = useState("")
//   const [tags, setTags] = useState("")
//   const [imageUrl, setImageUrl] = useState("")
//   const navigate = useNavigate()
//   const token = localStorage.getItem("token")

//   const handleUpload = async (e) => {
//     e.preventDefault()
    
//     // Prepare game data
//     const gameData = {
//       title,
//       price: Number(price),
//       description,
//       genre,
//       tags: tags.split(',').map(tag => tag.trim()),
//       media: {
//         images: imageUrl ? [imageUrl] : [],
//         videos: []
//       }
//     }

//     console.log("Uploading game:", gameData)
//     console.log("Token:", token)

//     try {
//       const res = await fetch(`${API_URL}/developers/upload`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": token
//         },
//         body: JSON.stringify(gameData)
//       })
      
//       console.log("Response status:", res.status)
      
//       // Get response as text first to see what we're getting
//       const text = await res.text()
//       console.log("Response text:", text)
      
//       // Try to parse as JSON
//       let data
//       try {
//         data = JSON.parse(text)
//       } catch (e) {
//         console.error("Could not parse response as JSON:", text)
//         alert("Server error: " + text.substring(0, 100))
//         return
//       }
      
//       if (res.ok) {
//         alert("Game uploaded successfully!")
//         navigate("/developer/dashboard")
//       } else {
//         alert(data.msg || "Upload failed")
//       }
//     } catch (err) {
//       console.error(err)
//       alert("Upload error: " + err.message)
//     }
//   }

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h1>Upload New Game</h1>
//       <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//         <input 
//           type="text" 
//           placeholder="Game Title" 
//           value={title} 
//           onChange={e => setTitle(e.target.value)} 
//           required 
//           style={{ padding: '0.5rem' }}
//         />
        
//         <input 
//           type="number" 
//           placeholder="Price (e.g., 9.99)" 
//           value={price} 
//           onChange={e => setPrice(e.target.value)} 
//           required 
//           step="0.01"
//           style={{ padding: '0.5rem' }}
//         />
        
//         <input 
//           type="text" 
//           placeholder="Genre (e.g., Action, RPG, Puzzle)" 
//           value={genre} 
//           onChange={e => setGenre(e.target.value)} 
//           style={{ padding: '0.5rem' }}
//         />
        
//         <input 
//           type="text" 
//           placeholder="Tags (comma separated: indie, multiplayer, story-rich)" 
//           value={tags} 
//           onChange={e => setTags(e.target.value)} 
//           style={{ padding: '0.5rem' }}
//         />
        
//         <input 
//           type="url" 
//           placeholder="Image URL (e.g., https://picsum.photos/400/300)" 
//           value={imageUrl} 
//           onChange={e => setImageUrl(e.target.value)} 
//           style={{ padding: '0.5rem' }}
//         />
        
//         <textarea 
//           placeholder="Game Description" 
//           value={description} 
//           onChange={e => setDescription(e.target.value)} 
//           required
//           rows={5}
//           style={{ padding: '0.5rem' }}
//         />
        
//         <button 
//           type="submit" 
//           style={{ 
//             padding: '0.75rem', 
//             backgroundColor: '#a259ff', 
//             color: 'white', 
//             border: 'none', 
//             borderRadius: '6px', 
//             cursor: 'pointer', 
//             fontWeight: 'bold' 
//           }}
//         >
//           Upload Game
//         </button>
//       </form>
//     </div>
//   )
// }




import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config"

export default function UploadGame() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [tags, setTags] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const genres = ["Action", "Adventure", "RPG", "Strategy", "Puzzle", "Simulation", "Indie", "Casual"]

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const gameData = {
      title,
      price: Number(price),
      description,
      genre,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      media: {
        images: imageUrl ? [imageUrl] : [],
        videos: []
      }
    }

    try {
      const res = await fetch(`${API_URL}/developers/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(gameData)
      })
      
      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.error("Could not parse response as JSON:", text)
        alert("Server error: " + text.substring(0, 100))
        setLoading(false)
        return
      }
      
      if (res.ok) {
        alert("🎉 Game uploaded successfully!")
        navigate("/developer/dashboard")
      } else {
        alert(data.msg || "Upload failed")
      }
    } catch (err) {
      console.error(err)
      alert("Upload error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '900',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🚀 Upload New Game
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          Share your creation with the world
        </p>
      </div>

      {/* Form */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '24px',
        padding: '3rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)'
      }}>
        <form onSubmit={handleUpload} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Title */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700'
            }}>
              Game Title *
            </label>
            <input 
              type="text" 
              placeholder="Enter your game title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a259ff'
                e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            />
          </div>

          {/* Price and Genre Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            {/* Price */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700'
              }}>
                Price (USD) *
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#a259ff',
                  fontSize: '1.2rem',
                  fontWeight: '700'
                }}>
                  $
                </span>
                <input 
                  type="number" 
                  placeholder="9.99" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  required 
                  step="0.01"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem 1rem 2.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#a259ff'
                    e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  }}
                />
              </div>
            </div>

            {/* Genre */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700'
              }}>
                Genre
              </label>
              <select
                value={genre}
                onChange={e => setGenre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: genre ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a259ff'
                  e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                }}
              >
                <option value="" disabled>Select a genre</option>
                {genres.map(g => (
                  <option key={g} value={g} style={{ backgroundColor: '#1a1a1d', color: 'white' }}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700'
            }}>
              Tags
            </label>
            <input 
              type="text" 
              placeholder="indie, multiplayer, story-rich (comma separated)" 
              value={tags} 
              onChange={e => setTags(e.target.value)} 
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a259ff'
                e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            />
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.5)',
              marginTop: '0.5rem'
            }}>
              💡 Separate tags with commas for better discoverability
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700'
            }}>
              Cover Image URL
            </label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a259ff'
                e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            />
            {imageUrl && (
              <div style={{
                marginTop: '1rem',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid rgba(162, 89, 255, 0.3)'
              }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700'
            }}>
              Description *
            </label>
            <textarea 
              placeholder="Describe your game, its features, and what makes it unique..." 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required
              rows={6}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                resize: 'vertical',
                lineHeight: '1.6',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a259ff'
                e.target.style.backgroundColor = 'rgba(162, 89, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              border: 'none',
              background: loading 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading ? 'none' : '0 10px 30px rgba(162, 89, 255, 0.4)',
              marginTop: '1rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 15px 40px rgba(162, 89, 255, 0.6)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 10px 30px rgba(162, 89, 255, 0.4)'
              }
            }}
          >
            {loading ? '⏳ Uploading...' : '🚀 Upload Game'}
          </button>
        </form>
      </div>

      {/* Responsive Layout */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}