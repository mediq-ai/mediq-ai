Virtual Doctor Chat Assistant
This repository contains the source code for a Virtual Doctor Chat Assistant application that uses Google Cloud Vertex AI’s MedLM API to generate medical responses and MongoDB for storing data. The app is built with a Node.js backend (using Express and Mongoose) and a React frontend. Note: This application is for educational and informational purposes only and is not a substitute for professional medical advice.

Table of Contents
Features
Prerequisites
Setup and Installation
Backend Setup
Frontend Setup
Configuration
Usage
Disclaimer
License
Features
Chatbot Interface:
Users can interact with the chatbot by asking medical-related questions. The chatbot uses Vertex AI’s MedLM API (MedLM-medium or MedLM-large) to generate responses in a medical doctor style.

MongoDB Integration:
User data and chat logs are stored securely in MongoDB (via Mongoose).

Authentication:
Basic authentication is implemented using JWT for secure access.

Prompt Engineering for Medical Responses:
The backend constructs prompts to instruct the model to respond as a compassionate, knowledgeable medical doctor along with a safety disclaimer.

Environment-Based Configuration:
Uses environment variables to manage API credentials, project IDs, and other configuration settings.

Prerequisites
Node.js and npm:
Version 14 or later is recommended.

MongoDB:
Either a local MongoDB instance or a MongoDB Atlas cluster.

Google Cloud Account:

Vertex AI (Generative Language API) must be enabled.
Access to MedLM API is required (MedLM is available only to a limited set of customers).
A service account with the proper roles (e.g., Vertex AI User, Storage Object Viewer) and its JSON key.
Git:
For cloning the repository and version control.

Setup and Installation
Backend Setup
Clone the Repository:

bash
Copy
git clone https://github.com/mediq-ai/mediq-ai.git
cd virtual-doctor-chat-assistant/backend
Install Dependencies:

bash
Copy
npm install
Set Up Environment Variables:
Create a .env file in the backend root with the following variables:

env
Copy
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLOUD_PROJECT= <your_google_cloud_project>
GOOGLE_APPLICATION_CREDENTIALS= /path/to/your/google/cloud/service/account/credential.json
REGION=us-central1
GCP_MEDLM_MODEL_ID=medlm-medium  # or medlm-large
Note:

Place your service account JSON file (e.g., medic.json) in a secure folder like backend/credentials/ and add this folder to your .gitignore.
Ensure your MongoDB URI and JWT secret are properly configured.
Run the Backend Server:

bash
Copy
npm run start
You should see output confirming that the server is running on http://localhost:5000 and that MongoDB is connected.

MedLM API Integration:
The backend includes a service (src/services/googleCloudService.js) that makes a POST request to the MedLM API endpoint:

It obtains an access token using the google-auth-library.
Constructs a request with the proper parameters:
instances contains a question prompt.
parameters like temperature, maxOutputTokens, topK, and topP are set as per MedLM API documentation.
If your project has access to MedLM, it should generate a medical response; otherwise, you might receive a 400/404 error or a fallback response.
If needed, you can temporarily return a dummy response to test your chat flow.

Frontend Setup
Navigate to the Frontend Folder:

bash
Copy
cd ../frontend
Install Dependencies:

bash
Copy
npm install
Set Up Environment Variables:
Create a .env file in the frontend folder with:

env
Copy
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_VERSION=1.0.0
REACT_APP_ENV=development
Note:
The frontend uses these variables to connect to the backend.

Run the Frontend Development Server:

bash
Copy
npm start
The app should open in your default browser at http://localhost:3000.

Configuration
Vertex AI & MedLM API:
Ensure that the Vertex AI (Generative Language) API is enabled in your Google Cloud Console. Verify that your service account has access to MedLM (or Med-PaLM 2) as per your project’s access.

Service Account:
The environment variable GOOGLE_APPLICATION_CREDENTIALS should point to your service account key file. Make sure the file is stored securely and is excluded from version control.

MongoDB:
The MongoDB connection string (MONGO_URI) can point to a local instance or a MongoDB Atlas cluster.

Usage
Chat Interaction:
The frontend provides a chat interface where users can type in medical questions. When a user submits a question, the frontend calls the backend API (e.g., /api/chat/ask), which in turn calls the MedLM API using the configured prompt. The response is displayed in the chat window.

Authentication & Data Management:
User authentication is implemented using JWT. Patient history can be managed and stored securely in MongoDB.

Medical Response Generation:
The backend service constructs a prompt instructing the model to respond as a knowledgeable medical doctor, including a disclaimer. The generated output should be considered draft advice and must be verified by a healthcare professional.

Disclaimer
Important:
This application is for educational and informational purposes only. The generated medical responses are not a substitute for professional medical advice, diagnosis, or treatment. Users should always consult a qualified healthcare provider regarding any medical concerns. The application includes disclaimers and safety guardrails, but it is your responsibility to ensure compliance with legal, regulatory, and ethical requirements (e.g., HIPAA, GDPR) when handling personal or medical data.

License
This project is licensed under the MIT License.

