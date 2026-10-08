import { clerkClient } from '@clerk/express';

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: 'Unauthorized - No token provided' 
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        // Verify the session token with Clerk
        const { sessionId } = await clerkClient.verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });

        if (!sessionId) {
            return res.status(401).json({ 
                success: false, 
                message: 'Unauthorized - Invalid token' 
            });
        }

        // Get session details
        const session = await clerkClient.sessions.getSession(sessionId);
        
        if (!session || !session.userId) {
            return res.status(401).json({ 
                success: false, 
                message: 'Unauthorized - Invalid session' 
            });
        }

        // Attach userId to request
        req.userId = session.userId;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized - Authentication failed',
            error: error.message 
        });
    }
};
