import express from 'express';
import { getEvent, getAllEvents } from '../controllers/events.controller.js';

const router = express.Router();

// Route to get a specific event by ID
router.get('/:eventId', getEvent);

// Route to get all events
router.get('/', getAllEvents);

export default router;
