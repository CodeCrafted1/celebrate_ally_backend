import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';

/**
 * Generates a referral link for a user
 * @param userId The ID of the user creating the referral
 * @param email The email of the user to be referred
 * @returns Generated referral link
 */
export const generateReferralLink = (userId: string, email: string): string => {
  const payload = {
    referrerId: userId,
    email
  };
  
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '7d' 
  });
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  return `${baseUrl}/signup?ref=${token}`;
};

/**
 * Verifies a referral token and extracts the data
 * @param token The referral token to verify
 * @returns The decoded token data
 */
export const verifyReferralToken = (token: string): { referrerId: string; email: string } => {
  try {
    const decoded = jwt.verify(token, jwtSecret) as { referrerId: string; email: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired referral link');
  }
}; 