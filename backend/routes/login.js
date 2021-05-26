const express = require('express');
const router = express.Router();
const users = require('../controllers/user_controller');

router.get('/login', (req, res) => {
    res.send('login ok')
});
 
router.post('/login', users.login);


module.exports = router;