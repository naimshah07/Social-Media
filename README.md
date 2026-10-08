# PingUp - Social Media Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue)](https://pingup-gs.vercel.app/)

PingUp is a comprehensive full-stack social media application that allows users to connect, share content, and engage with a community. Built with modern web technologies, it provides a seamless experience for creating profiles, posting content, following users, and interacting through likes and comments.

## 🚀 Features

### Core Functionality
- 🔐 **User Authentication**: Secure login and registration using Clerk authentication
- 👤 **Profile Management**: Customizable user profiles with bio, location, and profile/cover photos
- ✍️ **Content Creation**: Create posts with text and multiple images (up to 4)
- 👍 **Social Interactions**: Like posts, add comments, follow/unfollow users
- 🔍 **Discovery**: Explore and connect with new users through the discover page
- ⚡ **Real-time Features**: Live updates for connections and interactions

### Advanced Features
- 🖼️ **Image Upload**: Cloud-based image storage and optimization with Cloudinary
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🚀 **Fast Development**: Hot module replacement with Vite
- 🏗️ **Scalable Architecture**: Modular backend with Express.js and MongoDB

### Planned Features
- 💬 Real-time messaging system
- 📖 Stories functionality
- 🎥 Video content support
- 🔎 Advanced search and filtering
- 🔔 Push notifications

## 📸 Screenshots

![Screenshot 1](images/Screenshot%202025-12-28%20191609.png)
![Screenshot 2](images/Screenshot%202025-12-28%20191650.png)

## 🛠 Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 18**: Modern React with hooks and functional components
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite**: Fast build tool and development server
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**: Utility-first CSS framework for responsive design
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) **React Router**: Client-side routing for single-page application
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) **Axios**: HTTP client for API communication
- ![Lucide React](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white) **Lucide React**: Modern icon library

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js**: JavaScript runtime for server-side development
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) **Express.js**: Web application framework for RESTful APIs
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB**: NoSQL database for flexible data storage
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) **Mongoose**: ODM for MongoDB with schema validation
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) **JWT**: JSON Web Tokens for secure authentication
- ![Multer](https://img.shields.io/badge/Multer-000000?style=for-the-badge&logo=multer&logoColor=white) **Multer**: Middleware for handling file uploads

### External Services
- ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white) **Clerk**: User authentication and management
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) **Cloudinary**: Image hosting and optimization
- ![Inngest](https://img.shields.io/badge/Inngest-000000?style=for-the-badge&logo=inngest&logoColor=white) **Inngest**: Background job processing (planned)

### Development Tools
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) **ESLint**: Code linting and formatting
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) **Prettier**: Code formatting
- ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) **Git**: Version control
- ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) **npm**: Package management

## 📁 Project Structure

```
PingUp/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images and icons
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend API
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── configs/          # Configuration files
│   └── server.js         # Server entry point
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🔧 Setup and Installation

### Prerequisites

Before running this application, make sure you have the following installed:

- 🟢 **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- 🍃 **MongoDB** (local installation or MongoDB Atlas account)
- 🐙 **Git** - [Download here](https://git-scm.com/)

### External Accounts Required

1. **Clerk Account**: For user authentication
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Get your API keys from the dashboard

2. **Cloudinary Account**: For image uploads
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Get your cloud name, API key, and API secret

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd PingUp
   ```

2. **Install Dependencies**

   Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

   Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

3. **Environment Configuration**

   Create environment files and add your credentials:

   **Client (.env)**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

   **Server (.env)**
   ```env
   MONGODB_URL=your_mongodb_connection_string
   PORT=4000
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. **Database Setup**

   If using local MongoDB:
   ```bash
   # Start MongoDB service
   mongod
   ```

   If using MongoDB Atlas, ensure your connection string is correct in the .env file.

5. **Start the Application**

   Start the backend server:
   ```bash
   cd server
   npm start
   ```

   In a new terminal, start the frontend:
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**

   Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

Comprehensive API documentation is available in the `server/README.md` file, including:

- Authentication requirements
- All available endpoints
- Request/response formats
- Error handling
- Data models

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd client
npm test

# Backend tests (if implemented)
cd ../server
npm test
```

### Manual Testing
- 🔐 Test user registration and login
- ✍️ Create posts with and without images
- 👥 Test following/unfollowing users
- 👍 Verify like and comment functionality
- 📱 Check responsive design on different screen sizes

## 🚀 Deployment

### Frontend Deployment
The React application can be deployed to platforms like:
- ▲ Vercel
- ▶️ Netlify
- 📄 GitHub Pages

Build the application:
```bash
cd client
npm run build
```

### Backend Deployment
The Node.js server can be deployed to:
- 🟣 Heroku
- 🚂 Railway
- 🌊 DigitalOcean App Platform
- ☁️ AWS EC2

Ensure environment variables are set in your deployment platform.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   - Click the "Fork" button on GitHub

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit Your Changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```

5. **Push to Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Provide a clear description of your changes

### Code Style Guidelines
- Use ESLint and Prettier for consistent formatting
- Follow React best practices
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [GreatStack](https://greatstack.dev/) for inspiration and guidance
- React community for excellent documentation
- Clerk for authentication services
- Cloudinary for image management
- All contributors and supporters

## 📜 Credits

This project is inspired by [GreatStack](https://greatstack.dev/p/pingup) MERN Social Media tutorial.
All code is written by [Your Name]. Licensed under MIT License.

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation in `server/README.md`
- Review existing issues for similar problems

---

**Happy coding! 🎉**