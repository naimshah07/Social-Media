import express from 'express';
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
