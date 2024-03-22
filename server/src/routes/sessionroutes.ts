import express from 'express';
import {getSessionById, updateSession, deleteSession, createSession, getSessionByUserId} from '../controllers/sessionController';

const router = express.Router();

router.route('/api/session/:id')
  .get(getSessionById)
  .put(updateSession)
  .delete(deleteSession);

router.route('/api/session')
  .post(createSession);

router.get('/api/session/:userId', getSessionByUserId);

export default router;