const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/dbTrailers';

mongoose.connect(uri);

mongoose.connection.on('open', () => {
    console.log(`Database is connected on URI ${uri}`)
});

mongoose.connection.on('error', (err) => {
    console.log(err)
});