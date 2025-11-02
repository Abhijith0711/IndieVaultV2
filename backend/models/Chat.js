// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   gameId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Game',
//     required: true,
//     index: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   userName: {
//     type: String,
//     required: true
//   },
//   userRole: {
//     type: String,
//     enum: ['user', 'developer', 'admin'],
//     required: true
//   },
//   message: {
//     type: String,
//     required: true,
//     maxlength: 1000
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Index for faster queries
// chatSchema.index({ gameId: 1, createdAt: -1 });

// module.exports = mongoose.model('Chat', chatSchema);



// backend/models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ["user", "developer", "admin"],
    required: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
chatSchema.index({ gameId: 1, createdAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
