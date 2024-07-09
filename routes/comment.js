const router = require('express').Router()
const { createComment, getAllComment, getOneComment, deleteComment } = require('../controller/comment.controll');
const validateObjectId = require('../middleware/verifyID.middleware');
const { verifyToken, verifyAdmin } = require('../middleware/authorize.middleware');

router.post('/createcomment', createComment);
router.get('/', getAllComment);
router.get('/comment/:id', validateObjectId, getOneComment);
router.get('/delete/:id', validateObjectId, deleteComment);


module.exports = router;