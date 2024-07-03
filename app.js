const express = require('express');
const mongoDBConnection = require('./config/db.config');
const routeHandler = require('./routes');
const cloudinary = require('cloudinary');
const configVariable = require('./config/config');
const bodyParser = require('body-parser');

const app = express();

cloudinary.config({
    cloud_name: configVariable.CLOUNDINARY_NAME,
    api_key: configVariable.CLOUDINARY_PUBLIC,
    api_secret: configVariable.CLOUDINARY_SECRET
});

mongoDBConnection();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routeHandler);
//app.use(cors())

app.use((err, req, res, next) => {
    res.status(500).json({err : err.message})
});

module.exports = app;