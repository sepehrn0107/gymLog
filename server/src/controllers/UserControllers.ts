import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password, sessions: [] });
  user.loggedIn = true;
  await user.save();
  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  user.loggedIn = true;
  await user.save();

  res.json({ message: 'Logged in successfully', user });
};
export const logoutUser = async (req: Request, res: Response) => {
  const { userId } = req.params as { userId: string };

  // Find the user by userId
  const user = await User.findById(userId);
  if (!user) {
    console.log(`User with id ${userId} not found`);
    return res.status(400).json({ message: 'Invalid userId' });
  }

  if (!user.loggedIn) {
    console.log(`User with id ${userId} is not logged in`);
    return res.status(400).json({ message: 'User is not logged in' });
  }

  // Set loggedIn to false and save the user
  user.loggedIn = false;
  await user.save();

  res.json({ message: 'Logged out successfully', user });
};