// File: backend/routes/adminRoutes.js
import { Router } from 'express'
import User from '../models/User.js'
import Developer from '../models/Developer.js'
import Admin from '../models/Admin.js'
import Game from '../models/Game.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admin only.' })
  }
  next()
}

// Get all users
router.get('/users', authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Get all developers
router.get('/developers', authMiddleware, adminOnly, async (req, res) => {
  try {
    const devs = await Developer.find().select('-password').populate('games')
    res.json(devs)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Get all admins
router.get('/admins', authMiddleware, adminOnly, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password')
    res.json(admins)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Delete a user
router.delete('/users/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ msg: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Delete a developer
router.delete('/developers/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await Developer.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Developer deleted successfully' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Delete a game
router.delete('/games/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Game deleted successfully' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// Get dashboard statistics
router.get('/stats', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [userCount, devCount, gameCount] = await Promise.all([
      User.countDocuments(),
      Developer.countDocuments(),
      Game.countDocuments()
    ])

    res.json({
      totalUsers: userCount,
      totalDevelopers: devCount,
      totalGames: gameCount
    })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

export default router