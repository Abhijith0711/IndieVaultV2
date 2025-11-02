// import { useEffect, useState } from "react"
// import GameCard from "../components/GameCard.jsx"
// import { API_URL } from "../config"
// import styles from "./pages.module.css"

// export default function Home() {
//   const [featuredGames, setFeaturedGames] = useState([])

//   useEffect(() => {
//     fetch(`${API_URL}/games`)
//       .then(res => res.json())
//       .then(data => setFeaturedGames(data))
//       .catch(err => console.error(err))
//   }, [])

//   return (
//     <div>
//       <h1 className={styles.title}>Welcome to Indie Vault</h1>
//       <p className={styles.subtitle}>Discover amazing indie games, rate them, and explore new titles.</p>

//       <h2 className={styles.sectionTitle}>Featured Games</h2>
//       <div className={styles.grid}>
//         {featuredGames.length > 0
//           ? featuredGames.map(game => <GameCard key={game._id} game={game} />)
//           : <p>Loading games...</p>
//         }
//       </div>
//     </div>
//   )
// }


import { useEffect, useState } from "react"
import GameCard from "../components/GameCard.jsx"
import { API_URL } from "../config"

export default function Home() {
  const [featuredGames, setFeaturedGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")

  useEffect(() => {
    fetch(`${API_URL}/games`)
      .then(res => res.json())
      .then(data => setFeaturedGames(data))
      .catch(err => console.error(err))
  }, [])

  const genres = ["all", "Action", "RPG", "Puzzle", "Adventure", "Strategy", "Indie"]

  const filteredGames = featuredGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "all" || game.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(162, 89, 255, 0.2) 0%, rgba(255, 107, 157, 0.2) 100%)',
        borderRadius: '24px',
        padding: '4rem 2rem',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 60px rgba(162, 89, 255, 0.3)'
      }}>
        {/* Animated gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(162, 89, 255, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff 0%, #a259ff 50%, #ff6b9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Discover Amazing<br />Indie Games
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Explore, rate, and support independent developers from around the world
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="🔍 Search for games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                fontSize: '1.1rem',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a259ff'
                e.target.style.boxShadow = '0 10px 40px rgba(162, 89, 255, 0.4)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'
                e.target.style.transform = 'translateY(0)'
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </div>

      {/* Genre Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
          fontSize: '1.3rem',
          marginBottom: '1rem',
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600'
        }}>
          Browse by Genre
        </h3>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: selectedGenre === genre
                  ? '2px solid #a259ff'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: selectedGenre === genre
                  ? 'rgba(162, 89, 255, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: selectedGenre === genre ? '#a259ff' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 10px 30px rgba(162, 89, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white'
          }}>
            {selectedGenre === "all" ? "All Games" : selectedGenre}
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1rem'
          }}>
            {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredGames.length > 0 ? (
            filteredGames.map(game => <GameCard key={game._id} game={game} />)
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎮</p>
              <p style={{ fontSize: '1.2rem' }}>No games found</p>
              <p>Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
