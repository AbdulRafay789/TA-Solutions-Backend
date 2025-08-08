import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { currencyRoutes } from './routes/currencyRoutes';
import { conversionRoutes } from './routes/conversionRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: 'https://ta-solutions-frontend.vercel.app', // Replace with your frontend URL
  credentials: true, // If you're using cookies or sessions
};

// Enable CORS with options
app.use(cors(corsOptions));

// Routes
app.use('/api', currencyRoutes);
app.use('/api', conversionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.listen(3000, () => console.log('Server running on port 3000'));
// Export as serverless function
export default app;
