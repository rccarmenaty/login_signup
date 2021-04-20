const express = require('express');
const user_model = require('../models/user_model');
const router = express.Router();


//listado de ususarios
router.get('/users', (req, res) => {
    const findusers = user_model.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error(error);
        })
});

//eliminar usuarios
router.delete('/users/:id', (req, res) => {
    user_model.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({status: 'Usuario Eliminado'});
        })
        .catch(error => {
            res.send(error);
            console.log(error);
        })
})

//editar usuarios
router.put('/users/:id', (req, res) => {
    const { id } = req.params.id;
    const user = {
        fullname: req.params.fullname,
        username: req.params.username,
        email: req.params.email,
        password: req.params.password
    }
    user_model.findByIdAndUpdate(id, {$set: user}, {new: true})
        .then(() => {
            console.log(user);
            res.json({status: 'Usuario Modificado'});
            
        })
        .catch(error => {
            res.send(error);
            console.log(error);
        })
})

module.exports = router;