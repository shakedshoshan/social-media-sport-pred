import express from 'express';
import { createComment, getCommentsByPost, addLikeToComment, deleteComment } from "../controllers/comment.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/createComment', protectRoute, createComment);

router.get('/getCommentsByPost/:postId', protectRoute, getCommentsByPost);

router.post('/addLikeToComment/:id', protectRoute, addLikeToComment);

router.delete('/deleteComment/:id', protectRoute, deleteComment);

export default router;