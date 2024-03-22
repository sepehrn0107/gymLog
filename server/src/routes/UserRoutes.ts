import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/UserControllers';

const router = express.Router();

router.post('/api/users/register', createUser);
router.post('/api/users/login', loginUser);
router.post('/api/users/logout/:userId', logoutUser);

export default router;