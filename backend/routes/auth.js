const express = require('express');
const router = express.Router();
const User = require('../models/User'); // your Mongoose model
const bcrypt = require('bcryptjs');

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ name, email, password, role }); // 👈 no bcrypt
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error." });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    if (password !== existingUser.password) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }

    return res.json({
      success: true,
      message: "Login successful.",
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});


module.exports = router;
