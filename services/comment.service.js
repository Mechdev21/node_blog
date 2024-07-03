const CommentModel = require('../models/comment.model');

class CommentService {
    async createComment (info) {
        const newComment = new CommentModel(info);
        const saved = newComment.save();
        return saved;
    }

    async findAllComment () {
        const allComment = await CommentModel.find()
        return allComment;
    }

    async findOneComment (id) {
        const oneComment = await CommentModel.findOne({ _id: id})
        .populate('userID')
        .populate('postID')
        return oneComment;
    }

    async updateOneComment (id, info) {
        const updated = await CommentModel.findOneAndUpdate({ _id: id}, info, { new: true })
        .populate('userID')
        .populate('postID')
        return updated;
    }

    async deleteOneComment (id) {
        const deleted = await CommentModel.findOneAndDelete({ _id: id });
        return deleted;
    }
};

const commentService = new CommentService();

module.exports = commentService;