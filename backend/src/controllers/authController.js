// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Hardcoded user for testing
const hardcodedUser = {
  id: '1',
  name: 'admin',
  email: 'admin@gmail.com',
  // This is a plain-text password for demonstration.
  // NEVER store passwords in plain text in a real application.
  password: 'password123'
};

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Compare against the hardcoded credentials
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      // Generate a token using JWT_SECRET from your environment variables
      const token = jwt.sign({ userId: hardcodedUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: hardcodedUser.id,
          name: hardcodedUser.name,
          email: hardcodedUser.email
        }
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// For registration, you might disable it or send a fixed message:
export async function register(req, res) {
  res.status(501).json({ message: 'Registration is disabled in hardcoded mode.' });
}
