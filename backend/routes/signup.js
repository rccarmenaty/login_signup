const express = require('express');
const users = require('../controllers/user_controller');
const router = express.Router();


router.post('/signup', users.signup);


module.exports = router;