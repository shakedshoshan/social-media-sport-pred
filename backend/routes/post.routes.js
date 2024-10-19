import express from 'express';
import { createPost, deletePost, getPostsByUser, getAllPosts, addLikeToPost, removeLikeFromPost, checkIfUserLikedPost } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/createPost', protectRoute, createPost);

router.delete('/:id', deletePost);

router.get('/getPostsByUser', protectRoute, getPostsByUser);

router.get('/getAllPosts', getAllPosts);

router.post('/addLikeToPost/:id', protectRoute, addLikeToPost);

router.post('/removeLikeFromPost/:id', protectRoute, removeLikeFromPost);

router.get('/checkIfUserLikedPost/:id', protectRoute, checkIfUserLikedPost);

export default router;