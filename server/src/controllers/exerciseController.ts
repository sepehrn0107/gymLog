import { Request, Response } from 'express';
import Exercise from '../models/user';

export const createExercise = async (req: Request, res: Response) => {
  const { user, name, about, body_part, category } = req.body;
  const exercise = new Exercise({ user, name, about, body_part, category });
  await exercise.save();
  res.status(201).json(exercise);
};