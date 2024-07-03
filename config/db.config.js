const configVariable = require('./config');
const mongoose = require('mongoose');

const mongoDBConnection = () => {
    mongoose
    .connect(configVariable.MONGO_URL)
    .then( () => {
        console.log('MongoDB connection Successfull')
    })
    .catch( (err) => {
        throw new Error('err:', err.message)
    })
};

module.exports = mongoDBConnection;