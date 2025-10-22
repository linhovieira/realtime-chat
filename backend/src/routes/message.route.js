import express from 'express';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
import { verifyCredential } from '../middlewares/token.middleware.js';
import { getChatPartners, getContacts, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();

router.use(arcjetProtection, verifyCredential);

router.get('/contacts', getContacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId);
router.post('/send/:id', sendMessage);

export default router;