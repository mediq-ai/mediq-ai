// src/models/medicalHistoryModel.js
import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  diagnoses: [{ type: String }],
  medications: [{ type: String }],
  allergies: [{ type: String }],
  notes: [{
    date: { type: Date, default: Date.now },
    symptom: String,
    severity: String,
    details: String
  }]
});

// Export the model as the default export
export default mongoose.model('MedicalHistory', medicalHistorySchema);
