import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin:"*",//process.env.CORS_ORIGIN || 'http://localhost:5173',   
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
