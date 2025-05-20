const bcrypt = require('bcrypt');
const { User } = require('./model');

// Add user function
exports.addUser = async (req, res) => {
    try {
        const { 
            fname, 
            lname, 
            email, 
            password, 
            NIC, 
            profile_pic = '', 
            contact, 
            address, 
            role 
        } = req.body;

        // Validate required fields
        if (!fname || !lname || !email || !password || !NIC || !contact || !address || !role) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Check if the email or NIC already exists
        const existingUser = await User.findOne({ 
            $or: [
                { email: email.toLowerCase() }, 
                { NIC: NIC.toUpperCase() }
            ] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.email === email.toLowerCase() 
                    ? "Email already exists." 
                    : "NIC already exists." 
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fname,
            lname,
            email: email.toLowerCase(), // Store email in lowercase
            password: hashedPassword,
            NIC: NIC.toUpperCase(), // Store NIC in uppercase
            profile_pic: profile_pic || '', // Use empty string if no profile pic
            contact,
            address,
            role
        });

        await newUser.save();
        
        // Remove password from response for security
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ 
            message: "User added successfully", 
            user: userResponse 
        });

    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateFields = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If updating password, hash it
    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true }).select('-password');
    res.status(200).json({ message: "User updated successfully", user: updatedUser });

  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
