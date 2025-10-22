import express from 'express';
import {getProfile, updateProfile} from '../controllers/user.controller.js';
import { verifyCredential } from '../middlewares/token.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';


const router = express.Router();

router(arcjetProtection, verifyCredential);

router.get('/profile', getProfile);
router.post('/update-profile', updateProfile);


export default router;