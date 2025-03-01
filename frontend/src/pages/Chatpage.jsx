import React, { useState } from 'react';
import axios from 'axios';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSend = async () => {
    if (!message) return;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat/ask',
        { userId: user.id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const botReply = res.data.response;

      setChatLog([...chatLog, 
        { sender: 'user', text: message },
        { sender: 'bot', text: botReply }
      ]);
      setMessage('');
    } catch (error) {
      console.error('Chat error:', error);
      alert('Error sending message');
    }
  };

  return (
    <div>
      <h2>Virtual Doctor Chat</h2>
      <div style={{border: '1px solid #ccc', height: '300px', overflow: 'auto'}}>
        {chatLog.map((msg, idx) => (
          <div key={idx} style={{ margin: '5px 0'}}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div>
        <input 
          type="text"
          value={message}
          placeholder="Type your symptom or question..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <p style={{ fontStyle: 'italic', marginTop: 10 }}>
        *Disclaimer: This chatbot does not replace professional medical advice.*
      </p>
    </div>
  );
}

export default ChatPage;
