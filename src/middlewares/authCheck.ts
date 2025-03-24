import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/config";
import { NextFunction, Request, Response } from "express";

const checkToken = (req:Request & { id: string }, res:Response, next:NextFunction ) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: string };
    console.log(jwt.verify(token, jwtSecret));
    req.id = userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default checkToken;