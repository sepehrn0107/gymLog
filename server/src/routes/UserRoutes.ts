import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/UserControllers';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/api/users/register', createUser);
router.post('/api/users/login', loginUser);
router.post('/api/users/logout/', authenticateToken, logoutUser);

export default router;