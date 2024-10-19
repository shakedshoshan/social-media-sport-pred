import express from 'express';
import { createGroup, joinGroup, getUsersByGroupId, getGroupIdsByUserId, getGroupDetailsById} from '../controllers/group.controller.js';
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

// Route to create a new group
router.post('/create', protectRoute, createGroup);

// Route to join an existing group
router.post('/join', protectRoute, joinGroup);

// Route to get all users by group ID
router.get('/users/:groupId', protectRoute, getUsersByGroupId);

// Route to get all group IDs by user ID
router.get('/groups/user', protectRoute, getGroupIdsByUserId);

// Route to get group details by group ID
router.get('/details/:groupId', protectRoute, getGroupDetailsById);

export default router;
