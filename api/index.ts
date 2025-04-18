// Vercel serverless API handler
import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../dist/server.js';
import http from 'http';

// This adapter handles both the app import problem and the serverless execution
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Mark as Vercel environment
  process.env.VERCEL = '1';
  
  try {
    // Handle dynamically imported Express app
    const expressApp = typeof app.default === 'function' ? app.default : app;
    return expressApp(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 