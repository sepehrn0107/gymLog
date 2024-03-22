import { Request, Response } from 'express';
import Exercise from '../models/exercise';

export const createExercise = async (req: Request, res: Response) => {
  const { name, about, body_part, category } = req.body;
  const user = req.params.userId; // Get userId from URL
  const exercise = new Exercise({ user, name, about, body_part, category });
  await exercise.save();
  res.status(201).json(exercise);
};
export const getExercises = async (req: Request, res: Response) => {
  const exercises = await Exercise.find();
  res.json(exercises);
};

export const getExerciseById = async (req: Request, res: Response) => {
  const exercise = await Exercise.findById(req.params.id);
  if (exercise) {
    res.json(exercise);
  } else {
    res.status(404).json({ message: 'Exercise not found' });
  }
};
export const getExercisesByUser = async (req: Request, res: Response) => {
  const { userId }   = req.params;
  console.log('userid', userId);
  const exercises = await Exercise.find({ user: userId }); // Changed from { userId } to { user: userId }
  console.log('exercises', exercises);
  if (exercises.length > 0) {
    res.json(exercises);
  } else {
    res.status(404).json({ message: 'No exercises found for this user' });
  }
};
export const getExercisesByBodyPart = async (req: Request, res: Response) => {
  const { body_part } = req.params;
  const exercises = await Exercise.find({ body_part });
  if (exercises.length > 0) {
    res.json(exercises);
  } else {
    res.status(404).json({ message: 'No exercises found for this body part' });
  }
};
export const getExercisesByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const exercises = await Exercise.find({ category });
  if (exercises.length > 0) {
    res.json(exercises);
  } else {
    res.status(404).json({ message: 'No exercises found for this category' });
  }
};