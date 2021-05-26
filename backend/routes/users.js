const express = require('express');
const users = require('../controllers/user_controller');
const router = express.Router();


router.get('/users', users.getUsers);

router.delete('/users/delete/:username', users.deleteUser);

router.put('/users/edit/:username', users.editUser);

module.exports = router;