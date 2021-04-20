const express = require('express');
const user_model = require('../models/user_model');
const router = express.Router();


router.post('/signup', (req, res) => {
    const signeduser = new user_model({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    signeduser.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json(error);
        })
})


module.exports = router;