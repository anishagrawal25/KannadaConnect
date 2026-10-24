// Standalone Node.js HTTP Server for Render deployment
// Automatically handles CORS, health checks, and /api/generate requests

import http from 'http';
import handler from './api/generate.js';

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  // CORS headers to allow cross-origin requests from Vercel frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Health check endpoint for Render
  if (url.pathname === '/' || url.pathname === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'ok',
      service: 'KannadaConnect Backend API',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // API Generate endpoint
  if (url.pathname === '/api/generate') {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const parsedBody = body ? JSON.parse(body) : {};

        // Mock req and res objects expected by the handler
        const mockReq = {
          method: req.method,
          headers: req.headers,
          body: parsedBody
        };

        const mockRes = {
          statusCode: 200,
          status(code) {
            this.statusCode = code;
            res.statusCode = code;
            return this;
          },
          json(data) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = this.statusCode || 200;
            res.end(JSON.stringify(data));
          }
        };

        await handler(mockReq, mockRes);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
      }
    });
    return;
  }

  // 404 for unknown endpoints
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`[KannadaConnect Backend] Server is listening on port ${PORT}`);
});
