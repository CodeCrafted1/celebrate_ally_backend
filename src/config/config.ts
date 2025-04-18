import dotenv from 'dotenv';

dotenv.config();

interface MongoConfig {
  uri: string;
}

interface Config {
  port: string;
  mongo: MongoConfig;
  jwtSecret: string;
  corsOrigin: string;
}

export const config: Config = {
  port: process.env.PORT || '4000',
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/Test',
  },
  jwtSecret: process.env.JWT_SECRET || 'qwert1234567890',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

export const { port, mongo, jwtSecret, corsOrigin } = config;

export const nodeEnv = process.env.NODE_ENV || 'development'; 