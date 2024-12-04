import express from 'express';
import { register } from '../controllers/auth.middlewares.js';

const auth_router = express.Router();

auth_router.post('/register', register);

export default auth_router