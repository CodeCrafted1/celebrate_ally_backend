import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/config";
import { NextFunction, Request, Response } from "express";

// Extend Request interface to include id property
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: string };
    req.id = userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default checkToken;    