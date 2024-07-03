const dotenv = require('dotenv');

dotenv.config('./env');

const configVariable = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_PUBLIC: process.env.CLOUDINARY_PUBLIC,
    CLOUNDINARY_NAME: process.env.CLOUNDINARY_NAME
};

module.exports = configVariable;