const router = require('express').Router();
const { createNewCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } = require('../controller/category.controll');
const validateObjectId = require('../middleware/verifyID.middleware');
const { verifyToken, verifyAdmin } = require('../middleware/authorize.middleware');

router.post('/createcategory', verifyAdmin, createNewCategory);
router.get('/', getAllCategory);
router.get('/category/:id', validateObjectId, getOneCategory);
router.post('/update/:id', validateObjectId, verifyAdmin, updateCategory);
router.get('/delete/:id', validateObjectId, verifyAdmin, deleteCategory);

module.exports = router;
