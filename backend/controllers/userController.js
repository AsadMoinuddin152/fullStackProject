const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");
const { default: mongoose } = require("mongoose");

dotenv.config();

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save({
      maxTimeMS: 30000,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User created successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user info or password (by ID)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (updateFields.password) {
      updateFields.password = await argon2.hash(updateFields.password, {
        type: argon2.argon2id,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete one user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
