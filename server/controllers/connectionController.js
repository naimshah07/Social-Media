import User from '../models/User.js';

// Follow a user
export const followUser = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const { userId } = req.params;

        if (currentUserId === userId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot follow yourself'
            });
        }

        const userToFollow = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if already following
        if (currentUser.following.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: 'You are already following this user'
            });
        }

        // Add to following list
        currentUser.following.push(userId);
        await currentUser.save();

        // Add to followers list
        userToFollow.followers.push(currentUserId);
        await userToFollow.save();

        res.status(200).json({
            success: true,
            message: 'User followed successfully'
        });
    } catch (error) {
        console.error('Follow user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to follow user',
            error: error.message
        });
    }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const { userId } = req.params;

        if (currentUserId === userId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid operation'
            });
        }

        const userToUnfollow = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if following
        if (!currentUser.following.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: 'You are not following this user'
            });
        }

        // Remove from following list
        currentUser.following = currentUser.following.filter(
            id => id.toString() !== userId
        );
        await currentUser.save();

        // Remove from followers list
        userToUnfollow.followers = userToUnfollow.followers.filter(
            id => id.toString() !== currentUserId
        );
        await userToUnfollow.save();

        res.status(200).json({
            success: true,
            message: 'User unfollowed successfully'
        });
    } catch (error) {
        console.error('Unfollow user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to unfollow user',
            error: error.message
        });
    }
};

// Get followers
export const getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
            .populate('followers', 'full_name username profile_picture bio location');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            followers: user.followers
        });
    } catch (error) {
        console.error('Get followers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get followers',
            error: error.message
        });
    }
};

// Get following
export const getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
            .populate('following', 'full_name username profile_picture bio location');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            following: user.following
        });
    } catch (error) {
        console.error('Get following error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get following',
            error: error.message
        });
    }
};

// Get connections (mutual follows)
export const getConnections = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
            .populate('following', '_id full_name username profile_picture bio location followers');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Find mutual connections (users we follow who also follow us back)
        const connections = user.following.filter(followedUser => 
            followedUser.followers.some(followerId => followerId.toString() === userId)
        );

        res.status(200).json({
            success: true,
            connections
        });
    } catch (error) {
        console.error('Get connections error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get connections',
            error: error.message
        });
    }
};
