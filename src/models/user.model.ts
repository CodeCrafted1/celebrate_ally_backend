import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCount: { type: Number, default: 0 },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

export const UserModel = mongoose.model('User', userSchema); 