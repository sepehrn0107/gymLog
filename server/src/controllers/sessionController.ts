import Session from '../models/session';
import { Request, Response } from 'express';

export const getSessionById = async (req: Request, res: Response) => {
  const session = await Session.findById(req.params.id);
  res.json(session);
};

export const getSessionByUserId = async (req: Request, res: Response) => {
  const sessions = await Session.find({ user: req.params.userId });
  res.json(sessions);
};

export const createSession = async (req: Request, res: Response) => {
  const session = new Session(req.body);
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