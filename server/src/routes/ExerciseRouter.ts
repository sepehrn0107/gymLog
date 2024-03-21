import express from 'express';
import { createExercise } from '../controllers/exerciseController';

const router = express.Router();

router.post('/exercise', createExercise);

export default router;