# PingUp Backend API Documentation

## Environment Setup

### Required Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URL=your_mongodb_connection_string

# Server Configuration
PORT=4000

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary Image Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Getting API Keys

1. **Clerk Secret Key**: 
   - Go to https://dashboard.clerk.com
   - Select your application
   - Navigate to API Keys
   - Copy the "Secret Key"

2. **Cloudinary Credentials**:
   - Go to https://cloudinary.com
   - Sign up or log in
   - Find your Cloud Name, API Key, and API Secret in the Dashboard

## API Endpoints

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <clerk_session_token>
```

---

### User Endpoints

#### POST /api/users/sync
Sync Clerk user with MongoDB database (auto-create user if not exists)
- **Auth**: Required
- **Response**: User object

#### GET /api/users/me
Get current logged-in user profile
- **Auth**: Required
- **Response**: User object with populated followers, following, connections

#### GET /api/users/:userId
Get specific user profile by ID
- **Auth**: Required
- **Response**: User object

#### PUT /api/users/profile
Update current user profile
- **Auth**: Required
- **Body**: 
  - `full_name` (string, optional)
  - `username` (string, optional)
  - `bio` (string, optional)
  - `location` (string, optional)
  - `profile_picture` (file, optional)
  - `cover_photo` (file, optional)
- **Content-Type**: multipart/form-data
- **Response**: Updated user object

#### GET /api/users/search?query=searchTerm
Search users by name, username, bio, or location
- **Auth**: Required
- **Query Params**: `query` (required)
- **Response**: Array of matching users

#### GET /api/users/all?limit=20
Get all users for discover page
- **Auth**: Required
- **Query Params**: `limit` (optional, default: 20)
- **Response**: Array of users

---

### Post Endpoints

#### POST /api/posts
Create a new post
- **Auth**: Required
- **Body**:
  - `content` (string, optional if images provided)
  - `images` (files, optional, max 4 files)
- **Content-Type**: multipart/form-data
- **Response**: Created post object

#### GET /api/posts?limit=20&skip=0
Get all posts (feed)
- **Auth**: Required
- **Query Params**: 
  - `limit` (optional, default: 20)
  - `skip` (optional, default: 0)
- **Response**: Array of posts with user details

#### GET /api/posts/user/:userId?limit=20&skip=0
Get posts by specific user
- **Auth**: Required
- **Query Params**: 
  - `limit` (optional, default: 20)
  - `skip` (optional, default: 0)
- **Response**: Array of posts

#### GET /api/posts/:postId
Get single post by ID
- **Auth**: Required
- **Response**: Post object with comments populated

#### DELETE /api/posts/:postId
Delete a post (only post owner)
- **Auth**: Required
- **Response**: Success message

#### POST /api/posts/:postId/like
Toggle like on a post
- **Auth**: Required
- **Response**: Updated likes array and count

#### POST /api/posts/:postId/comment
Add comment to a post
- **Auth**: Required
- **Body**: `text` (string, required)
- **Response**: Created comment object

---

### Connection Endpoints

#### POST /api/connections/follow/:userId
Follow a user
- **Auth**: Required
- **Response**: Success message

#### DELETE /api/connections/unfollow/:userId
Unfollow a user
- **Auth**: Required
- **Response**: Success message

#### GET /api/connections/followers/:userId
Get followers of a user
- **Auth**: Required
- **Response**: Array of follower users

#### GET /api/connections/following/:userId
Get users that a user is following
- **Auth**: Required
- **Response**: Array of following users

#### GET /api/connections
Get current user's connections (mutual follows)
- **Auth**: Required
- **Response**: Array of connection users

---

## Data Models

### User
```javascript
{
  _id: String,              // Clerk user ID
  email: String,
  full_name: String,
  username: String,
  bio: String,
  profile_picture: String,  // Cloudinary URL
  cover_photo: String,      // Cloudinary URL
  location: String,
  followers: [String],      // Array of user IDs
  following: [String],      // Array of user IDs
  connections: [String],    // Array of user IDs
  createdAt: Date,
  updatedAt: Date
}
```

### Post
```javascript
{
  _id: ObjectId,
  user: String,             // User ID reference
  content: String,
  image_urls: [String],     // Cloudinary URLs
  post_type: String,        // 'text', 'image', 'text_with_image'
  likes: [String],          // Array of user IDs
  comments: [{
    user: String,
    text: String,
    createdAt: Date
  }],
  likes_count: Number,
  comments_count: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Responses

All endpoints return errors in this format:
```javascript
{
  success: false,
  message: "Error description",
  error: "Detailed error message"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error
