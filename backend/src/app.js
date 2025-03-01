// src/app.js
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/patient', patientRoutes);

// Export the app as the default export
export default app;
