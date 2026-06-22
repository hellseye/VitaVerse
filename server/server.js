import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Headers config
// Allow loading scripts/styles from CDN in developer dashboard
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
        "connect-src": ["'self'", "*"],
        "img-src": ["'self'", "data:", "*"]
      }
    }
  })
);

// CORS config
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : 'http://localhost:8080';
const allowedOrigins = [
  clientUrl,
  'http://localhost:8080',
  'http://localhost:4000',
  'https://vita-verse-beta.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      // Normalize origin by removing trailing slash if any
      const normalizedOrigin = origin.replace(/\/$/, '');
      
      // Allow if it matches allowedOrigins, ends with vercel.app, or is local development
      if (
        allowedOrigins.includes(normalizedOrigin) || 
        normalizedOrigin.startsWith('http://localhost:') || 
        normalizedOrigin.startsWith('file://') ||
        normalizedOrigin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    },
    credentials: true
  })
);

// Logging
app.use(morgan('dev'));

// Body Parser
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Welcome route
app.get('/', (req, res) => {
  res.send('VitaVerse API Server Running.');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
