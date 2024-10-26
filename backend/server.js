import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { updateGames } from './utils/updateGames.js';
import { updateScores } from './utils/updateTables.js';
import cron from 'node-cron';
import redisClient from './redis.js';
import {getGameReview} from './utils/gameReviewScraper.js';
import { updateTomorrowPreviews } from './utils/UpdateToDayPreviews.js';

import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import groupRoutes from './routes/group.routes.js';
import chatRoutes from './routes/chat.routes.js';
import followRoutes from './routes/follow.routes.js';
import eventsRoutes from './routes/events.routes.js';
import guessRoutes from './routes/guess.routes.js';
import gamePreviewRoutes from './routes/gamePreview.routes.js';

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
app.use("/api/group", groupRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/guess", guessRoutes);
app.use("/api/gamePreview", gamePreviewRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


redisClient.connect().then(() => {
  console.log('Connected to Redis successfully');
}).catch((err) => {
  console.log('Redis Connection Error:', err);
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Schedule updateGames to run every day at 10 AM
  cron.schedule('00 11 * * *', () => {
    // Clean Redis cache for key "allEvents"
    redisClient.del("allEvents", (err, reply) => {
      if (err) {
        console.error('Error clearing Redis cache for allEvents:', err);
      } else {
        console.log('Redis cache cleared for allEvents. Removed keys:', reply);
      }
    });

    console.log('Running updateGames at 13 PM');
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    // Get yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    updateGames(yesterdayDate);
    updateGames(todayDate);
    updateGames();


    console.log('Running updateScores at 13 PM');
    updateScores(yesterdayDate);
    updateScores(todayDate);

    console.log('Running updateTomorrowPreviews at 13 PM');
    updateTomorrowPreviews();
  });

});
