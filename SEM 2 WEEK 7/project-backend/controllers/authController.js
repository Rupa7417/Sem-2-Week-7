const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup function
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Change Password function
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // Find the user by userId extracted from the JWT token
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the old password matches the current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password!" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User function
const deleteUser = async (req, res) => {
  try {
    // Find the user by userId extracted from the JWT token
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Delete the user
    await User.findByIdAndDelete(req.user.userId);

    res.json({ message: "Account deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, changePassword, deleteUser };
