import { generateToken } from "../utils/generateToken";
import { generateReferralLink, verifyReferralToken } from "../utils/generateReferralLink";
import userRepository from "../repositories/user.repository";

class UserService {
  async signUp(name: string, email: string, password: string, referralToken?: string) {
    let referrerId: string | undefined = undefined;
    if (referralToken) {
      try {
        const decodedToken = verifyReferralToken(referralToken);
        if (decodedToken.email.toLowerCase() === email.toLowerCase()) {
          referrerId = decodedToken.referrerId;
        }
      } catch (error) {
        console.error('Invalid referral token:', error);
      }
    }
    const user = await userRepository.createUser(name, email, password, referrerId);
    return { user };
  }

  async signIn(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    
    const isPasswordValid = await userRepository.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = generateToken(user._id);
    return { user, token };
  }
  
  async generateReferralLink(userId: string, email: string) {
    // Verify user exists
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if email already exists in the system
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Generate and return referral link
    const referralLink = generateReferralLink(userId, email);
    return { referralLink };
  }

  async processReferral(userId: string, referralToken: string) {
    // Verify the current user exists
    const currentUser = await userRepository.findUserById(userId);
    if (!currentUser) {
      throw new Error('User not found');
    }
    
    // Check if user was already referred
    if (currentUser.referredBy) {
      throw new Error('User already has a referrer');
    }
    
    try {
      // Verify and decode the token
      const decodedToken = verifyReferralToken(referralToken);
      
      // Verify that the email in the token matches the current user's email
      if (decodedToken.email.toLowerCase() !== currentUser.email.toLowerCase()) {
        throw new Error('Referral was intended for a different email address');
      }
      
      // Verify the referrer exists
      const referrer = await userRepository.findUserById(decodedToken.referrerId);
      if (!referrer) {
        throw new Error('Referrer not found');
      }
      
      // Update the current user with the referrer ID
      await userRepository.updateUserReferrer(userId, decodedToken.referrerId);
      
      // Increment the referrer's count
      const updatedReferrer = await userRepository.incrementReferralCount(decodedToken.referrerId);
      
      return { 
        success: true, 
        message: 'Referral processed successfully',
        referrerName: referrer.name
      };
    } catch (error: any) {
      throw new Error(error.message || 'Invalid referral link');
    }
  }
}

export default new UserService();
