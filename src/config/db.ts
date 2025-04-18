import mongoose from 'mongoose';
import { mongo } from './config';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongo.uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}; 