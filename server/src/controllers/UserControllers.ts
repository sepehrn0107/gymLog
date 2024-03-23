import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password, sessions: [] });
  user.loggedIn = true;
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '24h' });

  // Send token in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    // secure: true, // Uncomment this line if you're using HTTPS
    // sameSite: 'none', // Uncomment this line if you're using HTTPS and your frontend and backend are on different domains
  });

  const userResponse = user.toObject();

  res.status(201).json({ id: userResponse._id, email: userResponse.email, token });
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
    user.loggedIn = true;

    res.json({ message: 'Logged in successfully', token, userID: user._id, email: user.email});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while trying to log in' });
  }
};
export const logoutUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log('userId', userId);
  try {
    const user = await User.findById(userId);
    if (user) {
      user.loggedIn = false;
      await user.save();
      // Clear the JWT token by setting the 'token' cookie to an empty string
      res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set the expiration date to the past to invalidate the cookie
        // secure: true, // Uncomment this line if you're using HTTPS
        // sameSite: 'none', // Uncomment this line if you're using HTTPS and your frontend and backend are on different domains
      });

      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while trying to log out' });
  }
};