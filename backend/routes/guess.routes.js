import express from 'express';
import { createGuess, getGuessByEventAndUser } from '../controllers/guess.controller.js';
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

// Route to create or update a guess
router.post('/', protectRoute, createGuess);

// Route to get a guess by event and user
router.post('/:event_id', protectRoute, getGuessByEventAndUser);
export default router;
