import { Request, Response } from 'express';
import userService from '../services/user.service';

// Extend the Express Request interface to include user property
interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const userController = {
  async signUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.signUp(name, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      console.error('Error in signup:', error);
      res.status(500).json({ error: error.message || 'Error creating user' });
    }
  },

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.signIn(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      console.error('Error in signin:', error);
      res.status(500).json({ error: error.message || 'Error signing in' });
    }
  },
  
  async generateReferralLink(req: AuthRequest, res: Response) {
    try {
      // The user ID should come from the authenticated use
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      const result = await userService.generateReferralLink(userId, email);
      res.status(200).json(result);
    } catch (error: any) {
      console.error('Error generating referral link:', error);
      res.status(500).json({ error: error.message || 'Error generating referral link' });
    }
  },

  async processReferral(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const { referralToken } = req.body;
      if (!referralToken) {
        return res.status(400).json({ error: 'Referral token is required' });
      }
      
      const result = await userService.processReferral(userId, referralToken);
      res.status(200).json(result);
    } catch (error: any) {
      console.error('Error processing referral:', error);
      res.status(500).json({ error: error.message || 'Error processing referral' });
    }
  }
};

export default userController; 