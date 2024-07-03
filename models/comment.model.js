const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        postID: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        imgUrl: { type: String },
        likes: { type: Number, default: 0 }
    },
    { timestamps: true },
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
