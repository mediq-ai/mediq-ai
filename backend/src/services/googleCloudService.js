// src/services/googleCloudService.js
import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

export async function queryMedPalm2(userMessage) {
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT; // e.g., "crafty-apex-442015-s4"
    const region = process.env.REGION || 'us-central1';
    const modelId = process.env.GCP_MEDLM_MODEL_ID || 'medlm-medium';

    const url = `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/publishers/google/models/${modelId}:predict`;

    const requestBody = {
      instances: [
        {
          content: "Question: What causes ringworm and what are its common symptoms?"
        }
      ],
      parameters: {
        temperature: 0,
        maxOutputTokens: 256,
        topK: 40,
        topP: 0.95
      }
    };

    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const accessToken = tokenResponse.token || tokenResponse;

    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log("MedLM API response:", response.data);

    if (response.data && response.data.predictions && response.data.predictions.length > 0) {
      return response.data.predictions[0].content;
    } else {
      return 'No response from MedLM API.';
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('MedLM API error details:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Error querying MedLM API:', error);
    throw error;
  }
}
