// Import the Express app
let app;

try {
  // Mark as running in Vercel environment before loading app
  process.env.VERCEL = '1';
  
  // Import dynamically to handle __dirname properly
  app = require('../dist/server').default;
} catch (error) {
  console.error('Error importing app:', error);
}

// Export a handler that passes requests to the Express app
module.exports = (req, res) => {
  try {
    if (!app) {
      return res.status(500).json({ 
        error: 'Failed to initialize server', 
        message: 'Server initialization error' 
      });
    }
    
    // Pass request to Express
    return app(req, res);
  } catch (error) {
    console.error('Request handling error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message
    });
  }
}; 