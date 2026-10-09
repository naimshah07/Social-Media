import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true},
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const postSchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true},
    content: {type: String, default: ''},
    image_urls: [{type: String}],
    post_type: {
        type: String, 
        enum: ['text', 'image', 'text_with_image'],
        default: 'text'
    },
    likes: [{type: String, ref: 'User'}],
    comments: [commentSchema],
    likes_count: {type: Number, default: 0},
    comments_count: {type: Number, default: 0}
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;
