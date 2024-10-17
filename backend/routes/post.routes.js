import express from 'express';
import { createPost, deletePost, getPostsByUser, getAllPosts, addLikeToPost } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/createPost', protectRoute, createPost);

router.delete('/:id', deletePost);

router.get('/getPostsByUser', getPostsByUser);

router.get('/getAllPosts', getAllPosts);

router.post('/addLikeToPost/:id', addLikeToPost);

export default router;