import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import http from 'http';

import { port } from './config/config';
import corsOptions from './config/cors';
import { connectDB } from './config/db';
import v0Router from './routes/v0';

const startServer = async () => {
  try {
    const app = express();

    const PORT = port || 4000;
    const __dirname = path.resolve();

    await connectDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet());

    // Add request logging middleware
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      console.log('Request body:', req.body);
      next();
    });

    app.use('/public', express.static(path.join(__dirname, '/public')));
    app.use('/v0', v0Router);
    
    app.get('/', (req, res) => {
      res.status(200).json({
        message: 'Server is running',
      });
    });

    const server = http.createServer(app);
    server.listen(PORT || 4000, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
