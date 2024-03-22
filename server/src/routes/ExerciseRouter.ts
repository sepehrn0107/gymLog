import express from 'express';
import { 
  createExercise, 
  getExercises, 
  getExerciseById, 
  getExercisesByBodyPart, 
  getExercisesByCategory,
  getExercisesByUser 
} from '../controllers/ExerciseController';

const router = express.Router();

router.post('/exercise', createExercise);
router.get('/exercises', getExercises);
router.get('/exercise/:id', getExerciseById);
router.get('/exercise/:user', getExercisesByUser);
router.get('/exercises/bodypart/:body_part', getExercisesByBodyPart);
router.get('/exercises/category/:category', getExercisesByCategory);

export default router;