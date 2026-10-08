import express from 'express';
import { requireAuth } from '../middleware/clerkAuth.js';
import {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getConnections
} from '../controllers/connectionController.js';

const router = express.Router();

// Connection routes
router.post('/follow/:userId', requireAuth, followUser);
router.delete('/unfollow/:userId', requireAuth, unfollowUser);
router.get('/followers/:userId', requireAuth, getFollowers);
router.get('/following/:userId', requireAuth, getFollowing);
router.get('/', requireAuth, getConnections);

export default router;
