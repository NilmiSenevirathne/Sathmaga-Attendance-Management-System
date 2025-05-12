const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { User } = require('./model');

router.post('/register',controller.addUser);

router.get('/users', async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude password field
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });
  

module.exports = router;