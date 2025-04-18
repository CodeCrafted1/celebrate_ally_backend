import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import http from 'http';

import { port, nodeEnv } from './config/config';
import corsOptions from './config/cors';
import { connectDB } from './config/db';
import v0Router from './routes/v0';

// Create Express app
const app = express();
const PORT = port || 4000;

// Безпечно визначаємо __dirname для сумісності з різними середовищами
const getDirname = () => {
  if (typeof __dirname !== 'undefined') return __dirname;
  return path.resolve();
};
const dirname = getDirname();

// Apply middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());

// Only use morgan in development
if (nodeEnv === 'development') {
  app.use(morgan('dev'));
  
  // Add request logging middleware in development
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
  });
}

// Static files
app.use('/public', express.static(path.join(dirname, '/public')));

// Routes
app.use('/v0', v0Router);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    environment: nodeEnv
  });
});

// Connect to DB and start the server only in non-Vercel environments
// Vercel will use the app as a serverless function
if (process.env.VERCEL !== '1') {
  const startServer = async () => {
    try {
      await connectDB();
      const server = http.createServer(app);
      server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${nodeEnv} mode`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
} else {
  // For Vercel, connect to DB but don't start a server
  // This will be executed on cold starts
  connectDB().catch((error) => {
    console.error('Failed to connect to database:', error);
  });
}

// Export for Vercel serverless function
export default app;
