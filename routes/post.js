const router = require('express').Router();
const { createPost, getAllPost, getOnePost, updatePost, deletePost } = require('../controller/post.controll');
const validateObjectId = require('../middleware/verifyID.middleware');
const { verifyToken, verifyAuthorization } = require('../middleware/authorize.middleware');

router.post('/createpost', verifyToken, createPost);
router.get('/', getAllPost);
router.get('/post/:id', validateObjectId, getOnePost);
router.post('/update/:id', validateObjectId, verifyToken, updatePost);
router.get('/delete/:id', validateObjectId, verifyToken, deletePost);

module.exports = router;