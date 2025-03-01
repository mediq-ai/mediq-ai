// src/controllers/chatController.js
import { queryMedPalm2 } from '../services/googleCloudService.js';

export async function askMedPalm(req, res) {
  try {
    const { userId, message } = req.body;
    const llmResponse = await queryMedPalm2(message);
    res.json({ response: llmResponse });
  } catch (error) {
    console.error('askMedPalm Error:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
}
