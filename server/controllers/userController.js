import User from '../models/User.js';
import { clerkClient } from '@clerk/express';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// Sync Clerk user with MongoDB
export const syncUser = async (req, res) => {
    try {
        const userId = req.userId;

        // Get user data from Clerk
        const clerkUser = await clerkClient.users.getUser(userId);

        // Check if user exists in MongoDB
        let user = await User.findById(userId);

        if (!user) {
            // Create new user
            user = new User({
                _id: userId,
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                full_name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
                username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress.split('@')[0] || `user_${userId.slice(-6)}`,
                profile_picture: clerkUser.imageUrl || '',
                bio: 'Hey there! I am using PingUp.',
                location: '',
                cover_photo: '',
                followers: [],
                following: [],
                connections: []
            });
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'User synced successfully',
            user
        });
    } catch (error) {
        console.error('Sync user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to sync user',
            error: error.message
        });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const user = await User.findById(userId)
            .populate('followers', 'full_name username profile_picture')
            .populate('following', 'full_name username profile_picture')
            .populate('connections', 'full_name username profile_picture');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user profile',
            error: error.message
        });
    }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        
        const user = await User.findById(userId)
            .populate('followers', 'full_name username profile_picture')
            .populate('following', 'full_name username profile_picture')
            .populate('connections', 'full_name username profile_picture');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get current user',
            error: error.message
        });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { full_name, username, bio, location } = req.body;

        let updateData = {};

        if (full_name) updateData.full_name = full_name;
        if (username) updateData.username = username;
        if (bio) updateData.bio = bio;
        if (location !== undefined) updateData.location = location;

        // Handle profile picture upload
        if (req.files?.profile_picture) {
            const profilePicUrl = await uploadToCloudinary(
                req.files.profile_picture[0].buffer,
                'pingup/profiles'
            );
            updateData.profile_picture = profilePicUrl;
        }

        // Handle cover photo upload
        if (req.files?.cover_photo) {
            const coverPhotoUrl = await uploadToCloudinary(
                req.files.cover_photo[0].buffer,
                'pingup/covers'
            );
            updateData.cover_photo = coverPhotoUrl;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error('Update user profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
};

// Search users
export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const users = await User.find({
            $or: [
                { full_name: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } },
                { bio: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } }
            ]
        }).select('full_name username profile_picture bio location').limit(20);

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Search users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search users',
            error: error.message
        });
    }
};

// Get all users (for discover page)
export const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const { limit = 20 } = req.query;

        const users = await User.find({ _id: { $ne: currentUserId } })
            .select('full_name username profile_picture bio location')
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get users',
            error: error.message
        });
    }
};
