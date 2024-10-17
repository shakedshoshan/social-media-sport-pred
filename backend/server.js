import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const corsOptions = {
    // origin: ["https://chat-app-fufd.onrender.com"],
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  }
  
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

