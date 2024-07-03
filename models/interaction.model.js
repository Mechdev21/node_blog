const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema(
    {
        postID: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        likes: { type: Number, default: 0 },
        share: { type: Number, default: 0 },
        bookmark: { type: Number, default: 0 }
    },
    { timestamps: true },
);

InteractionSchema.index({ postID: 1, userID: 1}, { unique: true })

const Interaction = mongoose.model('Interaction', InteractionSchema);

module.exports = Interaction;