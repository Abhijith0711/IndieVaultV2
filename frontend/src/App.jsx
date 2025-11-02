// Path: src/App.jsx
import ManageUsers from "./pages/ManageUsers.jsx"
import ManageGames from "./pages/ManageGames.jsx"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Home from "./pages/Home.jsx"
import GameDetails from "./pages/GameDetails.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Wishlist from "./pages/Wishlist.jsx"
import Cart from "./pages/Cart.jsx"
import Library from "./pages/Library.jsx"
import DeveloperDashboard from "./pages/DeveloperDashboard.jsx"
import UploadGame from "./pages/UploadGame.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Chat from "./components/GameChat.jsx";
import GameChat from "./components/GameChat.jsx"

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem 2rem" }}>
        <Routes>
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/game/:gameId" element={<ProtectedRoute><GameDetails /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path="/developer/dashboard" element={<ProtectedRoute><DeveloperDashboard /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadGame /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
<Route path="/admin/games" element={<ProtectedRoute><ManageGames /></ProtectedRoute>} />

          <Route path="/game/:gameId/chat" element={<ProtectedRoute><GameChat /></ProtectedRoute>} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  )
}

export default App
