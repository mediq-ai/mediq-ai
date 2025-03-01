// src/controllers/patientController.js
import MedicalHistory from '../models/medicalHistoryModel.js';

export async function getMedicalHistory(req, res) {
  try {
    const userId = req.userId; // set by verifyToken middleware
    const history = await MedicalHistory.findOne({ userId });
    if (!history) {
      return res.json({ data: null });
    }
    res.json({ data: history });
  } catch (error) {
    console.error('getMedicalHistory Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function updateMedicalHistory(req, res) {
  try {
    const userId = req.userId;
    const { diagnoses, medications, allergies, notes } = req.body;

    let history = await MedicalHistory.findOne({ userId });
    if (!history) {
      history = new MedicalHistory({ userId });
    }

    if (diagnoses) history.diagnoses = diagnoses;
    if (medications) history.medications = medications;
    if (allergies) history.allergies = allergies;
    if (notes) {
      // For simplicity, push new note
      history.notes.push(notes);
    }

    await history.save();
    res.json({ message: 'Medical history updated successfully', data: history });
  } catch (error) {
    console.error('updateMedicalHistory Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
