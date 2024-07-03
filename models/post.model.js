const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        imgUrl: { type: String },
        categoryId: { type: mongoose.Types.ObjectId, ref: 'Category', required: true }
    },
    { timestamps: true },
);



const Post = mongoose.model('Post', PostSchema);

module.exports = Post;