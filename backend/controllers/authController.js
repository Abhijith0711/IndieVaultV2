import User from '../models/User.js'
import Developer from '../models/Developer.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";


export const register = async (req, res) => {
  const { name, email, password, role } = req.body
  const hashed = await bcrypt.hash(password, 10)
  try {
    if (role === 'user') {
      const user = await User.create({ name, email, password: hashed, role })
      const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.json({ msg: 'User registered', user, token })
    } else if (role === 'developer') {
      const dev = await Developer.create({ name, email, password: hashed, role })
      const token = jwt.sign({ id: dev._id, role }, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.json({ msg: 'Developer registered', dev, token })
    } else res.status(400).json({ msg: 'Invalid role' })
  } catch (err) { res.status(400).json({ msg: err.message }) }
}

export const login = async (req, res) => {
  const { email, password, role } = req.body
  try {
    const model = role === 'user' ? User : Developer
    const user = await model.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User not found' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ msg: 'Invalid password' })
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user })
  } catch (err) { res.status(500).json({ msg: err.message }) }
}


const findAccountByEmail = async (email) => {
  let account = await User.findOne({ email });
  if (!account) {
    account = await Developer.findOne({ email });
  }
  return account;
};

// Forgot Password (send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const account = await findAccountByEmail(email);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP + expiry (10 mins)
    account.resetPasswordOTP = otp;
    account.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    await account.save();

    // Send email
    await sendMail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It is valid for 10 minutes.`
    );

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const account = await findAccountByEmail(email);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Validate OTP & expiry
    if (
      account.resetPasswordOTP !== otp ||
      account.resetPasswordExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    account.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    account.resetPasswordOTP = undefined;
    account.resetPasswordExpiry = undefined;

    await account.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};