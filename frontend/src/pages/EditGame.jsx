// File: frontend/src/pages/EditGame.jsx
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../config"

export default function EditGame() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    price: "",
    coverImage: "",
    downloadLink: ""
  })

  useEffect(() => {
    fetchGameDetails()
  }, [gameId])

  const fetchGameDetails = async () => {
    try {
      const res = await fetch(`${API_URL}/games/${gameId}`)
      const data = await res.json()
      
      // Handle both coverImage and media.images[0] formats
      const imageUrl = data.coverImage || data.media?.images?.[0] || ""
      const downloadUrl = data.downloadLink || data.media?.downloadLinks?.[0] || ""
      
      setFormData({
        title: data.title || "",
        description: data.description || "",
        genre: data.genre || "",
        price: data.price || "",
        coverImage: imageUrl,
        downloadLink: downloadUrl
      })
    } catch (err) {
      console.error("Error fetching game:", err)
      alert("Failed to load game details")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/games/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        alert("Game updated successfully!")
        navigate("/developer/dashboard")
      } else {
        alert(data.msg || "Failed to update game")
      }
    } catch (err) {
      console.error("Error updating game:", err)
      alert("Error updating game")
    } finally {
      setSubmitting(false)
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
        <p style={{ fontSize: '1.5rem', color: '#a259ff' }}>Loading game details...</p>
      </div>
    )
  }

  const genres = ["Action", "Adventure", "RPG", "Strategy", "Puzzle", "Indie", "Simulation", "Sports"]

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            ✏️ Edit Game
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
            Update your game details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#ddd',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Game Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter game title"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#a259ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#ddd',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your game..."
              rows="5"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#a259ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {/* Genre and Price Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Genre */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ddd',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                Genre *
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.target.style.borderColor = '#a259ff'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <option value="" style={{ background: '#1a1a1d' }}>Select genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre} style={{ background: '#1a1a1d' }}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ddd',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="9.99"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#a259ff'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#ddd',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#a259ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {/* Download Link */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#ddd',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Download Link
            </label>
            <input
              type="url"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleChange}
              placeholder="https://example.com/download"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#a259ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate("/developer/dashboard")}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '10px',
                border: 'none',
                background: submitting
                  ? '#666'
                  : 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: submitting ? 'none' : '0 10px 30px rgba(162, 89, 255, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 15px 40px rgba(162, 89, 255, 0.6)'
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 10px 30px rgba(162, 89, 255, 0.4)'
                }
              }}
            >
              {submitting ? '💾 Saving...' : '✅ Update Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}