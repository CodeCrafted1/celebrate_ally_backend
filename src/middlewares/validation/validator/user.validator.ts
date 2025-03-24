import { NextFunction, Request, Response } from 'express';
import { userAuthSchema, userSignUpSchema } from '../schema/user.schema';

export const validateUserAuth = (req:Request, res:Response, next:NextFunction) => {
  const { error } = userAuthSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
};

export const validateUserSignUp = (req:Request, res:Response, next:NextFunction) => {
  const { error } = userSignUpSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
};
