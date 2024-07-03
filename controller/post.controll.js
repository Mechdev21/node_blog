const postInstance = require('../services/post.service');
const formidable = require('formidable');
const uploadFile  = require('../utilities/upload.utility');
const userInstance = require('../services/user.service')
const categoryInstance = require('../services/category.service');

const createPost = (req, res, next) => {
    const form = formidable({ maxFieldsSize: 400 * 1024 * 1024});

form.parse(req, async (err, fields, files) => {
    if (err) {
        return next(err);
    }
    try {
        const { authorId, title, content, categoryId } = fields;
        if (!authorId || !categoryId) {
            res.status(401).json('add the author and the category')
        }
        let imgUrl = ''

        if (files['imgUrl']) {
            const uploadedFile = await uploadFile(files['imgUrl'].filepath, 'intro')
            imgUrl = uploadedFile.url; 
        }
        const author = await userInstance.findOneUser(authorId);
        if (!author) {
            throw res.status(500).json('author not found');
        }
        const category = await categoryInstance.findOneCategory(categoryId);
        if (!category) {
            throw res.status(500).json('category not found')
        }
        const details = {
            authorId: author._id,
            title: title,
            content: content,
            categoryId: category._id,
            imgUrl: imgUrl
        }
        const newPost = await postInstance.createPost(details);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
};

const getAllPost = async (req, res) => {
    try {
        const allPost = await postInstance.findAllPost()
        res.status(200).json(allPost)
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const getOnePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) res.json({ message: 'err'})
        const _post = await postInstance.findOnePost(id);
        res.status(200).json(_post)
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const updatePost = async (req, res, next) => {
    const form = formidable({ maxFieldsSize: 400 * 1024 * 1024});

form.parse(req, async (err, fields, files) => {
    if (err) {
        return next(err);
    }
    try {
        const { id } = req.params;
        const { authorId, title, content, categoryId } = fields;
        if (!authorId || !categoryId) {
            res.status(401).json('add the author and the category')
        }
        let imgUrl = ''

        if (files['imgUrl']) {
            const uploadedFile = await uploadFile(files['imgUrl'].filepath, 'intro')
            imgUrl = uploadedFile.url; 
        }
        const author = await userInstance.findOneUser(authorId);
        if (!author) {
            throw res.status(500).json('author not found');
        }
        const category = await categoryInstance.findOneCategory(categoryId);
        if (!category) {
            throw res.status(500).json('category not found')
        }
        const details = {
            authorId: author._id,
            title: title,
            content: content,
            categoryId: category._id,
            imgUrl: imgUrl
        }
        const updated = await postInstance.updateOnePost(id, details);
        res.status(201).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) res.json();
        const deleted = await postInstance.deleteOnePost(id);
        res.status(201).json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports = { createPost, getAllPost, getOnePost, updatePost, deletePost };