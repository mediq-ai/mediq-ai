// src/routes/patientRoutes.js
import express from 'express';
import { getMedicalHistory, updateMedicalHistory } from '../controllers/patientController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/history', verifyToken, getMedicalHistory);
router.post('/history', verifyToken, updateMedicalHistory);

export default router;
