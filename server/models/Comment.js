import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    content: {type: String, required: true},
    likes: [{type: String, ref: 'User'}],
    createdAt: {type: Date, default: Date.now}
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;