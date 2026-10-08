import express from 'express';
import Story from '../models/Story.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Create story
router.post('/', async (req, res) => {
    try {
        const { image, caption, userId } = req.body;
        const story = new Story({ user: userId, image, caption });
        await story.save();
        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find({ expiresAt: { $gt: new Date() } })
            .populate('user', 'username full_name profile_picture')
            .sort({ createdAt: -1 });
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get stories by user
router.get('/user/:userId', async (req, res) => {
    try {
        const stories = await Story.find({ user: req.params.userId, expiresAt: { $gt: new Date() } })
            .populate('user', 'username full_name profile_picture')
            .sort({ createdAt: -1 });
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View story (add view)
router.post('/:storyId/view', async (req, res) => {
    try {
        const userId = req.body.userId;
        const story = await Story.findById(req.params.storyId);
        if (!story.views.includes(userId)) {
            story.views.push(userId);
            await story.save();
        }
        res.json({ message: 'Viewed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;