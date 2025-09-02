'use client';

import { useState } from 'react';

export default function Home() {
  const [safetyInput, setSafetyInput] = useState('');
  const [cultureInput, setCultureInput] = useState('');
  const [safetyResult, setSafetyResult] = useState('');
  const [cultureResult, setCultureResult] = useState('');

  const checkSafety = async () => {
    const res = await fetch('/api/safety', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: safetyInput }),
    });
    const data = await res.json();
    setSafetyResult(JSON.stringify(data, null, 2));
  };

  const checkCulture = async () => {
    const res = await fetch('/api/culture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cultureInput }),
    });
    const data = await res.json();
    setCultureResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI Gateway Hackathon Demo</h1>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '2px solid blue', borderRadius: '8px' }}>
        <h2>Safety Checker</h2>
        <input
          type="text"
          value={safetyInput}
          onChange={(e) => setSafetyInput(e.target.value)}
          placeholder="Enter text..."
          style={{ width: '300px', padding: '8px' }}
        />
        <button onClick={checkSafety} style={{ marginLeft: '10px', padding: '8px 16px' }}>
          Check Safety
        </button>
        {safetyResult && <pre style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>{safetyResult}</pre>}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '2px solid green', borderRadius: '8px' }}>
        <h2>Culture Coach</h2>
        <input
          type="text"
          value={cultureInput}
          onChange={(e) => setCultureInput(e.target.value)}
          placeholder="Enter text..."
          style={{ width: '300px', padding: '8px' }}
        />
        <button onClick={checkCulture} style={{ marginLeft: '10px', padding: '8px 16px' }}>
          Check Culture
        </button>
        {cultureResult && <pre style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>{cultureResult}</pre>}
      </div>
    </div>
  );
}
