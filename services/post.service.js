const PostModel = require('../models/post.model');

class PostService {
    async createPost (info) {
        const newPost = new PostModel(info);
        const saved = await newPost.save();
        return saved;
    }

    async findAllPost () {
        const allPost = await PostModel.find();
        return allPost;
    }

    async findOnePost (id) {
        const onePost = await PostModel.findOne({ _id: id })
        .populate('categoryId')
        .populate('authorId')

        return onePost;
    }

    async updateOnePost (id, info) {
        const updated = await PostModel.findOneAndUpdate({ _id: id }, info, { new: true })
        .populate('authorId')
        .populate('categoryId')
        return updated;
    }

    async deleteOnePost (id) {
        const deleted = await PostModel.findOneAndDelete({ _id: id });
        return deleted;
    }
};

const postService = new PostService();

module.exports = postService;