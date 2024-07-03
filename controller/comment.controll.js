const commentInstance = require('../services/comment.service');
const postInstance = require('../services/post.service');
const userInstance = require('../services/user.service');
const formidable = require('formidable');
const uploadFile  = require('../utilities/upload.utility');

const createComment = async (req, res, next) => {
    const form = formidable({ maxFieldsSize: 400 * 1024 * 1024 });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return next(err);
        }
        try {
            const { postID, userID, content, likes } = fields;
            if (!postID || !userID) return res.status(500).json('postID and userID required');
            let imgUrl = '';

            if (files['imgUrl']) {
                const uploadedimg = await uploadFile(files['imgUrl'].filepath, 'intro');
                imgUrl = uploadedimg.url;
            }

            const user = await userInstance.findOneUser(userID);
            if (!user) {
                return res.status(500).json('user not found');
            }

            const post = await postInstance.findOnePost(postID);
            if (!post) {
                return res.status(500).json('post not found');
            }

            const details = {
                postID: post._id,
                userID: user._id,
                content: content,
                likes: likes,
                imgUrl: imgUrl,
            };
            const newComment = await commentInstance.createComment(details);
            res.status(201).json(newComment);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
};

const getAllComment = async (req, res) => {
    try {
        const allcomment = await commentInstance.findAllComment()
        res.status(200).json(allcomment)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOneComment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) res.json({ message: 'err'})
        const _comment = await commentInstance.findOneComment(id);
        res.status(200).json(_comment)
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) res.json();
        const deleted = await commentInstance.deleteOneComment(id)
        res.status(201).json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports = { createComment, getAllComment, getOneComment, deleteComment };
