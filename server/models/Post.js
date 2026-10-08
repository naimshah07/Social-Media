import mongoose from "mongoose";

<<<<<<< HEAD
const postSchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true},
    content: {type: String, required: true},
    image: {type: String, default: ''},
    likes: [{type: String, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    createdAt: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', postSchema);

export default Post;
=======
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
>>>>>>> 4f609148e22231a911e8b6ff902b38eccfbd16e3
