import { Model } from "mongoose";
import { UserModel } from "../models/user.model";
import { getMatchPassword, hashPassword } from "../utils/passport";

interface UserData {
  name: string;
  email: string;
  password: string;
  referredBy?: string;
}

class UserRepository {
  private model: Model<any>;

  constructor() {
    this.model = UserModel;
  }

  async createUser(name: string, email: string, password: string, referredBy?: string) {
    const hashedPassword = await hashPassword(password);
    const userData: UserData = { 
      name, 
      email, 
      password: hashedPassword
    };
    
    // Add referrer if provided
    if (referredBy) {
      userData.referredBy = referredBy;
    }
    
    const newUser = await this.model.create(userData);
    
    // Increment referral count for the referring user
    if (referredBy) {
      await this.incrementReferralCount(referredBy);
    }
    
    return newUser;
  }

  async findUserByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findUserById(id: string) {
    return this.model.findById(id);
  }

  async validatePassword(user: any, password: string) {
    return getMatchPassword(password, user.password);
  }
  
  async incrementReferralCount(userId: string) {
    return this.model.findByIdAndUpdate(
      userId,
      { $inc: { referralCount: 1 } },
      { new: true }
    );
  }
  
  async updateUserReferrer(userId: string, referrerId: string) {
    return this.model.findByIdAndUpdate(
      userId,
      { referredBy: referrerId },
      { new: true }
    );
  }
}

export default new UserRepository();
