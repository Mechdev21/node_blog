const router = require('express').Router();
const { registerUser, loginUser, verifyEmail } = require('../controller/auth.controll');

router.post('/register', registerUser);
router.post('/verify-otp', verifyEmail);
router.post('/login', loginUser);

module.exports = router;
