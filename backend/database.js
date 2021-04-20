const mongoose = require('mongoose');
const url = 'mongodb://localhost/project_db';

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('mongoose ok'))
    .catch(err => console.error(err));

module.exports = mongoose;