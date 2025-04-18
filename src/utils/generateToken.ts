import jwt from "jsonwebtoken"

import { jwtSecret } from "../config/config";

/**
 * Generates a JWT token for a user
 * @param userId User ID to encode in the token
 * @returns JWT token
 */
export const generateToken = (userId: string) => {
    return jwt.sign(
      { userId },
      jwtSecret,
      { expiresIn: '24h' }
    );
  }