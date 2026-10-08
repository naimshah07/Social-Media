import express from 'express';
import Message from '../models/Message.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Send message
router.post('/', async (req, res) => {
    try {
        const { receiver, content, sender } = req.body;
        const message = new Message({ sender, receiver, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get messages between two users
router.get('/conversation/:userId', async (req, res) => {
    try {
        const userId = req.query.userId;
        const otherUserId = req.params.userId;
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ]
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get recent conversations
router.get('/conversations', async (req, res) => {
    try {
        const userId = req.query.userId;
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).sort({ createdAt: -1 }).limit(50);

        const conversations = {};
        messages.forEach(msg => {
            const otherUser = msg.sender === userId ? msg.receiver : msg.sender;
            if (!conversations[otherUser]) {
                conversations[otherUser] = msg;
            }
        });

        res.json(Object.values(conversations));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark messages as read
router.put('/read/:userId', async (req, res) => {
    try {
        const userId = req.body.userId;
        const otherUserId = req.params.userId;
        await Message.updateMany(
            { sender: otherUserId, receiver: userId, read: false },
            { read: true }
        );
        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;