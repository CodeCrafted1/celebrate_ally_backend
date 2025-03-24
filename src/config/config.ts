import dotenv from 'dotenv';

dotenv.config();

interface PostgresConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

interface Config {
  port: string;
  postgres: PostgresConfig;
  jwtSecret: string;
  corsOrigin: string;
}

export const config: Config = {
  port: process.env.PORT || '4000',
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'flowly-db',
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4000',
};

export const { port, postgres, jwtSecret, corsOrigin } = config;

export const nodeEnv = process.env.NODE_ENV || 'development'; 