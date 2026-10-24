import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/generate', (req, res, _next) => {
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
                // Populate process.env for local execution if a real key is present
                const candidateKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
                process.env.GEMINI_API_KEY = (candidateKey && candidateKey !== 'undefined' && candidateKey !== 'your_gemini_api_key_here') ? candidateKey.trim() : '';

                // Import serverless handler dynamically
                const { default: handler } = await import('./api/generate.js');
                
                const mockReq = {
                  method: req.method,
                  body: parsedBody
                };

                const mockRes = {
                  statusCode: 200,
                  status(code) {
                    res.statusCode = code;
                    this.statusCode = code;
                    return this;
                  },
                  json(data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  }
                };

                await handler(mockReq, mockRes);
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          });
        }
      }
    ],
    server: {
      port: 5173,
      open: false
    }
  };
});
