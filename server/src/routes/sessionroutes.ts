import express from 'express';
import sessionController from '../controllers/sessionController';

const router = express.Router();

router.get('/:id', sessionController.getSessionById);
router.get('/user/:userId', sessionController.getSessionByUserId);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

export default router;