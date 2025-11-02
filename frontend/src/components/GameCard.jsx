// Path: src/components/GameCard.jsx
// import { Link } from "react-router-dom"
// import styles from "./GameCard.module.css"

// export default function GameCard({ game }) {
//   return (
//     <Link to={`/game/${game._id}`} className={styles.card}>
//       <img 
//         src={game.media?.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
//         alt={game.title} 
//         className={styles.image}
//       />
//       <div className={styles.content}>
//         <h2>{game.title}</h2>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <p style={{ fontSize: '1.2rem', color: '#a259ff', fontWeight: 'bold' }}>
//             ${game.price}
//           </p>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
//             <span style={{ color: '#FFD700' }}>★</span>
//             <span style={{ fontSize: '0.9rem' }}>
//               {game.rating.toFixed(1)}
//             </span>
//           </div>
//         </div>
//         {game.reviewsCount > 0 && (
//           <p style={{ fontSize: '0.8rem', color: '#888' }}>
//             {game.reviewsCount} {game.reviewsCount === 1 ? 'review' : 'reviews'}
//           </p>
//         )}
//       </div>
//     </Link>
//   )
// }


import { Link } from "react-router-dom"
import { useState } from "react"

export default function GameCard({ game }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      to={`/game/${game._id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? '0 20px 60px rgba(162, 89, 255, 0.4), 0 0 0 1px rgba(162, 89, 255, 0.3)'
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        {/* Image Container */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '200px',
          backgroundColor: '#0d0d0f'
        }}>
          <img 
            src={game.media?.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
            alt={game.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          
          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(13, 13, 15, 0.9) 0%, transparent 100%)',
            opacity: isHovered ? 1 : 0.7,
            transition: 'opacity 0.3s'
          }} />

          {/* Rating Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(13, 13, 15, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 0.75rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <span style={{ color: '#FFD700', fontSize: '1rem' }}>★</span>
            <span style={{ 
              fontSize: '0.95rem', 
              fontWeight: '700',
              color: 'white'
            }}>
              {game.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '0.75rem',
            color: 'white',
            lineHeight: '1.3',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {game.title}
          </h2>

          {/* Genre Tag */}
          {game.genre && (
            <div style={{
              display: 'inline-block',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(162, 89, 255, 0.15)',
              border: '1px solid rgba(162, 89, 255, 0.3)',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#a259ff',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {game.genre}
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.75rem'
          }}>
            {/* Price */}
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${game.price}
            </div>

            {/* Reviews */}
            {game.reviewsCount > 0 && (
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span>💬</span>
                <span>{game.reviewsCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover Shine Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          transform: isHovered ? 'translateX(300%)' : 'translateX(0)',
          transition: 'transform 0.6s',
          pointerEvents: 'none'
        }} />
      </div>
    </Link>
  )
}