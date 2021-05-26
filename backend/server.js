const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./database/get_conn');
const session = require('express-session');
require('dotenv').config({path: './.env'});

//init
const app = express();
const port  = process.env.PORT || 4000 ;
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'xyz',
    resave: true,
    saveUninitialized: true
}));

//init server
app.listen(port, () => console.log('running in port', port));

//routes
app.use(require('./routes'));
app.use(require('./routes/login'));
app.use(require('./routes/signup'));
app.use(require('./routes/users'));
