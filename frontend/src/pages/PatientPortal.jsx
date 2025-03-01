import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientPortal() {
  const [history, setHistory] = useState(null);
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const token = localStorage.getItem('token');

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/patient/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const updateHistory = async () => {
    try {
      const updatedDiagnoses = [...(history?.diagnoses || []), newDiagnosis];
      const res = await axios.post(
        'http://localhost:5000/api/patient/history',
        { diagnoses: updatedDiagnoses },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(res.data.data);
      setNewDiagnosis('');
    } catch (error) {
      console.error('Error updating history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Patient Portal</h2>
      {history ? (
        <div>
          <h4>Your Diagnoses:</h4>
          <ul>
            {history.diagnoses.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <input 
            value={newDiagnosis}
            onChange={(e)=>setNewDiagnosis(e.target.value)}
            placeholder="Add new diagnosis"
          />
          <button onClick={updateHistory}>Add Diagnosis</button>
        </div>
      ) : (
        <p>No history found. Add some data.</p>
      )}
    </div>
  );
}

export default PatientPortal;
