const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.post('/register',controller.addUser);

module.exports = router;