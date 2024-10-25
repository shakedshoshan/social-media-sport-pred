import express from 'express';
import { getGameReviewController } from '../controllers/gameReview.controller.js';


const router = express.Router();

// GET /api/gameReview?team1=<team1>&team2=<team2>&date=<date>
router.get('/', getGameReviewController);

export default router;
