const router = require('express').Router()
const authRoute = require('./auth');

router.use('/api/auth', authRoute);


module.exports = router;