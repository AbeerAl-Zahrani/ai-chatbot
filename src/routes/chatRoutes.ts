import express from 'express';
import { getStatus, sendMessage } from '../controllers/chatController';

const router = express.Router();

router.post('/message', sendMessage);
router.get('/status', getStatus);

export default router;