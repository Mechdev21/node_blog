const router = require('express').Router();
const { registerUser } = require('.//controller/auth.controll');

router.post('/register', registerUser);

module.exports = router;