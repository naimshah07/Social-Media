import express from "express";
import cors from "cors";
import "dotenv/config";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { functions, inngest } from "./inngest/index.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connect to database (with retry guard for Vercel cold starts)
let dbConnected = false;
const ensureDB = async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error('DB connect error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  }
  next();
};

app.get("/", (req, res) => res.send("PingUp API Server is running"));
app.use("/api/inngest", ensureDB, serve({ client: inngest, functions }));
app.use("/api/users", ensureDB, userRoutes);
app.use("/api/posts", ensureDB, postRoutes);
app.use("/api/messages", ensureDB, messageRoutes);
app.use("/api/stories", ensureDB, storyRoutes);
app.use("/api/upload", ensureDB, uploadRoutes);
app.use("/api/connections", ensureDB, connectionRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

const PORT = process.env.PORT || 4000;

// Local dev: listen directly. Vercel serverless: export handler.
const isVercel = process.env.VERCEL === '1' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

if (!isVercel) {
  await connectDB();
  dbConnected = true;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
