import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Registerpage';
import ChatPage from './pages/Chatpage';
import PatientPortal from './pages/PatientPortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/portal" element={<PatientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
