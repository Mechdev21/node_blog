const router = require('express').Router();
const { getAllUsers, getOneUser, deleteUser, updateUser } = require('../controller/user.controll');
const validateObjectId = require('../middleware/verifyID.middleware');
const { verifyToken, verifyAdmin } = require('../middleware/authorize.middleware');

router.get('/', getAllUsers);
router.get('/user/:id', validateObjectId, verifyToken, getOneUser);
router.get('/delete/:id', validateObjectId, deleteUser);
router.post('/update/:id', validateObjectId, verifyToken, updateUser);

module.exports = router;