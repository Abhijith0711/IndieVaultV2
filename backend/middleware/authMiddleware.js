// File: backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Developer from '../models/Developer.js'
import Admin from '../models/Admin.js'

export const auth = async (req, res, next) => {
  let token = req.headers['authorization']
  
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' })
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role === 'user') {
      const user = await User.findById(decoded.id)
      if (!user) return res.status(401).json({ msg: 'User not found' })
      req.user = { id: user._id.toString(), name: user.name, role: user.role }
    } 
    
    else if (decoded.role === 'developer') {
      const dev = await Developer.findById(decoded.id)
      if (!dev) return res.status(401).json({ msg: 'Developer not found' })
      req.user = { id: dev._id.toString(), name: dev.name, role: dev.role }
    } 
    
    else if (decoded.role === 'admin') {
      const admin = await Admin.findById(decoded.id)
      if (!admin) return res.status(401).json({ msg: 'Admin not found' })
      req.user = { id: admin._id.toString(), name: admin.name, role: admin.role }
    }

    next()
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' })
  }
}

// Export as authMiddleware as well for compatibility
export const authMiddleware = auth

export const roleCheck = (roles) => (req, res, next) => {
  if (roles.includes(req.user?.role)) {
    next()
  } else {
    res.status(403).json({ msg: 'Access denied' })
  }
}