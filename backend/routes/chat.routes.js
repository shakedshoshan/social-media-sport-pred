import express from 'express';
import { createMessage, deleteMessage, getMessagesByGroupId } from '../controllers/chat.controller.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Create a new chat message
router.post('/message', protectRoute, createMessage);

// Delete a chat message
router.delete('/message/:messageId', protectRoute, deleteMessage);

// Get all chat messages for a group
router.get('/messages/:groupId', getMessagesByGroupId);

export default router;
