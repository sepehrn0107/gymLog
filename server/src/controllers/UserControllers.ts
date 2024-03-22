import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  let role: string;
  role = req.body.role ? req.body.role : 'user';
  const user = new User({ name, email, password, sessions: [], role });
  user.loggedIn = true;
  await user.save();
  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '24h' });

    // Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // Uncomment this line if you're using HTTPS
      // sameSite: 'none', // Uncomment this line if you're using HTTPS and your frontend and backend are on different domains
    });

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while trying to log in' });
  }
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