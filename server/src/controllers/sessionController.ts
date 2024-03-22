import Session from '../models/session';
import { Request, Response } from 'express';

export const getSessionById = async (req: Request, res: Response) => {
  const session = await Session.findById(req.params.id);
  res.json(session);
};

export const getSessionByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const sessions = await Session.find({ user: userId });
  if (sessions.length > 0) {
    res.json(sessions);
  } else {
    res.status(404).json({ message: 'No sessions found for this user' });
  }
};

export const createSession = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { name, date, type, note, exercises } = req.body;

  const session = new Session({
    user: userId,
    name: name,
    date: date,
    type: type,
    note: note,
    exercises: exercises
  });

  await session.save();
  res.status(201).json(session);
};

export const updateSession = async (req: Request, res: Response) => {
  const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(session);
};

export const deleteSession = async (req: Request, res: Response) => {
  await Session.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

//Add ExerciseToSession
  //add an exercise to ongoing session
//Add setToExercise
  // add a set to ongoing Exercise
//Add rpeToSet
  //Add rpe to ongoing set
//Add repetitionsToSet
  //Add repetitions to ongoing set
//Add typeOfSetToSet
  
