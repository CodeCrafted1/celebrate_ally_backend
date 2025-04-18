// Import the Express app
const app = require('../dist/server').default;

// Export a handler that passes requests to the Express app
module.exports = (req, res) => {
  // Mark as running in Vercel environment
  process.env.VERCEL = '1';
  
  // Pass request to Express
  return app(req, res);
}; 