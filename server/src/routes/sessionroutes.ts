import express from 'express';
import {getSessionById, updateSession, deleteSession, createSession, getSessionByUserId} from '../controllers/sessionController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.route('/api/session/:id')
  .get(getSessionById)
  .put(authenticateToken, updateSession)
  .delete(authenticateToken, deleteSession);

router.route('/api/session/')
  .post(authenticateToken, createSession);

router.get('/api/session/user/:userId', getSessionByUserId);

export default router;