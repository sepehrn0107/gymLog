import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { VerifyErrors } from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  dotenv.config();
  // Get the token from the 'Authorization' header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // If there's no token, return a 401 status (Unauthorized)
    return res.sendStatus(401);
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    // If the access token secret is undefined, return a 500 status (Internal Server Error)
    return res.sendStatus(500);
  }
  jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null, user: any) => {
    if (err) {
      // If the token is not valid, return a 403 status (Forbidden)
      return res.sendStatus(403);
    }
  
    // If the token is valid, set req.user and call next() to continue to the next middleware or route handler
    req.user = user;
    next();
  });
};

