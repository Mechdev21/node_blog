const jwt = require('jsonwebtoken');
const configVariable = require('../config/config');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided'});
    }
    jwt.verify(token, configVariable.JWT_SECRET, (err, user) =>{
        if (err) {
            return res.status(403).json({ message: 'invalid Token'})
        }
        req.user = user;
        next()
    })
};

const verifyAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.Admin) {
            next();
        } else {
            res.status(403).json({ message: 'Access forbidden: You do not have the necessary permissions'});
        }
    })
};

module.exports = { verifyToken, verifyAuthorization };