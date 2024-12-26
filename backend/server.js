import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import roomRoutes from './src/routes/roomRoutes.js';
import swaggerDocs from './src/config/swagger.js';
import pool from './src/config/database.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// API routes (ensure the base path is `/api`)
app.use('/api', userRoutes);

// Routes
app.use('/api', roomRoutes);

// Swagger documentation setup
swaggerDocs(app);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Database connected successfully');
    }
  });

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
