import express from 'express';
import { addFollow, removeFollow, getFollowers, getFollowing, isFollowing } from '../controllers/follow.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Add a follow relationship
router.post('/', protectRoute, addFollow);

// Remove a follow relationship
router.post('/:followed_id', protectRoute, removeFollow);

// Get all followers of a user
router.get('/followers/:user_id', getFollowers);

// Get all users that a user follows
router.get('/following/:user_id', getFollowing);

// Check if a user is following another user
router.get('/is-following/:followed_id', protectRoute, isFollowing);

export default router;
