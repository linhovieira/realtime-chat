import express from 'express';
import { signup, login, logout } from '../controllers/authentication.controller.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;