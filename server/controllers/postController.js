import Post from '../models/Post.js';
import User from '../models/User.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// Create a new post
export const createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { content } = req.body;

        if (!content && (!req.files || req.files.length === 0)) {
            return res.status(400).json({
                success: false,
                message: 'Post must contain either text or images'
            });
        }

        let imageUrls = [];
        
        // Upload images to Cloudinary if present
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => 
                uploadToCloudinary(file.buffer, 'pingup/posts')
            );
            imageUrls = await Promise.all(uploadPromises);
        }

        // Determine post type
        let postType = 'text';
        if (imageUrls.length > 0 && content) {
            postType = 'text_with_image';
        } else if (imageUrls.length > 0) {
            postType = 'image';
        }

        const newPost = new Post({
            user: userId,
            content: content || '',
            image_urls: imageUrls,
            post_type: postType,
            likes: [],
            comments: [],
            likes_count: 0,
            comments_count: 0
        });

        await newPost.save();

        // Populate user details
        await newPost.populate('user', 'full_name username profile_picture');

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create post',
            error: error.message
        });
    }
};

// Get all posts (feed)
export const getAllPosts = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;

        const posts = await Post.find()
            .populate('user', 'full_name username profile_picture')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        console.error('Get all posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get posts',
            error: error.message
        });
    }
};

// Get posts by user
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 20, skip = 0 } = req.query;

        const posts = await Post.find({ user: userId })
            .populate('user', 'full_name username profile_picture')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user posts',
            error: error.message
        });
    }
};

// Get single post
export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId)
            .populate('user', 'full_name username profile_picture')
            .populate('comments.user', 'full_name username profile_picture');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        console.error('Get post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get post',
            error: error.message
        });
    }
};

// Delete post
export const deletePost = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Check if user is the owner of the post
        if (post.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized - You can only delete your own posts'
            });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete post',
            error: error.message
        });
    }
};

// Like/Unlike post
export const toggleLikePost = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        const likeIndex = post.likes.indexOf(userId);

        if (likeIndex > -1) {
            // Unlike the post
            post.likes.splice(likeIndex, 1);
            post.likes_count = post.likes.length;
        } else {
            // Like the post
            post.likes.push(userId);
            post.likes_count = post.likes.length;
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
            likes: post.likes,
            likes_count: post.likes_count
        });
    } catch (error) {
        console.error('Toggle like post error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle like',
            error: error.message
        });
    }
};

// Add comment to post
export const addComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Comment text is required'
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        const newComment = {
            user: userId,
            text: text.trim(),
            createdAt: new Date()
        };

        post.comments.push(newComment);
        post.comments_count = post.comments.length;

        await post.save();

        // Populate the new comment's user details
        await post.populate('comments.user', 'full_name username profile_picture');

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: post.comments[post.comments.length - 1],
            comments_count: post.comments_count
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add comment',
            error: error.message
        });
    }
};
