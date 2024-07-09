const router = require('express').Router();
const { createPost, getAllPost, getOnePost, updatePost, deletePost } = require('../controller/post.controll');
const validateObjectId = require('../middleware/verifyID.middleware');
const { verifyToken, verifyAdmin } = require('../middleware/authorize.middleware');

router.post('/createpost', verifyAdmin, createPost);
router.get('/', getAllPost);
router.get('/post/:id', validateObjectId, getOnePost);
router.post('/update/:id', validateObjectId, verifyAdmin, updatePost);
router.get('/delete/:id', validateObjectId, verifyAdmin, deletePost);

module.exports = router;