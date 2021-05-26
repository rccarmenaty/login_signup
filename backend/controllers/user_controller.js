const pool = require('../database/get_conn');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

var users = {};

users.getUsers = (req, res) => {
    const user = pool
        .query('select * from users')
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.error(err);
        })
};

users.signup = (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (!username || !email) return res.status(400).json({ status: 'Please provide user and email' });

    var salt = bcryptjs.genSaltSync(4);
    const hash = bcryptjs.hashSync(password, salt);

    const query = {
        text: 'insert into users (fullname, username, email, password, date) values ($1, $2, $3, $4, $5)',
        values: [fullname, username, email, hash, new Date()]
    };
    const user = pool
        .query(query)
        .then(data => {
            res.status(200).json({
                status: 'ok'
            })
        })
        .catch(err => {
            res.status(512).json(err.detail);
        });
}

users.deleteUser = (req, res) => {
    const { username } = req.params;
    const query = {
        text: 'delete from users where username = $1',
        values: [username]
    }
    pool
        .query(query)
        .then(data => {
            if (data.rowCount) {
                res.status(200).json({
                    status: 'ok'
                });
            }
            else {
                res.status(200).json({
                    status: 'No username found'
                });
            }
        })
        .catch(err => {
            res.status(512).json(err.detail);
        })
};

users.editUser = (req, res) => {
    const { username } = req.params;
    const { fullname, password } = req.body;

    var query = {}
    if (!password) {
        query = {
            text: 'update users set fullname=$1, where username = $2',
            values: [fullname, username]
        };
        console.log('1')
    } else {
        var salt = bcryptjs.genSaltSync(4);
        const hash = bcryptjs.hashSync(password, salt);
        query = {
            text: 'update users set fullname=$1, password=$2 where username = $3',
            values: [fullname, hash, username]
        };
        console.log('2')
    }
    pool
        .query(query)
        .then(data => {
            res.status(200).json({
                status: 'ok'
            })
        })
        .catch(err => {
            res.status(512).json(err.detail);
        })
};

users.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(512).json('Please provide email and password');
    }

    const query = {
        text: 'select * from users where email = $1',
        values: [email]
    };

    try {
        const user = await pool.query(query);
        console.log(user.rows[0]);

        if (!user) return res.status(512).json('Error find user');

        if (!bcryptjs.compareSync(password, user.rows[0].password)) return res.status(512).json("Invalid Credentials");



    } catch (error) {
        console.error(err);
        res.status(512).json('Error find user');

    }
};


getSignedToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

module.exports = users;