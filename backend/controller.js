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
