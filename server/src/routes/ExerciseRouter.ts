import express from 'express';
import { 
  createExercise, 
  getExercises, 
  getExerciseById, 
  getExercisesByBodyPart, 
  getExercisesByCategory,
  getExercisesByUser 
} from '../controllers/exerciseController';

const router = express.Router();

router.route('/api/exercise/create/user/:userId')
  .post(createExercise);

router.route('/api/exercise/:id')
  .get(getExerciseById);

router.route('/api/exercise/:user')
  .get(getExercisesByUser);

router.route('/api/exercises')
  .get(getExercises);

router.route('/api/exercises/bodypart/:body_part')
  .get(getExercisesByBodyPart);

router.route('/api/exercises/category/:category')
  .get(getExercisesByCategory);

export default router;