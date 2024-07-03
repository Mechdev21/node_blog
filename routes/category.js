const router = require('express').Router();
const { createNewCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } = require('../controller/category.controll');
const validateObjectId = require('../middleware/verifyID.middleware');
const { verifyToken, verifyAuthorization } = require('../middleware/authorize.middleware');

router.post('/createcategory', verifyAuthorization, createNewCategory);
router.get('/', getAllCategory);
router.get('/category/:id', validateObjectId, getOneCategory);
router.post('/update/:id', validateObjectId, verifyToken, updateCategory);
router.get('/delete/:id', validateObjectId, verifyToken, deleteCategory);

module.exports = router;