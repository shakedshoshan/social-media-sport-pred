import express from 'express';
import {login, signup, logout, getUserById} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);  

router.get('/user/:id', getUserById);

export default router;