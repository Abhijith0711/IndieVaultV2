// // import { useState } from "react";
// // import { API_URL } from "../config";

// // export default function ForgotPassword() {
// //   const [email, setEmail] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("");
// //     setError("");

// //     try {
// //       const res = await fetch(`${API_URL}/auth/forgot-password`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email }),
// //       });

// //       const data = await res.json();
// //       if (res.ok) setMessage(data.msg);
// //       else setError(data.msg || "Something went wrong");
// //     } catch (err) {
// //       console.error(err);
// //       setError("Server error");
// //     }
// //   };

// //   return (
// //     <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //       <div style={{ padding: '2rem', background: '#1a1a1d', borderRadius: '20px', width: '400px' }}>
// //         <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>Forgot Password</h2>
// //         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
// //           <input 
// //             type="email"
// //             placeholder="Enter your email"
// //             value={email}
// //             onChange={e => setEmail(e.target.value)}
// //             required
// //             style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #333', background: '#0d0d0f', color: 'white' }}
// //           />
// //           <button type="submit" style={{ padding: '0.8rem', borderRadius: '10px', background: '#a259ff', color: 'white', fontWeight: 'bold' }}>
// //             Send OTP
// //           </button>
// //         </form>
// //         {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
// //         {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../config";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const res = await fetch(`${API_URL}/auth/forgot-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Redirect to Reset Password page and pass email
//         navigate("/reset-password", { state: { email } });
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server error");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "80vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           padding: "2rem",
//           background: "#1a1a1d",
//           borderRadius: "20px",
//           width: "400px",
//         }}
//       >
//         <h2
//           style={{
//             color: "white",
//             textAlign: "center",
//             marginBottom: "1rem",
//           }}
//         >
//           Forgot Password
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               padding: "0.8rem",
//               borderRadius: "10px",
//               border: "1px solid #333",
//               background: "#0d0d0f",
//               color: "white",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               padding: "0.8rem",
//               borderRadius: "10px",
//               background: "#a259ff",
//               color: "white",
//               fontWeight: "bold",
//             }}
//           >
//             Send OTP
//           </button>
//         </form>
//         {message && (
//           <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>
//         )}
//         {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP sent successfully! Redirecting...");
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1500);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a1d 0%, #2d1b4e 100%)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1a1a1d',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(162, 89, 255, 0.3)',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(162, 89, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Orbs */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(162, 89, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 10px 30px rgba(162, 89, 255, 0.4)'
          }}>
            🔐
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Forgot Password?
          </h1>
          <p style={{ color: '#aaa', fontSize: '1rem' }}>
            No worries! Enter your email and we'll send you a reset code
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Email Input */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#ddd',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                opacity: 0.5
              }}>
                📧
              </span>
              <input 
                type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                disabled={loading}
                style={{ 
                  width: '100%',
                  padding: '0.9rem 1rem 0.9rem 3rem',
                  borderRadius: '10px',
                  border: '2px solid #333',
                  backgroundColor: '#0d0d0f',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#a259ff'
                  e.target.style.boxShadow = '0 0 0 3px rgba(162, 89, 255, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#333'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{ 
              padding: '1rem',
              borderRadius: '10px',
              border: 'none',
              background: loading 
                ? '#666' 
                : 'linear-gradient(135deg, #a259ff 0%, #ff6b9d 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: loading ? 'none' : '0 10px 30px rgba(162, 89, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
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
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Sending...
              </>
            ) : (
              <>
                <span>📨</span>
                Send Reset Code
              </>
            )}
          </button>

          {/* Success Message */}
          {message && (
            <div style={{
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              color: '#4CAF50',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✓</span>
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              color: '#f44336',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid #333',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{ color: '#aaa', fontSize: '0.95rem' }}>
            Remember your password?{' '}
            <Link 
              to="/login"
              style={{ 
                color: '#a259ff', 
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ff6b9d'}
              onMouseLeave={(e) => e.target.style.color = '#a259ff'}
            >
              Back to Login
            </Link>
          </p>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}



