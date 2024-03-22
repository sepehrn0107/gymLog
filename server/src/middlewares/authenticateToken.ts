import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import User from '../models/User';

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err: VerifyErrors | null, payload: any) => {
    if (err) {
      // If the token is not valid, return a 403 status (Forbidden)
      return res.sendStatus(403);
    }

    // Fetch the user from the database using the id from the JWT payload
    const user = await User.findById(payload.id);
    if (!user) {
      // If the user is not found, return a 404 status (Not Found)
      return res.sendStatus(404);
    }

    // If the token is valid, set req.user and call next() to continue to the next middleware or route handler
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.roles
    };
    next();
  });
};