const Pool = require('pg').Pool;
const database = require('./keys');

const pool = new Pool(database);

pool.connect()
    .then(()=>{
        console.log('connect postgres');
    })
    .catch(err => {
        console.error('postgres: ', err.severity, err.routine);
    })

module.exports = pool;