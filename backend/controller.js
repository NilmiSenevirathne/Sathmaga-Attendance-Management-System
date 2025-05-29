// controller.js
const bcrypt = require('bcrypt');
const { User } = require('./model');

// Add user
exports.addUser = async (req, res) => {
  try {
    const {
      fname, lname, email, password, NIC,
      profile_pic = '', contact, address, role
    } = req.body;

    if (!fname || !lname || !email || !password || !NIC || !contact || !address || !role) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { NIC: NIC.toUpperCase() }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email.toLowerCase()
          ? "Email already exists."
          : "NIC already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fname,
      lname,
      email: email.toLowerCase(),
      password: hashedPassword,
      NIC: NIC.toUpperCase(),
      profile_pic,
      contact,
      address,
      role
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User added successfully",
      user: userResponse
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    } else {
      delete updates.password;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error while updating user." });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

const express = require('express');
const router = express.Router();
const { Subject } = require('../models'); // Adjust path to your models


// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// Get subject by id
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
});

// Create a new subject
router.post('/', async (req, res) => {
  try {
    const { subject_name } = req.body;
    if (!subject_name) return res.status(400).json({ error: 'Subject name required' });

    const newSubject = new Subject({ subject_name });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create subject' });
  }
});

// Update subject
router.put('/:id', async (req, res) => {
  try {
    const { subject_name } = req.body;
    const updated = await Subject.findByIdAndUpdate(
      req.params.id,
      { subject_name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Subject not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update subject' });
  }
});

// Delete subject
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Subject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Subject not found' });
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subject' });
  }
});



