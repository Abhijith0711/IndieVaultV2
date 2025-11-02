// const express = require('express');
// const router = express.Router();
// const Chat = require('../models/Chat');
// const { authenticate } = require('../middleware/auth');

// // Get all messages for a game (paginated)
// router.get('/game/:gameId', authenticate, async (req, res) => {
//   try {
//     const { gameId } = req.params;
//     const limit = parseInt(req.query.limit) || 50;
//     const skip = parseInt(req.query.skip) || 0;

//     const messages = await Chat.find({ gameId })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .skip(skip)
//       .lean();

//     res.json(messages.reverse()); // Reverse to show oldest first
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Post a new message
// router.post('/game/:gameId', authenticate, async (req, res) => {
//   try {
//     const { gameId } = req.params;
//     const { message } = req.body;

//     if (!message || message.trim().length === 0) {
//       return res.status(400).json({ msg: 'Message cannot be empty' });
//     }

//     if (message.length > 1000) {
//       return res.status(400).json({ msg: 'Message too long (max 1000 characters)' });
//     }

//     const newMessage = new Chat({
//       gameId,
//       userId: req.user.id,
//       userName: req.user.name,
//       userRole: req.user.role,
//       message: message.trim()
//     });

//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Delete a message (only by message owner or admin)
// router.delete('/:messageId', authenticate, async (req, res) => {
//   try {
//     const { messageId } = req.params;
//     const message = await Chat.findById(messageId);

//     if (!message) {
//       return res.status(404).json({ msg: 'Message not found' });
//     }

//     // Check if user owns the message or is admin
//     if (message.userId.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({ msg: 'Not authorized' });
//     }

//     await Chat.findByIdAndDelete(messageId);
//     res.json({ msg: 'Message deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// export default router;


// backend/routes/chat.js
import express from "express";
import Chat from "../models/Chat.js";
import { auth } from "../middleware/authMiddleware.js"; // adjust to match your middleware filename

const router = express.Router();

// Get all messages for a game (paginated)
router.get("/game/:gameId", auth, async (req, res) => {
  try {
    const { gameId } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    const messages = await Chat.find({ gameId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    res.json(messages.reverse()); // oldest first
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Post a new message
router.post("/game/:gameId", auth, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ msg: "Message cannot be empty" });
    }
    if (message.length > 1000) {
      return res.status(400).json({ msg: "Message too long (max 1000 characters)" });
    }

    const newMessage = new Chat({
      gameId,
      userId: req.user.id,
      userName: req.user.name, // make sure your User model provides this
      userRole: req.user.role,
      message: message.trim(),
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a message (only owner or admin)
router.delete("/:messageId", auth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Chat.findById(messageId);

    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    if (message.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await Chat.findByIdAndDelete(messageId);
    res.json({ msg: "Message deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
