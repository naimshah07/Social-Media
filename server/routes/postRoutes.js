import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/clerkAuth.js';
import {
    createPost,
    getAllPosts,
    getUserPosts,
    getPost,
    deletePost,
    toggleLikePost,
    addComment
} from '../controllers/postController.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});

// Post routes
router.post('/', requireAuth, upload.array('images', 4), createPost);
router.get('/', requireAuth, getAllPosts);
router.get('/user/:userId', requireAuth, getUserPosts);
router.get('/:postId', requireAuth, getPost);
router.delete('/:postId', requireAuth, deletePost);
router.post('/:postId/like', requireAuth, toggleLikePost);
router.post('/:postId/comment', requireAuth, addComment);

export default router;
