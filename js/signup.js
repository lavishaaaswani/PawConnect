const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User"); // adjust path based on your project

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }


    const newUser = new User({
      name,
      email,
      password,
      role, // either 'adopter' or 'lister'
    });

    await newUser.save();

    return res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
