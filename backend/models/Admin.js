// File: backend/models/Admin.js
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'admin' },
  
  resetPasswordOTP: String,
  resetPasswordExpiry: Date,
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Admin', AdminSchema);