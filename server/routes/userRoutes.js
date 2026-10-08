import express from 'express';
<<<<<<< HEAD
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put('/profile', async (req, res) => {
    try {
        const userId = req.body.userId; // temp
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Follow user
router.post('/follow/:userId', async (req, res) => {
    try {
        const userId = req.body.userId; // temp
        const targetUserId = req.params.userId;

        await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUserId } });
        await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });

        res.json({ message: 'Followed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Unfollow user
router.post('/unfollow/:userId', async (req, res) => {
    try {
        const userId = req.body.userId; // temp
        const targetUserId = req.params.userId;

        await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } });
        await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });

        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get followers
router.get('/followers/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('followers', 'username full_name profile_picture');
        res.json(user.followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get following
router.get('/following/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('following', 'username full_name profile_picture');
        res.json(user.following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
=======
import multer from 'multer';
import { requireAuth } from '../middleware/clerkAuth.js';
import {
    syncUser,
    getUserProfile,
    getCurrentUser,
    updateUserProfile,
    searchUsers,
    getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// User routes
router.post('/sync', requireAuth, syncUser);
router.get('/me', requireAuth, getCurrentUser);
router.get('/search', requireAuth, searchUsers);
router.get('/all', requireAuth, getAllUsers);
router.get('/:userId', requireAuth, getUserProfile);
router.put(
    '/profile',
    requireAuth,
    upload.fields([
        { name: 'profile_picture', maxCount: 1 },
        { name: 'cover_photo', maxCount: 1 }
    ]),
    updateUserProfile
);

export default router;
>>>>>>> 4f609148e22231a911e8b6ff902b38eccfbd16e3
