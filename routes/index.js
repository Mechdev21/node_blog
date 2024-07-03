const router = require('express').Router()
const authRoute = require('./auth');
const userRoute = require('./user');
const catRoute = require('./category');
const postRoute = require('./post');
const commentRoute = require('./comment');

router.use('/api/auth', authRoute);
router.use('/api/users', userRoute);
router.use('/api/categories', catRoute);
router.use('/api/posts', postRoute);
router.use('/api/comments', commentRoute);


module.exports = router;